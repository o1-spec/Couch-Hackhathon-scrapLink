'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { X, Send, Shield } from 'lucide-react'
import Image from 'next/image'

interface QuickMessageModalProps {
  isOpen: boolean
  onClose: () => void
  recipient: {
    id: string
    name: string
    avatar: string
    verified: boolean
    type: 'seller' | 'buyer'
  }
  listing?: {
    id: string
    title: string
    price: number
    image: string
  }
}

export function QuickMessageModal({ isOpen, onClose, recipient, listing }: QuickMessageModalProps) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error('Message required', 'Please enter a message')
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Message sent!', `Your message has been sent to ${recipient.name}`)
      setSubject('')
      setMessage('')
      onClose()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to send', 'Please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-poppins">Send Message</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-8 h-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Recipient Info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src={recipient.avatar || "/placeholder.svg"} alt={recipient.name} />
              <AvatarFallback className="font-poppins">
                {recipient.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900 font-poppins">
                  {recipient.name}
                </h4>
                {recipient.verified && (
                  <Shield className="h-4 w-4 text-green-600" />
                )}
                <Badge variant="outline" className="text-xs font-poppins">
                  {recipient.type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Listing Info */}
          {listing && (
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Image
                src={listing.image || "/placeholder.svg"}
                alt="Listing"
                width={48}
                height={48}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 font-poppins text-sm">
                  {listing.title}
                </h4>
                <p className="text-lg font-bold text-[#006636] font-poppins">
                  ${listing.price}
                </p>
              </div>
            </div>
          )}

          {/* Subject */}
          <div>
            <Label htmlFor="subject" className="font-poppins">Subject (Optional)</Label>
            <Input
              id="subject"
              placeholder="Enter subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="font-poppins"
            />
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="font-poppins">Message *</Label>
            <Textarea
              id="message"
              placeholder={listing 
                ? `Hi ${recipient.name}, I'm interested in your ${listing.title}...`
                : `Hi ${recipient.name}, I wanted to reach out about...`
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="font-poppins"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 font-poppins"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={isSubmitting || !message.trim()}
              className="flex-1 bg-[#006636] hover:bg-[#005528] text-white font-poppins"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
