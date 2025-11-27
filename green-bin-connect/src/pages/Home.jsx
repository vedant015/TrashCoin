import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recycle, Trash2, Monitor, Droplet, Clock, Shield, Users, ArrowRight, Gift } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";
import { motion } from "framer-motion";

const Home = () => {
  const services = [
    {
      icon: Trash2,
      title: "Household Waste",
      description: "Regular garbage pickup at your convenience",
      points: 10,
    },
    {
      icon: Recycle,
      title: "Recycling",
      description: "Proper recycling and waste segregation",
      points: 25,
    },
    {
      icon: Monitor,
      title: "E-Waste Collection",
      description: "Safe disposal of electronic waste",
      points: 50,
    },
    {
      icon: Droplet,
      title: "Wet Waste",
      description: "Organic waste composting services",
      points: 15,
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your waste management needs",
    },
    {
      icon: Shield,
      title: "Reliable Service",
      description: "Trusted and consistent waste collection you can count on",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Serving our community with care and responsibility",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "EcoWaste has made managing our household waste so much easier. The service is reliable and eco-friendly!",
      role: "Homeowner",
    },
    {
      name: "Michael Chen",
      text: "Professional service and great support. They truly care about sustainable waste management.",
      role: "Business Owner",
    },
    {
      name: "Emily Rodriguez",
      text: "The request system is so convenient. I can schedule pickups with just a few clicks!",
      role: "Resident",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
        <div className="relative z-10 container mx-auto px-4 space-y-6 animate-fade-in">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white"
          >
            Earn Rewards While You Recycle
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
          >
            Join TrashCoin and get rewarded for making our planet greener
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/request">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Request Pickup Now
              </Button>
            </Link>
            <Link to="/rewards">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Gift className="w-5 h-5 mr-2" />
                View Rewards
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Earn TrashCoins for every pickup. The more you recycle, the more you earn!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover-lift border-2 h-full">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 text-amber-600 font-bold text-lg">
                      +{service.points} TC
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Start earning TrashCoins in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "1", title: "Sign Up", desc: "Create your free TrashCoin account" },
              { step: "2", title: "Request Pickup", desc: "Schedule a waste collection" },
              { step: "3", title: "Get Collected", desc: "Our team collects your waste" },
              { step: "4", title: "Earn TrashCoins", desc: "Receive points for recycling" },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground text-lg">
              We're committed to providing the best waste management experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join TrashCoin today and turn your recycling into rewards
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/request">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Request Pickup
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
