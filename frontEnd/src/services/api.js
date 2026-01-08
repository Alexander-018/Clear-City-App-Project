import axios from 'axios';

// =====================================================================
// 🔴 CONFIGURARE URL BACKEND
// =====================================================================
export const SERVER_URL = 'https://clear-city-app-project-production.up.railway.app';

// URL-ul pentru API
const API_URL = `${SERVER_URL}/api`;

const api = axios.create({
  baseURL: API_URL, 
});

// Alege storage-ul dorit (localStorage = permanent, sessionStorage = dispare la închiderea tab-ului)
const storage = localStorage; 

const getAuthHeader = () => {
  const token = storage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// 🟢 MODIFICARE CRITICĂ AICI
const handleResponse = async (response) => {
  // 1. Verificăm dacă token-ul a expirat (401) sau e invalid (403)
  if (response.status === 401 || response.status === 403) {
    // Ștergem datele utilizatorului
    storage.removeItem('token');
    storage.removeItem('user');
    
    // Forțăm reîmprospătarea paginii pentru a ajunge la Login
    // Doar dacă nu suntem deja pe pagina de login (ca să nu facem loop infinit)
    if (window.location.pathname !== '/') {
        window.location.href = '/';
    }
    
    throw new Error('Sesiunea a expirat. Te rugăm să te autentifici din nou.');
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Ceva nu a mers bine');
  }
  return data;
};

// ======================
// AUTHENTICATION
// ======================

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    // Nu folosim handleResponse aici direct pentru a putea salva tokenul
    if (response.status === 401) throw new Error('Email sau parolă incorectă');
    
    const data = await response.json();
    
    if (data.token) {
      storage.setItem('token', data.token);
      storage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  register: async (name, email, password, location, latitude, longitude) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, location, latitude, longitude })
    });
    
    const data = await handleResponse(response); // Aici putem folosi handleResponse
    
    if (data.token) {
      storage.setItem('token', data.token);
      storage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  logout: () => {
    storage.removeItem('token');
    storage.removeItem('user');
    window.location.href = '/'; // Redirect la login
  },

  isAuthenticated: () => {
    return !!storage.getItem('token');
  },

  getCurrentUser: () => {
    const userStr = storage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

// ======================
// REPORTS
// ======================

export const reportsAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/reports?${params}`, {
        headers: getAuthHeader() // Adaugam auth header si aici pt siguranta
    });
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/reports/${id}`);
    return handleResponse(response);
  },

  create: async (reportData) => {
    const formData = new FormData();
    formData.append('latitude', reportData.latitude);
    formData.append('longitude', reportData.longitude);
    formData.append('description', reportData.description);
    
    if (reportData.location_name) {
      formData.append('location_name', reportData.location_name);
    }
    
    if (reportData.image) {
      formData.append('image', reportData.image);
    }

    const response = await fetch(`${API_URL}/reports`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: formData
    });
    
    return handleResponse(response);
  },

  updateStatus: async (id, status) => {
    const response = await fetch(`${API_URL}/reports/${id}`, {
      method: 'PATCH',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/reports/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return handleResponse(response);
  }
};

// ======================
// USER PROFILE
// ======================

export const userAPI = {
  getProfile: async () => {
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  updateProfile: async (profileData) => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PATCH',
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });
    return handleResponse(response);
  },

  uploadProfileImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('profileImage', imageFile);

    const response = await fetch(`${API_URL}/users/profile/image`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: formData
    });
    return handleResponse(response);
  },

  getLeaderboard: async () => {
    const response = await fetch(`${API_URL}/users/leaderboard`);
    return handleResponse(response);
  }
};

// ======================
// ADMIN
// ======================

export const adminAPI = {
  getStats: async () => {
    const response = await fetch(`${API_URL}/admin/stats`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  getAllUsers: async () => {
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  getAdmins: async () => {
    const response = await fetch(`${API_URL}/admin/admins`, {
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  promoteToAdmin: async (email) => {
    const response = await fetch(`${API_URL}/admin/promote/${email}`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    return handleResponse(response);
  },

  demoteAdmin: async (email) => {
    const response = await fetch(`${API_URL}/admin/demote/${email}`, {
      method: 'POST',
      headers: getAuthHeader()
    });
    return handleResponse(response);
  }
};

// Export default
export default {
  auth: authAPI,
  reports: reportsAPI,
  user: userAPI,
  admin: adminAPI
};
