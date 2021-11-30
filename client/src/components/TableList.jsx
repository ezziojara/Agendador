import { Table, Tag, Space } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { UsuarioAdminContext } from '../context/UsuarioAdminContext';
import moment from 'moment';
export const TableList = ({date}) => {
  
  const { usuario, setUsuario } = useContext(UsuarioAdminContext);
  console.log(date,usuario);
  const getDoctorTable = () => {
    const fecha = moment(date).format('YYYY-MM-DD');
    const id = usuario._id;
    axios.get(`http://localhost:8080/api/reservas/${id}/${fecha}`)
    .then(res => {
              console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    }
    )
  }
  useEffect(() => {
    getDoctorTable();
  }, []);

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'doctor',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'paciente',
    dataIndex: 'paciente',
    key: 'paciente',
  },
  {
    title: 'bloque',
    dataIndex: 'bloque',
    key: 'address',
  },
  
  {
    title: 'Acciones',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Confirmar {record.name}</a>
        <a>Cancelar</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    doctor: 'John Brown',
    bloque: '8:00',
    paciente: 'New York No. 1 Lake Park',
    estado: true,
  },
  {
    key: '2',
    doctor: 'John  2',
    bloque: '8:00',
    paciente: 'New York No. 1 Lake Park',
    estado: true,
  },
  {
    key: '3',
    doctor: 'John Brown 3',
    bloque: '8:00',
    paciente: 'New York No. 1 Lake Park',
    estado: true,
  },
]


return (
    <div>
        <Table columns={columns} dataSource={data} />
    </div>
)
}