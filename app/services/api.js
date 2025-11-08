import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://localhost:5000';

// Auth Service
export const authService = {
  // Signup
  signup: async (fullName, email, phone, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Save token to AsyncStorage
        if (data.token) {
          await AsyncStorage.setItem('authToken', data.token);
        }
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Signup failed' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Signin
  signin: async (email, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Save token to AsyncStorage
        if (data.token) {
          await AsyncStorage.setItem('authToken', data.token);
        }
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Signout
  signout: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await fetch(`${BASE_URL}/auth/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        // Remove token from AsyncStorage
        await AsyncStorage.removeItem('authToken');
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Change Password
  changePassword: async (oldPassword, newPassword) => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await fetch(`${BASE_URL}/auth/change-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};

// Medication Service
export const medicationService = {
  // Add Medication
  addMedication: async (medicationData) => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await fetch(`${BASE_URL}/reminder/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(medicationData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Get All Medications
  getMedications: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await fetch(`${BASE_URL}/reminder/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Update Reminder Status
  updateReminderStatus: async (reminderId, status) => {
    try {
      const token = await AsyncStorage.getItem('authToken');

      const response = await fetch(`${BASE_URL}/reminder/update-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          reminderId,
          status, // 'Taken', 'Remind Later', 'Skipped', 'Pending'
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};

// Helper to get current auth token
export const getAuthToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

// Helper to check if user is logged in
export const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return !!token;
};

// Helper to logout
export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
};