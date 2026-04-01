import { useState } from 'react';
import { 
  useGetAdminCarouselsQuery, 
  useCreateCarouselMutation, 
  useDeleteCarouselMutation 
} from '../../store/slices/adminApiSlice';

const CarouselManager = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [uploadError, setUploadError] = useState('');

  const { data: carousels, isLoading, refetch } = useGetAdminCarouselsQuery();
  const [createCarousel, { isLoading: isCreating }] = useCreateCarouselMutation();
  const [deleteCarousel] = useDeleteCarouselMutation();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      setUploadError('Please select an image file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      await createCarousel(formData).unwrap();
      setTitle('');
      setImage(null);
      setUploadError('');
      // Reset file input by re-rendering or ref, simple form reset works too
      document.getElementById('image-upload').value = '';
      refetch();
    } catch (err) {
      setUploadError(err?.data?.message || err.error || 'Failed to create carousel item');
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteCarousel(id).unwrap();
        refetch();
      } catch (err) {
        console.error('Failed to delete carousel image', err);
      }
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Manage Home Page Carousel</h2>

      {/* Upload Form */}
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--secondary-color)' }}>Add New Carousel Image</h3>
        {uploadError && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{uploadError}</div>}
        
        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title (Caption)</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
              placeholder="E.g., Welcome to Sun Shine"
              required
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Image File</label>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*"
              onChange={handleImageChange} 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isCreating}>
            {isCreating ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>
      </div>

      {/* Carousel List */}
      <div>
        <h3 style={{ marginBottom: '1.5rem' }}>Current Images</h3>
        {isLoading ? (
          <div>Loading items...</div>
        ) : !carousels || carousels.length === 0 ? (
          <div>No carousel images uploaded yet.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
            {carousels.map((item) => (
              <div key={item._id} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ height: '150px', backgroundColor: '#f1f5f9' }}>
                  <img 
                    src={`http://localhost:5000${item.imageUrl}`} // Adjust path to static files served by backend
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/placeholder.png' }}
                  />
                </div>
                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '500', fontSize: '0.9rem', color: '#333' }}>{item.title}</span>
                  <button 
                    onClick={() => deleteHandler(item._id)} 
                    style={{ background: 'var(--danger)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarouselManager;
