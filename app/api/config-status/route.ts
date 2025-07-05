import { NextResponse } from "next/server"
import { getApiKeyStatus } from "@/lib/config"

export async function GET() {
  try {
    const status = getApiKeyStatus()
    return NextResponse.json(status)
  } catch (error) {
    return NextResponse.json({ configured: false, valid: false, masked: "Error" }, { status: 500 })
  }
}
