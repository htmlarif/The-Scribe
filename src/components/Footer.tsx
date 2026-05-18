export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-zinc-400">
        <div className="col-span-1 md:col-span-1">
          <span className="text-2xl font-serif font-bold text-white mb-4 block">The Scribe</span>
          <p className="text-sm">Premium journalism, delivered with precision.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Sections</h4>
          <ul className="space-y-2 text-sm">
            <li>Politics</li>
            <li>Technology</li>
            <li>Business</li>
            <li>Sports</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-xs">
        &copy; 2026 The Scribe. All rights reserved.
      </div>
    </footer>
  );
}
