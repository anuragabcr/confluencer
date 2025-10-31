"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartDisplayProps = {
  data: { day: string; calls: number }[];
};

export default function ChartDisplay({ data }: ChartDisplayProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Daily Call Volume</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="calls"
            stroke="#4f46e5"
            strokeWidth={3}
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
