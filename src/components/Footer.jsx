import { Store, Heart } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="flex justify-between gap-8 mb-6 ">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Luxe<span className="text-primary">Shop</span>
              </h3>
            </div>
            <p className="text-text-secondary text-center md:text-left">
              Your premium destination for quality products and exceptional
              service.
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-text-primary mb-4">Contact</h4>
            <div className="space-y-2 text-text-secondary">
              <p>📧 support@luxeshop.com</p>
              <p>📞 +91 98xxxxxxx</p>
              <p>📍 Noida</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © 2025 LuxeShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
