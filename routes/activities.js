const jwt = require("jsonwebtoken");
const { authRequired } = require("./utils");
const activitiesRouter = require("express").Router();
const {
  getActivityById,
  getAllActivities,
  updateActivity,
  createActivity,
} = require("../db/adapters/activities");
const { getPublicRoutinesByActivity } = require("../db/adapters/routines");

activitiesRouter.get("/", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();
    res.send({ allActivities });
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post("/", authRequired, async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const newActivity = await createActivity({
      name,
      description,
    });
    res.send({ newActivity });
  } catch (error) {
    next(error);
  }
});

activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;

  try {
    const publicRoutines = await getPublicRoutinesByActivity(activityId);
    res.send({ publicRoutines });
  } catch (error) {
    next(error);
  }
});

activitiesRouter.patch("/:activityId", authRequired, async (req, res, next) => {
  const { activityId } = req.params;
  const { name, description } = req.body;

  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }

  if (description) {
    updateFields.description = description;
  }

  try {
    const updatedActivity = await updateActivity({
      id: activityId,
      fields: updateFields,
    });
    res.send({ updatedActivity });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = activitiesRouter;
