#!/bin/bash
seed0=42
increment=1
nReplications=5
for ((i=0; i < nReplications; i++));
do
    seed=$((seed0+i*increment))
    echo 'Simulation '$((i+1))' avec graine '$seed
    echo '--------------------'
    sumo --seed $seed -c hello.sumocfg --tripinfo-output trips.info.xml --duration-log.statistics --output-prefix seed$seed-
    # /usr/share/sumo/tools/xml/xml2csv.py seed$seed-lanedata.xml
done
# exemple avec parallel
# parallel -j 5 sumo --seed {} -c hello.sumocfg --duration-log.statistics --output-prefix seed{}- ::: {42..52..2}
