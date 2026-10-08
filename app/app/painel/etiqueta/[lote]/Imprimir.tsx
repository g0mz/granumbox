"use client";

export function Imprimir() {
  return (
    <button onClick={() => window.print()} className="apertar rounded-full bg-marca px-6 py-3 font-medium text-sobre-marca hover:bg-marca-forte">
      Imprimir etiquetas
    </button>
  );
}
