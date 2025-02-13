import CategoryUpdateForm from '@/src/components/category/CategoryUpdateForm';
import React from 'react';

interface CategoryProp {
  params: {
    id: string;
  };
}
const UpdateCategory: React.FC<CategoryProp> = ({ params }) => {
  

  return (
    <div>
      <CategoryUpdateForm categoryId={params.id} />
    </div>
  );
};

export default UpdateCategory;

