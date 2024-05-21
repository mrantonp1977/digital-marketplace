"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";
import prisma from "./lib/db";
import { type CategoryTypes } from "@prisma/client";

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  }
  message?: string | null;
};





const productSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long"}),
  category: z.string().min(3, { message: "Category must be at least 3 characters long and required"}),
  price: z.number().min(1, { message: "Price must be a positive number"}),
  smallDescription: z.string().min(10, { message: "Small description must be at least 10 characters long"}),
  description: z.string().min(10, { message: "Description must be at least 10 characters long"}),
  images: z.array(z.string(), { message: "At least one image is required"}),
  // productFile: z.string().min(1, { message: "Product file is required"}),
});

const userSettingsSchema = z.object({
  firstName: z.string().min(3, { message: "First name must be at least 3 characters long and required"}).or(z.literal("")).optional(), 
  lastName: z.string().min(3, { message: "Last name must be at least 3 characters long and required"}).or(z.literal("")).optional(),
  

});

export async function SellProduct(prevState: any, formData: FormData) {
  const {getUser} = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    smallDescription: formData.get("smallDescription"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    // productFile: formData.get("productFile"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
    return state;
  }

  await prisma.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CategoryTypes,
      price: validateFields.data.price,
      smallDescription: validateFields.data.smallDescription,
      description: JSON.parse(validateFields.data.description),
      images: validateFields.data.images,
      userId: user.id,
      // productFile: validateFields.data.productFile,
    }
  });

  const state: State = {
    status: "success",
    message: "Product created successfully!",
  }

  return state;
};


export async function UpdateUserSettings(prevState: any, formData: FormData) {
  const {getUser} = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const validateFields = userSettingsSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
    return state;
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validateFields.data.firstName,
      lastName: validateFields.data.lastName,
    }
  });

  const state: State = {
    status: "success",
    message: "Settings updated successfully!",
  }

  return state;
}