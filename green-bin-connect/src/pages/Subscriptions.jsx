import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionCard from "@/components/SubscriptionCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Calendar, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Subscriptions = () => {
  const [activeSubscription, setActiveSubscription] = useState(null);

  useEffect(() => {
    const userSub = JSON.parse(localStorage.getItem("userSubscription") || "null");
    setActiveSubscription(userSub);
  }, []);

  const subscriptionPlans = [
    {
      id: "starter",
      name: "Starter",
      price: "$9.99",
      frequency: "Monthly pickups",
      bonusPoints: 20,
      features: [
        "1 pickup per month",
        "+20 TC bonus per cycle",
        "Email support",
        "Basic waste types (Dry, Wet)",
      ],
    },
    {
      id: "regular",
      name: "Regular",
      price: "$19.99",
      frequency: "Bi-weekly pickups",
      bonusPoints: 50,
      features: [
        "2 pickups per month",
        "+50 TC bonus per cycle",
        "Priority support",
        "All waste types included",
        "Flexible scheduling",
      ],
      isPopular: true,
    },
    {
      id: "premium",
      name: "Premium",
      price: "$34.99",
      frequency: "Weekly pickups",
      bonusPoints: 100,
      features: [
        "4 pickups per month",
        "+100 TC bonus per cycle",
        "24/7 priority support",
        "All waste types + E-Waste",
        "Same-day scheduling",
        "Dedicated collector",
      ],
    },
  ];

  const handleSubscribe = (planId) => {
    const plan = subscriptionPlans.find((p) => p.id === planId);
    if (!plan) return;

    const subscription = {
      planId,
      planName: plan.name,
      startDate: new Date().toISOString(),
      nextPickupDate: getNextPickupDate(planId),
      status: "active",
      autoRenew: true,
    };

    localStorage.setItem("userSubscription", JSON.stringify(subscription));
    setActiveSubscription(subscription);
    toast.success(`Subscribed to ${plan.name} plan!`);
  };

  const handleCancelSubscription = () => {
    localStorage.removeItem("userSubscription");
    setActiveSubscription(null);
    toast.success("Subscription cancelled");
  };

  const getNextPickupDate = (planId) => {
    const today = new Date();
    let daysToAdd = 30; // Monthly by default

    if (planId === "regular") daysToAdd = 14; // Bi-weekly
    if (planId === "premium") daysToAdd = 7; // Weekly

    const nextDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    return nextDate.toISOString();
  };

  const getDaysUntilNextPickup = () => {
    if (!activeSubscription?.nextPickupDate) return 0;
    const today = new Date();
    const nextDate = new Date(activeSubscription.nextPickupDate);
    const diffTime = nextDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen">
        <Navbar />

        <section className="py-12 container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Subscription Plans</h1>
            <p className="text-muted-foreground text-lg">
              Choose a plan that fits your waste management needs
            </p>
          </div>

          {/* Active Subscription */}
          {activeSubscription && (
            <Card className="mb-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <h3 className="text-xl font-bold">
                        Active Plan: {activeSubscription.planName}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Next pickup in {getDaysUntilNextPickup()} days (
                        {new Date(activeSubscription.nextPickupDate).toLocaleDateString()})
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-primary text-primary">
                      Auto-Renew: {activeSubscription.autoRenew ? "On" : "Off"}
                    </Badge>
                    <Button variant="destructive" onClick={handleCancelSubscription}>
                      Cancel Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Subscription Plans */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionPlans.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                frequency={plan.frequency}
                bonusPoints={plan.bonusPoints}
                features={plan.features}
                isPopular={plan.isPopular}
                onSubscribe={() => handleSubscribe(plan.id)}
                isActive={activeSubscription?.planId === plan.id}
              />
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-8">Why Subscribe?</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-semibold mb-2">Never Miss a Pickup</h3>
                  <p className="text-sm text-muted-foreground">
                    Automated scheduling ensures your waste is collected on time
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="font-semibold mb-2">Bonus TrashCoins</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn extra points with every subscription cycle
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">🌱</div>
                  <h3 className="font-semibold mb-2">Consistent Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular pickups mean consistent environmental contribution
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Subscriptions;
