import { DataTypes } from "sequelize"
import sequelize from "../db.js"


const ExperiencesModel = sequelize.define(
  "experience",
  {
    experienceId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, 
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(150),
      allowNull: true,
    }
  
   
  }
 
)

export default ExperiencesModel