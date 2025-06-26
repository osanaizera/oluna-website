'use client'

interface ScrollIndicatorProps {
  targetId: string
  label: string
}

export default function ScrollIndicator({ targetId, label }: ScrollIndicatorProps) {
  const handleScroll = () => {
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button
      type="button"
      className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded-lg p-2"
      aria-label={label}
      onClick={handleScroll}
    >
      <span className="text-sm">Descubra nossos serviços</span>
      <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
      </div>
    </button>
  )
}
