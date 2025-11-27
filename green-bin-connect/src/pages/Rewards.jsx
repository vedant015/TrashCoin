import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RewardBadge from "@/components/RewardBadge";
import RewardHistory from "@/components/RewardHistory";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Gift, Trophy, TreePine, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { authAPI } from "@/lib/api";
import { toast } from "sonner";

const Rewards = () => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState({ totalPoints: 0, redeemedPoints: 0, history: [] });

  useEffect(() => {
    const loadUserCoins = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        if (!currentUser.userId) {
          toast.error("Please login to view rewards");
          navigate("/login");
          return;
        }

        // Fetch current user details from backend
        const userDetails = await authAPI.getUserDetails(currentUser.userId);
        setRewards({
          totalPoints: userDetails.coinsEarned || 0,
          redeemedPoints: 0,
          history: []
        });
      } catch (error) {
        console.error("Failed to load user coins:", error);
        toast.error("Failed to load coin balance");
      }
    };

    loadUserCoins();
  }, [navigate]);

  const redemptionOptions = [
    {
      icon: Ticket,
      title: "$5 Off Next Pickup",
      points: 100,
      description: "Get $5 discount on your next collection",
    },
    {
      icon: Gift,
      title: "Free Premium Pickup",
      points: 250,
      description: "One free priority pickup service",
    },
    {
      icon: Gift,
      title: "Eco-Friendly Gift Voucher",
      points: 500,
      description: "$25 voucher for eco-friendly products",
    },
    {
      icon: TreePine,
      title: "Plant a Tree",
      points: 1000,
      description: "We'll plant a tree in your name",
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Sarah Green", points: 2450 },
    { rank: 2, name: "Mike Eco", points: 1890 },
    { rank: 3, name: "Emma Leaf", points: 1650 },
    { rank: 4, name: "You", points: rewards.totalPoints },
    { rank: 5, name: "John Nature", points: 980 },
  ];

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen">
        <Navbar />

        <section className="py-12 container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Your TrashCoins</h1>
            <p className="text-muted-foreground text-lg mb-6">
              Earn rewards by recycling and making our planet greener
            </p>
            <div className="flex justify-center">
              <RewardBadge points={rewards.totalPoints} size="lg" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Redemption Options */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Redeem Your TrashCoins</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {redemptionOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover-lift">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <option.icon className="w-6 h-6 text-primary" />
                          </div>
                          <RewardBadge points={option.points} size="sm" animated={false} />
                        </div>
                        <CardTitle className="text-lg mt-3">{option.title}</CardTitle>
                        <CardDescription>{option.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          className="w-full"
                          disabled={rewards.totalPoints < option.points}
                          variant={rewards.totalPoints >= option.points ? "default" : "outline"}
                        >
                          {rewards.totalPoints >= option.points ? "Redeem Now" : "Not Enough TC"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    Top Recyclers
                  </CardTitle>
                  <CardDescription>See how you rank this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((user) => (
                      <div
                        key={user.rank}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          user.name === "You"
                            ? "bg-primary/10 border border-primary"
                            : "bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              user.rank <= 3
                                ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white"
                                : "bg-muted-foreground/20"
                            }`}
                          >
                            {user.rank}
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-amber-600">
                          {user.points} TC
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Reward History */}
          <div className="max-w-4xl mx-auto">
            <RewardHistory history={rewards.history} />
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold mb-2">Want More TrashCoins?</h3>
                <p className="text-muted-foreground mb-4">
                  Request more pickups and earn rewards for every collection!
                </p>
                <Link to="/request">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Request Pickup Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Rewards;
