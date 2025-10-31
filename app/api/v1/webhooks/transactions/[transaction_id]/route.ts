import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET(
  req: Request,
  { params }: { params: { transaction_id: string } },
) {
  const { transaction_id } = params;

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("transaction_id", transaction_id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Transaction not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(data);
}
