"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for occasional sellers",
      features: [
        "Up to 5 listings per month",
        "Basic AI estimation",
        "Standard support",
        "Mobile app access",
        "Basic analytics",
      ],
      limitations: ["Limited to 5 transactions/month", "Standard processing time"],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Professional",
      price: "$19",
      period: "/month",
      description: "For regular traders and small businesses",
      features: [
        "Unlimited listings",
        "Advanced AI estimation",
        "Priority support",
        "Advanced analytics",
        "Bulk upload tools",
        "Custom pricing alerts",
        "Verified seller badge",
      ],
      limitations: [],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale operations",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "Advanced reporting",
        "SLA guarantee",
        "Custom training",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  const faq = [
    {
      question: "How does the commission structure work?",
      answer:
        "ScrapLink charges a 20% commission on successful transactions, which covers platform maintenance, AI processing, dispute resolution, and payment processing.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees! Our pricing is transparent. The only costs are the subscription fee (for paid plans) and the 20% transaction commission.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. You&rsquo;ll continue to have access to paid features until the end of your billing period.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee for all paid subscriptions. If you&rsquo;re not satisfied, we&rsquo;ll provide a full refund.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers.",
    },
  ]

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
            <h1 className="text-xl font-bold text-gray-900">Pricing</h1>
            <Link href="/auth">
              <Button className="bg-[#006636] hover:bg-[#005528] text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your trading volume. Start free and upgrade as you grow.
          </p>
          <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">🎉 30-day money-back guarantee</Badge>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular
                    ? "ring-2 ring-[#006636] shadow-xl scale-105"
                    : "shadow-lg hover:shadow-xl transition-shadow"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#006636] text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#006636]">{plan.price}</span>
                    {plan.period && <span className="text-gray-600">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-500 mb-2">Limitations:</p>
                      {plan.limitations.map((limitation, limitIndex) => (
                        <p key={limitIndex} className="text-sm text-gray-600">
                          • {limitation}
                        </p>
                      ))}
                    </div>
                  )}

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-[#006636] hover:bg-[#005528] text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Transaction Commission</h2>
          <div className="bg-gradient-to-r from-[#006636] to-green-500 rounded-2xl p-8 text-white">
            <div className="text-6xl font-bold mb-4">20%</div>
            <p className="text-xl mb-4">Commission on successful transactions</p>
            <p className="text-green-100">
              This covers AI processing, payment security, dispute resolution, and platform maintenance
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faq.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#006636] to-green-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-green-100 mb-8">Join thousands of users making money with ScrapLink</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-white text-[#006636] hover:bg-gray-100 text-lg px-8 py-4 h-auto">
                Start Free Today
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#006636] text-lg px-8 py-4 h-auto bg-transparent"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
