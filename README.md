<h1 align="center">
    Tracking de Comédiens
    <br>
</h1>

<h4 align="center">Solution de suivi des comédiens en temps réel, intégrant des filtres pour exclure les données aberrantes et un lissage par EMA.</h4>

<img src="assets/acquisition_aquarium.jpg" alt="Schéma du système Localino" style="width:100%;">

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

<img src="assets/localino_schema.svg" alt="Schéma du système Localino" style="width:100%;">

L'un des principaux défis du projet réside dans la perte de qualité spatiale des données sonores. Le système WFS (Wave Field Synthesis), utilisé pour retranscrire les données spatiales du son, ne permet plus d'assurer cette fonction de manière satisfaisante. En conséquence, la qualité de la spatialisation sonore est gravement affectée.

De plus, il n'existe actuellement aucune solution efficace pour filtrer complètement les données aberrantes générées par le système Localino.

### Problématique

Le suivi en temps réel des comédiens est compromis par les limitations techniques du Localino. Ce système présente en effet deux problèmes majeurs qui affectent la précision et la fiabilité.

* **Saut de position** : Le système Localino souffre de sauts de position imprévus, où la position détectée d'un comédien peut soudainement changer drastiquement sans raison apparente. 

* **Bruit de mesure** : Le bruit constant généré par l'imprécision du matériel entraine des petites erreurs fréquentes.

### Objectifs
Les **objectifs de ce projet** sont de :

1. Filtrer **les données aberrantes** pour éviter les sauts de position.
2. Mettre en place **un lissage des données** via l'EMA (Exponential Moving Average) pour limiter le bruit constant.
3. Développer un algorithme capable de **traiter les pertes de signal** et de **prédire la trajectoire**.

## Acquisition des données

Les mesures pour le suivi en temps réel des comédiens ont été réalisées dans la salle aquarium à ISAE-Supméca. Cette salle a été choisie en raison de sa taille suffisante pour simuler une scène de théâtre.

Pour la collecte des données, quatre ancres Localino ont été installées aux coins de la salle afin de couvrir l'ensemble de l'espace de manière optimale. Un seul tag Localino a été utilisé pour suivre la position d'un comédien. Ce tag, porté par le comédien, envoie des signaux aux ancres, permettant ainsi de calculer sa position en temps réel grâce au principe de triangulation.

Les données collectées comprennent des informations sur la position du comédien à différents moments, capturées sous divers scénarios et conditions (vitesse de déplacement variable, etc.). Ces mesures initiales sont fondamentales pour analyser la performance du système Localino et identifier les sources d'erreurs et de bruit dans les données de position.

## Traitement des données

### Transformation des données

Une fois les données brutes collectées par le système Localino, nous les avons transformer en formats exploitables pour l'analyse et le développement de filtres.

Les données brutes capturées par le tag, comprenant les coordonnées de position X,Y et Z ainsi que les timestamps correspondants, ont été exportées depuis Max8 en TXT, converties d'abord en fichier CSV, puis en panda dataframe pour faciliter la manipulation des données.

### Animation des données brutes

Pour mieux comprendre les comportements des données brutes et identifier les sources d'erreurs, des animations ont été réalisées. Ces animations, crées à partir des fichiers CSV, ont permis de visualiser les trajectoires du comédien en temps réel. Nous avons pu ainsi repérer les sauts de position, les bruits constants et les autres anomalies.

### Mise en place d'un filtre sur base d'un rayon d'exclusivité

Le principe du filtre de rayon d'exclusivité repose sur la détermination d'une distance maximale que le comédien peut parcourir entre deux périodes de rafraîchissement des données. Toute position mesurée se situant en dehors de cette distance est considérée comme aberrante et est écartée.

## Mise en place de l'algorithme

### Problème du puits

### La prédiction pour régler le problème

### Le problème de l'excès de prédiction

### La correction de la prediction

### Lissage des données avec EMA

### Algorithme de filtrage final

## Développement sur MaxMSP

### Simulation de l'envoie de donnée

Pour tester et valider l'algorithme de suivi en temps réel des comédiens, une simulation de l'envoi de données a été mise en place. Cette simulation permet de reproduire les conditions réelles de collecte de données sans nécessiter une mise en scène physique constante. Ce qui nous a permis donc de travailler chacun à distance.

Les données de position du comédien ont été préenregistrées dans des fichiers CSV lors de sessions de test.
Un script en JavaScript a été développé pour simuler l'envoi des données à partir des fichiers CSV.
Le script lit les données du fichier CSV et les envoie à intervalles réguliers (par exemple, toutes les 200 millisecondes) pour imiter la fréquence de rafraîchissement du système Localino.
Un objet Max (bang) a été utilisé pour déclencher l'importation du fichier CSV et démarrer la simulation.
Les données simulées sont ensuite visualisées en temps réel dans la console de Max8 pour observer le comportement de l'algorithme.

<img src="assets/simulation_max8.gif" alt="Schéma du système Localino" style="display: block; margin-left: auto; margin-right: auto;">


### Choix de la solution
<img src="assets/tableau_comparaison_solution.png" alt="Schéma du système Localino" style="width:100%;">

### Implémentation dans Max8

### Analyse des résultats

## Ce qu'il faut retenir

### Toutes les valeurs aberrantes ont été exclues

L'algorithme de filtrage basé sur le rayon d'exclusivité a démontré une grande efficacité dans l'élimination des valeurs aberrantes. Les positions situées en dehors du rayon défini par rapport à la dernière position valide ont été rejetées, réduisant donc les sauts brusques.

<img src="assets/conclusion_exclusion_valeurs_aberrantes.gif" alt="Schéma du système Localino" style="display: block; margin-left: auto; margin-right: auto;">


### L'algorithme EMA permet un lissage complet du parcours

L'utilisation de l'algorithme EMA a amélioré la fluidité des trajectoires. En appliquant un coefficient de lissage adapté, l'EMA a atténué les fluctuations mineures, qui fournit maintenant des trajectoires plus stables et réalistes. Il faut donc éviter d'activer le smoother d'origine pour éviter de rajouter de la latence inutilement.

### Notre algorithme ne prédit pas lorsque l'on perd la connexion

### Nous constatons une lègere latence 

Une légère latence de 400ms (sans coupures) a été observée dans le suivi des positions en temps réel. Cette latence est principalement due au coefficient $\alpha$ associé au smoother. Toutefois, cette latence est restée dans des limites acceptables pour les applications prévues.

### L'Histoire des Timestamps

Lors des tests, il a été observé que les timestamps des positions capturées étaient décalés, ce qui signifie que les positions enregistrées n'étaient pas alignées avec les moments réels des mouvements des comédiens.

