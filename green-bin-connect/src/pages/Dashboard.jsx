import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsCard from "@/components/StatsCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Trash2, LogOut, Coins, Package, Calendar, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";
import { calculatePoints, getUserRewards, updateUserRewards } from "@/lib/rewards";
import { pickupAPI } from "@/lib/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [totalPointsDistributed, setTotalPointsDistributed] = useState(0);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      toast.error("Access denied. Admin only.");
      navigate("/login");
      return;
    }

    loadRequests();
  }, [navigate]);

  const loadRequests = async () => {
    try {
      const data = await pickupAPI.getAllRequests();
      setRequests(data);
      
      // Calculate total points
      const totalPoints = data.reduce((sum, req) => 
        sum + (req.coinsEarned || 0), 0
      );
      setTotalPointsDistributed(totalPoints);
    } catch (error) {
      toast.error("Failed to load pickup requests");
      console.error(error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      console.log('Updating request:', { id, newStatus });
      const currentRequest = requests.find(req => req.id === id);
      console.log('Current request:', currentRequest);
      
      // Calculate points when marking as completed
      let coinsEarned = null;
      if (newStatus === "completed" && currentRequest.status !== "completed") {
        coinsEarned = calculatePoints(currentRequest.wasteType);
        console.log('Calculated coins:', coinsEarned);
      }
      
      // Update status via API
      console.log('Calling API with:', { id, newStatus, coinsEarned });
      const result = await pickupAPI.updateStatus(id, newStatus, coinsEarned);
      console.log('API response:', result);
      
      if (newStatus === "completed") {
        toast.success(`Request completed! ${coinsEarned} TC awarded to user.`);
      } else {
        toast.success("Status updated successfully");
      }
      
      // Reload requests
      await loadRequests();
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      toast.error(`Failed to update status: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully");
    navigate("/login");
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

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen">
        <Navbar />

        <section className="py-12 container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage waste pickup requests and rewards</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Requests"
              value={requests.length}
              icon={Package}
              gradient="from-blue-500 to-cyan-500"
            />
            <StatsCard
              title="Pending"
              value={requests.filter((r) => r.status === "pending").length}
              icon={Calendar}
              gradient="from-yellow-500 to-orange-500"
            />
            <StatsCard
              title="Completed"
              value={requests.filter((r) => r.status === "completed").length}
              icon={TrendingUp}
              gradient="from-green-500 to-emerald-500"
            />
            <StatsCard
              title="Points Distributed"
              value={totalPointsDistributed}
              description="TrashCoins awarded"
              icon={Coins}
              gradient="from-amber-400 to-yellow-500"
            />
          </div>

        <Card>
          <CardHeader>
            <CardTitle>Pickup Requests</CardTitle>
            <CardDescription>View and manage all incoming requests</CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Trash2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No pickup requests yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Waste Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">User #{request.userId}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="text-muted-foreground">ID: {request.userId}</div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{request.address}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{request.wasteType}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {request.preferredDate ? new Date(request.preferredDate).toLocaleDateString() : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {request.coinsEarned > 0 ? (
                            <span className="text-amber-600 font-semibold">
                              +{request.coinsEarned} TC
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              {calculatePoints(request.wasteType)} TC
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={request.status}
                            onValueChange={(value) => handleStatusUpdate(request.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                          </Select>
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

export default Dashboard;
