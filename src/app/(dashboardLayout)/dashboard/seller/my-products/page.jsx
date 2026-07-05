"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaTrash } from "react-icons/fa";

import { useSession } from "@/app/lib/auth-client";
import { myProducts } from "@/app/lib/api/add-product/data";


import EditProductModal from "@/components/sellerDashboard/EditModal";
import Image from "next/image";

const MyProducts = () => {
  const { data: session } = useSession();

  const [products, setProducts] = useState([]);

  // Load Products
  const loadProducts = async () => {
  if (!session?.user?.email) return;

  const data = await myProducts(session.user.email);
  setProducts(data);
};

useEffect(() => {
  const setProductsData = async () => {
    if (!session?.user?.email) return;

    try {
      const data = await myProducts(session.user.email);
      setProducts(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  setProductsData();
}, [session]);

  // Delete Product

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this product?"
//     );

//     if (!confirmDelete) return;

//     try {
//       const result = await deleteProduct(id);

//       if (result.deletedCount > 0) {
//         toast.success("Product Deleted");

//         loadProducts();
//       }
//     } catch (error) {
//       toast.error("Delete Failed");
//     }
//   };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-white">
            My Products
          </h2>

          <p className="text-slate-400 mt-1">
            Total Products : {products.length}
          </p>

        </div>

      </div>

      <div className="overflow-x-auto rounded-xl">

        <table className="w-full">

          <thead className="border-b border-white/10">

            <tr className="text-left text-slate-400">

              <th className="pb-4">Product</th>

              <th className="pb-4">Category</th>

              <th className="pb-4">Price</th>

              <th className="pb-4">Stock</th>

              <th className="pb-4">Status</th>

              <th className="pb-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-slate-400"
                >
                  No Products Found
                </td>

              </tr>

            ) : (

              products.map((product) => (

                              <tr
                  key={product._id}
                  className="border-b border-white/5 hover:bg-slate-800/40 transition"
                >
                  {/* Product */}

                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 rounded-xl object-cover border border-white/10"
                      />

                      <div>
                        <h3 className="font-semibold text-white">
                          {product.title}
                        </h3>

                        <p className="text-xs text-slate-400 mt-1">
                          {product.condition}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}

                  <td className="text-slate-300">
                    {product.category}
                  </td>

                  {/* Price */}

                  <td className="font-semibold text-green-400">
                    ৳ {product.price}
                  </td>

                  {/* Quantity */}

                  <td className="text-slate-300">
                    {product.quantity}
                  </td>

                  {/* Status */}

                  <td>
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                      {product.status}
                    </span>
                  </td>

                  {/* Actions */}

                  <td>
                    <div className="flex items-center justify-center gap-3">

                      {/* View */}

                      <Link
                        href={`/dashboard/seller/my-products/${product._id}`}
                        className="rounded-lg bg-slate-800 p-2 transition hover:bg-cyan-600"
                      >
                        <FaEye className="text-white" />
                      </Link>

                      {/* Edit */}

                      <EditProductModal
                        product={product}
                        refetch={loadProducts}
                      />

                      {/* Delete */}

                      <button
                        // onClick={() => handleDelete(product._id)}
                        className="rounded-lg bg-slate-800 p-2 transition hover:bg-red-600"
                      >
                        <FaTrash className="text-white" />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default MyProducts;