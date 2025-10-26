import { X } from "lucide-react";

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const RetroWindow = ({ title, children, className = "" }: RetroWindowProps) => {
  return (
    <div className={`win95-window ${className}`}>
      <div className="win95-titlebar">
        <span>{title}</span>
        <button className="w-4 h-4 win95-button flex items-center justify-center p-0">
          <X className="w-3 h-3" />
        </button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
