import { useState, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { postsApi } from '../services/posts';
import './CreatePost.css';

// post yaratish modal - rasm tanlash, caption yozish
function CreatePost({ onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;
    setLoading(true);
    try {
      await postsApi.createPost({ image, caption });
      onSuccess?.();
      onClose();
    } catch (e) {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setImage(null);
    setCaption('');
    setStep(1);
  };

  return (
    <div className="create-post-overlay">
      <div className="create-post-modal">
        <div className="create-post-header">
          <button onClick={step === 1 ? onClose : handleBack} className="create-post-btn">
            {step === 1 ? <IoClose size={24} /> : 'Back'}
          </button>
          <h2>New Post</h2>
          <button
            type="button"
            onClick={step === 2 ? handleSubmit : () => fileInputRef.current?.click()}
            disabled={loading}
            className="create-post-btn next"
          >
            {step === 1 ? 'Next' : loading ? 'Posting...' : 'Share'}
          </button>
        </div>

        <div className="create-post-body">
          {step === 1 ? (
            <div className="create-post-upload" onClick={() => fileInputRef.current?.click()}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
              <p>Tap to select photo</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="create-post-form">
              <div className="create-post-preview">
                <img src={URL.createObjectURL(image)} alt="preview" />
              </div>
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

