const jwt = require("jsonwebtoken");
const { authRequired } = require("./utils");
const raRouter = require("express").Router();
const {
  addActivityRoutine,
  updateRoutineActivity,
  getRoutineActivityById,
  destroyActivity,
} = require("../db/adapters/routine_activities");
const { getRoutineById } = require("../db/adapters/routines");
const { getActivityById } = require("../db/adapters/activities");

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
    const routine = await getRoutineById(ra.routineId);

    if (routine.creator_id === req.user.id) {
      const updatedRa = await updateRoutineActivity({
        id: routineActivityId,
        fields: updateFields,
      });
      res.send({ updatedRa });
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

raRouter.delete(
  "/:routineId/:activityId",
  authRequired,
  async (req, res, next) => {
    const { routineId, activityId } = req.params;
    try {
      const routine = await getRoutineById(routineId);

      if (routine.creator_id === req.user.id) {
        const deleteActivity = await destroyActivity({ routineId, activityId });

        res.send(deleteActivity);
      } else {
        next({
          name: "UnauthorizedUserError",
          message: "You cannot delete a routine activity which is not yours",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);
module.exports = raRouter;
