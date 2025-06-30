import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';
import { FiLoader } from 'react-icons/fi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error logging in with Google: ", error);
      toast.error('Gagal login, coba lagi.');
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = { user, loading, loginWithGoogle, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export function RouteGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const publicRoutes = ['/', '/login', '/register', '/contact'];
  const protectedRoutes = ['/dashboard', '/project/[id]'];
  
  const path = router.pathname;

  useEffect(() => {
    if (!loading) {
      if (!user && protectedRoutes.some(p => path.startsWith(p.replace('[id]', '')))) {
        toast.error('Anda harus login untuk mengakses halaman ini.');
        router.push('/login');
      }
      
      if (user && (path === '/login' || path === '/register')) {
        router.push('/dashboard');
      }
    }
  }, [user, loading, path, router]);

  if (loading || (!user && protectedRoutes.some(p => path.startsWith(p.replace('[id]', ''))))) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <FiLoader className="animate-spin text-sky-500" size={48} />
      </div>
    );
  }
  
  return children;
}