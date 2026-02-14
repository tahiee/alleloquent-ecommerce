import { Truck, Shield, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function InfoCardsSection() {
  const cards = [
    {
      icon: Truck,
      title: "FREE DELIVERY 🚚",
      description: "Orders over ₦20,000 - We got you!",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "100% FRESH GUARANTEE ✅",
      description: "Not fresh? Full refund, no wahala!",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Clock,
      title: "24-HOUR DELIVERY ⚡",
      description: "Order today, enjoy tomorrow!",
      gradient: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="py-16 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2"
              >
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex-shrink-0">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-1 group-hover:text-orange-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
