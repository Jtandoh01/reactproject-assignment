import { useCallback, useMemo } from "react";
import toast from 'react-hot-toast';
import axios from "axios";


import useLoginModel from "./useLoginModel";
import useCurrentUser from "./useCurrentUser"
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId } : { postId:string, userId?:string })=>{

	const {data: currentUser } = useCurrentUser();

	const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);

	const {mutate:mutateFetchedPosts } = usePosts(userId);

	const loginModal = useLoginModel();

	const hasLiked = useMemo(() => {
		const list = fetchedPost?.likeIds || [];
		return list.includes((currentUser?.id))
		//appending users to list tweet likes when they click like
	},[fetchedPost?.likeIds, currentUser?.id])

	const toggleLike = useCallback( async() =>{
		if(!currentUser){
			return loginModal.onOpen();
		}
		
		try {
			let request;
			if(hasLiked){
				request = () => axios.delete('/api/like', { data: {postId} });
			}

			else{
				request = () => axios.post('/api/like', { postId });
			}

			await request();
			mutateFetchedPost();
			mutateFetchedPosts();

			toast.success('yesssss!');

			
		} catch (error) {
			toast.error('Nooooo!');
			
		}


	},[
		currentUser, 
		loginModal, 
		hasLiked, 
		postId, 
		mutateFetchedPost, 
		mutateFetchedPosts
	]);

	return {
		hasLiked,
		toggleLike
	}

};

export default useLike;