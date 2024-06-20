import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

const Spinner = React.forwardRef<
  SVGSVGElement,
  React.HTMLAttributes<SVGSVGElement> & { size?: number }
>(({ className, size = 35, ...props }, ref) => (
  <Loader2
    ref={ref}
    size={size}
    className={cn("animate-spin p-0 text-primary/60", className)}
    {...props}
  />
));
Spinner.displayName = "Spinner";

export default Spinner;
