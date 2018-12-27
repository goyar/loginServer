const dbCon = require('../commons/connectors/dbConector');

var Users = dbCon.sequelize.define('Users',{
    userNum: {
        type: dbCon.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: dbCon.Sequelize.STRING,
    lastName: dbCon.Sequelize.STRING,
    email: dbCon.Sequelize.STRING
});

dbCon.initialize().then(()=>{
    console.log(__filename + ": Connected to database!");
});



module.exports.deleteUserByNum = function(num){
    return new Promise(
        function(resolve, reject){
            Users.destroy({where:{userNum: num}}).then(()=>{
                resolve();
            }).catch(()=>{
                reject("unable to delete User Number " + num);
            });
    });
};

module.exports.getUserByNum = function(num){
    return new Promise(
        function(resolve, reject){
            Users
                .findAll({ where: { userNum: num}})
                .then((data)=>{
                        if(data.length > 0){
                            resolve(data);
                        } else {
                            reject("no results returned");        
                        }
                    })
                .catch(()=>{
                    reject("Ups!! Something went wrong");
                });
    });
};
module.exports.getAllUsers = function(){
    return new Promise(
        function(resolve, reject){
            Users
                .findAll()
                .then((data)=>{
                        if(data.length > 0){
                            resolve(data);
                        } else {
                            reject("no results returned");        
                        }
                    })
                .catch((err)=>{
                    reject("Ups!! Something went wrong");
                });
    });
};

module.exports.addUser = function(userData){
    return new Promise(function(resolve, reject){
        for (let key in userData){
            if(userData[key] ==""){
                userData[key] = null;
            }
        }
        Users.create(userData).then(()=>{
            resolve();
        }).catch(()=>{
            reject("Unable to create user.")
        });
    });
};

module.exports.updateUser = function(userData){
    return new Promise(function(resolve, reject){
        for (let key in userData){
            if(userData[key] ==""){
                userData[key] = null;
            }
        }
        Users.update(userData, {where: {userNum : userData.userNum}})
            .then(()=>{
                resolve();
            }).catch(()=>{
                reject("Unable to create employee.")
            });
    });
};