import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";


import useRegisterModel from "@/hooks/useRegisterModel";
import useLoginModel from "@/hooks/useLoginModel";


import Modal from "../Modal";
import Input from "../Input";



const LoginModel = () => {
  const loginModel= useLoginModel();
  const registerModel = useRegisterModel();
  
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');

  const [isLoading, setIsLoading]= useState(false);

  
  const onSubmit = useCallback(async ()=>{
		try{
			setIsLoading(true);

			await signIn('credentials', {
				email,
				password
			}) ;

			toast.success('Logged in')

			loginModel.onClose();

		}
		catch(error){
			toast.error('Something went wrong');
		}
		finally{
			setIsLoading(false);
		}

	}, [email, password, loginModel]);

	
  const onToggle = useCallback(()=>{
		registerModel.onOpen();
		loginModel.onClose();
 
	}, [loginModel, registerModel]);



  const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input
				disabled= {isLoading}
				placeholder="Email"
				onChange={(e)=> setEmail(e.target.value)}
				value= {email}

			/>
			<Input
				disabled= {isLoading}
				placeholder="Password"
				type="password"
				onChange={(e)=> setPassword(e.target.value)}
				value= {password}
			/>
		</div>
	)

  const footerContent = (
   <div className="text-neutral-400 text-center mt-4">
      <p>
				New to Tuitta?
				<span
					onClick={onToggle} 
					className="
					cursor-pointer 
					text-white 
					hover:underline
				"        
				>
					Create account
				</span>
      </p>
    </div>
	)
  return (
		<Modal
			disabled={isLoading}
			isOpen ={loginModel.isOpen}
			title = 'Sign in page'
			actionLable="Login" 
			onClose={loginModel.onClose}
			onSubmit={onSubmit}
			body={bodyContent}
			footer={footerContent}

		/>
  );   
}

export default LoginModel;