import { useState } from 'react';
import { 
  useCreateAchievementMutation, 
  useDeleteAchievementMutation 
} from '../../store/slices/adminApiSlice';
import { useGetSharedAchievementsQuery } from '../../store/slices/publicApiSlice';

const AchievementsManager = () => {
  const [studentName, setStudentName] = useState('');
  const [achievementDetail, setAchievementDetail] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState(null);
  const [uploadError, setUploadError] = useState('');

  const { data: achievements, isLoading, refetch } = useGetSharedAchievementsQuery();
  const [createAchievement, { isLoading: isCreating }] = useCreateAchievementMutation();
  const [deleteAchievement] = useDeleteAchievementMutation();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('studentName', studentName);
    formData.append('achievementDetail', achievementDetail);
    formData.append('year', year);
    if (image) formData.append('image', image); // Image might be optional depending on backend schema, assume yes for now

    try {
      await createAchievement(formData).unwrap();
      setStudentName('');
      setAchievementDetail('');
      setYear('');
      setImage(null);
      setUploadError('');
      document.getElementById('achievement-image-upload').value = '';
      refetch();
    } catch (err) {
      setUploadError(err?.data?.message || err.error || 'Failed to add achievement');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await deleteAchievement(id).unwrap();
        refetch();
      } catch (err) {
        console.error('Failed to delete achievement', err);
      }
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Manage Student Achievements</h2>

      {/* Upload Form */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--secondary-color)' }}>Add New Achievement</h3>
        {uploadError && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{uploadError}</div>}
        
        <form onSubmit={submitHandler}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Student Name</label>
              <input 
                type="text" 
                value={studentName} 
                onChange={(e) => setStudentName(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                placeholder="E.g., John Doe"
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Year</label>
              <input 
                type="text" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                placeholder="E.g., 2023"
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Achievement Detail</label>
            <textarea 
              value={achievementDetail} 
              onChange={(e) => setAchievementDetail(e.target.value)} 
              rows="3"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
              placeholder="State Level Math Olympiad Winner"
              required
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Student Image (Optional)</label>
            <input 
              id="achievement-image-upload"
              type="file" 
              accept="image/*"
              onChange={handleImageChange} 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={isCreating}>
            {isCreating ? 'Adding...' : 'Add Achievement'}
          </button>
        </form>
      </div>

      {/* Achievements List */}
      <div>
        <h3 style={{ marginBottom: '1.5rem' }}>Current Achievements</h3>
        {isLoading ? (
          <div>Loading achievements...</div>
        ) : !achievements || achievements.length === 0 ? (
          <div>No achievements recorded yet.</div>
        ) : (
          <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '1rem' }}>Image</th>
                  <th style={{ padding: '1rem' }}>Student Name</th>
                  <th style={{ padding: '1rem' }}>Detail</th>
                  <th style={{ padding: '1rem' }}>Year</th>
                  <th style={{ padding: '1rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((item) => (
                  <tr key={item._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e2e8f0' }}>
                        {item.imageUrl ? (
                          <img 
                            src={`http://localhost:5000${item.imageUrl}`} 
                            alt={item.studentName} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = '/placeholder.png' }}
                          />
                        ) : null}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{item.studentName}</td>
                    <td style={{ padding: '1rem', color: '#64748b' }}>{item.achievementDetail}</td>
                    <td style={{ padding: '1rem' }}>{item.year}</td>
                    <td style={{ padding: '1rem' }}>
                      <button 
                        onClick={() => deleteHandler(item._id)} 
                        style={{ background: 'var(--danger)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsManager;
