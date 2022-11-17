// import { useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";
// import useAuth from "../hooks/useAuth";
// import updateActivity from "../api/activities";

// export default function UpdateActivity() {
//   const { id } = useParams();
//   const [name, setName] = useState("");
//   const [goal, setGoal] = useState("");
//   const { token } = useAuth("");
//   const navigate = useNavigate("");
//   return (
//     <>
//       <h3>Edit Activity </h3>
//       <form
//         onSubmit={async (e) => {
//           e.preventDefault();
//           const result = await updateActivity(name, goal, token, id);
//           navigate("/");
//           console.log(result);
//         }}
//       >
//         <input
//           type="text"
//           placeholder="title"
//           value={name}
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//         ></input>
//         <input
//           type="text"
//           placeholder="goal"
//           value={goal}
//           onChange={(e) => {
//             setGoal(e.target.value);
//           }}
//         ></input>
//         <button type="submit"> Submit</button>
//       </form>
//     </>
//   );
// }
