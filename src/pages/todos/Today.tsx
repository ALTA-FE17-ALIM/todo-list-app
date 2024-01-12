/* eslint-disable @typescript-eslint/no-explicit-any */
import AlertDeleteTask from "@/components/AlertDeleteTask";
import FormTask from "@/components/FormTask";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Task, TaskSync } from "@/lib/apis/tasks/types";
import {
  closeTask,
  deleteTask,
  getActiveTasks,
  getAllCompletedTasks,
  reOpenTask,
} from "@/lib/apis/tasks/api";
import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast as sonner } from "sonner";
import { useToast } from "@/components/ui/use-toast";
import Tooltip from "@/components/Tooltip";

const Today = () => {
  const { toast } = useToast();
  const [indexEdit, setIndexEdit] = useState<string | number>();
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [activetasks, setActivetasks] = useState<Task[]>([]);
  const [completedtasks, setCompletedtasks] = useState<TaskSync>();
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const result = await getActiveTasks();
      const completedTasks = await getAllCompletedTasks();
      if (result) [result.sort((a: Task, b: Task) => b.order - a.order)];
      setCompletedtasks(completedTasks);
      setActivetasks(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCompleteTask = async (checked: any, id: string) => {
    if (!checked) return;
    try {
      await closeTask(id);
      sonner("Success", {
        description: "task completed",
        action: {
          label: "undo",
          onClick: () => handleReOpenTask(id),
        },
      });
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReOpenTask = async (id: string) => {
    try {
      await reOpenTask(id);
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      toast({
        description: "Your task has been deleted",
        duration: 3000,
      });
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container  p-8 rounded">
        <h1 className="text-3xl font-medium">Today</h1>
        <div className="flex  flex-col gap-3 py-8">
          {formIsOpen ? (
            <FormTask placeholder={true} onClose={() => setFormIsOpen(false)} refetch={getTasks} />
          ) : (
            <button
              className="bg-transparent border rounded-md px-4 py-2 flex items-center gap-x-4"
              onClick={() => setFormIsOpen(!formIsOpen)}>
              <Plus className="text-black/50" />
              Add new task
            </button>
          )}

          {activetasks?.map((task, index) => (
            <>
              {indexEdit === task.id ? (
                <FormTask
                  placeholder={false}
                  id={task.id}
                  type="update"
                  onClose={() => setIndexEdit(-1)}
                  refetch={getTasks}
                />
              ) : (
                <div key={index} className="w-full px-4 py-5  border-b-2 group cursor-pointer">
                  <div className="flex items-center gap-x-6 justify-between ">
                    <Checkbox
                      className="rounded-xl"
                      onCheckedChange={(e: any) => handleCompleteTask(e, task.id)}
                    />
                    <div className="flex flex-col w-full">
                      <div
                        className={`text-start font-semibold text-base flex justify-between items-start `}>
                        {task.content}
                        <div className="flex items-center gap-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                          <Tooltip content="Edit Task">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIndexEdit(task.id)}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </Tooltip>

                          <AlertDeleteTask onAction={() => handleDelete(task.id)}>
                            <Tooltip content="Delete Task">
                              <Button variant={"destructive"} size="sm">
                                <Trash className="w-4 h-4" />
                              </Button>
                            </Tooltip>
                          </AlertDeleteTask>
                        </div>
                      </div>
                      <p className="text-sm">{task.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}

          {completedtasks?.items.map((task) => (
            <div key={task.id} className="w-full px-4 py-2 border-b-2">
              <div className="flex items-center gap-x-6 justify-between">
                <Checkbox
                  className="rounded-xl"
                  checked={true}
                  onCheckedChange={() => handleReOpenTask(task.task_id)}
                />
                <div className="flex flex-col w-full ">
                  <div className={`text-start font-semibold text-base line-through`}>
                    {task.content}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center justify-end w-full gap-x-4 py-3">
                      <AlertDeleteTask onAction={() => handleDelete(task.task_id)}>
                        <Button variant={"destructive"} size="sm">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </AlertDeleteTask>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Today;
