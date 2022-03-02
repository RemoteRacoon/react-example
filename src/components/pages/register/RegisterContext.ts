import { UserI } from "models/User";
import { Dispatch, SetStateAction, createContext } from "react";

interface RegisterCtxI {
  isSeller: boolean,
  setIsSeller: Dispatch<SetStateAction<boolean>>,
  user: Partial<UserI>,
  setUser: Dispatch<SetStateAction<Partial<UserI>>>,
  onRegister: () => any,
}

const RegisterCtx = createContext<RegisterCtxI>({
  isSeller: null,
  setIsSeller: () => { },
  user: null,
  setUser: () => { },
  onRegister: () => { }
});

export default RegisterCtx