import ProductCard from "./ProductCard";

export default function ProductSection({ title, products }) {
  if (!products.length) return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] md:min-h-[300px] lg:min-h-[400px] bg-subGrey">
      <h1 className="font-ruffina font-semibold text-[18px] sm:text-[20px] md:text-[30px] lg:text-[50px] text-mainBlue text-center">Sorry! No Products Available.</h1>
    </div>
  );

  return (
    <div className="w-full px-4 lg:px-[80px] py-[20px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
        {products.map((prod) => (
          <div key={prod?._id} className="flex flex-col h-full">
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </div>
  );
}
