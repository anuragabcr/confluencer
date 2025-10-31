import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

type Transaction = {
  transaction_id: string;
  source_account: string;
  destination_account: string;
  amount: number;
  currency: string;
};

export async function POST(req: Request) {
  try {
    const data: Transaction = await req.json();
    const { transaction_id } = data;

    // Check idempotency — skip if already processed or processing
    const { data: existing } = await supabase
      .from("transactions")
      .select("*")
      .eq("transaction_id", transaction_id)
      .single();

    if (existing) {
      return NextResponse.json(
        { message: "Already processing" },
        { status: 202 },
      );
    }

    // Insert record as PROCESSING
    await supabase
      .from("transactions")
      .insert([{ ...data, status: "PROCESSING" }]);

    // Simulate background processing
    setTimeout(async () => {
      await supabase
        .from("transactions")
        .update({
          status: "PROCESSED",
          processed_at: new Date().toISOString(),
        })
        .eq("transaction_id", transaction_id);
    }, 30000); // 30 seconds delay

    return NextResponse.json({ message: "Webhook received" }, { status: 202 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
