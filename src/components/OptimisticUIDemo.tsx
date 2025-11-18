import { useState } from "react";
import { INITIAL_ITEMS } from "../constants";
import type { TaskItem, ItemStatus } from "../types";
import { DropZone } from "./DropZone";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const simulateAPI = (shouldFail = false): Promise<{ success: boolean }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error("Falha na sincronização"));
      else resolve({ success: true });
    }, 1500);
  });
};

export default function OptimisticUIDemo() {
  const [pessimisticItems, setPessimisticItems] = useState<TaskItem[]>(INITIAL_ITEMS);
  const [pessimisticLoading, setPessimisticLoading] = useState<number | null>(null);
  const [pessimisticError, setPessimisticError] = useState<string | null>(null);

  const [optimisticItems, setOptimisticItems] = useState<TaskItem[]>(INITIAL_ITEMS);
  const [optimisticSyncing, setOptimisticSyncing] = useState<number | null>(null);
  const [syncStatus, setSyncStatus] = useState<"syncing" | "success" | "error" | null>(null);

  const handlePessimisticDrop = async (itemId: number, newStatus: ItemStatus) => {
    setPessimisticLoading(itemId);
    setPessimisticError(null);

    try {
      await simulateAPI(itemId === 3);
      setPessimisticItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, status: newStatus } : item
        )
      );
    } catch {
      setPessimisticError("Erro ao mover item! A operação falhou no servidor.");
      setTimeout(() => setPessimisticError(null), 3000);
    } finally {
      setPessimisticLoading(null);
    }
  };

  const handleOptimisticDrop = async (itemId: number, newStatus: ItemStatus) => {
    const previous = [...optimisticItems];

    setOptimisticItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, status: newStatus } : i))
    );

    setOptimisticSyncing(itemId);
    setSyncStatus("syncing");

    try {
      await simulateAPI(itemId === 3);
      setSyncStatus("success");
      setTimeout(() => {
        setOptimisticSyncing(null);
        setSyncStatus(null);
      }, 500);
    } catch {
      setOptimisticItems(previous);
      setSyncStatus("error");
      setTimeout(() => {
        setOptimisticSyncing(null);
        setSyncStatus(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Optimistic UI Demo
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Arraste as tarefas e compare os comportamentos
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-red-600">Sem Optimistic UI</h2>

            <div className="grid grid-cols-2 gap-4">
              <DropZone
                status="todo"
                title="A Fazer"
                items={pessimisticItems}
                onDrop={handlePessimisticDrop}
                loadingId={pessimisticLoading}
              />
              <DropZone
                status="done"
                title="Concluído"
                items={pessimisticItems}
                onDrop={handlePessimisticDrop}
                loadingId={pessimisticLoading}
              />
            </div>

            {pessimisticError && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700">
                <XCircle size={16} /> {pessimisticError}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-green-600">Com Optimistic UI</h2>

            <div className="grid grid-cols-2 gap-4">
              <DropZone
                status="todo"
                title="A Fazer"
                items={optimisticItems}
                onDrop={handleOptimisticDrop}
                syncingId={optimisticSyncing}
              />
              <DropZone
                status="done"
                title="Concluído"
                items={optimisticItems}
                onDrop={handleOptimisticDrop}
                syncingId={optimisticSyncing}
              />
            </div>

            <div className="mt-4 p-4 rounded-lg">
              {syncStatus === "syncing" && (
                <div className="flex items-center gap-2 text-blue-700">
                  <Loader2 size={16} className="animate-spin" />
                  Sincronizando...
                </div>
              )}
              {syncStatus === "success" && (
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle2 size={16} />
                  Sincronizado!
                </div>
              )}
              {syncStatus === "error" && (
                <div className="flex items-center gap-2 text-red-700">
                  <XCircle size={16} />
                  Erro — alterações revertidas.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
