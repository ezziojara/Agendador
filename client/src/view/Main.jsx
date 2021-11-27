import React, { useContext, useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd';
import { Row, Col, Card, Modal, Button } from 'antd';
import { Select } from 'antd';
import moment from 'moment';
import Swal from 'sweetalert2'
import { FormConfirm } from '../components/FormConfirm';
import { UsuarioContext } from '../context/UsuarioContext';
import axios from 'axios';
import { EspecialidadContext } from '../context/EspecialidadContext';
const { Option } = Select;
export const Main = () => {
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    const onChangeSelect = (value) => {
        console.log(value);
            setDoctor(doctor);
            optionDoctor.filter(item => {
                if(item._id === value){
                    setDoctor(item);
                }
            })

        
        
    }
    const [date, setDate] = useState(moment());
    const format = 'DD/MM/YYYY';
    
    const loading = () => {
        console.log('ok');
    }

    const initBloques = [
        {
            id: 1,
            nombre: '8:00',
            status: true
        },
        {
            id: 2,
            nombre: '8:30',
            status: false
        },
        {
            id: 3,
            nombre: '9:00',
            status: true
        },
        {
            id: 4,
            nombre: '9:30',
            status: false
        },
        {
            id: 5,
            nombre: '10:00',
            status: true
        },
        {
            id: 6,
            nombre: '10:30',
            status: false
        },
        {
            id: 7,
            nombre: '11:00',
            status: true
        },
        {
            id: 8,
            nombre: '11:30',
            status: false
        },
        {
            id: 9,
            nombre: '12:00',
            status: true
        },
        {
            id: 10,
            nombre: '12:30',
            status: false
        },
        

    ]
    const { paciente,setPaciente } = useContext(UsuarioContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { especialidad, setEspecialidad } = useContext(EspecialidadContext);
    const [optionDoctor, setOptionDoctor] = useState([]);
    const [optionHorario, setOptionHorario] = useState([]);
    
    const [doctor, setDoctor] = useState('');
    const getDoctor = () => {
        axios.get(`http://localhost:8080/api/aut/doctor/${especialidad}`)
            .then(res => {
               console.log(res.data);
                setOptionDoctor(res.data);
        }).catch(err => {
            console.log(err);
        }
        )

    }

    const getHorario = () => {
        axios.get(`http://localhost:8080/api/horarios`)
            .then(res => {
                setOptionHorario(res.data);
                console.log(res.data);
        }).catch(err => {
            console.log(err);
        }
        )
    }


    useEffect(() => {
        if(especialidad){
            getDoctor();
            getHorario();
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps





    const [bloques, setBloques] = useState({});
    const   handleDate= (date) => {
        setDate(date);
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
            <Row>
                <Col xl={2}>
                </Col>
                <Col style={{textAlign: 'left'}} xs={2} sm={4} md={6} lg={8} xl={10}>
                    <Space direction="vertical">
                    <Select
                        showSearch
                        style={{ width: 200 }}
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
                    
                <Card  style={{ margin: 'auto',marginBottom: 15 , marginTop: 50}}  >
                {
                    optionHorario?.map((item, index) => {
                        return (
                            <div key={index}>
                                
                                <Card.Grid style={gridStyle} onClick={() => handleModal(item)}>
                                    <h1>{item.horaInicio}</h1>
                                    <p>{item.status  ? 'Disponible': 'No disponible'}</p>
                                </Card.Grid>
                               
                            </div>
                        )
                    })
                }
                  </Card>   
                    
                </Col>
               
                <Modal destroyOnClose={true}  title="Confirmar Reserva" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                      Cancelar
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                      Confirmar
                    </Button>,
                    
                  ]}
                  
                  >
                    <FormConfirm  doctor={doctor} bloques={bloques} date={date}/>
                </Modal>
                
            </Row>
        </div>
    )
}
