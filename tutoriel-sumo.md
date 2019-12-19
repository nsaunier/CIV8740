# Introduction
Le logiciel SUMO, pour "Simulation of Urban MObility", est un logiciel de simulation de la circulation dont le code est sous license libre ("open source"). Il permet de représenter les réseaux de transport terrestre, en particulier la circulation routière. Il est développé par l'agence aérospatiale allemande DLR.

La plupart des fichiers sont des fichiers texte suivant le format "Extensible Markup Language" (XML), soit "langage de balisage extensible", qui est un métalangage informatique de balisage générique (voir https://fr.wikipedia.org/wiki/Extensible_Markup_Language).

Fichiers indispensables: 
* configuration de SUMO: fichier avec extension `.sumocfg`
* réseau routier: fichier avec extension `.net.xml`
* demande de déplacement (itinéraires): fichier avec extension `.rou.xml`
Exemple le plus simple https://sumo.dlr.de/docs/Tutorials/Hello_Sumo.html 

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
## Importer un réseau d'OpenStreetMap
### Téléchargement d'OpenStreetMap et importation simple

### Script intégré d'importation


## Créer et modifier un réseau
Cette sous-section expliquer comment créer un réseau à partir de rien et comment modifier un réseau existant avec l'utilitaire `netedit`.

Revenons tout d'abord sur la structure de données décrivant un réseau de transport et la façon dont il 

## Créer un réseau géométrique
netgenerate

Exemples de réseaux http://sumo.dlr.de/wiki/Data/Networks

# Demande de déplacements
choix des vitesses? types de véhicules
variation des debits dans le temps
référence https://sumo.dlr.de/wiki/Definition_of_Vehicles,_Vehicle_Types,_and_Routes 

difficile de créer routes par netedit

flow sur route
<flow id="flow_0" type="DEFAULT_VEHTYPE" begin="0.00" end="3600.00" vehsPerHour="360.00">
  <route id="route_0" edges="458694445.389 458694446#0 458694444" color="blue"/>
</flow>

<flow id="flow_0" type="DEFAULT_VEHTYPE" begin="0.00" end="3600.00" probability="0.1">
  <route id="route_0" edges="458694445.389 458694446#0 458694444" color="blue"/>
</flow>

vehsPerHour float(#/h) number of vehicles per hour, equally spaced (not together with period or probability) period float(s) insert equally spaced vehicles at that period (not together with vehsPerHour or probability) probability float([0,1]) probability for emitting a vehicle each second (not together with vehsPerHour or period), see also Simulation/Randomness number int(#) total number of vehicles, equally spaced 

incomplete routes with TAZ


# Simulation
réplications

exécuter sans mode graphique avec sumo

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
