// import { NextRequest, NextResponse } from "next/server";
// import { cartTable, db } from "@/lib/drizzle";
// import { v4 as uuid } from "uuid";
// import { cookies } from "next/dist/client/components/headers";
// import {eq} from "drizzle-orm";

// export const GET = async (request: NextRequest) => {
//   const userId = cookies().get("user_id")?.value;

//   if (!userId) {
//     return NextResponse.json({ message: "User ID not found" });
//   }

//   try {
//     const res = await db
//       .select()
//       .from(cartTable)
//       .where(eq(cartTable.user_id, userId));

//     return NextResponse.json({ res });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Something went wrong" });
//   }
// };
// export const POST = async (request: NextRequest) => {
//   const req = await request.json();
//   const uid = uuid();
//   const setCookies = cookies();

//   const user_id = cookies().get("user_id")
//   if (!user_id) {
//     setCookies.set("user_id", uid);
//   }

//   try {
//     const res = await db
//       .insert(cartTable)
//       .values({
//         product_id: req.product_id,
//         quantity: 1,
//         user_id: cookies().get("user_id")?.value as string,
//       })
//       .returning();
//   } catch (error) {}
// };

import {db} from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { cartTable } from "@/lib/schema";

export async function GET(req: NextRequest) {
  let url = req.nextUrl.searchParams;
  try {
    if (url.has("user_id")) {
      let allCartData = await db
        .select()
        .from(cartTable)
        .where(eq(cartTable.user_id, url.get("user_id") as string));
      return NextResponse.json({ allCartData });
    }
  } catch (error) {
    console.log("error : ", (error as { message: string }).message);
    return NextResponse.json({ error });
  }
}

export async function POST(req: NextRequest) {
  let request = await req.json();
  try {
    if (
      request.product_id &&
      request.quantity &&
      request.user_id &&
      request.price
    ) {
      let response = await db.insert(cartTable).values(request).returning();
      return NextResponse.json({ response });
    } else {
      throw Error("Please put product_id quantity user_id");
    }
  } catch (error) {
    console.log("error : ", (error as { message: string }).message);
    return NextResponse.json({ error });
  }
}
export async function PUT(req: NextRequest) {
  let request = await req.json();

  try {
    let response = await db
      .update(cartTable)
      .set(request)
      .where(
        and(
          eq(cartTable.product_id, request.product_id),
          eq(cartTable.user_id, request.user_id)
        )
      )
      .returning();
    return NextResponse.json({ response });
  } catch (error) {
    console.log("error : ", (error as { message: string }).message);
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: NextRequest) {
  let url = req.nextUrl.searchParams;
  try {
    if (url.has("product_id") && url.has("user_id")) {
      let response = await db
        .delete(cartTable)
        .where(
          and(
            eq(cartTable.product_id, url.get("product_id") as string),
            eq(cartTable.user_id, url.get("user_id") as string)
          )
        )
        .returning();
      return NextResponse.json({ response });
    }
  } catch (error) {
    console.log("error : ", (error as { message: string }).message);
    return NextResponse.json({ error });
  }
}
