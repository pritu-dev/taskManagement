import express from "express";
 const taskRouter = express.Router();
import { authUser} from "../middleware/authUser.js";
import { addTask, allTask, getAllTask, deleteTask, editTask} from "../controllers/taskController.js";

taskRouter.post("/addTask", authUser, addTask);
taskRouter.get("/getAllTask", authUser, allTask);
taskRouter.get("/getAllTask/:id", authUser, getAllTask);
taskRouter.post("/delete/:id", authUser, deleteTask);
taskRouter.post( "/edit/:id",  authUser,editTask);
   
  
    





export default taskRouter;