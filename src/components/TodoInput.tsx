import React, { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Command } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TodoInputProps {
  onAdd: (text: string, priority: 'low' | 'medium' | 'high') => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-accent/20 via-violet-accent/5 to-violet-accent/20 rounded-[2.25rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-1000" />
      <div className="relative flex items-center gap-2 p-1.5 bg-card/40 backdrop-blur-2xl border border-border/20 rounded-[2rem] shadow-premium transition-all duration-500 group-focus-within:border-violet-accent/30 group-focus-within:bg-card/60">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base sm:text-lg h-12 sm:h-14 px-5 sm:px-7 placeholder:text-muted-foreground/30 font-bold tracking-tight"
        />
        
        <div className="flex items-center gap-2 pr-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-9 sm:h-10 rounded-xl sm:rounded-2xl px-3 sm:px-5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] border border-border/10 cursor-pointer hover:bg-violet-accent/5 hover:text-violet-accent transition-all duration-300 bg-card/10")}>
              {priority}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl border-border/20 p-2 glass shadow-premium min-w-[140px]">
              <DropdownMenuItem onClick={() => setPriority('low')} className="rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] py-2.5 focus:bg-violet-accent/10 focus:text-violet-accent">Low</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriority('medium')} className="rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] py-2.5 focus:bg-violet-accent/10 focus:text-violet-accent">Medium</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriority('high')} className="rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] py-2.5 focus:bg-violet-accent/10 focus:text-violet-accent">High</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            type="submit" 
            disabled={!text.trim()}
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl p-0 shadow-lg shadow-violet-accent/10 transition-all active:scale-95 disabled:opacity-10 bg-violet-accent hover:bg-violet-accent/90 hover:shadow-violet-accent/20 hover:scale-105"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-2 opacity-5 group-focus-within:opacity-20 transition-all duration-700">
        <Command className="w-3 h-3" />
        <span className="text-[9px] font-black uppercase tracking-[0.25em]">Press Enter to commit</span>
      </div>
    </form>
  );
}
