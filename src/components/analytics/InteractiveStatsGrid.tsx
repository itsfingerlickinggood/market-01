
import StatCard from "./StatCard";
import { getStatsWithSparklines } from "@/constants/statsData";

const InteractiveStatsGrid = () => {
  const stats = getStatsWithSparklines();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
          icon={stat.icon}
          description={stat.description}
          sparklineData={stat.sparklineData}
          color={stat.color}
          bgColor={stat.bgColor}
        />
      ))}
    </div>
  );
};

export default InteractiveStatsGrid;
