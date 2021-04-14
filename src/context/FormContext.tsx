import { createContext, Dispatch, useContext, useReducer } from 'react';
import { formReducer } from '../reducers/FormReducer';
import { Action, FormState, } from '../utils/types';

interface FormContextType {
    formState: FormState,
    formDispatch: Dispatch<Action>
}

const initialState: FormContextType = {
    formState: {
        fileName: "",
        description: "",
        content: "",
        heading: ""
    },
    formDispatch: () => undefined
};

const FormContext = createContext<FormContextType>(initialState);

interface FormContextProviderProps {
    children: JSX.Element | JSX.Element[];
}

export const FormProvider: React.FC<FormContextProviderProps> = ({ children }) => {
    const [formState, formDispatch] = useReducer(formReducer, initialState.formState);

    return (
        <FormContext.Provider value={{ formState, formDispatch }}>
            {children}
        </FormContext.Provider>
    )
}

export const useFormContext = () => useContext(FormContext);