"use client";

import { useState } from "react";

type ChartEditorProps = {
  initialData: { day: string; calls: number }[];
  onSave: (data: { day: string; calls: number }[]) => void;
};

export default function ChartEditor({ initialData, onSave }: ChartEditorProps) {
  const [chartData, setChartData] = useState(initialData);

  const handleChange = (index: number, value: number) => {
    const updated = [...chartData];
    updated[index].calls = value;
    setChartData(updated);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl mt-6">
      <h3 className="font-semibold mb-4">Edit Chart Data</h3>
      {chartData.map((d, i) => (
        <div key={i} className="flex justify-between items-center mb-2">
          <span>{d.day}</span>
          <input
            type="number"
            value={d.calls}
            onChange={(e) => handleChange(i, Number(e.target.value))}
            className="border rounded-md p-1 w-24"
          />
        </div>
      ))}
      <button
        onClick={() => onSave(chartData)}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        Save Data
      </button>
    </div>
  );
}
