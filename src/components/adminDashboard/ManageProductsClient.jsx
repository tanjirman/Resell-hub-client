"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { Button, Chip, Input } from "@heroui/react";
import {
  FaSearch,
  FaCheck,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import {
  getAllProducts,
  approveProduct,
  rejectProduct,
  deleteProduct,
} from "@/app/lib/api/admin/data";

export default function ManageProductsClient() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);

    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
  let ignore = false;

  async function fetchProducts() {
    try {
      const data = await getAllProducts();

      if (!ignore) {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  }

  fetchProducts();

  return () => {
    ignore = true;
  };
}, []);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        product.category
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        product.sellerName
          ?.toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [products, search]);

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve Product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });

    if (!result.isConfirmed) return;

    const res = await approveProduct(id);

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Product Approved",
        timer: 1500,
        showConfirmButton: false,
      });

      loadProducts();
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (!result.isConfirmed) return;

    const res = await rejectProduct(id);

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Product Rejected",
        timer: 1500,
        showConfirmButton: false,
      });

      loadProducts();
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await deleteProduct(id);

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      loadProducts();
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        Loading products...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <Input
        placeholder="Search by product, category or seller..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111827]">

        <table className="w-full">

          <thead className="bg-violet-900 text-white">

            <tr>

              <th className="p-4 text-left">#</th>

              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Product</th>

              <th className="p-4 text-left">Seller</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Qty</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-14 text-center text-gray-400"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <td className="p-4 text-gray-300">
                    {index + 1}
                  </td>

                  <td className="p-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                  </td>

                  <td className="p-4">

                    <h3 className="font-semibold text-white">
                      {product.title}
                    </h3>

                  </td>

                  <td className="p-4 text-gray-300">
                    {product.sellerName}
                  </td>

                  <td className="p-4 text-gray-300">
                    {product.category}
                  </td>

                  <td className="p-4 text-green-400 font-semibold">
                    ${product.price}
                  </td>

                  <td className="p-4 text-white">
                    {product.quantity}
                  </td>

                  <td className="p-4">

                    <Chip
                      color={
                        product.status === "approved"
                          ? "success"
                          : product.status === "rejected"
                          ? "danger"
                          : "warning"
                      }
                      variant="flat"
                    >
                      {product.status}
                    </Chip>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      {product.status !== "approved" && (
                        <Button
                          isIconOnly
                          color="success"
                          onPress={() =>
                            handleApprove(product._id)
                          }
                        >
                          <FaCheck />
                        </Button>
                      )}

                      {product.status !== "rejected" && (
                        <Button
                          isIconOnly
                          color="warning"
                          onPress={() =>
                            handleReject(product._id)
                          }
                        >
                          <FaTimes />
                        </Button>
                      )}

                      <Button
                        isIconOnly
                        color="danger"
                        onPress={() =>
                          handleDelete(product._id)
                        }
                      >
                        <FaTrash />
                      </Button>

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
}