import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [done, setDone] = useState({});

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
    setDone({ ...done, [index]: !done[index] });
  };

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "400px",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            color: "#333",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Task Tracker App
        </h1>
        <div style={{ marginBottom: "20px", display: "flex" }}>
          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "14px",
            }}
          />
          <button
            onClick={addTask}
            style={{
              padding: "10px 15px",
              marginLeft: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Add
          </button>
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((t, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#f7f7f7",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ddd",
              }}
            >
              <span
                style={{
                  textDecoration: done[index] ? "line-through" : "none",
                  color: done[index] ? "#999" : "#333",
                }}
              >
                {t}
              </span>
              <div>
                <button
                  onClick={() => toggleDone(index)}
                  style={{
                    padding: "5px 10px",
                    marginRight: "5px",
                    backgroundColor: done[index] ? "#ffc107" : "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  {done[index] ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => removeTask(index)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        {tasks.length > 0 && (
          <button
            onClick={() => setTasks([])}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
