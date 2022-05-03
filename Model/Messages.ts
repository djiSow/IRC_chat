

module.exports = function(sequelize:any, DataTypes:any) {
    const Messages = sequelize.define("Messages", {
        expeditor_id: {type: String, require: true},
        content: {type: String, require: true},
        date: {type: String, require: true},
        Room_id: {type: Number, require: true}
    },{
      freezeTableName: true
    });
    
    return Messages;
    };

