import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addStudent,
  deleteStudent,
  sendNotification,
  fetchData,
  fetchAllPayments,
  fetchPaidStudents,
  updateStudent,
  fetchRooms
} from '../../redux/slices/manageSlice';
import { Table, Card, Form, Input, Button, Space, Tag, Tabs, Modal, message, Select, Spin } from 'antd';
import { UserAddOutlined, DeleteOutlined, SendOutlined, MailOutlined, HomeOutlined, LoadingOutlined, EditOutlined } from '@ant-design/icons';
import './StudentManagement.css';

const { TabPane } = Tabs;
const { Option } = Select;


const StudentManagement = () => {
  // Lấy dữ liệu từ Redux store
  const dispatch = useDispatch();
  const { students = [], payments = [], rooms = [], paidStudents = [], loading = false, error = null } = useSelector((state) => state.manage);

  // State management
  const [newStudent, setNewStudent] = useState({ name: "", email: "", room_id: "" });
  const [notification, setNotification] = useState({ user_id: "", message: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editForm] = Form.useForm();


  const showEditModal = (student) => {
    setEditingStudent(student);
    editForm.setFieldsValue({
      name: student.name,
      email: student.email,
      room_id: student.room_id
    });
    setIsEditModalVisible(true);
  };

  const showDeleteConfirm = (student) => {
    setStudentToDelete(student);
    setConfirmDeleteVisible(true);
  };

  // Load data when component mounts
  useEffect(() => {
    console.log("payments", payments);
    console.log("rooms", rooms);
    // Tải dữ liệu cơ bản
    dispatch(fetchRooms())
    dispatch(fetchData())
      .unwrap()
      .catch(error => {
        message.error('Không thể tải dữ liệu: ' + error);
      });

    // Tải dữ liệu thanh toán chi tiết
    dispatch(fetchAllPayments())
      .unwrap()
      .then(result => {
        console.log("Dữ liệu thanh toán đã được tải:", result);
      })
      .catch(error => {
        console.error("Không thể tải dữ liệu thanh toán:", error);
      });
  }, [dispatch]);

  // Handler functions
  const handleAddStudent = (values) => {
    dispatch(addStudent(values))
      .unwrap()
      .then(() => {
        message.success('Thêm sinh viên thành công!');
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((error) => {
        message.error('Lỗi khi thêm sinh viên: ' + error.message);
      });
  };

  const handleUpdateStudent = (values) => {
    if (!editingStudent) return;

    // Tạo đối tượng cập nhật với ID của sinh viên đang được sửa
    const updatedStudent = {
      id: editingStudent.id,
      ...values
    };
    
    // Sử dụng thunk updateStudent thay vì fetch trực tiếp
    dispatch(updateStudent(updatedStudent))
      .unwrap()
      .then(() => {
        message.success('Cập nhật sinh viên thành công!');
        setIsEditModalVisible(false);
        // Tải lại dữ liệu sau khi cập nhật
        dispatch(fetchData());
        dispatch(fetchAllPayments());
      })
      .catch((error) => {
        // Đảm bảo error là string
        const errorMessage = typeof error === 'string' 
          ? error 
          : (error.message || 'Lỗi khi cập nhật sinh viên');
        
        message.error(errorMessage);
      });
  };

  // Rest of your handler functions remain the same
  const confirmDelete = () => {
    if (studentToDelete) {
      dispatch(deleteStudent(studentToDelete.id))
        .unwrap()
        .then(() => {
          message.success('Xóa sinh viên thành công!');
          setConfirmDeleteVisible(false);
        })
        .catch((error) => {
          message.error('Lỗi khi xóa sinh viên: ' + error.message);
        });
    }
  };
  
  const handleSendNotification = (values) => {
    dispatch(sendNotification(values))
      .unwrap()
      .then(() => {
        message.success('Gửi thông báo thành công!');
        notificationForm.resetFields();
      })
      .catch((error) => {
        message.error('Lỗi khi gửi thông báo: ' + error.message);
      });
  };

  // Rest of your component remains the same

  // Render loading state
  if (loading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '50px' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Display error if any
  if (error) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <p>Đã xảy ra lỗi: {error}</p>
        <Button type="primary" onClick={() => dispatch(fetchData())}>
          Thử lại
        </Button>
      </div>
    );
  }

  // Your columns and other parts of the component remain the same
  const hasNotPaid = (studentId) => {
    // Đảm bảo payments là mảng
    if (!Array.isArray(payments)) {
      console.error("payments không phải là mảng:", payments);
      return true; // Mặc định hiển thị "chưa nộp tiền" nếu dữ liệu không hợp lệ
    }

    // Tìm sinh viên trong danh sách payments
    const student = payments.find(student => student.id === studentId);

    // Nếu không tìm thấy sinh viên hoặc sinh viên không có thanh toán
    if (!student || !student.payments || !Array.isArray(student.payments) || student.payments.length === 0) {
      return true; // Chưa nộp tiền
    }

    // Kiểm tra xem có thanh toán nào có status là 'paid' và payment_date không null
    const hasValidPayment = student.payments.some(payment =>
      payment.status === 'paid' && payment.payment_date !== null
    );

    return !hasValidPayment; // Nếu không có thanh toán hợp lệ thì là chưa nộp tiền
  };

  const columns = [
    // Your existing columns...
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phòng',
      dataIndex: 'room_id',
      key: 'room_id',
      render: (room_id) => {
        // Tìm phòng dựa trên id (không phải room_number)
        const room = rooms.find(r => r.id === room_id);

        // Log để debug
        console.log(`Finding room for room_id ${room_id}:`, room);

        return (
          <Space>
            <HomeOutlined />
            <span>{room ? room.room_number : room_id}</span>
          </Space>
        );
      },
      filters: rooms.map(room => ({ text: room.room_number, value: room.id })),
      onFilter: (value, record) => record.room_id === value,
    },
    {
      title: 'Trạng thái thanh toán',
      key: 'payment',
      render: (_, record) => (
        <Tag color={hasNotPaid(record.id) ? 'red' : 'green'}>
          {hasNotPaid(record.id) ? 'Chưa nộp tiền' : 'Đã nộp tiền'}
        </Tag>
      ),
      filters: [
        { text: 'Đã nộp tiền', value: true },
        { text: 'Chưa nộp tiền', value: false },
      ],
      onFilter: (value, record) => hasNotPaid(record.id) !== value,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => showEditModal(record)}
          >
            Sửa
          </Button>
          <Button
            icon={<MailOutlined />}
            size="small"
            onClick={() => {
              setNotification({ user_id: record.id.toString(), message: "" });
              notificationForm.setFieldsValue({ user_id: record.id.toString(), message: "" });
            }}
          >
            Thông báo
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => showDeleteConfirm(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="student-management-container">
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <UserAddOutlined /> Danh sách sinh viên
            </span>
          }
          key="1"
        >
          <Card
            title="Quản lý sinh viên"
            extra={
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => setIsModalVisible(true)}
              >
                Thêm sinh viên
              </Button>
            }
          >
            <Table
              columns={columns}
              dataSource={students}
              rowKey="id"
              rowClassName={record => hasNotPaid(record.id) ? 'unpaid-row' : ''}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <SendOutlined /> Gửi thông báo
            </span>
          }
          key="2"
        >
          <Card title="Gửi thông báo cho sinh viên">
            <Form
              form={notificationForm}
              layout="vertical"
              onFinish={handleSendNotification}
              initialValues={notification}
            >
              <Form.Item
                name="user_id"
                label="ID Sinh viên"
                rules={[{ required: true, message: 'Vui lòng nhập ID sinh viên!' }]}
              >
                <Input placeholder="Nhập ID sinh viên" />
              </Form.Item>

              <Form.Item
                name="message"
                label="Nội dung thông báo"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung thông báo!' }]}
              >
                <Input.TextArea rows={4} placeholder="Nhập nội dung thông báo" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                  Gửi thông báo
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>

      {/* Modal thêm sinh viên */}
      <Modal
        title="Thêm sinh viên mới"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddStudent}
          initialValues={newStudent}
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="room_id"
            label="Phòng"
            rules={[{ required: true, message: 'Vui lòng chọn phòng!' }]}
          >
            <Select placeholder="Chọn phòng">
              {rooms.map(room => (
                <Option key={room.id} value={room.id}>
                  {room.room_number} - {room.status} ({room.users?.length || 0}/{room.capacity})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Thêm sinh viên
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Modal sửa thông tin sinh viên */}
      <Modal
        title="Sửa thông tin sinh viên"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleUpdateStudent}
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="room_id"
            label="Phòng"
            rules={[{ required: true, message: 'Vui lòng chọn phòng!' }]}
          >
            <Select placeholder="Chọn phòng">
              {rooms.map(room => (
                <Option key={room.id} value={room.id}>
                  {room.room_number} - {room.status} ({room.users?.length || 0}/{room.capacity})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Lưu thay đổi
              </Button>
              <Button onClick={() => setIsEditModalVisible(false)}>
                Hủy
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Modal xác nhận xóa sinh viên */}
      <Modal
        title="Xác nhận xóa"
        open={confirmDeleteVisible}
        onOk={confirmDelete}
        onCancel={() => setConfirmDeleteVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa sinh viên này?</p>
        {studentToDelete && <p><strong>{studentToDelete.name}</strong></p>}
      </Modal>
    </div>
  );
};

export default StudentManagement;