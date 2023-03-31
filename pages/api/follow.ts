import serverAuth from "@/libs/serverAuth";
import prisma from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req:NextApiRequest,
	res:NextApiResponse
){
	if (req.method !== 'POST' && req.method !== 'DELETE'){
		return res.status(405).end();
	}
	try {
		const { userId }= req.body;

		const {currentUser} = await serverAuth(req);

		if(!userId || typeof userId !== 'string' ){
			throw new Error('Invalid User ID')
		}
		const user = await prisma?.user.findUnique({
			where:{
				id:userId,
			}
			
		});
		if(!user){
			throw new Error('Inavlid ID');
		}

		let updatedFollowingIds = [... (user.followingIds || [])];
		if(req.method === 'POST'){

			try {
				await prisma.notification.create({
					data:{
						body: 'You got a follow',
						userId: userId
					}
				});
				await prisma.user.update({
					where:{
						id: userId
					},
					data:{
						hasNotifications: true
					}
				})
				
			} catch (error) {
				console.log(error);
				
			}
			updatedFollowingIds.push(userId);
		}

		if(req.method === 'DELETE'){
			updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId)
		}

		const updatedUser = await prisma.user.update({
			where:{
				id:currentUser.id
			},
			data:{
				followingIds:updatedFollowingIds
			}
		});
		return res.status(200).json(updatedUser);

		
	} catch (error) {
		console.log(error);
		return res.status(400).end();		
		
	}
}