"use client"

import { FolderOpen, Plug, Radio, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/perzival/logo"
import { cn } from "@/lib/utils"

export type Screen = "biblioteca" | "sessao" | "revisar" | "integracoes" | "conta"

const nav: { id: Screen; label: string; icon: typeof FolderOpen }[] = [
  { id: "biblioteca", label: "Biblioteca", icon: FolderOpen },
  { id: "integracoes", label: "Integrações", icon: Plug },
  { id: "conta", label: "Conta", icon: UserRound },
]

export function AppShell({
  screen,
  go,
  children,
}: {
  screen: Screen
  go: (s: Screen) => void
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex shrink-0 flex-col gap-6 border-b px-4 py-5 md:w-60 md:border-r md:border-b-0">
        <div className="px-2">
          <Logo />
        </div>

        <Button variant="aura" size="lg" className="w-full" onClick={() => go("sessao")}>
          <Radio />
          Iniciar sessão
        </Button>

        <nav aria-label="Menu principal" className="flex gap-1 md:flex-col">
          {nav.map((item) => {
            const active = screen === item.id
            return (
              <button
                key={item.id}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => go(item.id)}
                className={cn(
                  "flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                  active
                    ? "bg-accent font-medium text-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto hidden px-2 md:block">
          <p className="text-xs text-faint-foreground">Atalho para documentar</p>
          <kbd className="mt-1.5 inline-flex gap-1 font-mono text-xs text-muted-foreground">
            <span className="rounded border px-1.5 py-0.5">Ctrl</span>
            <span className="rounded border px-1.5 py-0.5">Shift</span>
            <span className="rounded border px-1.5 py-0.5">D</span>
          </kbd>
        </div>
      </aside>

      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}
