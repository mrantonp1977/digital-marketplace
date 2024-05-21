import { Skeleton } from "@/components/ui/skeleton"


export default function LoadingFile() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-10 sm:px-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-10">
        <div className="col-span-1">
          <Skeleton className="w-full h-[250px] lg:h-[400px] rounded-lg" />
          <Skeleton className="w-full h-[500px] rounded-lg mt-10" />
        </div>
        <div className="col-span-1">
          <Skeleton className="w-full h-[400px] mt-2" />
        </div>
      </div>
    </section>
  )
} 