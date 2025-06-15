
export const getTierColor = (tier: string) => {
  switch (tier) {
    case "Enterprise": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    case "High-End": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    case "Professional": return "bg-green-500/20 text-green-300 border-green-500/30";
    case "Mid-Range": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};
