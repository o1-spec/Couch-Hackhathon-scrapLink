"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Mail,
  Smartphone,
  MessageSquare,
  DollarSign,
  Package,
  TrendingUp,
  Shield,
  Clock,
  Volume2,
} from "lucide-react"

interface NotificationSettingsProps {
  user: {
    id: string
    name: string
    type: "seller" | "buyer"
  }
}

export function NotificationSettings({ user }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    email: {
      messages: true,
      orders: true,
      payments: true,
      marketing: false,
      security: true,
      priceAlerts: user.type === "buyer",
    },
    push: {
      messages: true,
      orders: true,
      payments: true,
      marketing: false,
      security: true,
      priceAlerts: user.type === "buyer",
    },
    sms: {
      messages: false,
      orders: true,
      payments: true,
      marketing: false,
      security: true,
      priceAlerts: false,
    },
    inApp: {
      sound: true,
      desktop: true,
      quietHours: true,
    },
    frequency: {
      immediate: true,
      daily: false,
      weekly: false,
    },
  })

  const updateSetting = (category: keyof typeof settings, key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }))
  }

  const notificationTypes = [
    {
      key: "messages",
      label: "Messages",
      description: "New messages from buyers/sellers",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      key: "orders",
      label: "Orders",
      description: user.type === "seller" ? "New orders and order updates" : "Order confirmations and updates",
      icon: Package,
      color: "text-purple-600",
    },
    {
      key: "payments",
      label: "Payments",
      description: user.type === "seller" ? "Payment received notifications" : "Payment confirmations",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      key: "security",
      label: "Security",
      description: "Login alerts and security updates",
      icon: Shield,
      color: "text-red-600",
    },
    {
      key: "marketing",
      label: "Marketing",
      description: "Promotional offers and platform updates",
      icon: TrendingUp,
      color: "text-indigo-600",
    },
  ]

  if (user.type === "buyer") {
    notificationTypes.push({
      key: "priceAlerts",
      label: "Price Alerts",
      description: "Notifications when prices change for saved items",
      icon: TrendingUp,
      color: "text-orange-600",
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">Notification Settings</h1>
        <p className="text-gray-600 font-poppins">Customize how and when you receive notifications</p>
      </div>

      {/* Notification Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-poppins">
            <Bell className="h-5 w-5" />
            Notification Channels
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Notifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 font-poppins">Email Notifications</h3>
                <p className="text-sm text-gray-600 font-poppins">Receive notifications via email</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-13">
              {notificationTypes.map((type) => (
                <div key={`email-${type.key}`} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <type.icon className={`h-4 w-4 ${type.color}`} />
                    <div>
                      <Label className="font-medium font-poppins">{type.label}</Label>
                      <p className="text-xs text-gray-500 font-poppins">{type.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.email[type.key as keyof typeof settings.email]}
                    onCheckedChange={(checked) => updateSetting("email", type.key, checked)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Push Notifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 font-poppins">Push Notifications</h3>
                <p className="text-sm text-gray-600 font-poppins">Receive notifications on your device</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-13">
              {notificationTypes.map((type) => (
                <div key={`push-${type.key}`} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <type.icon className={`h-4 w-4 ${type.color}`} />
                    <div>
                      <Label className="font-medium font-poppins">{type.label}</Label>
                      <p className="text-xs text-gray-500 font-poppins">{type.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.push[type.key as keyof typeof settings.push]}
                    onCheckedChange={(checked) => updateSetting("push", type.key, checked)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 font-poppins">SMS Notifications</h3>
                <p className="text-sm text-gray-600 font-poppins">Receive important notifications via text</p>
                <Badge variant="outline" className="text-xs mt-1">
                  Standard messaging rates apply
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-13">
              {notificationTypes
                .filter((type) => ["messages", "orders", "payments", "security"].includes(type.key))
                .map((type) => (
                  <div key={`sms-${type.key}`} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <type.icon className={`h-4 w-4 ${type.color}`} />
                      <div>
                        <Label className="font-medium font-poppins">{type.label}</Label>
                        <p className="text-xs text-gray-500 font-poppins">{type.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.sms[type.key as keyof typeof settings.sms]}
                      onCheckedChange={(checked) => updateSetting("sms", type.key, checked)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* In-App Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-poppins">
            <Volume2 className="h-5 w-5" />
            In-App Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="font-medium font-poppins">Sound Notifications</Label>
              <p className="text-sm text-gray-600 font-poppins">Play sound for new notifications</p>
            </div>
            <Switch
              checked={settings.inApp.sound}
              onCheckedChange={(checked) => updateSetting("inApp", "sound", checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <Label className="font-medium font-poppins">Desktop Notifications</Label>
              <p className="text-sm text-gray-600 font-poppins">Show notifications on desktop</p>
            </div>
            <Switch
              checked={settings.inApp.desktop}
              onCheckedChange={(checked) => updateSetting("inApp", "desktop", checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <Label className="font-medium font-poppins">Quiet Hours</Label>
                <p className="text-sm text-gray-600 font-poppins">Reduce notifications from 10 PM to 8 AM</p>
              </div>
            </div>
            <Switch
              checked={settings.inApp.quietHours}
              onCheckedChange={(checked) => updateSetting("inApp", "quietHours", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Frequency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-poppins">
            <Clock className="h-5 w-5" />
            Notification Frequency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="immediate"
                name="frequency"
                checked={settings.frequency.immediate}
                onChange={() =>
                  setSettings((prev) => ({
                    ...prev,
                    frequency: { immediate: true, daily: false, weekly: false },
                  }))
                }
                className="w-4 h-4 text-[#006636]"
              />
              <Label htmlFor="immediate" className="font-poppins">
                Immediate - Get notified right away
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="daily"
                name="frequency"
                checked={settings.frequency.daily}
                onChange={() =>
                  setSettings((prev) => ({
                    ...prev,
                    frequency: { immediate: false, daily: true, weekly: false },
                  }))
                }
                className="w-4 h-4 text-[#006636]"
              />
              <Label htmlFor="daily" className="font-poppins">
                Daily Digest - Once per day summary
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="weekly"
                name="frequency"
                checked={settings.frequency.weekly}
                onChange={() =>
                  setSettings((prev) => ({
                    ...prev,
                    frequency: { immediate: false, daily: false, weekly: true },
                  }))
                }
                className="w-4 h-4 text-[#006636]"
              />
              <Label htmlFor="weekly" className="font-poppins">
                Weekly Summary - Once per week overview
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-center">
        <Button className="bg-[#006636] hover:bg-[#005528] text-white px-8 font-poppins">
          Save Notification Settings
        </Button>
      </div>
    </div>
  )
}
