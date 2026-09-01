import React, { useState } from 'react';
import { createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendURL = "http://localhost:8080";
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const [projectData, setProjectData] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [allTasks, setAllTask] = useState([]);

    const getProjectData = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/project/getAllProjects`, { headers: { token } });

            if (data.success) {
                setProjectData(data.projects);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };

    //single task
    const getTasks = async (projectId) => {
    try {

        const { data } = await axios.get(
            `${backendURL}/api/task/getAllTask/${projectId}`,
            {
                headers: { token }
            }
        );

        if (data.success) {
            setTasks(data.tasks);
        } else {
            toast.error(data.message);
        }

    } catch (err) {
        toast.error(err.message);
    }
};

//All task
const getAllTasks = async () => {
    try {

        const { data } = await axios.get(
            `${backendURL}/api/task/getAllTask`,
            {
                headers: { token }
            }
        );

        if (data.success) {
            setAllTask(data.tasks);
        } else {
            toast.error(data.message);
        }

    } catch (err) {
        toast.error(err.message);
    }
};


    const value = {
        backendURL,
        token,
        setToken,
        projectData,
        getProjectData,
        getAllTasks,
        getTasks,
        tasks,
        allTasks,
        
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;
