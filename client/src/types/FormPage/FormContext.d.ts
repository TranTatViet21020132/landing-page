import { Dispatch, SetStateAction } from 'react';

export type FormContextType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}
