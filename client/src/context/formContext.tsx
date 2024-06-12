import React, { useState } from 'react';
import { FormContextType } from '../types/FormPage/FormContext';

export const FormContext = React.createContext<FormContextType | null>(null);

const FormProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [email, setEmail] = useState<string>("");
  return <FormContext.Provider value={{ email, setEmail }}>{children}</FormContext.Provider>;
};

export default FormProvider;