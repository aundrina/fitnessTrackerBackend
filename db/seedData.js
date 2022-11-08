const users = [
  {
    username: "tina",
    password: "asdfasdf",
  },
  {
    username: "timmy",
    password: "asdfasd",
  },
  {
    username: "angelo",
    password: "asdfasd",
  },
];

const routines = [
  {
    name: "leg day",
    goal: "3 sets",
    creator_id: 1,
    is_public: true,
  },
  {
    name: "chest day",
    goal: "4 sets",
    creator_id: 2,
    is_public: true,
  },
  {
    name: "arms",
    goal: "reps till failure",
    creator_id: 3,
    is_public: true,
  },
];

const activities = [
  {
    name: "jump squat",
    description: "jump in air land in squat",
  },
  {
    name: "plank",
    description: "on toes & forearm",
  },
  {
    name: "jumping jacks ",
    description: "jump up and down",
  },
];

const routine_activities = [
  {
    routineId: 1,
    activityId: 1,
    duration: 30,
    count: 3,
  },
  {
    routineId: 2,
    activityId: 2,
    duration: 30,
    count: 3,
  },
  {
    routineId: 3,
    activityId: 3,
    duration: 30,
    count: 3,
  },
];

module.exports = {
  users,
  routines,
  activities,
  routine_activities,
};
