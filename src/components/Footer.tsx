

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-8 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-2">STS</h2>
          <p className="text-sm">Smart Tech Solutions</p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">📞 +961 78 904 118</p>
                  <p className="text-sm">📍 <a href="https://maps.app.goo.gl/7a2EbZjLYdDdkJwD6" target="_blank" rel="noopener noreferrer" className="underline">Find us on Google Maps</a>
                  </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="https://www.instagram.com/sts" target="_blank" rel="noopener noreferrer" className="hover:underline">📸 Instagram</a></li>
            <li><a href="https://www.facebook.com/sts" target="_blank" rel="noopener noreferrer" className="hover:underline">📘 Facebook</a></li>
            {/* Add more if needed */}
          </ul>
        </div>

        {/* WhatsApp Chat */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <a
            href="https://wa.me/96178904118"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md"
          >
            💬 Chat on WhatsApp
          </a>
        </div>

      </div>

      <div className="text-center mt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} STS. All rights reserved.
      </div>
    </footer>
  );
}
