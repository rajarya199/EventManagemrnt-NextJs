"use client"
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { EventCategoryType } from '@/types'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Input } from '../ui/input';
import { getAllCategory, saveCategory } from '@/app/actions/category.action';

type DropdownProps = {
  value?: string;
  onChangeHandler?: (value: string) => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAddCategory = async () => {
    const categoryData = {
      name: newName.trim(),
      categoryDescription: newDesc,
    };

    try {
      const category = await saveCategory(categoryData);
      if (category) {
        
        setCategories((prevState) => [...prevState, category]);
      }
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  useEffect(()=>{
    const fetchCategory=async()=>{
        const categoryList=await getAllCategory()
        console.log(categoryList)
        if (categoryList && categoryList.data) {
            setCategories(categoryList.data);
          } else {
            console.error('No categories found');
          }
       
    }
    fetchCategory()
  },[])

  return (
    <>
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
        {categories.length > 0 && categories.map((category) => (
          <SelectItem key={category.id} value={category.id} className="select-item p-regular-14">
            {category.name}
          </SelectItem>
        ))}
          <AlertDialog>
            <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new category
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="text"
                    placeholder="Category name"
                    className="mt-3"
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Category Description"
                    className="mt-3"
                    onChange={(e) => setNewDesc(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAddCategory}>
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SelectContent>
      </Select>
    </>
  );
};

export default Dropdown;
