import { useState } from "react";
import { taskSchema } from "../validation/taskSchema";

export const useTaskForm = (task) => {
  const [values, setValues] = useState({
    name: task.name || "",
    description: task.description ?? "",
    icon: task.icon ?? "",
    status: task.status ?? "",
  });

  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const result = taskSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((i) => {
        fieldErrors[i.path[0]] = i.message;
      });
      setErrors(fieldErrors);
      return null;
    }
    return result.data;
  };

  return { values, errors, updateField, validate };
};
