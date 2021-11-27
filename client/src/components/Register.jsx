import React, { useContext, useState } from 'react'
import {
    Form,
    Input,
    Button,
  } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate, Route, Link } from 'react-router-dom';

export const Register = () => {
  
    const [form] = Form.useForm();
    let navigate = useNavigate();
    const initDates = {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
  }
  const [usuarioNew, setUsuarioNew] = useState(initDates)
  const {nombre, apellido, email, password, genero} = usuarioNew;
    const onFinish = (values) => {
    console.log('Received values of form: ', values);
    }
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo); 
    };
    
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
     
    return (
      <div style={{ margin: 40}}>
        <h1>Registrarse</h1>
            <Form
            
            form={form}
            name="register"
            {...layout} 
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Nombre"
                name="nombre"
                rules={[
                {
                    required: true,
                    message: 'Ingresa el nombre',
                },

                {
                  min: 3,
                  message: 'MInimo de caracteres 3',
                },
                
                ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
                label="apellido"
                name="apellido"
                rules={[
                {
                    required: true,
                    message: 'Ingresa el apellido',
                },

                {
                  min: 3,
                  message: 'MInimo de caracteres 3',
                },
                
                ]}
            >
            <Input />
            </Form.Item>

            <Form.Item
                label="correo"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'Ingresa un Email',
                      },
                      {
                        required: true,
                        message: 'Ingresa un Email',
                      },
                
                ]}
            >
            <Input />
            </Form.Item>


            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Confirmar password"
                name="confirmpassword"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('las contraseñas no coinciden'));
                    },
                  }),
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
              Crear
              </Button>
              <Link to="/admin/home">Volver</Link>
            </Form.Item>
            
            </Form>
        </div>
    );
}
