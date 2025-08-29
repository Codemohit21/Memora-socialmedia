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

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

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

  // 🔹 Skeleton loader while fetching posts
  if (loading) {
    return (
      <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
        <div>
          <StoriesBar loading={true} />
          <div className="p-4 space-y-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))}
          </div>
        </div>

        <div className="max-xl:hidden sticky top-0">
          <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
            <h3 className="text-slate-800 font-semibold">Sponsored</h3>
            <div className="w-75 h-50 bg-gray-200 animate-pulse rounded-md"></div>
            <p className="text-slate-600 animate-pulse h-3 w-3/4 bg-gray-300 rounded"></p>
            <p className="text-slate-400 animate-pulse h-3 w-full bg-gray-300 rounded"></p>
          </div>

          <RecentMessages loading={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      <div>
        <StoriesBar />
        <div className="p-4 space-y-6">
          {feeds.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      <div className="max-xl:hidden sticky top-0">
        <div className="max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow">
          <h3 className="text-slate-800 font-semibold">Sponsored</h3>
          <img
            src={assets.sponsored_img}
            className="w-75 h-50 rounded-md"
            alt=""
          />
          <p className="text-slate-600">Email marketing</p>
          <p className="text-slate-400">
            Supercharge your marketing with a powerful, easy-to-use platform
            built for results.
          </p>
        </div>

        <RecentMessages />
      </div>
    </div>
  );
};

export default Feed;
