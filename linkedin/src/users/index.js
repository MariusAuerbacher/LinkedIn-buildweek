import express from "express"
import createHttpError from "http-errors"
import ExperiencesModel from "../experiences/model.js";
import PostsModel from "../posts/model.js";
//import { Op } from "sequelize"
import UsersModel from "./model.js";

const usersRouter = express.Router()

usersRouter.post("/", async (req, res, next) => {
  try {
    const { userId } = await UsersModel.create(req.body)
    res.status(201).send({ userId })
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/", async (req, res, next) => {
  try {
      const users = await UsersModel.findAll({ attributes: ["userId", "name","email", "bio", "title", "area", "image"], include: [
        {
          model: ExperiencesModel,
          attributes: ["experienceId", "role","company", "startDate", "endDate","description","area", "image"],
        },
          {
            model: PostsModel,
            attributes: ["postId", "text", "image"],
          }]
      })
     res.send(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await UsersModel.findByPk(req.params.userId)  
    if (user) {
      res.send(user)
    } else {
      next(createHttpError(404, `User with id ${req.params.userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

usersRouter.put("/:userId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await UsersModel.update(req.body, { where: { userId: req.params.userId }, returning: true })
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0])
    } else {
      next(createHttpError(404, `User with id ${req.params.userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await UsersModel.destroy({ where: { userId: req.params.userId } })
    if (numberOfDeletedRows === 1) {
      res.status(204).send()
    } else {
      next(createHttpError(404, `User with id ${req.params.userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})



export default usersRouter