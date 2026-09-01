
import { db } from "../app.js";

export const addTask = async (req, res) => {
    try {

        const user = req.userId;

        const { project_id, title, description, status, priority, due_date, assigned_to } = req.body;

        if (!description || !title || !due_date) {
            return res.status(400).json({
                success: false,
                message: "Fileds are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO tasks
            (project_id, title, description, status, priority, due_date, assigned_to)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                project_id,
                title,
                description,
                status || "TODO",
                priority || "MEDIUM",
                due_date ,
                assigned_to || user
            ]
        );

        res.status(201).json({
            success: true,
            message: "Task added successfully",
            taskId: result.insertId
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const allTask = async (req, res) => {
    try {

        const [tasks] = await db.query(
            "SELECT * FROM tasks"
        );

        res.json({
            success: true,
            tasks
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

//selected
export const getAllTask = async (req, res) => {
    try {

        const { id } = req.params;

        const [tasks] = await db.query(
            "SELECT * FROM tasks WHERE project_id = ?",
            [id]
        );

        res.json({
            success: true,
            tasks: tasks
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        const [result] = await db.query(
            "DELETE FROM tasks WHERE id=?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        return res.json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

export const editTask = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            title,
            description,
            priority,
            status,
            due_date
        } = req.body;

        const [result] = await db.query(
            `UPDATE tasks
             SET title=?,
                 description=?,
                 priority=?,
                 status=?,
                 due_date=?
             WHERE id=?`,
            [
                title,
                description,
                priority,
                status,
                due_date,
                id
            ]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};