import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Typography, Divider, message, Row, Col, Space } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined } from '@ant-design/icons';
import './Login.css';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: values.email,
        password: values.password
      });
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      message.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Đăng nhập thất bại. Vui lòng kiểm tra email hoặc mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-wave"></div>
      </div>
      
      <Row justify="center" align="middle" className="login-row">
        <Col xs={22} sm={20} md={16} lg={10} xl={8}>
          <div className="login-logo">
            <img src="/logo.png" alt="Logo KTX" />
            <Title level={2}>Hệ thống quản lý KTX</Title>
          </div>
          
          <Card 
            bordered={false} 
            className="login-card"
            title={<Title level={2} className="login-title">Đăng nhập</Title>}
          >
            <Button 
              icon={<GoogleOutlined />} 
              block 
              size="large"
              className="google-login-btn"
            >
              Đăng nhập với Google
            </Button>
            
            <Divider className="login-divider">
              <Text type="secondary">HOẶC</Text>
            </Divider>
            
            <Form
              name="login_form"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
              size="large"
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không hợp lệ!' }
                ]}
              >
                <Input 
                  prefix={<UserOutlined className="site-form-item-icon" />} 
                  placeholder="Email" 
                  size="large"
                />
              </Form.Item>
              
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Mật khẩu"
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  size="large"
                />
              </Form.Item>
              
              <Form.Item>
                <Space size="large" style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                  </Form.Item>
                  
                  <Link to="/reset-password" className="login-form-forgot">
                    Quên mật khẩu?
                  </Link>
                </Space>
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block
                  size="large"
                  loading={loading}
                  className="login-button"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
              
              <div className="login-footer">
                <Text>Chưa có tài khoản? </Text>
                <Link to="/signup">Đăng ký ngay</Link>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;