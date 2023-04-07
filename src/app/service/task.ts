import { TaskDTO, TaskDomain } from "../model/domain/Task";
import { baseUrl } from "../utils/constants";
const fetchTasksUrl = `${baseUrl}/fetchTasks`;

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
