import express from "express"
import createHttpError from "http-errors"
import ExperiencesModel from "./model.js";
import UsersModel from "../users/model.js";

const experiencesRouter = express.Router()

experiencesRouter.post("/", async (req, res, next) => {
  try {
    const { experienceId } = await ExperiencesModel.create(req.body)
    res.status(201).send({ experienceId })
  } catch (error) {
    next(error)
  }
})

experiencesRouter.get("/", async (req, res, next) => {
  try {

      const experiences = await ExperiencesModel.findAll({ attributes: ["experienceId", "role","company", "startDate", "endDate","description","area", "image"]})
     res.send(experiences)
  } catch (error) {
    next(error)
  }
})

experiencesRouter.get("/:experienceId", async (req, res, next) => {
  try {
    const experience = await ExperiencesModel.findByPk(req.params.experienceId)  
    if (experience) {
      res.send(experience)
    } else {
      next(createHttpError(404, `Experience with id ${req.params.experienceId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

experiencesRouter.put("/:experienceId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await ExperiencesModel.update(req.body, { where: { experienceId: req.params.experienceId }, returning: true })
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0])
    } else {
      next(createHttpError(404, `Experience with id ${req.params.experienceId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

experiencesRouter.delete("/:experienceId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await ExperiencesModel.destroy({ where: { experienceId: req.params.experienceId } })
    if (numberOfDeletedRows === 1) {
      res.status(204).send()
    } else {
      next(createHttpError(404, `Experience with id ${req.params.experienceId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})


experiencesRouter.get("/:userId/experiences", async (req, res, next) => {
  try {
    const user = await UsersModel.findByPk(req.params.userId, {
    include: { model: ExperiencesModel, attributes: ["experienceId", "role","company", "startDate", "endDate","description","area", "image"] },
    })
    res.send(user)
  } catch (error) {
    next(error)
  }
})
export default experiencesRouter