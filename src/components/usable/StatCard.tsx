import React from "react";
import { BoxIcon } from "lucide-react";
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: any
  color?: string;
}
export const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
}: StatsCardProps) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
        <div
          className={`p-3 rounded-full ${colorMap[color as keyof typeof colorMap]}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
