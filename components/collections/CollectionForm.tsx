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
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500),
  image: z.string(),
});

const CollectionForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  // defining the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await fetch("/api/collections", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setLoading(false);
        toast.success("Collection created successfully!");
        router.push("/collections");
      }
    } catch (err) {
      console.log("[collections_POST", err);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <div className="p-10 pb-2">
        <p className="text-3xl font-bold text-gray-500">Create Collection</p>
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
                    <Input placeholder="Title" {...field} />
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ------------------------------------------- */}

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default CollectionForm;
