/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTask, getSingleTask, updateTask } from "@/lib/apis/tasks/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
interface PropsFormCreateTask {
  placeholder?: boolean;
  type?: "create" | "update";
  id?: string;
  onClose: () => void;
  refetch: () => void;
}
const FormCreateTask = ({
  id,
  placeholder,
  onClose,
  refetch,
  type = "create",
}: PropsFormCreateTask) => {
  const { toast } = useToast();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getSingleTask(id!);
        setTaskName(result.content);
        setDescription(result.description);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  const onAction = (e: any) => {
    e.preventDefault();
    if (type === "update") {
      handleUpdateTask();
    } else {
      handleCreateTask();
    }
  };
  const handleCreateTask = async () => {
    const body = {
      content: taskName,
      description: description,
    };

    try {
      const result = await createTask(body);
      if (result) {
        refetch();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setTaskName("");
      setDescription("");
    }
  };

  const handleUpdateTask = async () => {
    const body = {
      content: taskName,
      description: description,
    };

    try {
      await updateTask(id as string, body);
      onClose();
      refetch();
    } catch (error: any) {
      toast({
        title: "Error updating task",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={onAction} className="p-3 space-y-3 border border-gray-400 shadow-sm rounded-md">
      <div className="flex flex-col">
        <Input
          value={taskName}
          placeholder={placeholder ? "Task name" : undefined}
          className="border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 font-medium text-base"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          value={description}
          placeholder={placeholder ? "Description" : undefined}
          className="px-3 py-2 border-none outline-none resize-none text-sm"
          onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div className="flex gap-x-3 items-center justify-end">
        <Button className="border rounded-md " variant={"secondary"} type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button className="border rounded-md capitalize" disabled={!taskName && !description}>
          {type}
        </Button>
      </div>
    </form>
  );
};

export default FormCreateTask;
