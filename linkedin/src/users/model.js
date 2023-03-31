import { DataTypes } from "sequelize"
import sequelize from "../db.js"
import ExperiencesModel from "../experiences/model.js";
import PostsModel from "../posts/model.js";



const UsersModel = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, 
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(150),
      allowNull: false,
    }
  
   
  }
 
)

UsersModel.hasMany(ExperiencesModel, { foreignKey: { name: "userId", allowNull: false } })
ExperiencesModel.belongsTo(UsersModel, { foreignKey: { name: "userId", allowNull: false } })


export default UsersModel