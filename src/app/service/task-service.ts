import { TaskDTO, TaskDomain } from "../model/domain/Task";
import { baseUrl } from "../utils/constants";
const fetchTasksUrl = `${baseUrl}/fetchTasks`;
const deleteTaskUrl = `${baseUrl}/deleteTaskById?id=`;
const saveTaskUrl = `${baseUrl}/saveTask`;

export async function fetchTasks(
  success: (data: TaskDomain[]) => void,
  error: (msg: string) => void
) {
  try {
    const response = await fetch(fetchTasksUrl);
    const resultBody = await response.json();
    if (resultBody.result && resultBody.result.length == 0) {
    } else {
      var tasksData: TaskDTO[] = resultBody as TaskDTO[];
      success(tasksData as TaskDomain[]);
    }
  } catch (err) {
    error(JSON.stringify(err));
  }
}

export async function deleteTask(taskId: string) {
  try {
    await fetch(`${deleteTaskUrl}${taskId}`);
  } catch (err) {
    console.log(err);
  }
}

export async function saveTask(task: TaskDomain) {
  try {
    const response = await fetch(saveTaskUrl, {
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
