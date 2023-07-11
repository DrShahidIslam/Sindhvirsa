// import { NextRequest, NextResponse } from "next/server";
// import { Iproduct } from "@/app/product/page";

// export async function GET(request: NextRequest) {
//     const orignalData: Array<Iproduct> = [];
//     const url = request.nextUrl.searchParams;

//     let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-06-06/data/query/production?query=*[_type == "product"]`);
//     let dataFrom_APi = await res.json();
//     orignalData.push(...dataFrom_APi.result)

//     if (url.has("start") || url.has("end")) {
//         if (orignalData[Number(url.get("start"))]) {
//             let productArray = orignalData.slice(Number(url.get("start")), Number(url.get("end")))
//             return NextResponse.json({ productArray })
//         }
//         return NextResponse.json({ productArray: "Not found" })

//     }

//     return NextResponse.json({ orignalData })
// };
