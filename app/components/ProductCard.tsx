import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductCardProps {
  images: string[];
  name: string;
  price: number;
  smallDescription: string;
  id: string;
}

export function ProductCard({
  images,
  name,
  price,
  smallDescription,
  id,
}: ProductCardProps) {
  return (
    <div className="rounded-lg">
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[230px]">
                <Image
                  src={item}
                  alt="image"
                  fill
                  className="object-cover h-full w-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16"/>
        <CarouselNext className="mr-16"/>        
      </Carousel>
      <div className="flex justify-between items-center mt-2">
        <h1 className="text-2xl font-semibold text-sky-800">{name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-lg font-semibold text-primary ring-1 ring-inset ring-primary/10">
          €{price}
        </h3>
      </div>
      <p className="text-slate-600 line-clamp-1 mt-2">{smallDescription}</p>
      <Button asChild className="w-full mt-5 border-2 border-violet-400 bg-white text-violet-600 text-md font-semibold hover:bg-sky-700 hover:text-white">
        <Link href={`/product/${id}`}>
          Learn More...
        </Link>
      </Button>
    </div>
  );
}


export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[230px]"/>
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="h-10 w-full mt-5" />
    </div>
  )
}
