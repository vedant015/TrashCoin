import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";

const SubscriptionCard = ({
  name,
  price,
  frequency,
  bonusPoints,
  features,
  isPopular,
  onSubscribe,
  isActive,
}) => {
  return (
    <Card className={`relative hover-lift ${isPopular ? "border-primary border-2" : ""}`}>
      {isPopular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white border-0">
          <Sparkles className="w-3 h-3 mr-1" />
          Most Popular
        </Badge>
      )}
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="text-sm">{frequency}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold text-primary">{price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <Badge variant="outline" className="mt-2 mx-auto">
          +{bonusPoints} TC per cycle
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full bg-primary hover:bg-primary/90"
          onClick={onSubscribe}
          disabled={isActive}
        >
          {isActive ? "Active Plan" : "Subscribe Now"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
