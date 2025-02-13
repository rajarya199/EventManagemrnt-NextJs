import CategoryUpdateForm from '@/src/components/category/CategoryUpdateForm';
import React from 'react';

interface CategoryProp {
  params: Promise<{ id: string }>;
}

const UpdateCategory = async ({ params }: CategoryProp) => {
  const { id } = await params; 

  return (
    <div>
      <CategoryUpdateForm categoryId={id} />
    </div>
  );
};

export default UpdateCategory;
