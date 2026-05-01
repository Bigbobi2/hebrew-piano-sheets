import ProductCard from "@/components/ProductCard";
import prisma from "@/utils/db";
import Link from "next/link";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; difficulty?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, difficulty } = await searchParams;

  // 1. Initial fetch based on filters
  let products = await prisma.product.findMany({
    where: difficulty
      ? { difficulty }
      : q
      ? {
          OR: [
            { title: { contains: q } },
            { artist: { contains: q } },
          ],
        }
      : {},
  });

  const noResultsFound = products.length === 0;

  // 2. If no results found, fetch ALL products to show instead
  if (noResultsFound) {
    products = await prisma.product.findMany({});
  }

  const levelCounts = await prisma.product.groupBy({
    by: ["difficulty"],
    where: q
      ? {
          OR: [
            { title: { contains: q } },
            { artist: { contains: q } },
          ],
        }
      : {},
    _count: { _all: true },
  });

  const getCount = (level: string) =>
    levelCounts.find((c) => c.difficulty === level)?._count._all || 0;

  const levels = ["קל", "מתקדם", "קשה"];

  return (
    <div className="bg-white min-h-screen text-black" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="flex justify-between items-center mb-6 border-b pb-2 text-right">
            <h2 className="text-xl font-bold">סינון</h2>
            {(q || difficulty) && (
              <Link href="/search" className="text-sm text-blue-600 hover:underline">
                נקה הכל
              </Link>
            )}
          </div>

          <div className="mb-8 text-right">
            <h3 className="font-semibold text-gray-700 mb-4">רמה</h3>
            <div className="space-y-2">
              {levels.map((level) => (
                <Link
                  key={level}
                  href={`/search?difficulty=${level}`}
                  className={`flex justify-between items-center px-3 py-2 rounded-md border transition ${
                    difficulty === level
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400"
                  }`}
                >
                  <span className="text-xs opacity-60">[{getCount(level)}]</span>
                  <span>{level}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 text-right">
          <h1 className="text-3xl font-extrabold mb-4">
            {noResultsFound 
              ? "אולי יעניין אותך:" 
              : difficulty
              ? `רמת קושי: ${difficulty}`
              : q
              ? `תוצאות עבור "${q}"`
              : "כל התווים במאגר"}
          </h1>

          {noResultsFound && (
            <div className="mb-8 p-4 bg-orange-50 border-r-4 border-orange-400">
              <p className="text-orange-700 font-bold">לא נמצאו שירים.</p>
              <p className="text-orange-600">
                נסה לבחור רמה אחרת או לחפש משהו אחר
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" dir="ltr">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}