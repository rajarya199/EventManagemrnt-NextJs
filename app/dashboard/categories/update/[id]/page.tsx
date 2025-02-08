import CategoryUpdateForm from '@/src/components/category/CategoryUpdateForm';
import React from 'react';

// Define the type for categoryProp
interface CategoryProp {
  params: {
    id: string;
  };
}

// Use the interface as a type for props in UpdateCategory component
const UpdateCategory: React.FC<CategoryProp> = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <CategoryUpdateForm categoryId={id} />
    </div>
  );
};

export default UpdateCategory;
