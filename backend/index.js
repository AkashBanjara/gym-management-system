require("dotenv").config();
const express = require("express");
const DBConnect = require("./DBConnect");
const gymRoutes = require("./routes/gym");
const membershipRoutes = require("./routes/membership");
const memberRoutes = require("./routes/member");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 3000;

// const __dirname = path.resolve()

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(cookieParser());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send({ message: "Congrats your server is running aakash" });
// });

app.use("/auth", gymRoutes);
app.use("/plans", membershipRoutes);
app.use("/members", memberRoutes);

app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("*",(_,res)=>{
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
})

app.get("/test", (req,res)=>{
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})

DBConnect();
app.listen(PORT, () => {
  console.log(`Server  is listening on port http://localhost:${PORT}`);
});
