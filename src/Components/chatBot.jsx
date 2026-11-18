import { useEffect } from "react"

const INJECT_SRC = "https://cdn.botpress.cloud/webchat/v3.7/inject.js"
const CONFIG_SRC =
  "https://files.bpcontent.cloud/2024/10/24/08/20241024085601-GNUQYZIS.js"
const BRAND_COLOR = "#7B66FF"
// White launcher with a violet icon, so it stands out on the violet hero.
const LAUNCHER_STYLES = `
  .bpFabContainer {
    background: #fff !important;
    box-shadow: 0 4px 16px rgba(123, 102, 255, 0.45) !important;
  }
  .bpFabIcon { background-color: ${BRAND_COLOR} !important; }
`

// While the pointer is over the open chat window, the page must not scroll:
// the wheel only scrolls the chat's message list.
const lockPageScrollOverChat = (e) => {
  const fab = document.getElementById("fab-root")
  if (!fab?.shadowRoot) return
  const path = e.composedPath ? e.composedPath() : []
  const overWindow = path.some(
    (el) => el instanceof HTMLElement && el.classList.contains("bpContainer")
  )
  if (!overWindow) return // closed launcher or elsewhere on the page

  e.preventDefault()
  const list = fab.shadowRoot.querySelector(".bpMessageListContainer")
  const scroller = list
    ? [...list.children].find((el) =>
        /(auto|scroll)/.test(getComputedStyle(el).overflowY)
      )
    : null
  if (scroller) scroller.scrollTop += e.deltaY
}

const chatBot = () => {
  useEffect(() => {
    // The site's Lenis smooth-scroll drives the page from its own wheel
    // listener and ignores preventDefault; this attribute makes Lenis skip
    // wheel events that originate inside the chat widget.
    const markWidget = () => {
      const fab = document.getElementById("fab-root")
      fab?.setAttribute("data-lenis-prevent", "")
      return !!fab
    }
    const observer = new MutationObserver(() => {
      if (markWidget()) observer.disconnect()
    })
    if (!markWidget())
      observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener("wheel", lockPageScrollOverChat, {
      passive: false,
      capture: true,
    })
    return () => {
      observer.disconnect()
      window.removeEventListener("wheel", lockPageScrollOverChat, {
        capture: true,
      })
    }
  }, [])

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
      window.botpress?.on?.("webchat:initialized", () => {
        window.botpress.config({
          configuration: {
            ...window.botpress.configuration,
            color: BRAND_COLOR,
            additionalStylesheet:
              (window.botpress.configuration?.additionalStylesheet || "") +
              LAUNCHER_STYLES,
          },
        })
      })

      const config = document.createElement("script")
      config.id = "bp-config"
      // Botpress serves this file without Cache-Control, so browsers can keep
      // a stale copy for weeks (an old launcher mode left the widget blank).
      config.src = `${CONFIG_SRC}?v=${Date.now()}`
      config.defer = true
      document.body.appendChild(config)
    }
    document.body.appendChild(inject)
  }, [])

  return null
}

export default chatBot
