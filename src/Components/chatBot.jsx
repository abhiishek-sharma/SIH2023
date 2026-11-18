import React, { useState } from "react"

const SHAREABLE_URL =
  "https://cdn.botpress.cloud/webchat/v3.7/shareable.html?configUrl=https://files.bpcontent.cloud/2024/10/24/08/20241024085601-L6J2JLYX.json"

const chatBot = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* FAB toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Chanakya chat" : "Open Chanakya chat"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#26ebeb",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(38,235,235,0.5)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          transition: "transform 0.2s",
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat iframe */}
      {open && (
        <iframe
          src={SHAREABLE_URL}
          title="Chanakya AI Assistant"
          allow="microphone"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "24px",
            width: "380px",
            height: "580px",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            zIndex: 9998,
          }}
        />
      )}
    </>
  )
}

export default chatBot
