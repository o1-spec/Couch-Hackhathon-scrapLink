'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { X, MessageCircle } from 'lucide-react'

interface MessageNotificationProps {
  message: {
    id: string
    senderName: string
    senderAvatar: string
    content: string
    timestamp: string
  }
  onClose: () => void
  onReply: () => void
}

export function MessageNotification({ message, onClose, onReply }: MessageNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  return (
    <Card className="fixed top-4 right-4 w-80 shadow-lg border-l-4 border-l-[#006636] animate-in slide-in-from-right z-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
            <AvatarFallback className="font-poppins">
              {message.senderName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-gray-900 font-poppins text-sm">
                {message.senderName}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="w-6 h-6 p-0 hover:bg-gray-100"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <p className="text-sm text-gray-600 font-poppins line-clamp-2 mb-3">
              {message.content}
            </p>

            <div className="flex items-center gap-2">
              <Button
                onClick={onReply}
                size="sm"
                className="bg-[#006636] hover:bg-[#005528] text-white font-poppins text-xs"
              >
                <MessageCircle className="h-3 w-3 mr-1" />
                Reply
              </Button>
              <span className="text-xs text-gray-500 font-poppins">
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
