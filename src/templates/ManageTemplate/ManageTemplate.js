import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStudent,
  deleteStudent,
  sendNotification,
  fetchData
} from '../../redux/slices/manageSlice';
import './manageTemplate.css'; // File CSS tùy chỉnh

const { Header, Content, Sider } = Layout;

const ManageTemplate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { students, payments, loading, error } = useSelector((state) => state.manage);
  
  // Fetch dữ liệu khi component mount
  useEffect(() => {
    dispatch(fetchData())
      .unwrap()
      .catch(error => {
        console.error("Không thể tải dữ liệu:", error);
      });
  }, [dispatch]);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Xác định key đang được chọn dựa trên URL hiện tại
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/manage/students')) return '1';
    if (path.includes('/manage/rooms')) return '5';
    // Thêm các điều kiện khác nếu cần
    return '1'; // Mặc định là Dashboard
  };

  // Menu chính
  const items1 = ['Dashboard', 'Quản lý', 'Thông báo'].map((label, index) => ({
    key: String(index + 1),
    label: label,
    onClick: () => {
      if (index === 0) navigate('/manage'); // Dashboard
    }
  }));

  // Menu sidebar với chức năng điều hướng
  const items2 = [
    {
      key: 'sub1',
      icon: <UserOutlined />,
      label: 'Quản lý sinh viên',
      children: [
        { 
          key: '1', 
          label: 'Danh sách sinh viên',
          onClick: () => navigate('/manage/students')
        },
       
        { 
          key: '2', 
          label: 'Xử lý yêu cầu',
          onClick: () => navigate('/manage/students/requests')
        },
        { 
          key: '3', 
          label: 'Thống kê',
          onClick: () => navigate('/manage/students/stats')
        },
      ],
    },
    {
      key: 'sub2',
      icon: <LaptopOutlined />,
      label: 'Quản lý phòng',
      children: [
        { 
          key: '5', 
          label: 'Danh sách phòng',
          onClick: () => navigate('/manage/rooms')
        },
        { 
          key: '6', 
          label: 'Phân phòng',
          onClick: () => navigate('/manage/rooms/assign')
        },
        { 
          key: '7', 
          label: 'Bảo trì',
          onClick: () => navigate('/manage/rooms/maintenance')
        },
        { 
          key: '8', 
          label: 'Thống kê',
          onClick: () => navigate('/manage/rooms/stats')
        },
      ],
    },
    {
      key: 'sub3',
      icon: <NotificationOutlined />,
      label: 'Thông báo',
      children: [
        { 
          key: '9', 
          label: 'Gửi thông báo',
          onClick: () => navigate('/manage/notifications/send')
        },
        { 
          key: '10', 
          label: 'Lịch sử thông báo',
          onClick: () => navigate('/manage/notifications/history')
        },
        { 
          key: '11', 
          label: 'Cài đặt',
          onClick: () => navigate('/manage/notifications/settings')
        },
        { 
          key: '12', 
          label: 'Mẫu thông báo',
          onClick: () => navigate('/manage/notifications/templates')
        },
      ],
    },
  ];

  // Các hàm xử lý khác giữ nguyên
  const handleAddStudent = (studentData) => {
    dispatch(addStudent(studentData))
      .unwrap()
      .catch((error) => {
        console.error("Error adding student:", error);
      });
  };

  // Các hàm khác...

  return (
    <Layout>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Đang tải dữ liệu...</div>
        </div>
      )}
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[getSelectedKey()]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
            selectedKeys={[getSelectedKey()]} // Đảm bảo menu luôn hiển thị đúng mục đang chọn
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[{ title: 'Trang chủ' }, { title: 'Quản lý' }, { title: 'Sinh viên' }]}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ManageTemplate;