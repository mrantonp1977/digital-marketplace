import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { ProductCard } from "../components/ProductCard";


async function getData(userId: string) {
  const data = await prisma.product.findMany({
    where: {
      userId: userId
    },
    select: {
      name: true,
      images: true,
      price: true,
      smallDescription: true,
      id: true,
    }, 
  });
  return data;
}


export default async function MyProductsRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const data = await getData(user.id);
    
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="text-3xl font-extrabold text-violet-900 mt-4">
        My Products
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-12">
        {data.map((item) => (
          <ProductCard 
            key={item.id}
            name={item.name}
            price={item.price}
            images={item.images}
            smallDescription={item.smallDescription}
            id={item.id} 
          />
        ))}
      </div>
    </section>
  )
}