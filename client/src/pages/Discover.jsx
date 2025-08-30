// import React from "react";
// import { dummyConnectionsData } from "../assets/assets";
// import { Search } from "lucide-react";
// import Loading from "../components/Loading";
// import UserCard from "../components/UserCard";
// import { useAuth } from "@clerk/clerk-react";
// import api from "../api/axios";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { fetchUser } from "../features/user/userSlice";

// const Discover = () => {
//   const dispatch = useDispatch();
//   const [input, setInput] = React.useState("");
//   const [users, setUsers] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);

//   const { getToken } = useAuth();

//   const handleSearch = async (e) => {
//     if (e.key === "Enter") {
//       try {
//         setUsers([]);
//         setLoading(true);
//         const { data } = await api.post(
//           "/api/user/discover",
//           { input },
//           {
//             headers: { Authorization: `Bearer ${await getToken()}` },
//           }
//         );
//         data.success ? setUsers(data.users) : toast.error(data.message);
//         setLoading(false);
//         setInput("");
//       } catch (error) {
//         toast.error(error.message);
//       }
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getToken().then((token) => {
//       dispatch(fetchUser(token));
//     });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       <div className="max-w-6xl mx-auto p-6">
//         {/* Title */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">
//             Discover People
//           </h1>
//           <p className="text-slate-600">
//             Connect with people around the world and grow your network.
//           </p>
//         </div>
//         {/* search */}
//         <div className="mb-8 shadow-md rounded-md border border-slate-200/60 bg-white/80">
//           <div className="p-6">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search people by name, username, bio, or location ... "
//                 className="pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm"
//                 onChange={(e) => setInput(e.target.value)}
//                 value={input}
//                 onKeyUp={handleSearch}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-wrap gap-6">
//           {users.map((user) => (
//             <UserCard user={user} key={user._id} />
//           ))}
//         </div>
//         {loading && <Loading height="60vh" />}
//       </div>
//     </div>
//   );
// };

// export default Discover;
import React from "react";
import { Search } from "lucide-react";
import Loading from "../components/Loading";
import UserCard from "../components/UserCard";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "../features/user/userSlice";
import toast from "react-hot-toast";

const Discover = () => {
  const dispatch = useDispatch();
  const [input, setInput] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const { getToken } = useAuth();

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        setUsers([]);
        setLoading(true);
        const { data } = await api.post(
          "/api/user/discover",
          { input },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );
        data.success ? setUsers(data.users) : toast.error(data.message);
        setLoading(false);
        setInput("");
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchUser(token));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfcfb] via-[#e2d1c3] to-[#c9d6ff]">
      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2a2a2a] mb-2">
            Discover People
          </h1>
          <p className="text-gray-600">
            Connect with people around the world and grow your network.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative bg-[#f9f7f6] border border-gray-400/40 rounded-xl shadow-lg hover:shadow-xl transition p-4 flex items-center">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 hover:text-gray-700" />
            <input
              type="text"
              placeholder="Search by name, username, bio, or location..."
              className="pl-12 w-full py-2 bg-transparent outline-none placeholder-gray-500 text-[#2a2a2a] rounded-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={handleSearch}
            />
          </div>
        </div>

        {/* User Cards */}
        <div className="flex flex-wrap gap-6">
          {users.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </div>

        {loading && <Loading height="60vh" />}
      </div>
    </div>
  );
};

export default Discover;

