import { UTApi } from "uploadthing/server";
import { NextRequest, NextResponse } from "next/server";

const utapi = new UTApi();

function extractKey(url: string): string | null {
  // Handles both https://utfs.io/f/KEY and https://APPID.ufs.sh/f/KEY
  const match = url.match(/\/f\/([^/?#]+)/);
  return match ? match[1] : null;
}

export async function POST(req: NextRequest) {
  const { urls } = await req.json() as { urls: string[] };

  if (!Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ deleted: 0 });
  }

  const keys = urls.map(extractKey).filter(Boolean) as string[];

  if (keys.length === 0) {
    return NextResponse.json({ deleted: 0 });
  }

  await utapi.deleteFiles(keys);

  return NextResponse.json({ deleted: keys.length });
}
