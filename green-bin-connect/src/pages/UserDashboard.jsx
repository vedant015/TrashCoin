import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsCard from "@/components/StatsCard";
import RewardBadge from "@/components/RewardBadge";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Coins, Package, CheckCircle, Calendar, Plus, LogOut } from "lucide-react";
import { toast } from "sonner";
import { getUserRewards } from "@/lib/rewards";
import { pickupAPI, authAPI } from "@/lib/api";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userRequests, setUserRequests] = useState([]);
  const [rewards, setRewards] = useState({ totalPoints: 0, redeemedPoints: 0, history: [] });
  const [subscription, setSubscription] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (!user.userId) {
      toast.error("Please login to view dashboard");
      navigate("/login");
      return;
    }
    setCurrentUser(user);
    loadUserData(user.userId);
  }, [navigate]);

  const loadUserData = async (userId) => {
    try {
      // Load user's pickup requests from backend
      const requests = await pickupAPI.getUserRequests(userId);
      setUserRequests(requests);

      // Calculate total coins from completed requests
      const totalCoins = requests
        .filter(req => req.status === "completed" && req.coinsEarned)
        .reduce((sum, req) => sum + req.coinsEarned, 0);

      setRewards({
        totalPoints: totalCoins,
        redeemedPoints: 0,
        history: []
      });

      // Load subscription from localStorage (can be moved to backend later)
      const userSub = JSON.parse(localStorage.getItem("userSubscription") || "null");
      setSubscription(userSub);
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "scheduled":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const completedCount = userRequests.filter((r) => r.status === "completed").length;
  const pendingCount = userRequests.filter((r) => r.status === "pending").length;

  return (
    <ProtectedRoute requiredRole="user">
      <div className="min-h-screen">
        <Navbar />

        <section className="py-12 container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {currentUser?.name?.split(" ")[0] || "User"}!
              </h1>
              <p className="text-muted-foreground">Track your pickups and rewards</p>
            </div>
            <div className="flex items-center gap-3">
              <RewardBadge points={rewards.totalPoints} size="lg" />
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="TrashCoins"
              value={rewards.totalPoints}
              description="Total earned"
              icon={Coins}
              gradient="from-amber-400 to-yellow-500"
            />
            <StatsCard
              title="Total Pickups"
              value={userRequests.length}
              description="All time"
              icon={Package}
              gradient="from-primary to-accent"
            />
            <StatsCard
              title="Pending"
              value={pendingCount}
              description="Awaiting pickup"
              icon={Calendar}
              gradient="from-blue-500 to-cyan-500"
            />
            <StatsCard
              title="Completed"
              value={completedCount}
              description="Total recycled"
              icon={CheckCircle}
              gradient="from-green-500 to-emerald-500"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Link to="/request" className="block">
              <Card className="hover-lift cursor-pointer bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <Plus className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold text-lg">Request Pickup</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Schedule a new collection
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/rewards" className="block">
              <Card className="hover-lift cursor-pointer bg-gradient-to-br from-amber-400/10 to-yellow-500/10 border-amber-400/20">
                <CardContent className="p-6 text-center">
                  <Coins className="w-10 h-10 mx-auto mb-3 text-amber-500" />
                  <h3 className="font-semibold text-lg">View Rewards</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    See your TrashCoins
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/subscriptions" className="block">
              <Card className="hover-lift cursor-pointer bg-gradient-to-br from-secondary/10 to-blue-500/10 border-secondary/20">
                <CardContent className="p-6 text-center">
                  <Calendar className="w-10 h-10 mx-auto mb-3 text-secondary" />
                  <h3 className="font-semibold text-lg">Subscriptions</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your plan
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* My Pickups */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">My Pickup Requests</h2>
              {userRequests.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground mb-4">No pickup requests yet</p>
                  <Link to="/request">
                    <Button className="bg-primary hover:bg-primary/90">
                      Request Your First Pickup
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Waste Type</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <Badge variant="outline">{request.wasteType}</Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{request.address}</TableCell>
                        <TableCell className="text-sm">
                          {request.preferredDate ? new Date(request.preferredDate).toLocaleDateString() : 'N/A'}
                        </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {request.status === "completed" && request.coinsEarned && (
                              <span className="text-amber-600 font-semibold">
                                +{request.coinsEarned} TC
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default UserDashboard;
