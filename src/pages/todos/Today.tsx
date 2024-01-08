import FormCreateTask from "@/components/FormCreateTask";
import Layout from "@/components/Layout";
import SkeletonTask from "@/components/SkeletonTask";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { getActiveTasks } from "@/lib/apis/tasks/api";
import { Task } from "@/lib/apis/tasks/types";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const Today = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [activetasks, setActivetasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const result = await getActiveTasks();
      if (result) [result.sort((a: Task, b: Task) => b.order - a.order)];
      setActivetasks(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container  p-8 rounded">
        <h1 className="text-3xl font-medium">Today</h1>
        <div className="flex flex-col gap-3 py-8">
          {formIsOpen ? (
            <FormCreateTask onClose={() => setFormIsOpen(false)} get={getTasks} />
          ) : (
            <button
              className="bg-transparent border rounded-md px-4 py-2 flex items-center gap-x-4"
              onClick={() => setFormIsOpen(!formIsOpen)}>
              <Plus className="text-black/50" />
              Add new task
            </button>
          )}

          {isLoading ? <SkeletonTask /> : null}

          {activetasks?.map((task, index) => (
            <Accordion key={index} type="multiple" className="w-full px-4 py-2">
              <AccordionItem
                value={`item-${index + 1}`}
                className="flex items-center gap-x-4 justify-between">
                <Checkbox />
                <div className={`flex flex-col w-full  `}>
                  <AccordionTrigger className="text-start whitespace-normal">
                    {task.content}
                  </AccordionTrigger>
                  <AccordionContent>{task.description}</AccordionContent>
                </div>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Today;
