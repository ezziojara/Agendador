import React, { useContext } from 'react'
import { Card, Input, Select,Button,Form, Col  } from 'antd';
import moment from 'moment';
import { UsuarioContext } from '../context/UsuarioContext';
import axios from 'axios';
import Swal from 'sweetalert2';
export const FormConfirm = ({doctor, bloques, date, setIsModalVisible, setChange}) => {
        const { paciente,setPaciente } = useContext(UsuarioContext);
        console.log('doctor', doctor);
        console.log('bloque', bloques);
        const onFinish = (values: any) => {
        console.log('Success:', values);
        
        const valueReserva = {
            paciente: paciente._id,
            horario: bloques._id,
            fecha: moment(date).format('YYYY-MM-DD'),
            doctor: doctor._id,
        };
        console.log('valueReserva', valueReserva);
        const value = {...paciente, ...values};

        axios.put(`http://localhost:8080/api/pacientes/update/${paciente._id}`, value, {
                headers: {
                'token': paciente.token
                }
            }
        ).then(res => {
                console.log(res);
                setPaciente({...paciente, ...res.data});
                setIsModalVisible(false);
                setChange(true);
                //console.log('paciente', paciente);
        }).catch(err => {
            console.log(err);
        });

        axios.post('http://localhost:8080/api/reservas/new', valueReserva, 
        {headers:
            {
            'token': paciente.token
            }
        }).then(res => {
            console.log('respuesta para el email', res.data_id);
            email(res.data._id);
            Swal.fire({
                title: 'Reserva exitosa',
                text: 'Se ha registrado su reserva',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

        }).catch(err => {
            console.log(err);
        }
        )        
        console.log('para subir', value);
      };
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };


      const email = (id) => {
          axios.get(`http://localhost:8080/api/reservas/enviarCorreoPaciente/${id}`)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            }
            )
        }
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
            <Col span={22}>
            <Button style={{ marginLeft : 'auto', display: 'flex'}} type="primary" htmlType="submit">
                Confirmar
            </Button>
           </Col>



            </Form>
            

        </div>
    )
}