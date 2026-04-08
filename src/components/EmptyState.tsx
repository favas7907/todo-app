import { motion } from "motion/react";
import { ClipboardList } from "lucide-react";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-32 text-center"
    >
      <div className="relative mb-10 group">
        <div className="absolute inset-0 bg-violet-accent/5 blur-[100px] rounded-full group-hover:bg-violet-accent/10 transition-colors duration-1000" />
        <div className="relative bg-card/10 backdrop-blur-3xl border border-border/10 p-10 rounded-[3rem] shadow-premium group-hover:scale-105 transition-all duration-700">
          <ClipboardList className="w-16 h-16 text-violet-accent/10 group-hover:text-violet-accent/20 transition-colors duration-700" />
        </div>
      </div>
      <h3 className="text-2xl sm:text-3xl font-black tracking-tighter mb-3 bg-gradient-to-b from-foreground to-foreground/20 bg-clip-text text-transparent">
        Your slate is clean
      </h3>
      <p className="text-muted-foreground/20 max-w-[260px] mx-auto text-[13px] sm:text-sm font-bold tracking-tight leading-relaxed">
        Capture your thoughts and turn them into actionable tasks.
      </p>
    </motion.div>
  );
}
