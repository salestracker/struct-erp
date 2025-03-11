import { Brain, BarChart2, Box, Users, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Make informed decisions with predictive analytics and intelligent recommendations."
  },
  {
    icon: BarChart2,
    title: "Advanced Analytics",
    description: "Track key metrics and visualize your business performance in real-time."
  },
  {
    icon: Box,
    title: "Inventory Management",
    description: "Optimize stock levels and automate reordering with smart inventory tracking."
  },
  {
    icon: Users,
    title: "Customer Management",
    description: "Understand and serve your customers better with comprehensive CRM features."
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Stay informed with instant notifications and live data updates."
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Keep your data safe with enterprise-grade security and compliance."
  }
];

export function FeaturesSection() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Your Business
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to manage and grow your e-commerce business
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
