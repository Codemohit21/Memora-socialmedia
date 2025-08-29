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
      <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8 bg-[#F4F4F6]">
        <div>
          <StoriesBar loading={true} />
          <div className="p-4 space-y-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gradient-to-r from-gray-100 to-gray-500 animate-pulse rounded-2xl shadow-sm"
              ></div>
            ))}
          </div>
        </div>

        <div className="max-xl:hidden sticky top-0">
          {/* Sponsored Skeleton */}
          <div className="max-w-xs bg-white p-4 rounded-2xl inline-flex flex-col gap-2 shadow-md">
            <h3 className="text-[#1F2937] font-semibold">Sponsored</h3>
            <div className="w-full h-48 bg-gray-300 animate-pulse rounded-xl"></div>
            <p className="text-[#4B5563] animate-pulse h-3 w-3/4 bg-gray-200 rounded"></p>
            <p className="text-[#6B7280] animate-pulse h-3 w-full bg-gray-200 rounded"></p>
          </div>

          <RecentMessages loading={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8 bg-[#F4F4F6]">
      <div>
        <StoriesBar />
        <div className="p-4 space-y-6">
          {feeds.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          ))}
        </div>
      </div>

      <div className="max-xl:hidden sticky top-0">
        {/* Sponsored Section */}
        <div className="max-w-xs bg-white p-4 rounded-2xl inline-flex flex-col gap-2 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-[#1F2937] font-semibold">Sponsored</h3>
          <img
            src={assets.sponsored_img}
            className="w-full h-48 object-cover rounded-xl"
            alt="sponsored"
          />
          <p className="text-[#4B5563] font-medium">Premium Clothing Brand</p>
          <p className="text-[#6B7280] text-sm leading-relaxed">
            ShopEase is a MERN-based e-commerce platform with product browsing, cart, orders, admin panel, and voice navigation for easy accessibility.
          </p>
        </div>

        <RecentMessages />
      </div>
    </div>
  );
};

export default Feed;

