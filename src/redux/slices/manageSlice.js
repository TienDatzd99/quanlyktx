import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";


const currentUser = {
  id: 1,
  name: "Nguyễn Văn A",
  email: "student1@example.com",
  room_id: "A101"
}
// Dữ liệu tĩnh cho sinh viên
const staticStudents = [
  { id: 1, name: "Nguyễn Văn A", email: "student1@example.com", room_id: "A101" },
  { id: 2, name: "Trần Thị B", email: "student2@example.com", room_id: "A101" },
  { id: 3, name: "Lê Văn C", email: "student3@example.com", room_id: "A102" },
  { id: 4, name: "Phạm Thị D", email: "student4@example.com", room_id: "B201" },
];

// Dữ liệu tĩnh cho thanh toán
const staticPayments = [
  { user_id: 1, type: "monthly", payment_date: "2025-05-18" },
  { user_id: 2, type: "monthly", payment_date: null }, // Chưa nộp
  { user_id: 3, type: "monthly", payment_date: null }, // Chưa nộp
  { user_id: 4, type: "monthly", payment_date: "2025-05-23" },
];

// Dữ liệu tĩnh cho phòng
const staticRooms = [
  {
    id: 1,
    room_number: "A101",
    floor: 1,
    capacity: 4,
    status: "Đang sử dụng",
    users: [
      { id: 1, name: "Nguyễn Văn A" },
      { id: 2, name: "Trần Thị B" }
    ],
    items: [
      { id: 1, name: "Giường tầng", status: "Tốt" },
      { id: 2, name: "Bàn học", status: "Cần sửa chữa" },
      { id: 3, name: "Tủ quần áo", status: "Tốt" }
    ],
    reports: [
      { id: 1, description: "Bóng đèn hỏng", status: "Đang xử lý", date: "2025-05-10" }
    ]
  },
  {
    id: 2,
    room_number: "A102",
    floor: 1,
    capacity: 4,
    status: "Đang sử dụng",
    users: [
      { id: 3, name: "Lê Văn C" }
    ],
    items: [
      { id: 4, name: "Giường tầng", status: "Tốt" },
      { id: 5, name: "Bàn học", status: "Tốt" },
      { id: 6, name: "Tủ quần áo", status: "Tốt" }
    ],
    reports: []
  },
  {
    id: 3,
    room_number: "B201",
    floor: 2,
    capacity: 2,
    status: "Đang sử dụng",
    users: [
      { id: 4, name: "Phạm Thị D" }
    ],
    items: [
      { id: 7, name: "Giường đơn", status: "Tốt" },
      { id: 8, name: "Bàn học", status: "Tốt" },
      { id: 9, name: "Tủ quần áo", status: "Tốt" }
    ],
    reports: []
  },
  {
    id: 4,
    room_number: "B202",
    floor: 2,
    capacity: 2,
    status: "Trống",
    users: [],
    items: [
      { id: 10, name: "Giường đơn", status: "Tốt" },
      { id: 11, name: "Bàn học", status: "Tốt" },
      { id: 12, name: "Tủ quần áo", status: "Tốt" }
    ],
    reports: []
  }
];

// Dữ liệu tĩnh cho thống kê
const staticStats = {
  occupancy_rate: 80,
  revenue: [
    { month: "Tháng 1", total: 1200000 },
    { month: "Tháng 2", total: 1500000 },
    { month: "Tháng 3", total: 2300000 },
    { month: "Tháng 4", total: 1800000 },
    { month: "Tháng 5", total: 2000000 }
  ],
  average_rating: 4.5,
  totalStudents: 120,
  availableRooms: 5,
  reportsCount: 2
};

// Thêm các thunk mới cho phòng
export const fetchData = createAsyncThunk(
  "manage/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Starting to fetch data from API...");

      // Lấy dữ liệu sinh viên
      const studentsResponse = await apiService.getStudents();
      console.log("Students data received:", studentsResponse);

      // Lấy dữ liệu thanh toán
      let paymentsResponse = [];
      try {
        paymentsResponse = await apiService.getAllPayments();
        console.log("Payment data received:", paymentsResponse);
      } catch (paymentError) {
        console.error("Error fetching payments:", paymentError);
      }
      let roomsResponse = staticRooms;
      try {
        roomsResponse = await apiService.getRooms();
        console.log("Rooms data received:", roomsResponse);
      } catch (roomsError) {
        console.error("Error fetching rooms:", roomsError);
      }
      // Dùng dữ liệu tĩnh cho phần còn lại
      return {
        students: studentsResponse,
        payments: paymentsResponse,
        rooms: roomsResponse,
        stats: staticStats
      };
    } catch (error) {
      console.error("Error in fetchData:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thêm các thunk riêng lẻ để gọi khi cần
export const fetchRooms = createAsyncThunk(
  "manage/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getRooms();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPayments = createAsyncThunk(
  "manage/fetchPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getPendingPayments();
      console.log("Payments data received:", response);
      return response;

    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchStats = createAsyncThunk(
  "manage/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getStats();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addRoom = createAsyncThunk(
  "manage/addRoom",
  async (roomData) => {
    // Thực tế sẽ gọi API
    const response = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    });
    return response.json();
  }
);

export const deleteRoom = createAsyncThunk(
  "manage/deleteRoom",
  async (id) => {
    // Thực tế sẽ gọi API
    await fetch(`/api/rooms/${id}`, { method: "DELETE" });
    return id;
  }
);

// Các thunk đã có
export const addStudent = createAsyncThunk(
  "manage/addStudent",
  async (studentData) => {
    const response = await apiService.addStudent(studentData);
    return response;
  }
);

export const deleteStudent = createAsyncThunk(
  "manage/deleteStudent",
  async (id) => {
    await apiService.deleteStudent(id);
    return id;
  }
);

export const sendNotification = createAsyncThunk(
  "manage/sendNotification",
  async (notificationData) => {
    const response = await apiService.sendNotification(notificationData);
    return response;
  }
);
export const fetchAllPayments = createAsyncThunk(
  "manage/fetchAllPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getAllPayments();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchCurrentUser = createAsyncThunk(
  "manage/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching current user information...");
      const response = await apiService.getCurrentUser();
      console.log("Current user data received:", response);
      
      // Kiểm tra response
      if (!response) {
        console.error("Response is empty");
        return rejectWithValue("Không nhận được dữ liệu người dùng");
      }
      
      // Xử lý cấu trúc response khác nhau
      const userData = response.data || response;
      return userData;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return rejectWithValue(error.response?.data || error.message || "Lỗi khi lấy thông tin người dùng");
    }
  }
);
// Cập nhật fetchData để cũng lấy dữ liệu thanh toán
export const updateStudent = createAsyncThunk(
  "manage/updateStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await apiService.updateStudent(studentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const manageSlice = createSlice({
  name: "manage",
  initialState: {
    students: staticStudents,
    payments: staticPayments,
    rooms: staticRooms,
    stats: staticStats,
    paidStudents: [], // Thêm state mới để lưu danh sách sinh viên đã thanh toán
    loadingPaidStudents: false, // Thêm state để theo dõi trạng thái loading
    currentUser: currentUser, // Thêm state để lưu thông tin người dùng hiện tại
    loadingUser: false, // State theo dõi trạng thái loading của user
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Xử lý fetchData
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log("fetchData.fulfilled with payload:", action.payload);
        console.log("fetchData.fulfilled with payload:", action.payload.payments);


        // Cập nhật dữ liệu sinh viên
        if (action.payload.students) {
          state.students = action.payload.students;
          console.log("Student state updated:", state.students);
        }

        // Cập nhật dữ liệu phòng
        if (action.payload.rooms) {
          state.rooms = action.payload.rooms;
        }

        // Cập nhật dữ liệu thanh toán
        if (action.payload.payments) {
          state.payments = action.payload.payments;
        }

        // Cập nhật dữ liệu thống kê
        if (action.payload.stats) {
          state.stats = action.payload.stats;
        }

        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.error("fetchData.rejected:", action.payload);
        state.loading = false;
        state.error = action.payload || "Lỗi khi tải dữ liệu";
      })

      // Xử lý fetchRooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        // Kiểm tra dữ liệu hợp lệ trước khi cập nhật
        if (action.payload && (Array.isArray(action.payload) || action.payload.length > 0)) {
          state.rooms = action.payload;
          console.log("Rooms data updated from API:", action.payload);
        } else {
          console.warn("API returned invalid rooms data:", action.payload);
          // Giữ nguyên dữ liệu hiện tại nếu dữ liệu API không hợp lệ
        }
        state.loading = false;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Thêm vào extraReducers
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        // Tìm sinh viên trong mảng students và cập nhật
        const index = state.students.findIndex(student => student.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể cập nhật sinh viên";
      })
      // Xử lý fetchPayments
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
        state.loading = false;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Xử lý fetchStats
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
        state.loading = false;
        console.log("All payments updated:", state.payments);
      })
      .addCase(fetchAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể tải dữ liệu thanh toán";
      })

      // Xử lý add student
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
        state.loading = false;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Xử lý delete student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Xử lý add room
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.rooms.push(action.payload);
        state.loading = false;
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Xử lý delete room
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter(
          (room) => room.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Thêm xử lý fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loadingUser = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = action.payload || "Không thể tải thông tin người dùng";
      });

  },
});

export const { clearError } = manageSlice.actions;
export default manageSlice.reducer;