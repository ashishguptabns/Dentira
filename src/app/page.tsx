"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { Task } from "./model/domain/Task";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import CustomTextField from "./design/components/CustomTextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { saveTaskApi } from "./api/saveTask/route";

const deleteStyle = { marginLeft: "-40px" };
const btnStyle = { height: "40px", minWidht: "120px", margin: "16px" };
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const handleAddQuery = () => {
    setTasks([...tasks, { id: uuidv4(), text: "", showDelete: false }]);
  };
  const onTextChange = (taskId: string, newText: string) => {
    tasks.map(async (task) => {
      if (task.id == taskId) {
        task.text = newText;
        try {
          const response = await fetch(saveTaskApi, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
          });
          const data = await response.json();
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const handleDelete = (id: string) => {
    tasks.map((task) => {
      if (task.id == id) {
        let taskIndex = tasks.indexOf(task);
        tasks.splice(taskIndex, 1);
        console.log(tasks);
        setTasks([...tasks]);
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
                text={task.text}
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
