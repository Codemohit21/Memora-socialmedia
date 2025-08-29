// import React, { useRef } from "react";
// import { Route, Routes, useLocation } from "react-router-dom";
// import Feed from "./pages/Feed";
// import Messages from "./pages/Messages";
// import ChatBox from "./pages/ChatBox";
// import Connections from "./pages/Connections";
// import Discover from "./pages/Discover";
// import Profile from "./pages/Profile";
// import CreatePost from "./pages/CreatePost";
// import Login from "./pages/Login";
// import { useUser, useAuth } from "@clerk/clerk-react";
// import Layout from "./pages/Layout";
// import toast, { Toaster } from "react-hot-toast";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchUser } from "./features/user/userSlice";
// import { fetchConnections } from "./features/connections/connectionSlice";
// import { addMessage } from "./features/messages/messagesSlice";
// import Notification from "./components/Notification";

// const App = () => {
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const { pathname } = useLocation();
//   const pathnameRef = useRef(pathname);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (user) {
//         // console.log("before token")
//         const token = await getToken();
//         // console.log(token);
//         // console.log("after token")
//         dispatch(fetchUser(token));
//         // console.log("after dispatch");

//         dispatch(fetchConnections(token));
//       }
//     };
//     fetchData();
//   }, [user, getToken, dispatch]);

//   useEffect(() => {
//     pathnameRef.current = pathname;
//   }, [pathname]);

//   useEffect(() => {
//     if (user) {
//       const eventSource = new EventSource(
//         import.meta.env.VITE_BASEURL + "/api/message/" + user.id
//       );

//       eventSource.onmessage = (event) => {
//         console.log("🔥 SSE Event:", event.data);
//         const message = JSON.parse(event.data);

//         if (
//           pathnameRef.current === "/messages/" + message.from_user_id._id &&
//           pathnameRef.current !== "/messages/" + message.to_user_id._id
//         ) {
//           dispatch(addMessage(message));
//         } else {
//           toast.custom((t) => <Notification t={t} message={message} />, {
//             position: "bottom-right",
//           });
//         }
//       };
//       return () => {
//         eventSource.close();
//       };
//     }
//   }, [user, dispatch]);

//   return (
//     <>
//       <Toaster />
//       <Routes>
//         {!user ? (
//           <Route path="*" element={<Login />} />
//         ) : (
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Feed />} /> {/* Loads at "/" */}
//             <Route path="messages" element={<Messages />} />
//             <Route path="messages/:userId" element={<ChatBox />} />
//             <Route path="connections" element={<Connections />} />
//             <Route path="discover" element={<Discover />} />
//             <Route path="profile" element={<Profile />} />
//             <Route path="profile/:profileId" element={<Profile />} />
//             <Route path="create-post" element={<CreatePost />} />
//           </Route>
//         )}
//       </Routes>
//     </>
//   );
// };

// export default App;
// import React, { useRef, useEffect } from "react";
// import { Route, Routes, useLocation } from "react-router-dom";
// import Feed from "./pages/Feed";
// import Messages from "./pages/Messages";
// import ChatBox from "./pages/ChatBox";
// import Connections from "./pages/Connections";
// import Discover from "./pages/Discover";
// import Profile from "./pages/Profile";
// import CreatePost from "./pages/CreatePost";
// import Login from "./pages/Login";
// import { useUser, useAuth } from "@clerk/clerk-react";
// import Layout from "./pages/Layout";
// import toast, { Toaster } from "react-hot-toast";
// import { useDispatch } from "react-redux";
// import { fetchUser } from "./features/user/userSlice";
// import { fetchConnections } from "./features/connections/connectionSlice";
// import { addMessage } from "./features/messages/messagesSlice";
// import Notification from "./components/Notification";

// const App = () => {
//   const { user, isLoaded } = useUser();
//   const { getToken } = useAuth();
//   const { pathname } = useLocation();
//   const pathnameRef = useRef(pathname);
//   const dispatch = useDispatch();

//   // Fetch user + connections only once after login
//   useEffect(() => {
//     const fetchData = async () => {
//       if (user) {
//         const token = await getToken();
//         dispatch(fetchUser(token));
//         dispatch(fetchConnections(token));
//       }
//     };
//     fetchData();
//   }, [user, getToken, dispatch]);

//   // Track current path for SSE logic
//   useEffect(() => {
//     pathnameRef.current = pathname;
//   }, [pathname]);

//   // SSE for real-time messages
//   useEffect(() => {
//     if (user) {
//       const eventSource = new EventSource(
//         import.meta.env.VITE_BASEURL + "/api/message/" + user.id
//       );

//       eventSource.onmessage = (event) => {
//         const message = JSON.parse(event.data);

//         if (
//           pathnameRef.current === "/messages/" + message.from_user_id._id &&
//           pathnameRef.current !== "/messages/" + message.to_user_id._id
//         ) {
//           dispatch(addMessage(message));
//         } else {
//           toast.custom((t) => <Notification t={t} message={message} />, {
//             position: "bottom-right",
//           });
//         }
//       };

//       return () => eventSource.close();
//     }
//   }, [user, dispatch]);

//   // 🔹 Single full-screen loader until auth + Redux user ready
//   if (!isLoaded || !user) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Toaster />
//       <Routes>
//         {!user ? (
//           <Route path="*" element={<Login />} />
//         ) : (
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Feed />} />
//             <Route path="messages" element={<Messages />} />
//             <Route path="messages/:userId" element={<ChatBox />} />
//             <Route path="connections" element={<Connections />} />
//             <Route path="discover" element={<Discover />} />
//             <Route path="profile" element={<Profile />} />
//             <Route path="profile/:profileId" element={<Profile />} />
//             <Route path="create-post" element={<CreatePost />} />
//           </Route>
//         )}
//       </Routes>
//     </>
//   );
// };

// export default App;
import React, { useRef, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Feed from "./pages/Feed";
import Messages from "./pages/Messages";
import ChatBox from "./pages/ChatBox";
import Connections from "./pages/Connections";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useUser, useAuth } from "@clerk/clerk-react";
import Layout from "./pages/Layout";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice";
import { fetchConnections } from "./features/connections/connectionSlice";
import { addMessage } from "./features/messages/messagesSlice";
import Notification from "./components/Notification";

const App = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const { pathname } = useLocation();
  const pathnameRef = useRef(pathname);
  const dispatch = useDispatch();

  // Fetch user + connections only once after login
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await getToken();
        dispatch(fetchUser(token));
        dispatch(fetchConnections(token));
      }
    };
    fetchData();
  }, [user, getToken, dispatch]);

  // Track current path for SSE logic
  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  // SSE for real-time messages
  useEffect(() => {
    if (user) {
      const eventSource = new EventSource(
        import.meta.env.VITE_BASEURL + "/api/message/" + user.id
      );

      eventSource.onmessage = (event) => {
        const message = JSON.parse(event.data);

        if (
          pathnameRef.current === "/messages/" + message.from_user_id._id &&
          pathnameRef.current !== "/messages/" + message.to_user_id._id
        ) {
          dispatch(addMessage(message));
        } else {
          toast.custom((t) => <Notification t={t} message={message} />, {
            position: "bottom-right",
          });
        }
      };

      return () => eventSource.close();
    }
  }, [user, dispatch]);

  // 🔹 Show spinner only while auth is loading
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Routes>
        {/* If user is not logged in, show Login page */}
        {!user ? (
          <Route path="*" element={<Login />} />
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:userId" element={<ChatBox />} />
            <Route path="connections" element={<Connections />} />
            <Route path="discover" element={<Discover />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:profileId" element={<Profile />} />
            <Route path="create-post" element={<CreatePost />} />
          </Route>
        )}
      </Routes>
    </>
  );
};

export default App;
