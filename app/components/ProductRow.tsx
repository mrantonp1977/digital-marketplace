import Link from 'next/link';
import { LoadingProductCard, ProductCard } from './ProductCard';
import prisma from '../lib/db';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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
        link: '/products/icon',
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
        link: '/products/all',
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
        link: '/products/template',
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
        link: '/products/uikit',
      };
    }
    default: {
      return notFound();
    }
  }
}

export function ProductRow({ category }: ProductProps) {
  return (
    <section className="mt-12">
      <Suspense fallback={<LoadingState />}>
        <LoadRows category={category} />
      </Suspense>
    </section>
  );
}

async function LoadRows({ category }: ProductProps) {
  const data = await getData({ category: category });
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-lg font-extrabold text-white mb-10 rounded-lg py-2 px-3 bg-slate-700">
          {data.title}
        </h2>
        <Link
          href={data.link}
          className="text-lg hidden font-bold hover:text-white hover:bg-slate-600 md:block text-white mb-10 rounded-lg py-2 px-3 bg-slate-700"
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
    </>
  );
}

function LoadingState() {
  return (
    <div>
      <Skeleton className="h-8 w-56"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  )
}