import React, { useContext, useEffect, useState } from 'react'
import { Card, Input, Select,Button,Form  } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import { UsuarioContext } from '../context/UsuarioAdminContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import { EspecialidadContext } from '../context/EspecialidadContext';
export const SearchReserve = () => {
    let navigate = useNavigate();
    const onChangeSelect = (value) => {
        //setEspecialidad(value);
        console.log('select:', value);
    }
    const onFinish = (values: any) => {
        console.log('Success:', values);

        axios.get(`http://localhost:8080/api/reservas/paciente/${values._id}/${values.paciente}`)
        .then(res => {
            console.log(res.data);   
            Swal.fire({
                title: '<strong><u>Datos de la reserva</strong>',
                icon: 'info',
                html:
                  'Nombre paciente: <b>'+ res.data.paciente.nombre +' '+res.data.paciente.nombre +'</b>, ' +
                  '<br>'+
                  'Nombre Doctor: <b>'+
                  res.data.doctor.name +
                  '<br> Hora:' + res.data.horario.horaInicio +
                  '<br> Fecha:' + moment(res.data.fecha).format('DD-MM-YYYY') , 
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText:
                  '<i class="fa fa-thumbs-up"></i>Cancelar',
                confirmButtonAriaLabel: 'Thumbs up, great!',
        
                }).then((result) => {
                    if (result.value) {
                        axios.delete(`http://localhost:8080/api/reservas/delete/${res.data._id}`)
                        .then(res => {
                            console.log(res);
                            Swal.fire(
                                'Cancelado!',
                                'La reserva ha sido cancelada.',
                                'success'
                              )
                        }).catch(err => {
                            console.log(err);
                        }
                        )
                    }
              })
        })
        .catch(err => {        
             
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.msg
                })
        })
        //navigate("/ResultFind");
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
                initialValues={{}}
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
                    rules={[{ required: true, message: 'Debes ingresar el numero de reserva' }]}
            >
                    <Input />
            </Form.Item>
            <div className="alinearDerecha">
                    <Button type="primary" htmlType="submit">Buscar</Button>
            </div> 
                    </Form>
           
            </Card>
        </div>
    )
}
