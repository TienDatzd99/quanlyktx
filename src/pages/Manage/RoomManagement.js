import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRooms, addRoom } from "../../redux/slices/manageSlice";
import { Table, Button, Tag, Spin, Modal, Form, Input, InputNumber, Select, message } from "antd";
import { HomeOutlined, UserOutlined, ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./RoomManagement.css";

const { Option } = Select;

const RoomManagement = () => {
  const dispatch = useDispatch();
  const { rooms = [], loading = false, error = null } = useSelector((state) => state.manage);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [reloading, setReloading] = useState(false);
  // Lấy dữ liệu phòng khi component mount
  useEffect(() => {

    dispatch(fetchRooms())

      .unwrap()
      .catch(err => {
        console.error("Lỗi khi tải dữ liệu phòng:", err);
        message.error("Không thể tải danh sách phòng");
      });

  }, [dispatch]);

  const reloadRoomData = () => {
    setReloading(true);
    dispatch(fetchRooms())
      .unwrap()
      .then(result => {
        console.log("Rooms reloaded successfully:", result);
        setReloading(false);
      })
      .catch(err => {
        console.error("Lỗi khi tải lại dữ liệu phòng:", err);
        message.error("Không thể tải lại danh sách phòng");
        setReloading(false);
      });
  };
  // Hàm xử lý khi nhấn vào một phòng
  const handleRoomClick = (roomId) => {
    navigate(`/manage/rooms/${roomId}`);
  };

  // Hàm mở modal thêm phòng
  const showAddRoomModal = () => {
    setIsModalVisible(true);
  };

  // Hàm xử lý thêm phòng
  const handleAddRoom = (values) => {
    dispatch(addRoom(values))
      .unwrap()
      .then(() => {
        message.success("Thêm phòng thành công");
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch(err => {
        console.error("Lỗi khi thêm phòng:", err);
        message.error("Không thể thêm phòng");
      });
  };
  useEffect(() => {
    reloadRoomData(); // Sử dụng hàm tải lại thay vì gọi trực tiếp
  }, []);
  // Cấu hình các cột cho bảng
  const columns = [
    {
      title: 'Số phòng',
      dataIndex: 'room_number',
      key: 'room_number',
      render: (text) => <strong>{text}</strong>,
      sorter: (a, b) => a.room_number.localeCompare(b.room_number),
    },
    {
      title: 'Tầng',
      dataIndex: 'floor',
      key: 'floor',
      sorter: (a, b) => a.floor - b.floor,
    },
    {
      title: 'Sức chứa',
      key: 'capacity',
      render: (_, record) => `${record.users?.length || 0} / ${record.capacity}`,
      sorter: (a, b) => a.capacity - b.capacity,
    },
    {
      title: 'Sinh viên',
      key: 'users',
      render: (_, record) => (
        <span>
          {record.users && record.users.length > 0
            ? record.users.map(u => u.name).join(", ")
            : "Chưa có sinh viên"}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === "Trống" ? "green" : "blue"}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Trống', value: 'Trống' },
        { text: 'Đang sử dụng', value: 'Đang sử dụng' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Báo cáo',
      key: 'reports',
      render: (_, record) => (
        <span>
          {record.reports && record.reports.length > 0 ? (
            <Tag color="red">{record.reports.length} báo cáo</Tag>
          ) : (
            "Không có"
          )}
        </span>
      ),
      filters: [
        { text: 'Có báo cáo', value: true },
        { text: 'Không có báo cáo', value: false },
      ],
      onFilter: (value, record) =>
        value ? (record.reports && record.reports.length > 0) :
          !(record.reports && record.reports.length > 0),
    },
  ];

  // Hiển thị loading
  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Đang tải danh sách phòng..." />
      </div>
    );
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <div className="error-container">
        <ExclamationCircleOutlined style={{ fontSize: 48, color: 'red' }} />
        <h3>Đã xảy ra lỗi khi tải dữ liệu</h3>
        <p>{error}</p>
        <Button type="primary" onClick={() => dispatch(fetchRooms())}>
          Thử lại
        </Button>
      </div>
    );
  }

  return (
    <section className="room-management">
      <div className="room-header">
        <h2><HomeOutlined /> Quản Lý Phòng</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showAddRoomModal}
        >
          Thêm phòng mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={rooms}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => handleRoomClick(record.id),
        })}
        rowClassName={(record) =>
          record.reports && record.reports.length > 0 ? "has-reports" : ""
        }
      />

      {/* Modal thêm phòng */}
      <Modal
        title="Thêm phòng mới"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddRoom}
        >
          <Form.Item
            name="room_number"
            label="Số phòng"
            rules={[{ required: true, message: 'Vui lòng nhập số phòng!' }]}
          >
            <Input placeholder="Ví dụ: A101" />
          </Form.Item>

          <Form.Item
            name="floor"
            label="Tầng"
            rules={[{ required: true, message: 'Vui lòng nhập tầng!' }]}
          >
            <InputNumber min={1} placeholder="Ví dụ: 1" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Sức chứa"
            rules={[{ required: true, message: 'Vui lòng nhập sức chứa!' }]}
          >
            <InputNumber min={1} placeholder="Ví dụ: 4" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            initialValue="Trống"
          >
            <Select>
              <Option value="Trống">Trống</Option>
              <Option value="Đang sử dụng">Đang sử dụng</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button style={{ marginRight: 8 }} onClick={() => setIsModalVisible(false)}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                Thêm phòng
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
};

export default RoomManagement;