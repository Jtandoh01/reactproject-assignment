import useCurrentUser from "@/hooks/useCurrentUser"
import useEditModel from "@/hooks/useEditModel";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";


const EditModel = () => {
	const { data: currentUser} = useCurrentUser();
	const { mutate: mutateFetchedUser} = useUser(currentUser?.id);
	const editModel = useEditModel();

	//setting declaring 
	const [profileImage, setProfileImage]= useState('');
	const [coverImage, setCoverImage]= useState('');
	const [name, setName]= useState('');
	const [username, setUserName]= useState('');
	const [bio, setBio]= useState('');

	//assigning states
	useEffect(()=>{
		setProfileImage(currentUser?.profileImage);
		setCoverImage(currentUser?.coverImage);
		setName(currentUser?.name);
		setUserName(currentUser?.username);
		setBio(currentUser?.bio);

	},[
		currentUser?.profileImage,
		currentUser?.coverImage,
		currentUser?.name,
		currentUser?.username,
		currentUser?.bio
	]);

	const [isLoading, setIsLoading]= useState(false);
	const onSubmit = useCallback( async() => {
		try {
			setIsLoading(true);
			await axios.patch('/api/edit',{
				name,
				username,
				bio,
				profileImage,
				coverImage,
			});
			mutateFetchedUser();

			toast.success('Profile updated successfully');

			editModel.onClose();
			
		} catch (error) {
			toast.error('Opps! something went wrong');
		}
		finally{
			setIsLoading(false);
		}

	},[name, username,bio, profileImage, coverImage, editModel, mutateFetchedUser ]);

	//creating body of the edit model
	const bodyContent = (
		<div className="flex flex-col gap-4 cursor-pointer">
			<ImageUpload
				value={profileImage}
				disabled={isLoading}
				onChange={(image) => setProfileImage(image)}
				label='Upload profile image'

			/>
			<ImageUpload
				value={coverImage}
				disabled={isLoading}
				onChange={(image) => setCoverImage(image)}
				label='Upload cover image'

			/>


			<Input
				placeholder="Name"
				onChange={(e) => setName(e.target.value)}
				value = {name}
				disabled = {isLoading}
			/>
			<Input
				placeholder="Username"
				onChange={(e) => setUserName(e.target.value)}
				value = {username}
				disabled = {isLoading}
			/>
			<Input
				placeholder="Bio"
				onChange={(e) => setBio(e.target.value)}
				value = {bio}
				disabled = {isLoading}
			/>

		</div>
	);

	return (
		
		<Modal 
			disabled={isLoading}
			isOpen={editModel.isOpen}
			title= 'Edit profile'
			actionLable="Save"
			onClose={editModel.onClose}
			onSubmit={onSubmit}
			body={bodyContent}
		/>
	)
}

export default EditModel