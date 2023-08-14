import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import { paymentSchedule } from '../../http/scheduleAPI';

const PaymentSchedule = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([])
  const columns = [
    {
      title: '№ платежа',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Дата платежа',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Сумма платежа',
      dataIndex: 'amountPayment',
      key: 'amountPayment',
    },
    {
      title: 'Проценты',
      dataIndex: 'percent',
      key: 'percent',
    },
    {
      title: 'Основной долг',
      dataIndex: 'debt',
      key: 'debt',
    }
  ];

  const showModal = () => {
    paymentSchedule(props.amountLoan, props.periodLoan, props.dateOpenLoan).then((data) => {
      setDataSource(data.data)
    }).catch(() => {
      setDataSource([])
      setIsModalOpen(false);
    })
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <button 
        type="button" 
        className='btn' 
        onClick={showModal}
        disabled={
          props.amountLoan === null || 
          props.periodLoan === null || 
          props.periodLoan === "" || 
          props.dateOpenLoan === null
        }
      >
        График платежей
      </button>
      <Modal 
        open={isModalOpen} 
        footer={false}
        closable={true}
        centered={true}
        onCancel={handleCancel}
      >
        <Table 
          columns={columns} 
          dataSource={dataSource}
          pagination={{position: ['bottomCenter']}}
        />
      </Modal>
    </>
  );
};

export default PaymentSchedule;