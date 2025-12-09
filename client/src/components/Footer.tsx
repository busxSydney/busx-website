import { Link } from "wouter";
import xlogo from "@/assets/xlogo-foot.svg";

export function Footer() {
  return (
    <footer className="bg-[#FFF3EE] text-gray-800 pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <img src={xlogo} alt="BusX Logo" className="w-12 h-12" />
            </Link>
            <p className="text-gray-600 mb-6">
              Experience luxury travel with our premium bus services. Comfort, safety, and exceptional service on every journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-[#FF8B00] transition duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#FF8B00] transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#FF8B00] transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#FF8B00] transition duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#home" className="text-gray-700 hover:text-[#FF8B00] transition duration-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-700 hover:text-[#FF8B00] transition duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-700 hover:text-[#FF8B00] transition duration-300">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="text-gray-700 hover:text-[#FF8B00] transition duration-300">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-700 hover:text-[#FF8B00] transition duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#services" className="text-gray-700 hover:text-[#FF8B00] transition duration-300">
                    Airport Transfers
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-700 hover:text-[#FF8B00] transition duration-300">
                    Special Occasions
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-700 hover:text-[#FF8B00] transition duration-300">
                    Tours & Trips
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-700 hover:text-[#FF8B00] transition duration-300">
                    Cruise Pickups
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-700 hover:text-[#FF8B00] transition duration-300">
                    Corporate Travel
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="far fa-phone-alt text-[#FF8B00] mt-1 mr-3" style={{ strokeWidth: '1.5px' }}></i>
                  <span className="text-gray-700">0424242444</span>
                </li>
                <li className="flex items-start">
                  <i className="far fa-envelope text-[#FF8B00] mt-1 mr-3" style={{ strokeWidth: '1.5px' }}></i>
                  <span className="text-gray-700">info@busx.com.au</span>
                </li>
                <li className="flex items-start">
                  <i className="far fa-clock text-[#FF8B00] mt-1 mr-3" style={{ strokeWidth: '1.5px' }}></i>
                  <div>
                    <span className="block text-gray-700">Mon-Fri: 8AM-8PM</span>
                    <span className="block text-gray-700">Sat: 9AM-6PM</span>
                    <span className="block text-gray-700">Sun: 10AM-4PM</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} BusX. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
