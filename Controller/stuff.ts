const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mydb", "root", "193705", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false
}
});

const Stuff = require('../Model/Users')(sequelize, DataTypes);


exports.createThing = async (req:any, res:any, next:any) => {    
  console.log("heeeeeeeeeeeeeello", req.body);
  await Stuff.create(req.body).then(() => {res.status(201).json({ message: 'Post saved successfully!'});})
    .catch((error:any) => {res.status(400).json({error: error});});
};


exports.modifyThing = (req:any, res:any, next:any) => {
  Stuff.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch((error:any) => res.status(400).json({ error }));
  };


exports.deleteThing = (req:any, res:any, next:any) => {
    Stuff.deleteOne({_id: req.params.id})
    .then(() => {res.status(200).json({message: 'Deleted!'});})
    .catch((error:any) => {res.status(400).json({error: error});});
};


exports.getAllStuff = (ok:any) => {
  Stuff.findAll()
  .then((things:any) => {console.log(things)
  ok(things)})
  .catch((error:any) => {
    console.error(error);});
};

export {};