# Contribuer

L'inventaire réunit deux sources publiques : le recensement des équipements
sportifs du ministère des Sports et OpenStreetMap. Ensemble elles connaissent
816 pumptracks. Ni l'une ni l'autre ne dit si le revêtement s'est fissuré, si
les modules tiennent encore, ni où se trouve exactement celui dont personne n'a
relevé les coordonnées. C'est là que quelqu'un qui y est allé vaut mieux que
n'importe quel jeu de données.

## Ce qui manque le plus

**Les 181 positions approchées.** Ces fiches affichent le centre de leur commune
parce qu'aucune des deux sources ne donne mieux. Sur le terrain, la vraie
position se relève en dix secondes — appui long sur le point dans Google Maps,
les coordonnées se copient. C'est la contribution la plus utile du dépôt, et la
plus rapide.

**L'état des lieux.** Un revêtement refait, un module démonté, un pumptrack
fermé depuis deux ans. Les données publiques ne se corrigent que par vagues
déclaratives ; une note datée vaut mieux qu'un champ silencieux.

**Les absents.** Un pumptrack construit l'an dernier et jamais déclaré n'existe
pour personne. Si vous en connaissez un, il manque à l'inventaire.

## Comment

Trois chemins, du plus simple au plus durable.

1. **Le lien sur la fiche.** Chaque page du site porte « Compléter cette fiche » :
   il ouvre une issue déjà remplie du bon identifiant. Rien à installer, rien à
   retrouver.
   Pour un pumptrack absent, l'accueil porte « Signaler un pumptrack absent ».

2. **Directement dans OpenStreetMap.** Une correction faite dans OSM revient ici
   toute seule à la construction suivante — le 3 de chaque mois — et profite à
   tous les autres réutilisateurs, pas seulement à ce site. Pour une position ou
   un revêtement, c'est le meilleur endroit.

3. **Une pull request.** Le dépôt ne contient aucune donnée écrite à la main :
   `data/pumptracks.json` est reconstruit à chaque passage et une correction
   qu'on y déposerait serait effacée le 3 du mois suivant. Les PR portent donc
   sur les **scripts** — un cas d'appariement raté, une convention OSM oubliée,
   un revêtement non traduit.

## Ce que le projet s'interdit

Une règle, et elle s'applique aux contributions comme au reste : **une fiche
n'affirme que ce qu'une source déclare.** Pas de revêtement supposé d'après une
photo satellite, pas d'accès « fermé » déduit d'un silence, pas de date arrondie.
Un champ absent n'a pas été renseigné — il ne vaut pas « non ».

Ce qui vient du terrain est donc reçu comme du terrain : daté, attribué, et
distinct de ce que déclarent le ministère ou OSM. Une observation que vous datez
d'août 2026 restera datée d'août 2026, et ne se déguisera jamais en donnée
officielle.

## Licence

En contribuant, vous acceptez que vos informations soient publiées sur le site
et reprises librement, comme le reste de l'inventaire — les données sources sont
sous Licence Ouverte 2.0 (ministère) et ODbL (OpenStreetMap).

N'envoyez que ce que vous avez le droit de partager : une photo prise par
quelqu'un d'autre ne vous appartient pas.

## Faire tourner le projet

```bash
python3 scripts/inventaire.py               # reconstruit depuis les deux sources
python3 scripts/inventaire.py --hors-ligne  # rejoue depuis le cache brut, sans réseau
python3 scripts/build_site.py --out _site   # assemble le site, fr et en
```

Aucune dépendance : la bibliothèque standard de Python 3 suffit.

Le premier appel interroge le portail du ministère, Overpass et geo.api.gouv.fr,
puis géocode chaque point OSM ; comptez une dizaine de minutes et soyez poli avec
Overpass. Le cache brut atterrit dans `data/.brut.json` — travaillez avec
`--hors-ligne` tant que vous ne touchez pas aux sources.
