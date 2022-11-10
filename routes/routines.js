const jwt = require("jsonwebtoken");
const routineRouter = require("express").Router();
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  destroyRoutine,
  getRoutineById,
} = require("../db/adapters/routines");
const {
  removeAllActivitiesFromRoutine,
} = require("../db/adapters/routine_activities");
const { authRequired } = require("./utils");

routineRouter.get("/routines", async (req, res, next) => {
  try {
    const allRoutines = await getAllPublicRoutines();
    res.send({ allRoutines });
  } catch (error) {
    next(error);
  }
});

routineRouter.post("/", authRequired, async (req, res, next) => {
  const { creator_id, is_public, name, goal } = req.body;
  try {
    const newRoutine = await createRoutine({
      creator_id,
      is_public,
      name,
      goal,
    });
    res.send({ newRoutine });
  } catch (error) {
    next(error);
  }
});

routineRouter.patch("/:routineId", authRequired, async (req, res, next) => {
  const { routineId } = req.params;
  const { is_public, name, goal } = req.body;

  const updateFields = {};

  if (is_public) {
    updateFields.is_public = is_public;
  }

  if (name) {
    updateFields.name = name;
  }

  if (goal) {
    updateFields.goal = goal;
  }
  try {
    const oldRoutine = await getRoutineById(+routineId);

    if (oldRoutine.creator_id === req.user.id) {
      console.log({
        id: +routineId,
        fields: updateFields,
      });
      const updatedRoutine = await updateRoutine({
        id: +routineId,
        fields: updateFields,
      });
      res.send({ routine: updatedRoutine });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update a routine that is not yours",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routineRouter.delete("/:routineId", authRequired, async (req, res, next) => {
  const { routineId } = req.params;
  try {
    const routine = await getRoutineById(+routineId);

    if (routine.creator_id === req.user.id) {
      const deletedRA = await removeAllActivitiesFromRoutine(+routineId);
      const deleteRoutine = await destroyRoutine(+routineId);

      res.send({ routine: deleteRoutine });
    } else {
      next(
        routine
          ? {
              name: "UnauthorizedUserError",
              message: "You cannot delete a routine which is not yours",
            }
          : {
              name: "RoutineNotFoundError",
              message: "That routine does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = routineRouter;
