import { createContext, useState } from "react";

export const UsuarioAdminContext = createContext();

export const UsuarioAdminProvider = (props) => { 

    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));

    return (
        <UsuarioAdminContext.Provider value={{usuario, setUsuario}}>
            {props.children}
        </UsuarioAdminContext.Provider>
    );

}

