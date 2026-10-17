import { cn } from "@/lib/utils"
import type { Evidence } from "@/lib/mock-data"

/**
 * O "rastro": a fita de evidências na ordem em que foram tiradas.
 * Aparece compacta na biblioteca e grande na mini janela e na revisão.
 */
export function RastroMini({ evidences }: { evidences: Evidence[] }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${evidences.length} evidências`}>
      {evidences.map((e) => (
        <span key={e.id} className="h-4 w-2.5 rounded-[3px] bg-foreground/15" />
      ))}
      <span className="ml-1.5 font-mono text-xs tabular-nums text-muted-foreground">{evidences.length}</span>
    </div>
  )
}

export function RastroFrame({
  index,
  at,
  active,
  className,
}: {
  index: number
  at: string
  active?: boolean
  className?: string
}) {
  return (
    <figure className={cn("flex flex-col gap-1.5", className)}>
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden rounded-md bg-gradient-to-b from-foreground/[0.07] to-foreground/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
          active && "aura-ring"
        )}
      >
        <div className="absolute inset-x-2 top-2 h-1 rounded-full bg-foreground/10" />
        <div className="absolute left-2 top-5 h-1 w-1/2 rounded-full bg-foreground/10" />
        <div className="absolute left-2 top-8 h-1 w-1/3 rounded-full bg-foreground/10" />
        <span className="absolute bottom-1.5 left-2 font-mono text-[10px] text-muted-foreground">#{index}</span>
      </div>
      <figcaption className="font-mono text-[11px] tabular-nums text-faint-foreground">{at}</figcaption>
    </figure>
  )
}
