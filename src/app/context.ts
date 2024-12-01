// context.js
import { createContext, useContext } from 'react';
import { VerbsData, Context } from './types/verbs';


export const MyContext = createContext<Context | undefined>(undefined); 

// Custom hook to access the context
export const useMyContext = () => {
    const context = useContext(MyContext);
    if (context === undefined) {
      throw new Error('useMyContext must be used within a mycontext.provider');
    }
    return context;
  };
  
