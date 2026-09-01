import { db } from "../app.js";

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const created_by = req.userId;

    const [result] = await db.query("INSERT INTO projects (name, description, created_by) VALUES(?,?,?)", [name, description, created_by]);

    res.json({ success: true, message: "Project created successfully", projectId: result.insertId });
  }

  catch (err) {
    res.json({ success: false, message: err.message })
  }
};

// export const allProjects = async (req, res) => {
//   try {
//     const [result] = await db.query("SELECT * FROM projects");
//     res.json({ success: true, projects: result });
//   }

//   catch (err) {
//     res.json({ success: false, message: err.message });
//   }
// };
export const allProjects = async (req, res) => {
    try {

        const [projects] = await db.query(`
            SELECT 
                p.id,
                p.name,
                p.description,
                COUNT(t.id) AS task_count
            FROM projects p
            LEFT JOIN tasks t
                ON p.id = t.project_id
            GROUP BY 
                p.id,
                p.name,
                p.description
            ORDER BY p.id DESC
        `);

        return res.status(200).json({
            success: true,
            projects
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};
export const editProject = async (req,res) => {
 try{
    const { id } = req.params;
  const { name, description } = req.body;

  const [result] = await db.query("UPDATE projects SET name=?, description=? WHERE id=?", [name, description, id]);
  
  if (result.affectedRows == 0) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  };
  console.log("result", result);

   return res.status(200).json({
      success: true,
      message: "Project updated successfully"
    });
 }

 catch(err){
  res.json({success:false, message:err.message});
 }
};

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "DELETE FROM projects WHERE id=?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        const [projects] = await db.query(
            "SELECT * FROM projects"
        );

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            projects
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};