"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/ui/toast-container"
import { AlertTriangle, Upload, FileText, Scale, MessageSquare, Gavel, Clock, CheckCircle } from "lucide-react"

interface DisputeCase {
  id: string
  orderId: string
  type: "weight_discrepancy" | "quality_issue" | "delivery_problem" | "payment_dispute"
  status: "open" | "under_review" | "mediation" | "resolved" | "escalated"
  priority: "low" | "medium" | "high" | "urgent"
  createdDate: string
  description: string
  evidence: File[]
  timeline: Array<{
    date: string
    action: string
    actor: string
    details: string
  }>
}

interface DisputeResolutionProps {
  user: {
    id: string
    name: string
    userType: "seller" | "buyer"
    isVerified: boolean
  }
  orderData: {
    id: string
    title: string
    amount: number
    otherParty: string
  }
}

export function DisputeResolution({ user, orderData }: DisputeResolutionProps) {
  const { toast } = useToast()
  const [disputeType, setDisputeType] = useState("")
  const [description, setDescription] = useState("")
  const [evidence, setEvidence] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentDispute, setCurrentDispute] = useState<DisputeCase | null>(null)

  const disputeTypes = [
    { value: "weight_discrepancy", label: "Weight Discrepancy", icon: Scale },
    { value: "quality_issue", label: "Quality/Condition Issue", icon: AlertTriangle },
    { value: "delivery_problem", label: "Delivery Problem", icon: MessageSquare },
    { value: "payment_dispute", label: "Payment Dispute", icon: FileText },
  ]

  const handleEvidenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (evidence.length + files.length > 10) {
      toast.error("Too many files", "Maximum 10 evidence files allowed")
      return
    }
    setEvidence((prev) => [...prev, ...files])
  }

  const removeEvidence = (index: number) => {
    setEvidence((prev) => prev.filter((_, i) => i !== index))
  }

  const submitDispute = async () => {
    if (!disputeType || !description.trim()) {
      toast.error("Missing information", "Please select dispute type and provide description")
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newDispute: DisputeCase = {
        id: `DSP-${Date.now()}`,
        orderId: orderData.id,
        type: disputeType as DisputeCase["type"],
        status: "open",
        priority: "medium",
        createdDate: new Date().toISOString(),
        description,
        evidence,
        timeline: [
          {
            date: new Date().toISOString(),
            action: "Dispute Filed",
            actor: user.name,
            details: `${user.userType} filed a dispute regarding ${disputeType.replace("_", " ")}`,
          },
        ],
      }

      setCurrentDispute(newDispute)
      toast.success("Dispute Filed", "Your dispute has been submitted and is under review")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Submission failed", "Please try again")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "mediation":
        return "bg-purple-100 text-purple-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "escalated":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (currentDispute) {
    return (
      <>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Gavel className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">Dispute Case #{currentDispute.id}</h1>
            <p className="text-gray-600 font-poppins">Your dispute has been filed and is being reviewed by our team</p>
          </div>

          {/* Dispute Status */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Dispute Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="font-poppins">Status</Label>
                  <div className="mt-1">
                    <Badge className={`text-sm ${getStatusColor(currentDispute.status)}`}>
                      {currentDispute.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="font-poppins">Priority</Label>
                  <div className="mt-1">
                    <Badge className={`text-sm ${getPriorityColor(currentDispute.priority)}`}>
                      {currentDispute.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="font-poppins">Filed Date</Label>
                  <div className="mt-1 text-sm text-gray-600 font-poppins">
                    {new Date(currentDispute.createdDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Dispute Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentDispute.timeline.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#006636] rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 font-poppins">{event.action}</h4>
                      <p className="text-sm text-gray-600 font-poppins">{event.details}</p>
                      <p className="text-xs text-gray-500 font-poppins mt-1">
                        {new Date(event.date).toLocaleString()} • {event.actor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="font-poppins">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 font-poppins">Under Review</h4>
                    <p className="text-sm text-blue-800 font-poppins">
                      Our dispute resolution team is reviewing your case. You will receive updates within 24-48 hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900 font-poppins">Communication</h4>
                    <p className="text-sm text-gray-600 font-poppins">
                      Both parties will be contacted to provide additional information if needed.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <ToastContainer />
      </>
    )
  }

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-poppins mb-2">File a Dispute</h1>
          <p className="text-gray-600 font-poppins">Report an issue with your transaction for resolution</p>
        </div>

        {/* Order Information */}
        <Card>
          <CardHeader>
            <CardTitle className="font-poppins">Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="font-poppins">Order ID</Label>
                <div className="font-mono text-sm font-poppins">{orderData.id}</div>
              </div>
              <div>
                <Label className="font-poppins">Item</Label>
                <div className="text-sm font-poppins">{orderData.title}</div>
              </div>
              <div>
                <Label className="font-poppins">Amount</Label>
                <div className="text-sm font-poppins">${orderData.amount.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dispute Type */}
        <Card>
          <CardHeader>
            <CardTitle className="font-poppins">What is the issue?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {disputeTypes.map((type) => {
                const IconComponent = type.icon
                return (
                  <div
                    key={type.value}
                    onClick={() => setDisputeType(type.value)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      disputeType === type.value ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          disputeType === type.value ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 font-poppins">{type.label}</h3>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="font-poppins">Describe the Issue</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Please provide a detailed description of the issue, including what happened, when it occurred, and what resolution you're seeking..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="font-poppins"
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Evidence Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="font-poppins">Upload Evidence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="font-poppins">Supporting Documents/Photos</Label>
              <div className="mt-2">
                <label className="block">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-600 font-poppins">
                      <div className="font-medium">Click to upload evidence</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Photos, documents, screenshots, etc. (Max 10 files)
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    multiple
                    onChange={handleEvidenceUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {evidence.length > 0 && (
              <div>
                <Label className="font-poppins">Uploaded Evidence ({evidence.length}/10)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                  {evidence.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="border rounded-lg p-3 bg-gray-50">
                        <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-xs text-gray-600 text-center truncate font-poppins">{file.name}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEvidence(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legal Notice */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 font-poppins mb-2">Important Legal Notice</h3>
                <ul className="text-sm text-yellow-800 space-y-1 font-poppins">
                  <li>• Filing a dispute initiates a formal resolution process</li>
                  <li>• All information provided must be accurate and truthful</li>
                  <li>• False claims may result in account suspension</li>
                  <li>• Both parties will be contacted during the review process</li>
                  <li>• Resolution may take 5-10 business days</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={submitDispute}
            disabled={isSubmitting || !disputeType || !description.trim()}
            className="bg-red-600 hover:bg-red-700 text-white font-poppins px-8 py-3"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Filing Dispute...
              </>
            ) : (
              <>
                <Gavel className="h-4 w-4 mr-2" />
                File Dispute
              </>
            )}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
