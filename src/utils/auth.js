// Client-side JWT Authentication simulation using localStorage and Base64 encoding.

const MOCK_SECRET = 'geethikafarm_super_secret_sig';

// Helper to base64 encode strings
const base64UrlEncode = (str) => {
  try {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  } catch (e) {
    return '';
  }
};

// Helper to base64 decode strings
const base64UrlDecode = (str) => {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return decodeURIComponent(escape(atob(base64)));
  } catch (e) {
    return null;
  }
};

// Simple pseudo-signature for verification
const generateSignature = (headerB64, payloadB64) => {
  const data = `${headerB64}.${payloadB64}.${MOCK_SECRET}`;
  // Generate a simple checksum hash for the signature
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = (hash << 5) - hash + data.charCodeAt(i);
    hash |= 0;
  }
  return base64UrlEncode(hash.toString());
};

// 1. Register User
export const mockRegister = (username, email, password) => {
  const savedUsers = localStorage.getItem('td_users');
  const users = savedUsers ? JSON.parse(savedUsers) : [];

  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'Account with this email already exists!' };
  }

  const newUser = {
    id: Date.now(),
    username,
    email: email.toLowerCase(),
    password // stored in plain text for client-side mockup purposes
  };

  users.push(newUser);
  localStorage.setItem('td_users', JSON.stringify(users));
  return { success: true };
};

// 2. Login User & Generate Simulated JWT
export const mockLogin = (email, password) => {
  const savedUsers = localStorage.getItem('td_users');
  const users = savedUsers ? JSON.parse(savedUsers) : [];

  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }

  // Create JWT Parts
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: user.id,
    username: user.username,
    email: user.email,
    exp: Date.now() + 2 * 60 * 60 * 1000 // 2 hours expiration
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const signature = generateSignature(headerB64, payloadB64);

  const token = `${headerB64}.${payloadB64}.${signature}`;

  return {
    success: true,
    token,
    user: { username: user.username, email: user.email }
  };
};

// 3. Verify JWT Integrity
export const verifyToken = (token) => {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  const [headerB64, payloadB64, signature] = parts;

  // Check signature
  const expectedSig = generateSignature(headerB64, payloadB64);
  if (signature !== expectedSig) return false;

  // Check expiration
  try {
    const payload = JSON.parse(base64UrlDecode(payloadB64));
    if (Date.now() > payload.exp) {
      return false; // Expired
    }
    return true;
  } catch (e) {
    return false;
  }
};

// 4. Decode JWT Payload
export const decodeToken = (token) => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const payloadStr = base64UrlDecode(parts[1]);
    return JSON.parse(payloadStr);
  } catch (e) {
    return null;
  }
};
