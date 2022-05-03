const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mydb", "root", "193705", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false
}
});

const Many = require('../Model/Room_has_Users')(sequelize, DataTypes);
const Rooms = require('../Model/Room')(sequelize, DataTypes);
const Users = require('../Model/Users')(sequelize, DataTypes);


exports.createThing = async (username:any, room:any, next:any) => {  
  var Room = {
    name : room
  }
  await Rooms.create(Room).then(() => {next('Post saved successfully!');})
    .catch((error:any) => {next({error: error});});
};


exports.modifyThing = (req:any, res:any, next:any) => {
  Rooms.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch((error:any) => res.status(400).json({ error }));
  };


exports.deleteThing = (req:any, res:any, next:any) => {
    Rooms.deleteOne({_id: req.params.id})
    .then(() => {res.status(200).json({message: 'Deleted!'});})
    .catch((error:any) => {res.status(400).json({error: error});});
};


exports.getAllStuff = (req:any, res:any, next:any) => {
  Rooms.findAll()
  .then((things:any) => {res.status(200).json(things);})
  .catch((error:any) => {
    console.error(error);res.status(400).json({error: error });});
};

exports.checkRoom = async (username:any,next:any) => {
  var User = await Users.findAll({ where: { username: username } })
  if(User.length < 1){
    await Users.create({username:username, password:"null"})
  }else{
  var many = await Many.findAll({where: {Users_id: User[0].dataValues.id}})

  if(many.length < 1)
  next("")
  else{
    var Room = await Rooms.findAll({ where: { id: many[0].dataValues.Room_id} })
  next(Room[0].dataValues.name)
}}
};

exports.addUser = async (username:any, room:any, next:any) => {
  var Room = await Rooms.findAll({ where: { name: room} })
  var User = await Users.findAll({ where: { username: username } })
  
  var newItem = {
    Room_id : Room[0].dataValues.id,
    Users_id : User[0].dataValues.id
  }
  await Many.create(newItem).then(() => {next('Post saved successfully!');})
    .catch((error:any) => {next({error: error});});
};

exports.exUser = async (username:any, next:any) => {
  var User = await Users.findAll({ where: { username: username } })
  await Many.destroy({ where: { Users_id: User[0].dataValues.id } }).then(() => {next('exit successfully!');})
    .catch((error:any) => {next({error: error});});
};

export {};