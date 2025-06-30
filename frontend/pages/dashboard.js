import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '../lib/auth';
import { useTheme } from '../lib/theme';
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { FiPlus, FiLogOut, FiCheckCircle, FiCircle, FiSun, FiMoon, FiLoader, FiMessageSquare } from 'react-icons/fi';
import { format, isPast, differenceInDays } from 'date-fns';
import { id as localeID } from 'date-fns/locale';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [projects, setProjects] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const [projectName, setProjectName] = useState('');
  const [projectDeadline, setProjectDeadline] = useState('');

  useEffect(() => {
    if (!user) return;
    setDataLoading(true);
    const q = query(collection(db, "projects"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      projectsData.sort((a, b) => (a.createdAt && b.createdAt ? b.createdAt.toMillis() - a.createdAt.toMillis() : 0));
      setProjects(projectsData);
      setDataLoading(false);
    }, (error) => {
      console.error("Error fetching projects: ", error);
      toast.error("Gagal memuat proyek. Pastikan aturan keamanan Firestore sudah benar.");
      setDataLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projectName || !projectDeadline) return toast.error('Nama Proyek dan Deadline wajib diisi!');
    const toastId = toast.loading('Menambahkan proyek...');
    try {
      await addDoc(collection(db, "projects"), {
        name: projectName, description: "", deadline: projectDeadline, completed: false,
        uid: user.uid, sharedWith: [], createdAt: serverTimestamp(),
      });
      toast.success('Proyek berhasil ditambahkan!', { id: toastId });
      setProjectName(''); setProjectDeadline('');
    } catch (error) { toast.error('Gagal menambahkan proyek.', { id: toastId }); }
  };
  
  const toggleComplete = async (projectId, currentStatus) => {
    const projectRef = doc(db, "projects", projectId);
    try {
      await updateDoc(projectRef, { completed: !currentStatus });
      toast.success(currentStatus ? "Proyek berstatus 'In Progress'" : "Proyek Selesai!");
    } catch { toast.error("Gagal mengubah status."); }
  };
  
  const filteredProjects = useMemo(() => {
    if (filter === 'completed') return projects.filter(p => p.completed);
    if (filter === 'in-progress') return projects.filter(p => !p.completed);
    return projects;
  }, [projects, filter]);

  const formatDeadline = (deadline) => {
    if (!deadline) return { text: 'N/A', style: 'text-slate-400 dark:text-gray-500' };
    const date = new Date(deadline);
    const diff = differenceInDays(date, new Date());
    if (isPast(date) && diff < 0) return { text: `Terlewat ${Math.abs(diff)} hari`, style: 'text-red-500 dark:text-red-400' };
    if (diff < 1) return { text: 'Hari ini', style: 'text-yellow-600 dark:text-yellow-400' };
    if (diff < 7) return { text: `${diff + 1} hari lagi`, style: 'text-sky-600 dark:text-sky-400' };
    return { text: format(date, 'dd MMM yy', { locale: localeID }), style: 'text-slate-600 dark:text-gray-300' };
  };

  if (!user) return null;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <main className="w-full max-w-6xl glass-main-card p-6 md:p-8 space-y-8">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full border-2 border-slate-300 dark:border-white/50"/>
            <div>
              <p className="text-sm text-slate-600 dark:text-gray-400">Selamat datang kembali,</p>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">{user.displayName}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Link href="/contact" className="glass-button-secondary" aria-label="Contact Us">
                 <FiMessageSquare />
            </Link>
            <button onClick={logout} className="glass-button-secondary"><FiLogOut/></button>
          </div>
        </header>
        <hr className="border-slate-200 dark:border-white/10" />
        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Tambah Proyek Baru</h2>
          <form onSubmit={handleAddProject} className="flex flex-col sm:flex-row items-center gap-4">
            <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="Nama proyek..." className="glass-input flex-grow" />
            <input type="date" value={projectDeadline} onChange={e => setProjectDeadline(e.target.value)} className="glass-input sm:w-auto" />
            <button type="submit" className="glass-button w-full sm:w-auto flex items-center justify-center gap-2"><FiPlus size={20}/><span>Tambah</span></button>
          </form>
        </section>
        <hr className="border-slate-200 dark:border-white/10" />
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Daftar Proyek Anda</h2>
            <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-200/60 dark:bg-white/5">
                {['all', 'in-progress', 'completed'].map(f => (<button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition capitalize ${filter === f ? 'bg-white dark:bg-black/20 shadow text-slate-800 dark:text-white' : 'text-slate-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-black/10'}`}>{f.replace('-', ' ')}</button>))}
            </div>
          </div>
          {dataLoading ? (<div className="text-center p-10"><FiLoader className="animate-spin mx-auto text-sky-500" size={32}/></div>) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map(project => {
                const deadlineInfo = formatDeadline(project.deadline);
                return (
                  <Link href={`/project/${project.id}`} key={project.id} className={`inner-card p-5 flex flex-col justify-between h-40 cursor-pointer ${project.completed ? 'opacity-60 grayscale' : ''}`}>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white pr-4">{project.name}</h3>
                        <button onClick={(e) => { e.preventDefault(); toggleComplete(project.id, project.completed); }} className="text-2xl flex-shrink-0">{project.completed ? <FiCheckCircle className="text-green-500"/> : <FiCircle className="text-slate-400 dark:text-gray-500 hover:text-slate-800 dark:hover:text-white"/>}</button>
                      </div>
                      <div className="mt-auto"><span className={`text-sm font-semibold ${deadlineInfo.style}`}>{deadlineInfo.text}</span></div>
                  </Link>
                );
              })}
              {filteredProjects.length === 0 && <p className="text-slate-500 dark:text-gray-400 col-span-full text-center py-10">Tidak ada proyek dalam kategori ini.</p>}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}