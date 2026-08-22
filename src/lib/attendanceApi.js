const ATTENDANCE_API_BASE = 'https://attendance-service-production-e73b.up.railway.app';

export const getDeviceId = () => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = 'device-' + Date.now() + '-' + Math.random().toString(36).substring(2, 10);
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// Helper: response ko safely parse karta hai, chahe body khaali ho ya JSON na ho
const safeParseResponse = async (res) => {
  const text = await res.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { message: text };
    }
  }
  if (!res.ok) {
    throw new Error(data.message || `Request failed (status ${res.status})`);
  }
  return data;
};

export const checkInApi = async (authHeaders) => {
  const location = await getCurrentLocation();
  const res = await fetch(`${ATTENDANCE_API_BASE}/api/attendance/check-in`, {
    method: 'POST',
    headers: {
      ...authHeaders,
    },
    body: JSON.stringify({
      latitude: location.latitude,
      longitude: location.longitude,
      wifiSsid: 'Office_5G',
      deviceId: getDeviceId(),
    }),
  });
  return safeParseResponse(res);
};

export const checkOutApi = async (authHeaders) => {
  const location = await getCurrentLocation();
  const res = await fetch(`${ATTENDANCE_API_BASE}/api/attendance/check-out`, {
    method: 'POST',
    headers: {
      ...authHeaders,
    },
    body: JSON.stringify({
      latitude: location.latitude,
      longitude: location.longitude,
    }),
  });
  return safeParseResponse(res);
};

export const fetchMyHistoryApi = async (authHeaders) => {
  const res = await fetch(`${ATTENDANCE_API_BASE}/api/attendance/my-history`, {
    method: 'GET',
    headers: {
      ...authHeaders,
    },
  });
  return safeParseResponse(res);
};