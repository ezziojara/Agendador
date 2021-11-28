
import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation} from "react-router-dom";
import { HeaderNav } from '../components/HeaderNav';
import { HeaderNavClient } from '../components/HeaderNavClient';
import { Login } from '../components/Login';
import { LoginUser } from '../components/LoginUser';
import { Register } from '../components/Register';
import { Home } from '../view/Home';
import { HomeAdmin } from '../view/HomeAdmin';
import { Main } from '../view/Main';
import { SearchReserve } from '../view/SearchReserve';
export const RoutesApp = () => {
    const [load, setLoad] = useState(false)
    const location = useLocation();
    useEffect(() => {
        if(location.pathname === '/admin/home' || location.pathname === '/admin/register'){
            return setLoad(1);
        }
        if(location.pathname === '/home' || location.pathname === '/reserve' 
        || location.pathname === '/buscar'){
            return setLoad(2);
        }
        else {
            return setLoad(false);
        }
    }, [location.pathname])
   
    const headerCustom = (
        <div>
          {load === 1 ? <HeaderNav /> : load === 2 ? <HeaderNavClient /> : null}
          
        </div>
      );
    
    return (
        <div>
           {headerCustom}
            <Routes>
                <Route path="/reserve" element={<LoginUser />} />
                <Route path="/home" element={<Main />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/register" element={<Register />} />
                <Route path="/admin/home" element={<HomeAdmin />} />
                <Route path="/buscar" element={<SearchReserve />} />
            </Routes>
        </div>
    )
}
