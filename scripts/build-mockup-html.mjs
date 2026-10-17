// Junta o mockup exportado (out/) num único arquivo: public/mockup.html.
// CSS, JavaScript e fontes ficam embutidos, então o arquivo abre sozinho
// (em /mockup.html com `npm run dev`, ou com dois cliques).
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

const OUT = "out"
const read = (p) => readFileSync(join(OUT, p.replace(/^\.\//, "")))

const inlineFonts = (css, cssPath) =>
  css.replace(/url\(([^)]+\.woff2)\)/g, (_, rel) => {
    const file = join(dirname(cssPath), rel).replace(/^\.\//, "")
    return `url(data:font/woff2;base64,${read(file).toString("base64")})`
  })

let html = readFileSync(join(OUT, "index.html"), "utf8")

// Pré-carregamentos ficam sem sentido com tudo embutido.
html = html.replace(/<link rel="preload"[^>]*>/g, "")

// O CSS e as fontes também são citados nos dados que o React lê ao carregar a página.
// Trocar cada caminho por um data: URL (no HTML e nesses dados) evita qualquer download.
const assetRefs = new Set(html.match(/\.\/next-static\/static\/(?:css\/[\w-]+\.css|media\/[\w.-]+\.woff2)/g) ?? [])
for (const ref of assetRefs) {
  const path = ref.replace(/^\.\//, "")
  const dataUrl = ref.endsWith(".css")
    ? `data:text/css;base64,${Buffer.from(inlineFonts(read(path).toString("utf8"), path)).toString("base64")}`
    : `data:font/woff2;base64,${read(path).toString("base64")}`
  html = html.split(ref).join(dataUrl)
}

html = html.replace(/<script src="([^"]+)"([^>]*)><\/script>/g, (_, src, attrs) => {
  const js = read(src).toString("utf8").replace(/<\/script/gi, "<\\/script")
  const keep = attrs.includes("noModule") || attrs.includes("nomodule") ? " nomodule" : ""
  return `<script${keep}>${js}</script>`
})

html = html.replace(/<link rel="icon"[^>]*>/g, "")

writeFileSync("public/mockup.html", html)
console.log(`public/mockup.html: ${(Buffer.byteLength(html) / 1024).toFixed(0)} KB`)
