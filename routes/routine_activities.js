const jwt = require("jsonwebtoken");
const { authRequired } = require("./utils");
const raRouter = require("express").Router();
const {
  addActivityRoutine,
  updateRoutineActivity,
  getRoutineActivityById,
} = require("../db/adapters/routine_activities");
const { getRoutineById } = require("../db/adapters/routines");

raRouter.post("/", async (req, res, next) => {
  const { duration, count, routineId, activityId } = req.body;
  try {
    const addActivity = await addActivityRoutine({
      duration,
      count,
      routineId,
      activityId,
    });
    res.send({ addActivity });
  } catch (error) {
    next(error);
  }
});

raRouter.patch("/:routineActivityId", authRequired, async (req, res, next) => {
  const { routineActivityId } = req.params;
  const { count, duration } = req.body;

  const updateFields = {};

  if (count) {
    updateFields.count = count;
  }

  if (duration) {
    updateFields.duration = duration;
  }

  try {
    const ra = await getRoutineActivityById(routineActivityId);

    const routineId = ra.routineId;
    const routine = await getRoutineById(routineId);
    console.log(req.user);
    if (routine.creator_id === req.user.id) {
      console.log({
        id: +routineActivityId,
        fields: updateFields,
      });
      const updatedRa = await updateRoutineActivity({
        id: +routineActivityId,
        fields: updateFields,
      });
      res.send({ routine: updatedRa });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update an activity routine that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = raRouter;
