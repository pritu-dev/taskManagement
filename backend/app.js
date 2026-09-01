import express from "express";
import mysql2 from "mysql2/promise";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());
import userRouter from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRouter from "./routes/taskRoutes.js";

// "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const db =await mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mysql@123',
  database: 'taskflow_db'
});

app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRouter);



// const insertion = async () => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashPass = await  bcrypt.hash("admin12356", salt);
//     const val = ["admin123456@gmail.com", hashPass];

//     const [result] = await db.query(
//     "INSERT INTO users (email, password) VALUES (?, ?)", val);

//     if(result.length != 0){
//       const token = jwt.sign({ id: result.insetId}, process.env.JWT_SCREAT);
//       console.log(token);
//     }
//     else{
//       console.log(err);
//     }

//   } catch (err) {
//     console.log(err.message);
//   }
// };

// await insertion();

app.listen("8080", () => {
  console.log("Server is Started on 8080");
})