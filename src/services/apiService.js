import axios from "axios";

// Cập nhật URL để khớp với backend
const API_URL = "http://127.0.0.1:8000/api"; // Đảm bảo tiền tố /api

const apiService = {
  signup: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData); // Đảm bảo endpoint /register
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getStudents: async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Fetching students with token:", token ? "Token exists" : "No token found");

      const response = await axios.get(`${API_URL}/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Students API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error.response?.data || error.message);
      throw error;
    }
  },

  addStudent: async (studentData) => {
    try {
      const response = await axios.post(`${API_URL}/students`, studentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteStudent: async (id) => {
    try {
      await axios.delete(`${API_URL}/students/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (error) {
      throw error;
    }
  },
  updateStudent: async (studentData) => {
    try {
      const response = await axios.put(`${API_URL}/students/${studentData.id}`, studentData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Student update response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating student:", error.response?.data || error.message);
      throw error;
    }
  },

  sendNotification: async (notificationData) => {
    try {
      await axios.post(`${API_URL}/students/notify`, notificationData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (error) {
      throw error;
    }
  },
  getAllPayments: async () => {
    try {
      const response = await axios.get(`${API_URL}/students/pending-payments`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Payment data from API:", response.data);

      // Đảm bảo trả về một mảng
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data && typeof response.data === 'object') {
        // Nếu response.data là một object, thử lấy mảng từ data hoặc results
        if (Array.isArray(response.data.data)) {
          return response.data.data;
        } else if (Array.isArray(response.data.results)) {
          return response.data.results;
        } else {
          // Trả về mảng rỗng nếu không tìm thấy mảng
          console.warn("API không trả về mảng payments, trả về mảng rỗng");
          return [];
        }
      }
      // Fallback - trả về mảng rỗng
      return [];
    } catch (error) {
      console.error("Error fetching payments:", error.response?.data || error.message);
      throw error;
    }
  },

  getPendingPayments: async () => {
    try {
      const response = await axios.get(`${API_URL}/students/pending-payments`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRooms: async () => {
    try {
      const response = await axios.get(`${API_URL}/rooms`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Room data from API:", response.data);

      // Đảm bảo trả về dữ liệu API, không dùng dữ liệu tĩnh
      return response.data;
    } catch (error) {
      console.error("Error fetching rooms:", error.response?.data || error.message);
      throw error;
    }
  },

  getStats: async () => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Fetching current user with token:", token ? "Token exists" : "No token found");

      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:", error.response?.data || error.message);
      throw error;
    }
  },
  getRoomById: async (roomId) => {
    try {
      const response = await axios.get(`${API_URL}/rooms/id/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching room:", error);
      throw error;
    }
  },
  // Lấy danh sách item của phòng
 getRoomItems: async (roomId) => {
    try {
      const response = await axios.get(`${API_URL}/rooms/${roomId}/items`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  },

// Báo cáo item bị hỏng
 reportDamagedItem: async (itemId, description) => {
    try {
      const response = await axios.post(`${API_URL}/items/${itemId}/report`,
        { description },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      return response.data;
    } catch (error) {
      console.error("Error reporting item:", error);
      throw error;
    }
  }
};


export default apiService;