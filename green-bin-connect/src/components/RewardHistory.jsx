import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp } from "lucide-react";

const RewardHistory = ({ history }) => {
  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Coins className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No reward history yet</p>
          <p className="text-sm text-muted-foreground mt-2">
            Complete pickups to earn TrashCoins!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Reward History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/70 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium">{transaction.action}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
                +{transaction.points} TC
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardHistory;
