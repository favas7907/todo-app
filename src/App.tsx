import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Todo, FilterType } from "./types";
import { TodoItem } from "./components/TodoItem";
import { TodoInput } from "./components/TodoInput";
import { EmptyState } from "./components/EmptyState";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";
import { Sparkles } from "lucide-react";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("nexus-todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    localStorage.setItem("nexus-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: 'low' | 'medium' | 'high') => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
      priority,
    };
    setTodos((prev) => [newTodo, ...prev]);
    toast.success("Task added successfully", {
      description: text,
    });
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    const todoToDelete = todos.find(t => t.id === id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast.error("Task deleted", {
      description: todoToDelete?.text,
    });
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
  };

  return (
    <div className="min-h-screen text-foreground selection:bg-primary/10 selection:text-primary">
      <Toaster position="bottom-right" />
      
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-accent/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-violet-accent/5 blur-[120px] rounded-full" />
      </div>

      <main className="relative max-w-2xl mx-auto px-6 pt-12 sm:pt-16 pb-32">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 mb-12 py-6 sm:py-8 -mx-6 px-6 glass rounded-b-[2.5rem] shadow-premium transition-all duration-500">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-accent/5 text-violet-accent text-[10px] font-bold uppercase tracking-[0.25em] mb-6 border border-violet-accent/10"
            >
              <Sparkles className="w-3 h-3" />
              Nexus Productivity
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black tracking-tight mb-3 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent leading-[1.1]"
            >
              Nexus Todo
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground/60 text-sm sm:text-base font-medium tracking-tight max-w-[320px] mx-auto leading-relaxed"
            >
              Streamline your workflow with precision and elegance.
            </motion.p>
          </div>
        </header>

        {/* Input Section */}
        <section className="mb-12 relative z-10">
          <TodoInput onAdd={addTodo} />
        </section>

        {/* Stats & Filters */}
        <section className="mb-8 flex flex-wrap items-center justify-between gap-4 sticky top-[140px] sm:top-[180px] z-40 py-3">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)} className="w-full sm:w-auto">
            <TabsList className="bg-card/40 border border-border/40 p-1 rounded-[1.25rem] h-11 backdrop-blur-xl shadow-premium">
              <TabsTrigger value="all" className="rounded-xl px-5 text-[11px] font-bold tracking-tight data-[state=active]:bg-card data-[state=active]:text-violet-accent data-[state=active]:shadow-premium transition-all duration-300">
                All
              </TabsTrigger>
              <TabsTrigger value="active" className="rounded-xl px-5 text-[11px] font-bold tracking-tight data-[state=active]:bg-card data-[state=active]:text-violet-accent data-[state=active]:shadow-premium transition-all duration-300">
                Active
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-xl px-5 text-[11px] font-bold tracking-tight data-[state=active]:bg-card data-[state=active]:text-violet-accent data-[state=active]:shadow-premium transition-all duration-300">
                Completed
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <motion.div 
            layout
            className="flex items-center gap-6 sm:gap-8 px-5 py-2 bg-card/40 border border-border/40 rounded-[1.25rem] backdrop-blur-xl shadow-premium"
          >
            <div className="flex flex-col items-center">
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-0.5">Active</span>
              <motion.span 
                key={stats.active}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs sm:text-sm font-mono font-black text-violet-accent/80"
              >
                {stats.active.toString().padStart(2, '0')}
              </motion.span>
            </div>
            <div className="w-px h-5 sm:h-6 bg-border/30" />
            <div className="flex flex-col items-center">
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-0.5">Done</span>
              <motion.span 
                key={stats.completed}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs sm:text-sm font-mono font-black text-teal-accent/60"
              >
                {stats.completed.toString().padStart(2, '0')}
              </motion.span>
            </div>
          </motion.div>
        </section>

        {/* Todo List */}
        <section className="space-y-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            ) : (
              <EmptyState key="empty" />
            )}
          </AnimatePresence>
        </section>

        {/* Footer Info */}
        <footer className="mt-20 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm text-[11px] text-muted-foreground/50 font-medium">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              Synced to local storage
            </div>
            <div className="w-px h-3 bg-border/50" />
            <span>v1.0.4</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
