import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Tabs, Table, Modal, Form, Input, Select, Tag, Card, Row, Col, Typography, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, ToolOutlined, WarningOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import './RoomDetail.css';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Lấy dữ liệu phòng từ Redux
  const { rooms = [] } = useSelector((state) => state.manage);
  const room = rooms.find(r => r.id === parseInt(id)) || null;
  
  // State cho modal thêm/sửa
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Xử lý khi không tìm thấy phòng
  if (!room) {
    return (
      <div className="room-not-found">
        <h2>Không tìm thấy thông tin phòng</h2>
        <Button type="primary" onClick={() => navigate('/manage/rooms')}>
          <ArrowLeftOutlined /> Quay lại danh sách phòng
        </Button>
      </div>
    );
  }

  // Columns cho bảng sinh viên
  const studentColumns = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, student) => (
        <>
          <Button 
            icon={<EditOutlined />} 
            size="small" 
            style={{ marginRight: 8 }}
            onClick={() => {
              setModalType('edit-student');
              setSelectedItem(student);
              setIsModalVisible(true);
            }}
          />
          <Button 
            icon={<DeleteOutlined />} 
            size="small" 
            danger
            onClick={() => handleRemoveStudent(student.id)}
          />
        </>
      ),
    },
  ];

  // Columns cho bảng đồ dùng
  const itemColumns = [
    {
      title: 'Tên đồ dùng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Tốt' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, item) => (
        <>
          <Button 
            icon={<EditOutlined />} 
            size="small" 
            style={{ marginRight: 8 }}
            onClick={() => {
              setModalType('edit-item');
              setSelectedItem(item);
              setIsModalVisible(true);
            }}
          />
          <Button 
            icon={<DeleteOutlined />} 
            size="small" 
            danger
            onClick={() => handleRemoveItem(item.id)}
          />
        </>
      ),
    },
  ];

  // Columns cho bảng báo cáo
  const reportColumns = [
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Đã xử lý' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Ngày báo cáo',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, report) => (
        <>
          <Button 
            icon={<EditOutlined />} 
            size="small" 
            style={{ marginRight: 8 }}
            onClick={() => {
              setModalType('edit-report');
              setSelectedItem(report);
              setIsModalVisible(true);
            }}
          />
          <Button 
            icon={<DeleteOutlined />} 
            size="small" 
            danger
            onClick={() => handleRemoveReport(report.id)}
          />
        </>
      ),
    },
  ];

  // Các hàm xử lý
  const handleRemoveStudent = (studentId) => {
    // Xử lý xóa sinh viên khỏi phòng
    console.log(`Xóa sinh viên ${studentId} khỏi phòng ${room.id}`);
  };

  const handleRemoveItem = (itemId) => {
    // Xử lý xóa đồ dùng
    console.log(`Xóa đồ dùng ${itemId} khỏi phòng ${room.id}`);
  };

  const handleRemoveReport = (reportId) => {
    // Xử lý xóa báo cáo
    console.log(`Xóa báo cáo ${reportId} khỏi phòng ${room.id}`);
  };

  const handleModalOk = () => {
    // Xử lý khi nhấn OK trong modal
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  // Hiển thị modal theo loại
  const renderModal = () => {
    if (!modalType) return null;

    if (modalType === 'edit-student') {
      return (
        <Modal
          title="Chỉnh sửa thông tin sinh viên"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Form
            layout="vertical"
            initialValues={selectedItem}
          >
            <Form.Item label="Tên sinh viên" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      );
    }

    if (modalType === 'edit-item') {
      return (
        <Modal
          title="Chỉnh sửa đồ dùng"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Form
            layout="vertical"
            initialValues={selectedItem}
          >
            <Form.Item label="Tên đồ dùng" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Trạng thái" name="status">
              <Select>
                <Option value="Tốt">Tốt</Option>
                <Option value="Cần sửa chữa">Cần sửa chữa</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      );
    }

    if (modalType === 'edit-report') {
      return (
        <Modal
          title="Cập nhật báo cáo sự cố"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Form
            layout="vertical"
            initialValues={selectedItem}
          >
            <Form.Item label="Mô tả" name="description">
              <Input />
            </Form.Item>
            <Form.Item label="Trạng thái" name="status">
              <Select>
                <Option value="Đang xử lý">Đang xử lý</Option>
                <Option value="Đã xử lý">Đã xử lý</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  };

  return (
    <div className="room-detail-container">
      <div className="room-detail-header">
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/manage/rooms')}
          className="back-button"
        >
          Quay lại
        </Button>
        <Title level={2}>Chi tiết phòng {room.room_number}</Title>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Thông tin cơ bản" bordered={false}>
            <div className="info-item">
              <Text strong>Số phòng:</Text>
              <Text>{room.room_number}</Text>
            </div>
            <div className="info-item">
              <Text strong>Tầng:</Text>
              <Text>{room.floor}</Text>
            </div>
            <div className="info-item">
              <Text strong>Sức chứa:</Text>
              <Text>{room.capacity} người</Text>
            </div>
            <div className="info-item">
              <Text strong>Đang ở:</Text>
              <Text>{room.users?.length || 0} người</Text>
            </div>
            <div className="info-item">
              <Text strong>Trạng thái:</Text>
              <Tag color={room.status === "Trống" ? "green" : "blue"}>
                {room.status}
              </Tag>
            </div>
          </Card>
        </Col>
        
        <Col span={16}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane 
                tab={
                  <span>
                    <UserOutlined />
                    Sinh viên ({room.users?.length || 0})
                  </span>
                } 
                key="1"
              >
                <div className="tab-header">
                  <Button 
                    type="primary" 
                    onClick={() => {
                      setModalType('add-student');
                      setSelectedItem(null);
                      setIsModalVisible(true);
                    }}
                  >
                    Thêm sinh viên
                  </Button>
                </div>
                <Table 
                  columns={studentColumns} 
                  dataSource={room.users || []} 
                  rowKey="id" 
                  size="middle"
                  pagination={false}
                />
              </TabPane>

              <TabPane 
                tab={
                  <span>
                    <ToolOutlined />
                    Đồ dùng ({room.items?.length || 0})
                  </span>
                } 
                key="2"
              >
                <div className="tab-header">
                  <Button 
                    type="primary" 
                    onClick={() => {
                      setModalType('add-item');
                      setSelectedItem(null);
                      setIsModalVisible(true);
                    }}
                  >
                    Thêm đồ dùng
                  </Button>
                </div>
                <Table 
                  columns={itemColumns} 
                  dataSource={room.items || []} 
                  rowKey="id" 
                  size="middle"
                  pagination={false}
                />
              </TabPane>

              <TabPane 
                tab={
                  <span>
                    <WarningOutlined />
                    Báo cáo sự cố ({room.reports?.length || 0})
                  </span>
                } 
                key="3"
              >
                <div className="tab-header">
                  <Button 
                    type="primary" 
                    onClick={() => {
                      setModalType('add-report');
                      setSelectedItem(null);
                      setIsModalVisible(true);
                    }}
                  >
                    Thêm báo cáo
                  </Button>
                </div>
                <Table 
                  columns={reportColumns} 
                  dataSource={room.reports || []} 
                  rowKey="id" 
                  size="middle"
                  pagination={false}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      {renderModal()}
    </div>
  );
};

export default RoomDetail;