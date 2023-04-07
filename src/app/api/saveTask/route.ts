import { ResponseCode } from "@/app/model/Response";
import { Task } from "@/app/model/domain/Task";
import { NextApiRequest, NextApiResponse } from "next";

export const saveTaskApi = "api/saveTask";

var tasks: Task[] = [];

export async function POST(req: NextApiRequest) {
  try {
    const taskToSave = req.body;
    console.log(JSON.stringify(taskToSave));

    if (taskToSave != null) {
      console.log(taskToSave);
      let taskExists = false;
      tasks.map((task) => {
        if (task.id == taskToSave.id) {
          let taskIndex = tasks.indexOf(task);
          tasks[taskIndex] = taskToSave;
          taskExists = true;
        }
      });
      if (!taskExists) {
        tasks.push(taskToSave);
      }
    }

    new Response("Hello");
  } catch (err) {
    console.log(err);
    new Response("Error");
  }
}
