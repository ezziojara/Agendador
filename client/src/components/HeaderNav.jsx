import React, { useContext, useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import { useNavigate, Route, Link } from "react-router-dom";
import {  useLocation } from 'react-router-dom';
import { UsuarioAdminContext } from '../context/UsuarioAdminContext';

export const HeaderNav = () => {
  let navigate = useNavigate();
  const { usuario, setUsuario } = useContext(UsuarioAdminContext);
  console.log('contexto', usuario);
  const { Header, Content, Footer } = Layout;
  useEffect(() => {
    if(!usuario){
      navigate('/admin/login');
    }
  }, [usuario]);

  const handleLogOut = () => {
    localStorage.clear();
    
    navigate('/admin/login');
  }
  const location = useLocation();

    return (
        <div>
            <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal"  defaultSelectedKeys={location.pathname} >
        

        <Menu.Item key="/admin/home">
          <Link to="/admin/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="/admin/register">
          <Link to="/admin/register">Registrar</Link>
        </Menu.Item>
        
        <Menu.Item  key="3" style={{marginLeft: "auto"}}>
        <Link to="/profile" ><Avatar src='ss'  style={{ backgroundColor: '#1890ff', marginRight: 20}} icon={<UserOutlined />} />
          {`${usuario?.name}`}
        </Link>
            
        </Menu.Item>

        <Menu.Item  key="4" >
          <span onClick={handleLogOut}>
            Salir
          </span>
            
        </Menu.Item>
      </Menu>
    </Header>
        </div>
    )
}
