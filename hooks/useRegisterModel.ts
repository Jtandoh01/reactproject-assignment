// Importing create from zustand to create a new store for register model
import { create } from 'zustand';

// Defining the interface for RegisterModelStore
interface RegisterModelStore{
isOpen: boolean;
onOpen: () => void;
onClose: () => void;
};

// Creating a hook useRegisterModel to control the state of Register Model
const useRegisterModel = create<RegisterModelStore>((set) => ({
isOpen: false,
onOpen: () => set({ isOpen: true }),
onClose: () => set({ isOpen: false })
}));

// Exporting the useRegisterModel hook
export default useRegisterModel;




