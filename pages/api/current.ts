import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
req:NextApiRequest,
res:NextApiResponse
)
{
  if(req.method !== 'GET'){

    return res.status(405).end();
  }

  try {
    const {currentUser} = await serverAuth(req);
    return res.status(200).json(currentUser);
    
  } catch (error) {
    console.log(error);
    res.status(400).end(); 
        
  }
 
}
// gets current session of user via serverAuth route 
// and check if user is logged in and then returns the user all by the GET request made here