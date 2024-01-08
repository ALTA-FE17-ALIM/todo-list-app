/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTask } from "@/lib/apis/tasks/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
interface PropsFormCreateTask {
  onClose: () => void;
  get: () => void;
}
const FormCreateTask = ({ onClose, get }: PropsFormCreateTask) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateTask = async (e: any) => {
    e.preventDefault();

    const body = {
      content: taskName,
      description: description,
    };

    try {
      const result = await createTask(body);
      if (result) {
        get();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setTaskName("");
      setDescription("");
    }
  };
  return (
    <form
      onSubmit={handleCreateTask}
      className="p-3 space-y-3 border border-gray-400 shadow-sm rounded-md">
      <div className="flex flex-col">
        <Input
          value={taskName}
          placeholder="Task name"
          className="border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 font-medium text-base"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          value={description}
          placeholder={"Description"}
          className="px-3 py-2 border-none outline-none resize-none text-sm"
          onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div className="flex gap-x-3 items-center justify-end">
        <Button className="border rounded-md " variant={"secondary"} type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button className="border rounded-md " disabled={!taskName && !description}>
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default FormCreateTask;
