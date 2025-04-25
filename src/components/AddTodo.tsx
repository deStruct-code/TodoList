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
    const [tasks, setTasks] = useState<
        Array<{text: string; isDone: boolean; isEditing?: boolean}>
    >([]);

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    const addTask = (): void => {
        if (value.trim() !== "") {
            const newTasks = [...tasks, {text: value, isDone: false}];
            setTasks(newTasks);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            setValue("");
        }
    };

    const toggleTask = (index: number): void => {
        const copyTasks = [...tasks];
        copyTasks[index] = {
            ...copyTasks[index],
            isDone: !copyTasks[index].isDone,
        };
        setTasks(copyTasks);
        localStorage.setItem("tasks", JSON.stringify(copyTasks));
    };

    const deleteTask = (index: number): void => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const editTask = (index: number) => {

            const updatedTasks = tasks.map((task, i) =>
                i === index ? {...task, isEditing: true} : task
            );

            setTasks(updatedTasks);

            localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    };

    const saveEditedTask = (index: number, editedText: string) => {
        setTasks((prev) =>
            prev.map((task, i) =>
                i === index
                    ? {
                          ...task,
                          text: editedText.trim() || task.text,
                          isEditing: false,
                      }
                    : task
            )
        );
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
                color="primary"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                onKeyDown={handleKeyPress}
            />

            <Button className="button" onClick={addTask} variant="contained">
                Add Task
            </Button>

            <ul className="todoList">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        onClick={() => toggleTask(index)}
                        className={`todoItem ${
                            task.isDone ? "todoItemDone" : ""
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
                                            prev.map((t, i) =>
                                                i === index
                                                    ? {...t, text: newText}
                                                    : t
                                            )
                                        );
                                    }}
                                    onBlur={() =>
                                        saveEditedTask(index, task.text)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            saveEditedTask(index, task.text);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <>
                                    {task.isDone && <DoneIcon />}
                                    {task.text}
                                </>
                            )}
                        </div>

                        <div className="buttons">
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    editTask(index);
                                }}
                                className="editBtn"
                                sx={{
                                    marginLeft: "auto",
                                    minWidth: "unset",
                                    padding: 0,
                                    background: "none",
                                    border: "none",
                                    color: "red",
                                }}
                            >
                                <EditIcon />
                            </Button>

                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteTask(index);
                                }}
                                className="deleteBtn"
                                sx={{
                                    marginLeft: "auto",
                                    minWidth: "unset",
                                    padding: 0,
                                    background: "none",
                                    border: "none",
                                    color: "white",
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
