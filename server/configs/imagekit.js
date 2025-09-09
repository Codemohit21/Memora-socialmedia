// import ImageKit from "imagekit";
// import dotenv from "dotenv";
// dotenv.config();


// var imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,
// });
// export default imagekit;


// SDK initialization

// var ImageKit = require("imagekit");
import ImageKit from "imagekit";

var imagekit = new ImageKit({
    
    publicKey: 'public_+8ZiurdqlAfYQG4R8G8T7mAimfE=',
    privateKey: 'private_0sav+7A6UTvG1hFy5JDFyZI0nOg=',
    urlEndpoint: 'https://ik.imagekit.io/xiwgtjkp4'
});

export default imagekit;
