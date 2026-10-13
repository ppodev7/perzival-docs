"use client"

import { useEffect, useRef, useState } from "react"
import { Camera, GripVertical, Sparkles, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { RastroFrame } from "@/components/perzival/rastro"

function clock(seconds: number) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0")
  const s = String(seconds % 60).padStart(2, "0")
  return `${m}:${s}`
}

export function Sessao({ onDocument, onEnd }: { onDocument: () => void; onEnd: () => void }) {
  const [open, setOpen] = useState(true)
  const [elapsed, setElapsed] = useState(252)
  const [shots, setShots] = useState<string[]>(["14:02", "14:03"])
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const drag = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(t)
  }, [])

  // No mockup, cada print novo fica um minuto depois do anterior.
  function snap() {
    setShots((s) => {
      const [h, m] = s[s.length - 1].split(":").map(Number)
      const next = h * 60 + m + 1
      return [...s, `${String(Math.floor(next / 60) % 24).padStart(2, "0")}:${String(next % 60).padStart(2, "0")}`]
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[oklch(0.11_0.006_295)] p-4 md:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="flex items-center gap-2 text-muted-foreground">
          <span className="rec-dot size-2 rounded-full bg-destructive" />
          O Perzival está vendo esta janela. Seu trabalho continua normal.
        </p>
        <Button variant="ghost" size="sm" onClick={onEnd}>
          Encerrar sessão
        </Button>
      </div>

      {/* Exemplo da tela que o usuário está usando */}
      <section
        aria-label="Exemplo da tela compartilhada"
        className="flex min-h-[640px] flex-col overflow-hidden rounded-xl bg-[#f4f3ef] text-[#1c1c22] opacity-90"
      >
        <div className="flex items-center gap-2 border-b border-black/10 bg-[#e8e6e0] px-4 py-2.5 font-mono text-xs text-black/50">
          <span className="size-2.5 rounded-full bg-black/15" />
          <span className="size-2.5 rounded-full bg-black/15" />
          <span className="size-2.5 rounded-full bg-black/15" />
          <span className="ml-3">erp.suaempresa.com/notas-fiscais/nova</span>
        </div>
        <div className="flex flex-1 flex-col md:flex-row">
          <div className="flex gap-4 bg-black/[0.03] p-6 text-sm text-black/50 md:w-52 md:flex-col">
            <span>Vendas</span>
            <span className="font-semibold text-black/80">Notas fiscais</span>
            <span>Clientes</span>
            <span>Estoque</span>
          </div>
          <div className="flex flex-1 flex-col gap-5 p-8">
            <h2 className="text-xl font-semibold">Nova nota fiscal</h2>
            <div className="grid max-w-xl grid-cols-2 gap-4">
              {["Cliente", "CFOP", "Produto", "Valor"].map((f) => (
                <div key={f} className="flex flex-col gap-1.5 text-xs text-black/50">
                  {f}
                  <div className="h-10 rounded-md border border-black/15 bg-white" />
                </div>
              ))}
            </div>
            <div className="h-10 w-36 rounded-md bg-black/15" />
          </div>
        </div>
      </section>

      {open ? (
        <aside
          aria-label="Mini janela do Perzival"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          className="absolute top-24 right-6 w-[300px] rounded-2xl bg-popover text-popover-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_24px_48px_-12px_rgba(0,0,0,0.7)] md:right-12"
        >
          <div
            className="flex cursor-grab touch-none items-center gap-2 py-2 pr-2 pl-3 active:cursor-grabbing"
            onPointerDown={(e) => {
              drag.current = { x: e.clientX - pos.x, y: e.clientY - pos.y }
              e.currentTarget.setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => {
              if (drag.current) setPos({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y })
            }}
            onPointerUp={() => (drag.current = null)}
          >
            <GripVertical className="size-4 text-faint-foreground" aria-hidden />
            <span className="flex items-center gap-2 rounded-full bg-destructive/12 px-2 py-0.5 font-mono text-xs text-[oklch(0.78_0.12_22)] tabular-nums">
              <span className="rec-dot size-1.5 rounded-full bg-destructive" />
              {clock(elapsed)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto size-8"
              aria-label="Fechar mini janela"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </div>

          <div className="flex flex-col gap-2 px-3 pb-3">
            <Button variant="outline" size="lg" className="w-full" onClick={snap}>
              <Camera />
              Print de evidência
            </Button>
            <Button variant="aura" size="lg" className="w-full" onClick={onDocument}>
              <Sparkles />
              Documentar
            </Button>
          </div>

          <div className="border-t px-3 pt-3 pb-3.5">
            <p className="mb-2.5 flex items-baseline justify-between text-xs text-muted-foreground">
              Rastro desta sessão
              <span className="font-mono tabular-nums text-faint-foreground">{shots.length}</span>
            </p>
            <div className="grid grid-cols-4 gap-2">
              {shots.slice(-4).map((at, i, arr) => (
                <RastroFrame
                  key={`${at}-${shots.length - arr.length + i}`}
                  index={shots.length - arr.length + i + 1}
                  at={at}
                  active={i === arr.length - 1}
                />
              ))}
            </div>
          </div>
        </aside>
      ) : (
        <Button
          variant="secondary"
          className="absolute top-24 right-6 rounded-full shadow-lg md:right-12"
          onClick={() => setOpen(true)}
        >
          Mini janela fechada. A sessão continua · Reabrir
        </Button>
      )}
    </div>
  )
}
