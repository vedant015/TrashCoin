import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coins, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import RewardBadge from "@/components/RewardBadge";
import { getUserRewards } from "@/lib/rewards";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userPoints, setUserPoints] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const role = localStorage.getItem("userRole");
    setIsLoggedIn(!!user);
    setUserRole(role || "");
    
    if (user && role === "user") {
      const rewards = getUserRewards();
      setUserPoints(rewards.totalPoints);
    }
  }, [location]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/rewards", label: "Rewards", requiresAuth: true },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:opacity-90 transition-opacity">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">TrashCoin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks
              .filter((link) => !link.requiresAuth || isLoggedIn)
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            {isLoggedIn && userRole === "user" && userPoints > 0 && (
              <RewardBadge points={userPoints} size="sm" animated={false} />
            )}
            <Link to="/request">
              <Button className="bg-primary hover:bg-primary/90">
                Request Pickup
              </Button>
            </Link>
            {!isLoggedIn ? (
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            ) : (
              <Link to={userRole === "admin" ? "/dashboard" : "/user-dashboard"}>
                <Button variant="outline">Dashboard</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            {navLinks
              .filter((link) => !link.requiresAuth || isLoggedIn)
              .map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    isActive(link.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            <Link to="/request" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Request Pickup
              </Button>
            </Link>
            {!isLoggedIn ? (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
            ) : (
              <Link
                to={userRole === "admin" ? "/dashboard" : "/user-dashboard"}
                onClick={() => setIsOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
