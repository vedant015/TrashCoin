import { motion } from "framer-motion";
import { Coins } from "lucide-react";

const CoinAnimation = ({ points, show }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 1], y: -100 }}
      transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
    >
      <div className="flex flex-col items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-6 py-4 rounded-full shadow-2xl">
        <Coins className="w-12 h-12" />
        <span className="text-2xl font-bold">+{points} TC</span>
      </div>
    </motion.div>
  );
};

export default CoinAnimation;
