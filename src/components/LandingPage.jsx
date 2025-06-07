import { Link } from "react-router-dom";
import { ArrowRight, Shield, TrendingUp, Zap, CreditCard, BarChart3, CheckCircle } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Financial Freedom Starts Here
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Master Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Finances
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 max-w-xl leading-relaxed">
                Connect all your bank accounts in one secure dashboard. Track spending, analyze patterns, and take control of your financial future with powerful insights.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/signup"
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                Start Free Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <button className="inline-flex items-center justify-center border-2 border-slate-400/50 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl backdrop-blur-sm transition-all duration-300">
                Watch Demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2 text-slate-400">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">Bank-level security</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">256-bit encryption</span>
              </div>
            </div>
          </div>

          {/* Right side - App preview */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative transform hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="space-y-6">
                  {/* Mock dashboard header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                      <div>
                        <div className="w-20 h-3 bg-white/30 rounded"></div>
                        <div className="w-16 h-2 bg-white/20 rounded mt-1"></div>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                  </div>

                  {/* Mock balance cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-400/30">
                      <div className="w-12 h-2 bg-blue-400 rounded mb-2"></div>
                      <div className="w-20 h-6 bg-white rounded"></div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4 border border-purple-400/30">
                      <div className="w-16 h-2 bg-purple-400 rounded mb-2"></div>
                      <div className="w-24 h-6 bg-white rounded"></div>
                    </div>
                  </div>

                  {/* Mock chart */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-end space-x-2 h-24">
                      {[40, 60, 35, 80, 45, 70, 55].map((height, i) => (
                        <div 
                          key={i}
                          className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t flex-1 opacity-80"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Everything you need to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                succeed financially
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Powerful tools and insights to help you understand, track, and optimize your spending across all accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CreditCard,
                title: "Connect All Accounts",
                description: "Securely link unlimited bank accounts, credit cards, and financial institutions in seconds.",
                gradient: "from-blue-500/20 to-cyan-500/20",
                border: "border-blue-400/30"
              },
              {
                icon: BarChart3,
                title: "Smart Analytics",
                description: "Get detailed insights into your spending patterns with interactive charts and reports.",
                gradient: "from-purple-500/20 to-pink-500/20",
                border: "border-purple-400/30"
              },
              {
                icon: TrendingUp,
                title: "Financial Growth",
                description: "Track your financial progress over time and identify opportunities for improvement.",
                gradient: "from-green-500/20 to-emerald-500/20",
                border: "border-green-400/30"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group bg-gradient-to-br ${feature.gradient} backdrop-blur-lg rounded-2xl p-8 border ${feature.border} hover:border-white/40 transition-all duration-500 hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Get started in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> 3 simple steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect",
                description: "Link your bank accounts securely using our encrypted connection system."
              },
              {
                step: "02",
                title: "Track",
                description: "Monitor all transactions, balances, and spending patterns in real-time."
              },
              {
                step: "03",
                title: "Optimize",
                description: "Use AI-powered insights to make smarter financial decisions."
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-400/50 to-purple-400/50"></div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed max-w-sm mx-auto">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-12 border border-blue-400/30">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to take control of your finances?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already transformed their financial lives with our platform.
            </p>
            <Link 
              to="/signup"
              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-10 py-6 text-xl font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">
            © 2024 Financial Tracker. All rights reserved. Built with ❤️ for your financial success.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;