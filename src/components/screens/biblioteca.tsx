"use client"

import { useMemo, useState } from "react"
import { FileDown, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RastroMini } from "@/components/perzival/rastro"
import { docs, docTypes, type DocType } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function Biblioteca({ onOpen }: { onOpen: () => void }) {
  const [filter, setFilter] = useState<DocType | "Todos">("Todos")
  const [query, setQuery] = useState("")

  const rows = useMemo(
    () =>
      docs.filter(
        (d) =>
          (filter === "Todos" || d.type === filter) &&
          d.title.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [filter, query]
  )

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:px-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wide text-faint-foreground uppercase">Biblioteca</p>
          <h1 className="mt-1 text-[28px] leading-tight font-semibold tracking-tight">
            {docs.length} documentos registrados
          </h1>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint-foreground" />
          <Input
            aria-label="Buscar documentos"
            placeholder="Buscar por título"
            className="h-10 pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      <div role="group" aria-label="Filtrar por tipo" className="flex flex-wrap gap-1.5">
        {(["Todos", ...docTypes] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
            className={cn(
              "h-8 rounded-full px-3.5 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              filter === t
                ? "bg-foreground text-background"
                : "text-muted-foreground shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-card shadow-[0_0_0_1px_rgba(255,255,255,0.07)]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-11 pl-5">Documento</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Rastro</TableHead>
              <TableHead>Criado</TableHead>
              <TableHead className="pr-5 text-right">
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((d) => (
              <TableRow key={d.id} className="group">
                <TableCell className="py-3.5 pl-5">
                  <button
                    type="button"
                    onClick={onOpen}
                    className="text-left outline-none focus-visible:underline"
                  >
                    <span className="block font-medium">{d.title}</span>
                    <span className="mt-0.5 block font-mono text-xs text-faint-foreground">{d.source}</span>
                  </button>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal text-muted-foreground">
                    {d.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <RastroMini evidences={d.evidences} />
                </TableCell>
                <TableCell className="text-muted-foreground tabular-nums">{d.date}</TableCell>
                <TableCell className="pr-5 text-right">
                  <Button variant="ghost" size="icon" aria-label={`Exportar ${d.title} em PDF`}>
                    <FileDown />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="py-16 text-center text-muted-foreground">
                  Nenhum documento com esse filtro.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
