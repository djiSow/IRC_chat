
module.exports = function(sequelize:any, DataTypes:any) {
    const Room_has_Users = sequelize.define("Room_has_Users", {
        Room_id: {type: Number, require: true, primaryKey: true},
        Users_id: {type: Number, require: true}
    },{
      freezeTableName: true
    });
    
    return Room_has_Users;
    };