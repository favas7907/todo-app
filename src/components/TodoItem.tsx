import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, GripVertical } from "lucide-react";
import { Todo } from "../types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  key?: string;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: "bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]",
    medium: "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-[0_0_15px_-5px_rgba(245,158,11,0.3)]",
    high: "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_15px_-5px_rgba(244,63,94,0.3)]",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, x: -10, height: 0, marginBottom: 0, padding: 0 }}
      whileHover={{ y: -1, scale: 1.002 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300",
        "bg-card/30 backdrop-blur-xl border-border/20",
        "hover:border-primary/20 hover:shadow-premium hover:bg-card/40",
        todo.completed && "border-teal-accent/20 bg-teal-accent/[0.02]"
      )}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="relative flex items-center justify-center shrink-0">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="w-5 h-5 rounded-full border-2 transition-all duration-500 data-[state=checked]:bg-teal-accent data-[state=checked]:border-teal-accent shadow-sm"
          />
          <AnimatePresence>
            {todo.completed && (
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 bg-teal-accent rounded-full pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <span
            className={cn(
              "text-sm sm:text-base font-bold tracking-tight transition-all duration-500 break-words leading-tight",
              todo.completed ? "line-through text-teal-accent/50" : "text-foreground"
            )}
          >
            {todo.text}
          </span>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={cn("text-[8px] sm:text-[9px] px-2 py-0.5 uppercase tracking-[0.15em] font-black border-none rounded-md", priorityColors[todo.priority])}>
              {todo.priority}
            </Badge>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/30 font-bold tracking-tight">
              <div className="w-1 h-1 rounded-full bg-current opacity-40" />
              {new Date(todo.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              <span className="opacity-30 font-medium">at</span>
              {new Date(todo.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(todo.id)}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/5 rounded-xl active:scale-90 h-8 w-8"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}
