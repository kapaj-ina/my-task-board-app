const TaskCard = ({ task, onClick }) => {
  const hasStatus = task.status && task.status_icon;
  const statusClass = `status-${task.status?.toLowerCase().replace(/\s/g, "-")}`;

  return (
    <div
      className={`task-card task-card-status ${statusClass}`}
      onClick={() => onClick(task)}
    >
      <div className="task-left">
        <div className="task-icon">
          {task.icon}
        </div>
        <div className="task-text">
          <h2>{task.name}</h2>
          {task.description && <p>{task.description}</p>}
        </div>
      </div>
      {hasStatus && (
        <div className={`task-status-icon status-icon-${task.status?.toLowerCase().replace(/\s/g, "-")}`}>
          <img src={`/icons/${task.status_icon}`} alt={`${task.status} icon`} width={20} height={20} />
        </div>
      )}
    </div>
  );
};

export default TaskCard;
