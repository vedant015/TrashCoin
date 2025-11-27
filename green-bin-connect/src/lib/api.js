const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }
    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  },

  getUserDetails: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/auth/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }
    return data;
  },
};

export const pickupAPI = {
  createRequest: async (requestData) => {
    const response = await fetch(`${API_BASE_URL}/pickup-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to create pickup request');
    }
    return data;
  },

  getUserRequests: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/pickup-requests/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch pickup requests');
    }
    return data;
  },

  getAllRequests: async () => {
    const response = await fetch(`${API_BASE_URL}/pickup-requests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch pickup requests');
    }
    return data;
  },

  updateStatus: async (requestId, status, coinsEarned = null) => {
    const body = { status };
    if (coinsEarned !== null) {
      body.coinsEarned = coinsEarned;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/pickup-requests/${requestId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Server error: ${response.status}`);
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update pickup request status');
      }
      return data;
    } catch (error) {
      console.error('Update status error:', error);
      throw error;
    }
  },
};
