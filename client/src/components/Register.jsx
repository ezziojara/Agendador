import React, { useContext, useEffect, useState } from 'react'
import {
    Form,
    Input,
    Button,
    Select
  } from 'antd';
import Swal from 'sweetalert2';
import { useNavigate, Route, Link } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  
    const [form] = Form.useForm();
    let navigate = useNavigate();
    const initDates = {
      nombre: '',
      apellido: '',
      email: '',
      password: '',
  }

  const getEspecialidad =() =>{
    axios.get('http://localhost:8080/api/especialidades')
    .then(res => {
        setOptionEspecialidad(res.data);
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    }
    )
  }


  const getRoles =() =>{
    axios.get('http://localhost:8080/api/roles')
    .then(res => {
        setOptionRoles(res.data);
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    }
    )
  }



  
  const { Option } = Select;
  useEffect(() => {
      getEspecialidad();
      getRoles();
  }, [])
  const onChangeSelect = (value) => {
    //setEspecialidad(value);
    console.log('select:', value);
  }
  const onChangeSelectRol = (value) => {
    //setEspecialidad(value);
    console.log('select:', value);
  }
  const [optionEspecialidad, setOptionEspecialidad] = useState([]);
  const [optionRoles, setOptionRoles] = useState([]);
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
      axios.post('http://localhost:8080/api/aut/registrar', values)
      .then(res => {
          console.log(res.data);
          Swal.fire(
              'Usuario Registrado',
              'El usuario se registro correctamente',
              'success'
          )
          navigate("/admin/home");
      })
      .catch(err => {
          console.log(err);
      })
    };
    
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
                name="name"
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
                label="rut"
                name="rut"
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
                label="telefono"
                name="telefono"
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
                        label="Especialidad"
                        name="especialidad"
                        rules={[{ required: true, message: 'Debes Seleccionar una especialidad' }]}
                    >
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Selecciona Especialidad"
                            optionFilterProp="children"
                            onChange={onChangeSelect}
                            filterOption={
                                (input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                            >
                                { optionEspecialidad?.map((item, index) => {
                                    return (                         
                                        <>
                                        <Option key={index} value={item._id}>{item.nombre}</Option>
                                        </>
                                    )}
                                )}
                        </Select>
                    </Form.Item>

            
            <Form.Item
                label="Tipo"
                name="rol"
                rules={[{ required: true, message: 'Debes Seleccionar un role' }]}
            >
                  <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Selecciona rol"
                      optionFilterProp="children"
                      onChange={onChangeSelectRol}
                      filterOption={
                          (input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                      }
                    >
                                { optionRoles?.map((item, index) => {
                                    return (                         
                                        <>
                                        <Option key={index} value={item._id}>{item.nombre}</Option>
                                        </>
                                    )}
                                )}
                        </Select>
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
                name="confirmPassword"
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
