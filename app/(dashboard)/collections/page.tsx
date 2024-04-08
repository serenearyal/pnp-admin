"use client";
import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Collections = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/collections", {
        method: "GET",
      });

      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  console.log(collections);

  return (
    <div className="py-5">
      {/* ------------------------------------------- */}
      <div className="px-10 py-5">
        <div className="flex items-center justify-between text-gray-500">
          <p className="text-3xl font-bold">Collections</p>
          <Button
            className="bg-blue-500 text-white"
            onClick={() => router.push("collections/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Collection
          </Button>
        </div>

        <Separator className="my-4" />
        <DataTable columns={columns} data={collections} searchKey="title" />
      </div>
    </div>
  );
};

export default Collections;
