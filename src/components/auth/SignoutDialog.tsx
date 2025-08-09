"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface User {
  id: string
  name: string
  email: string
  userType: "seller" | "buyer"
  avatar: string
  location: string
  joinDate: string
  isVerified: boolean
}

interface SignOutDialogProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export function SignOutDialog({ isOpen, onClose, user }: SignOutDialogProps) {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { toast } = useToast()

  const handleSignOut = async () => {
    setIsSigningOut(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      localStorage.removeItem("user")
      localStorage.removeItem("authToken")
      sessionStorage.clear()

      toast.success("Signed out successfully", `Goodbye, ${user.name}! You have been signed out of ScrapLink.`)

      window.location.href = "/"
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Sign out failed", "There was an error signing you out. Please try again.")
      setIsSigningOut(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <DialogTitle className="font-poppins text-lg">Sign Out</DialogTitle>
              <DialogDescription className="font-poppins">Are you sure you want to sign out?</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium font-poppins">{user.name}</p>
              <p className="text-sm text-gray-600 font-poppins">{user.email}</p>
              <p className="text-xs text-gray-500 font-poppins capitalize">
                {user.userType} • {user.location}
              </p>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 font-poppins">
            <p>You will be signed out of your ScrapLink account and redirected to the home page.</p>
            <p className="mt-2">Your data and preferences will be saved for your next visit.</p>
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSigningOut} className="font-poppins bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="bg-red-600 hover:bg-red-700 text-white font-poppins"
          >
            {isSigningOut ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Signing Out...
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
