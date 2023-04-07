"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CustomTextField from "./design/components/CustomTextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { baseUrl } from "./utils/constants";
import { fetchTasks } from "./service/task";
import { TaskDomain } from "./model/domain/Task";

const deleteTaskUrl = `${baseUrl}/deleteTaskById?id=`;

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

  const onTextChange = (taskId: string, newText: string) => {
    tasks.map(async (task) => {
      if (task.id == taskId) {
        task.text = newText;
      }
    });
  };

  const handleDelete = (id: string) => {
    tasks.map(async (task) => {
      if (task.id == id) {
        let taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
        setTasks([...tasks]);
        try {
          const response = await fetch(`${deleteTaskUrl}${task.id}`);
          // const data = await response.json();
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const showDelete = (show: boolean, id: string) => {
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
          console.log(task.text);
          return (
            <div
              key={task.id}
              onMouseEnter={() => {
                showDelete(true, task.id);
              }}
              onMouseLeave={() => {
                showDelete(false, task.id);
              }}
            >
              <CustomTextField
                givenText={task.text}
                taskId={task.id}
                onTextChange={(newText: string) => {
                  onTextChange(task.id, newText);
                }}
              />
              {task.showDelete && (
                <Tooltip
                  title="Delete"
                  style={deleteStyle}
                  onClick={() => {
                    handleDelete(task.id);
                  }}
                >
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          );
        })}

        <Button style={btnStyle} variant="contained" onClick={handleAddQuery}>
          Add Query
        </Button>
      </Grid>
    </div>
  );
}
