import { useRouter } from 'next/router';
import { useAuth } from '../../lib/auth';
import { db } from '../../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiEdit, FiSave, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProjectDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editDeadline, setEditDeadline] = useState('');

  useEffect(() => {
    if (!id || !user) return;
    
    const getProjectData = async () => {
      setLoading(true);
      const projectRef = doc(db, "projects", id);
      const docSnap = await getDoc(projectRef);

      if (docSnap.exists() && docSnap.data().uid === user.uid) {
        const data = docSnap.data();
        setProject({ id: docSnap.id, ...data });
        setEditName(data.name);
        setEditDesc(data.description);
        setEditDeadline(data.deadline);
      } else {
        // Handle not found or not authorized
        toast.error("Proyek tidak ditemukan atau Anda tidak memiliki akses.");
        router.push('/');
      }
      setLoading(false);
    };

    getProjectData();
  }, [id, user, router]);

  const handleUpdateProject = async () => {
    const toastId = toast.loading('Menyimpan perubahan...');
    const projectRef = doc(db, 'projects', id);
    try {
        await updateDoc(projectRef, {
            name: editName,
            description: editDesc,
            deadline: editDeadline,
        });
        setProject(prev => ({...prev, name: editName, description: editDesc, deadline: editDeadline}));
        setIsEditing(false);
        toast.success('Proyek berhasil diperbarui!', {id: toastId});
    } catch (error) {
        toast.error('Gagal menyimpan perubahan.', {id: toastId});
        console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FiLoader className="animate-spin text-white" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-sans p-4 md:p-8">
      <main className="max-w-3xl mx-auto">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-sky-400 hover:underline mb-6">
            <FiArrowLeft />
            <span>Kembali ke Daftar Proyek</span>
          </a>
        </Link>

        <div className="p-8 glass-container">
          {!isEditing ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-4xl font-bold text-white">{project.name}</h1>
                <button onClick={() => setIsEditing(true)} className="glass-button-secondary flex items-center gap-2">
                  <FiEdit /><span>Edit</span>
                </button>
              </div>
              <div className="mb-6">
                <p className="text-lg text-white/80">{project.description || 'Tidak ada deskripsi.'}</p>
              </div>
              <div className="flex justify-between items-center border-t border-white/20 pt-4 mt-6">
                 <span className={`px-3 py-1 text-sm font-semibold rounded-full ${project.completed ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                    {project.completed ? 'Selesai' : 'In Progress'}
                 </span>
                 <span className="text-sm font-semibold text-red-300/80">
                    Deadline: {project.deadline}
                 </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-4xl font-bold text-white">Edit Proyek</h1>
                <button onClick={handleUpdateProject} className="glass-button flex items-center gap-2">
                  <FiSave /><span>Simpan</span>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Nama Proyek</label>
                    <input type="text" value={editName} onChange={e => setEditName(e.target.value)} className="glass-input"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Deskripsi</label>
                    <textarea rows="4" value={editDesc} onChange={e => setEditDesc(e.target.value)} className="glass-input"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Deadline</label>
                    <input type="date" value={editDeadline} onChange={e => setEditDeadline(e.target.value)} className="glass-input"/>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}