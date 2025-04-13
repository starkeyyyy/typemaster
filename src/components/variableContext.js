import {createContext , useContext, useState} from "react";

export const variableContext = createContext(null);

export const VariableProvider = (props) => {
    const [ timer , setTimer ] = useState(60);
    return<variableContext.Provider value = {{timer , setTimer}}>{props.children}</variableContext.Provider>
};