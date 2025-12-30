import { useState } from "react";
import "../styles/taskDrawer.css";

import { icons, statuses } from "../data/taskData";

const TaskDrawer = ({ task, onClose, saveTask, deleteTask }) => {
  const [name, setName] = useState(task.name || "");
  const [description, setDescription] = useState(task.description || "");
  const [icon, setIcon] = useState(task.icon || "");
  const [status, setStatus] = useState(task.status ?? null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      await saveTask({...task, name, description, icon, status: status || null });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!task._id || !deleteTask) return;
    setDeleting(true);
    try {
      await deleteTask(task._id);
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="task-drawer" onClick={(e) => e.stopPropagation()}>
        <header className="drawer-header">
          <h2>Task details</h2>
          <button className="close-btn" onClick={onClose}>
            <img src="/icons/close_ring_duotone-1.svg" alt="Close" width={20} height={20} />
          </button>
        </header>
        <div className="drawer-content">
          <div className="form-group">
            <label>Task Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a task name"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short description"
            />
          </div>
          <div className="form-group">
            <label>Icon</label>
            <div className="icon-picker">
              {icons.map((i) => (
                <button
                  key={i}
                  type="button"
                  className={icon === i ? "active" : ""}
                  onClick={() => setIcon(i)}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Status</label>
            <div className="status-picker">
              {Object.entries(statuses).map(([key, { icon, color }]) => (
                <button
                  key={key}
                  type="button"
                  className={`status-card ${color} ${status === key ? "active" : ""}`}
                  onClick={() => setStatus(status === key ? "" : key)}
                >
                  <div className="status-left">
                    <div className="status-icon">
                      <img src={icon} alt={key} />
                    </div>
                    <span>{key}</span>
                  </div>
                  {status === key && (
                    <div className="status-check">
                      <img src="/icons/done_round.svg" alt="Selected" width={15} height={15} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        <footer className="drawer-footer">
          <button
            type="button"
            className="footer-btn delete-btn"
            onClick={handleDelete}
           disabled={deleting || saving}
          >
            Delete
            <img src="/icons/trash.svg" alt="Delete" width={20} height={20} />
          </button>
          <button
            type="button"
            className="footer-btn save-btn"
            onClick={handleSave}
            disabled={saving || deleting}
          >
            Save
            <img src="/icons/done_round.svg" alt="Save" width={20} height={20} />
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default TaskDrawer;
