import { Coins } from "lucide-react";
import { motion } from "framer-motion";

const RewardBadge = ({ points, size = "md", animated = true }) => {
  const sizeClasses = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-1.5",
    lg: "text-2xl px-4 py-2",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  const Component = animated ? motion.div : "div";

  return (
    <Component
      className={`inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-bold rounded-full ${sizeClasses[size]} shadow-md`}
      {...(animated
        ? {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { type: "spring", stiffness: 200 },
          }
        : {})}
    >
      <Coins className={iconSizes[size]} />
      <span>{points.toLocaleString()}</span>
    </Component>
  );
};

export default RewardBadge;
