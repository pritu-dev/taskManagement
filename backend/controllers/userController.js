import { db} from "../app.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req,res) => {
  const { email, password} = req.body;

  const [result] = await db.query("SELECT * FROM users WHERE email= ?", [email]);

  if(result.length == 0){
    return res.json({success:false, message: "User not Register"});
  }

  const isMatched = await bcrypt.compare(password, result[0].password);

  if(isMatched){
    const token = jwt.sign({ id: result[0].id}, process.env.JWT_SCREAT);
    return res.json({ success:true, message:"User Login Successfully!", token:token});
  }
  res.json({success:false, message: "Invalid Credentials"});
}