import mongoose from "mongoose";

const connectDB=async ()=>{

    mongoose.connection.on("connected",()=>{
        console.log("MongoDB connected successfully");
    })

    mongoose.connection.on("error",(err)=>{
        console.log("MongoDB connection failed", err);
    })

    await mongoose.connect(`${process.env.MONGODB_URL}/ecommerce-app`)
}

export default connectDB;

// import mongoose from "mongoose";

// const buildUri = (envUri, dbName = "ecommerce-app") => {
//   if (!envUri) return null;
//   // remove enclosing quotes if present
//   envUri = envUri.replace(/^"(.*)"$/, "$1");

//   // If a DB name is already present in the URI (e.g. .../dbname or mongodb+srv://.../dbname?...)
//   // don't append another DB name.
//   const pathPart = envUri.split("://")[1] || "";
//   // detect presence of slash after host (hostname/... or host1,host2/...)
//   const hasDb = /\/[^/?]+/.test(pathPart);

//   if (hasDb) return envUri;
//   // ensure no trailing slash
//   envUri = envUri.replace(/\/+$/, "");
//   // append db name and safe defaults for Atlas
//   return `${envUri}/${dbName}?retryWrites=true&w=majority`;
// };

// const connectDB = async (opts = {}) => {
//   const raw = process.env.MONGODB_URL;
//   const uri = buildUri(raw, opts.dbName);

//   if (!uri) {
//     console.error("MONGODB_URL not set in .env");
//     throw new Error("MONGODB_URL missing");
//   }

//   mongoose.connection.on("connected", () => {
//     console.log("MongoDB connected successfully");
//   });

//   mongoose.connection.on("disconnected", () => {
//     console.warn("MongoDB disconnected");
//   });

//   // ...existing code...
//   mongoose.connection.on("error", (err) => {
//     console.error("MongoDB connection error:", err && err.message ? err.message : err);
//   });

//   // changed code: define connectOptions here (function scope)
//   const connectOptions = {
//     serverSelectionTimeoutMS: 20000,
//     connectTimeoutMS: 10000,
//   };

//   // retry loop (simple)
//   const maxAttempts = opts.retries ?? 5;
//   for (let attempt = 1; attempt <= maxAttempts; attempt++) {
//     try {
//       console.log(`MongoDB connecting (attempt ${attempt}) to: ${uri.split("?")[0]}`);
//       await mongoose.connect(uri, connectOptions);
//       return; // success
//     } catch (err) {
//       console.error(`MongoDB connect attempt ${attempt} failed:`, err && err.message ? err.message : err);
//       if (attempt < maxAttempts) {
//         await new Promise((r) => setTimeout(r, 3000));
//         continue;
//       }
//       throw err;
//     }
//   }
// // ...existing code...
// };

// export default connectDB;