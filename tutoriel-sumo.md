Table des matières TODO
1. [Introduction](#introduction)
1. [Liste des outils](#liste-des-outils)
1. [Réseaux de transport](#réseaux-de-transport)
1. [Demande de déplacements](#demande-de-déplacements)
1. [Simulation](#simulation)
1. [Configuration des carrefours](#configuration-des-carrefours)
1. [Collecte de données](#collecte-de-données)
1. [Annexes](#annexes)

# Introduction
Le logiciel SUMO, pour "Simulation of Urban MObility", est un logiciel de simulation de la circulation dont le code est sous license libre ("open source"). Il permet de représenter les réseaux de transport terrestre, en particulier la circulation routière. Il est développé par l'agence aérospatiale allemande DLR.

La plupart des fichiers sont des fichiers texte suivant le format "Extensible Markup Language" (XML), soit "langage de balisage extensible", qui est un métalangage informatique de balisage générique (voir https://fr.wikipedia.org/wiki/Extensible_Markup_Language).

Fichiers indispensables: 
* configuration de SUMO: fichier avec extension `.sumocfg`
* réseau routier: fichier avec extension `.net.xml`
* demande de déplacement (itinéraires): fichier avec extension `.rou.xml`

exemple https://sumo.dlr.de/docs/Tutorials/Hello_Sumo.html

Ce tutoriel se concentrera sur les déplacements des véhicules motorisés et cyclistes, mais SUMO peut aussi représenter les déplacements piétons et le transport en commun. 

Références
La documentation de référence de SUMO est disponible en ligne sur le [wiki du projet](https://sumo.dlr.de/docs/), avec un [guide utilisateur](https://sumo.dlr.de/docs/SUMO_User_Documentation.html).  

Lien tutoriels SUMO

# Liste des outils
De nombreux outils ([liste](https://sumo.dlr.de/docs/Sumo_at_a_Glance.html#included_applications)) sont disponibles dans SUMO, parmi lesquels les plus utilisés seront 
* netedit https://sumo.dlr.de/docs/NETEDIT 
* netconvert https://sumo.dlr.de/docs/NETCONVERT 
* netgenerate
* sumo-gui interface graphique de simulation (configuration http://sumo.sourceforge.net/userdoc/SUMO-GUI.html#configuration_files)
* sumo outil de simulation en ligne de commande

TODO 
insérer dans fichier sumocfg

```xml
<gui_only>
    <gui-settings-file value="hello.settings.xml"/>
</gui_only>
```

fichier pour la configuration de la vue de sumo-gui
```xml
<viewsettings>
    <viewport y="0" x="250" zoom="100"/>
    <delay value="100"/>
    <scheme name="real world"/>
</viewsettings>
```

Compétences informatiques: fichiers texte, XML, ligne de commande https://sumo.dlr.de/docs/Basics/Basic_Computer_Skills.html

# Réseaux de transport
Il existe différentes façons de créer ou importer des réseaux de transport dans SUMO. Une des forces est la facilité d'importer des réseaux d'[OpenStreetMap](https://www.openstreetmap.org/). 

La configuration des carrefours (mouvement permis, priorités et types de contrôle) sera abordée dans une autre [section](#configuration-des-carrefours). 

Un réseau SUMO est constitué de liens ("egde"), voies ("lane") et carrefours ("junction"). TODO définir
https://sumo.dlr.de/docs/NETEDIT.html#network_elements

et connection

construire réseau jouet `hello`, base des autres exemples, à partir d'un fichier de liens (arrêtes) et carrefours (noeuds)
```netconvert --node-files=hello.nod.xml --edge-files=hello.edg.xml --output-file=hello.net.xml --no-internal-links```


## Importer un réseau d'OpenStreetMap
### Téléchargement d'OpenStreetMap et importation simple

### Script intégré d'importation


## Créer et modifier un réseau
Cette sous-section expliquer comment créer un réseau à partir de rien et comment modifier un réseau existant avec l'utilitaire `netedit`.

Revenons tout d'abord sur la structure de données décrivant un réseau de transport et la façon dont il 

explication dans l'exemple hello Exemple le plus simple https://sumo.dlr.de/docs/Tutorials/Hello_Sumo.html 

Graphes: noeuds et arrêtes 



TODO gérer les limites de vitesse, comprendre les dead-end, functional edge

## Créer un réseau géométrique
netgenerate

Exemples de réseaux http://sumo.dlr.de/wiki/Data/Networks

# Demande de déplacements
TODO: comprendre choix des vitesses, tirages aléatoires


## Types de demandes et données
Dans SUMO, un véhicule est défini par trois éléments: 
* un type de véhicule qui décrit ses propriétés physiques;
* l'itinéraire que le véhicule suivra;
* le véhicule lui-même.

Un déplacement ("trip") correspond au déplacement d'un véhicule d'un endroit à un autre, défini par un lien de départ, un lien d'arrivée et un instant de départ. Un itinéraire ("route") est un déplacement généralisé, c'est-à-dire une définition d'itinéraire qui contient non seulement les liens de départ et d'arrivée, mais aussi les liens par lesquels le véhicule passera. 

Une simulation SUMO a besoin d'itinéraires pour les déplacements des véhicules. Il peuvent être générés de [différentes façons](https://sumo.dlr.de/docs/Demand/Introduction_to_demand_modelling_in_SUMO.html). Ces éléments sont définis dans un fichier d'itinéraires `.rou.xml`, par exemple `hello.rou.xml` pour notre exemple (voir la section #simulation pour le fichier de configuration sumo `.sumocfg` nécessaire pour exécuter une simulation avec ce fichier d'itinéraires et le fichier du réseau).

Une première façon consiste à définir un véhicule avec un itinéraire (pour lui seulement): 
```xml
<routes>
  <vehicle id="0" depart="0" color="red">
    <route edges="1to2 2to3"/>
  </vehicle>
</routes>
```
De cette façon, SUMO construira un véhicule rouge d'identifiant 0 qui commence son déplacement à l'instant 0. Ce véhicule suivra les liens 1to2 puis 2to3 puis disparaîtra à la fin du dernier lien (la liste de liens peut être aussi longue que désirée, du type "lien1 lien2 lien3 ... lienn"). Ce véhicule a son propre itinéraire qui n'est pas partagé avec les autres véhicules. Il est aussi possible de définir deux véhicule se déplaçant selon le même itinéraire, auquel cas l'itinéraire doit être défini à l'extérieur du véhicule et avoir un identifiant:
```xml
<routes>
  <route id="route0" edges="1to2 2to3"/>
  <vehicle id="0" depart="0" color="red">
  <vehicle id="1" depart="0" color="blue">
  </vehicle>
</routes>
```


https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html

TODO traduire véhicule, flow et routes



types de véhicules
nécessaire. Si non-défini, un type de véhicule par défaut sera utilisé.

Les types de véhicules sont définis par des éléments `vType`. Ils ont de nombreux attributs, les plus importants étant: 
* longueur
* accélération et décélération
* laneChangeModel
* carFollowModel, avec paramètres sigma et tau
* maxSpeed (m/s)
* speedFactor: multiplicateur de la limite de vitesse d'une voie, peut suivre une distribution avec la syntaxe "norm(mean, dev)" ou "normc(mean, dev, min, max)"
* speedDev: écart-type du speedFactor (speedFactor=norm(1, 0.1) est identique à speedFactor = 1 et speedDev = 0.1)

vitesse toujours inférieure à maxSpeed

https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#route_and_vehicle_type_distributions
Vehicle Type Distributions
```xml
<routes xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://sumo.dlr.de/xsd/routes_file.xsd">
    <vTypeDistribution id="typedist1">
        <vType id="type1" accel="0.8" length="5" speedFactor="normc(1.0,0.1,0.6,1.3)" maxSpeed="27" color="red" probability="0.9"/>
        <vType id="type2" accel="1.8" length="5" speedFactor="normc(1.0,0.1,0.6,1.3)" maxSpeed="20" color="blue" probability="0.1"/>
    </vTypeDistribution>
    <flow id="flow_0" begin="0.00" from="gneE0" to="gneE0" end="3600.00" vehsPerHour="8000" type="typedist1" departSpeed="desired" departLane="random"/>
</routes>
```


variation des debits dans le temps
référence https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes 

flow sur route
<flow id="flow_0" type="DEFAULT_VEHTYPE" begin="0.00" end="3600.00" vehsPerHour="360.00">
  <route id="route_0" edges="458694445.389 458694446#0 458694444" color="blue"/>
</flow>

<flow id="flow_0" type="DEFAULT_VEHTYPE" begin="0.00" end="3600.00" probability="0.1">
  <route id="route_0" edges="458694445.389 458694446#0 458694444" color="blue"/>
</flow>

vehsPerHour float(#/h) number of vehicles per hour, equally spaced (not together with period or probability) period float(s) insert equally spaced vehicles at that period (not together with vehsPerHour or probability) probability float([0,1]) probability for emitting a vehicle each second (not together with vehsPerHour or period), see also Simulation/Randomness number int(#) total number of vehicles, equally spaced 

incomplete routes with TAZ

## Outils
script python

interface netedit (voir tuto-netedit)

définir itinéraire, puis ajouter la demande (trip, vehicle, flow ou route flow (ce qu'on veut?))

autres: jtrrouter, dfrouter https://sumo.dlr.de/docs/Demand/Introduction_to_demand_modelling_in_SUMO.html

# Simulation
réplications

exécuter sans mode graphique avec sumo

script avec graine sur ligne de commande et préfixe au nom des fichiers

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

# Configuration des carrefours



# Collecte de données
https://sumo.dlr.de/docs/Simulation/Output 
conversion des xml /usr/share/sumo/tools/xml/xml2csv.py

info véhicules --tripinfo-output

## Réseau

## Capteurs



# Annexes
## Classification routière d'OpenStreetMap
Les types de route utilisés dans OSM avec leurs descriptions sont disponibles sur https://wiki.openstreetmap.org/wiki/Key:highway.
Les types de routes sont les suivants dans la région de Montréal: Highway.motorway, 
Highway.primary, Highway.secondary, Highway.tertiary, Highway.residential, Highway.service, Highway.pedestrian, Highway.footway, Railway.rail, Highway.cycleway, Railway.subway. On rencontre moins souvent des Highway.track, Highway.path, Highway.steps, Highway.primary.link, Highway.secondary.link, Highway.motorway.link, Highway.unclassified. 
