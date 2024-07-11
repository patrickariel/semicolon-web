import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@semicolon/ui/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsTrigger({
  children,
  className,
  ...props
}: TabsPrimitive.TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        `hover:bg-accent hover:text-accent-foreground group relative flex h-14 flex-auto flex-col items-center justify-center px-8 text-base font-bold transition-colors`,
        className,
      )}
      {...props}
    >
      <p>{children}</p>
      <div className="absolute inset-x-0 bottom-0 mx-auto hidden h-1 w-2/3 rounded-full bg-sky-400 group-data-[state=active]:block" />
    </TabsPrimitive.Trigger>
  );
}

export function TabsList({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <TabsPrimitive.List
      className={cn("flex justify-stretch", className)}
      {...props}
    >
      {children}
    </TabsPrimitive.List>
  );
}

export const TabsContent = TabsPrimitive.Content;
