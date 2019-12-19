# Introduction
Le logiciel SUMO, pour "Simulation of Urban MObility", est un logiciel de simulation de la circulation dont le code est sous license libre ("open source"). Il permet de représenter les réseaux de transport terrestre, en particulier la circulation routière. Il est développé par l'agence aérospatiale allemande DLR.

La plupart des fichiers sont des fichiers texte suivant le format "Extensible Markup Language" (XML), soit "langage de balisage extensible", qui est un métalangage informatique de balisage générique (voir https://fr.wikipedia.org/wiki/Extensible_Markup_Language).

Fichiers indispensables: 
* configuration de SUMO: fichier avec extension `.sumocfg`
* réseau routier: fichier avec extension `.net.xml`
* demande de déplacement (itinéraires): fichier avec extension `.rou.xml`
Exemple le plus simple https://sumo.dlr.de/docs/Tutorials/Hello_Sumo.html 

La documentation de référence de SUMO est disponible en ligne sur le [wiki du projet](https://sumo.dlr.de/docs/), avec un [guide utilisateur](https://sumo.dlr.de/docs/SUMO_User_Documentation.html).  


Lien tutoriel

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

La configuration des carrefours (mouvement permis, priorités et types de contrôle) sera abordée dans une autre section. 
## Importer un réseau d'OpenStreetMap

## Créer et modifier un réseau
Cette sous-section expliquer comment créer un réseau à partir de rien, et comment modifier un réseau existant avec l'utilitaire netedit

## Créer un réseau géométrique
netgenerate

Exemples de réseaux http://sumo.dlr.de/wiki/Data/Networks

# Demande de déplacements


# Simulation
réplications

exécuter sans mode graphique avec sumo

# Configuration des carrefours



# Extraction de résultats
## Réseau

## Capteurs



# Annexes
## Classification routière d'OpenStreetMap
Les types de route utilisés dans OSM avec leurs descriptions sont disponibles sur https://wiki.openstreetmap.org/wiki/Key:highway.
Les types de routes sont les suivants dans la région de Montréal: Highway.motorway, 
Highway.primary, Highway.secondary, Highway.tertiary, Highway.residential, Highway.service, Highway.pedestrian, Highway.footway, Railway.rail, Highway.cycleway, Railway.subway. On rencontre moins souvent des Highway.track, Highway.path, Highway.steps, Highway.primary.link, Highway.secondary.link, Highway.motorway.link, Highway.unclassified. 
