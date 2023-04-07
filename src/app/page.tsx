"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CustomTextField from "./design/components/CustomTextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTask, fetchTasks } from "./service/task-service";
import { TaskDomain } from "./model/domain/Task";
import Draggable from "react-draggable";

const textStyle = {
  borderWidth: "6px",
  background: "white",
  borderColor: "gray",
  borderStyle: "solid",
  margin: "10px",
};
const deleteStyle = { marginLeft: "-40px" };
const btnStyle = { height: "40px", minWidht: "120px", margin: "16px" };
export default function Home() {
  const [tasks, setTasks] = useState<TaskDomain[]>([]);

  useEffect(() => {
    if (tasks.length == 0) {
      fetchTasks(success, error);
    }
  }, []);

  const success = (tasks: TaskDomain[]) => {
    console.log(tasks);
    setTasks(tasks);
  };
  const error = (msg: string) => {
    console.log(msg);
  };

  const handleAddQuery = () => {
    setTasks([...tasks, { id: uuidv4(), text: "", showDelete: false }]);
  };

  const onQueryChange = (taskId: string, newText: string) => {
    tasks.map(async (task) => {
      if (task.id == taskId) {
        task.text = newText;
      }
    });
  };

  const handleDeleteTask = (id: string) => {
    tasks.map(async (task) => {
      if (task.id == id) {
        let taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
        setTasks([...tasks]);
        deleteTask(task.id);
      }
    });
  };

  const showDeleteBtn = (show: boolean, id: string) => {
    tasks.map((task) => {
      if (task.id == id) {
        let taskIndex = tasks.indexOf(task);
        tasks[taskIndex].showDelete = show;
        setTasks([...tasks]);
      }
    });
  };
  return (
    <div className={styles.container}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {tasks.map((task) => {
          return (
            <Draggable>
              <div
                style={textStyle}
                key={task.id}
                onMouseEnter={() => {
                  showDeleteBtn(true, task.id);
                }}
                onMouseLeave={() => {
                  showDeleteBtn(false, task.id);
                }}
              >
                <CustomTextField
                  givenText={task.text}
                  taskId={task.id}
                  onTextChange={(newText: string) => {
                    onQueryChange(task.id, newText);
                  }}
                />
                {task.showDelete && (
                  <Tooltip
                    title="Delete"
                    style={deleteStyle}
                    onClick={() => {
                      handleDeleteTask(task.id);
                    }}
                  >
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </Draggable>
          );
        })}

        <Button style={btnStyle} variant="contained" onClick={handleAddQuery}>
          Add Query
        </Button>
      </Grid>
    </div>
  );
}
