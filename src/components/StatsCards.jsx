import { useTodos } from "../context/TodoContext.jsx";

function todayString() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export default function StatsCards() {
  const { todos } = useTodos();
  const today = todayString();

  const total = todos.length;
  const done = todos.filter((t) => t.status === "done").length;
  const notDone = total - done;
  const late = todos.filter((t) => t.status !== "done" && t.deadline < today).length;

  const stats = [
    { label: "Total Tugas", value: total, className: "stat-total" },
    { label: "Selesai", value: done, className: "stat-done" },
    { label: "Belum Selesai", value: notDone, className: "stat-pending" },
    { label: "Terlambat", value: late, className: "stat-late" },
  ];

  return (
    <section className="stats">
      {stats.map((s) => (
        <div key={s.label} className="stat-card">
          <div className={`stat-value ${s.className}`}>{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </section>
  );
}