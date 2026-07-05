"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, Modal, Surface, TextArea } from "@heroui/react";
import { FaEdit, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { uploadImage } from "@/utils/uploadImage";
import { updateProducts } from "@/app/lib/api/add-product/action";
import Image from "next/image";

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
  "w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500";

export default function EditProductModal({ product, refetch }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        category: product.category,
        condition: product.condition,
        price: product.price,
        quantity: product.quantity,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let image = product.image;

      // Upload new image only if selected
      if (data.image?.length > 0) {
        image = await uploadImage(data.image[0]);

        if (!image) {
          toast.error("Image upload failed");
          return;
        }
      }

      const updateData = {
        title: data.title,
        image,
        description: data.description,
        category: data.category,
        condition: data.condition,
        price: Number(data.price),
        quantity: Number(data.quantity),

        sellerId: product.sellerId,
        sellerName: product.sellerName,
        sellerEmail: product.sellerEmail,

        status: product.status,
        updatedAt: new Date(),
      };

      console.log("Product ID:", product._id);

      const result = await updateProducts(updateData, product._id);

      console.log("Update Result:", result);

      if (result._id) {
        toast.success("Product Updated Successfully");

        // Reload the products list
        if (refetch) {
          await refetch();
        }

        // Close the modal
        setOpen(false);

        // Optional: reset form values
        reset({
          title: result.title,
          description: result.description,
          category: result.category,
          condition: result.condition,
          price: result.price,
          quantity: result.quantity,
        });

        router.refresh();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Button isIconOnly variant="light" onPress={() => setOpen(true)}>
        <FaEdit className="text-blue-500 text-lg" />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-4xl rounded-2xl">
            <Modal.Header>
              <Modal.Heading>Edit Product</Modal.Heading>

              <Modal.CloseTrigger>
                <FaTimes />
              </Modal.CloseTrigger>
            </Modal.Header>

            <Modal.Body>
              <Surface className="p-6 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Product Title */}

                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      Product Title
                    </label>

                    <input
                      {...register("title", {
                        required: "Title is required",
                      })}
                      className={fieldClass}
                    />

                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Product Image */}

                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      Product Image
                    </label>

                    {product.image && (
                      <Image
                        src={product.image}
                        alt={product.title}
                        className="w-28 h-28 rounded-xl object-cover border border-white/10 mb-4"
                      />
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      {...register("image")}
                      className={fieldClass}
                    />

                    <p className="text-xs text-slate-400 mt-2">
                      Leave empty to keep the current image.
                    </p>
                  </div>

                  {/* Description */}

                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-300">
                      Description
                    </label>

                    <TextArea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      className="w-full"
                    />

                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Category & Condition */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-slate-300">
                        Category
                      </label>

                      <select
                        {...register("category", {
                          required: "Category is required",
                        })}
                        className={fieldClass}
                      >
                        <option value="">Select Category</option>

                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>

                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-slate-300">
                        Condition
                      </label>

                      <select
                        {...register("condition", {
                          required: "Condition is required",
                        })}
                        className={fieldClass}
                      >
                        <option value="">Select Condition</option>

                        {conditions.map((condition) => (
                          <option key={condition} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </select>

                      {errors.condition && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.condition.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Price & Quantity */}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-slate-300">
                        Price (৳)
                      </label>

                      <input
                        type="number"
                        {...register("price", {
                          required: "Price is required",
                          min: 1,
                        })}
                        className={fieldClass}
                      />

                      {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-slate-300">
                        Stock Quantity
                      </label>

                      <input
                        type="number"
                        {...register("quantity", {
                          required: "Quantity is required",
                          min: 1,
                        })}
                        className={fieldClass}
                      />

                      {errors.quantity && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.quantity.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer Buttons */}

                  <div className="flex justify-end gap-4 pt-4">
                    <Button
                      type="button"
                      variant="bordered"
                      onPress={() => setOpen(false)}
                    >
                      Cancel
                    </Button>

                    <Button type="submit" color="primary" isDisabled={loading}>
                      {loading ? "Updating..." : "Update Product"}
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
