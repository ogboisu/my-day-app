import { useState } from "react";

const initialForm = {
  title: "",
  description: "",
  category: "personal",
  dueDate: "",
  dueTime: "",
};

const TaskForm = ({ onAddTask, loading }) => {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.dueDate || !formData.dueTime) {
      return;
    }

    await onAddTask({
      ...formData,
      title: formData.title.trim(),
    });

    setFormData(initialForm);
  };

  return (
    <form className="task-form card" onSubmit={handleSubmit}>
      <h2>Add Task</h2>

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows="3"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="work">Work</option>
        <option value="study">Study</option>
        <option value="personal">Personal</option>
      </select>

      <div className="task-form__row">
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="dueTime"
          value={formData.dueTime}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn--primary" type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
