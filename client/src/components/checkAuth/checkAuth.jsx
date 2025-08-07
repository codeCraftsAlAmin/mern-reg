// checkAuth.js
// import axios from "axios";

// export const checkAuth = async () => {
//   try {
//     const res = await axios.get("http://localhost:4000/api/protected", {
//       withCredentials: true,
//     });

//     console.log("✅ Access token works. Authenticated:", res.data);
//     return true;
//   } catch (err) {
//     console.warn("❌ Access token failed or not set.", err);
//     return false;
//   }
// };

// use them in App.jsx

// import { useEffect } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";

// const dispatch = useDispatch();

// useEffect(() => {
//   const checkAuth = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/api/protected", {
//         withCredentials: true,
//       });

//       dispatch(setUser(res.data.payload.loggedUser)); // update Redux store
//       console.log("✅ Auto-login successful:", res.data);
//     } catch (err) {
//       console.warn("❌ Not authenticated.", err);
//     }
//   };

//   checkAuth();
// }, [dispatch]);
