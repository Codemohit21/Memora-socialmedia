// import fs from "fs";
// import imagekit from "../configs/imagekit.js";
// import Message from "../models/Message.js";


// // Create an empty object to store SS Event connections
// const connections = {};

// // Controller function for the SSE endpoint
// export const sseController = (req, res) => {
//   const { userId } = req.params;
//   console.log("New client connected : ", userId);

//   // Set SSE headers
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Add the client's response object to the connections object
//   connections[userId] = res;

//   // Send an initial event to the client
//   res.write("log: Connected to SSE stream\n\n");

//   // Handle client disconnection
//   req.on("close", () => {
//     // Remove the Iclient's response object from the connections arrayl

//     delete connections[userId];
//     console.log("client disconnected");
//   });
// };

// // send message

// export const sendMessage = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { to_user_id, text } = req.body;
//     const image = req.file;

//     let media_url = "";
//     let message_type = image ? "image" : "text";

//     if (message_type === "image") {
//       const fileBuffer = fs.readFileSync(image.path);
//       const response = await imagekit.upload({
//         file: fileBuffer,
//         fileName: image.originalname,
//       });
//       media_url = imagekit.url({
//         path: response.filePath,
//         transformation: [
//           { quality: "auto" },
//           { format: "webp" },
//           { width: "1280" },
//         ],
//       });
//     }

//     const message = await Message.create({
//       from_user_id: userId,
//       to_user_id,
//       text,
//       message_type,
//       media_url,
//     });

//     res.json({ success: true, message });

//     const messageWithUserData = await Message.findById(message._id).populate(
//       "from_user_id"
//     );

//     if (connections[to_user_id]) {
//       connections[to_user_id].write(
//         `data: ${JSON.stringify(messageWithUserData)}\n\n`
//       );
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // get messages

// export const getChatMessages = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { to_user_id } = req.body;

//     const messages = await Message.find({
//       $or: [
//         { from_user_id: userId, to_user_id },
//         { from_user_id: to_user_id, to_user_id: userId },
//       ],
//     }).sort({ created_at: -1 });
//     // mark messages as seen

//     await Message.updateMany(
//       { from_user_id: to_user_id, to_user_id: userId },
//       { seen: true }
//     );

//     res.json({ success: true, messages });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export const getUserRecentMessages = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const messages = await Message.find(
//       { to_user_id: userId }).populate("from_user_id to_user_id")
//     .sort({ created_at: -1 });

//     res.json({ success: true, messages });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Message from "../models/Message.js";

// Store multiple SSE connections per user
const connections = {};

// SSE controller
export const sseController = (req, res) => {
  const { userId } = req.params;
  console.log("New client connected:", userId);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Initialize array for multiple tabs
  if (!connections[userId]) connections[userId] = [];
  connections[userId].push(res);

  // Send initial connection event
  res.write("event: log\ndata: Connected to SSE stream\n\n");

  // Heartbeat every 20s to prevent timeout
  const heartbeat = setInterval(() => res.write(":\n\n"), 20000);

  req.on("close", () => {
    clearInterval(heartbeat);
    connections[userId] = connections[userId].filter((r) => r !== res);
    console.log("Client disconnected:", userId);
  });
};

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id, text } = req.body;
    const image = req.file;

    let media_url = "";
    let message_type = image ? "image" : "text";

    if (message_type === "image") {
      const fileBuffer = fs.readFileSync(image.path);
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: image.originalname,
      });
      media_url = imagekit.url({
        path: response.filePath,
        transformation: [{ quality: "auto" }, { format: "webp" }, { width: "1280" }],
      });
    }

    const message = await Message.create({
      from_user_id: userId,
      to_user_id,
      text,
      message_type,
      media_url,
    });

    res.json({ success: true, message });

    const messageWithUserData = await Message.findById(message._id).populate(
      "from_user_id"
    );

    // Send message to all connections of the recipient
    if (connections[to_user_id]) {
      connections[to_user_id].forEach((conn) => {
        conn.write(`data: ${JSON.stringify(messageWithUserData)}\n\n`);
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { to_user_id } = req.body;

    const messages = await Message.find({
      $or: [
        { from_user_id: userId, to_user_id },
        { from_user_id: to_user_id, to_user_id: userId },
      ],
    }).sort({ created_at: -1 });
    // mark messages as seen

    await Message.updateMany(
      { from_user_id: to_user_id, to_user_id: userId },
      { seen: true }
    );

    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserRecentMessages = async (req, res) => {
  try {
    const { userId } = req.auth();
    const messages = await Message.find(
      { to_user_id: userId }).populate("from_user_id to_user_id")
    .sort({ created_at: -1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};