import { AuthProvider, RouteGuard } from '../lib/auth';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <RouteGuard>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(30, 30, 40, 0.8)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontFamily: 'Inter, sans-serif',
            },
          }}
        />
        <Component {...pageProps} />
      </RouteGuard>
    </AuthProvider>
  );
}

export default MyApp;