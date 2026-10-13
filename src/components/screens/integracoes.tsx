import { FileDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const soon = [
  {
    name: "ClickUp",
    text: "Vai ler a tarefa em que você está trabalhando como contexto e salvar o documento no seu workspace.",
  },
  {
    name: "Notion",
    text: "Vai criar uma página nova, com o rastro de evidências, dentro da página que você escolher.",
  },
]

export function Integracoes() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10 md:px-10">
      <header>
        <p className="text-xs font-medium tracking-wide text-faint-foreground uppercase">Integrações</p>
        <h1 className="mt-1 text-[28px] leading-tight font-semibold tracking-tight">Para onde seus documentos vão</h1>
      </header>

      <Card className="border-0 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2.5 text-base">
            <FileDown className="size-4 text-muted-foreground" />
            Arquivo no PC
          </CardTitle>
          <CardDescription>PDF ou Markdown, baixado direto no seu computador.</CardDescription>
          <CardAction>
            <Badge variant="outline" className="gap-1.5 text-success">
              <span className="size-1.5 rounded-full bg-success" />
              Ativo
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {soon.map((s) => (
          <Card key={s.name} className="border-0 bg-transparent shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
            <CardHeader>
              <CardTitle className="text-base">{s.name}</CardTitle>
              <CardAction>
                <Badge variant="secondary" className="font-normal text-muted-foreground">Em breve</Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-muted-foreground">{s.text}</CardContent>
            <CardFooter>
              <Button variant="outline" disabled>
                Conectar {s.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
