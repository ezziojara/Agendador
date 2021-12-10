import { Table, Tag, Space, Button } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UsuarioAdminContext } from '../context/UsuarioAdminContext';
import moment from 'moment';
import Swal from 'sweetalert2';
export const TableList = ({date, doctor}) => {
  
  const { usuario, setUsuario } = useContext(UsuarioAdminContext);
  console.log(date,usuario);
  const getDoctorTable = () => {
    const fecha = moment(date).format('YYYY-MM-DD');
    const id = usuario?._id;
    axios.get(`http://localhost:8080/api/reservas/${id}/${fecha}`)
    .then(res => {
              console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    }
    )
  }
  const deleteReserva = (id) => {
        axios.delete(`http://localhost:8080/api/reservas/delete/${id}`)
        .then(res => {
          console.log(res);
              Swal.fire(
                'Cancelado!',
                'La reserva ha sido cancelada.',
                'success'
          )
          getTableData();
        }).catch(err => {
          console.log(err);
         }
      )
  }
  const [tableData, setTableData] = useState([]);
    const getTableData = () => {
      
        const fecha = moment(date).format('YYYY-MM-DD');
        const id = (usuario?.rol === 'Administrador') ? doctor : usuario?._id ;
        console.log('fecha', fecha);
        console.log('id', id);
        axios.get(`http://localhost:8080/api/reservas/reservaGrilla/${id}/${fecha}`)
            .then(res => {
                console.log('respueta', res.data);
                setTableData(res.data);
               
            })
            .catch(err => {
                console.log(err);
            })
    }


  useEffect(() => {
    getDoctorTable();
    getTableData();
  }, [date, doctor]); // eslint-disable-line react-hooks/exhaustive-deps

  const data = 
    tableData.map(reserva => {
      return {
        key: reserva._id,
        doctor: reserva.doctor.name,
        paciente: reserva.paciente.nombre,
        horario: reserva.horario.horaInicio
      }
    })
  
  console.log(data);
const columns = [
  {
    title: 'Nombre',
    dataIndex: 'doctor',
    key: 'doctor',
    render: text => text,
  },
  {
    title: 'paciente',
    dataIndex: 'paciente',
    key: 'paciente',
  },
  {
    title: 'Horario',
    dataIndex: 'horario',
    key: 'address',
  },
  
  {
    title: 'Acciones',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Button type="danger" onClick={() => deleteReserva(record.key)}> Eliminar </Button>
      </Space>
    ),
  },
];


return (
    <div>
      { tableData && (
        <Table columns={columns} dataSource={data} />
      )}
    </div>
)
}