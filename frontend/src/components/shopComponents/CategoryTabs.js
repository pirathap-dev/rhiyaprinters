const categories = ["T-Shirts", "Hoodies", "Accessories"];

export default function CategoryTabs({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center my-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`font-slab font-bold text-[16px] sm:text-[18px] md:text-[25px] lg:text-[30px] px-2 ${
            selected === cat
              ? "border-b-2 border-mainBlue text-mainBlue"
              : "text-subBlue"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
