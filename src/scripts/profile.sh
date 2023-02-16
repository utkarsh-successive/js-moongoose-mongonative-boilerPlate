#Clinic doctor command will generate the performance report of the appliaction.

clinic doctor --autocannon ['localhost:$PORT' ] -- node dist/src/index.js

#Clinic bubbleprof command will generate the asynchronus delay report of the appliaction.

clinic bubbleprof --autocannon [ 'localhost:$PORT' ] -- node dist/src/index.js


