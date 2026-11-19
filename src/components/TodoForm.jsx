import { useState } from "react";
import Modal from "./Modal.jsx";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../data/dummyTodos.js";

const EMPTY = {
  title: "",
  description: "",
  status: "to-do",
  priority: "low",
  deadline: "",
};

export default function TodoForm({ modalTitle, submitLabel, initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          status: initial.status,
          priority: initial.priority,
          deadline: initial.deadline,
        }
      : EMPTY
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = {};
    if (!form.title.trim()) found.title = "Judul wajib diisi";
    if (!form.deadline) found.deadline = "Deadline wajib diisi";
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  return (
    <Modal title={modalTitle} onClose={onCancel}>
      <form onSubmit={handleSubmit} noValidate>
        <label className="label" htmlFor="title">Judul</label>
        <input id="title" name="title" className="input" value={form.title} onChange={handleChange} autoFocus />
        {errors.title && <p className="error">{errors.title}</p>}

        <label className="label" htmlFor="description">Deskripsi</label>
        <textarea id="description" name="description" className="input" rows={3} value={form.description} onChange={handleChange} />

        <div className="row">
          <div className="col">
            <label className="label" htmlFor="status">Status</label>
            <select id="status" name="status" className="input" value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="col">
            <label className="label" htmlFor="priority">Prioritas</label>
            <select id="priority" name="priority" className="input" value={form.priority} onChange={handleChange}>
              {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <label className="label" htmlFor="deadline">Deadline</label>
        <input id="deadline" name="deadline" type="date" className="input" value={form.deadline} onChange={handleChange} />
        {errors.deadline && <p className="error">{errors.deadline}</p>}

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Batal</button>
          <button type="submit" className="btn btn-primary">{submitLabel}</button>
        </div>
      </form>
    </Modal>
  );
}