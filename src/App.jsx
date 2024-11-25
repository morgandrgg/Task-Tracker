import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "completed", "pending"
  const [message, setMessage] = useState("");

  // Load tasks from local storage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);

    // Show welcome message
    setMessage("Welcome back to Task Tracker App!");
    const timer = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Save tasks to local storage on update
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, done: false }]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t
    );
    setTasks(updatedTasks);
  };

  const clearAll = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "completed") return t.done;
    if (filter === "pending") return !t.done;
    return true;
  });

  return (
    <div className="page">
      <div className="card">
        <h1 className="heading">Task Tracker App</h1>
        {/* Conditional Rendering for Message */}
        {message && <div className="message">{message}</div>}
        <div className="sub-card">
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input-sect"
          />
          <button onClick={addTask} className="add-btn">
            Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}>
            All
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}>
            Completed
          </button>
          <button
            className={`filter-btn ${filter === "pending" ? "active" : ""}`}
            onClick={() => setFilter("pending")}>
            Pending
          </button>
        </div>

        <ul className="ul-list">
          {/* Rendering List Dynamically with Filters */}
          {filteredTasks.length > 0 ? (
            filteredTasks.map((t, index) => (
              <li key={index} className="li-list">
                <span
                  style={{
                    textDecoration: t.done ? "line-through" : "none",
                    color: t.done ? "#999" : "#333",
                  }}>
                  {t.text}
                </span>
                <div>
                  <button
                    onClick={() => toggleDone(index)}
                    className="done-btn"
                    style={{
                      backgroundColor: t.done ? "#ffc107" : "#28a745",
                    }}>
                    {t.done ? "Undo" : "Done"}
                  </button>
                  <button
                    onClick={() => removeTask(index)}
                    className="remove-btn">
                    Remove
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div className="empty-list">No tasks match the filter!</div>
          )}
        </ul>

        {/* Clear All Button */}
        {tasks.length > 0 && (
          <button onClick={clearAll} className="clear-btn">
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
