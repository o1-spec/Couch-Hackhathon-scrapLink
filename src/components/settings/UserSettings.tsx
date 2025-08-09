'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { User, Mail, Phone, MapPin, Bell, Shield, CreditCard, Globe, Moon, Sun, Eye, EyeOff, Camera, Save, Trash2, AlertTriangle, CheckCircle, Settings, Lock, Smartphone, Download } from 'lucide-react'
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

interface UserSettingsProps {
  user: User
}

export function UserSettings({ user }: UserSettingsProps) {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  })

  // Form states
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    bio: 'Experienced scrap metal dealer specializing in copper and aluminum materials.',
    location: 'San Francisco, CA',
    website: 'https://johnsmithscrap.com',
    businessName: 'Smith Scrap Solutions',
    businessType: 'individual'
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: user.verified,
    loginAlerts: true,
    sessionTimeout: '30'
  })

  const handleProfileUpdate = () => {
    // Handle profile update
    console.log('Profile updated:', profileData)
  }

  const handlePasswordChange = () => {
    // Handle password change
    console.log('Password changed')
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">Settings</h1>
          <p className="text-gray-600 font-poppins">Manage your account preferences and security settings</p>
        </div>
        <div className="flex items-center gap-2">
          {user.verified && (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
          <Badge className="bg-blue-100 text-blue-800 capitalize">
            {user.type}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="font-poppins">Profile</TabsTrigger>
          <TabsTrigger value="security" className="font-poppins">Security</TabsTrigger>
          <TabsTrigger value="notifications" className="font-poppins">Notifications</TabsTrigger>
          <TabsTrigger value="preferences" className="font-poppins">Preferences</TabsTrigger>
          <TabsTrigger value="account" className="font-poppins">Account</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <p className="font-medium text-gray-900 font-poppins">{user.name}</p>
                  <p className="text-sm text-gray-600 font-poppins">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="font-poppins">
                    Change Photo
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 font-poppins">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-poppins">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-poppins">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="font-poppins"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-poppins">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="font-poppins"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="font-poppins">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="font-poppins"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="font-poppins">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      className="font-poppins"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="font-poppins">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="font-poppins"
                  />
                </div>

                {user.type === 'seller' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="businessName" className="font-poppins">Business Name</Label>
                        <Input
                          id="businessName"
                          value={profileData.businessName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, businessName: e.target.value }))}
                          className="font-poppins"
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessType" className="font-poppins">Business Type</Label>
                        <Select value={profileData.businessType} onValueChange={(value) => setProfileData(prev => ({ ...prev, businessType: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual</SelectItem>
                            <SelectItem value="llc">LLC</SelectItem>
                            <SelectItem value="corporation">Corporation</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website" className="font-poppins">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        className="font-poppins"
                      />
                    </div>
                  </>
                )}

                <Button onClick={handleProfileUpdate} className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Password Change */}
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" className="font-poppins">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="font-poppins pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword" className="font-poppins">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={securityData.newPassword}
                    onChange={(e) => setSecurityData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="font-poppins"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="font-poppins">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={securityData.confirmPassword}
                    onChange={(e) => setSecurityData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="font-poppins"
                  />
                </div>

                <Button onClick={handlePasswordChange} className="w-full bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                  <Lock className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600 font-poppins">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch
                    checked={securityData.twoFactorEnabled}
                    onCheckedChange={(checked) => setSecurityData(prev => ({ ...prev, twoFactorEnabled: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Login Alerts</h4>
                      <p className="text-sm text-gray-600 font-poppins">Get notified of new logins</p>
                    </div>
                  </div>
                  <Switch
                    checked={securityData.loginAlerts}
                    onCheckedChange={(checked) => setSecurityData(prev => ({ ...prev, loginAlerts: checked }))}
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Session Timeout</h4>
                      <p className="text-sm text-gray-600 font-poppins">Auto-logout after inactivity</p>
                    </div>
                  </div>
                  <Select value={securityData.sessionTimeout} onValueChange={(value) => setSecurityData(prev => ({ ...prev, sessionTimeout: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-900 font-poppins">Security Status</h4>
                  </div>
                  <p className="text-sm text-yellow-700 font-poppins">
                    Your account security is strong. Last security check: Today
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Email Notifications</h4>
                    <p className="text-sm text-gray-600 font-poppins">Receive notifications via email</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Push Notifications</h4>
                    <p className="text-sm text-gray-600 font-poppins">Receive push notifications in browser</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">SMS Notifications</h4>
                    <p className="text-sm text-gray-600 font-poppins">Receive important updates via SMS</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Marketing Communications</h4>
                    <p className="text-sm text-gray-600 font-poppins">Receive updates about new features and promotions</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Notification Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {user.type === 'seller' ? (
                <>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">New Orders</h4>
                      <p className="text-sm text-gray-600 font-poppins">When someone places an order</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Messages</h4>
                      <p className="text-sm text-gray-600 font-poppins">New messages from buyers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Payment Updates</h4>
                      <p className="text-sm text-gray-600 font-poppins">Payment confirmations and payouts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Listing Updates</h4>
                      <p className="text-sm text-gray-600 font-poppins">When your listings expire or need attention</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Order Updates</h4>
                      <p className="text-sm text-gray-600 font-poppins">Status updates on your orders</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Messages</h4>
                      <p className="text-sm text-gray-600 font-poppins">New messages from sellers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">New Listings</h4>
                      <p className="text-sm text-gray-600 font-poppins">When new items match your interests</p>
                    </div>
                    <Switch />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Display Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Display Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {isDarkMode ? <Moon className="h-5 w-5 text-gray-600" /> : <Sun className="h-5 w-5 text-gray-600" />}
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Dark Mode</h4>
                      <p className="text-sm text-gray-600 font-poppins">Switch to dark theme</p>
                    </div>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={setIsDarkMode}
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Language</h4>
                      <p className="text-sm text-gray-600 font-poppins">Choose your preferred language</p>
                    </div>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Timezone</h4>
                      <p className="text-sm text-gray-600 font-poppins">Your local timezone</p>
                    </div>
                  </div>
                  <Select defaultValue="pst">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Standard Time</SelectItem>
                      <SelectItem value="mst">Mountain Standard Time</SelectItem>
                      <SelectItem value="cst">Central Standard Time</SelectItem>
                      <SelectItem value="est">Eastern Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Business Preferences (Seller only) */}
            {user.type === 'seller' && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins">Business Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900 font-poppins">Default Currency</h4>
                        <p className="text-sm text-gray-600 font-poppins">Currency for your listings</p>
                      </div>
                    </div>
                    <Select defaultValue="usd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900 font-poppins">Auto-Accept Orders</h4>
                        <p className="text-sm text-gray-600 font-poppins">Automatically accept orders under a certain amount</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch />
                      <Input placeholder="$500" className="w-24" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Vacation Mode</h4>
                      <p className="text-sm text-gray-600 font-poppins">Pause all listings temporarily</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Buyer Preferences */}
            {user.type === 'buyer' && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins">Buying Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium text-gray-900 font-poppins">Search Radius</h4>
                        <p className="text-sm text-gray-600 font-poppins">Maximum distance for local pickups</p>
                      </div>
                    </div>
                    <Select defaultValue="50">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 miles</SelectItem>
                        <SelectItem value="25">25 miles</SelectItem>
                        <SelectItem value="50">50 miles</SelectItem>
                        <SelectItem value="100">100 miles</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Save Search History</h4>
                      <p className="text-sm text-gray-600 font-poppins">Remember your recent searches</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 font-poppins">Price Alerts</h4>
                      <p className="text-sm text-gray-600 font-poppins">Get notified when prices drop</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Account ID</h4>
                    <p className="text-sm text-gray-600 font-poppins font-mono">{user.id}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Member Since</h4>
                    <p className="text-sm text-gray-600 font-poppins">
                      {new Date(user.joinedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Account Type</h4>
                    <p className="text-sm text-gray-600 font-poppins capitalize">{user.type}</p>
                  </div>
                  <Button variant="outline" size="sm" className="font-poppins">
                    {user.type === 'seller' ? 'Switch to Buyer' : 'Become a Seller'}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-green-900 font-poppins">Verification Status</h4>
                      <p className="text-sm text-green-700 font-poppins">Your account is verified</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600 font-poppins">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <h4 className="font-medium text-red-900 font-poppins">Export Account Data</h4>
                  </div>
                  <p className="text-sm text-red-700 font-poppins mb-3">
                    Download all your account data including listings, messages, and transactions.
                  </p>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50 font-poppins">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <h4 className="font-medium text-red-900 font-poppins">Deactivate Account</h4>
                  </div>
                  <p className="text-sm text-red-700 font-poppins mb-3">
                    Temporarily disable your account. You can reactivate it anytime.
                  </p>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50 font-poppins">
                    Deactivate Account
                  </Button>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trash2 className="h-5 w-5 text-red-600" />
                    <h4 className="font-medium text-red-900 font-poppins">Delete Account</h4>
                  </div>
                  <p className="text-sm text-red-700 font-poppins mb-3">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm" className="font-poppins">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
