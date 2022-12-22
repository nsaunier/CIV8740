Manual/guide for the SUMO software
==============

**Table of Content**
1. [Introduction](#introduction)
1. [Installation](#installation)
1. [List of tools](#liste-des-outils)
1. [Transport Networks](#réseaux-de-transport)
1. [Interaction Configuration](#configuration-des-carrefours)
1. [Traffic Demand](#demande-de-déplacements)
1. [Simulation](#simulation)
1. [Data Collection](#collecte-de-données)
1. [Appendices](#annexes)

This guide is in active development as part of the Traffic Engineering course CIV8740E.

# Introduction
The software [SUMO, for "Simulation of Urban MObility",](https://www.eclipse.org/sumo/) is a microscopic traffic simulation software, the code of which is under free license ("open source") . It makes it possible to represent land transport networks, in particular road traffic. It is developed by the [German Aerospace Agency DLR](https://www.dlr.de). This guide will focus on the movement of motorized vehicles and cyclists, but SUMO can also represent the movement of pedestrians and public transport.

Most of the files are text files in the "Extensible Markup Language" (XML) format, or "Extensible Markup Language", which is a generic markup computer metalanguage (see https://en.wikipedia.org/wiki/ Extensible_Markup_Language). Make sure you have a good text editor to edit these files directly, for example [Notepad ++](https://notepad-plus-plus.org/) on Windows, [Atom](https://atom.io/ ) or [emacs](https://www.gnu.org/software/emacs/) on all platforms. It is **very important** to have [minimal computer skills](https://sumo.dlr.de/docs/Basics/Basic_Computer_Skills.html) in handling text files, XML format and use command line tools to use SUMO.

SUMO reference documentation is in English and is available [online](https://sumo.dlr.de/docs/), as well as a [glossary](https://sumo.dlr.de/docs /Other/Glossary.html). Several tutorials in English are also [available](https://sumo.dlr.de/docs/Tutorials.html).


# Installation
The documentation describes how to [install](https://sumo.dlr.de/docs/Installing.html) SUMO, including the various software tools. They are installed in a new directory which depends on your choice and the operating system. Several other command line [tools](https://sumo.dlr.de/docs/Tools.html) depend on the correct configuration of the environment variables `PATH` and` SUMO_HOME` to be able to use them easily. The [documentation explains](https://sumo.dlr.de/docs/Basics/Basic_Computer_Skills.html#sumo_home) how to configure these variables.


# List of tools
Many tools ([complete list](https://sumo.dlr.de/docs/Sumo_at_a_Glance.html#included_applications)) are available in SUMO, among which the most used will be:
* [netedit](https://sumo.dlr.de/docs/Netedit/index.html): graphical tool for editing the network, demand and other attributes of the simulation
* [netconvert](https://sumo.dlr.de/docs/netconvert.html): command line tool for converting network elements to SUMO format
* [netgenerate](https://sumo.dlr.de/docs/netgenerate.html): command line tool for generating abstract networks
* several network demand allocation tools like duarouter, jtrrouter, etc.
* [sumo-gui](https://sumo.dlr.de/docs/sumo-gui.html): simulation graphical interface
* [sumo](https://sumo.dlr.de/docs/sumo.html): command line simulation tool
* several tools such as Python scripts to facilitate file creation or conversion, available in the `tools` directory of the` Sumo` folder (installation directory on Windows, `/usr/share/sumo/` on Linux).

The general process for building a SUMO scenario is described in a [tutorial](https://sumo.dlr.de/docs/Tutorials/ScenarioGuide.html). The following two tutorials show step by step how to build a small SUMO scenario:
* ["Hello World"](https://sumo.dlr.de/docs/Tutorials/Hello_World.html)
* ["Quick start"](https://sumo.dlr.de/docs/Tutorials/quick_start.html)

A scenario requires at least the following files:
* a SUMO configuration file, with the extension `.sumocfg`;
* a road network, with extension `.net.xml`;
* a travel request file, including routes, with the extension `.rou.xml`.
All of these files are in XML text format. It is possible to run a simulation with sumo or sumo-gui tools, directly telling them to use the network and request files, or by using a configuration file that references these two files and includes other parameters. simulation. This is discussed in detail in the [Simulation](# simulation) section.

# Transport networks
There are different ways to create or import transport networks in SUMO. One of the strengths is the ease of importing data from [OpenStreetMap](https://www.openstreetmap.org/).

The configuration of intersections (movement allowed, priorities and types of control) will be discussed in the [next section](# configuration-des-intersections).

A SUMO network is made up of links ("edge"), one or more lanes ("lane") per link, intersections ("junction" or "node") and connections ("connection") between links. These elements and their format are described in the [documentation](https://sumo.dlr.de/docs/Networks/SUMO_Road_Networks.html).

## Attributes of links and nodes
SUMO's transport network format is not meant to be edited manually. To edit files on the network, the recommended procedure is to use [netconvert](https://sumo.dlr.de/docs/NETCONVERT.html) to convert the network to [simple XML format](https: // sumo. dlr.de/docs/Networks/PlainXML.html), edit these files, then use netconvert again to rebuild the network afterwards.

An example is the construction of the "hello" toy network used as an example in this guide, available in the [sumo directory](sumo). This network is made up of
* of four intersections ("nodes") (file `hello.nod.xml`):
```xml
<nodes>
  <node id="1" x="-250.0" y="0.0" />
  <node id="2" x="+250.0" y="0.0" />
  <node id="3" x="+500.0" y="100.0" />
  <node id="4" x="+500.0" y="-100.0" />
</nodes>
```
* and of three links (file `hello.edg.xml`):
```xml
<edges>
    <edge from="1" id="1to2" to="2" />
    <edge from="2" id="2to3" to="3" />
    <edge from="2" id="2to4" to="4" />
</edges>
```

This two files are then combined in a network file using netconvert:
```$ netconvert --node-files=hello.nod.xml --edge-files=hello.edg.xml --output-file=hello.net.xml```

The attributes of the network elements are defined in the page on [simple XML format](https://sumo.dlr.de/docs/Networks/PlainXML.html). The possible attributes of an intersection defined in this way are described in the following table.

| Attribute Name  | Value Type                                | Description                  |
| --------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **id**          | id (string)                                                                                                                                                                                                               | The name of the node                                                                                                                               |
| **x**           | float                                                                                                                                                                                                                     | The x-position of the node on the plane in meters                                                                                                  |
| **y**           | float                                                                                                                                                                                                                     | The y-position of the node on the plane in meters                                                                                                  |
| z               | float                                                                                                                                                                                                                     | The z-position of the node on the plane in meters                                                                                                  |
| type            | enum ( "priority", "traffic_light", "right_before_left", "unregulated", "priority_stop", "traffic_light_unregulated", "allway_stop", "rail_signal", "zipper", "traffic_light_right_on_red", "rail_crossing") | An optional type for the node                                                                                                                      |
| tlType          | enum ( "static", "actuated")                                                                                                                                                                                              | An optional type for the traffic light algorithm                                                                                                   |
| tl              | id (string)                                                                                                                                                                                                               | An optional id for the traffic light program. Nodes with the same tl-value will be joined into a single program                                    |
| radius          | positive float;                                                                                                                                                                                                           | optional turning radius (for all corners) for that node in meters *(default 1.5)*                                                                  |
| shape           | List of positions; each position is encoded in x,y or x,y,z in meters (do not separate the numbers with a space\!).                                                                                                       | A custom shape for that node. If less than two positions are given, netconvert will reset that node to use a computed shape.                       |
| keepClear       | bool                                                                                                                                                                                                                      | Whether the [junction-blocking-heuristic](../Simulation/Intersections.md#junction_blocking) should be activated at this node *(default true)* |
| rightOfWay      | string                                                                                                                                                                                                                    | Set algorithm for computing [\#Right-of-way](#right-of-way). Allowed values are *default* and *edgePriority*                            |
| controlledInner | list of edge ids                                                                                                                                                                                                          | Edges which shall be controlled by a joined TLS despite being incoming as well as outgoing to the jointly controlled nodes                         |

Les attributs possibles d'un lien défini ainsi sont décrits dans le tableau suivant.

| Attribute Name | Value Type                                        | Description                                        |
| -------------- | ------------------------------------- | -------------------------------------------------------------- |
| **id**         | id (string)                           | The id of the edge (must be unique)                            |
| from           | referenced node id                    | The name of a node within the nodes-file the edge shall start at    |
| to             | referenced node id                    | The name of a node within the nodes-file the edge shall end at      |
| type           | referenced type id                    | The name of a type within the [SUMO edge type file](../SUMO_edge_type_file.md)  |
| numLanes       | int                                   | The number of lanes of the edge; must be an integer value                       |
| speed          | float                                 | The maximum speed allowed on the edge in m/s; must be a floating point number (see also "Using Edges' maximum Speed Definitions in km/h")  |
| priority       | int                                   | The priority of the edge. Used for [\#Right-of-way](#right-of-way)-computation            |
| length         | float                                 | The length of the edge in meter                                                     |
| shape          | List of positions; each position is encoded in x,y or x,y,z in meters (do not separate the numbers with a space\!). | If the shape is given it should start and end with the positions of the from-node and to-node. Alternatively it can also start and end with the position where the edge leaves or enters the junction shape. This gives some control over the final junction shape. When using the option **--plain.extend-edge-shape** it is sufficient to supply inner geometry points and extend the shape with the starting and ending node positions automatically |
| spreadType     | enum ( "right", "center", "roadCenter")                                                                                          | The description of how to compute lane geometry from edge geometry. See [SpreadType](#spreadtype)  |
| allow          | list of vehicle classes               | List of permitted vehicle classes (see [access permissions](#road_access_permissions_allow_disallow))       |
| disallow       | list of vehicle classes               | List of forbidden vehicle classes (see [access permissions](#road_access_permissions_allow_disallow))       |
| width          | float                                 | lane width for all lanes of this edge in meters (used for visualization)                                    |
| name           | string                                | street name (need not be unique, used for visualization)                                                    |
| endOffset      | float \>= 0                           | Move the stop line back from the intersection by the given amount (effectively shortening the edge and locally enlarging the intersection)  |
| sidewalkWidth  | float \>= 0                           | Adds a sidewalk with the given width (defaults to -1 which adds nothing).                              |

Les attributs possibles d'une connection défini ainsi sont décrits dans le tableau suivant.

| Attribute Name | Value Type                             | Default | Description      |
| -------------- | -------------------------------------- | ------- | ----------------------------------------------------------------------- |
| **from**       | referenced edge id                                                                                                  |         | The name of the edge the vehicles leave                                                                                                                                                                                                                                                                                                                                      |
| to             | referenced edge id                                                                                                  |         | The name of the edge the vehicles may reach when leaving "from"                                                                                                                                                                                                                                                                                                              |
| fromLane       | *<INT\>*                                                                                                             |         | the lane index of the incoming lane (numbers starting with 0)                                                                                                                                                                                                                                                                                                                |
| toLane         | *<INT\>*                                                                                                             |         | the lane index of the outgoing lane (numbers starting with 0)                                                                                                                                                                                                                                                                                                                |
| pass           | bool                                                                                                                | false   | if set, vehicles which pass this (lane-2-lane) connection) will not wait                                                                                                                                                                                                                                                                                                     |
| keepClear      | bool                                                                                                                | true    | if set to *false*, vehicles which pass this (lane-2-lane) connection) will not worry about [blocking the intersection](../Simulation/Intersections.md#junction_blocking).                                                                                                                                                                                               |
| contPos        | float                                                                                                               | \-1     | if set to 0, no [internal junction](../Networks/SUMO_Road_Networks.md#internal_junctions) will be built for this connection. If set to a positive value, an internal junction will be built at this position (in m) from the start of the internal lane for this connection.                                                                                            |
| visibility     | float                                                                                                               | 4.5     | specifies the distance to the connection \[in m.\] below which an approaching vehicle has full sight of any other approaching vehicles on the connection's foe lanes (i.e. vehicle can accelerate if none are present). Note, that a too low visibility (<=0.1m.) will prevent vehicles from crossing a minor link. For major links the attribute has no effect, currently. |
| speed          | float                                                                                                               | \-1     | specifies the maximum speed while moving across the intersection using this connection (in m/s). By default the mean speed of the edge before and after the connection is used. With the default value, the speed is set to the average of the incoming and outgoing lane or to a radius based limit if option **--junctions.limit-turn-speed** is set.                                                      |
| shape          | List of positions; each position is encoded in x,y or x,y,z in meters (do not separate the numbers with a space\!). |         | specifies a custom shape for the internal lane(s) for this connection. By default an interpolated cubic spline is used.                                                                                                                                                                                                                                                      |
| uncontrolled   | bool  | false   | if set to *true*, This connection will not be TLS-controlled despite its node being controlled. |
| allow     | list of vehicle classes    |    | set custom permissions independent of from-lane and to-lane permissions. |
| disallow  | list of vehicle classes    |    | set custom permissions independent of from-lane and to-lane permissions. |

The elements of the transport network files generated by netconvert or netedit are the same (links, junctions and connections), but have certain attributes which differ (see definition of [format `net.xml`](https://sumo.dlr.de/docs/Networks/SUMO_Road_Networks.html)). Added to this are elements like [`request`](https://sumo.dlr.de/docs/Networks/SUMO_Road_Networks.html#requests) describing the priorities and conflicts between connections.

## Import a network from OpenStreetMap
There are two methods for importing data from [OpenStreetMap](https://www.openstreetmap.org/).

### Download OpenStreetMap and simple import
The method consists of browsing the [OpenStreetMap] site (https://www.openstreetmap.org/), finding the area from which you want to import data and exporting them by clicking on the button as shown in the picture below.

![OSM export](images/osm-export.png)

If you already know the coordinates (latitude, longitude) of the area of ​​interest, it is possible to access it directly via the browser with an address of the type https://overpass-api.de/api/map?bbox= -73.7754,45.5628, -73.7653,45.5691, or via the command line `wget` tool: ```$ wget -O map.osm "https://overpass-api.de/api/map?bbox= -73.7754,45.5628, -73.7653,45.5691 "```.

The resulting `.osm` file can either be imported directly by netedit or converted to a SUMO network file `.net.xml` with the netconvert command line utility. The netconvert options discussed below are available in several tabs when importing by netedit.

The netconvert command is: ```$ netconvert --geometry.remove --remove-edges.isolated --junctions.join --osm map.osm -o map.net.xml```. The options `--geometry.remove` and `--junctions.join` have the respective effects of simplifying the geometry of the network without changing its topology and of consolidating nearby intersections, for example of a road separated in two by a median in OSM, which would result in two intersections close together (the --junctions.join-dist option controls the distance threshold for merging two intersections). The `--remove.edges.isolated` option allows you to eliminate isolated edges. Other options are described in the SUMO documentation ([recommended options](https://sumo.dlr.de/docs/Networks/Import/OpenStreetMap.html#Recommended_NETCONVERT_Options)). It is also possible to use [typemaps](https://sumo.dlr.de/docs/Networks/Import/OpenStreetMap.html#recommended_typemaps) when data such as speed limits are missing.

When converting an `.osm` file to a SUMO network, it is possible to keep only one type of road with the command ```$ netconvert --osm-files map.osm --keep-edges .by-type highway.motorway, highway.primary, highway.secondary, highway.tertiary, highway.trunk, highway.primary_link, highway.secondary_link, highway.tertiary_link, highway.motorway_link, highway.residential -o map.net.xml``` or to select the routes according to the types of users who circulate there with the command ```$ netconvert --osm-files map.osm --remove-edges.by-vclass pedestrian, bicycle, delivery -o map .net.xml``` (cycle paths and other roads reserved for pedestrians and delivery are deleted).

The [road types](https://sumo.dlr.de/docs/SUMO_edge_type_file.html) are used to manage attributes common to a set of links, and often correspond in reality to categories or classes of road.

Other commands allow you to guess the right direction of traffic at roundabouts with `--roudabouts.guess` or on highway entry and exit ramps if they are missing with` --guess.ramps`.

### Integrated import script
The script [`osmWebWizard.py`](https://sumo.dlr.de/docs/Tutorials/OSMWebWizard.html) located in the` tools` directory allows you to import data from OpenStreetMap and generate a request for travel via an Internet interface.

![OSM Export](images/osm-web-wizard.png)

After generating the scenario, it is automatically opened in sumo-gui. It is usually necessary to rework the network with netedit. All the files are saved in a directory in the format of the day and the hour of the type `yyyy-mm-dd-hh-mm-ss`.

## Create a geometric network
It is possible to generate geometric networks with the [netgenerate] tool (https://sumo.dlr.de/docs/NETGENERATE.html) in command line, in the form
* spider web: ```$ netgenerate -s --spider.arm-number 10 -o network.net.xml```
* grid: ```$ netgenerate -g --grid.number 10 -o network.net.xml```
* random network: ```$ netgenerate -r --rand.iterations 2000 -o network.net.xml```

## Create and modify a network
A network can be created from scratch and edited with the [netedit] tool (https://sumo.dlr.de/docs/NETEDIT.html). The tool page includes a user guide with views of the interface. The ["Quick start"] tutorial (https://sumo.dlr.de/docs/Tutorials/quick_start.html) also includes step-by-step explanations for using netedit. netedit has several modes and the actions performed with the mouse depend on the mode selected: "inspect", "delete", "select", "move", etc. An interesting aspect of the "inspect" mode is that it allows you to see the attributes of the elements of a network, but also to edit these attributes: it is for example possible to modify the coordinates of nodes or the number of channels. a link directly that way.

It should also be noted that netedit has recently made it possible to create the travel request seen [below](#request-for-travel).

# Intersection Configuration
For this section, we create a small intersections with four branches, with one lane in each direction, with no prohibited movement except for U-turns. The `intersection` toy network is available in the [sumo directory](sumo). It consists
* of five intersections ("nodes") (file `carrefour.nod.xml`):
```xml
<nodes>
  <node id="center" x="0.0" y="0.0" />
  <node id="east" x="100.0" y="0.0" />
  <node id="north" x="0.0" y="100.0" />
  <node id="west" x="-100.0" y="0.0" />
  <node id="south" x="0.0" y="-100.0" />
</nodes>
```
* and of eight links (file `carrefour.edg.xml`):
```xml
<edges>
    <edge from="center" id="outwest" to="west" />
    <edge from="center" id="outeast" to="east" />
    <edge from="center" id="outnorth" to="north" />
    <edge from="center" id="outsouth" to="south" />
    <edge from="west" id="inwest" to="center" />
    <edge from="east" id="ineast" to="center" />
    <edge from="north" id="innorth" to="center" />
    <edge from="south" id="insouth" to="center" />
</edges>
```
These two files are then combined into a network file with netconvert: `` '' $ netconvert --node-files = carrefour.nod.xml --edge-files = carrefour.edg.xml --output-file = carrefour.net. xml --no-turnarounds true```

Adding the `--no-internal-links` option simplifies the network for large networks, but causes vehicles to" skip "the center of the junction as they pass through it. In this case, the distance traveled, and therefore the travel time, are reduced unrealistically and [other phenomena](https://sumo.dlr.de/docs/Simulation/Intersections.html), such as waiting for vehicles in the intersections, cannot be reproduced. Otherwise, "internal" links and intersections are automatically created by SUMO for the movement of vehicles within an intersection.

## Types of intersections
There are three levels of control at an intersection:
* rules of the road (default);
* explicit assignment of priority by a give-of-way or stop sign;
* traffic lights.

The types of intersections (`type` attribute of a node or junction element) are as follows (if it is not specified in the` nod.xml` intersection file, it will be guessed by netconvert):
* `priority`: vehicles on a low priority link must wait until vehicles on a high priority link have passed the intersection;
* `traffic_light`: the intersection is controlled by traffic lights (priority rules are used to avoid collisions if conflicting links are green at the same time);
* `right_before_left`: vehicles let pass those who come to their right;
* `unregulated`: the intersection has no control, vehicles pass without braking, the collision detection in the intersection does not work and collisions can occur outside the intersection;
* `traffic_light_unregulated`: the junction is controlled by traffic lights without any other rule, which can cause collisions in the junction if unsafe traffic light plans are used (collisions in the junction are not detected);
* `priority_stop`: this type works like a` priority` type junction where vehicles arriving on the secondary road must stop before passing;
* `allway_stop`: an intersection of this type is controlled by a [allway stop](https://en.wikipedia.org/wiki/All-way_stop);
* `rail_signal`: this junction is controlled by a [railway light](https://sumo.dlr.de/docs/Simulation/Rail_signals.html) (only useful for railways);
* `zipper`: this junction connects the links where the number of lanes decreases and traffic must converge as a" zipper-style (late merging)](https://en.wikipedia.org/wiki/ Merge_% 28traffic% 29));
* `rail_crossing`: this type of junction represents a level crossing allowing trains to pass through to stop thanks to traffic lights when the train approaches;
* `traffic_light_right_on_red`: the intersection is controlled by traffic lights as for the` traffic_light` type intersection, in addition authorizing the right turn at a red light (vehicles must stop, then can turn into any which phase if the movement is safe) ([right-turn-on-red](https://en.wikipedia.org/wiki/Right_turn_on_red)).

The priorities of each approach are represented by the [color of the stop line in sumo-gui](https://sumo.dlr.de/docs/SUMO-GUI.html#right_of_way). Priority will be calculated at each intersection according to its type. For the `priority` and` priority_stop` types, it depends on the value of the `priority` attributes of the incoming (approaches) and outgoing (outgoing) links, the speed and the number of channels. The priority can also be changed via [connection prohibitions](https://sumo.dlr.de/docs/Networks/PlainXML.html#setting_connection_priorities) and the connection `pass` attribute (vehicles on this connection do not not stop). The two methods for determining the priority of an intersection depend on the `rightOfWay` attribute of the intersection:
* `rightOfWay =" default "`: links are classified according to their priority (`priority` attribute), speed limit (` speed` attribute) and number of lanes ("laneNumber" attribute). The first two inbound links have priority and the other links are secondary;
* `rightOfWay =" edgePriority "`: only the `priority` attribute of links is considered; in the event of a tie, the types of movements (turns) are also considered.

In the case of a [roundabout](https://sumo.dlr.de/docs/Networks/PlainXML.html#roundabouts), the links in the intersection will always have priority. In the case of a restriction on the number of lanes, the priority is the same in the case of a `zipper` type intersection; otherwise, the left lane has priority over the right lane.

## Traffic Lights
The recommended way to create an intersection controlled by traffic lights and its signal timing plan](https://sumo.dlr.de/docs/Simulation/Traffic_Lights.html) is to use netedit. You have to change the type of junction or choose the mode of editing the traffic lights, click on the junction and create a traffic light plan. We thus create a [default timing plan](https://sumo.dlr.de/docs/Simulation/Traffic_Lights.html#automatically_generated_tls-programs) with the following characteristics: cycle of 90 s by default, equal sharing of time green between phases, followed by a yellow phase, left turns allowed if the speed limit is less than 70 km/h, a protected phase for left turns if a reserved lane exists and an offset of 0. Alternatively , it is possible to choose a timing plan where each approach has its phase one after the other (option `--tls.layout incoming`, the default being` opposites`). If the intersection has more approaches, phases will be added.

The timing plan is represented by a `tlLogic` element which can be saved in a network file` net.xml` or in an additional file (the [last loaded timing plan](https://sumo.dlr.de/docs/Simulation/Traffic_Lights.html#defining_new_tls-programs) is used if there are more than one). It has the attributes described in the following table.

| Attribute Name | Value Type                            | Description      |
| -------------- | ------------------------------------- | ---------------- |
| **id**         | id (string)                           | The id of the traffic light. This must be an existing traffic light id in the .net.xml file. Typically the id for a traffic light is identical with the junction id. The name may be obtained by right-clicking the red/green bars in front of a controlled intersection. |
| **type**       | enum (static, actuated, delay_based) | The type of the traffic light (fixed phase durations, phase prolongation based on time gaps between vehicles (actuated), or on accumulated time loss of queued vehicles (delay_based) )                                                                                  |
| **programID**  | id (string)                           | The id of the traffic light program; This must be a new program name for the traffic light id. Please note that "off" is reserved, see below.                                                                                                                             |
| **offset**     | int                                   | The initial time offset of the program |

Each phase has the attributes described in the following table.

| Attribute Name | Value Type             | Description                |
| -------------- | --------------------- | -------------------------- |
| **duration**   | time (int)            | The duration of the phase                                                                                                                                    |
| **state**      | list of signal states | The traffic light states for this phase, see below                                                                                                           |
| minDur         | time (int)            | The minimum duration of the phase when using type **actuated**. Optional, defaults to duration.                                                              |
| maxDur         | time (int)            | The maximum duration of the phase when using type **actuated**. Optional, defaults to duration.                                                              |
| name           | string                | An optional description for the phase. This can be used to establish the correspondence between SUMO-phase-indexing and traffic engineering phase names.     |
| next           | list of phase indices (int ...)           | The next phase in the cycle after the current. This is useful when adding extra transition phases to a traffic light plan which are not part of every cycle. Traffic lights of type 'actuated' can make use of a list of indices for selecting among alternative successor phases. |

Only the `duration` and` state` attributes are required for a fixed time fire plan, the other parameters being used for semi-adaptive fires. In SUMO, each change of state (for example turning yellow) of a traffic light corresponds to a new phase for the intersection, unlike the definitions in circulation. The phases follow one another in time, the `state` attribute indicating the state of the fire for each connection between all the tracks arriving and leaving the intersection. There are as many characters in the `state` attribute, constituting a state vector, as there are connections in the junction, starting with the approach at` noon` (on a clock quadrant) with right turns, straight movements and left turns (connection IDs are visible in sumo-gui with the option "show link tls index"). The light states are represented by a character defined in the following table:

| Character | GUI Color                                                  | Description          |
| --------- | ---------------------------------------------------------- | -------------------- |
| r         | rouge | 'red light' for a signal - vehicles must stop     |
| y         | jaune | 'amber (yellow) light' for a signal - vehicles will start to decelerate if far away from the junction, otherwise they pass    |
| g         | vert | 'green light' for a signal, no priority - vehicles may pass the junction if no vehicle uses a higher priorised foe stream, otherwise they decelerate for letting it pass. They always decelerate on approach until they are within the configured [visibility distance](../Networks/PlainXML.md#explicitly_setting_which_edge_lane_is_connected_to_which) |
| G         | vert foncé | 'green light' for a signal, priority - vehicles may pass the junction                                                                                                                                                                                                                                                                                                                                 |
| s         | mauve | 'green right-turn arrow' requires stopping - vehicles may pass the junction if no vehicle uses a higher priorised foe stream. They always stop before passing. This is only generated for junction type *traffic_light_right_on_red*.                                                                                                                                                             |
| u         | orange foncé | 'red+yellow light' for a signal, may be used to indicate upcoming green phase but vehicles may not drive yet (shown as orange in the gui)                                                                                                                                                                                                                                                             |
| o         | marrond | 'off - blinking' signal is switched off, blinking light indicates vehicles have to yield                                                                                                                                                                                                                                                                                                              |
| O         | cyan | 'off - no signal' signal is switched off, vehicles have the right of way|

Phases can be viewed in netedit by selecting states, and in sumo-gui by right clicking on a fire line and selecting "show phases". The fire plan is indicated in each connection by the attribute `tl`. It is possible to group the connections by giving them the same index in the state vector with the `linkIndex` attribute, which can be obtained in netedit by selecting the junction in the traffic light edit mode and by clicking on "Group Signals" (see example in [sumo directory](sumo)).

The [semi-adaptive lights](https://sumo.dlr.de/docs/Simulation/Traffic_Lights.html#actuated_traffic_lights) can also be represented by adding sensors on the approaches.

# Traffic Demand
In SUMO, a vehicle is defined by three elements:
* a type of vehicle that describes its physical properties;
* the route that the vehicle will follow;
* the vehicle itself.

A trip corresponds to the movement of a vehicle from one place to another, defined by a departure link, an arrival link and a departure time. A route ("route") is a generalized trip, that is, a route definition that contains not only the departure and arrival links, but also the links through which the vehicle will pass.

## Definition of vehicles and routes
A SUMO simulation needs routes for vehicle movements. They can be generated in [different ways](https://sumo.dlr.de/docs/Demand/Introduction_to_demand_modelling_in_SUMO.html). These elements are defined in a `.rou.xml` travel request file, for example` hello.rou.xml` for our example (see section [Simulation](# simulation) for sumo configuration file `.sumocfg `required to run a simulation with this routes file and the network file).

A first way is to define a vehicle with a route (for it only):
```xml
<routes>
  <vehicle id="0" depart="0" color="red">
    <route edges="1to2 2to3"/>
  </vehicle>
</routes>
```
In this way, SUMO will build a red vehicle with identifier 0 which begins its movement at time 0. This vehicle will follow the 1to2 then 2to3 links and then disappear at the end of the last link (the list of links can be as long as desired , of the type "link1 link2 link3 ... lienn"). This vehicle has its own route which is not shared with other vehicles. It is possible to define two vehicles traveling on the same route, in which case the route must be defined outside the vehicle and have an identifier:
```xml
<routes>
  <route id="route0" edges="1to2 2to3"/>
  <vehicle id="0" route="route0" depart="0" color="red">
  <vehicle id="1" route="route0" depart="0" color="blue"/>
</routes>
```
Routes must include a monthly link and be connected. The simulation will produce an error if a link does not follow the previous one or if the vehicle is not authorized on any of its lanes (it is possible to ignore these errors with the "--ignore-route-errors" option in which case the vehicle stops on the last authorized link, then is deleted (teleported)). A route has only three attributes, namely its identifier, the list of links, and, optionally like vehicles, a "color" attribute.

The possible attributes of a vehicle are described in the following table (items in bold are required):

| Attribute Name  | Value Type                                                                    | Description                            |
| --------------- | ----------------------------------------------------------------------------- | -------------------------------------- |
| **id**          | id (string)                                                                   | The name of the vehicle                |
| type            | id                                                                            | The id of the [vehicle type](#vehicle_types) to use for this vehicle.   |
| route           | id                                                                            | The id of the route the vehicle shall drive along               |
| color           | [color](#colors)                                                   | This vehicle's color       |
| **depart**      | float (s) or one of *triggered*, *containerTriggered*                         | The time step at which the vehicle shall enter the network; see [\#depart](#depart). Alternatively the vehicle departs once a [person enters](Specification/Persons.md#rides) or a [container is loaded](Specification/Containers.md) |
| departLane      | int/string (≥0, "random", "free", "allowed", "best", "first")                 | The lane on which the vehicle shall be inserted; see [\#departLane](#departlane). *default: "first"*                                                                                                                                                  |
| departPos       | float(m)/string ("random", "free", "random_free", "base", "last", "stop")            | The position at which the vehicle shall enter the net; see [\#departPos](#departpos). *default: "base"*                                                                                                                                               |
| departSpeed     | float(m/s)/string (≥0, "random", "max", "desired", "speedLimit")              | The speed with which the vehicle shall enter the network; see [\#departSpeed](#departspeed). *default: 0*                                                                                                                                             |
| departEdge     | int (index from \[0, routeLength\[ or "random"    | The initial edge along the route where the vehicle should enter the network (only supported if a complete route is defined); see [\#departEdge](#departEdge). *default: 0*                                                                                                                                             |
| arrivalLane     | int/string (≥0,"current")                                                     | The lane at which the vehicle shall leave the network; see [\#arrivalLane](#arrivallane). *default: "current"*                                                                                                                                        |
| arrivalPos      | float(m)/string (≥0<sup>(1)</sup>, "random", "max")                           | The position at which the vehicle shall leave the network; see [\#arrivalPos](#arrivalpos). *default: "max"*                                                                                                                                          |
| arrivalSpeed    | float(m/s)/string (≥0,"current")                                              | The speed with which the vehicle shall leave the network; see [\#arrivalSpeed](#arrivalspeed). *default: "current"*                                                                                                                                   |
| arrivalEdge     | int (index from \[0, routeLength\[ or "random"    | The final edge along the route where the vehicle should leave the network (only supported if a complete route is defined); see [\#arrivalEdge](#arrivalEdge).                                                                                                                           |
| line            | string                                                                        | A string specifying the id of a public transport line which can be used when specifying [person rides](Specification/Persons.md#rides)                                                                                                                   |
| personNumber    | int (in \[0,personCapacity\])                                                 | The number of occupied seats when the vehicle is inserted. *default: 0*                                                                                                                                                                                          |
| containerNumber | int (in \[0,containerCapacity\])                                              | The number of occupied container places when the vehicle is inserted. *default: 0*                                                                                                                                                                               |
| reroute         | bool                                                                          | Whether the vehicle should be equipped with a [rerouting device](Demand/Automatic_Routing.md) (setting this to *false* does not take precedence over other assignment options)                                                                           |
| via             | id list                                                                       | List of intermediate edges that shall be passed on [rerouting](Simulation/Routing.md#features_that_cause_rerouting) <br><br>**Note:** when via is not set, any `<stop>`-elements that belong to this route will automatically be used as intermediate edges. Otherwise via takes precedence.                                                                                                                                     |
| departPosLat    | float(m)/string ("random", "free", "random_free", "left", "right", "center") | The lateral position on the departure lane at which the vehicle shall enter the net; see [Simulation/SublaneModel](Simulation/SublaneModel.md). *default: "center"*                                                                                      |
| arrivalPosLat   | float(m)/string ("left", "right", "center")                                   | The lateral position on the arrival lane at which the vehicle shall arrive; see [Simulation/SublaneModel](Simulation/SublaneModel.md). by default the vehicle does not care about lateral arrival position                                               |
| speedFactor   | float > 0                                   | Sets custom speedFactor (factor on road speed limit) and overrides the [speedFactor distribution](#speed_distributions) of the vehicle type                                               |

You can find more details on the state and arrival attributes ("depart *" and "arrival *") of each vehicle in the [SUMO documentation](https://sumo.dlr.de/docs/Definition_of_Vehicles , _Vehicle_Types, _and_Routes.html # a_vehicles_depart_and_arrival_parameter). In particular, it is useful to explain the possible values ​​for the speed of the vehicle when inserting it (according to maxSpeed ​​= MIN (speedLimit * speedFactor, vTypeMaxSpeed)):

* ≥0: the simulation tries to insert the vehicle at the given speed. If the speed is not safe, the start time is delayed.
* "random": a speed is drawn randomly between 0 and maxSpeed ​​and can be adapted to ensure a safe distance to the leading vehicle.
* "max": maxSpeed ​​is used and can be adapted to ensure a safe distance to the lead vehicle.
* "desired": maxSpeed ​​is used. If the speed is not safe, the start time is delayed.
* "speedLimit": The speed limit of the track is used. If the speed is not safe, the start time is delayed.

There are [other attributes](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#vehicles_and_routes) that you don't need to know about first. Any type of vehicle (defined below) or route must have been defined before it is used, for example to assign it to a vehicle.

## Definition of vehicle flow
It is possible to define vehicle flows ("flow"). They have the same parameters as the vehicles, except for the time of departure ("departure"). Their identifier is "flowId.runningNumber". Vehicles enter the network with equal or randomly distributed inter-vehicle times during a given interval. They have the following additional attributes:

| Attribute Name | Value Type     | Description                                                                                                                                                                                         |
| -------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| begin          | float(s)       | first vehicle departure time                                                                                                                                                                        |
| end            | float(s)       | end of departure interval (if undefined, defaults to 24 hours)                                                                                                                                      |
| vehsPerHour    | float(\#/h)    | number of vehicles per hour, equally spaced (not together with period or probability)                                                                                                               |
| period         | float(s)       | insert equally spaced vehicles at that period (not together with vehsPerHour or probability)                                                                                                        |
| probability    | float(\[0,1\]) | probability for emitting a vehicle each second (not together with vehsPerHour or period), see also [Simulation/Randomness](Simulation/Randomness.md#flows_with_a_random_number_of_vehicles) |
| number         | int(\#)        | total number of vehicles, equally spaced                                                                                                                                                            |

Here is a definition of a route file for a flow with a route (it is also possible to [structure the route in the flow](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes. html#repeated_vehicles_flows)):
```xml
<routes>
  <route id="route0" edges="1to2 2to3"/>
  <flow id="flow0" route="route0" begin="0" vehsPerHour="1000" color="red"/>
</routes>
```
And the definition of two flows with two routes, with the second flow generating vehicles from 50 s after the start of the simulation:
```xml
<routes>
  <route id="route0" edges="1to2 2to3"/>
  <route id="route1" edges="1to2 2to4"/>
  <flow id="flow0" route="route0" begin="0" vehsPerHour="1000" color="red"/>
  <flow id="flow1" route="route1" begin="50" vehsPerHour="500" color="blue"/>
</routes>
```
To generate for example 1000 veh/h, that is to say a vehicle every 3.6 s, it is equivalent to use vehsPerHour = "1000", period = "3.6" and number = "1000" with begin = "0" and end = "3600" (in the latter case, vehicles will only be simulated for 3600 s, while it is possible to define the simulation interval independently with "vehsPerHour" and "period").

In reality, the headways between vehicles are not equal, even when the flow remains constant over a long period of time, but vary around the average value. This can be reproduced using the "probability" attribute:

```xml
<routes>
  <route id="route0" edges="1to2 2to3"/>
  <route id="route1" edges="1to2 2to4"/>
  <flow id="flow0" route="route0" begin="0" probability="0.2" color="red"/>
  <flow id="flow1" route="route1" begin="0" probability="0.1" color="blue"/>
</routes>
```
In this case, the flow "flow0" generates on average 0.2 veh per second (the number of vehicles arriving during n intervals of 1 s follows the [binomial law of parameter n and probability](https://sumo.dlr.de/docs/Simulation/Randomness.html#flows_with_a_random_number_of_vehicles)), or 720 veh/h, and the flow "flow1" half, or 360 veh/h.

We can note that it is also possible to modify in a random way the instants of departure of all the vehicles with the parameter --random-depart-offset in command line or by adding the following portion in the configuration file `.sumocfg `(with a simulation initialization seed):
```xml
<random>
  <random-depart-offset value="5.0"/>
  <seed value="42"/>
</random>
```
It is also possible to vary the flow rates over time with several flows over successive time intervals:
```xml
<routes>
  <route id="route0" edges="1to2 2to3"/>
  <flow id="flow0" route="route0" begin="0" end="100" vehsPerHour="1000" color="red"/>
  <flow id="flow1" route="route0" begin="100" end="200" vehsPerHour="200" color="blue"/>
</routes>
```

## Incomplete routes and route distributions
Routes can be incomplete and simply take the form of origin and destination links with the attributes "from" and "to", without the complete list of links to browse. In this case, the route assigned to the vehicles is the shortest route depending on the traffic conditions at the start of the trip (for a "trip") or of the flow (for a "flow"):
```xml
<routes>
  <flow id="flow0" from="1to2" to="2to3" begin="0" vehsPerHour="1000" color="red"/>
  <flow id="flow1" from="1to2" to="2to4" begin="50" vehsPerHour="500" color="blue"/>
</routes>

<routes>
  <trip id="1" depart="0" from="1to2" to="2to3"/>
</routes>
```
The attributes of "trip" and "flow" are fully described on the [page describing the choice of route by shortest path](https://sumo.dlr.de/docs/Demand/Shortest_or_Optimal_Path_Routing.html).

To summarize, it is necessary either to define vehicles with complete routes, or flows with complete routes, or trips ("trip") or flows with origins and destinations, the simulation finding the complete route of each vehicle during of its execution (or routes can be pre-calculated with [duarouter](https://sumo.dlr.de/docs/Demand/Shortest_or_Optimal_Path_Routing.html)).

Finally, there are other solutions that use
* [sets of links constituting zones](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#traffic_assignement_zones_taz) (traffic zones or "traffic analysis zones" used in transport) as origin and destination of routes;
* of [intersections](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#routing_between_junctions) as origin and destination.

It is also possible to use route distributions with probabilities for each route (drawn during the simulation):
```xml
<routes>
  <routeDistribution id="routedist1">
    <route id="route0" edges="1to2 2to3" color="red" probability="2"/>
    <route id="route1" edges="1to2 2to4" color="blue" probability="1"/>
  </routeDistribution>
  <flow id="flow0" route="routedist1" begin="0" vehsPerHour="1000"/>
</routes>
```
The example is equivalent to the previous one in terms of the proportion of vehicles following the two routes. It is not necessary that the sum of the probabilities is equal to 1, the probabilities are proportional to the chosen numbers.

## Definition of vehicle types
A vehicle type ("vtype" element) defines a vehicle category with common attributes. The following example shows the definition of vehicle "type1" with the standard parameters used in Stefan Krauss's model:
```xml
<routes>
  <vType id="type1" minGap="2.5" accel="2.6" decel="4.5" sigma="0.5" length="5" maxSpeed="30" color="blue"/>
  <vehicle id="veh1" type="type1" depart="0">
    <route edges="1to2 2to3"/>
  </vehicle>
</routes>
```
These parameters define physical characteristics such as its color, length and maximum acceleration, and parameters of the pursuit model (pay attention to their interpretation, it is necessary to learn about the functioning of the model to understand their role). The driving model used is one of the different attributes of a vehicle type:

| Attribute Name    | Value Type                        | Default                                                             | Description      |
| ----------------- | --------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------- |
| **id**            | id (string)                       | \-                                                                  | The name of the vehicle type                                                                                                                                                                                           |
| accel             | float                             | 2.6                                                                 | The acceleration ability of vehicles of this type (in m/s^2)                                                                                                                                                           |
| decel             | float                             | 4.5                                                                 | The deceleration ability of vehicles of this type (in m/s^2)                                                                                                                                                           |
| apparentDecel     | float                             | `==decel`                                                           | The apparent deceleration of the vehicle as used by the standard model (in m/s^2). The follower uses this value as expected maximal deceleration of the leader.                                                        |
| emergencyDecel    | float                             | 9.0                                                                 | The maximal physically possible deceleration for the vehicle (in m/s^2).                                                                                                                                               |
| sigma             | float                             | 0.5                                                                 | [Car-following model](#car-following_models) parameter, see below                                                                                          |
| tau               | float                             | 1.0                                                                 | [Car-following model](#car-following_models) parameter, see below                                                                                          |
| length            | float                             | 5.0                                                                 | The vehicle's **netto**-length (length) (in m)                                                                                                                                                                         |
| minGap            | float                             | 2.5                                                                 | Empty space after leader \[m\]                                                                                                                                                                                         |
| maxSpeed          | float                             | 55.55 (200 km/h) for vehicles, 1.39 (5 km/h) for pedestrians        | The vehicle's maximum velocity (in m/s)                                                                                                                                                                                |
| speedFactor       | float                             | 1.0                                                                 | The vehicles expected multiplicator for lane speed limits                                                                                                                                                              |
| speedDev          | float                             | 0.1                                                                 | The deviation of the speedFactor; see below for details (some vClasses use a different default)     |
| color             | [RGB-color](#colors)   | "1,1,0" (yellow)                                                    | This vehicle type's color                                                                                                                                                                                              |
| vClass            | class (enum)                      | "passenger"                                                         | An abstract [vehicle class (see below)](#abstract_vehicle_class). By default vehicles represent regular passenger cars.                                                                                     |
| emissionClass     | emission class (enum)             | ["PC_G_EU4"](Models/Emissions/HBEFA3-based.md)            | An [emission class (see below)](#vehicle_emission_classes). By default a gasoline passenger car conforming to emission standard *EURO 4* is used.                                                           |
| guiShape          | shape (enum)                      | "unknown"                                                           | [a vehicle shape for drawing](#visualization). By default a standard passenger car body is drawn.                                                                                                           |
| width             | float                             | 1.8                                                                 | The vehicle's width \[m\] (used only for visualization with the default model, affects [sublane model](Simulation/SublaneModel.md))                                                                            |
| height            | float                             | 1.5                                                                 | The vehicle's height \[m\]                                                                            |
| collisionMinGapFactor | float                             | depends on carFollowModel (1.0 for most models)                                                                | The minimum fraction of minGap that must be maintained to the leader vehicle to avoid a collision event                                                                            |
| imgFile           | filename (string)                 | ""                                                                  | Image file for rendering vehicles of this type (should be grayscale to allow functional coloring)                                                                                                                      |
| osgFile           | filename (string)                 | ""                                                                  | Object file for rendering with OpenSceneGraph (any of the file types supported by the available OSG-plugins)                                                                                                           |
| laneChangeModel   | lane changing model name (string) | 'LC2013'                                                            | The model used for changing lanes                                                                                                                                                                                      |
| carFollowModel    | car following model name (string) | 'Krauss'                                                            | The model used for [car following](#car-following_models)                                                                                                                                                   |
| personCapacity    | int                               | 4                                                                   | The number of persons (excluding an autonomous driver) the vehicle can transport.                                                                                                                                      |
| containerCapacity | int                               | 0                                                                   | The number of containers the vehicle can transport.                                                                                                                                                                    |
| boardingDuration  | float                             | 0.5                                                                 | The time required by a person to board the vehicle.                                                                                                                                                                    |
| loadingDuration   | float                             | 90.0                                                                | The time required to load a container onto the vehicle.                                                                                                                                                                |
| latAlignment      | float, "left", "right", "center", "compact", "nice", "arbitrary" | "center"                             | The preferred lateral alignment when using the [sublane-model](Simulation/SublaneModel.md). {{DT_FLOAT}} (in m from the center of the lane) or one of ("left", "right", "center", "compact", "nice", "arbitrary"). |
| minGapLat         | float                             | 0.6                                                                 | The desired minimum lateral gap when using the [sublane-model](Simulation/SublaneModel.md)                                                                                                                     |
| maxSpeedLat       | float                             | 1.0                                                                 | The maximum lateral speed when using the [sublane-model](Simulation/SublaneModel.md)                                                                                                                           |
| actionStepLength  | float                             | global default (defaults to the simulation step, configurable via **--default.action-step-length**) | The interval length for which vehicle performs its decision logic (acceleration and lane-changing). The given value is processed to the closest (if possible smaller) positive multiple of the simulation step length. See [actionStepLength details](Car-Following-Models.md#actionsteplength)|

If no vehicle type is defined, a default vehicle type will be used ("DEFAULT_VEHTYPE" in sumo-gui). Information on the pursuit models available in sumo can be found in the [documentation](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#car-following_models).

The following example defines two types of vehicles:
```xml
<routes>
  <vType id="type1" accel="2.6" decel="4.5" length="5" speedFactor="1.0" speedDev="0.1" maxSpeed="30" color="blue"/>
  <vType id="type2" accel="1.3" decel="2.3" length="10" speedFactor="0.7" speedDev="0.1" maxSpeed="20" color="red"/>
  <flow id="flow1" type="type1" from="1to2" to="2to3" begin="0" vehsPerHour="1000"/>
  <flow id="flow2" type="type2" from="1to2" to="2to4" begin="0" vehsPerHour="500"/>
</routes>
```
It is also possible to use vehicle type distributions (drawn during the simulation) by adding a probability attribute for each type:
```xml
<routes>
  <vTypeDistribution id="typedist1">
    <vType id="type1" accel="2.6" decel="4.5" length="5" speedFactor="1.0" speedDev="0.1" maxSpeed="30" color="blue" probability="2"/>
    <vType id="type2" accel="1.3" decel="2.3" length="10" speedFactor="0.7" speedDev="0.1" maxSpeed="20" color="red" probability="1"/>
  </vTypeDistribution>
  <flow id="flow0" type="typedist1" from="1to2" to="2to3" begin="0" vehsPerHour="1500"/>
</routes>
```
The distribution can use types defined beforehand:
```xml
<routes>
  <vType id="type1" accel="2.6" decel="4.5" length="5" speedFactor="1.0" speedDev="0.1" maxSpeed="30" color="blue" probability="2"/>
  <vType id="type2" accel="1.3" decel="2.3" length="10" speedFactor="0.7" speedDev="0.1" maxSpeed="20" color="red" probability="1"/>
  <vTypeDistribution id="typedist1" vTypes="type1 type2"/>
  <flow id="flow0" type="typedist1" from="1to2" to="2to3" begin="0" vehsPerHour="1500"/>
</routes>
```
Finally, it is possible to combine vehicle type distributions with route distributions:
```xml
<routes>
  <vTypeDistribution id="typedist1">
    <vType id="type1" accel="2.6" decel="4.5" length="5" speedFactor="1.0" speedDev="0.1" maxSpeed="30" color="blue" probability="2"/>
    <vType id="type2" accel="1.3" decel="2.3" length="10" speedFactor="0.7" speedDev="0.1" maxSpeed="20" color="red" probability="1"/>
  </vTypeDistribution>
  <routeDistribution id="routedist1">
    <route id="route0" edges="1to2 2to3" color="red" probability="2"/>
    <route id="route1" edges="1to2 2to4" color="blue" probability="1"/>
  </routeDistribution>
  <flow id="flow0" type="typedist1" route="routedist1" begin="0" vehsPerHour="1500"/>
</routes>
```
It is also possible to use the abstract vehicle classes:
```xml
<routes>
  <vTypeDistribution id="typedist1">
    <vType id="type1" vclass="passenger" color="blue" probability="2"/>
    <vType id="type2" vclass="truck" length="10" guiShape="delivery" color="red" probability="1"/>
  </vTypeDistribution>
  <flow id="flow0" type="typedist1" from="1to2" to="2to3" begin="0" vehsPerHour="1500"/>
</routes>
```

## Speed distributions
All drivers do not have the same behavior in choosing their speed, which is represented in SUMO by the distribution of the speedFactor attribute of each vehicle, obtained by using the speedFactor and speedDev parameters of the vehicle types. It is possible to use sumo's globable option `--default.speeddev` as the default. It is therefore possible to eliminate the variability in the speed choices made by the drivers by setting this value to 0.

An alternative way to define the speedFactor distribution is to use the notation "norm (mean, dev)" or "normc (mean, dev, min, max)" for normal distributions of mean and dev parameters, the second version being truncated between min and max. Using speedFactor = norm (1, 0.1) is the same as speedFactor = 1 and speedDev = 0.1.

```xml
<routes>
  <vType id="type1" accel="2.6" decel="4.5" sigma="0.5" length="5" speedFactor="normc(1.0,0.1,0.6,1.3)" maxSpeed="30" color="blue"/>
  <vType id="type2" accel="1.3" decel="2.3" sigma="0.5" length="10" speedFactor="normc(0.7,0.1,0.5,0.9)" maxSpeed="20" color="red"/>
  <flow id="flow1" type="type1" from="1to2" to="2to3" begin="0" departSpeed="desired" vehsPerHour="1000"/>
  <flow id="flow2" type="type2" from="1to2" to="2to4" begin="0" departSpeed="desired" vehsPerHour="500"/>
</routes>
```
We can note the use of the desired speed ("desired") during the insertion of the vehicle which depends on speedFactor (drawn during the simulation for each vehicle in the distribution of its type) (the desired speed is equal to the product of the speedFactor by the speed limit of the link).

The existing abstract vehicle classes have default values ​​for the speedDev attribute (standard deviation of speedFactor):
* passenger (default vClass): 0.1
* pedestrian: 0.1
* bicycle: 0.1
* truck, trailer, coach, delivery, taxi: 0.05
* tram, rail_urban, rail, rail_electric, rail_fast: 0
* emergency: 0
* all others: 0.1

## Circulation models
User behavior in SUMO is based on three main models: a [tracking model](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#car-following_models), a [changing model lane](https://sumo.dlr.de/docs/Definition_of_Vehicles,_Vehicle_Types,_and_Routes.html#lane-changing_models) and a [model for intersections](https://sumo.dlr.de/docs/Definition_of_Vehicles, _Vehicle_Types, _and_Routes.html # junction_model_parameters). There are different types of models for the first two, defined respectively by the attributes "carFollowModel" and "laneChangeModel" in a vehicle type.

The default template used in SUMO is the [Stefan Krauss template](https://sumo.dlr.de/pdf/KraussDiss.pdf). It is a model with a safe distance, that is to say a model in which each vehicle seeks to reach its desired speed, while keeping sufficient space in relation to the leading vehicle so as to avoid a collision if the leading driver brakes. The model depends on at least five parameters (defined in a type of vehicle), denoted "accel", "decel", "minGap", "sigma" and "tau".

# Simulation
The [elements needed for a simulation](https://sumo.dlr.de/docs/Simulation/Basic_Definition.html) are a network file and a move request file. For our example ["hello"](sumo/), a simulation can be run with the command ```$ sumo -n hello.net.xml -r hello.rou.xml``` (or replacing sumo with sumo -gui for the simulation GUI showing the animation of the vehicles). It is preferable to use a `.sumocfg` configuration file which allows you to specify other parameters:

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
  
  <processing>
    <step-method.ballistic value="true"/>
  </processing>
  
  <random>
    <seed value="45"/>
  </random>

  <gui_only>
    <gui-settings-file value="hello.settings.xml"/>
  </gui_only>
</configuration>
```
This file indicates the simulation duration (from 0 to 600 s), the time step (0.1 s), the initialization seed ("seed") for the random number generators and a reference to a [configuration file of sumo-gui interface](https://sumo.dlr.de/docs/sumo-gui.html#configuration_files) (which can allow [to display a background image](https://sumo.dlr.de/docs/sumo-gui.html#showing_background_images) to plot the network in netedit):
```xml
<viewsettings>
    <viewport y="0" x="250" zoom="100"/>
    <delay value="100"/>
    <scheme name="real world"/>
</viewsettings>
```

Note that the [time step for driver actions ("actionStepLength")](https://sumo.dlr.de/docs/Simulation/Basic_Definition.html#defining_the_action_step_length) is equal to the simulation time step , which is 1 s by default. If the latter is set to a lower value, it is strongly recommended to set a larger value for this time step of the driver's actions (in which case the integration method used to update the speeds and positions of the vehicles [ change](https://sumo.dlr.de/docs/Simulation/Basic_Definition.html#defining_the_integration_method)). This time step partially represents the driver's perception and reaction time because the driver's actions will still take place according to the state of the simulation at the previous time step, even if the actions are updated less frequently ( see [documentation](https://sumo.dlr.de/docs/Car-Following-Models.html#actionsteplength)). There is a risk of collision if this time step is [greater than tau](https://sumo.dlr.de/docs/Car-Following-Models.html#tau).

It is especially important to understand [which phenomena](https://sumo.dlr.de/docs/Simulation/Randomness.html) are described by random number distributions, the value of which depends on the chosen seed:
* distribution of routes and types of vehicles,
* speed distributions,
* distributions of user models parameters (tracking model, etc.),
* distributions of starting times,
* TIV distributions,
* distributions of attributes of flows, journeys and vehicles.

It is then essential to run a simulation several times (make several replications of the simulation) with different seeds. This can be done with the command line sumo tool: ```$ sumo --seed 42 -c hello.sumocfg```. Sample Linux / MacOS [`replicate.sh`](sumo/replicate.sh) and Windows [`replicate.bat`](sumo/replicate.bat) scripts are provided to perform several simulations with different seeds. Note the use of the `--output-prefix` command line option which renames all SUMO output files with a prefix (in the case of `replicate.*` scripts: `seedxx-` for each replication where `xx` is the number of the used seed).

# Data Collection
The many methods for extracting data from a simulation are described in the [documentation](https://sumo.dlr.de/docs/Simulation/Output.html).

It is necessary to place detectors or declare the elements of the network for which to extract data in an "additional" file `.add.xml`. This file can either be loaded from the command line with the `-a` option or specified in the `.sumocfg` configuration file:
```xml
  <additional-files value = "hello.add.xml"/>
```

The data files are saved in XML format which can be read in a text editor, but are not very easy to handle (some [tools](https://sumo.dlr.de/docs/Tools/Visualization.html# plot_tripinfo_distributionspy) exist for visualization). There is a command line tool (Python script [xml2csv.py](https://sumo.dlr.de/docs/Tools/Xml.html#xml2csvpy)) for converting result files in XML format to files in CSV format (to open in a spreadsheet). The commands ```$ python "C: \ Program Files (x86) \Eclipse\Sumo\tools\xml\xml2csv.py" .\Lanedata.xml``` (Windows), ```$ /usr/local/share/sumo/tools/xml/xml2csv.py induction1.xml``` (MacOS) and ```$ /usr/share/sumo/tools/xml/xml2csv.py induction1.xml``` (Linux) (at adjust according to the installation path of the script) generate the CSV file `induction1.csv` which contains all the data of the XML file (the name of the file can be chosen with the option` -o`).

## Network
There are several ways to collect data for the entire network:
* [aggregated data on the trips of all vehicles](https://sumo.dlr.de/docs/Simulation/Output/TripInfo.html) ("trip info") with the option `--tripinfo-output` passed in command line or by adding `<tripinfo-output value =" trip.info.xml "/>` in the configuration file `.sumocfg`, including information on travel time and delay,
* traffic data aggregated on the simulation as the total lost time are obtained with the option `--duration-log.statistics` passed on the command line,
* [trajectory data of all vehicles](https://sumo.dlr.de/docs/Simulation/Output/AmitranOutput.html),
* [raw data of all vehicles](https://sumo.dlr.de/docs/Simulation/Output/RawDump.html) including trajectory data,
* [macroscopic data by link or channel](https://sumo.dlr.de/docs/Simulation/Output/Lane-_or_Edge-based_Traffic_Measures.html) for the whole network.

For the latter case, you must configure the additional `.add.xml` file as follows:
```xml
<additional>
  <edgeData id="edge1" freq="100" file="edgedata.xml" />
  <laneData id="lane1" freq="100" file="lanedata.xml" />
</additional>
```
The id attribute is the identifier of the measurement, the freq attribute controls the frequency with which the data is aggregated and the file attribute the name of the XML file where the data is saved. The data is collected for all the links or all the channels of the network and for each link or network, include for each interval the density (veh/km), the occupancy rate (%), the spatial average speed (m/s), the numbers of vehicles entered ("entered") and left ("left") of the link or the lane. Among other attributes, the excludeEmpty attribute set to true (excludeEmpty = "true") allows data to be saved only for links or lanes with observations (ie on which vehicles are traveling).

## Virtual sensors
Several [sensor types](https://sumo.dlr.de/docs/Simulation/Output.html#simulated_detectors) can be simulated in SUMO. The first and most useful type is the magnetic loop type point sensor. There are two versions, depending on whether you want to obtain microscopic or macroscopic data. The first are obtained by an ["instantInductionLoop" sensor](https://sumo.dlr.de/docs/Simulation/Output/Instantaneous_Induction_Loops_Detectors.html), the seconds by an ["inductionLoop" or E1 sensor](https: //sumo.dlr.de/docs/Simulation/Output/Induction_Loops_Detectors_(E1).html) (also noted "e1Detector" when created with netedit), configured as follows in the additional `.add.xml` file:
```xml
<additional>
  <inductionLoop id="ind1" lane="1to2_0" pos="300" freq="100" file="induction1.xml"/>
  <instantInductionLoop id="instantind1" lane="1to2_0" pos="300" file="instantinduction1.xml"/>
</additional>
```
```xml
<additional>
  <e1Detector id="ind1" lane="1to2_0" pos="300" freq="100" file="induction1.xml"/>
</additional>
```
Being punctual, these sensors must be placed on a specific lane via the lane attribute at a specific position via the pos (m) attribute. The "instantInductionLoop" sensor has no frequency attribute records the passage of each vehicle, its speed (m/s), as well as the slot to the previous vehicle (s) when the vehicle advances on the sensor and the occupancy time (s) when the vehicle passes the sensor. The "inductionLoop" sensor detects the flow rate (veh/h), the occupancy rate (%) and the temporal and spatial average speeds (m/s) for each time interval.

The [laneAreaDetector ("laneAreaDetector") or E2](https://sumo.dlr.de/docs/Simulation/Output/Lanearea_Detectors_ (E2) .html) sensors simulate video camera-type space sensors for one or more successive lanes and take up speeds (m /s), occupancy rate (%), lost time (s) and information on queues and stops in the supervised area.

The [sensors for multiple inputs and outputs ("entryExitDetector") or E3](https://sumo.dlr.de/docs/Simulation/Output/Multi-Entry-Exit_Detectors_ (E3) .html) are used to collect data for an area described by several entry and exit points (a point being defined by its position on a lane) as a crossroads. The data obtained is similar to the track area sensors.

# Appendices
## OpenStreetMap road classification
The road types used in OSM with their descriptions are available at https://wiki.openstreetmap.org/wiki/Key:highway.

The types of roads are as follows in the Montreal area: Highway.motorway,
Highway.primary, Highway.secondary, Highway.tertiary, Highway.residential, Highway.service, Highway.pedestrian, Highway.footway, Railway.rail, Highway.cycleway, Railway.subway. We meet less often Highway.track, Highway.path, Highway.steps, Highway.primary.link, Highway.secondary.link, Highway.motorway.link, Highway.unclassified.
