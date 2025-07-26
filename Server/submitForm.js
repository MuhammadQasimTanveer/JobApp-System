"use server"
import { db } from "./db";

export const submitAction = async(prevState,e) =>
{
  //e.entries() gives key-value pairs from form
  //Object.fromEntries(...) converts key-value pairs into a plain JS object
  const {Fullname,Email,Phone,Position,ExpYears} = Object.fromEntries(e.entries());
  console.log("User Data:", Fullname,Email,Phone,Position,ExpYears);

  try 
  {
    const query = "Insert INTO applications (Fullname,Email,Phone,Position,ExpYears) Values (?,?,?,?,?)";
    const [data] = await db.query(query, [Fullname,Email,Phone,Position,ExpYears]);
    console.log("Successfully Registered", data);

    return { message:"Registration successful!", success: true };
  } 
  catch (error) {
    console.log("Error Occured:",error);
    // Handle specific MySQL errors
    if (error.code === 'ER_DUP_ENTRY') 
    {
      return { message:"Email already exists!", success: false };
    }
    return { message:"Registration failed! Plz try again later.", success: false };
  }
}