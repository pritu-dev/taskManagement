import express from "express";
const projectRouter = express.Router();
import { authUser} from "../middleware/authUser.js";

import { createProject, allProjects, editProject, deleteProject} from "../controllers/projectController.js";

projectRouter.post("/createproject", authUser, createProject);
projectRouter.get("/getAllProjects", authUser, allProjects)
projectRouter.post("/edit/:id", authUser, editProject);
projectRouter.post("/delete/:id", authUser, deleteProject);




export default projectRouter;