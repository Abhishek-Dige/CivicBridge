import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import supabase from '../../context/supabase';


const CATEGORIES = ['Roads', 'Water', 'Electricity', 'Sanitation'];

/* ─── Styles ─────────────────────────────────────────────── */
const inputStyle = (hasError) => ({
  width: '100%',
  padding: '12px 16px',
  borderRadius: 8,
  border: `1px solid ${hasError ? '#f87171' : '#cbd5e1'}`,
  background: '#f8fafc',
  fontSize: '0.9375rem',
  color: '#1e293b',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
  fontFamily: "'Inter', system-ui, sans-serif",
  boxSizing: 'border-box',
});

const focusStyle = {
  borderColor: '#0ea5e9',
  background: '#fff',
  boxShadow: '0 0 0 3px rgba(14,165,233,0.2)',
};

const handleFocus = (e) => Object.assign(e.target.style, focusStyle);
const makeBlurHandler = (hasError) => (e) =>
  Object.assign(e.target.style, {
    borderColor: hasError ? '#f87171' : '#cbd5e1',
    boxShadow: 'none',
    background: '#f8fafc',
  });

/* ─── Field wrapper — defined OUTSIDE ComplaintForm ─────── */
/*   This is critical: if Field is defined inside the parent  */
/*   component function React treats it as a new component    */
/*   type every render, unmounts the input, and focus is lost */
const Field = ({ name, label, required, error, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontWeight: 600, fontSize: '0.875rem', color: '#334155', fontFamily: "'Inter', system-ui" }}>
      {label}{required && <span style={{ color: '#ef4444', marginLeft: 4 }}>*</span>}
    </label>
    {children}
    {error && <p style={{ fontSize: '12px', color: '#ef4444', margin: 0 }}>{error}</p>}
  </div>
);

/* ─── Main form ──────────────────────────────────────────── */
const ComplaintForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ title: '', location: '', category: '', description: '', imageUrl: null });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim())       errs.title       = 'Title is required';
    if (!form.location.trim())    errs.location    = 'Location is required';
    if (!form.category)           errs.category    = 'Please select a category';
    if (!form.description.trim()) errs.description = 'Description is required';
    return errs;
  };

  const handleSubmit = async (e) => {
  e.preventDefault(); // 🔥 VERY IMPORTANT

  const errs = validate();
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setSubmitting(true);

  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: form.title,
      location: form.location,
      category: form.category,
      description: form.description,
      image_url: form.imageUrl,
      user_id: user?.id ?? null,
    })
    .select();

  if (error) {
    console.error("INSERT ERROR:", error);
    setSubmitting(false);
    return;
  }

  navigate("/citizen/dashboard", { state: { newComplaint: data[0] } });

  setSubmitting(false);
};

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'Inter', system-ui" }}>

      <Field name="title" label="Issue Title" required error={errors.title}>
        <input
          type="text" name="title" value={form.title} onChange={handleChange}
          placeholder="e.g. Broken road near main gate"
          style={inputStyle(!!errors.title)}
          onFocus={handleFocus}
          onBlur={makeBlurHandler(!!errors.title)}
        />
      </Field>

      <Field name="location" label="Location" required error={errors.location}>
        <input
          type="text" name="location" value={form.location} onChange={handleChange}
          placeholder="e.g. Sector 10, Market Road"
          style={inputStyle(!!errors.location)}
          onFocus={handleFocus}
          onBlur={makeBlurHandler(!!errors.location)}
        />
      </Field>

      <Field name="category" label="Category" required error={errors.category}>
        <select
          name="category" value={form.category} onChange={handleChange}
          style={inputStyle(!!errors.category)}
          onFocus={handleFocus}
          onBlur={makeBlurHandler(!!errors.category)}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>

      <div>
        <label style={{ fontWeight: 600, fontSize: '0.875rem', color: '#334155', display: 'block', marginBottom: 6 }}>
          Attach Image <span style={{ color: '#94a3b8', fontWeight: 500 }}>(optional)</span>
        </label>
        <ImageUpload onImageChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))} />
      </div>

      <Field name="description" label="Description" required error={errors.description}>
        <textarea
          name="description" value={form.description} onChange={handleChange}
          rows={4} placeholder="Describe the issue in detail…"
          style={{ ...inputStyle(!!errors.description), resize: 'none' }}
          onFocus={handleFocus}
          onBlur={makeBlurHandler(!!errors.description)}
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        style={{
          width: '100%', padding: '14px',
          borderRadius: 8, border: 'none',
          cursor: submitting ? 'not-allowed' : 'pointer',
          background: submitting ? '#94a3b8' : 'linear-gradient(135deg, #2563eb, #10b981)',
          color: '#fff', fontWeight: 700, fontSize: '1.0625rem',
          fontFamily: "'Inter', system-ui",
          boxShadow: submitting ? 'none' : '0 4px 14px rgba(37,99,235,0.3)',
          transition: 'all 0.2s',
        }}
      >
        {submitting ? 'Submitting…' : 'Submit Complaint'}
      </button>
    </form>
  );
};

export default ComplaintForm;
