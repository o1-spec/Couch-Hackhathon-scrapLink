import { Recycle } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-[#006636] rounded-xl flex items-center justify-center animate-pulse">
            <Recycle className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-poppins">ScrapLink</h1>
        </div>

        {/* Loading Animation */}
        <div className="mb-6">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-[#006636] rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 font-poppins">
            Loading...
          </h2>
          <p className="text-gray-600 font-poppins">
            Please wait while we prepare your content
          </p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-1 mt-6">
          <div className="w-2 h-2 bg-[#006636] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#006636] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-[#006636] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}
