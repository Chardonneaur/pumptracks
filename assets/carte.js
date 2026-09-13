/* La carte des pumptracks.
 *
 * POURQUOI UNE CARTE PLUTOT QU'UNE LISTE. Sur le site frere pistes-athle, la
 * mesure a tranche : l'accueil cartographique produit 7,5 % de departs vers un
 * lieu, une fiche 1,6 %. Celui qui arrive de Google sur une fiche la lit et
 * repart ; celui qui ouvre une carte cherche vraiment. C'est le seul ecart de
 * conversion du site qui soit d'un facteur cinq.
 *
 * DEUX FORMES DE POINT, ET C'EST UNE QUESTION D'HONNETETE. 181 pumptracks sur
 * 816 n'ont de coordonnees dans aucune des deux sources : leur point est le
 * centre de leur commune. Les dessiner comme les autres enverrait quelqu'un a
 * deux kilometres de l'agres. Ils sont donc creux et en pointilles, et la
 * legende le dit avant qu'on ait clique.
 *
 * UN SEUL FICHIER POUR LES DEUX LANGUES. Les points ne contiennent que des noms
 * propres — commune, nom du pumptrack — qui ne se traduisent pas ; carte.json
 * sert donc les deux versions du site. Tout le texte d'habillage arrive par les
 * attributs data- du conteneur, ecrits par build_site.py dans la langue de la
 * page. Dupliquer le script pour traduire trois phrases aurait cree deux
 * fichiers a corriger au lieu d'un.
 */
(function () {
  var el = document.getElementById('carte');
  if (!el || typeof L === 'undefined') return;

  /* Les valeurs de repli sont francaises : si un attribut manque, la page reste
     lisible plutot que vide. */
  function txt(cle, repli) {
    return el.getAttribute('data-' + cle) || repli;
  }

  var PREFIXE = txt('fiches', 'pumptrack/');
  var carte = L.map(el, { scrollWheelZoom: false }).setView([46.7, 2.4], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; les contributeurs <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(carte);

  var STYLE_EXACT = { radius: 6, color: '#0F6E4C', weight: 2, fillColor: '#0F6E4C', fillOpacity: .85 };
  var STYLE_APPROX = { radius: 6, color: '#B4532A', weight: 2, dashArray: '2 3', fillOpacity: 0 };

  var groupe = (typeof L.markerClusterGroup === 'function')
    ? L.markerClusterGroup({ maxClusterRadius: 45, showCoverageOnHover: false })
    : L.layerGroup();

  var tous = [];

  fetch(txt('points', 'carte.json')).then(function (r) { return r.json(); }).then(function (points) {
    points.forEach(function (p) {
      var m = L.circleMarker([p.y, p.x], p.a ? STYLE_APPROX : STYLE_EXACT);
      var nom = p.n || txt('sansnom', 'Pumptrack de {c}').replace('{c}', p.c);
      var lignes = ['<strong>' + echappe(nom) + '</strong>', echappe(p.c)];
      if (p.l) lignes.push(echappe(txt('libre', 'accès libre déclaré')));
      if (p.a) lignes.push('<em>' + echappe(txt('approx', 'Position approchée : le centre de la commune')) + '</em>');
      lignes.push('<a href="' + PREFIXE + encodeURIComponent(p.i) + '/">'
        + echappe(txt('voir', 'Voir la fiche')) + '</a>');
      m.bindPopup(lignes.join('<br>'));
      m.pumptrack = p;
      tous.push(m);
      groupe.addLayer(m);
    });
    carte.addLayer(groupe);
    compte(points.length, points.length);
  });

  function echappe(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function compte(n, total) {
    var e = document.getElementById('carte-compte');
    if (!e) return;
    var modele = n === total
      ? txt('compte', '{n} pumptracks affichés')
      : txt('compte-partiel', '{n} pumptracks sur {t}');
    e.textContent = modele.replace('{n}', n).replace('{t}', total);
  }

  /* Filtre par commune. Une saisie libre, parce qu'on cherche sa ville et
     qu'aucun menu ne tient 718 communes sans devenir illisible. */
  var champ = document.getElementById('carte-filtre');
  if (champ) champ.addEventListener('input', function () {
    var q = sansAccent(champ.value.trim());
    groupe.clearLayers();
    var n = 0;
    tous.forEach(function (m) {
      var p = m.pumptrack;
      if (!q || sansAccent(p.c).indexOf(q) >= 0 || sansAccent(p.n || '').indexOf(q) >= 0) {
        groupe.addLayer(m); n++;
      }
    });
    compte(n, tous.length);
  });

  function sansAccent(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  /* « Pres de moi » : le navigateur demande lui-meme la permission, et rien
     n'est envoye nulle part — la position ne sert qu'a deplacer la vue. */
  var bouton = document.getElementById('carte-ici');
  if (bouton && navigator.geolocation) {
    var repos = bouton.textContent;   // le libelle est deja dans la langue de la page
    bouton.hidden = false;
    bouton.addEventListener('click', function () {
      bouton.textContent = txt('localisation', 'Localisation…');
      navigator.geolocation.getCurrentPosition(function (pos) {
        carte.setView([pos.coords.latitude, pos.coords.longitude], 10);
        bouton.textContent = repos;
      }, function () {
        bouton.textContent = txt('refus', 'Position refusée');
      }, { timeout: 8000 });
    });
  }

  /* Le defilement de la page ne doit pas etre capture par la carte ; un clic
     dedans, en revanche, veut dire qu'on s'en sert. */
  carte.on('click', function () { carte.scrollWheelZoom.enable(); });
  carte.on('mouseout', function () { carte.scrollWheelZoom.disable(); });
})();
