export function LoadingSpinner() {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-sm flex items-center justify-center z-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-300" />
      </div>
    )
  }
  
  