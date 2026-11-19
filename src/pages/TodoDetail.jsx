import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TodoForm from "../components/TodoForm.jsx";

export default function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodo, updateTodo } = useTodos();
  const [showEdit, setShowEdit] = useState(false);
  const todo = getTodo(id);

  if (!todo) {
    return (
      <main className="detail-wrap">
        <div className="card">
          <h2>Tugas tidak ditemukan</h2>
          <p className="muted">Tugas dengan ID {id} tidak ada atau sudah dihapus.</p>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>Kembali</button>
        </div>
      </main>
    );
  }

  return (
    <main className="detail-wrap">
      <div className="card detail">
        <div className="detail-left">
          <h3>Judul</h3>
          <p>{todo.title}</p>
          <h3>Deskripsi</h3>
          <div className="desc-box">{todo.description || "-"}</div>
        </div>
        <div className="detail-right">
          <h3>Status</h3>
          <p>{todo.status}</p>
          <h3>Prioritas</h3>
          <p>{todo.priority}</p>
          <h3>Deadline</h3>
          <p>{todo.deadline}</p>
          <div className="detail-actions">
            <button className="btn btn-secondary" onClick={() => navigate("/")}>Kembali</button>
            <button className="btn btn-primary" onClick={() => setShowEdit(true)}>Update</button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoForm
          modalTitle="Update Todo"
          submitLabel="Update"
          initial={todo}
          onCancel={() => setShowEdit(false)}
          onSubmit={(data) => {
            updateTodo(todo.id, data);
            setShowEdit(false);
          }}
        />
      )}
    </main>
  );
}