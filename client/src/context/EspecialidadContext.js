import { createContext, useState } from "react";

export const EspecialidadContext = createContext();

export const EspecialidadProvider = (props) => { 

    const [especialidad, setEspecialidad] = useState({});
    return (
        <EspecialidadContext.Provider value={{especialidad, setEspecialidad}}>
            {props.children}
        </EspecialidadContext.Provider>
    );

}

