import { Button, Row, Col, Space, Select, DatePicker, Card } from 'antd';
import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { TableList } from '../components/TableList';
import moment from 'moment';

export const HomeAdmin = () => {
    const { Option } = Select;
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }
    const onChangeSelect = (value) => {
        console.log(`selected ${value}`);
        initDoctor.filter(doctor => doctor.id === value).map(doctor => {
            setDoctor(doctor);
        })
        
        
    }
    const [date, setDate] = useState(moment());
    const format = 'DD/MM/YYYY';
    const  initDoctor = [
    {
        id: 1,
        nombre: 'Doctor 1',
        status: true
    },
    {
        id: 2,
        nombre: 'Doctor 2',
        status: true
    },
    {
        id: 3,
        nombre: 'Doctor 3',
        status: true
    }
    ]
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [especialidad, setEspecialidad] = useState('');
    const [doctor, setDoctor] = useState('');
    

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
            <div className='contentHome-title'>
                        <h1>Bienvenido Administrador</h1>
                    
            </div>
                
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
                    
                    { initDoctor?.map((item, index) => {
                        return (                         
                        <>
                            <Option key={index} value={item.id}>{item.nombre}</Option>
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
                
                <TableList />
       
                
                </Col>
            </Row>
        </div>



            
    )
}
