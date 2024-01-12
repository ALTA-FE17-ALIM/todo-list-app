import {
  Tooltip as Tool,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

const Tooltip = ({ children, content }: { content: string; children: ReactNode }) => {
  return (
    <TooltipProvider>
      <Tool>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tool>
    </TooltipProvider>
  );
};

export default Tooltip;
