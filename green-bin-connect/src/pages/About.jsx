import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Environmental Care",
      description: "We're committed to protecting our planet through sustainable waste management practices.",
    },
    {
      icon: Target,
      title: "Our Mission",
      description: "To make waste management accessible, efficient, and environmentally responsible for all.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "We believe in serving our community with integrity and dedication to cleanliness.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Striving for the highest standards in service quality and customer satisfaction.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-6">About EcoWaste</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading the way in sustainable waste management solutions for a cleaner, greener future.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 2020, EcoWaste emerged from a simple yet powerful idea: waste management
              should be easy, efficient, and environmentally responsible. What started as a local
              initiative has grown into a comprehensive waste management service serving thousands
              of households and businesses.
            </p>
            <p>
              We recognized that traditional waste management was often inconvenient and
              environmentally harmful. Our mission was to change that by leveraging technology and
              sustainable practices to create a better system for everyone.
            </p>
            <p>
              Today, we're proud to be at the forefront of the green revolution, helping our
              community reduce its environmental footprint while providing convenient, reliable
              service that our customers can count on.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
            <p className="text-muted-foreground">Pickups Completed</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
            <p className="text-muted-foreground">Tons Recycled</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <p className="text-muted-foreground">Customer Satisfaction</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
