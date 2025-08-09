"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DollarSign, Package, MessageSquare, CheckCircle, TrendingUp } from "lucide-react"
import { useMemo } from "react"

interface Activity {
    id: string
    type: "sale" | "listing" | "message" | "signup"
    user: string
    avatar: string
    description: string
    amount?: number
    location: string
    timestamp: Date
}

export function LiveActivityFeed() {
    const [activities, setActivities] = useState<Activity[]>([])


    const mockActivities = useMemo<Omit<Activity, "id" | "timestamp">[]>(() => [
        {
            type: "sale",
            user: "Sarah J.",
            avatar: "/avatar-placeholder.svg",
            description: "sold Copper Wire Bundle",
            amount: 245,
            location: "Chicago, IL",
        },
        {
            type: "listing",
            user: "Mike R.",
            avatar: "/avatar-placeholder.svg",
            description: "listed Steel Beams",
            amount: 450,
            location: "Detroit, MI",
        },
        {
            type: "message",
            user: "Emily C.",
            avatar: "/avatar-placeholder.svg",
            description: "sent inquiry about Aluminum Sheets",
            location: "Milwaukee, WI",
        },
        {
            type: "signup",
            user: "John D.",
            avatar: "/avatar-placeholder.svg",
            description: "joined ScrapLink as verified seller",
            location: "Cleveland, OH",
        },
        {
            type: "sale",
            user: "Lisa M.",
            avatar: "/avatar-placeholder.svg",
            description: "sold Brass Fittings",
            amount: 180,
            location: "Indianapolis, IN",
        },
    ], [])

    useEffect(() => {
        // Add initial activities
        const initialActivities = mockActivities.map((activity, index) => ({
            ...activity,
            id: `activity-${index}`,
            timestamp: new Date(Date.now() - index * 30000),
        }))
        setActivities(initialActivities)

        // Add new activities every 5 seconds
        const interval = setInterval(() => {
            const randomActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)]
            const newActivity: Activity = {
                ...randomActivity,
                id: `activity-${Date.now()}`,
                timestamp: new Date(),
            }

            setActivities((prev) => [newActivity, ...prev.slice(0, 9)]) // Keep only 10 activities
        }, 5000)

        return () => clearInterval(interval)
    }, [mockActivities])

    const getActivityIcon = (type: string) => {
        switch (type) {
            case "sale":
                return <DollarSign className="h-4 w-4 text-green-600" />
            case "listing":
                return <Package className="h-4 w-4 text-blue-600" />
            case "message":
                return <MessageSquare className="h-4 w-4 text-purple-600" />
            case "signup":
                return <CheckCircle className="h-4 w-4 text-orange-600" />
            default:
                return <TrendingUp className="h-4 w-4 text-gray-600" />
        }
    }

    const getActivityColor = (type: string) => {
        switch (type) {
            case "sale":
                return "bg-green-100 text-green-800"
            case "listing":
                return "bg-blue-100 text-blue-800"
            case "message":
                return "bg-purple-100 text-purple-800"
            case "signup":
                return "bg-orange-100 text-orange-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const formatTime = (timestamp: Date) => {
        const now = new Date()
        const diff = now.getTime() - timestamp.getTime()
        const seconds = Math.floor(diff / 1000)

        if (seconds < 60) return `${seconds}s ago`
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
        return `${Math.floor(seconds / 3600)}h ago`
    }

    return (
        <Card className="h-96 overflow-hidden">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="font-poppins">Live Activity</CardTitle>
                    <Badge className="bg-green-100 text-green-800 animate-pulse">Live</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="space-y-1 overflow-y-auto h-80 px-6">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors animate-fadeIn"
                        >
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                {getActivityIcon(activity.type)}
                            </div>

                            <Avatar className="w-8 h-8 flex-shrink-0">
                                <AvatarImage src={activity.avatar || "/avatar-placeholder.svg"} alt={activity.user} />
                                <AvatarFallback className="text-xs font-poppins">
                                    {activity.user
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-gray-900 font-poppins text-sm">{activity.user}</span>
                                    <Badge className={`text-xs ${getActivityColor(activity.type)}`}>{activity.type}</Badge>
                                </div>
                                <p className="text-xs text-gray-600 font-poppins truncate">
                                    {activity.description}
                                    {activity.amount && <span className="font-semibold text-green-600 ml-1">${activity.amount}</span>}
                                </p>
                                <p className="text-xs text-gray-500 font-poppins">
                                    {activity.location} • {formatTime(activity.timestamp)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
