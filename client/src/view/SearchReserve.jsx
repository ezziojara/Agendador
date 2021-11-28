import React, { useContext, useEffect, useState } from 'react'
import { Card, Input, Select,Button,Form  } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import { UsuarioContext } from '../context/UsuarioContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { EspecialidadContext } from '../context/EspecialidadContext';
export const SearchReserve = () => {
    let navigate = useNavigate();
    const onChangeSelect = (value) => {
        //setEspecialidad(value);
        console.log('select:', value);
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
        /*
        const valuePasientes =  {
            rut: values.rut
        }
        console.log(valuePasientes);
        axios.get('http://localhost:8080/api/pacientes/new', valuePasientes)
        .then(res => {
            console.log(res.data);
            setPaciente(res.data);
            setEspecialidad(values.especialidad);
            localStorage.setItem('paciente',JSON.stringify(res.data));
            
        })
        .catch(err => {
            console.log(err);
        })
        navigate("/ResultFind");*/
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <div >
             <Card style={{ width: 300, margin: 'auto' }}>
             <Form
                name="basic"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
            <Form.Item
                    label="Rut"
                    name="paciente"
                    rules={[{ required: true, message: 'Debes ingresar tu Rut' }]}
            >
                    <Input />
            </Form.Item>
            <Form.Item
                    label="Numero Reserva"
                    name="_id"
                    rules={[{ required: true, message: 'Debes ingresar el nUmero de reserva' }]}
            >
                    <Input />
            </Form.Item>
                    <Button type="primary" htmlType="submit">Buscar</Button>
                    </Form>
            </Card>
        </div>
    )
}
