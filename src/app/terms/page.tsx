"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-[#006636]" />
              <span className="text-[#006636] hover:text-[#005528]">Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Terms of Service</h1>
            <Link href="/auth">
              <Button className="bg-[#006636] hover:bg-[#005528] text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last updated: January 2024</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-8 prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using ScrapLink, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Platform Description</h2>
              <p className="text-gray-700 mb-6">
                ScrapLink is a digital marketplace that connects scrap metal sellers with verified buyers. Our platform
                provides:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>AI-powered weight and value estimation</li>
                <li>Secure transaction processing</li>
                <li>Dispute resolution services</li>
                <li>Logistics coordination</li>
                <li>Points-based payment system</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-6">As a user of ScrapLink, you agree to:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Provide accurate and truthful information</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Respect other users and maintain professional conduct</li>
                <li>Not engage in fraudulent or deceptive practices</li>
                <li>Properly describe and represent your scrap materials</li>
                <li>Honor all transaction commitments</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Transaction Terms</h2>
              <p className="text-gray-700 mb-6">All transactions on ScrapLink are subject to the following terms:</p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>20% commission fee on successful transactions</li>
                <li>Points remain pending until physical verification</li>
                <li>Disputes must be reported within 7 days of transaction</li>
                <li>All materials must match listing descriptions</li>
                <li>Transportation costs are shared between parties</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. AI Estimation Disclaimer</h2>
              <p className="text-gray-700 mb-6">
                Our AI estimation system provides approximate values based on image analysis and market data. These
                estimates are not guarantees and actual values may vary based on:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Actual weight and material composition</li>
                <li>Market fluctuations</li>
                <li>Material quality and condition</li>
                <li>Local market conditions</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Dispute Resolution</h2>
              <p className="text-gray-700 mb-6">
                In case of disputes, ScrapLink provides a structured resolution process:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li>Initial mediation through platform support</li>
                <li>Evidence review and documentation</li>
                <li>Third-party arbitration if necessary</li>
                <li>Final resolution through legal channels</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-6">
                ScrapLink shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-700 mb-6">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice
                or liability, under our sole discretion, for any reason whatsoever including breach of the Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700 mb-6">If you have any questions about these Terms, please contact us at:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@scraplink.com
                  <br />
                  <strong>Address:</strong> 123 Innovation Drive, Tech City, TC 12345
                  <br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
