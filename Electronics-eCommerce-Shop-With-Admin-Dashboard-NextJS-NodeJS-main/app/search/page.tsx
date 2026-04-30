import ProductCard from "@/components/ProductCard";
import prisma from "@/utils/db";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Grab the search word from the URL (e.g., if they typed "Somewhere")
  const { q } = await searchParams;

  // Fetch products from the database
  const products = await prisma.product.findMany({
    where: q
      ? {
          title: {
            contains: q,
          },
        }
      : undefined,
  });

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold mb-8">
          {q ? `Search results for "${q}"` : "All Sheet Music"}
        </h1>

        {/* If no products are found */}
        {products.length === 0 ? (
          <p className="text-gray-500 text-lg">No sheet music found. Try another search!</p>
        ) : (
          /* The Grid of Product Cards */
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}