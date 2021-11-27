import React, { useContext, useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import { useNavigate, Route, Link } from "react-router-dom";
import {  useLocation } from 'react-router-dom';

export const HeaderNav = () => {
  let navigate = useNavigate();
  const [ usuarioDetail, setUsuarioDetail] = useState({})
  const { Header, Content, Footer } = Layout;
  const handleLogOut = () => {
  
    localStorage.clear();
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
        <Link to="/profile" ><Avatar src={usuarioDetail.img}  style={{ backgroundColor: '#1890ff', marginRight: 20}} icon={<UserOutlined />} />
          {`${usuarioDetail.nombre} ${usuarioDetail.apellido} `}
        </Link>
            
        </Menu.Item>

        <Menu.Item  key="4" >
          <span onClick={handleLogOut}>
            Logout
          </span>
            
        </Menu.Item>
      </Menu>
    </Header>
        </div>
    )
}
