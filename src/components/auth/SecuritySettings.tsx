'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ToastContainer } from '@/components/ui/toast-container'
import { Shield, AlertTriangle, Clock, MapPin, Monitor, ArrowRight, Download, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface LoginSession {
  id: string
  device: string
  location: string
  lastActive: string
  current: boolean
}

interface LoginAttempt {
  id: string
  timestamp: string
  location: string
  success: boolean
  ip: string
}

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const { toast } = useToast()

  // Mock data
  const loginSessions: LoginSession[] = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'New York, NY',
      lastActive: '2 hours ago',
      current: false
    },
    {
      id: '3',
      device: 'Chrome on MacBook',
      location: 'Boston, MA',
      lastActive: '1 day ago',
      current: false
    }
  ]

  const recentAttempts: LoginAttempt[] = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:22',
      location: 'New York, NY',
      success: true,
      ip: '192.168.1.100'
    },
    {
      id: '2',
      timestamp: '2024-01-15 09:15:10',
      location: 'New York, NY',
      success: true,
      ip: '192.168.1.100'
    },
    {
      id: '3',
      timestamp: '2024-01-14 22:45:33',
      location: 'Unknown Location',
      success: false,
      ip: '203.0.113.1'
    }
  ]

  const handleDisable2FA = async () => {
    // In real app, would require password confirmation
    toast.warning('2FA Disabled', 'Your account is less secure without two-factor authentication')
    setTwoFactorEnabled(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTerminateSession = async (sessionId: string) => {
    toast.success('Session Terminated', 'The device has been signed out')
  }

  const handleDownloadBackupCodes = () => {
    // Simulate downloading backup codes
    const codes = [
      'ABC12345', 'DEF67890', 'GHI11223', 'JKL44556', 'MNO77889',
      'PQR00112', 'STU33445', 'VWX66778', 'YZA99001', 'BCD22334'
    ]
    const blob = new Blob([codes.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'scraplink-backup-codes.txt'
    a.click()
    toast.success('Downloaded', 'Backup codes saved to your device')
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 font-poppins">Security Settings</h1>
            <p className="text-gray-600 font-poppins">Manage your account security and privacy settings</p>
          </div>

          {/* Two-Factor Authentication */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 font-poppins">Two-Factor Authentication</h3>
                    <p className="text-gray-600 text-sm font-poppins">
                      {twoFactorEnabled 
                        ? 'Your account is protected with 2FA'
                        : 'Add an extra layer of security to your account'
                      }
                    </p>
                    {twoFactorEnabled && (
                      <div className="flex items-center gap-4 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleDownloadBackupCodes}
                          className="font-poppins"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Backup Codes
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleDisable2FA}
                          className="text-red-600 border-red-200 hover:bg-red-50 font-poppins"
                        >
                          Disable 2FA
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {twoFactorEnabled ? (
                    <span className="text-green-600 text-sm font-medium font-poppins">Enabled</span>
                  ) : (
                    <Link href="/auth/setup-2fa">
                      <Button size="sm" className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                        Enable 2FA
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Security Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="text-base font-medium font-poppins">Email Notifications</Label>
                    <p className="text-sm text-gray-600 font-poppins">Get notified about important security events</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="login-alerts" className="text-base font-medium font-poppins">Login Alerts</Label>
                    <p className="text-sm text-gray-600 font-poppins">Alert me when someone signs in from a new device</p>
                  </div>
                  <Switch
                    id="login-alerts"
                    checked={loginAlerts}
                    onCheckedChange={setLoginAlerts}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Active Sessions</h3>
              
              <div className="space-y-3">
                {loginSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 font-poppins">
                          {session.device}
                          {session.current && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Current
                            </span>
                          )}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 font-poppins">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {session.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {session.lastActive}
                          </span>
                        </div>
                      </div>
                    </div>
                    {!session.current && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTerminateSession(session.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50 font-poppins"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Login Attempts */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Recent Login Attempts</h3>
              
              <div className="space-y-3">
                {recentAttempts.map((attempt) => (
                  <div key={attempt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        attempt.success ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-gray-900 font-poppins">
                          {attempt.success ? 'Successful login' : 'Failed login attempt'}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 font-poppins">
                          <span>{attempt.timestamp}</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {attempt.location}
                          </span>
                          <span>IP: {attempt.ip}</span>
                        </div>
                      </div>
                    </div>
                    {!attempt.success && (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Back to Dashboard */}
          <div className="text-center">
            <Link href="/dashboard">
              <Button className="bg-[#006636] hover:bg-[#005528] text-white font-poppins">
                Back to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
