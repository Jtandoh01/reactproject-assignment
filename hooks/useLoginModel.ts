import { create } from 'zustand';

interface LoginModelStore{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

//hook to control login model
const useLoginModel= create<LoginModelStore>((set)=>({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useLoginModel;