import { revalidateTag } from "next/cache";
import { type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Verify the webhook secret
  const token = request.headers.get("x-webhook-secret");
  if (token !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }

  try {
    const { _type } = await request.json();

    // Revalidate based on the document type
    // Next 16 requires a cache-life profile. `{ expire: 0 }` matches the old
    // one-argument behaviour: the next request blocks and renders fresh data.
    // The recommended "max" would serve one stale page first, so an editor who
    // publishes in Sanity and refreshes would still see their old content.
    revalidateTag(_type.replace("_", ""), { expire: 0 });

    return Response.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Revalidation error:", err);
    return Response.json({ message: "Error revalidating" }, { status: 500 });
  }
}
