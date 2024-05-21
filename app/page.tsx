import { NewestProducts } from "./components/NewestProducts";

export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-5xl font-extrabold text-center">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-500">
          Find the best Components  
        </h1>
        <h1 className="text-primary">for Developers</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          Discover a curated collection of high-quality Tailwind CSS components
          and icons to enhance your web projects. Browse through responsive UI
          elements, beautifully designed to integrate seamlessly with your
          workflow. Save development time with ready-to-use components that are
          fully customizable.
        </p>
      </div>
      <NewestProducts />
    </section>
  );
}
