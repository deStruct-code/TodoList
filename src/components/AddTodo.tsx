import {useState} from "react";
import "../App.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";

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

    const editTask = (index: number): void => {
        let copyTasks = [...tasks];
        [copyTasks[index]][0].text = 'ВМЕСТЕ ЛЕГЧЕ'
        setTasks(copyTasks)
        
    }

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
                        <div className="taskContent">
                            {task.done && <DoneIcon />}

                            {task.text}
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
