import Link from 'next/link';
import { FiArrowLeft, FiSend, FiMail, FiPhone } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Terima kasih! Pesan Anda telah kami terima.");
    e.target.reset();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 font-sans">
      <main className="w-full max-w-4xl glass-main-card p-8 md:p-10 space-y-8">
        <header>
          <Link href="/" className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-400 dark:text-sky-400 dark:hover:text-sky-300 transition">
              <FiArrowLeft />
              <span>Kembali ke Beranda</span>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Hubungi Kami</h1>
            <p className="text-base text-gray-600 dark:text-gray-300">Punya pertanyaan atau masukan? Jangan ragu untuk menghubungi kami.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><FiMail className="text-sky-500" size={20} /><span className="text-gray-700 dark:text-gray-200">rafisembiring97@gmail.com</span></div>
              <div className="flex items-center gap-3"><FiPhone className="text-sky-500" size={20} /><span className="text-gray-700 dark:text-gray-200">(+62) 851-6253-1197</span></div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Nama Anda</label><input type="text" id="name" required className="glass-input" /></div>
            <div><label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Email</label><input type="email" id="email" required className="glass-input" /></div>
            <div><label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Pesan</label><textarea id="message" rows="4" required className="glass-input"></textarea></div>
            <button type="submit" className="w-full glass-button flex items-center justify-center gap-2"><FiSend /><span>Kirim Pesan</span></button>
          </form>
        </div>
      </main>
    </div>
  );
}