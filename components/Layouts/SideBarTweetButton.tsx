import { useRouter } from 'next/router'
import { FaFeather } from 'react-icons/fa'
import {  useCallback} from 'react'
import useLoginModel from '@/hooks/useLoginModel';

import { getSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';
// import {goToPost} from '../posts/PostItem'



const SideBarTweetButton = () => {
 const router = useRouter();
 const loginModel = useLoginModel();
 const { data: currentUser } = useCurrentUser();


//  const goToPost = useCallback(()=>{
// 	router.push(`/posts/${data.id}`);
// },[router, data.id]);  //Trying to add an onclick to the tweet button 
//that would eould direct user to login page if they are not logged in
// else direct them to tweet page
 
 

 const onClick = useCallback(async()=> {
	const currentUser = await getSession();
	try {
		if(!currentUser){
			loginModel.onOpen();
		};

		// if(currentUser){
		// 	goToPost
		// }
		
	} catch (error) {
		console.log(error);	
	}
	
	
 },[loginModel])

	
	return (
		<div onClick={onClick}>
			<div 
				className='
					mt-6
					lg-hidden
					rounded-full
					h-14
					w-14
					p-4
					items-center
					justify-center
					bg-sky-500
					hover:bg-opacity-80
					transition
					cursor-pointer

				'
			>
				<FaFeather size={24} color = 'white' />

			</div>
			<div 
				className='
					mt-6
					hidden
					lg:block
					px-4
					py-2
					rounded-full
					bg-sky-500
					hover:bg-opacity-90
					cursor-pointer
					transition

				'
			>
				<p 
					className='
						hidden 
						lg:block 
						text-center 
						font-semibold 
					text-white 
						text-[20px]
					'
				>
					Tweet
				</p>

			</div>

		</div>
	)
}

export default SideBarTweetButton