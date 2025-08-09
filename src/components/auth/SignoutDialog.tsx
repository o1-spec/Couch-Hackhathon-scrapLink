"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, LogOut, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface SignOutDialogProps {
  isOpen: boolean
  onClose: () => void
  userName: string
}

export function SignOutDialog({ isOpen, onClose, userName }: SignOutDialogProps) {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()

  if (!isOpen) return null

  const handleSignOut = async () => {
    setIsSigningOut(true)

    // Simulate sign out process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Clear any stored auth data
    localStorage.removeItem("user")
    sessionStorage.clear()

    // Redirect to home page
    router.push("/")
  }

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900 font-poppins">Sign Out</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 font-poppins">
              Are you sure you want to sign out, <span className="font-semibold">{userName}</span>?
            </p>
            <p className="text-sm text-gray-500 mt-2 font-poppins">
              You&apos;ll need to sign in again to access your account.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSigningOut}
              className="flex-1 font-poppins bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-poppins"
            >
              {isSigningOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing Out...
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </>
              )}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 font-poppins">
              Your data will be saved and available when you sign back in.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
