import { Loader2 } from "lucide-react"

export function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <Loader2
      className={`animate-spin text-cyan-600 ${className}`}
    />
  )
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner className="h-8 w-8" />
        <p className="text-sm text-gray-500">กำลังโหลด...</p>
      </div>
    </div>
  )
}
