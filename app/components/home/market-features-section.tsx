import {
  Fish,
  Leaf,
  Award,
  Waves,
  ThermometerSnowflake,
  Shield,
} from "lucide-react";

export function MarketFeaturesSection() {
  const features = [
    {
      icon: Fish,
      title: "SUSTAINABLY SOURCED",
      description:
        "We partner with fisheries that follow sustainable practices to protect our oceans for future generations.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Leaf,
      title: "WILD CAUGHT",
      description:
        "Our seafood is wild-caught from pristine waters, ensuring the best flavor and nutritional value.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Award,
      title: "QUALITY TESTED",
      description:
        "Every product undergoes rigorous quality testing to meet our high standards before reaching you.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const badges = [
    { icon: Waves, label: "Ocean-Fresh", value: "Daily" },
    { icon: ThermometerSnowflake, label: "Temperature", value: "-2°C" },
    { icon: Shield, label: "Certified", value: "100%" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-300 text-sm font-semibold tracking-wider">
              OUR COMMITMENT
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Our Seafood
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Were committed to delivering the highest quality seafood with
            sustainable practices
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div
                      className={`relative group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}
                      />
                      <div
                        className={`relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-2xl`}
                      >
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-4 text-xl font-bold text-white text-center group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-center group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Badges */}
        <div className="grid grid-cols-3 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 text-center hover:border-orange-500/50 transition-all hover:bg-slate-800/50"
              >
                <Icon className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                <p className="text-slate-400 text-sm mb-1">{badge.label}</p>
                <p className="text-2xl font-bold text-white">{badge.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
