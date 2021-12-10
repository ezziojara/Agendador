import React, { useContext, useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd';
import { Row, Col, Card, Modal, Button, Tooltip  } from 'antd';
import { Select } from 'antd';
import moment from 'moment';

import Swal from 'sweetalert2'
import { FormConfirm } from '../components/FormConfirm';
import { UsuarioContext } from '../context/UsuarioContext';
import axios from 'axios';
import { EspecialidadContext } from '../context/EspecialidadContext';
const { Option } = Select;
export const Main = () => {
    const [date, setDate] = useState(moment());
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }
    
    const onChangeSelect = (value) => {
        console.log(value);
            setDoctor(doctor);
            optionDoctor.filter(item => {
                if(item._id === value){
                    setDoctor(item);
                    getHorario(item._id, date);
                }
            })
    }
    
    const format = 'DD/MM/YYYY';
    
    const loading = () => {
        console.log('ok');
    }
    const { paciente,setPaciente } = useContext(UsuarioContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { especialidad, setEspecialidad } = useContext(EspecialidadContext);
    const [optionDoctor, setOptionDoctor] = useState([]);
    const [optionHorario, setOptionHorario] = useState([]);
    const [bloques, setBloques] = useState({});
    const [doctor, setDoctor] = useState('');
    const [loadD, setLoadD] = useState(false);
    const [change, setChange] = useState(false);
    const [loadB, setLoadB] = useState(false);
  
    const getDoctor = () => {
        axios.get(`http://localhost:8080/api/aut/doctor/${especialidad}`)
            .then(res => {
                // const respuesta=res.data.filter(especialidad => especialidad.nombre !== 'Sin especialidad')
                // console.log(respuesta);
                setOptionDoctor(res.data);
                setLoadD(true);
        }).catch(err => {
            console.log(err);
        }
        )

    }

    const getHorario = (id, date) => {
        let dateNew = moment(date).format('YYYY-MM-DD');
        const doctorNew = id;
        console.log(dateNew, doctor);

        axios.get(`http://localhost:8080/api/reservas/${doctorNew}/${dateNew}`)
            .then(res => {
                setOptionHorario(res.data);
                console.log(res.data);
                setLoadB(true);
        }).catch(err => {
            console.log(err);
        }
        )
    }

    console.log(paciente)
    useEffect(() => {
            getDoctor();
            getHorario(doctor._id, date);
    }, [especialidad, paciente, change]) 
    const   handleDate= (date) => {
        setDate(date);
        getHorario(doctor._id, date);
        console.log(date);
    }

    const handleModal = (value) => {
        
        setBloques(value);
        setIsModalVisible(true);
    };
    
      const handleOk = () => {
        console.log(bloques);
        setIsModalVisible(false);
    };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      const gridStyle = {
        width: '19%',
        textAlign: 'center',
        margin: '5px'
      };
      
    return (

        <div className='contentHome'>
            { loadD ? (
            <Row>
                <Col xl={2}>
                </Col>
                <Col style={{textAlign: 'left', marginBottom: '20px'}} xs={2} sm={4} md={6} lg={8} xl={10}>
                    <Space direction="vertical">
                    <Select
                        showSearch
                        style={{ width: 200 , }}
                        placeholder="Selecciona Doctor"
                        optionFilterProp="children"
                        onChange={onChangeSelect}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                    
                    { optionDoctor?.map((item, index) => {
                        return (                         
                        <>
                            <Option key={index} value={item._id}>{item.name}</Option>
                        </>
                        )}
                    )}
                    </Select>
                    </Space>
                </Col>
                <Col style={{textAlign: 'right'}} xs={2} sm={4} md={6} lg={8} xl={10}>
                    <Space >
                        <DatePicker defaultValue={moment(date, format)} format={format} onChange={handleDate} />
                    </Space>
                </Col>

                <Col style={{textAlign: 'center'}} xs={2} sm={4} md={6} lg={8} xl={24}>
                {
                    doctor && (
                
                <Card  style={{ margin: 'auto',marginBottom: 15 , marginTop: 50}}  >
                {
                    optionHorario?.map((item, index) => {
                        return (
                            <div key={index}>
                                {item.tieneReserva ? (
                                <Tooltip title="No disponible">
                                    <Card.Grid className="cardDisable" style={gridStyle} hoverable={false} >
                                        <h1>{item.horaInicio}</h1>
                                        <p>{item.tieneReserva  ? 'No disponible': 'Disponible'}</p>
                                    </Card.Grid>
                                </Tooltip>
                                )
                                : (
                                <Card.Grid style={gridStyle}  onClick={() => handleModal(item)}>
                                    <h1>{item.horaInicio}</h1>
                                    <p>{item.tieneReserva  ? 'No disponible': 'Disponible'}</p>
                                </Card.Grid>
                                )
                    }

                               
                            </div>
                        )
                    })
                }
                  </Card> 
                )}
                

                    
                </Col>
               
                <Modal destroyOnClose={true}  title="Confirmar Reserva" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={null}
                  >
                    <FormConfirm setOptionHorario={setOptionHorario} set={setChange} setIsModalVisible={setIsModalVisible}  doctor={doctor} bloques={bloques} date={date}/>
                </Modal>
                
            </Row>
            )
            :
            ''
        }

    </div>
    )
}
