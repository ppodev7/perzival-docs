"use client"

import { useState } from "react"
import { FileDown, RotateCw, Sparkles, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RastroFrame } from "@/components/perzival/rastro"
import { docTypes, draft } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const destinations = [
  { id: "pdf", label: "PDF", note: "no seu PC", soon: false },
  { id: "md", label: "Markdown", note: "no seu PC", soon: false },
  { id: "clickup", label: "ClickUp", note: "em breve", soon: true },
  { id: "notion", label: "Notion", note: "em breve", soon: true },
]

export function Revisar({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [evidences, setEvidences] = useState([
    { id: "1", at: "14:02:10" },
    { id: "2", at: "14:03:41" },
    { id: "3", at: "14:05:02" },
    { id: "4", at: "14:06:18" },
  ])
  const [dest, setDest] = useState("pdf")

  return (
    <div className="min-h-screen bg-[oklch(0.11_0.006_295)] px-4 py-8 md:py-12">
      <section
        role="dialog"
        aria-labelledby="revisar-titulo"
        className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-2xl bg-card shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_32px_64px_-16px_rgba(0,0,0,0.8)]"
      >
        <header className="flex items-center gap-3 border-b px-6 py-4">
          <h1 id="revisar-titulo" className="text-base font-semibold">
            Revisar documento
          </h1>
          <Badge variant="aura">
            <Sparkles />
            Gerado pela IA
          </Badge>
          <Button variant="ghost" size="icon" className="ml-auto" aria-label="Fechar" onClick={onClose}>
            <X />
          </Button>
        </header>

        <div className="flex flex-col md:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-5 p-6">
            <div className="grid gap-4 sm:grid-cols-[1fr_200px]">
              <div className="flex flex-col gap-2">
                <Label htmlFor="titulo" className="text-muted-foreground">Título</Label>
                <Input id="titulo" defaultValue={draft.title} className="h-10 text-base font-medium" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tipo" className="text-muted-foreground">Tipo</Label>
                <Select defaultValue={draft.type}>
                  <SelectTrigger id="tipo" className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {docTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="conteudo" className="text-muted-foreground">Conteúdo</Label>
              <Textarea
                id="conteudo"
                defaultValue={draft.body}
                className="min-h-80 font-mono text-[13px] leading-relaxed"
              />
            </div>
            <p className="text-xs text-faint-foreground">
              Contexto usado: tela de erp.suaempresa.com e {evidences.length} evidências.
            </p>
          </div>

          <aside className="flex flex-col gap-6 border-t bg-background/40 p-6 md:w-80 md:border-t-0 md:border-l">
            <div>
              <p className="mb-3 flex items-baseline justify-between text-sm font-medium">
                Rastro
                <span className="font-mono text-xs font-normal tabular-nums text-faint-foreground">
                  {evidences.length}
                </span>
              </p>
              <ol className="grid grid-cols-2 gap-3">
                {evidences.map((e, i) => (
                  <li key={e.id} className="group relative">
                    <RastroFrame index={i + 1} at={e.at} />
                    <Button
                      variant="secondary"
                      size="icon"
                      aria-label={`Remover evidência ${i + 1}`}
                      className="absolute top-1.5 right-1.5 size-7 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                      onClick={() => setEvidences((list) => list.filter((x) => x.id !== e.id))}
                    >
                      <X />
                    </Button>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <p id="destino" className="mb-3 text-sm font-medium">Salvar em</p>
              <RadioGroup aria-labelledby="destino" value={dest} onValueChange={setDest} className="gap-1.5">
                {destinations.map((d) => (
                  <Label
                    key={d.id}
                    htmlFor={`dest-${d.id}`}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-md px-3 font-normal shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
                      dest === d.id && "bg-accent shadow-[inset_0_0_0_1px_var(--primary)]",
                      d.soon && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <RadioGroupItem id={`dest-${d.id}`} value={d.id} disabled={d.soon} />
                    {d.label}
                    <span className="ml-auto text-xs text-faint-foreground">{d.note}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          </aside>
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-2 border-t px-6 py-4">
          <Button variant="ghost">
            <RotateCw />
            Regerar
          </Button>
          <Button size="lg" onClick={onSave}>
            <FileDown />
            {dest === "md" ? "Salvar Markdown" : "Exportar PDF"}
          </Button>
        </footer>
      </section>
    </div>
  )
}
