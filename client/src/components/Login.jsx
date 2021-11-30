import React, { useContext } from 'react'
import { Form, Input, Button, Card } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate, Route, Link } from "react-router-dom";
import axios from 'axios';
import { UsuarioAdminContext } from '../context/UsuarioAdminContext';


export const Login = () => {
    let navigate = useNavigate();
    const { usuario, setUsuario } = useContext(UsuarioAdminContext);
    const onFinish = values => {
        
        console.log('Success:', values);
       // navigate(`/admin/home`);
       axios.post('http://localhost:8080/api/aut/login', values)
       .then(res => {
           console.log(res.data);
           setUsuario(res.data);
           localStorage.setItem('usuario', JSON.stringify(res.data));
           navigate(`/admin/home`);
       })
        .catch(err => {
                console.log(err);
                Swal.fire({
                     icon: 'error',
                     title: 'Oops...',
                     text: 'Usuario o contraseña incorrectos',
                })
              }
        );

    }
    const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    };
    return (
        <div style={{ margin: 40}}>
            <Card className="login-card">
            <h1>Login</h1>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 8,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Ingresa tu usuario',
                    },
                    ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                    label="Clave"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'ingresa tu contraseña',
                    },
                    ]}
                >
                <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 8,
                    }}
                >
                    <Button style={{marginRight: 20}} type="primary" htmlType="submit">
                    Ingresar
                    </Button>
                    
                </Form.Item>
            </Form>
        </Card>
        </div>
    )

}
