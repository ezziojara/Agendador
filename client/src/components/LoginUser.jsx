import React, { useContext, useEffect, useState } from 'react'
import { Card, Input, Select,Button,Form  } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import { UsuarioContext } from '../context/UsuarioContext';
import axios from 'axios';
import { EspecialidadContext } from '../context/EspecialidadContext';
export const LoginUser = () => {
    let navigate = useNavigate();
    const handleLogin = (value) => {
        console.log('search:', value);
        navigate("/home");
    }
    const { Option } = Select;
    const { paciente,setPaciente } = useContext(UsuarioContext);
    const [optionEspecialidad, setOptionEspecialidad] = useState([]);
    const { especialidad, setEspecialidad } = useContext(EspecialidadContext);

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

    useEffect(() => {
        getEspecialidad();
    }, [])
    const onChangeSelect = (value) => {
        //setEspecialidad(value);
        console.log('select:', value);
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
        
        const valuePasientes =  {
            rut: values.rut
        }
        console.log(valuePasientes);
        axios.post('http://localhost:8080/api/pacientes/new', valuePasientes)
        .then(res => {
            console.log(res.data);
            setPaciente(res.data);
            setEspecialidad(values.especialidad);
            localStorage.setItem('paciente',JSON.stringify(res.data));
            
        })
        .catch(err => {
            console.log(err);
        })
        navigate("/home");
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <div >
            { optionEspecialidad && (
            <Card style={{ width: 340, margin: 'auto' }}>
                <Form
                    name="basic"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                            label="Rut"
                            name="rut"
                            rules={[{ required: true, message: 'Debes ingresar tu Rut' }]}
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
                            style={{ width: 150 }}
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
                    <div className="alinearDerecha">
                        <Button type="primary" htmlType="submit">Ingresar</Button>
                    </div>
                </Form>
            </Card>
            )}
        </div>
    )
}
