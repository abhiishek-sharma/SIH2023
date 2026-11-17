import React, { useEffect } from "react"

const chatBot = () => {
  useEffect(() => {
    const script1 = document.createElement("script")
    script1.src = "https://cdn.botpress.cloud/webchat/v3.7/inject.js"
    script1.async = true
    document.body.appendChild(script1)

    const script2 = document.createElement("script")
    script2.src = "https://files.bpcontent.cloud/2024/10/24/08/20241024085601-GNUQYZIS.js"
    script2.defer = true
    document.body.appendChild(script2)

    return () => {
      if (document.body.contains(script1)) document.body.removeChild(script1)
      if (document.body.contains(script2)) document.body.removeChild(script2)
    }
  }, [])

  return <div id="webchat"></div>
}

export default chatBot
