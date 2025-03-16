// // utils/auth.ts
import { useRouter } from 'next/navigation'; // Impor useRouter

// Periksa apakah kode dijalankan di browser
const isBrowser = typeof window !== 'undefined';

// Simpan token di localStorage
export const saveToken = (token: string) => {
  if (isBrowser) {
    localStorage.setItem('token', token);
  }
};


// Ambil token dari localStorage
export const getToken = () => {
  if (isBrowser) {
    return localStorage.getItem('token');
  }
  return null;
};

// Hapus token dari localStorage (untuk logout)
export const removeToken = () => {
  if (isBrowser) {
    localStorage.removeItem('token');
  }
};

// Periksa apakah pengguna sudah login
export const isAuthenticated = () => {
  const token = getToken();
  return !!token; // Mengembalikan true jika token ada, false jika tidak
};

// Fungsi logout dengan redirect menggunakan Next.js router
export const logout = (router?: ReturnType<typeof useRouter>) => {
  removeToken(); // Hapus token
  if (router) {
    router.push('/'); // Redirect ke halaman login menggunakan Next.js router
  } else if (isBrowser) {
    window.location.href = '/'; // Fallback untuk redirect jika router tidak tersedia
  }
};

