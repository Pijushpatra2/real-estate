// components/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Evernal Group</h3>
            <p className="text-gray-400">Premium property solutions for commercial and residential needs.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-green-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="/projects" className="text-gray-400 hover:text-green-400 transition-colors">Projects</a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-green-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-green-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Properties Evernal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/projects?type=commercial" className="text-gray-400 hover:text-green-400 transition-colors">Commercial</a>
              </li>
              <li>
                <a href="/projects?type=residential" className="text-gray-400 hover:text-green-400 transition-colors">Residential</a>
              </li>
              <li>
                <a href="/locations" className="text-gray-400 hover:text-green-400 transition-colors">Locations</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <address className="text-gray-400 not-italic">
              PS ABACUS, NEW TOWN<br />
              Kolkata- 700157<br />
              info@evernalgroup.com<br />
              +91 8697891111
            </address>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Evernal Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
