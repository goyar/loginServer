const Sequelize = require('sequelize');
const globals = require('../../cfg/globals.js');
module.exports.Sequelize = Sequelize;

const sequelize = 
    new Sequelize (globals.db.database, // database
                    globals.db.user, // user
                    globals.db.password, // pass
                    globals.db.connection
    );

module.exports.sequelize = sequelize;

module.exports.initialize = 
    function(){
        return new Promise(function(resolve, reject){
            sequelize.sync().then(()=>{
                resolve();
            }).catch(()=>{
                reject("unable to sync the database");
            });
        });
    };