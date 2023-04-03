import React from 'react'
import { IconType } from 'react-icons';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import {BsDot} from 'react-icons/bs';



import useLoginModel from '@/hooks/useLoginModel';
import useCurrentUser from '@/hooks/useCurrentUser';



interface SideBarItemProps{
	label: string;
	href?:string;
	icon:IconType;
	onClick?: ()=>void;
	auth? : boolean;
	alert?: boolean; 
}

const SideBarItem:React.FC<SideBarItemProps> = ({
	label,
	href,
	icon:Icon,
	onClick,
	auth,
	alert
}) => {
	const { data: currentUser } = useCurrentUser();

	const loginModel = useLoginModel();

	const router = useRouter();

	const handleClick = useCallback(() => {
		if(onClick){
			return onClick();
		} 
		
		if(auth && !currentUser){
			loginModel.onOpen();
		}
		else if(href){
			router.push(href);
		}

  },[onClick, router, href, auth, currentUser, loginModel]); 
	return (
		<div onClick={handleClick} className='flex flex-row items-center'>
			<div 
				className='
					relative
					rounded-full
					h-14
					w-14
					flex
					items-center
					justify-center
					p-4
					hover:bg-slate-300
					hover:bg-opacity-10
					cursor-pointer
					lg:hidden				
				'
			>
				<Icon size={28} color='white'/>
				{alert ? <BsDot className='text-sky-500 absolute -top-4 left-0' size={80}/> : null}
			</div>
			<div 
				className='
					relative
					hidden
					lg:flex
					items-center
					gap-4
					p-4
					rounded-full
					hover:bg-slate-300
					hover:bg-opacity-10
					cursor-pointer

				'		
			>
				<Icon size= {24} color="white" />
				<p className='hidden lg:block text-white text-xl'>
					{label}
				</p>
				{alert ? <BsDot className='text-sky-500 absolute -top-4 left-0' size={80}/> : null}
			</div>
		</div>
	)
}

export default SideBarItem