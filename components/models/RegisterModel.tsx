// Importing required dependencies
import axios from 'axios';
import { useCallback, useState } from "react";
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

// Importing custom hooks
import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModel from "@/hooks/useRegisterModel";

// Importing components
import Input from "../Input";
import Modal from "../Modal";

// Defining the RegisterModel component
const RegisterModel = () => {
// Initializing custom hooks
const loginModel = useLoginModel();
const registerModel = useRegisterModel();

// Initializing state variables
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState('');
const [username, setUserName] = useState('');
const [isLoading, setIsLoading] = useState(false);

// Defining function to toggle between login and register modal
const onToggle = useCallback(() => {
// Prevent toggling while the form is being submitted
if (isLoading) {
return;
}
registerModel.onClose();
loginModel.onOpen();
}, [isLoading, registerModel, loginModel]);

// Defining function to handle form submission
const onSubmit = useCallback(async () => {
try {
setIsLoading(true);

  // Sending a POST request to the server to register a new user
  await axios.post('/api/register', {
    email,
    password,
    username,
    name,
  });

  setIsLoading(false);

  // Displaying success message
  toast.success('Account created. Congrats!!');

  // Signing in the newly registered user
  await signIn('credentials', {
    email,
    password
  });

  // Closing the modal
  registerModel.onClose();
} catch (error) {
  // Handling errors and displaying appropriate message
  console.log(error);
  toast.error('Opps! Something went wrong! ');
} finally {
  setIsLoading(false);
}

}, [email, password, registerModel, username, name]);

// Defining the content of the modal body
const bodyContent = (
<div className="flex flex-col gap-4">
<Input
disabled={isLoading}
placeholder="Name"
onChange={(e) => setName(e.target.value)}
value={name}
/>
<Input
disabled={isLoading}
placeholder="Email"
type='email'
onChange={(e) => setEmail(e.target.value)}
value={email}
/>
<Input
disabled={isLoading}
placeholder="Username"
onChange={(e) => setUserName(e.target.value)}
value={username}
/>
<Input
disabled={isLoading}
placeholder="Password"
type='password'
onChange={(e) => setPassword(e.target.value)}
value={password}
/>
</div>
);

// Defining the content of the modal footer
const footerContent = (
<div className="text-neutral-400 text-center mt-4">
<p>
Already have an account?
<span
       onClick={onToggle} 
       className="cursor-pointer text-white hover:underline"         
     >
Sign in
</span>
</p>
</div>
);

// Rendering the modal
return (
<Modal
   disabled={isLoading}
   isOpen={registerModel.isOpen}
   title='Create new account'
   actionLable="Sign up"
   onClose={registerModel.onClose}
   onSubmit={onSubmit} 
   body={bodyContent}
   footer={footerContent}
 />
);
}
