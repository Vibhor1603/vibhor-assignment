import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Header() {
  return (
    <div className="border-2 border-blue-300 shadow-2xl h-60 flex border-t-0 rounded-b-4xl justify-center items-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
          Welcome to <span className="text-primary">LuxeShop</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          Discover premium products with elegant design and exceptional quality
        </p>
      </div>
    </div>
  );
}

export default Header;
