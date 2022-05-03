

module.exports = function(sequelize:any, DataTypes:any) {
    const Room = sequelize.define("Room", {
          name: {type: String, require: true}
    },{
      freezeTableName: true
    });
    
    return Room;
    };