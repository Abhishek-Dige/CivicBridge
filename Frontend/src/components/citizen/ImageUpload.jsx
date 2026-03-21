import React, { useRef, useState } from 'react';
import { UploadCloud, X, Image } from 'lucide-react';

const ImageUpload = ({ onImageChange }) => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onImageChange(url);
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
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-blue-400 bg-blue-50'
              : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
            <UploadCloud size={22} className="text-blue-500" />
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-1">Drop image here or click to browse</p>
          <p className="text-xs text-slate-400">PNG, JPG, WEBP up to 10 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
          >
            <X size={14} className="text-slate-600" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/40 to-transparent p-3 flex items-center gap-2">
            <Image size={14} className="text-white" />
            <span className="text-xs text-white font-medium">Image ready to upload</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
