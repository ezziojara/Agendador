import { createContext, useState } from "react";

export const UsuarioContext = createContext();

export const UsuarioProvider = (props) => { 

    const [paciente, setPaciente] = useState({});
    return (
        <UsuarioContext.Provider value={{paciente, setPaciente}}>
            {props.children}
        </UsuarioContext.Provider>
    );

}

