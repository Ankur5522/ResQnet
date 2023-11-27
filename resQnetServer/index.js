import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import { getNameByUserId } from "./controllers/user.js";
import { getUserIdByEmail } from "./controllers/user.js";
import chatroute from "./Routes/chatRoute.js";
import messageroute from "./Routes/messageRoute.js";
import { continueSignup, login, signupOrganisation, signupUser } from "./controllers/user.js";


const app = express()
dotenv.config()

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors())

const router = express.Router()

router.post('/login', login);
router.post('/continue', continueSignup);
router.post('/signup/user',signupUser)
router.post('/signup/organisation',signupOrganisation)

app.use('/user', router);

const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message))

    app.get("/resQnetServer/byUserId/:_id", async (req, res) => {
        try {
          const { _id } = req.params;
      
          if (!_id) {
            console.error("Received request without _id");
            return res.status(400).json({ error: "Invalid request" });
          }
      
          const user = await User.findOne({ _id });
      
          if (!user) {
            console.error("User not found for _id:", _id);
            return res.status(404).json({ error: "User not found" });
          }
      
          const username = user.name;
          return res.status(200).json({ username });
        } catch (error) {
          console.error("Error in /byUserId route:", error);
          return res.status(500).json({ error: "Internal server error" });
        }
      });
      
router.get('/getNameByUserId/:_id', getNameByUserId);
router.get('/getUserIdByEmail/:email', getUserIdByEmail);

app.use("/resQnetServer/chats",chatroute);
app.use("/resQnetServer/messages",messageroute);