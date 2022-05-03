const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mydb", "root", "193705", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false
}
});

const Message = require('../Model/Messages')(sequelize, DataTypes);
const Users = require('../Model/Users')(sequelize, DataTypes);
const Rooms = require('../Model/Room')(sequelize, DataTypes);
const Many = require('../Model/Room_has_Users')(sequelize, DataTypes);

//ORM
exports.createThing = async (username:any, msg:any, room:any, next:any) => { 
  var Room = await Rooms.findAll({ where: { name: room} })
  var User = await Users.findAll({ where: { username: username } })
  console.log("ooooooooooooooooooooo", msg)
  var item = {
    expeditor_id: User[0].dataValues.id,
    content: msg,
    date: "null",
    Room_id: Room[0].dataValues.id,
  }
  await Message.create(item).then(() => {next({ message: 'command check : ok'});})
    .catch((error:any) => {next(({error: error}))});
};





exports.getAllStuff = async ( room:any, next:any) => {
  var Room = await Rooms.findAll({ where: { name: room} })

  Message.findAll({include: {
    model: Many,
    required: true
  },where: {Room_id: Room[0].dataValues.id}})
  .then((things:any) => {console.log(things);next(things);})
  .catch((error:any) => {
    console.error(error);next({error: error });});
};

export {};