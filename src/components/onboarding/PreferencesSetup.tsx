'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { ToastContainer } from '@/components/ui/toast-container'
import { Settings, Bell, Truck, DollarSign, ArrowRight, ArrowLeft, Mail, MessageSquare } from 'lucide-react'
import Link from 'next/link'

interface MaterialType {
  id: string
  name: string
  icon: string
  description: string
  avgPrice: string
}

interface NotificationPreference {
  id: string
  title: string
  description: string
  enabled: boolean
  icon: React.ReactNode
}

export function PreferencesSetup() {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [pickupTimes, setPickupTimes] = useState<string[]>([])
  const [notifications, setNotifications] = useState<NotificationPreference[]>([
    {
      id: 'new-offers',
      title: 'New Offers',
      description: 'Get notified when buyers make offers on your materials',
      enabled: true,
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      id: 'pickup-reminders',
      title: 'Pickup Reminders',
      description: 'Reminders about scheduled pickups',
      enabled: true,
      icon: <Truck className="h-4 w-4" />
    },
    {
      id: 'price-alerts',
      title: 'Price Alerts',
      description: 'When market prices change significantly',
      enabled: false,
      icon: <Bell className="h-4 w-4" />
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'Direct messages from buyers',
      enabled: true,
      icon: <MessageSquare className="h-4 w-4" />
    }
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const materialTypes: MaterialType[] = [
    {
      id: 'aluminum',
      name: 'Aluminum',
      icon: '🥤',
      description: 'Cans, siding, wheels, etc.',
      avgPrice: '$0.45-0.85/lb'
    },
    {
      id: 'copper',
      name: 'Copper',
      icon: '🔶',
      description: 'Wire, pipes, fittings',
      avgPrice: '$2.80-4.20/lb'
    },
    {
      id: 'steel',
      name: 'Steel/Iron',
      icon: '⚙️',
      description: 'Appliances, car parts, beams',
      avgPrice: '$0.08-0.15/lb'
    },
    {
      id: 'brass',
      name: 'Brass',
      icon: '🔸',
      description: 'Faucets, decorative items',
      avgPrice: '$1.20-2.10/lb'
    },
    {
      id: 'stainless',
      name: 'Stainless Steel',
      icon: '✨',
      description: 'Kitchen items, medical equipment',
      avgPrice: '$0.35-0.65/lb'
    },
    {
      id: 'lead',
      name: 'Lead',
      icon: '🔋',
      description: 'Batteries, pipes, weights',
      avgPrice: '$0.45-0.75/lb'
    }
  ]

  const timeSlots = [
    { id: 'morning', label: 'Morning (8AM - 12PM)', icon: '🌅' },
    { id: 'afternoon', label: 'Afternoon (12PM - 5PM)', icon: '☀️' },
    { id: 'evening', label: 'Evening (5PM - 8PM)', icon: '🌆' },
    { id: 'weekend', label: 'Weekends', icon: '📅' }
  ]

  const toggleMaterial = (materialId: string) => {
    setSelectedMaterials(prev => 
      prev.includes(materialId) 
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    )
  }

  const togglePickupTime = (timeId: string) => {
    setPickupTimes(prev => 
      prev.includes(timeId) 
        ? prev.filter(id => id !== timeId)
        : [...prev, timeId]
    )
  }

  const toggleNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, enabled: !notif.enabled }
          : notif
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedMaterials.length === 0) {
      toast.error('Select materials', 'Please choose at least one material type you work with')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Preferences saved!', 'Your settings have been updated')
      // In real app, navigate to next step
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Save failed', 'Please try again')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Progress Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Link href="/onboarding/profile">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <h1 className="text-xl font-bold text-gray-900 font-poppins">Preferences Setup</h1>
              </div>
              <Badge variant="outline" className="font-poppins">
                Step 2 of 3
              </Badge>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#006636] h-2 rounded-full transition-all duration-300"
                style={{ width: '66%' }}
              ></div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#006636] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">
              Set Your Preferences
            </h2>
            <p className="text-gray-600 font-poppins">
              Help us personalize your ScrapLink experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Material Types */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">
                  What materials do you typically work with?
                </h3>
                <p className="text-gray-600 mb-6 font-poppins">
                  Select all that apply. This helps us show you relevant buyers and pricing.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {materialTypes.map((material) => (
                    <div
                      key={material.id}
                      onClick={() => toggleMaterial(material.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedMaterials.includes(material.id)
                          ? 'border-[#006636] bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{material.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 font-poppins">
                            {material.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2 font-poppins">
                            {material.description}
                          </p>
                          <div className="text-xs text-green-700 font-medium font-poppins">
                            {material.avgPrice}
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedMaterials.includes(material.id)
                            ? 'border-[#006636] bg-[#006636]'
                            : 'border-gray-300'
                        }`}>
                          {selectedMaterials.includes(material.id) && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pickup Preferences */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">
                  When are you usually available for pickups?
                </h3>
                <p className="text-gray-600 mb-6 font-poppins">
                  This helps buyers schedule convenient pickup times.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => togglePickupTime(slot.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        pickupTimes.includes(slot.id)
                          ? 'border-[#006636] bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{slot.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 font-poppins">
                            {slot.label}
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          pickupTimes.includes(slot.id)
                            ? 'border-[#006636] bg-[#006636]'
                            : 'border-gray-300'
                        }`}>
                          {pickupTimes.includes(slot.id) && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">
                  How would you like to be notified?
                </h3>
                <p className="text-gray-600 mb-6 font-poppins">
                  Choose what notifications you want to receive and how.
                </p>
                
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-gray-600">
                          {notification.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 font-poppins">
                            {notification.title}
                          </div>
                          <div className="text-sm text-gray-600 font-poppins">
                            {notification.description}
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={notification.enabled}
                        onCheckedChange={() => toggleNotification(notification.id)}
                      />
                    </div>
                  ))}
                </div>

                {/* Notification Methods */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-3 font-poppins">
                    Notification Methods
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Checkbox id="email-notif" defaultChecked />
                      <Label htmlFor="email-notif" className="flex items-center gap-2 font-poppins">
                        <Mail className="h-4 w-4" />
                        Email notifications
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="sms-notif" />
                      <Label htmlFor="sms-notif" className="flex items-center gap-2 font-poppins">
                        <MessageSquare className="h-4 w-4" />
                        SMS notifications (premium feature)
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href="/onboarding/profile" className="flex-1">
                <Button variant="outline" className="w-full font-poppins">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              
              <div className="flex-1">
                <Link href="/onboarding/verification">
                  <Button 
                    type="submit"
                    disabled={isSubmitting || selectedMaterials.length === 0}
                    className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
