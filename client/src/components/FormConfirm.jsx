import React, { useContext } from 'react'
import { Card, Input, Select,Button,Form  } from 'antd';
import moment from 'moment';
import { UsuarioContext } from '../context/UsuarioContext';
import axios from 'axios';
export const FormConfirm = ({doctor, bloques, date}) => {
        const { paciente,setPaciente } = useContext(UsuarioContext);
        console.log('doctor', doctor);
        console.log('bloque', bloques);
        const onFinish = (values: any) => {
        console.log('Success:', values);
        
        const valueReserva = {
            paciente: paciente._id,
            horario: bloques._id,
            fecha: date,
            doctor: doctor._id,
        };
        console.log('valueReserva', valueReserva);



        const value = {...paciente, ...values};

        axios.post('http://localhost:8080/api/reservas/new', valueReserva, 
        {headers: 
            {
            'token': paciente.token
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        }
        )

        axios.put(`http://localhost:8080/api/pacientes/update/${paciente._id}`, value, {
                headers: {
                'token': paciente.token
                }
            }
        ).then(res => {
                console.log(res);
                //setPaciente(res.data);
                //console.log('paciente', paciente);
        }).catch(err => {
            console.log(err);
        });

        console.log('para subir', value);
      };


      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return (
        
        <div>
            
            <p>Rut Paciente: {paciente.rut}</p>
            <p> Doctor: {doctor.name}</p>
            <p> fecha {moment(date).format('DD/MM/YYYY')}</p>
            <p>Hora: {bloques.horaInicio}</p>
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
            <Button type="primary" htmlType="submit">
                Confirmar
            </Button>
            </Form>
            

        </div>
    )
}