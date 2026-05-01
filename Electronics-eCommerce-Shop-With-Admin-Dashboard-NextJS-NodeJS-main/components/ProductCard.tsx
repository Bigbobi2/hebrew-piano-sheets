import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  // Logic to ensure the image path is always safe
  const imagePath = product.mainImage?.startsWith('/') ? product.mainImage : `/${product.mainImage}`;

  return (
    <Link href={`/product/${product.slug}`} className="group block w-[200px]">
      <div className="relative border border-gray-200 rounded-sm overflow-hidden bg-white aspect-[3/4] shadow-sm group-hover:shadow-md transition-shadow">
        <Image
          src={imagePath}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* TOP RIGHT: Difficulty Badge ( רמה ) */}
        <div className="absolute top-2 right-2">
          {product.difficulty && (
            <div className={`text-[10px] px-2 py-0.5 rounded-sm font-bold text-white shadow-sm ${
              product.difficulty === 'קשה' ? 'bg-red-500' : 
              product.difficulty === 'מתקדם' ? 'bg-orange-500' : 'bg-green-500'
            }`}>
              {product.difficulty}
            </div>
          )}
        </div>

        {/* BOTTOM LEFT: Scoring Badge */}
        <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold">
          {product.scoring || "SOLO"}
        </div>
      </div>
      
      <div className="mt-3">
        <h3 className="font-bold text-sm text-gray-900 truncate group-hover:text-blue-600">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{product.instruments}</p>
        <div className="flex items-center mt-2">
           <span className="text-blue-600 font-bold text-sm">₪{product.price}</span>
        </div>
      </div>
    </Link>
  );
}