Tutoriel pour le logiciel SUMO
==============

**Table des matières**
1. [Introduction](#introduction)
1. [Liste des outils](#liste-des-outils)
1. [Réseaux de transport](#réseaux-de-transport)
1. [Demande de déplacements](#demande-de-déplacements)
1. [Simulation](#simulation)
1. [Configuration des carrefours](#configuration-des-carrefours)
1. [Collecte de données](#collecte-de-données)
1. [Annexes](#annexes)

Ce tutoriel est en développement actif dans le cadre du cours de Circulation CIV8740. 

# Introduction
Le logiciel [SUMO, pour "Simulation of Urban MObility",](https://sumo.dlr.de) est un logiciel de simulation microscopique de la circulation dont le code est sous license libre ("open source"). Il permet de représenter les réseaux de transport terrestre, en particulier la circulation routière. Il est développé par l'[agence aérospatiale allemande DLR](https://www.dlr.de). Ce tutoriel se concentrera sur les déplacements des véhicules motorisés et cyclistes, mais SUMO peut aussi représenter les déplacements piétons et le transport en commun. 

La plupart des fichiers sont des fichiers textes suivant le format "Extensible Markup Language" (XML), soit "langage de balisage extensible", qui est un métalangage informatique de balisage générique (voir https://fr.wikipedia.org/wiki/Extensible_Markup_Language). Assurez-vous d'avoir un bon éditeur texte pour éditer ces fichiers directement, par exemple [Notepad++}(https://notepad-plus-plus.org/) sur Windows, [Atom](https://atom.io/) ou [emacs](https://www.gnu.org/software/emacs/) sur toutes les plateformes. Il est **très important** d'avoir des [compétences informatiques minimales](https://sumo.dlr.de/docs/Basics/Basic_Computer_Skills.html) de manipulation des fichiers textes, du format XML et de l'utilisation d'outils en ligne de commande pour utiliser SUMO.

La documentation de référence de SUMO est en anglais et est disponible en ligne sur le [wiki du projet](https://sumo.dlr.de/docs/), avec un [guide utilisateur](https://sumo.dlr.de/docs/SUMO_User_Documentation.html) et un [glossaire](https://sumo.dlr.de/docs/Other/Glossary.html). Plusieurs tutoriels en anglais sont aussi [disponibles}(https://sumo.dlr.de/docs/Tutorials.html).

# Liste des outils
De nombreux outils ([liste](https://sumo.dlr.de/docs/Sumo_at_a_Glance.html#included_applications)) sont disponibles dans SUMO, parmi lesquels les plus utilisés seront
* [netedit](https://sumo.dlr.de/docs/NETEDIT): outil graphique d'édition du réseau, de la demande et d'autres attributs de la simulation 
* [netconvert](https://sumo.dlr.de/docs/NETCONVERT): outil en ligne de commande de conversion des éléments de réseau au format SUMO
* [netgenerate](https://sumo.dlr.de/docs/NETGENERATE.html): outil en ligne de commande de génération de réseaux abstraits
* plusieurs outils d'affectation de la demande au réseau comme duarouter, jtrrouter, etc.
* [sumo-gui](https://sumo.dlr.de/docs/SUMO-GUI.html): interface graphique de simulation
* [sumo](https://sumo.dlr.de/docs/SUMO.html): outil en ligne de commande de simulation
* plusieurs outils comme des scripts Python pour faciliter la création de fichier ou leur conversion, disponibles dans le répertoire `tools` du dossier `Sumo` (répertoire d'installation sur Windows, `/usr/share/sumo/` sur Linux). 

Le processus général pour construire un scénario SUMO est décrit dans un [tutoriel](https://sumo.dlr.de/docs/Tutorials/ScenarioGuide.html). Les deux tutoriels suivant montrent pas à pas comment construire un petit scénario SUMO:
* ["Hello World"](https://sumo.dlr.de/docs/Tutorials/Hello_World.html)
* ["Quick start"](https://sumo.dlr.de/docs/Tutorials/quick_start.html)

Un scénario nécessite au moins les fichiers suivants: 
* un fichier de configuration de SUMO, avec extension `.sumocfg`;
* un réseau routier, avec extension `.net.xml`;
* un fichier de demande de déplacement, incluant des itinéraires, avec extension `.rou.xml`.
Tous ces fichiers sont au format texte XML. Il est possible d'exécuter une simulation avec les outils sumo ou sumo-gui, en leur indiquant directement d'utiliser les fichiers réseau et demande, ou en utilisant un fichier de configuration qui fait référence à ces deux fichiers et inclue d'autres paramètres de simulation. Cela est présenté en détail dans la section [Simulation](#simulation).

# Réseaux de transport
Il existe différentes façons de créer ou importer des réseaux de transport dans SUMO. Une des forces est la facilité d'importer des données d'[OpenStreetMap](https://www.openstreetmap.org/). 

La configuration des carrefours (mouvement permis, priorités et types de contrôle) sera abordée dans une autre [section](#configuration-des-carrefours). 

Un réseau SUMO est constitué de liens ("edge"), une ou plusieurs voies ("lane") par lien, de carrefours ("junction") et de connections ("connection") entre liens. Le format et ces éléments sont décrits sur le [wiki](https://sumo.dlr.de/docs/Networks/SUMO_Road_Networks.html).

Le format de réseau de transport de SUMO n'est pas fait pour être édité manuellement. Pour éditer les fichiers du réseau, la procédure recommandée consiste à utiliser [netconvert](https://sumo.dlr.de/docs/NETCONVERT.html) pour convertir le réseau en descriptions XML natives, à éditer ces fichiers, puis à utiliser de nouveau netconvert pour reconstruire le réseau ensuite. 

Un exemple est la construction du réseau jouet "hello" utilisé comme exemple dans ce tutoriel, disponible dans le [répertoire sumo](sumo). Ce réseau est constitué 
* de quatre noeuds:
```xml
<nodes>
  <node id="1" x="-250.0" y="0.0" />
  <node id="2" x="+250.0" y="0.0" />
  <node id="3" x="+500.0" y="100.0" />
  <node id="4" x="+500.0" y="-100.0" />
</nodes>
```
* et de trois liens:
```xml
<edges>
    <edge from="1" id="1to2" to="2" />
    <edge from="2" id="2to3" to="3" />
    <edge from="2" id="2to4" to="4" />
</edges>
```
Ces deux fichiers sont ensuite combinés dans un fichier réseau avec netconvert:
```$ netconvert --node-files=hello.nod.xml --edge-files=hello.edg.xml --output-file=hello.net.xml --no-internal-links```

## Importer un réseau d'OpenStreetMap
Il existe deux méthodes pour importer des données d'[OpenStreetMap](https://www.openstreetmap.org/). 

### Téléchargement d'OpenStreetMap et importation simple
La méthode consiste à naviguer sur le site d'[OpenStreetMap](https://www.openstreetmap.org/), trouver la zone dont on désire importer les données et à les exporter en cliquant sur le bouton tel que montré dans l'image ci-dessous. 
![Export OSM](images/osm-export.png)
Si vous connaissez déjà les coordonnées (latitude, longitude) de la zone d'intérêt, il est possible d'y accéder directement via le navigateur avec une adresse du type https://overpass-api.de/api/map?bbox=-73.7754,45.5628,-73.7653,45.5691, ou via l'outil `wget` en ligne de commande: ```$ wget -O map.osm "https://overpass-api.de/api/map?bbox=-73.7754,45.5628,-73.7653,45.5691"```

Le fichier obtenu `.osm` est ensuite converti en fichier réseau SUMO `.net.xml` avec la commande: ```$ netconvert --geometry.remove --remove-edges.isolated --junctions.join --osm map.osm -o map.net.xml```. Les options `--geometry.remove` et `--junctions.join` ont pour effets respectifs de simplifier la géométrie du réseau sans changer sa topologie et de consolider les carrefours proches, par exemple d'une route séparée en deux par une médiane dans OSM, ce qui donnerait deux carrefours rapprochés (l'option --junctions.join-dist contrôle le seuil de distance pour fusionner deux carrefours). L'option `--remove.edges.isolated` permet d'éliminer les tronçons isolés. D'autres options sont décrites sur le wiki de SUMO ([options recommandées](https://sumo.dlr.de/docs/Networks/Import/OpenStreetMap.html#Recommended_NETCONVERT_Options)). Il est aussi possible d'utiliser des [typemaps](https://sumo.dlr.de/docs/Networks/Import/OpenStreetMap.html#recommended_typemaps) lorsque des données comme les limites de vitesse sont manquantes. 

Lors de la conversion d'un fichier `.osm` en réseau SUMO, il est possible de ne garder qu'un seul type de route avec la commande ```$ netconvert --osm-files map.osm  --keep-edges.by-type highway.motorway,highway.primary,highway.secondary,highway.tertiary,highway.trunk,highway.primary_link,highway.secondary_link,highway.tertiary_link,highway.motorway_link,highway.residential -o map.net.xml``` ou de sélectionner les routes selon les types d'usagers qui y circulent avec la commande ```$ netconvert --osm-files map.osm --remove-edges.by-vclass pedestrian,bicycle,delivery -o map.net.xml``` (les pistes cyclables et autres routes reservées aux piétons et à la livraison sont supprimés).

D'autres commandes permettent de deviner le bon sens de circulation au niveau des ronds points avec `--roudabouts.guess` ou de les bretelles d'entrée et de sortie d'autoroutes si elles manquent avec `--guess.ramps`. 

### Script intégré d'importation
Le script `osmWebWizard.py` situé dans le répertoire `tools` permet d'importer des données d'OpenStreetMap et de générer une demande de déplacement via une interface Internet. 
![Export OSM](images/osm-web-wizard.png)
Après génération du scénario, il est automatiquement ouvert dans sumo-gui. Il est généralement nécessaire de retoucher le réseau avec netedit. 

## Créer un réseau géométrique
netgenerate

Exemples de réseaux http://sumo.dlr.de/wiki/Data/Networks

## Créer et modifier un réseau
Cette sous-section explique comment créer un réseau à partir de rien et comment modifier un réseau existant avec l'utilitaire `netedit`.

explication dans l'exemple hello Exemple le plus simple https://sumo.dlr.de/docs/Tutorials/Hello_Sumo.html 

Graphes: noeuds et arrêtes 



TODO gérer les limites de vitesse, comprendre les dead-end, functional edge



# Demande de déplacements
Dans SUMO, un véhicule est défini par trois éléments: 
* un type de véhicule qui décrit ses propriétés physiques;
* l'itinéraire que le véhicule suivra;
* le véhicule lui-même.

Un déplacement ("trip") correspond au déplacement d'un véhicule d'un endroit à un autre, défini par un lien de départ, un lien d'arrivée et un instant de départ. Un itinéraire ("route") est un déplacement généralisé, c'est-à-dire une définition d'itinéraire qui contient non seulement les liens de départ et d'arrivée, mais aussi les liens par lesquels le véhicule passera. 

## Définition des véhicules et itinéraires
Une simulation SUMO a besoin d'itinéraires pour les déplacements des véhicules. Il peuvent être générés de [différentes façons](https://sumo.dlr.de/docs/Demand/Introduction_to_demand_modelling_in_SUMO.html). Ces éléments sont définis dans un fichier de demande de déplacement `.rou.xml`, par exemple `hello.rou.xml` pour notre exemple (voir la section [Simulation](#simulation) pour le fichier de configuration sumo `.sumocfg` nécessaire pour exécuter une simulation avec ce fichier d'itinéraires et le fichier du réseau).

Une première façon consiste à définir un véhicule avec un itinéraire (pour lui seulement): 
```xml
<routes>
  <vehicle id="0" depart="0" color="red">
    <route edges="1to2 2to3"/>
  </vehicle>
</routes>
```
De cette façon, SUMO construira un véhicule rouge d'identifiant 0 qui commence son déplacement à l'instant 0. Ce véhicule suivra les liens 1to2 puis 2to3 puis disparaîtra à la fin du dernier lien (la liste de liens peut être aussi longue que désirée, du type "lien1 lien2 lien3 ... lienn"). Ce véhicule a son propre itinéraire qui n'est pas partagé avec les autres véhicules. Il est possible de définir deux véhicules se déplaçant selon le même itinéraire, auquel cas l'itinéraire doit être défini à l'extérieur du véhicule et avoir un identifiant:
```xml
<routes>
  <route id="route0" edges="1to2 2to3"/>
  <vehicle id="0" route="route0" depart="0" color="red">
  <vehicle id="1" route="route0" depart="0" color="blue"/>
</routes>
```
Les itinéraires doivent comprendre au mois un lien et être connectés. La simulation produira une erreur si un lien ne suit pas le précédent ou si le véhicule n'est pas autorisé sur aucune de ses voies (il est possible d'ignorer ces erreurs avec l'options "--ignore-route-errors" auquel cas le véhicule s'arrête sur le dernier lien autorisé, puis est supprimé (téléporté)). Un itinéraire n'a que trois attributs, soit son identifiant, la liste de liens, et, optionnellement comme les véhicules, un attribut "color". 

Les attributs possibles d'un véhicule sont décrits dans le tableau suivant (les éléments en gras sont requis): 

| Attribut  | Type de valeur                                                                    | Description                            |
| --------------- | ----------------------------------------------------------------------------- | -------------------------------------- |
| **id**          | id (string)                                                                   | Identifiant du véhicule                |
| type            | id                                                                            | Identifiant du type de véhicule (voir plus bas)   |
| route           | id                                                                            | Identifiant de l'itinéraire suivi par le véhicule               |
| color           | color (texte ("red") ou triplet d'entiers)                                                   | Couleur du véhicule |
| **depart**      | float(s)/string (≥0, "triggered", "containerTriggered")                         | Instant auquel le véhicule entre sur le réseau |
| departLane      | int/string (≥0, "random", "free", "allowed", "best", "first")                 | Voie sur laquelle le véhicule sera inséré (défaut "first")  |
| departPos       | float(m)/string ("random", "free", "random_free", "base", "last")            | Position (longitudinale) à laquelle le véhicule entre sur le réseau (défault "base") |
| departSpeed     | float(m/s)/string (≥0, "random", "max", "desired", "speedLimit")              | Vitesse à laquelle le véhicule entre sur le réseeau (défaut 0) |
| arrivalLane     | int/string (≥0, "current")                                                     | Voie par laquelle le véhicule quitte le réseau (défaut "current") |
| arrivalPos      | float(m)/string (≥0, "random", "max")                           | Position à laquelle le véhicule quitte le réseau (défaut "max") |
| arrivalSpeed    | float(m/s)/string (≥0,"current")                                              | Vitesse à laquelle le véhicule quitte le réseau (default "current") |
| personNumber    | int (in \[0,personCapacity\])                                                 | Numobre de sièges occupés quand le véhicule est inséré (default 0) |
| departPosLat    | float(m)/string ("random", "free", "random_free", "left", "right", "center") | Position latérale sur la voie de départ à l'insertion du véhicule (soir [modèles de positionnement dans la voie](https://sumo.dlr.de/docs/Simulation/SublaneModel.html)) (défault "center") |
| arrivalPosLat   | float(m)/string ("left", "right", "center")                                   | Position latérale sur la voie de départ à la sortie du véhicule (soir [modèles de positionnement dans la voie](https://sumo.dlr.de/docs/Simulation/SublaneModel.html)) (par défault le véhicule ne se préoccupe pas de sa position latérale à l'arrivée) |

Vous pouvez trouver plus de détails sur les attributs de dépat et d'arrivée ("depart*" et "arrival*") de chaque véhicule dans la [documentation de SUMO](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#a_vehicles_depart_and_arrival_parameter). En particulier, il est utile d'expliquer les valeurs possibles pour la vitesse du véhicule lors de son insertion (selon maxSpeed = MIN(speedLimit * speedFactor, vTypeMaxSpeed)):
* ≥0: la simulation essaie d'insérer le véhicule à la vitesse donnée. Si la vitesse n'est pas sécuritaire, l'instant de départ est retardé.
* "random": une vitesse est tirée aléatoirement entre 0 et maxSpeed et peut être adaptée pour assurer une distance sécuritaire au véhicule meneur.
* "max": maxSpeed est utilisée et peut être adaptée pour assurer une distance sécuritaire au véhicule meneur.
* "desired": maxSpeed est utilisée. Si la vitesse n'est pas sécuritaire, l'instant de départ est retardé.
* "speedLimit": La limite de vitesse de la voie est utilisée. Si la vitesse n'est pas sécuritaire, l'instant de départ est retardé.
Il existe d'[autres attributs](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#vehicles_and_routes) qu'il n'est pas nécessaire de connaître dans un premier temps. Tout type de véhicule (défini ci-dessous) ou d'itinéraire doit avoir été défini avant d'être utilisé, par exemple pour l'assigner à un véhicule. 

## Définition de flux de véhicules
Il est possible de définir des flux de véhicules ("flow"). Ils ont les mêmes paramètres que les véhicules, à l'exception de l'instant de départ ("depart"). Leur identifiant est "flowId.runningNumber". Les véhicules entrent sur le réseau avec des temps inter-véhiculaires égaux ou distribués aléatoirement pendant un intervalle donné. Ils ont les attributs supplémentaires suivants: 

| Attribut  | Type de valeur                                                                    | Description                            |
| -------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| begin          | float(s)       | Instant de départ du premier véhicule |
| end            | float(s)       | Instant de fin de l'intervalle des départs (if non défini, 24 h par défaut) |
| vehsPerHour    | float(\#/h)    | Nombre de véhicules par heure, insérés avec des TIV égaux (ne peut être utilisé avec period ou probability) |
| period         | float(s)       | Valeur du TIV entre chaque véhicule inséré (ne peut être utilisé avec vehsPerHour ou probability) |
| probability    | float(\[0,1\]) | Probabilité d'émettre un véhicule à chaque seconde (ne peut être utilisé avec vehsPerHour ou period) (voir le [caractère aléatoire des simulations](#simulation)) |
| number         | int(\#)        | Nombre total de véhicules, insérés avec des TIV égaux |

Voici une définition d'un fichier d'itinéraire pour un flux avec un itinéraire (il est aussi possible de [structurer l'itinéraire dans le flux](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#repeated_vehicles_flows)):
```xml
<routes>
  <route id="route0" edges="1to2 2to3"/>
  <flow id="flow0" route="route0" begin="0" vehsPerHour="1000" color="red"/>
</routes>
```
Et la définition de deux flux avec deux itinéraires, avec le second flux générant des véhicules à partir de 50 s après le début de la simulation: 
```xml
<routes>
  <route id="route0" edges="1to2 2to3"/>
  <route id="route1" edges="1to2 2to4"/>
  <flow id="flow0" route="route0" begin="0" vehsPerHour="1000" color="red"/>
  <flow id="flow1" route="route1" begin="50" vehsPerHour="500" color="blue"/>
</routes>
```
Pour générer par exemple 1000 véh/h, soit un véhicule tous les 3.6 s, il est équivalent d'utiliser vehsPerHour="1000", period="3.6" et number="1000" avec begin="0" et end="3600" (dans le dernier cas, les véhicules ne seront simulés quand pendant 3600 s, alors qu'il est possible de définir l'intervalle de simulation indépendamment avec "vehsPerHour" et "period"). 

Dans la réalité, les TIV entre véhicules ne sont pas égaux, même lorsque le débit reste constant sur une longue période de temps, mais varient autour de la valeur moyenne. Cela peut être reproduit en utilisant l'attribut "probability":
```xml
<routes>
  <route id="route0" edges="1to2 2to3"/>
  <route id="route1" edges="1to2 2to4"/>
  <flow id="flow0" route="route0" begin="0" probability="0.2" color="red"/>
  <flow id="flow1" route="route1" begin="0" probability="0.1" color="blue"/>
</routes>
```
Dans ce cas, le flux "flow0" génère en moyenne 0.2 véh par seconde (le nombre de véhicules arrivant pendant n intervalles de 1 s suit la [loi binomiale de paramètre n et probability](https://sumo.dlr.de/docs/Simulation/Randomness.html#flows_with_a_random_number_of_vehicles)), soit 720 véh/h, et le flux "flow1" la moitié, soit 360 véh/h. 

On peut noter qu'il est aussi possible de modifier de façon aléatoire les instants de départ de tous les véhicules avec le paramètre --random-depart-offset en ligne de commande ou en ajoutant la portion suivante dans le fichier de configuration `.sumocfg` (avec une graine d'initialisation de la simulation):
```xml
<random>
  <random-depart-offset value="5.0"/>
  <seed value="42"/>
</random>
```
Il est aussi possible de faire varier les débits dans le temps avec plusieurs flux sur des intervalles de temps successifs:
```xml
<routes>
  <route id="route0" edges="1to2 2to3"/>
  <flow id="flow0" route="route0" begin="0" end="100" vehsPerHour="1000" color="red"/>
  <flow id="flow1" route="route0" begin="100" end="200" vehsPerHour="200" color="blue"/>
</routes>
```

## Itinéraires incomplets et distributions d'itinéraires
Les itinéraires peuvent être incomplets et prendre simplement la forme de liens d'origine et de destination avec les attributs "from" et "to", sans la liste complète des liens à parcourir. Dans ce cas, l'itinéraire assigné aux véhicules repose est le plus court chemin selon les conditions de circulation au début du déplacement (pour un "trip") ou du flux (pour un "flow"):
```xml
<routes>
  <flow id="flow0" from="1to2" to="2to3" begin="0" vehsPerHour="1000" color="red"/>
  <flow id="flow1" from="1to2" to="2to4" begin="50" vehsPerHour="500" color="blue"/>
</routes>

<routes>
  <trip id="1" depart="0" from="1to2" to="2to3"/>
</routes>
```
Les attributs des "trip" et "flow" sont décrits complètement sur la [page décrivant le choix d'itinéraire par plus court chemin](https://sumo.dlr.de/docs/Demand/Shortest_or_Optimal_Path_Routing.html). 

Pour résumer, il faut soit définir des véhicules avec des itinéraires complets, soit des flux avec des itinéraires complets, soit des déplacements ("trip") ou des flux avec des origines et destinations, la simulation trouvant l'itinéraire complet de chaque véhicule lors de son exécution (ou les itinéraires peuvent être pré-calculés avec [duarouter](https://sumo.dlr.de/docs/Demand/Shortest_or_Optimal_Path_Routing.html)). 

Enfin, il existe d'autres solutions qui utilisent
* des [ensembles de liens constituant des zones](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#traffic_assignement_zones_taz) (zones de trafic ou "traffic analysis zones" utilisées en transport) comme origine et destination des itinéraires;
* des [carrefours](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#routing_between_junctions) comme origine et destination. 

Il est aussi possible d'utiliser des distributions d'itinéraires avec des probabilities pour chaque itinéraires (tirés lors de la simulation):
```xml
<routes>
  <routeDistribution id="routedist1">
    <route id="route0" edges="1to2 2to3" color="red" probability="2"/>
    <route id="route1" edges="1to2 2to4" color="blue" probability="1"/>
  </routeDistribution>
  <flow id="flow0" route="routedist1" begin="0" vehsPerHour="1000"/>
</routes>
```
L'exemple est équivalent au précédent en terme de proportion des véhicules suivant les deux itinéraires. Il n'est pas nécessaire que la somme des probabilités soit égale à 1, les probabilités sont proportionnelles aux nombres données. 

## Définition de types de véhicules
Un type de véhicule (élément "vtype") définit une catégorie de véhicule avec des attributs communs. L'exemple suivant montre la définition du "type1" de véhicule avec les paramètres standards utilisés dans le modèle de Stefan Krauss:
```xml
<routes>
  <vType id="type1" accel="2.6" decel="4.5" sigma="0.5" length="5" maxSpeed="30" color="blue"/>
  <vehicle id="veh1" type="type1" depart="0">
    <route edges="1to2 2to3"/>
  </vehicle>
</routes>
```
Ces paramètres définissent des caractéristiques physiques comme sa couleur, longueur et accélération maximale, et des paramètres du modèle de poursuite (attention à leur interprétation, il faut se renseigner sur le fonctionnement du modèle pour comprendre leur rôle). Le modèle de conduite utilisé fait partie des différents attributs d'un type de véhicule:

| Attribut  | Type de valeur | Valeur par défaut | Description  |
| ----------------- | --------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------- |
| **id**            | id (string)                       | \-                                                                  | Identifiant du type de véhicule |
| accel             | float                             | 2.6                                                                 | Capacité d'accélération des véhicules (m/s^2) |
| decel             | float                             | 4.5                                                                 | Capacité de décélération des véhicules (m/s^2) |
| apparentDecel     | float                             | `==decel`                                                           | Décélération apparent des véhicules selon la modèle standard (m/s^2); le suiveur utilise cette valeur comme décélération maximale attendue pour le meneur |
| emergencyDecel    | float                             | `==decel`                                                           | Décélération maximale physiquement possible des véhicules (m/s^2) |
| sigma             | float                             | 0.5                                                                 | Paramètre des [modèles de poursuite](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#car-following_models), voir ci-dessous |
| tau               | float                             | 1.0                                                                 | Paramètre des [modèles de poursuite](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#car-following_models), voir ci-dessous |
| length            | float                             | 5.0                                                                 | Longueur **nette** du véhicule (m) |
| minGap            | float                             | 2.5                                                                 | Espace vide après le meneur (m) |
| maxSpeed          | float                             | 55.55 m/s (200 km/h) pour les véhicules, 1.39 m/s (5 km/h) pour les piétons | Vitesse maximale des véhicules (m/s) |
| speedFactor       | float                             | 1.0                                                                 | Multiplicateur de la limite de vitesse de la voie pour les véhicules |
| speedDev          | float                             | 0.1                                                                 | Écart-type du speedFactor; voir ci-dessous pour les détails (certaines vClass ont une valeur par défaut différente) |
| color             | [RGB-color](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#colors)   | "1,1,0" (yellow)                                                    | Couleur de ce type de véhicule |
| vClass            | class (enum)                      | "passenger"                                                         | [Classe de véhicule abstraite (voir ci-dessous)](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#abstract_vehicle_class). Par défaut, la classe des véhicules est celle de véhicule passager (légers) typique. |
| emissionClass     | emission class (enum)             | ["PC_G_EU4"](Models/Emissions/HBEFA3-based.md)            | [Classe d'émission (voir ci-dessous)](#vehicle_emission_classes). Par défaut, un véhicule passager à essence suit le standard d'émission *EURO 4*.                                                           |
| guiShape          | shape (enum)                      | "unknown"                                                           | [Forme du véhicule à dessiner](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#visualization). Par défaut, une forme standard de véhicule passager est dessinée. |
| width             | float                             | 1.8                                                                 | Largeur du véhicule (m) (utilisé seulement pour la visualisation du modèle par défaut, affectes [le modèle dans la voie](https://sumo.dlr.de/docs/Simulation/SublaneModel.html)) |
| height            | float                             | 1.5                                                                 | Hauteur du véhicule (m) |
| collisionMinGapFactor | float                             | dépend du modèle de poursuite (1.0 pour la plupart des modèles) | Fraction minimal de minGap qui doit être maintenu par le véhicule meneur pour éviter une collision |
| imgFile           | filename (string)                 | ""                                                                  | Fichier image pour le rendu des véhicules (devrait être en niveau de gris pour permettre la coloration) |
| osgFile           | filename (string)                 | ""                                                                  | Fichier objet pour le rendu avec OpenSceneGraph (tout type de fichier supporté par les plugins OSG disponibles) |
| laneChangeModel   | lane changing model name (string) | 'LC2013'                                                            | Modèle utilisé pour changer de voie |
| carFollowModel    | car following model name (string) | 'Krauss'                                                            | [Modèle de poursuite](https://sumo.dlr.de/docs/Definition_of_Vehicles, _Vehicle_Types,_and_Routes.html#car-following_models) utilisé |
| personCapacity    | int                               | 4                                                                   | Nombre maximal de personnes que le véhicule peut transporter |
| containerCapacity | int                               | 0                                                                   | Nombre maximal de conteneur que le véhicule peut transporter |
| boardingDuration  | float                             | 0.5                                                                 | Temps nécessaire pour qu'une personne monte à bord du véhicule |
| loadingDuration   | float                             | 90.0                                                                | Temps requis pour charger un conteneur dans le véhicule |
| latAlignment      | string                            | center                                                            | Positionnement latéral préféré dans le [modèle dans la voie](https://sumo.dlr.de/docs/Simulation/SublaneModel.html) ("left", "right", "center", "compact", "nice", "arbitrary") |
| minGapLat         | float                             | 0.6                                                                 | Créneau minimal désiré dans le [modèle dans la voie](https://sumo.dlr.de/docs/Simulation/SublaneModel.html) |
| maxSpeedLat       | float                             | 1.0                                                                 | Vitesse latérale maximale dans le [modèle dans la voie](https://sumo.dlr.de/docs/Simulation/SublaneModel.html) |
| actionStepLength  | float                             | valeur globale par défaut (égale au pas de simulation, configurable via `--default.action-step-length`) | Durée de l'intervalle pendant lequel le véhicule effectue sa logique de décision (accélération et changement de voie). La valeur donnée est ajustée à la valeur la plus proche qui est un multiple positif du pas de simulation (si possible plus petite). |

Si aucun type de véhicule n'est défini, un type de véhicule par défaut sera utilisé ("DEFAULT_VEHTYPE" dans sumo-gui). Les informations sur les modèles de poursuite disponibles dans sumo sont présentées sur le [wiki](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#car-following_models).

L'exemple suivant définit deux types de véhicules:
```xml
<routes>
  <vType id="type1" accel="2.6" decel="4.5" sigma="0.5" length="5" speedFactor="1.0" speedDev="0.1" maxSpeed="30" color="blue"/>
  <vType id="type2" accel="1.3" decel="2.3" sigma="0.5" length="10" speedFactor="0.7" speedDev="0.1" maxSpeed="20" color="red"/>
  <flow id="flow1" type="type1" from="1to2" to="2to3" begin="0" vehsPerHour="1000"/>
  <flow id="flow2" type="type2" from="1to2" to="2to4" begin="0" vehsPerHour="500"/>
</routes>
```
Il est aussi possible d'utiliser des distributions de types de véhicule (tirées lors de la simulation) en ajoutant un attribut probability pour chaque type:
```xml
<routes>
  <vTypeDistribution id="typedist1">
    <vType id="type1" accel="2.6" decel="4.5" sigma="0.5" length="5" speedFactor="1.0" speedDev="0.1" maxSpeed="30" color="blue" probability="2"/>
    <vType id="type2" accel="1.3" decel="2.3" sigma="0.5" length="10" speedFactor="0.7" speedDev="0.1" maxSpeed="20" color="red" probability="1"/>
  </vTypeDistribution>
  <flow id="flow0" type="typedist1" from="1to2" to="2to3" begin="0" vehsPerHour="1500"/>
</routes>
```
La distribution peut utiliser des types définis préalablement:
```xml
<routes>
  <vType id="type1" accel="2.6" decel="4.5" sigma="0.5" length="5" speedFactor="1.0" speedDev="0.1" maxSpeed="30" color="blue" probability="2"/>
  <vType id="type2" accel="1.3" decel="2.3" sigma="0.5" length="10" speedFactor="0.7" speedDev="0.1" maxSpeed="20" color="red" probability="1"/>
  <vTypeDistribution id="typedist1" vTypes="type1 type2"/>
  <flow id="flow0" type="typedist1" from="1to2" to="2to3" begin="0" vehsPerHour="1500"/>
</routes>
```
Il est enfin possible de combiner des distributions de types de véhicule avec des distributions d'itinéraires:
```xml
<routes>
  <vTypeDistribution id="typedist1">
    <vType id="type1" accel="2.6" decel="4.5" sigma="0.5" length="5" speedFactor="1.0" speedDev="0.1" maxSpeed="30" color="blue" probability="2"/>
    <vType id="type2" accel="1.3" decel="2.3" sigma="0.5" length="10" speedFactor="0.7" speedDev="0.1" maxSpeed="20" color="red" probability="1"/>
  </vTypeDistribution>
  <routeDistribution id="routedist1">
    <route id="route0" edges="1to2 2to3" color="red" probability="2"/>
    <route id="route1" edges="1to2 2to4" color="blue" probability="1"/>
  </routeDistribution>
  <flow id="flow0" type="typedist1" route="routedist1" begin="0" vehsPerHour="1500"/>
</routes>
```
Il est aussi possible d'utiliser les classes abstraites de véhicule:
```xml
<routes>
  <vTypeDistribution id="typedist1">
    <vType id="type1" vclass="passenger" color="blue" probability="2"/>
    <vType id="type2" vclass="truck" length="10" guiShape="delivery" color="red" probability="1"/>
  </vTypeDistribution>
  <flow id="flow0" type="typedist1" from="1to2" to="2to3" begin="0" vehsPerHour="1500"/>
</routes>
```
Ces classes existantes ont des valeurs par défaut pour l'attribut speedDev (écart-type du speedFactor):
* passenger (default vClass): 0.1
* pedestrian: 0.1
* bicycle: 0.1
* truck, trailer, coach, delivery, taxi: 0.05
* tram, rail_urban, rail, rail_electric, rail_fast: 0
* emergency: 0
* everything else: 0.1

## Distributions de vitesses
Tous les conducteurs n'ont pas le même comportement de choix de leur vitesse, ce qui est représenté dans SUMO par la distribution de l'attribut speedFactor de chaque véhicule, obtenu par l'utilisation des paramètres speedFactor et speedDev des types de véhicule. Il est possible d'utiliser l'option globable de sumo `--default.speeddev` comme valeur par défaut. Il est donc possible d'éliminer la variabilité des choix de vitesses par les conducteur en fixant cette valeur à 0. 

Une façon alternative de définir la distribution des speedFactor est d'utiliser la notation "norm(mean, dev)" or "normc(mean, dev, min, max)" pour des distributions normales de paramètres mean et dev, la seconde version étant tronquée entre min et max. Utiliser speedFactor=norm(1, 0.1) est identique à speedFactor = 1 et speedDev = 0.1.

```xml
<routes>
  <vType id="type1" accel="2.6" decel="4.5" sigma="0.5" length="5" speedFactor="normc(1.0,0.1,0.6,1.3)" maxSpeed="30" color="blue"/>
  <vType id="type2" accel="1.3" decel="2.3" sigma="0.5" length="10" speedFactor="normc(0.7,0.1,0.5,0.9)" maxSpeed="20" color="red"/>
  <flow id="flow1" type="type1" from="1to2" to="2to3" begin="0" departSpeed="desired" vehsPerHour="1000"/>
  <flow id="flow2" type="type2" from="1to2" to="2to4" begin="0" departSpeed="desired" vehsPerHour="500"/>
</routes>
```
On peut noter l'usage de la vitesse désirée ("desired") lors de l'insertion du véhicule qui dépend de speedFactor (tiré lors de la simulation pour chaque véhicule dans la distribution de son type). 

# Simulation
https://sumo.dlr.de/docs/Simulation/Basic_Definition.html

soit -r -n en ligne de commande, soit via fichier de configuration sumocfg

insérer dans fichier sumocfg

```xml
<gui_only>
    <gui-settings-file value="hello.settings.xml"/>
</gui_only>
```
configuration http://sumo.sourceforge.net/userdoc/SUMO-GUI.html#configuration_files
fichier pour la configuration de la vue de sumo-gui
```xml
<viewsettings>
    <viewport y="0" x="250" zoom="100"/>
    <delay value="100"/>
    <scheme name="real world"/>
</viewsettings>
```


réplications

exécuter sans mode graphique avec sumo
`sumo --seed 42 -c hello.sumocfg`

script avec graine sur ligne de commande et préfixe au nom des fichiers --output-prefix

```xml
<configuration xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://sumo.dlr.de/xsd/sumoConfiguration.xsd">
  <input>
    <net-file value="hello.net.xml"/>
    <route-files value="hello.rou.xml"/>
  </input>
  
  <time>
    <begin value="0"/>
    <end value="600"/>
    <step-length value="0.1"/>
  </time>
  
  <random>
    <seed value="45"/>
  </random>
</configuration>
```

attributs et phénomènes aléatoires dans SUMO https://sumo.dlr.de/docs/Simulation/Randomness.html

vitesse, TIV, 
vType-attribute sigma (default 0.5). When this value is non-zero drivers will randomly vary their speed based on the RNG described above

# Configuration des carrefours



# Collecte de données
https://sumo.dlr.de/docs/Simulation/Output 
conversion des xml /usr/share/sumo/tools/xml/xml2csv.py


## Réseau
info véhicules --tripinfo-output
données sur la ligne de commande: --duration-log.statistics

## Lien


## Capteurs



# Annexes
## Classification routière d'OpenStreetMap
Les types de route utilisés dans OSM avec leurs descriptions sont disponibles sur https://wiki.openstreetmap.org/wiki/Key:highway.
Les types de routes sont les suivants dans la région de Montréal: Highway.motorway, 
Highway.primary, Highway.secondary, Highway.tertiary, Highway.residential, Highway.service, Highway.pedestrian, Highway.footway, Railway.rail, Highway.cycleway, Railway.subway. On rencontre moins souvent des Highway.track, Highway.path, Highway.steps, Highway.primary.link, Highway.secondary.link, Highway.motorway.link, Highway.unclassified. 
