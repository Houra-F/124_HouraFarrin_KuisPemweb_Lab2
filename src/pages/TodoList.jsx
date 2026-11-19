import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos } from "../context/TodoContext.jsx";
import TodoForm from "../components/TodoForm.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import StatsCards from "../components/StatsCards.jsx";

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
    </svg>
  );
}

export default function TodoList() {
  const { todos, addTodo, deleteTodo } = useTodos();
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  return (
    <main className="page">
      <header className="page-header">
        <h1>Todo List</h1>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          Tambah Todo
        </button>
      </header>
      <StatsCards />
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Judul</th>
              <th>Status</th>
              <th>Prioritas</th>
              <th>Deadline</th>
              <th className="center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="truncate" title={todo.title}>{todo.title}</td>
                <td>{todo.status}</td>
                <td>{todo.priority}</td>
                <td>{todo.deadline}</td>
                <td className="center actions">
                  <button className="icon-btn icon-view" aria-label={`Lihat detail ${todo.title}`} onClick={() => navigate(`/todo/${todo.id}`)}>
                    <EyeIcon />
                  </button>
                  <button className="icon-btn icon-delete" aria-label={`Hapus ${todo.title}`} onClick={() => setToDelete(todo)}>
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {todos.length === 0 && (
        <p className="empty">Belum ada tugas. Klik "Tambah Todo" untuk membuat tugas pertama.</p>
      )}

      {showAdd && (
        <TodoForm
          modalTitle="Tambah Todo"
          submitLabel="Tambah"
          onCancel={() => setShowAdd(false)}
          onSubmit={(data) => {
            addTodo(data);
            setShowAdd(false);
          }}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Hapus Todo"
          message={`Yakin ingin menghapus tugas "${toDelete.title}"?`}
          confirmLabel="Hapus"
          onCancel={() => setToDelete(null)}
          onConfirm={() => {
            deleteTodo(toDelete.id);
            setToDelete(null);
          }}
        />
      )}
    </main>
  );
}