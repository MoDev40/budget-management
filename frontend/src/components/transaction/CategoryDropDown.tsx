import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/AuthUser"
import { useGetCategoryQuery } from "../../../strore/features/categorySlice"
import { IoReload } from "react-icons/io5"
import { useTranData } from "@/hooks/TransContext"
import { cn } from "@/lib/utils"

export default function CategoryDropDown({defaultVal}:{defaultVal:string}) {
    const {user} = useAuth()
    const {data:trans,setData} = useTranData()
    const {data,isLoading} = useGetCategoryQuery({id:user?.uid as string})
    const [categoryId, setCategoryId] = React.useState(defaultVal)
    React.useEffect(()=>{
      setData({...trans,payetAt:trans?.payetAt as Date,categoryId:categoryId})
    },[categoryId])
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
          )}
        >
          {trans?.categoryId ? trans.categoryId : <span>Pick a category</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Category Panel</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={categoryId} onValueChange={setCategoryId}>
            { isLoading || !data? <IoReload  size={20} className="animate-spin text-center"/> 
                : 
                data.categories.map((category) => (
                    <DropdownMenuRadioItem value={category.id}>{category.name}</DropdownMenuRadioItem>
                ))
            }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
