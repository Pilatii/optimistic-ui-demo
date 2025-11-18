import React from "react";
import type { TaskItem, ItemStatus } from "../types";
import { DraggableItem } from "./DraggableItem";

interface Props {
  title: string;
  status: ItemStatus;
  items: TaskItem[];
  loadingId?: number | null;
  syncingId?: number | null;
  onDrop: (itemId: number, newStatus: ItemStatus) => void;
}

export function DropZone({
  title,
  status,
  items,
  onDrop,
  loadingId,
  syncingId,
}: Props) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const itemId = Number(e.dataTransfer.getData("itemId"));
    onDrop(itemId, status);
  };

  const filtered = items.filter((i) => i.status === status);

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="bg-gray-50 rounded-xl p-4 min-h-[300px] border-2 border-dashed border-gray-300"
    >
      <h3 className="font-semibold text-gray-700 mb-3">{title}</h3>

      <div className="space-y-2">
        {filtered.map((item) => (
          <DraggableItem
            key={item.id}
            item={item}
            isLoading={loadingId === item.id}
            isSyncing={syncingId === item.id}
          />
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-8">
            Arraste itens aqui
          </p>
        )}
      </div>
    </div>
  );
}