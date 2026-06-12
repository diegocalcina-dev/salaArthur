import { writeFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const filePath = join(process.cwd(), 'tasks-pending-ai.json')
  writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf-8')
  const count = (body.tasks?.length ?? 0) + (body.lessons?.length ?? 0)
  return NextResponse.json({ ok: true, count })
}
