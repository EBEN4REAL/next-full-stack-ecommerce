"use client"

import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import swal, {SweetAlertOptions} from 'sweetalert2';
import { HttpMethod, fetchData } from "@/Services/api";
import {config} from "@/config"
import { Category, Property } from "../types/Category";
import { useCategories } from "@/hooks/useCategories";

function Categories() {
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);
  const [name, setName] = useState<string>('');
  const [parentCategory, setParentCategory] = useState<string>('');
  const [properties, setProperties] = useState<Property[]>([]);
  const {categories, loading, updateCategory, deleteCategory: removeCategory, createCategory} = useCategories()

  async function saveCategory(ev: React.FormEvent) {
    ev.preventDefault();
    const data = {
      _id: "",
      name,
      parent: parentCategory,
      properties: properties.map(p => ({
        name: p.name,
        values: !Array.isArray(p.values) ? p.values.split(",") : p.values
      })),
    };

    if (editedCategory) {
      data._id = editedCategory._id;
      await updateCategory(data as unknown as Category)
      setEditedCategory(null);
    } else {
      await createCategory(data as unknown as Category)
    }

    setName('');
    setParentCategory('');
    setProperties([]);
  }

  function editCategory(category: Category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id || '');
    const newProperties = category.properties.map(({ name, values }) => ({
      name,
      values: values,
    }))
    setProperties(newProperties)
  }

  function deleteCategory(category: Category) {
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${category.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    } as SweetAlertOptions).then(async (result: { isConfirmed: boolean; }) => {
      if (result.isConfirmed) {
        const { _id } = category;
        removeCategory(_id)
      }
    });
  }

  function addProperty() {
    setProperties(prev => {
      return [...prev, { name: '', values: '' }];
    });
  }

  function handlePropertyNameChange(index: number, property: Property, newName: string) {
    setProperties(prev => {
      const updatedProperties = [...prev];
      updatedProperties[index].name = newName;
      return updatedProperties;
    });
  }

  function handlePropertyValuesChange(index: number, property: Property, newValues: string) {
    setProperties(prev => {
      const updatedProperties = [...prev];
      updatedProperties[index].values = newValues;
      return updatedProperties;
    });
  }

  function removeProperty(indexToRemove: number) {
    setProperties(prev => {
      return [...prev].filter((_, pIndex) => pIndex !== indexToRemove);
    });
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : 'Create new category'}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={'Category name'}
            onChange={ev => setName(ev.target.value)}
            value={name}
          />
          <select
            onChange={ev => setParentCategory(ev.target.value)}
            value={parentCategory}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={property.name} className="flex gap-1 mb-2">
                <input
                  type="text"
                  value={property.name}
                  className="mb-0"
                  onChange={ev =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  placeholder="property name (example: color)"
                />
                <input
                  type="text"
                  className="mb-0"
                  onChange={ev =>
                    handlePropertyValuesChange(
                      index,
                      property,
                      ev.target.value
                    )
                  }
                  value={property.values}
                  placeholder="values, comma separated"
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-red"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map(category => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-default mr-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-red"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default Categories