"use client"

import { useState } from "react"

import { AppShell, type Screen } from "@/components/perzival/app-shell"
import { Biblioteca } from "@/components/screens/biblioteca"
import { Conta } from "@/components/screens/conta"
import { Integracoes } from "@/components/screens/integracoes"
import { Revisar } from "@/components/screens/revisar"
import { Sessao } from "@/components/screens/sessao"

// Mockup navegável: as telas trocam por estado, sem back-end.
export default function Home() {
  const [screen, setScreen] = useState<Screen>("biblioteca")

  if (screen === "sessao") {
    return <Sessao onDocument={() => setScreen("revisar")} onEnd={() => setScreen("biblioteca")} />
  }
  if (screen === "revisar") {
    return <Revisar onClose={() => setScreen("sessao")} onSave={() => setScreen("biblioteca")} />
  }

  return (
    <AppShell screen={screen} go={setScreen}>
      {screen === "biblioteca" && <Biblioteca onOpen={() => setScreen("revisar")} />}
      {screen === "integracoes" && <Integracoes />}
      {screen === "conta" && <Conta />}
    </AppShell>
  )
}
