import Link from 'next/link';
import { ProductCard } from './ProductCard';
import prisma from '../lib/db';
import { notFound } from 'next/navigation';


interface ProductProps {
  category: 'newest' | 'templates' | 'uikits' | 'icons';
}

async function getData({ category }: ProductProps) {
  switch (category) {
    case 'icons': {
      const data = await prisma.product.findMany({
        where: {
          category: 'icon',
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        take: 3,
      });

      return {
        data,
        title: 'Icons',
        link: '/products/icon'
      };
    }
    case 'newest': {
      const data = await prisma.product.findMany({
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 3,
      });

      return {
        data,
        title: 'Newest Products',
        link: '/products/all'
      };
    }
    case 'templates': {
      const data = await prisma.product.findMany({
        where: {
          category: 'template',
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        take: 3,
      });

      return {
        data,
        title: 'Templates',
        link: '/products/template'
      };
    }
    case 'uikits': {
      const data = await prisma.product.findMany({
        where: {
          category: 'uikit',
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        take: 3,
      });

      return {
        data,
        title: 'UI Kits',
        link: '/products/uikit'
      };
    }
    default: {
      return notFound();
    }
  }
}

export async function ProductRow({ category }: ProductProps) {
  const data = await getData({ category })
  return (
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-lg font-extrabold tracking-tighter text-white mb-10 rounded-lg py-2 px-3 bg-purple-700">
          {data.title}
        </h2>
        <Link
          href={data.link}
          className="text-lg hidden font-bold hover:text-white hover:bg-purple-500 md:block text-white mb-10 rounded-lg py-2 px-3 bg-purple-700"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {data.data.map((product) => (
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
