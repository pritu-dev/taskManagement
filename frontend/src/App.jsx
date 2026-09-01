import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Login from "./components/user/Login.jsx";
import Dashboard from "./components/project/Dashboard.jsx";
import CreateProject from "./components/project/CreateProject.jsx";
import EditProject from "./components/project/EditProject.jsx";
import DeleteProject from "./components/project/DeleteProject.jsx";
import ProjectDetails from "./components/project/ProjectDetails.jsx";
import TaskCreate from "./components/task/TaskCreate.jsx";
import EditTask from "./components/task/EditTask.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/createproject" element={<CreateProject/>}></Route>
        <Route path="/projectdetails/:id" element={<ProjectDetails/>}></Route>
        <Route path="/editProject/:id" element={<EditProject/>}></Route>
        <Route path="/deleteproject/:id" element={<DeleteProject/>}></Route>
        <Route path="/taskcreate/:id" element={<TaskCreate/>}></Route>
        <Route path="/edittask/:id"   element={<EditTask />}/>
        <Route path="/deletetask" element={<TaskCreate/>}></Route>
      </Routes>
      <ToastContainer position="top-right" />
    </>
  )
}

export default App
