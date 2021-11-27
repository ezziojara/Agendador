import { Table, Tag, Space } from 'antd';
import React from 'react'

export const TableList = () => {
    

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