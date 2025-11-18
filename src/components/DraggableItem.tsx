import React from "react";
import { GripVertical, Loader2 } from "lucide-react";
import type { TaskItem } from "../types";

interface Props {
  item: TaskItem;
  isLoading?: boolean;
  isSyncing?: boolean;
}

export function DraggableItem({ item, isLoading, isSyncing }: Props) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("itemId", String(item.id));
  };

  const isErrorItem = item.id === 3;

  return (
    <div
      draggable={!isLoading}
      onDragStart={handleDragStart}
      className={`bg-white p-3 rounded-lg shadow-sm border-2 flex items-center gap-2 cursor-move transition-all
        ${isLoading ? "opacity-50 cursor-wait" : "hover:shadow-md hover:border-blue-300"}
        ${isSyncing ? "border-blue-400 bg-blue-50" : "border-gray-200"}
        ${isErrorItem ? "border-red-300 bg-red-50" : ""}`}
    >
      <GripVertical size={16} className="text-gray-400" />
      <span className="flex-1 whitespace-nowrap">{item.text}</span>

      {isLoading && <Loader2 size={16} className="animate-spin text-gray-400" />}
      {isSyncing && <Loader2 size={16} className="animate-spin text-blue-500" />}
    </div>
  );
}