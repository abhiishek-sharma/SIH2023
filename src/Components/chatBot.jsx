import React from "react"

// Botpress webchat scripts are loaded globally in index.html.
// This component is kept as a mount point but rendering is handled by the Botpress SDK.
const chatBot = () => {
  return <div id="webchat"></div>
}

export default chatBot
