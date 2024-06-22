<h1 align="center">
    Tracking de Comédiens
    <br>
</h1>

<h4 align="center">Solution de suivi des comédiens en temps réel, intégrant des filtres pour exclure les données aberrantes et un lissage par EMA.</h4>

## Sommaire

- [Introduction](#installation)
    - [Contexte](#composer)
    - [Problématique](#ddev)
    - [Objectifs](#ddev)
- [Méthodologie](#typo3-setup)
    - [Acquisition des données](#database-setup)
    - [Traitement des données](#security)
    - [Mise en place de l'algorithme](#security)
- [Développement sur Max8](#page-setup)
    - [Download the Aimeos Page Tree t3d file](#download-the-aimeos-page-tree-t3d-file)
    - [Go to the Import View](#go-to-the-import-view)
- [Ce qu'il faut retenir](#page-setup)
- [Remerciements](#links)

## Introduction

### Contexte

Le projet de suivi de comédiens en temps réel utilise le système Localino, une solution industrielle de localisation basée sur la triangulation. Ce système permet de déterminer la position d'un objet ou d'une personne en utilisant une balise et au moins trois ancres. Cependant, le système actuel souffre de problèmes significatifs de précision, notamment des sauts de position et des bruits.

<img src="assets/localino_schema.jpg" alt="Schéma du système Localino" style="width:100%;">

L'un des principaux défis du projet réside dans la perte de qualité spatiale des données sonores. Le système WFS (Wave Field Synthesis), utilisé pour retranscrire les données spatiales du son, ne permet plus d'assurer cette fonction de manière satisfaisante. En conséquence, la qualité de la spatialisation sonore est gravement affectée.

De plus, il n'existe actuellement aucune solution efficace pour filtrer complètement les données aberrantes générées par le système Localino.

###