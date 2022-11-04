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
    creatorId: 1,
    isPublic: true,
  },
  {
    name: "chest day",
    goal: "4 sets",
    creatorId: 2,
    isPublic: true,
  },
  {
    name: "arms",
    goal: "reps till failure",
    creatorId: 3,
    isPublic: true,
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
