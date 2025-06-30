import { useAuth } from '../lib/auth';
import { FiLoader } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

export default function LoginPage() {
  const { loginWithGoogle, loading, user } = useAuth();

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FiLoader className="animate-spin text-sky-500" size={48} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md text-center">
        <div className="glass-main-card p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Selamat Datang</h1>
          <p className="text-base text-gray-600 dark:text-gray-300 mb-8">Masuk untuk melanjutkan ke dashboard Anda.</p>
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/80 dark:bg-white/90 text-gray-800 font-semibold text-base hover:bg-white dark:hover:bg-white transition-all duration-300 shadow-lg"
          >
            <FcGoogle size={24} />
            <span>Masuk dengan Google</span>
          </button>
        </div>
        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:underline text-sky-500 dark:text-sky-400">
              &larr; Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}