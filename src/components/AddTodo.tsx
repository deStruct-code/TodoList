import {useState} from "react";
import "../App.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

function App() {
    const [value, setValue] = useState<string>("");
    const [tasks, setTasks] = useState<Array<{text: string; done: boolean}>>(
        []
    );

    const addTask = (): void => {
        if (value.trim() !== "") {
            setTasks([...tasks, {text: value, done: false}]);
            setValue("");
        }
    };

    const toggleTask = (index: number): void => {
        const copyTasks = [...tasks];
        copyTasks[index] = {...copyTasks[index], done: !copyTasks[index].done};
        setTasks(copyTasks);
    };

    const deleteTask = (index: number): void => {
        let copyTasks = [...tasks];
        copyTasks = [
            ...copyTasks.slice(0, index),
            ...copyTasks.slice(index + 1),
        ];
        setTasks(copyTasks);
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
                            task.done ? "todoItemDone" : ""
                        }`}
                    >
                        {task.done && <DoneIcon />}

                        {task.text}
                        
                        <Button
                            className="deleteBtn"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(index);
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
