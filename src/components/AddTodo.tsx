import {useState} from "react";
import {useEffect} from "react";
import "../App.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";

function App() {
    const [value, setValue] = useState<string>("");
    const [tasks, setTasks] = useState<Todo[]>([]);
    const [sortDirection, setSortDirection] = useState<"new" | "old">("old");


    interface Todo {
        id: number;
        text: string;
        completed: boolean;
        isEditing?: boolean;
    }

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks);
                if (Array.isArray(parsedTasks)) {
                    setTasks(parsedTasks);
                } else {
                    setTasks([]); 
                }
            } catch (e) {
                setTasks([]); 
            }
        }
    }, []);

    const addTask = (): void => {
        if (value.trim() !== "") {
            const newTask: Todo = {
                id: Date.now(),
                text: value,
                completed: false,
            };

            const newTasks = [...tasks, newTask];
            setTasks(newTasks);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            setValue("");
        }
    };

    const toggleTask = (id: number): void => {
        const copyTasks = [...tasks]; 
        const taskIndex = copyTasks.findIndex((task) => task.id === id); 
    
        if (taskIndex !== -1) {
            copyTasks[taskIndex] = {
                ...copyTasks[taskIndex],
                completed: !copyTasks[taskIndex].completed, 
            };
            setTasks(copyTasks); 
            localStorage.setItem("tasks", JSON.stringify(copyTasks)); 
        }
    };

    const deleteTask = (id: number): void => {
        const updatedTasks = tasks.filter((task) => task.id !== id); 
        setTasks(updatedTasks); 
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
    };

    const editTask = (id: number): void => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? {...task, isEditing: true} : task 
        );
    
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); 
    };

    const saveEditedTask = (id: number, editedText: string): void => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id 
                    ? {
                          ...task,
                          text: editedText.trim() || task.text, 
                          isEditing: false, 
                      }
                    : task
            )
        );
    };

    const sortByID = () => {
        const newDirection = sortDirection === "new" ? "old" : "new";
        const sorted = [...tasks].sort((a, b) =>
            newDirection === "new" ? b.id - a.id : a.id - b.id
        );

        setSortDirection(newDirection);
        setTasks(sorted);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            addTask();
        }
    };

    return (
        <div className="todo">
            <Input
                type="text"
                className="input"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onKeyDown={handleKeyPress}
            />

            <Button className="button" onClick={addTask} variant="contained">
                Add Task
            </Button>

            <Button className="button" onClick={sortByID} variant="contained">
                Sort {sortDirection === "new" ? "↑" : "↓"}
            </Button>

            <ul className="todoList">
                {Array.isArray(tasks) && tasks.map((task) => (

                    <li
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`todoItem ${
                            task.completed ? "todoItemDone" : ""
                        }`}
                    >
                        <div className="taskContent">
                            {task.isEditing ? (
                                <input
                                    type="text"
                                    value={task.text}
                                    onChange={(e) => {
                                        const newText = e.target.value;
                                        setTasks((prev) =>
                                            prev.map((t) =>
                                                t.id === task.id
                                                    ? {...t, text: newText}
                                                    : t
                                            )
                                        );
                                    }}
                                    onBlur={() =>
                                        saveEditedTask(task.id, task.text)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            saveEditedTask(task.id, task.text);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <>
                                    {task.completed && <DoneIcon />}
                                    {task.text}
                                </>
                            )}
                        </div>

                        <div className="buttons">
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    editTask(task.id);
                                }}
                                className="editBtn"
                                sx={{
                                    marginLeft: "auto",
                                    minWidth: "unset",
                                    padding: 0,
                                    background: "none",
                                    border: "none",
                                    color: "#F8EEDF",
                                }}
                            >
                                <EditIcon />
                            </Button>

                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask(task.id);
                                }}
                                className="deleteBtn"
                                sx={{
                                    marginLeft: "auto",
                                    minWidth: "unset",
                                    padding: 0,
                                    background: "none",
                                    border: "none",
                                    color: "#F8EEDF",
                                }}
                            >
                                <DeleteIcon />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
