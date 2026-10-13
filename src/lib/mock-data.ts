// Dados de exemplo, só para o mockup.

export type DocType = "Passo a passo" | "Registro de bug" | "Nota de reunião" | "Doc técnico"

export type Evidence = { id: string; at: string }

export type DocItem = {
  id: string
  title: string
  type: DocType
  source: string
  evidences: Evidence[]
  date: string
}

export const docTypes: DocType[] = ["Passo a passo", "Registro de bug", "Nota de reunião", "Doc técnico"]

export const docs: DocItem[] = [
  {
    id: "d1",
    title: "Como emitir nota fiscal no ERP",
    type: "Passo a passo",
    source: "erp.suaempresa.com",
    evidences: [{ id: "1", at: "14:02" }, { id: "2", at: "14:03" }, { id: "3", at: "14:05" }, { id: "4", at: "14:06" }],
    date: "Hoje, 14:07",
  },
  {
    id: "d2",
    title: "Erro ao salvar cadastro de cliente",
    type: "Registro de bug",
    source: "crm.suaempresa.com",
    evidences: [{ id: "1", at: "11:40" }, { id: "2", at: "11:41" }],
    date: "Hoje, 11:42",
  },
  {
    id: "d3",
    title: "Alinhamento do sprint 14",
    type: "Nota de reunião",
    source: "meet.google.com",
    evidences: [{ id: "1", at: "10:05" }],
    date: "Ontem, 10:31",
  },
  {
    id: "d4",
    title: "Fluxo de deploy na Vercel",
    type: "Doc técnico",
    source: "vercel.com",
    evidences: [{ id: "1", at: "16:20" }, { id: "2", at: "16:22" }, { id: "3", at: "16:25" }],
    date: "10 out",
  },
  {
    id: "d5",
    title: "Configurar permissões de usuário",
    type: "Passo a passo",
    source: "admin.suaempresa.com",
    evidences: [{ id: "1", at: "09:12" }, { id: "2", at: "09:13" }, { id: "3", at: "09:15" }, { id: "4", at: "09:16" }, { id: "5", at: "09:18" }],
    date: "9 out",
  },
  {
    id: "d6",
    title: "Relatório não carrega os filtros",
    type: "Registro de bug",
    source: "bi.suaempresa.com",
    evidences: [{ id: "1", at: "15:01" }, { id: "2", at: "15:02" }],
    date: "8 out",
  },
]

export const draft = {
  title: "Como emitir nota fiscal no ERP",
  type: "Passo a passo" as DocType,
  body: `## Objetivo
Emitir uma nota fiscal de venda pelo ERP.

## Passos
1. Abra Notas fiscais › Nova nota fiscal. (evidência 1)
2. Escolha o cliente e o CFOP da operação. (evidência 2)
3. Adicione o produto e confira o valor. (evidência 3)
4. Clique em Emitir e aguarde a confirmação. (evidência 4)

## A confirmar
- Qual CFOP usar em vendas para fora do estado.`,
}
