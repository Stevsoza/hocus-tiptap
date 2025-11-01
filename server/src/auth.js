import "dotenv/config"
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cors from "cors";
import { GridFSBucket, ObjectId, MongoClient } from "mongodb";
import formidable from "formidable";


const app = express();

// MongoDB connection
const mongoUrl = process.env.MONGO_URL;
const dbName = 'fileStorage';
let db, bucket;

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(dbName);
    bucket = new GridFSBucket(db, { bucketName: 'uploads' });
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: ".stevsoza.com", // frontend React
  credentials: true // permite enviar cookies
}));

app.use(session({
  secret: "clave_super_secreta",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: "lax", domain: ".stevsoza.com" } // true si usas HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.HOSTAPP + "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // Aquí podrías guardar el usuario en la base de datos
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));



// --- rutas
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",

  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // console.log("✅ Session created:", req.sessionID);
    // console.log("✅ User:", req.user);
    // Redirige al frontend con éxito
    res.redirect(process.env.HOSTAPP);
  }
);

app.get("/api/user", (req, res) => {
  console.log("Session ID:", req.sessionID);
  console.log("Authenticated:", req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "No autenticado" });
  }
});


app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/"));
});

app.post("/document/create", (req, res) => {
  console.log("Documento creado:", req.body);
  res.json({ message: "Documento creado" });
});


// POST endpoint to upload file
app.post('/api/image', async (req, res) => {
  if (!bucket) {
    return res.status(503).json({ error: 'Database not ready. Please try again.' });
  }

  let uploadStream;
  let filename;
  let mimetype;

  const form = formidable({
    multiples: false,
    // Provide a custom file writer that streams directly to GridFS
    fileWriteStreamHandler: (file) => {
      filename = file.originalFilename || file.newFilename;
      mimetype = file.mimetype;
      
      uploadStream = bucket.openUploadStream(filename, {
        contentType: mimetype,
        metadata: {
          uploadDate: new Date()
        }
      });

      return uploadStream;
    }
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form', details: err.message });
    }

    if (!uploadStream || !uploadStream.id) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/api/file/${uploadStream.id}`;
    res.status(201).json({
      message: 'File uploaded successfully',
      fileId: uploadStream.id,
      filename: filename,
      url: fileUrl
    });
  });
});


// GET endpoint to retrieve file
app.get('/api/file/:id', async (req, res) => {
  if (!bucket || !db) {
    return res.status(503).json({ error: 'Database not ready. Please try again.' });
  }

  try {
    const fileId = new ObjectId(req.params.id);

    const files = await db.collection('uploads.files').findOne({ _id: fileId });
    
    if (!files) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.set('Content-Type', files.contentType);
    res.set('Content-Disposition', `inline; filename="${files.filename}"`);

    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);

    downloadStream.on('error', (error) => {
      res.status(500).json({ error: 'Error retrieving file', details: error.message });
    });

  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

app.listen(process.env.APIPORT, () => console.log("Backend en " + process.env.APIPORT));
