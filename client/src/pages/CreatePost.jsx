// import React from "react";
// import { dummyUserData } from "../assets/assets";
// import { Image, X } from "lucide-react";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { useAuth } from "@clerk/clerk-react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// const CreatePost = () => {

//   const navigate=useNavigate()
//   const { getToken } = useAuth();

//   const [content, setContent] = React.useState("");
//   const [images, setImages] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);

//   //const user = dummyUserData; // Replace with actual user data fetching logic
//   const user = useSelector((state) => state.user.value);

//   const handleSubmit = async (e) => {
//     if (!images.length && !content) {
//       return toast.error("Please add at least one image or text");
//     }
//       setLoading(true);

//       const postType =
//         images.length && content
//           ? "text_with_image"
//           : images.length
//           ? "image"
//           : "text";

//       try {
//         const formData = new FormData();
//         formData.append("content", content);
//         formData.append("post_type", postType);
//         images.map((image) => {
//           formData.append("images", image);
//         });

//         const { data } = await api.post("/api/post/add", formData, {
//           headers: {
//             Authorization: `Bearer ${await getToken()}`,
//           },
//         });

//         if(data.success){

//           navigate('/')

//         }
//         else{
//           console.log(data.message)
//           throw new Error(data.message)

//         }
//       } catch (error) {
//         console.log(error.message)
//           throw new Error(error.message)

//       }

    
//     setLoading(false);
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       <div className="max-w-6xl mx-auto p-6">
//         {/* Title */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900 mb-2">
//             Create Post
//           </h1>
//           <p className="text-slate-600">Share your thoughts with the world</p>
//         </div>

//         {/* form */}
//         <div className="max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4">
//           {/* Header */}
//           <div className="flex items-center gap-3">
//             {" "}
//             <img
//               src={user.profile_picture}
//               alt=""
//               className="w-12 h-12 rounded-full shadow"
//             />
//             <div>
//               <h2 className="font-semibold">{user.full_name}</h2>
//               <p className="text-sm text-gray-500">@{user.username}</p>
//             </div>
//           </div>

//           {/* Text Area */}
//           <textarea
//             className="w-full resize-none max-h-20 mt-4 text-sm outline-none placeholder-gray-400"
//             placeholder="What's happening?"
//             onChange={(e) => setContent(e.target.value)}
//             value={content}
//           />

//           {/* images */}
//           {images.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-4">
//               {images.map((image, i) => (
//                 <div key={i} className="relative group">
//                   <img
//                     src={URL.createObjectURL(image)}
//                     className="h-20 rounded-md"
//                     alt=""
//                   />
//                   <div
//                     onClick={() =>
//                       setImages(images.filter((_, index) => index !== i))
//                     }
//                     className="absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer"
//                   >
//                     <X className="w-6 h-6 text-white" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Add Images Button */}

//           <div className="flex items-center justify-between pt-3 border-t border-gray-300">
//             <label
//               htmlFor="images"
//               className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
//             >
//               <Image className="size-6" />
//             </label>

//             <input
//               type="file"
//               id="images"
//               accept="image/*"
//               hidden
//               multiple
//               onChange={(e) => setImages([...images, ...e.target.files])}
//             />

//             <button
//               disabled={loading}
//               onClick={() =>
//                 toast.promise(handleSubmit(), {
//                   loading: "uploading...",
//                   success: "Post created successfully!",
//                   error: "Failed to create post",
//                 })
//               }
//               className="text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active: scale-95 transition text-white font-medium px-8 py-2 rounded-md cursor-pointer"
//             >
//               Publish Post
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;
import React from "react";
import { Image, X } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [content, setContent] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const user = useSelector((state) => state.user.value);

  const handleSubmit = async () => {
    if (!images.length && !content) {
      return toast.error("Please add at least one image or text");
    }
    setLoading(true);

    const postType =
      images.length && content
        ? "text_with_image"
        : images.length
        ? "image"
        : "text";

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("post_type", postType);
      images.forEach((image) => formData.append("images", image));

      const { data } = await api.post("/api/post/add", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) navigate("/");
      else throw new Error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffaf0] via-[#fdf6e3] to-[#f0ebf8] flex items-center justify-center py-10">
      <div className="max-w-2xl w-full p-6">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Post</h1>
          <p className="text-gray-600">Share your thoughts with the world</p>
        </div>

        {/* Ultra Premium Form Card */}
        <div className="relative bg-white/50 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 transition-transform duration-300 hover:scale-105 hover:shadow-3xl">
          
          {/* Header */}
          <div className="flex items-center gap-4">
            <img
              src={user.profile_picture}
              alt=""
              className="w-14 h-14 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
            />
            <div>
              <h2 className="font-semibold text-gray-900 text-lg">{user.full_name}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            className="w-full resize-none max-h-28 mt-4 text-sm outline-none placeholder-gray-400 p-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-gradient-to-r focus:ring-from-[#7fd7d7] focus:ring-via-[#3bbfbf] focus:ring-to-[#2fa6a6] transition-all duration-300 bg-white/40 backdrop-blur-sm shadow-inner"
            placeholder="What's happening?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {images.map((image, i) => (
                <div
                  key={i}
                  className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="h-28 w-28 rounded-xl object-cover shadow-lg"
                  />
                  <div
                    onClick={() =>
                      setImages(images.filter((_, index) => index !== i))
                    }
                    className="absolute inset-0 hidden group-hover:flex justify-center items-center bg-black/40 rounded-xl transition-opacity duration-300"
                  >
                    <X className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/40">
            <label
              htmlFor="images"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition cursor-pointer"
            >
              <Image className="w-5 h-5" />
              Add Images
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              hidden
              multiple
              onChange={(e) => setImages([...images, ...e.target.files])}
            />

            <button
              disabled={loading}
              onClick={() =>
                toast.promise(handleSubmit(), {
                  loading: "Uploading...",
                  success: "Post created successfully!",
                  error: "Failed to create post",
                })
              }
              className="text-sm bg-gradient-to-r from-[#7fd7d7] via-[#3bbfbf] to-[#2fa6a6] hover:from-[#3bbfbf] hover:to-[#2fa6a6] active:scale-95 transition text-white font-semibold px-8 py-2 rounded-2xl shadow-lg hover:shadow-xl"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
