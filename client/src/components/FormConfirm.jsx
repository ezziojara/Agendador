import React, { useContext } from 'react'
import { Card, Input, Select,Button,Form  } from 'antd';
import moment from 'moment';
import { UsuarioContext } from '../context/UsuarioContext';
export const FormConfirm = ({doctor, bloques, date}) => {
    const { paciente,setPaciente } = useContext(UsuarioContext);
    console.log(paciente);
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return (
        
        <div>
            <p>Confirmar cita</p>
            <p>Rut Paciente: {paciente.rut}</p>
            <p> Doctor: {doctor.nombre}</p>
            <p> fecha {moment(date).format('DD/MM/YYYY')}</p>
            <p>Hora: {bloques.nombre}</p>
             <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                initialValues={
                    { 
                    nombre: paciente?.nombre, 
                    apellido: paciente?.apellido,
                    telefono: paciente?.telefono,
                    email: paciente?.email,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
            <Form.Item
                label="Nombre Paciente:"
                name="nombre"
                rules={[{ required: true, message: 'Ingresa tu nombre' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Apellido Paciente:"
                name="apellido"
                rules={[{ required: true, message: 'Ingresa tu apellido' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                    label="Telefono"
                    name="telefono"
                    rules={[{ required: true, message: 'Ingresa tu telefono' }]}
                >
                <Input />
            </Form.Item>
                
            <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ type: 'email', required: true, message: 'Ingresa un email!' }]}
                >
                <Input />
            </Form.Item>
            </Form>
            
        </div>
    )
}