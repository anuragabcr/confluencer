"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ChartDisplay from "../components/ChartDisplay";
import ChartEditor from "../components/ChartEditor";
import EmailPrompt from "../components/EmailPrompt";

export default function AnalyticsPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [chartData, setChartData] = useState([
    { day: "Mon", calls: 20 },
    { day: "Tue", calls: 25 },
    { day: "Wed", calls: 18 },
    { day: "Thu", calls: 30 },
    { day: "Fri", calls: 22 },
  ]);

  const handleSave = async (data: typeof chartData) => {
    if (!email) return;
    const { data: existing } = await supabase
      .from("user_chart_data")
      .select("*")
      .eq("email", email)
      .single();

    if (existing) {
      const confirmOverwrite = confirm("Previous values found. Overwrite?");
      if (!confirmOverwrite) return;
    }

    await supabase.from("user_chart_data").upsert({
      email,
      chart_values: data,
      updated_at: new Date().toISOString(),
    });

    alert("Data saved successfully!");
  };

  const loadUserData = async (userEmail: string) => {
    const { data } = await supabase
      .from("user_chart_data")
      .select("*")
      .eq("email", userEmail)
      .single();
    if (data) setChartData(data.chart_values);
    setEmail(userEmail);
  };

  if (!email) return <EmailPrompt onEmailSubmit={loadUserData} />;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        📊 Voice Agent Call Analytics
      </h1>
      <div className="max-w-3xl mx-auto">
        <ChartDisplay data={chartData} />
        <ChartEditor initialData={chartData} onSave={handleSave} />
      </div>
    </main>
  );
}
