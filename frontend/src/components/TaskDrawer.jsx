import { useState } from "react";

import "../styles/taskDrawer.css";

import { useTaskForm } from "../hooks/useTaskForm";
import { icons, statuses } from "../data/taskData";

const TaskDrawer = ({ task, onClose, saveTask, deleteTask, showTooltip }) => {
  const { values, errors, updateField, validate } = useTaskForm(task);
  const [loading, setLoading] = useState({ save: false, delete: false });

  const handleSave = async () => {
    const data = validate();
    if (!data) return;

    setLoading((prev) => ({ ...prev, save: true }));
    try {
      const taskToSave = { 
        ...task, 
        ...data
      };
      await saveTask(taskToSave);

      showTooltip("Task was saved successfully!");
      onClose();
    } catch {
      showTooltip("Failed to save task");
    } finally {
      setLoading((prev) => ({ ...prev, save: false }));
    }
  };

  const handleDelete = async () => {
    if (!task._id) return;
    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      await deleteTask(task._id);

      showTooltip("Task was deleted successfully!");
      onClose();
    } catch {
      showTooltip("Failed to delete task");
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <aside className="task-drawer" onClick={(e) => e.stopPropagation()}>
        <header className="drawer-header">
          <h2>Task Details</h2>
          <button className="close-btn" onClick={onClose}>
            <img src="/icons/close_ring_duotone-1.svg" alt="Close" width={20} height={20} />
          </button>
        </header>
        <div className="drawer-content">
          <div className="form-group">
            <label>Task Name</label>
            <input
              value={values.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Enter a task name"
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={values.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Enter a short description"
            />
            {errors.description && <p className="field-error">{errors.description}</p>}
          </div>
          <div className="form-group">
            <label>Icon</label>
            <div className="icon-picker">
              {icons.map((i) => (
                <button
                  key={i}
                  type="button"
                  className={values.icon === i ? "active" : ""}
                  onClick={() => updateField("icon", i)}
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
                  className={`status-card ${color} ${values.status === key ? "active" : ""}`}
                  onClick={() => updateField("status", values.status === key ? "" : key)}
                >
                  <div className="status-left">
                    <div className="status-icon">
                      <img src={icon} alt={key} />
                    </div>
                    <span>{key}</span>
                  </div>
                  {values.status === key && (
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
            className="footer-btn delete-btn"
            onClick={handleDelete}
            disabled={loading.save || loading.delete}
          >
            Delete
            <img src="/icons/trash.svg" alt="Delete" width={20} height={20} />
          </button>
          <button
            className="footer-btn save-btn"
            onClick={handleSave}
            disabled={loading.save || loading.delete}
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
