import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiLayout, FiClock, FiCheckSquare, FiArrowRight, FiMoon, FiSun } from 'react-icons/fi';

const Navbar = ({ theme, toggleTheme }) => (
  <header className="absolute top-0 left-0 right-0 z-10 p-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-slate-800 dark:text-white">
        EffiTask
      </Link>
      <nav className="flex items-center gap-3">
        <Link href="/contact" className="glass-button-secondary text-sm px-4">Hubungi Kami</Link>
        <Link href="/login" className="glass-button-secondary text-sm px-4">Masuk</Link>
        <Link href="/register" className="glass-button text-sm px-4">Daftar Gratis</Link>
      </nav>
    </div>
  </header>
);

const FeatureCard = ({ icon, title, children }) => (
  <div className="inner-card p-6 text-center h-full">
    <div className="inline-block p-4 bg-sky-500/10 dark:bg-sky-500/20 rounded-xl mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{title}</h3>
    <p className="text-slate-600 dark:text-gray-400">{children}</p>
  </div>
);


export default function HomePage() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    setTheme(savedTheme);
    
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      return newTheme;
    });
  };

  return (
    <div className="w-full min-h-screen font-sans">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main className="pt-32 pb-20 text-center flex flex-col items-center">
        <div className="max-w-3xl mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 dark:text-white mb-6 leading-tight">
                Kelola Proyek, <span className="text-sky-500">Bukan Kekacauan.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-800 dark:text-white mb-10 max-w-2xl mx-auto">
                Platform manajemen proyek yang simpel dan intuitif, dirancang dengan antarmuka yang Anda sukai untuk membantu tim Anda tetap fokus dan produktif.
            </p>
            <Link href="/register" className="glass-button text-lg px-8 py-4 inline-flex items-center gap-2">
                Mulai Sekarang <FiArrowRight />
            </Link>
        </div>
      </main>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-800 dark:text-white">Semua yang Anda Butuhkan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={<FiLayout size={28} className="text-sky-500" />} title="Visualisasi Proyek">Lihat semua proyek Anda dalam satu dashboard terpusat yang bersih dan modern.</FeatureCard>
            <FeatureCard icon={<FiClock size={28} className="text-sky-500" />} title="Manajemen Deadline">Atur dan lacak tenggat waktu dengan mudah agar tidak ada lagi pekerjaan yang terlewat.</FeatureCard>
            <FeatureCard icon={<FiCheckSquare size={28} className="text-sky-500" />} title="Pelacakan Status">Tandai proyek yang sedang berjalan dan yang sudah selesai dengan sekali klik.</FeatureCard>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-slate-500 dark:text-gray-400">
        <p>&copy; 2024 EffiTask. Mohammad Rafi Habibi Sembiring</p>
      </footer>
    </div>
  );
}