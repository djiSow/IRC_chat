

module.exports = function(sequelize:any, DataTypes:any) {
    const Users = sequelize.define("Users", {
      
    username: {type: String, require: true},
    password: {type: String, require: true},
    },{
      freezeTableName: true
    });
    
    return Users;
    };