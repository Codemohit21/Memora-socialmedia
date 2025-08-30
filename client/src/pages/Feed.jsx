// import React, { useEffect, useState } from "react";
// import { assets, dummyPostsData } from "../assets/assets";
// import Loading from "../components/Loading";
// import StoriesBar from "../components/StoriesBar";
// import PostCard from "../components/PostCard";
// import RecentMessages from "../components/RecentMessages";
// import { useAuth } from "@clerk/clerk-react";
// import api from "../api/axios";
// const Feed = () => {
//   const [feeds, setFeeds] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { getToken } = useAuth();

//   // const fetchFeeds = async () => {
//   //   console.log(dummyPostsData);

//   //   // Fetch feeds from an API or database
//   //   setFeeds(dummyPostsData);

//   //     setLoading(false);
//   // };
//   const fetchFeeds = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/api/post/feed", {
//         headers: { Authorization: `Bearer ${await getToken()}` },
//       });

//       if (data.success) {
//         setFeeds(data.posts);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//     setLoading(false)
//   };

//   useEffect(() => {
//     fetchFeeds();
//   }, []);
//   return !loading ? (
//     <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
//       {/* stories and posts */}
//       <div>
//         <StoriesBar />
//         <div className="p-4 space-y-6">
//           {feeds.map((post) => (
//             <PostCard key={post._id} post={post} />
//           ))}
//         </div>
//       </div>

//       {/* right Sidebar */}
//       <div className="max-xl:hidden sticky top-0">
//         <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
//           <h3 className="text-slate-800 font-semibold">Sponsored</h3>
//           <img
//             src={assets.sponsored_img}
//             className="w-75 h-50 rounded-md"
//             alt=""
//           />
//           <p className="text-slate-600">Email marketing</p>
//           <p className="text-slate-400">
//             Supercharge your marketing with a powerful, easy-to-use platform
//             built for results .
//           </p>
//         </div>

//         <RecentMessages />
//       </div>
//     </div>
//   ) : (
//     <Loading height="100vh" />
//   );
// };

// export default Feed;
import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import StoriesBar from "../components/StoriesBar";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const navigate = useNavigate();
  const { connections } = useSelector((state) => state.connections);

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await api.get("/api/post/feed", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setFeeds(data.posts);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const bgGradient = "bg-gradient-to-b from-[#fdfcfb] via-[#e2d1c3] to-[#c9d6ff]";

  return (
    <div className={`h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8 ${bgGradient}`}>
      
      {/* Middle Feed Column */}
      <div className="flex-1 max-w-3xl">
        <StoriesBar />
        <div className="p-4 space-y-6">
          {loading
            ? [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-gray-200/70 animate-pulse rounded-2xl shadow-lg"
                ></div>
              ))
            : feeds.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="max-xl:hidden sticky top-0 flex flex-col gap-6 w-80">
        
        {/* Recent Messages */}
        <RecentMessages />

        {/* Connections */}
        <div className="p-4 rounded-2xl shadow-lg
          bg-gradient-to-b from-[#fff9e6] via-[#fff2c2] to-[#ffec99]
          border border-yellow-200"
        >
          <h3 className="text-gray-800 font-semibold mb-4 text-lg">Connections</h3>
          <div className="flex flex-col gap-3 max-h-80 overflow-y-auto no-scrollbar">
            {connections.length === 0 && (
              <p className="text-gray-500 text-sm">No connections yet</p>
            )}
            {connections.map((user) => (
              <div
                key={user._id}
                onClick={() => navigate(`/profile/${user._id}`)}
                className={`flex items-center gap-4 p-3 rounded-2xl shadow-md
                  bg-gradient-to-r from-[#E6E6FA] to-[#D8BFD8] hover:scale-105 hover:shadow-lg transition-transform duration-200 cursor-pointer w-full`}
              >
                <img
                  src={user.profile_picture}
                  alt={user.full_name}
                  className="w-12 h-12 rounded-full object-cover shadow-md flex-shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <p className="text-gray-900 font-medium truncate">{user.full_name}</p>
                  <p className="text-gray-600 text-sm truncate">@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Feed;
