import React, { useEffect } from "react"

const chatBot = () => {
  useEffect(() => {
    const script1 = document.createElement("script")
    script1.src = "https://cdn.botpress.cloud/webchat/v3.7/inject.js"

    script1.onload = () => {
      const script2 = document.createElement("script")
      script2.src = "https://files.bpcontent.cloud/2024/10/24/08/20241024085601-GNUQYZIS.js"
      document.body.appendChild(script2)
    }

    document.body.appendChild(script1)

    return () => {
      const s1 = document.querySelector('script[src*="webchat/v3.7/inject.js"]')
      const s2 = document.querySelector('script[src*="GNUQYZIS.js"]')
      if (s1) document.body.removeChild(s1)
      if (s2) document.body.removeChild(s2)
    }
  }, [])

  return <div id="webchat"></div>
}

export default chatBot
