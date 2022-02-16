/* eslint-disable @typescript-eslint/no-explicit-any */
import { TodoistApi } from "@doist/todoist-api-typescript";

const api = new TodoistApi(window.TODOIST_TOKEN);

import {
  createTodoistTaskString,
  dedupTaskList,
  getTodoistProject,
} from "./utils/util";

export const pullTasks = async ({
  todoistFilter,
  onlyDiff,
}: {
  todoistFilter: string;
  onlyDiff: boolean;
}) => {
  const createDescriptionBlock = async ({
    description,
    currentBlockUid,
    currentIndent,
  }: {
    description: string;
    currentBlockUid: any;
    currentIndent: number;
  }) => {
    // const descParentUid = await roam42.common.createBlock(
    //   currentBlockUid,
    //   currentIndent + 1,
    //   `desc::`
    // );
    let descBlockUid;
    const descList = description.split(/\r?\n/);
    for (const [descIndex, desc] of descList.entries()) {
      if (descIndex === 0) {
        // descBlockUid = await roam42.common.createBlock(
        //   descParentUid,
        //   currentIndent + 2,
        //   desc
        // );
        descBlockUid = await roam42.common.createBlock(
          currentBlockUid,
          currentIndent + 1,
          desc
        );
      } else {
        descBlockUid = await roam42.common.createSiblingBlock(
          descBlockUid,
          desc
        );
      }
    }
  };

  const projects = await api.getProjects();
  const tasks = await api.getTasks({ filter: todoistFilter });
  let taskList = tasks.filter((task: any) => !task.parent_id);
  if (onlyDiff) {
    taskList = await dedupTaskList(taskList);
  }
  taskList.sort((a: any, b: any) => {
    return b.priority - a.priority;
  });
  // const subTaskList = tasks.filter((task: any) => task.parent_id);

  const cursorBlockUid = roam42.common.currentActiveBlockUID();
  let currentBlockUid = cursorBlockUid;

  const taskCollection: any = {};
  for (const [taskIndex, task] of taskList.entries()) {
    console.log(taskIndex);
    const project = getTodoistProject(projects, task.projectId);
    const { formattedIntent, taskString } = createTodoistTaskString({ task, project });

    if (!taskCollection[formattedIntent]) {
      taskCollection[formattedIntent] = [];
    }

    taskCollection[formattedIntent].push({
      task,
      taskString,
    });
  }

  for (const taskIntent of Object.keys(taskCollection)) {
    // create taskIntent block
    currentBlockUid = await roam42.common.createSiblingBlock(
      currentBlockUid,
      taskIntent,
      true,
    )
    // create task block
    let taskBlockUid;
    for (const [taskIndex, taskData] of taskCollection[taskIntent].entries()) {
      const { taskString, task } = taskData;
      if (taskIndex === 0) {
        taskBlockUid = await roam42.common.createBlock(
          currentBlockUid,
          2,
          taskString,
        );
      } else {
        taskBlockUid = await roam42.common.createSiblingBlock(
          taskBlockUid,
          taskString
        );
      }
      if (task.description) {
        await createDescriptionBlock({
          description: task.description,
          currentBlockUid: taskBlockUid,
          currentIndent: 3,
        });
      }
      await api.closeTask(task.id);
    }
    // close task
  }

  // for (const [taskIndex, task] of taskList.entries()) {
  //   try {
  //   await api.closeTask(task.id);
  //   } catch (err) {
  //     console.log(`api.closeTask(${task.id}):err`, err);
  //   }

  //   const project = getTodoistProject(projects, task.projectId);
  //   const { formattedIntent, taskString } = createTodoistTaskString({ task, project });
  //   currentBlockUid = await roam42.common.createSiblingBlock(
  //     currentBlockUid,
  //     formattedIntent,
  //     true
  //   );

  //   currentBlockUid = await roam42.common.createBlock(
  //     currentBlockUid,
  //     2,
  //     taskString,
  //   );

  //   // add description
  //   if (task.description) {
  //     await createDescriptionBlock({
  //       description: task.description,
  //       currentBlockUid: currentBlockUid,
  //       currentIndent: 2,
  //     });
  //   }

  //   // add subtask
  //   const subtasks = subTaskList.filter(
  //     (subtask: any) => subtask.parent_id === task.id
  //   );
  //   let currentSubBlockUid;
  //   for (const [subtaskIndex, subtask] of subtasks.entries()) {
  //     if (subtaskIndex === 0) {
  //       currentSubBlockUid = await roam42.common.createBlock(
  //         currentBlockUid,
  //         1,
  //         createTodoistTaskString({
  //           task: subtask,
  //           project,
  //         })
  //       );
  //     } else {
  //       currentSubBlockUid = await roam42.common.createSiblingBlock(
  //         currentSubBlockUid,
  //         createTodoistTaskString({
  //           task: subtask,
  //           project,
  //         }),
  //         true
  //       );
  //     }

  //     // add description
  //     if (subtask.description) {
  //       await createDescriptionBlock({
  //         description: subtask.description,
  //         currentBlockUid: currentSubBlockUid,
  //         currentIndent: 2,
  //       });
  //     }
  //   }
  //   if (taskIndex === 0) {
  //     await roam42.common.deleteBlock(cursorBlockUid);
  //   }
  // }

  return "";
};
