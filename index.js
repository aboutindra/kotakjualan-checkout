const appServer = require('./bin/app/server');
const AppServer = new appServer();

AppServer.server.listen(1010, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log('Jalan')
    }
})