import Link from 'next/link';
import prisma from '../lib/db';
import { ProductCard } from './ProductCard';

async function getData() {
  const data = await prisma.product.findMany({
    select: {
      price: true,
      smallDescription: true,
      category: true,
      name: true,
      id: true,
      images: true,
    },
    take: 4,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return data;
}

export async function NewestProducts() {
  const data = await getData();
  return (
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter text-white mb-10 rounded-lg py-3 px-4 bg-purple-700">
          Newest Products
        </h2>
        <Link
          href="#"
          className="text-lg hidden font-bold hover:text-white hover:bg-purple-500 md:block text-white mb-10 rounded-lg py-3 px-4 bg-purple-700"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {data.map((product) => (
          <ProductCard 
            key={product.id} 
            images={product.images}
            name={product.name}
            price={product.price}
            smallDescription={product.smallDescription}
            id={product.id} 
          />
        ))}
      </div>
    </section>
  );
}
