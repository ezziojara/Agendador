import React, { useContext, useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import { useNavigate, Route, Link } from "react-router-dom";
import {  useLocation } from 'react-router-dom';

export const HeaderNavClient = () => {
  let navigate = useNavigate();
  const [ usuarioDetail, setUsuarioDetail] = useState({})
  const location = useLocation();
  const { Header, Content, Footer } = Layout;
  const handleLogOut = () => {
  
    localStorage.clear();
  }

    return (
        <div>
            <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={location.pathname}>
        <Menu.Item key="/reserve">
          <Link to="/reserve">Reservar</Link>
        </Menu.Item>
        <Menu.Item key="/buscar">
          <Link to="/buscar">Buscar Reservas</Link>
        </Menu.Item>
       

      </Menu>
    </Header>
        </div>
    )
}
