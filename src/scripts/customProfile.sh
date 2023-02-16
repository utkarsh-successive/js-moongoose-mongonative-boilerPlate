#Clinic doctor command will generate the performance report of the appliaction.

clinic doctor --autocannon [-c $1 -a $2 -m GET /api/todo/ ] -- node dist/src/index.js

#Clinic bubbleprof command will generate the asynchronus delay report of the appliaction.

clinic bubbleprof --autocannon [ -c $1 -a $2 -m GET /api/todo/  ] -- node dist/src/index.js


