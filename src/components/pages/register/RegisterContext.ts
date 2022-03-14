import { UserI } from "models";
import { Dispatch, SetStateAction, createContext } from "react";
import { RegisterFormI } from "schemas";

type UserData = Partial<RegisterFormI> & Pick<UserI, 'confirmCode'>

interface RegisterCtxI {
  isSeller: boolean,
  setIsSeller: Dispatch<SetStateAction<boolean>>,
  user: UserData,
  setUser: Dispatch<SetStateAction<UserData>>,
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