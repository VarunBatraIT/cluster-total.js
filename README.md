# cluster-total.js
A cluster for total.js that will restart if process dies.
# Same id with a restart
```

if (F.id === 0) {
        //service perhaps sets a flag to db?
  }else{
        //execution of a service, F.id = 0 is a cluster with 0 id and if it dies, new process will restart with id = 0
  }
```
## Use file/redis session
In memory session will fail every single time, so use file/redis session with it.
