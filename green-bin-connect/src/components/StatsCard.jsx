import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

const StatsCard = ({ title, value, description, icon: Icon, gradient }) => {
  const gradientClass = gradient || "from-primary to-accent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover-lift">
        <CardHeader className={`bg-gradient-to-br ${gradientClass} text-white pb-2`}>
          <div className="flex items-center justify-between">
            <CardDescription className="text-white/90 text-sm font-medium">
              {title}
            </CardDescription>
            <Icon className="w-5 h-5 text-white/90" />
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-3xl font-bold">{value}</div>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
