import PriceSlider from "./PriceSlider";

export default function FilterPanel({ filters, setFilters }) {
    return (
        <div className="w-full flex flex-col md:flex-row justify-center px-6 py-8 border-b items-stretch gap-4">
            {/* Left: Price Slider */}
            <div className="flex-1">
                <PriceSlider
                    min={1}
                    max={100}
                    value={filters.price}
                    onChangeComplete={(val) => setFilters({ ...filters, price: val })}
                />
            </div>

            {/* Vertical Divider */}
            <div className="w-[2px] bg-mainBlue hidden md:block rounded-lg mx-8"></div>

            {/* Right: Subcategory Filters */}
            <div className="flex flex-wrap gap-2 flex-1 mt-2 lg:mt-0">
                {filters.subcategories.map((sub, i) => (
                    <label key={i} className="flex items-center gap-2 font-poppins font-medium mx-2">
                        <input
                            type="checkbox"
                            checked={sub.checked}
                            onChange={() => {
                                const updated = [...filters.subcategories];
                                updated[i].checked = !updated[i].checked;
                                setFilters({ ...filters, subcategories: updated });
                            }}
                            className="w-5 h-5 accent-mainBlue rounded-md transition-all duration-200 hover:scale-110"
                        />
                        {sub.name}
                    </label>
                ))}
            </div>
        </div>
    );
}
