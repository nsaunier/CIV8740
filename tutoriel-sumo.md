# Introduction
SUMO veut dire "Simulation of Urban MObility". SUMO est un logiciel de simulation de la circulation dont le code est sous license libre ("open source"). Il permet de représenter les réseaux de transport terrestre, en particulier la circulation routière. Il est développé par l'agence aérospatiale allemande DLR.

La plupart des fichiers sont des fichiers texte suivant le format "Extensible Markup Language" (XML), soit "langage de balisage extensible", qui est un métalangage informatique de balisage générique (voir https://fr.wikipedia.org/wiki/Extensible_Markup_Language).

Fichiers indispensables: 
* configuration de SUMO: fichier avec extension .sumocfg
* réseau routier: fichier avec extension .net.xml
* demande de déplacement (itinéraires): fichier avec extension .rou.xml
Exemple le plus simple https://sumo.dlr.de/docs/Tutorials/Hello_Sumo.html 

La documentation de référence de SUMO est disponible en ligne sur le [wiki du projet](https://sumo.dlr.de/docs/), avec un [guide utilisateur](https://sumo.dlr.de/docs/SUMO_User_Documentation.html).  


Lien tutoriel

# Liste des outils

* netedit https://sumo.dlr.de/wiki/NETEDIT 
* netconvert https://sumo.dlr.de/wiki/NETCONVERT 
* netgenerate
* sumo-gui configuration de l'interface graphique http://sumo.sourceforge.net/userdoc/SUMO-GUI.html#configuration_files  
* sumo (ligne de commande)

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
une des forces est la facilité d'importer des réseaux d'openstreetmap


Exemples de réseaux http://sumo.dlr.de/wiki/Data/Networks
