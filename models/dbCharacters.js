const dbCon = require('../commons/connectors/dbConector');

var Characters = dbCon.sequelize.define('Characters',{
    charNum: {
        type: dbCon.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    charName: dbCon.Sequelize.STRING
});

dbCon.initialize().then(()=>{
    console.log(__filename + ": Connected to database!");
});

module.exports.deleteCharById = function(id){
    return new Promise(
        function(resolve, reject){
            Characters.destroy({where:{charNum: id}}).then(()=>{
                resolve();
            }).catch(()=>{
                reject("unable to delete Character Number " + id);
            });
    });
};

module.exports.getCharById = function(id){
    return new Promise(
        function(resolve, reject){
            Characters
                .findAll({ where: { charNum: id}})
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
module.exports.getAllCharacters = function(){
    return new Promise(
        function(resolve, reject){
            Characters
                .findAll()
                .then((data)=>{
                        if(data.length > 0){
                            resolve(data);
                        } else {
                            reject("no results returned");        
                        }
                    })
                .catch((err)=>{
                    reject("Ups!! Something went wrong: " + err);
                });
    });
};

module.exports.addChar = function(charData){
    return new Promise(function(resolve, reject){
        for (let key in charData){
            if(charData[key] ==""){
                charData[key] = null;
            }
        }
        Characters.create(charData).then(()=>{
            resolve();
        }).catch(()=>{
            reject("Unable to create character.")
        });
    });
};

module.exports.updateChar = function(charData){
    return new Promise(function(resolve, reject){
        for (let key in charData){
            if(charData[key] ==""){
                charData[key] = null;
            }
        }
        Characters.update(charData, {where: {charNum : charData.charNum}})
            .then(()=>{
                resolve();
            }).catch(()=>{
                reject("Unable to create character.")
            });
    });
};