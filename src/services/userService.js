import API from '../api'; 

// 1. Get Logged-in User Profile
export const getUserProfile = async () => {
  try {
    const response = await API.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// 2. Get All Users (Super Manager / Admin ke liye)
export const getAllUsers = async () => {
  try {
    const response = await API.get('/users');
    return response.data;
  } catch (error) {
    console.error("Error fetching users list:", error);
    throw error;
  }
};

// 3. Get Active Sessions
export const getUserSessions = async () => {
  try {
    const response = await API.get('/users/sessions');
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

// 4. Update User Role
export const updateUserRole = async (userId, newRole) => {
  try {
    // Body mein { role: "MANAGER" } ya jo backend ki requirement ho
    const response = await API.put(`/users/${userId}/role`, { role: newRole });
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};