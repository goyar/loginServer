
const users = require('./models/users');

var user1 = {
    firstName: 'jp',
    lastName: 'smith',
    email: 'jp.smith@turf'
};

users.initialize().then(()=>{
    console.log('Connected to DB!');
    //users.addUser(user1);
    users.getAllUsers().then((userData)=>{
        console.log('Our users are:');
        for(let key in userData){
            console.log('--------------------');
            console.log(userData[key].dataValues);
            console.log('####################');
        }
        console.log('End of the list of users........');
    }).catch((err)=>{
        console.log('We got an error: ' + err);
    });
}).catch(()=>{
    console.log('Connection to DB failed!');
})
