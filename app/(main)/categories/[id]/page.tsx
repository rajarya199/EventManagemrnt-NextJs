import React from 'react'
interface catProps{
    params: Promise<{ id: string }>;

}
import CategoryPage from '@/src/components/category/CategoryPage';
const page = async({params}:catProps) => {
    const { id } = await params;
  return (
    <div>
      <CategoryPage categoryId={id}/>
    </div>
  )
}

export default page