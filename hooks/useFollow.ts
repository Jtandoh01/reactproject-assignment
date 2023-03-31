import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useUser from "./useUser";
import useLoginModel from "./useLoginModel";
import { toast } from "react-hot-toast";
import axios from "axios";
const UseFollow = (userId: string)=>{
	const { data: currentUser, mutate:mutateCurrentUser}= useCurrentUser();

	const { mutate: mutateFetchedUser } = useUser(userId);

	const loginModal = useLoginModel();

	const isFollowing = useMemo(()=>{
		const list = currentUser?.followingIds || [];

		return list.includes(userId);
	},[userId ,currentUser?.followingIds]);

	const toggleFollow = useCallback(async()=>{
		if(!currentUser){
			return loginModal.onOpen()
		}
		try {
			let request;
			if(isFollowing){
				request = () => axios.delete('/api/follow', {data: {userId} });
			}
			else{
				request = ()=> axios.post('/api/follow', {userId});
			}
			await request();

			mutateCurrentUser();
			mutateFetchedUser();
			toast.success('success');
			
		} catch (error) {
			toast.error('Something went wrong');
			
		}
	},[
		loginModal, 
		currentUser, 
		isFollowing, 
		userId, 
		mutateCurrentUser, 
		mutateFetchedUser
	 ]);
	return {
		isFollowing,
		toggleFollow
	}
}

export default UseFollow;