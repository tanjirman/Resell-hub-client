"use client";

import { addProducts, updateProducts } from "@/app/lib/api/add-product/action";
import { myProducts } from "@/app/lib/api/add-product/data";
import { useSession } from "@/app/lib/auth-client";
import { uploadImage } from "@/utils/uploadImage";
import { TextArea } from "@heroui/react";
import { Button, Card, CardHeader, Form, Input } from "@heroui/react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaBoxOpen} from "react-icons/fa";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Books",
  "Sports",
  "Furniture",
  "Vehicles",
  "Others",
];

const conditions = ["Used", "Like New", "Refurbished"];

const fieldClass =
  "w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

const inputStyles = {
  base: "w-full",
  mainWrapper: "w-full",
  inputWrapper:
    "bg-zinc-900 border border-zinc-700 hover:border-indigo-500 focus-within:!border-indigo-500 rounded-xl h-12",
  input: "text-white placeholder:text-zinc-500",
};

const labelStyle = "block mb-2 text-sm font-medium text-slate-300";

const errorStyle = "mt-1 text-sm text-red-400";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //   console.log(errors);
   const { data: session } = useSession();
   



 const onSubmit = async (data) => {
  try {

    const imageUrl = await uploadImage(data.image[0]);

    const productData = {
      title: data.title,
      image: imageUrl,
      description: data.description,
      category: data.category,
      condition: data.condition,
      price: Number(data.price),
      quantity: Number(data.quantity),

      sellerId: session.user.id,
      sellerName: session.user.name,
      sellerEmail: session.user.email,

      createdAt: new Date(),
      status: "pending",
    };

    const result = await addProducts(productData);

    if (result.insertedId) {
      toast.success("Product Added Successfully");
      reset();
    }

  } catch (error) {
    toast.error("Something went wrong");
  }
};
  return (
    <div className="mt-6 max-w-5xl">
      <Card
        className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
        radius="lg"
      >
        <CardHeader className="flex flex-col gap-1 border-b border-white/5 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-500/20 p-3">
              <FaBoxOpen className="text-indigo-400 text-xl" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Add New Product</h3>

              <p className="text-slate-400 text-xs">
                Fill in the product information to create a new listing.
              </p>
            </div>
          </div>
        </CardHeader>

        <div className="p-6">
          <Form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Product Title */}

            <div className="w-full space-y-2">
              <label className={labelStyle}>
                Product Title <span className="text-red-500">*</span>
              </label>

              <input
             
                type="text"
                id="productTitle"
                placeholder="Used Dell Inspiron 15 Laptop"
                className={fieldClass}
                {...register("title", {
                  required: "Product title is required",
                })}
              />

              {errors.title && (
                <p className={errorStyle}>{errors.title.message}</p>
              )}
            </div>
            {/* Images */}

            <div className="w-full space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Product Image <span className="text-red-500">*</span>
              </label>

              <input

                type="file"
                id="productImage"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                })}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:border-indigo-500"
              />

              {errors.image && (
                <p className="text-sm text-red-400">{errors.image.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-300">
                Description <span className="text-red-500">*</span>
              </label>

              <TextArea
              
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Write product description..."
                className="w-full min-h-40 rounded-xl border border-zinc-700 bg-zinc-900 text-white placeholder:text-zinc-500 focus:border-indigo-500"
              />

              {errors.description && (
                <p className="text-sm text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category + Condition */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelStyle}>
                  Category <span className="text-red-500">*</span>
                </label>

                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {errors.category && (
                  <p className={errorStyle}>{errors.category.message}</p>
                )}
              </div>

              <div>
                <label className={labelStyle}>
                  Condition <span className="text-red-500">*</span>
                </label>

                <select
                  {...register("condition", {
                    required: "Condition is required",
                  })}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                >
                  <option value="">Select Condition</option>

                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>

                {errors.condition && (
                  <p className={errorStyle}>{errors.condition.message}</p>
                )}
              </div>
            </div>

            {/* Price + Stock */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className={labelStyle}>
                  Price ($) <span className="text-red-500">*</span>
                </label>

                <input
                
                  type="number"
                  placeholder="35000"
                  className={fieldClass}
                  {...register("price", {
                    required: "Price is required",
                  })}
                />

                {errors.price && (
                  <p className={errorStyle}>{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className={labelStyle}>
                  Stock Quantity <span className="text-red-500">*</span>
                </label>

                <input
                
                  type="number"
                  placeholder="10"
                  className={fieldClass}
                  {...register("quantity", {
                    required: "Stock quantity is required",
                  })}
                />

                {errors.quantity && (
                  <p className={errorStyle}>{errors.quantity.message}</p>
                )}
              </div>
            </div>

            {/* Buttons */}

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 h-12 rounded-xl shadow-lg transition-all hover:scale-[1.02]"
              >
                Create Product
              </Button>

              <Button
                type="reset"
                variant="bordered"
                className="border-white/10 text-slate-300 hover:border-indigo-500 hover:text-white rounded-xl h-12"
              >
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default AddProduct;
