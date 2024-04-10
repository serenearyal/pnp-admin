"use client";

import { Separator } from "../ui/separator";
import toast from "react-hot-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Delete from "../custom ui/Delete";
import MultiText from "../custom ui/MultiText";
import MultiSelect from "../custom ui/MultiSelect";
import { METHODS } from "http";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const getCollections = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/collections", {
        method: "GET",
      });

      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getCollections();
  }, []);
  // defining the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0,
          expense: 0,
        },
  });

  // DISABLE AUTO SUBMIT WHILE PRESSING ENTER KEY
  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      setLoading(true);
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setLoading(false);
        toast.success(`Product ${initialData ? "updated!" : "created"}`);
        window.location.href = "/products";
        router.push("/products");
      } else {
        toast.error("Please fill the required fields");
      }
    } catch (err) {
      console.log("[productss_POST", err);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <div className="p-10 pb-2">
        {initialData ? (
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-gray-500">Edit Product</p>
            <Delete id={initialData._id} />
          </div>
        ) : (
          <p className="text-3xl font-bold text-gray-500">Create Product</p>
        )}

        <Separator className="mt-1 mb-2" />
      </div>
      <div className="pl-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* ------------------------------------------- */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ------------------------------------------- */}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description..."
                      {...field}
                      rows={5}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ------------------------------------------- */}

            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter((image) => image !== url),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ------------------------------------------- */}

            <div className="md:grid md:grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ------------------------------------------- */}
              <FormField
                control={form.control}
                name="expense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Expense"
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ------------------------------------------- */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Category"
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ------------------------------------------- */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Tags"
                        value={field.value}
                        onChange={(tag) =>
                          field.onChange([...field.value, tag])
                        }
                        onRemove={(tagToRemove) =>
                          field.onChange([
                            ...field.value.filter((tag) => tag !== tagToRemove),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ------------------------------------------- */}
              <FormField
                control={form.control}
                name="collections"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collections</FormLabel>
                    <FormControl>
                      <MultiSelect
                        placeholder="Collections"
                        collections={collections}
                        value={field.value}
                        onChange={(_id) =>
                          field.onChange([...field.value, _id])
                        }
                        onRemove={(idToRemove) =>
                          field.onChange([
                            ...field.value.filter(
                              (collectionId) => idToRemove !== collectionId
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-5">
              <Button type="submit" className="bg-blue-500 text-white">
                Submit
              </Button>
              <Button
                type="button"
                className="bg-red-500 text-white"
                onClick={() => router.push("/collections")}
              >
                Discard
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
