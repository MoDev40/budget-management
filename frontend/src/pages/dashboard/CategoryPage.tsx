import CategoryTable from "@/components/category/CategoryTable"
import CreateCategory from "@/components/category/CreateCategory"

const CategoryPage = () => {
  return (
    <div className="w-full space-y-2 md:p-5">
        <CreateCategory/>
        <CategoryTable/>
    </div>
  )
}

export default CategoryPage