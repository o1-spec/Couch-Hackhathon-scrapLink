'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Send, Phone, Video, MoreHorizontal, Paperclip, ImageIcon, Shield, CheckCheck } from 'lucide-react'
import Image from 'next/image'

interface User {
  id: string
  name: string
  email: string
  type: 'seller' | 'buyer'
  avatar: string
  verified: boolean
  joinedDate: string
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
  type: 'text' | 'image' | 'listing'
  listingId?: string
}

interface Conversation {
  id: string
  participants: User[]
  lastMessage: Message
  unreadCount: number
  listingTitle?: string
  listingPrice?: number
  listingImage?: string
}

interface MessagingSystemProps {
  user: User
}

export function MessagingSystem({ user }: MessagingSystemProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data - in real app this would come from API
  const mockUsers: User[] = [
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      type: 'buyer',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: true,
      joinedDate: '2024-01-10'
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      email: 'mike@example.com',
      type: 'buyer',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: false,
      joinedDate: '2024-01-12'
    },
    {
      id: '4',
      name: 'Emily Chen',
      email: 'emily@example.com',
      type: 'seller',
      avatar: '/placeholder.svg?height=40&width=40',
      verified: true,
      joinedDate: '2024-01-08'
    }
  ]

  const conversations: Conversation[] = [
    {
      id: '1',
      participants: [user, mockUsers[0]],
      lastMessage: {
        id: '1',
        senderId: '2',
        receiverId: '1',
        content: 'Is this copper wire still available? I\'m interested in purchasing the entire lot.',
        timestamp: '2024-01-21T10:30:00Z',
        read: false,
        type: 'text'
      },
      unreadCount: 2,
      listingTitle: 'Premium Copper Wire Bundle - 50lbs',
      listingPrice: 245.00,
      listingImage: '/placeholder.svg?height=60&width=60'
    },
    {
      id: '2',
      participants: [user, mockUsers[1]],
      lastMessage: {
        id: '2',
        senderId: '1',
        receiverId: '3',
        content: 'Great! I can arrange pickup for tomorrow morning. What time works best for you?',
        timestamp: '2024-01-21T09:15:00Z',
        read: true,
        type: 'text'
      },
      unreadCount: 0,
      listingTitle: 'Steel Beams - Various Sizes',
      listingPrice: 450.00,
      listingImage: '/placeholder.svg?height=60&width=60'
    },
    {
      id: '3',
      participants: [user, mockUsers[2]],
      lastMessage: {
        id: '3',
        senderId: '4',
        receiverId: '1',
        content: 'I have similar aluminum sheets if you\'re interested. Better condition and competitive pricing.',
        timestamp: '2024-01-20T16:45:00Z',
        read: true,
        type: 'text'
      },
      unreadCount: 0,
      listingTitle: 'Aluminum Sheets - 50lbs',
      listingPrice: 180.00,
      listingImage: '/placeholder.svg?height=60&width=60'
    }
  ]

  const messages = useMemo<{ [key: string]: Message[] }>(() => ({
    '1': [
      {
        id: '1',
        senderId: '2',
        receiverId: '1',
        content: 'Hi! I saw your copper wire listing. Is it still available?',
        timestamp: '2024-01-21T09:00:00Z',
        read: true,
        type: 'text'
      },
      {
        id: '2',
        senderId: '1',
        receiverId: '2',
        content: 'Yes, it\'s still available! It\'s high-quality copper wire from a recent electrical renovation project.',
        timestamp: '2024-01-21T09:05:00Z',
        read: true,
        type: 'text'
      },
      {
        id: '3',
        senderId: '2',
        receiverId: '1',
        content: 'Perfect! Can you tell me more about the condition? The photos look great.',
        timestamp: '2024-01-21T09:10:00Z',
        read: true,
        type: 'text'
      },
      {
        id: '4',
        senderId: '1',
        receiverId: '2',
        content: 'It\'s in excellent condition - clean, stripped, and ready for recycling. No corrosion or damage.',
        timestamp: '2024-01-21T09:15:00Z',
        read: true,
        type: 'text'
      },
      {
        id: '5',
        senderId: '2',
        receiverId: '1',
        content: 'Is this copper wire still available? I\'m interested in purchasing the entire lot.',
        timestamp: '2024-01-21T10:30:00Z',
        read: false,
        type: 'text'
      },
      {
        id: '6',
        senderId: '2',
        receiverId: '1',
        content: 'I can pick it up today if that works for you.',
        timestamp: '2024-01-21T10:32:00Z',
        read: false,
        type: 'text'
      }
    ],
    '2': [
      {
        id: '7',
        senderId: '3',
        receiverId: '1',
        content: 'Hello! I\'m interested in your steel beams. Are they still available?',
        timestamp: '2024-01-21T08:00:00Z',
        read: true,
        type: 'text'
      },
      {
        id: '8',
        senderId: '1',
        receiverId: '3',
        content: 'Yes, they are! Various sizes available. What are you looking for specifically?',
        timestamp: '2024-01-21T08:30:00Z',
        read: true,
        type: 'text'
      },
      {
        id: '9',
        senderId: '3',
        receiverId: '1',
        content: 'I need beams for a construction project. The 12-foot ones would be perfect.',
        timestamp: '2024-01-21T09:00:00Z',
        read: true,
        type: 'text'
      },
      {
        id: '10',
        senderId: '1',
        receiverId: '3',
        content: 'Great! I can arrange pickup for tomorrow morning. What time works best for you?',
        timestamp: '2024-01-21T09:15:00Z',
        read: true,
        type: 'text'
      }
    ],
    '3': [
      {
        id: '11',
        senderId: '4',
        receiverId: '1',
        content: 'Hi there! I noticed you\'re looking for aluminum sheets.',
        timestamp: '2024-01-20T16:30:00Z',
        read: true,
        type: 'text'
      },
      {
        id: '12',
        senderId: '4',
        receiverId: '1',
        content: 'I have similar aluminum sheets if you\'re interested. Better condition and competitive pricing.',
        timestamp: '2024-01-20T16:45:00Z',
        read: true,
        type: 'text'
      }
    ]
  }), [])

  const filteredConversations = conversations.filter(conv =>
    conv.participants.some(p => 
      p.id !== user.id && p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || 
    conv.listingTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedConv = conversations.find(c => c.id === selectedConversation)
  const conversationMessages = useMemo(() => {
    return selectedConversation ? messages[selectedConversation] || [] : []
  }, [selectedConversation, messages])

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return

    // In real app, this would send to API
    console.log('Sending message:', messageInput)
    setMessageInput('')
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find(p => p.id !== user.id)
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversationMessages])

  return (
    <div className="flex bg-white rounded-lg shadow-sm border overflow-hidden" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-gray-50 flex flex-col">
        <div className="p-4 border-b bg-white flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900 font-poppins mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-poppins"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => {
            const otherParticipant = getOtherParticipant(conversation)
            if (!otherParticipant) return null

            return (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b cursor-pointer hover:bg-white transition-colors ${
                  selectedConversation === conversation.id ? 'bg-white border-l-4 border-l-[#006636]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={otherParticipant.avatar || "/placeholder.svg"} alt={otherParticipant.name} />
                      <AvatarFallback className="font-poppins">
                        {otherParticipant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {otherParticipant.verified && (
                      <Shield className="absolute -bottom-1 -right-1 h-4 w-4 text-green-600 bg-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 font-poppins truncate">
                        {otherParticipant.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-poppins">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </span>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-[#006636] text-white text-xs px-2 py-1">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {conversation.listingTitle && (
                      <div className="flex items-center gap-2 mb-2">
                        <Image
                          src={conversation.listingImage || "/placeholder.svg"}
                          alt="Listing"
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded object-cover"
                        />
                        <span className="text-xs text-gray-600 font-poppins truncate">
                          {conversation.listingTitle}
                        </span>
                      </div>
                    )}

                    <p className="text-sm text-gray-600 font-poppins truncate">
                      {conversation.lastMessage.senderId === user.id ? 'You: ' : ''}
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}

          {filteredConversations.length === 0 && (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">
                <Search className="h-8 w-8 mx-auto" />
              </div>
              <p className="text-gray-600 font-poppins">
                {searchQuery ? 'No conversations found' : 'No messages yet'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage 
                      src={getOtherParticipant(selectedConv)?.avatar || "/placeholder.svg"} 
                      alt={getOtherParticipant(selectedConv)?.name} 
                    />
                    <AvatarFallback className="font-poppins">
                      {getOtherParticipant(selectedConv)?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 font-poppins">
                        {getOtherParticipant(selectedConv)?.name}
                      </h3>
                      {getOtherParticipant(selectedConv)?.verified && (
                        <Shield className="h-4 w-4 text-green-600" />
                      )}
                      <Badge variant="outline" className="text-xs font-poppins">
                        {getOtherParticipant(selectedConv)?.type}
                      </Badge>
                    </div>
                    {selectedConv.listingTitle && (
                      <p className="text-sm text-gray-600 font-poppins">
                        About: {selectedConv.listingTitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Listing Info */}
              {selectedConv.listingTitle && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Image
                      src={selectedConv.listingImage || "/placeholder.svg"}
                      alt="Listing"
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 font-poppins">
                        {selectedConv.listingTitle}
                      </h4>
                      <p className="text-lg font-bold text-[#006636] font-poppins">
                        ${selectedConv.listingPrice}
                      </p>
                    </div>
                    <Button size="sm" className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                      View Listing
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {conversationMessages.map((message) => {
                const isOwn = message.senderId === user.id
                const sender = isOwn ? user : getOtherParticipant(selectedConv)

                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end gap-2 max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse' : ''}`}>
                      {!isOwn && (
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={sender?.avatar || "/placeholder.svg"} alt={sender?.name} />
                          <AvatarFallback className="text-xs font-poppins">
                            {sender?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          isOwn
                            ? 'bg-[#006636] text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm font-poppins">{message.content}</p>
                        <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                          <span className={`text-xs ${isOwn ? 'text-green-100' : 'text-gray-500'} font-poppins`}>
                            {formatTime(message.timestamp)}
                          </span>
                          {isOwn && (
                            <CheckCheck className={`h-3 w-3 ${message.read ? 'text-green-200' : 'text-green-300'}`} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-12 font-poppins"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#006636] hover:bg-[#005528] text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 font-poppins mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600 font-poppins">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
