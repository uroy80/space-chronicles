"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Key, CheckCircle, XCircle, AlertCircle } from "lucide-react"

export function ConfigStatus() {
  const [status, setStatus] = useState<{
    configured: boolean
    valid: boolean
    masked: string
  } | null>(null)

  useEffect(() => {
    // Check API key status on client side
    fetch("/api/config-status")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() => setStatus({ configured: false, valid: false, masked: "Error checking status" }))
  }, [])

  if (!status) return null

  const getStatusIcon = () => {
    if (!status.configured) return <XCircle className="w-4 h-4 text-red-400" />
    if (!status.valid) return <AlertCircle className="w-4 h-4 text-yellow-400" />
    return <CheckCircle className="w-4 h-4 text-green-400" />
  }

  const getStatusColor = () => {
    if (!status.configured) return "border-red-500/30 bg-red-500/10"
    if (!status.valid) return "border-yellow-500/30 bg-yellow-500/10"
    return "border-green-500/30 bg-green-500/10"
  }

  const getStatusText = () => {
    if (!status.configured) return "API Key Not Configured"
    if (!status.valid) return "API Key Invalid"
    return "API Key Configured"
  }

  return (
    <motion.div
      className={`fixed bottom-4 right-4 p-3 rounded-lg border backdrop-blur-sm ${getStatusColor()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="flex items-center space-x-2 text-sm">
        <Key className="w-4 h-4 text-slate-400" />
        {getStatusIcon()}
        <span className="text-slate-300">{getStatusText()}</span>
      </div>
      <div className="text-xs text-slate-400 mt-1">{status.masked}</div>
    </motion.div>
  )
}
