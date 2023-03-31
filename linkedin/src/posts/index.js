import express from "express"
import createHttpError from "http-errors"
import UsersModel from "../users/model.js";
import PostsModel from "./model.js";
//import { Op } from "sequelize"

const postsRouter = express.Router()

postsRouter.post("/", async (req, res, next) => {
  try {
    const { postId } = await PostsModel.create(req.body)
    res.status(201).send({ postId })
  } catch (error) {
    next(error)
  }
})

postsRouter.get("/", async (req, res, next) => {
  try {
     
      const posts = await PostsModel.findAll({ attributes: ["postId", "text", "image"]})
     res.send(posts)
  } catch (error) {
    next(error)
  }
})

postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const post = await PostsModel.findByPk(req.params.postId)  
    if (post) {
      res.send(post)
    } else {
      next(createHttpError(404, `Post with id ${req.params.postId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

postsRouter.put("/:postId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await PostsModel.update(req.body, { where: { postId: req.params.postId }, returning: true })
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0])
    } else {
      next(createHttpError(404, `Post with id ${req.params.postId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

postsRouter.delete("/:postId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await PostsModel.destroy({ where: { postId: req.params.postId } })
    if (numberOfDeletedRows === 1) {
      res.status(204).send()
    } else {
      next(createHttpError(404, `Post with id ${req.params.postId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

postsRouter.get("/:userId/experiences", async (req, res, next) => {
  try {
    const user = await UsersModel.findByPk(req.params.userId, {
    include: { model: PostsModel, attributes: ["postId","text", "image"] },
    })
    res.send(user)
  } catch (error) {
    next(error)
  }
})

export default postsRouter