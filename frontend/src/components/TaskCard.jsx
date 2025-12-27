const TaskCard = ({ task, onClick }) => {
  const { name, description, icon, status, statusIcon } = task;

  const hasStatus = status && statusIcon;
  const getStatusClass = (status) =>
    status ? `status-${status.toLowerCase().replace(/\s/g, "-")}` : "";
  const statusClass = getStatusClass(status);

  return (
    <div
      className={`task-card task-card-status ${statusClass}`}
      onClick={() => onClick(task)}
    >
      <div className="task-left">
        <div className="task-icon">{icon}</div>
        <div className="task-text">
          <h2>{name}</h2>
          {description && <p>{description}</p>}
        </div>
      </div>
      {hasStatus && (
        <div className={`task-status-icon ${getStatusClass(status)}`}>
          <img src={`/icons/${statusIcon}`} alt={`${status} icon`} width={20} height={20} />
        </div>
      )}
    </div>
  );
};

export default TaskCard;
