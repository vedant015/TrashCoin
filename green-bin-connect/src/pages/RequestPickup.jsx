import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Droplet, Recycle, Monitor, Coins } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { calculatePoints, getWasteTypeLabel, awardPickupPoints } from "@/lib/rewards";
import { pickupAPI } from "@/lib/api";

const RequestPickup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    wasteType: "",
    weight: "",
    notes: "",
  });
  const [estimatedPoints, setEstimatedPoints] = useState(0);

  useEffect(() => {
    // Auto-fill if user is logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser.email) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleWasteTypeChange = (value) => {
    setFormData({
      ...formData,
      wasteType: value,
    });
    setEstimatedPoints(calculatePoints(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.wasteType || !formData.weight) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (parseFloat(formData.weight) <= 0) {
      toast.error("Weight must be greater than 0");
      return;
    }

    try {
      // Get current user ID
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      if (!currentUser.userId) {
        toast.error("Please login to request pickup");
        navigate("/login");
        return;
      }

      // Create pickup request via API
      const requestData = {
        userId: currentUser.userId,
        address: formData.address,
        wasteType: formData.wasteType,
        estimatedWeight: formData.weight ? parseFloat(formData.weight) : 0,
        preferredDate: new Date().toISOString(),
        notes: formData.notes,
      };

      await pickupAPI.createRequest(requestData);

      toast.success(`Pickup request submitted! You'll earn ${estimatedPoints} TC when completed.`);
      navigate("/user-dashboard");
    } catch (error) {
      toast.error("Failed to submit pickup request");
      console.error(error);
    }
  };

  const wasteTypes = [
    { value: "dry", label: "Dry Waste", icon: Trash2, points: 10 },
    { value: "wet", label: "Wet Waste", icon: Droplet, points: 15 },
    { value: "recyclable", label: "Recyclable", icon: Recycle, points: 25 },
    { value: "ewaste", label: "E-Waste", icon: Monitor, points: 50 },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="py-20 container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Request Waste Pickup</h1>
            <p className="text-muted-foreground text-lg">
              Fill out the form below and we'll schedule your pickup
            </p>
          </div>

          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle>Pickup Details</CardTitle>
              <CardDescription>
                Please provide accurate information for efficient service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Pickup Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="123 Green Street, Eco City, 12345"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wasteType">Waste Type *</Label>
                  <Select value={formData.wasteType} onValueChange={handleWasteTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select waste type" />
                    </SelectTrigger>
                    <SelectContent>
                      {wasteTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <type.icon className="w-4 h-4 mr-2" />
                              {type.label}
                            </div>
                            <span className="text-amber-600 text-xs ml-4">+{type.points} TC</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {estimatedPoints > 0 && (
                    <div className="flex items-center gap-2 text-sm text-amber-600 font-semibold">
                      <Coins className="w-4 h-4" />
                      You'll earn {estimatedPoints} TrashCoins when completed!
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Estimated Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="e.g., 5.5"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions or details..."
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                    Submit Request
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RequestPickup;
