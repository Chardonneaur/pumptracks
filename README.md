# Les pumptracks de France — le site

Ce dépôt ne contient pas de code. Il porte le site publié
— **<https://chardonneaur.github.io/pumptracks/>** — et sert de guichet aux
contributions.

Le site est reconstruit le 3 de chaque mois depuis deux sources publiques, puis
déposé ici sur la branche `gh-pages` par une action automatique. Les scripts qui
le fabriquent vivent ailleurs.

## À quoi sert ce dépôt

**Aux contributions de terrain.** Le recensement du ministère des Sports et
OpenStreetMap disent qu'un pumptrack existe. Ils ne disent pas si le revêtement
s'est fissuré, si les modules tiennent encore, ni où se trouve exactement celui
dont personne n'a relevé les coordonnées. C'est ce que vous savez, et c'est ici
que ça se dit :

- **[Corriger ou compléter une fiche](../../issues/new?template=fiche.yml)** —
  chaque page du site porte le même lien, déjà rempli du bon identifiant.
- **[Signaler un pumptrack absent](../../issues/new?template=manquant.yml)** —
  aucune des deux sources n'est exhaustive.

Le plus utile reste les **181 positions approchées** : ces fiches affichent le
centre de leur commune faute de mieux, et sur place la vraie position se relève
en dix secondes. Voir [CONTRIBUTING.md](CONTRIBUTING.md).

Une correction faite directement dans **OpenStreetMap** revient ici toute seule à
la construction suivante, et profite à tous les autres réutilisateurs, pas
seulement à ce site.

## Ce que le site s'interdit

Une fiche n'affirme que ce qu'une source déclare. Pas de revêtement supposé, pas
d'accès « fermé » déduit d'un silence : un champ absent n'a pas été renseigné, et
ne vaut pas « non ». Chaque fiche porte sa source en clair.

## Les branches

| Branche | Contenu |
|---|---|
| `main` | ce fichier, le guide de contribution, les gabarits d'issue |
| `gh-pages` | le site construit — **écrasé à chaque publication**, n'y commitez rien |

## Données

Recensement des équipements sportifs, ministère des Sports — Licence Ouverte 2.0.
[OpenStreetMap](https://www.openstreetmap.org/copyright) — ODbL.
Communes et départements : [geo.api.gouv.fr](https://geo.api.gouv.fr).

L'inventaire complet est servi en JSON :
[pumptracks.json](https://chardonneaur.github.io/pumptracks/pumptracks.json),
et décrit pour un agent dans
[llms.txt](https://chardonneaur.github.io/pumptracks/llms.txt).
