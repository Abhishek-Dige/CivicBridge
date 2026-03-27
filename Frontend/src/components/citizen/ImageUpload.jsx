import React, { useRef, useState } from 'react';
import { UploadCloud, X, Image } from 'lucide-react';
import supabase from '../../context/supabase';

const ImageUpload = ({ onImageChange }) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

 

const handleFile = async (file) => {
  if (!file || !file.type.startsWith("image/")) return;

  // 🔥 instant preview (same as before)
  const previewUrl = URL.createObjectURL(file);
  setPreview(previewUrl);

  // 🔥 upload to supabase
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("post-images")
    .upload(fileName, file);

  if (error) {
    console.error("Upload failed:", error);
    return;
  }

  const { data } = supabase.storage
    .from("post-images")
    .getPublicUrl(fileName);

  // 🔥 send REAL URL to parent
  onImageChange(data.publicUrl);
};

  const handleChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      {!preview ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`image-upload-dropzone ${isDragging ? 'dragging' : ''}`}
        >
          <div className="image-upload-icon-wrap">
            <UploadCloud size={22} className="icon-blue" />
          </div>
          <p className="image-upload-title">Drop image here or click to browse</p>
          <p className="image-upload-subtitle">PNG, JPG, WEBP up to 10 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="image-upload-preview-container">
          <img src={preview} alt="Preview" className="image-upload-preview-img" />
          <button
            type="button"
            onClick={handleRemove}
            className="image-upload-remove-btn"
          >
            <X size={14} className="icon-slate" />
          </button>
          <div className="image-upload-ready-banner">
            <Image size={14} className="icon-white" />
            <span className="image-upload-ready-text">Image ready to upload</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
