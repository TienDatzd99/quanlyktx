import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../redux/slices/manageSlice';
import apiService from '../services/apiService';
import { Card, Row, Col, Avatar, Spin, Alert, Typography, Divider, List, Tag, Empty, Button, Modal, Form, Input, Select, message } from 'antd';
import { UserOutlined, HomeOutlined, TeamOutlined, ToolOutlined, WarningOutlined, AppstoreOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const UserDetails = () => {
  const dispatch = useDispatch();
  const { currentUser, loadingUser } = useSelector(state => state.manage);
  const { userLogin } = useSelector(state => state.auth || {});
  const user = currentUser || userLogin;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [loadingRoom, setLoadingRoom] = useState(false);
  const [roomItems, setRoomItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  
  // State cho modal báo cáo
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reportForm] = Form.useForm();

  // Fetch thông tin người dùng, phòng và danh sách vật dụng
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(fetchCurrentUser()).unwrap();
        
        // Lấy thông tin phòng dựa trên room_id của người dùng
        if (user?.room_id) {
          setLoadingRoom(true);
          try {
            const response = await apiService.getRoomById(user.room_id);
            setRoomDetails(response.data || response);
            
            // Lấy danh sách vật dụng trong phòng
            setLoadingItems(true);
            try {
              const itemsResponse = await apiService.getRoomItems(user.room_id);
              setRoomItems(itemsResponse.data || itemsResponse || []);
            } catch (itemsErr) {
              console.error('Error fetching room items:', itemsErr);
            } finally {
              setLoadingItems(false);
            }
          } catch (roomErr) {
            console.error('Error fetching room details:', roomErr);
          } finally {
            setLoadingRoom(false);
          }
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Không thể tải thông tin. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [dispatch, user?.room_id]);

  // Xử lý báo cáo vật dụng hỏng
  const handleReportItem = (item) => {
    setSelectedItem(item);
    reportForm.setFieldsValue({
      item_id: item.id,
      description: ''
    });
    setReportModalVisible(true);
  };

  // Gửi báo cáo vật dụng hỏng
  const submitItemReport = async (values) => {
    try {
      await apiService.reportDamagedItem(values.item_id, values.description);
      message.success('Báo cáo vật dụng hỏng thành công!');
      
      // Cập nhật trạng thái của vật dụng trong danh sách
      setRoomItems(prevItems => 
        prevItems.map(item => 
          item.id === values.item_id 
            ? { ...item, status: 'damaged' } 
            : item
        )
      );
      
      // Đóng modal và reset form
      setReportModalVisible(false);
      reportForm.resetFields();
    } catch (error) {
      message.error('Không thể báo cáo vật dụng: ' + (error.message || 'Đã xảy ra lỗi'));
    }
  };

  if (loading || loadingUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <Spin size="large" tip="Đang tải thông tin..." />
      </div>
    );
  }
  
  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon />;
  }
  
  if (!user) {
    return <Alert message="Vui lòng đăng nhập để xem thông tin." type="warning" showIcon />;
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>Thông tin cá nhân</Title>
      
      <Card bordered={true}>
        {/* Phần hiển thị thông tin cá nhân giữ nguyên */}
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <Avatar 
            size={80} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: '#1890ff', marginRight: '20px' }}
          />
          <div>
            <Title level={3} style={{ margin: 0 }}>{user.name}</Title>
            <Text type="secondary">{user.role === 'student' ? 'Sinh viên' : 'Quản lý'}</Text>
          </div>
        </div>
        
        <Divider />
        
        <Row style={{ marginBottom: '12px' }}>
          <Col span={6}><Text strong>ID:</Text></Col>
          <Col span={18}>{user.id}</Col>
        </Row>
        
        <Row style={{ marginBottom: '12px' }}>
          <Col span={6}><Text strong>Email:</Text></Col>
          <Col span={18}>{user.email}</Col>
        </Row>
        
        {user.room_id && (
          <Row style={{ marginBottom: '12px' }}>
            <Col span={6}>
              <Text strong>
                <HomeOutlined style={{ marginRight: '8px' }} />
                Phòng:
              </Text>
            </Col>
            <Col span={18}>{roomDetails?.room_number || user.room_id}</Col>
          </Row>
        )}
        
        {user.created_at && (
          <Row style={{ marginBottom: '12px' }}>
            <Col span={6}><Text strong>Ngày đăng ký:</Text></Col>
            <Col span={18}>{new Date(user.created_at).toLocaleDateString('vi-VN')}</Col>
          </Row>
        )}
        
        {user.phone && (
          <Row style={{ marginBottom: '12px' }}>
            <Col span={6}><Text strong>Số điện thoại:</Text></Col>
            <Col span={18}>{user.phone}</Col>
          </Row>
        )}
        
        {user.address && (
          <Row style={{ marginBottom: '12px' }}>
            <Col span={6}><Text strong>Địa chỉ:</Text></Col>
            <Col span={18}>{user.address}</Col>
          </Row>
        )}
      </Card>
      
      {/* Phần hiển thị thông tin phòng */}
      {user?.room_id && (
        <Card 
          title={
            <span>
              <HomeOutlined style={{ marginRight: '8px' }} />
              Chi tiết phòng đang ở
            </span>
          }
          style={{ marginTop: '24px' }}
          loading={loadingRoom}
        >
          {roomDetails ? (
            <>
              <Row style={{ marginBottom: '12px' }}>
                <Col span={6}><Text strong>Số phòng:</Text></Col>
                <Col span={18}>{roomDetails.room_number}</Col>
              </Row>
              
              <Row style={{ marginBottom: '12px' }}>
                <Col span={6}><Text strong>Loại phòng:</Text></Col>
                <Col span={18}>{roomDetails.type || 'Tiêu chuẩn'}</Col>
              </Row>
              
              <Row style={{ marginBottom: '12px' }}>
                <Col span={6}><Text strong>Sức chứa:</Text></Col>
                <Col span={18}>{roomDetails.capacity} người</Col>
              </Row>
              
              
              {/* Phần mới: Hiển thị danh sách vật dụng trong phòng */}
              <Divider orientation="left">
                <AppstoreOutlined /> Trang thiết bị phòng
              </Divider>
              
              {loadingItems ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spin tip="Đang tải danh sách vật dụng..." />
                </div>
              ) : roomItems && roomItems.length > 0 ? (
                <List
                  grid={{ gutter: 16, column: 2 }}
                  dataSource={roomItems}
                  renderItem={item => (
                    <List.Item>
                      <Card 
                        size="small" 
                        title={item.name}
                        extra={
                          <Tag color={item.status === 'active' ? 'green' : 'red'}>
                            {item.status === 'active' ? 'Hoạt động' : 'Đã hỏng'}
                          </Tag>
                        }
                        actions={[
                          item.status === 'active' && (
                            <Button 
                              type="link" 
                              danger 
                              icon={<WarningOutlined />}
                              onClick={() => handleReportItem(item)}
                            >
                              Báo hỏng
                            </Button>
                          )
                        ]}
                      >
                        <div>ID: {item.id}</div>
                        {item.description && <div>{item.description}</div>}
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Không có vật dụng nào trong phòng" />
              )}
              
              <Divider orientation="left">
                <TeamOutlined /> Sinh viên cùng phòng
              </Divider>
              
              {roomDetails.users && roomDetails.users.length > 0 ? (
                <List
                  dataSource={roomDetails.users}
                  renderItem={roomUser => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={
                          <div>
                            {roomUser.name}
                            {roomUser.id === user.id && (
                              <Tag color="blue" style={{ marginLeft: '8px' }}>Bạn</Tag>
                            )}
                          </div>
                        }
                        description={roomUser.email}
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Không có sinh viên nào trong phòng" />
              )}
            </>
          ) : (
            <Empty description="Không có thông tin chi tiết về phòng" />
          )}
        </Card>
      )}
      
      {/* Modal báo cáo vật dụng hỏng */}
      <Modal
        title={
          <span>
            <ToolOutlined style={{ marginRight: '8px' }} />
            Báo cáo vật dụng hỏng
          </span>
        }
        open={reportModalVisible}
        onCancel={() => setReportModalVisible(false)}
        footer={null}
      >
        <Form
          form={reportForm}
          layout="vertical"
          onFinish={submitItemReport}
        >
          <Form.Item
            name="item_id"
            label="Vật dụng"
            rules={[{ required: true, message: 'Vui lòng chọn vật dụng' }]}
          >
            <Input disabled value={selectedItem?.name} />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Mô tả vấn đề"
            rules={[{ required: true, message: 'Vui lòng mô tả vấn đề' }]}
          >
            <TextArea
              rows={4}
              placeholder="Mô tả chi tiết vấn đề của vật dụng..."
            />
          </Form.Item>
          
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button 
              style={{ marginRight: 8 }} 
              onClick={() => setReportModalVisible(false)}
            >
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" icon={<WarningOutlined />}>
              Báo cáo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserDetails;