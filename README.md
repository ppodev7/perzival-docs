# Perzival

IA que cria documentação a partir do que está na sua tela: você compartilha a tela, tira prints de evidência e
o Perzival escreve o documento num pop-up para revisar e exportar.

## Estado atual
Mockup navegável das telas (sem back-end): Biblioteca, Sessão com mini janela, Revisão do documento,
Integrações e Conta. Next.js + React + Tailwind + componentes shadcn/ui, tema escuro.

## Rodando
```bash
npm install
npm run dev        # app em http://localhost:3000
                   # mockup em um único HTML: http://localhost:3000/mockup.html
npm run mockup:html   # regenera public/mockup.html depois de mudar as telas
```

`public/mockup.html` tem tudo embutido (CSS, JavaScript e fontes), então também abre direto no navegador,
com dois cliques, sem servidor.

## Branches
- `main`: versão estável
- `dev`: integração das etapas
- `feature/<nome>` e `fix/<nome>`: saem de `dev` e voltam por PR para `dev`

Sistema de interface: [`.interface-design/system.md`](.interface-design/system.md).
