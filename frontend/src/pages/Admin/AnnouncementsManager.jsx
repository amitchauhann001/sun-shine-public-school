import { useState } from 'react';
import { 
  useGetAdminAnnouncementsQuery, 
  useCreateAnnouncementMutation, 
  useDeleteAnnouncementMutation 
} from '../../store/slices/adminApiSlice';
import { FaTrash, FaPlus } from 'react-icons/fa';

const AnnouncementsManager = () => {
  const { data: announcements, isLoading, refetch } = useGetAdminAnnouncementsQuery();
  const [createAnnouncement, { isLoading: isCreating }] = useCreateAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();

  const [text, setText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement({ text, linkUrl, isActive: true }).unwrap();
      setText('');
      setLinkUrl('');
    } catch (err) {
      console.error('Failed to create announcement', err);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await deleteAnnouncement(id).unwrap();
        refetch();
      } catch (err) {
        console.error('Failed to delete', err);
      }
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>Manage Announcements</h2>
      
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem' }}>Create New Announcement</h3>
        <form onSubmit={submitHandler} style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Announcement Text</label>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              placeholder="E.g., Admissions open for 2026-2027!"
              required
            />
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Link URL (Optional)</label>
            <input 
              type="url" 
              value={linkUrl} 
              onChange={(e) => setLinkUrl(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              placeholder="https://..."
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isCreating} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaPlus /> {isCreating ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>

      <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'var(--bg-light)' }}>
            <tr>
              <th style={{ padding: '1rem' }}>Text</th>
              <th style={{ padding: '1rem' }}>Link</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="4" style={{ padding: '1rem', textAlign: 'center' }}>Loading...</td></tr>
            ) : announcements?.map(announcement => (
              <tr key={announcement._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '1rem' }}>{announcement.text}</td>
                <td style={{ padding: '1rem' }}>
                  {announcement.linkUrl ? <a href={announcement.linkUrl} target="_blank" rel="noopener noreferrer">Link</a> : 'None'}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ padding: '0.25rem 0.5rem', background: announcement.isActive ? 'var(--success)' : '#ccc', color: 'white', borderRadius: '4px', fontSize: '0.8rem' }}>
                    {announcement.isActive ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <button onClick={() => deleteHandler(announcement._id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '1.2rem' }}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnnouncementsManager;
