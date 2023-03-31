
import axios from 'axios';
import { useCallback, useState } from "react";
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';


import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModel from "@/hooks/useRegisterModel";


import Input from "../Input";
import Modal from "../Modal";


const RegisterModel = () => {
  const loginModel= useLoginModel();
  const registerModel = useRegisterModel(); 

  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [name, setName]= useState('');
  const [username, setUserName]= useState('');

  const [isLoading, setIsLoading]= useState(false);

	//switch between login
  const onToggle = useCallback(()=>{
   if(isLoading){
      return;
   }
   registerModel.onClose();
   loginModel.onOpen();

  }, [isLoading,registerModel,loginModel]);


  const onSubmit = useCallback(async ()=>{
    try{
			setIsLoading(true);

			await axios.post('/api/register', {
				email,
				password,
				username,
				name,
			});

			setIsLoading(false)

			toast.success('Account created. Congrats!!');

			await signIn('credentials', {
				email,
				password
			});

			registerModel.onClose();     

		}
		catch(error){
			console.log(error);
			toast.error('Opps! Something went wrong! ');
		}
		finally{
			setIsLoading(false);
		}

  }, [ email, password, registerModel, username, name]); 



  const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input
				disabled= {isLoading}
				placeholder="Name"
				onChange={(e)=> setName (e.target.value)}
				value= {name}


			/>
			<Input
				disabled= {isLoading}
				placeholder="Email"
				onChange={(e)=> setEmail (e.target.value)}
				value= {email}


			/>
			<Input
				disabled= {isLoading}
				placeholder="Username"
				onChange={(e)=> setUserName (e.target.value)}
				value= {username}


			/>
			<Input
				disabled= {isLoading}
				placeholder="Password"
				type='password'
				onChange={(e)=> setPassword (e.target.value)}
				value= {password}


			/>
		</div>
  )

  const footerContent = (
		<div className="text-neutral-400 text-center mt-4">
				<p>
					Already have an account?
					<span
						onClick={onToggle} 
						className="
							cursor-pointer 
							text-white 
							hover:underline
					  "         
					>
						Sign in
					</span>
				</p>
		</div>
  )
  return (
    <Modal
			disabled={isLoading}
			isOpen ={registerModel.isOpen}
			title = 'Create new account'
			actionLable="Sign up"
			onClose={registerModel.onClose}
			onSubmit= {onSubmit} 
			body={bodyContent}
			footer={footerContent}

    />
  );
}

export default RegisterModel;