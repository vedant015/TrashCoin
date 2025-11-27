import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Recycle, Leaf, Package, Building, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Services = () => {
  const services = [
    {
      icon: Trash2,
      title: "Regular Garbage Pickup",
      description: "Scheduled waste collection services for residential and commercial properties. We ensure timely pickups on your preferred schedule.",
      features: ["Weekly/Bi-weekly schedules", "Flexible timing", "Multiple bin sizes"],
    },
    {
      icon: Recycle,
      title: "Recycling Services",
      description: "Comprehensive recycling programs for paper, plastic, glass, and metal. We help you maximize your recycling efforts.",
      features: ["Sorted recycling", "Educational resources", "Impact tracking"],
    },
    {
      icon: Leaf,
      title: "Organic Waste Collection",
      description: "Specialized collection and composting of organic waste. Turn your food waste into valuable compost.",
      features: ["Composting programs", "Garden waste pickup", "Eco-friendly processing"],
    },
    {
      icon: Package,
      title: "Bulk Waste Removal",
      description: "Need to dispose of large items? We handle furniture, appliances, and other bulk waste with care.",
      features: ["Large item pickup", "Same-day service available", "Proper disposal"],
    },
    {
      icon: Building,
      title: "Commercial Services",
      description: "Tailored waste management solutions for businesses of all sizes. Keep your workplace clean and compliant.",
      features: ["Custom schedules", "Multiple locations", "Compliance support"],
    },
    {
      icon: Calendar,
      title: "Special Event Services",
      description: "Planning an event? We provide temporary waste stations and post-event cleanup services.",
      features: ["Event planning", "On-site bins", "Quick cleanup"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive waste management solutions designed to meet all your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Request a pickup today and experience the difference of professional waste management
          </p>
          <Link to="/request">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Request Pickup Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
