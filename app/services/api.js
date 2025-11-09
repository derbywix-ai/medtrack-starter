import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL
const BASE_URL = 'https://medtrack-api-wgtk.onrender.com/api';

// Auth Service
export const authService = {
  // Signup
  signup: async (fullName, email, phone, password) => {
    try {
      console.log('Signup attempt:', { fullName, email, phone });
      
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
      console.log('Signup response status:', response.status);
      console.log('Signup response data:', JSON.stringify(data, null, 2));
      console.log('Error message from backend:', data.message);

      if (data.success) {
        if (data.token) {
          await AsyncStorage.setItem('authToken', data.token);
        }
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Signup failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: error.message };
    }
  },

  // Signin
  signin: async (email, password) => {
    try {
      console.log('Signin attempt:', { email });
      
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
      console.log('Signin response status:', response.status);
      console.log('Signin response data:', JSON.stringify(data, null, 2));
      console.log('Error message from backend:', data.message);

      if (data.success) {
        if (data.token) {
          await AsyncStorage.setItem('authToken', data.token);
        }
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Signin error:', error);
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
      
      if (!token) {
        console.error('❌ No token found! User may not be logged in.');
        return { success: false, message: 'Unauthorized: No token found' };
      }

      console.log('📤 Adding medication with token:', token.substring(0, 20) + '...');

      const response = await fetch(`${BASE_URL}/reminder/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(medicationData),
      });

      const data = await response.json();
      console.log('📥 Add medication response:', data);
      return data;
    } catch (error) {
      console.error('❌ Add medication error:', error);
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
          status,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};

// Helper functions
export const getAuthToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const isLoggedIn = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return !!token;
};

export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
};