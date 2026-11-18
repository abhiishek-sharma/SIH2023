import { useEffect } from "react"

const INJECT_SRC = "https://cdn.botpress.cloud/webchat/v3.7/inject.js"
const CONFIG_SRC =
  "https://files.bpcontent.cloud/2024/10/24/08/20241024085601-GNUQYZIS.js"

const chatBot = () => {
  useEffect(() => {
    if (document.getElementById("bp-inject")) return

    // Wipe any stored Botpress conversation before the widget loads, so every
    // page load starts fresh — a hard refresh (or a different visitor on the
    // same machine) never resumes old chat history.
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("bp-webchat-"))
        .forEach((k) => localStorage.removeItem(k))
    } catch {
      /* localStorage blocked (e.g. private mode) — widget still loads */
    }

    const inject = document.createElement("script")
    inject.id = "bp-inject"
    inject.src = INJECT_SRC
    inject.async = true
    inject.onload = () => {
      const config = document.createElement("script")
      config.id = "bp-config"
      config.src = CONFIG_SRC
      config.defer = true
      document.body.appendChild(config)
    }
    document.body.appendChild(inject)
  }, [])

  return null
}

export default chatBot
