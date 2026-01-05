"use client"

import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { X } from "lucide-react"

const FRC_KICKOFF_DATE = new Date(
  Date.UTC(2026, 0, 10, 17, 0, 0))

export default function FrcKickoffToast() {
  const hasShown = useRef(false)

  useEffect(() => {
    if (hasShown.current) return
    hasShown.current = true

    const remaining = FRC_KICKOFF_DATE.getTime() - Date.now()
    if (remaining <= 0) return

    const toastId = toast.custom((t) => (
      <ToastContent
        remainingMs={remaining}
        toastId={t}
      />
    ), { duration: Infinity })

    const interval = setInterval(() => {
      const ms = FRC_KICKOFF_DATE.getTime() - Date.now()

      if (ms <= 0) {
        toast.dismiss(toastId)
        clearInterval(interval)
        return
      }

      toast.custom((t) => (
        <ToastContent
          remainingMs={ms}
          toastId={t}
        />
      ), { id: toastId })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return null
}

function ToastContent({
  remainingMs,
  toastId,
}: {
  remainingMs: number
  toastId: string | number
}) {
  return (
    <div className="flex items-center gap-4 px-10 py-4 rounded-lg bg-[#DBE9EE] border shadow-md">
      <span className="text-sm font-medium whitespace-nowrap">
        Kickoff in {format(remainingMs)}
      </span>
    </div>
  )
}

function format(ms: number) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24))
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((ms / (1000 * 60)) % 60)

  return `${days} days, ${hours} hours & ${minutes} minutes`
}
