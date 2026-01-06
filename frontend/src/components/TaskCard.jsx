import { statuses } from "../data/taskData";

const TaskCard = ({ task, onSelect }) => {
  const { name, description, icon, status } = task;
  const statusConfig = statuses[status];

  return (
    <div
      className={`task-card task-card-status ${statusConfig?.iconClass || ""}`}
      onClick={onSelect}
    >
      <div className="task-left">
        <div className="task-icon">{icon}</div>
        <div className="task-text">
          <h2>{name}</h2>
          {description && <p>{description}</p>}
        </div>
      </div>
      {statusConfig?.icon && (
        <div className={`task-status-icon ${statusConfig?.iconClass}-icon`}>
          <img
            src={statusConfig.icon}
            alt={`${statusConfig.label} icon`}
            width={20}
            height={20}
          />
        </div>
      )}
    </div>
  );
};

export default TaskCard;
