interface CategoryListProps {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

const CategoryList = ({
  categories,
  onCategoryClick,
  activeCategory,
}: CategoryListProps) => {
  return (
    <div className="flex flex-col gap-4 p-6 ">
      <div className="flex justify-center flex-wrap gap-4">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => onCategoryClick(category)}
            className={`px-4 py-2 text-sm font-medium border rounded-lg shadow-sm cursor-pointer transition ${
              activeCategory === category
                ? "bg-turquoise text-white"
                : "bg-white text-gray-700 hover:bg-turquoise hover:text-white"
            }`}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
