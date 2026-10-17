import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const privacy = [
  {
    id: "apagar",
    label: "Apagar os prints do servidor depois de gerar o documento",
    hint: "Eles continuam no arquivo que você salvou.",
  },
  {
    id: "conferir",
    label: "Mostrar os prints antes de enviar para a IA",
    hint: "Para você conferir se não há dado sensível na tela.",
  },
]

export function Conta() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-10 md:px-10">
      <header className="flex flex-wrap items-center gap-4">
        <Avatar className="size-12">
          <AvatarFallback className="aura-soft text-base font-medium text-aura-ink">P</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-xl font-semibold tracking-tight">[Seu nome]</h1>
          <p className="text-sm text-muted-foreground">[seu e-mail] · entrou com Google</p>
        </div>
        <Button variant="outline">Editar perfil</Button>
      </header>

      <section className="flex flex-col gap-5">
        <h2 className="text-sm font-medium">Documentos</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="idioma" className="text-muted-foreground">Idioma</Label>
            <Select defaultValue="pt">
              <SelectTrigger id="idioma" className="h-10 w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pt">Português</SelectItem>
                <SelectItem value="tela">Mesmo idioma da tela</SelectItem>
                <SelectItem value="en">Inglês</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="formato" className="text-muted-foreground">Formato padrão</Label>
            <Select defaultValue="pdf">
              <SelectTrigger id="formato" className="h-10 w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="md">Markdown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <Separator />

      <section className="flex flex-col gap-1">
        <h2 className="mb-3 text-sm font-medium">Privacidade</h2>
        {privacy.map((p) => (
          <div key={p.id} className="flex items-center gap-6 py-3">
            <Label htmlFor={p.id} className="flex flex-1 flex-col items-start gap-1 font-normal">
              <span>{p.label}</span>
              <span className="text-sm text-muted-foreground">{p.hint}</span>
            </Label>
            <Switch id={p.id} defaultChecked />
          </div>
        ))}
      </section>

      <Separator />

      <section className="flex flex-wrap gap-2">
        <Button variant="outline">Sair</Button>
        <Button variant="ghost" className="text-destructive hover:text-destructive">
          Excluir conta e documentos
        </Button>
      </section>
    </div>
  )
}
