import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is missing from .env file");
  }

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection failed", err);
  });

  await mongoose.connect(`${process.env.MONGODB_URL}/ecommerce-app`);
};

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

// import mongoose from "mongoose";

// // buildUri: append DB only when not present, strip surrounding quotes
// const buildUri = (envUri, dbName = "ecommerce-app") => {
//   if (!envUri) return null;
//   envUri = envUri.replace(/^"(.*)"$/, "$1");
//   const pathPart = envUri.split("://")[1] || "";
//   const hasDb = /\/[^/?]+/.test(pathPart);
//   if (hasDb) return envUri;
//   envUri = envUri.replace(/\/+$/, "");
//   return `${envUri}/${dbName}?retryWrites=true&w=majority`;
// };

// const connectDB = async (opts = {}) => {
//   const raw = process.env.MONGODB_URL;
//   const rawFallback = process.env.MONGODB_URL_FALLBACK || "";
//   const uri = buildUri(raw, opts.dbName);
//   const fallbackUri = buildUri(rawFallback, opts.dbName);

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
//   mongoose.connection.on("error", (err) => {
//     console.error("MongoDB connection error:", err && err.message ? err.message : err);
//   });

//   const connectOptions = {
//     // Mongoose v7 uses recommended defaults; include only supported options
//     serverSelectionTimeoutMS: 30000,
//     connectTimeoutMS: 15000,
//   };

//   const urisToTry = [uri];
//   if (fallbackUri && fallbackUri !== uri) urisToTry.push(fallbackUri);

//   for (const tryUri of urisToTry) {
//     const maxAttempts = opts.retries ?? 5;
//     for (let attempt = 1; attempt <= maxAttempts; attempt++) {
//       try {
//         console.log(`MongoDB connecting (attempt ${attempt}) to: ${tryUri.split("?")[0]}`);
//         await mongoose.connect(tryUri, connectOptions);
//         return;
//       } catch (err) {
//         const msg = err && err.message ? err.message : String(err);
//         console.error(`MongoDB connect attempt ${attempt} failed:`, msg);
//         // If SRV/TXT DNS timeout and fallback exists, try fallback immediately
//         if (fallbackUri && /querySrv|queryTxt|ETIMEDOUT|ETIMEOUT/i.test(msg)) {
//           console.warn("Detected SRV/TXT DNS issue — switching to fallback URI (non-SRV) if configured");
//           break; // break inner loop -> outer loop will try next URI
//         }
//         if (attempt < maxAttempts) {
//           await new Promise((r) => setTimeout(r, 3000));
//         } else {
//           // if last attempt for this URI, let outer loop proceed (or rethrow if this was last URI)
//           if (tryUri === urisToTry[urisToTry.length - 1]) throw err;
//         }
//       }
//     }
//   }
// };

// export default connectDB;
