import React from 'react'
import { Main } from './Main'
import { UsuarioProvider } from '../context/UsuarioContext';

export const Home = () => {
    return (
        <div>
            <UsuarioProvider>
                <Main />
            </UsuarioProvider>
        </div>
    )
}
