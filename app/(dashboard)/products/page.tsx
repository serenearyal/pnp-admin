"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/products/ProductsColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {} from "next/router";
import { useEffect, useState } from "react";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const router = useRouter();

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "GET",
      });

      const data = await res.json();
      setProducts(data);
      setLoading(false);
      console.log(data);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between text-gray-500">
        <p className="text-3xl font-bold">Products</p>
        <Button
          className="bg-blue-500 text-white"
          onClick={() => router.push("products/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>

      <Separator className="my-4" />
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export default Products;
