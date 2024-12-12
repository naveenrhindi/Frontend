import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash links for smooth scrolling
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
   <div>
      {/* Header */}
      <header className="bg-white text-black py-6 px-8 shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Coal Mining Insights</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-green-400 cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="hover:text-green-400 cursor-pointer"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="hover:text-green-400 cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link
                  to="/login"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="pt-24">
        {/* Hero Section */}
        <section className="bg-cover bg-center bg-fixed h-screen flex items-center justify-center text-center px-6"
          style={{ backgroundImage: "url('/assets/Lbackground.jpg')" }}
        >
          <div className="bg-black bg-opacity-60 p-6 rounded-lg">
            <h2 className="text-4xl text-white font-bold mb-4">Welcome to Coal Mining Insights</h2>
            <p className="text-lg text-gray-300 mb-6">
              Quantify, analyze, and pave the way to a sustainable future with our innovative platform.
            </p>
            <Link
              to="/register"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Get Started
            </Link>
            <Link to="/login" className="text-green-500 hover:underline mt-4"></Link>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">About Us</h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-600 mb-8">
                Coal Mining Insights is dedicated to revolutionizing the mining industry through sustainable practices 
                and innovative technology. Our platform provides comprehensive solutions for tracking, analyzing, 
                and optimizing carbon footprint management in mining operations.
              </p>
              <p className="text-lg text-gray-600">
                We combine cutting-edge technology with environmental consciousness to help mining operations 
                achieve their sustainability goals while maintaining operational efficiency.
              </p>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8">
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-gray-100 shadow-md">
              <img
                src="/assets/sustainable-mining.jpg"
                alt="Sustainable Mining"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-gray-100 shadow-md">
              <img
                src="/assets/carbon-neutrality.jpg"
                alt="Carbon Tracking"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-gray-100 shadow-md">
              <img
                src="/assets/renewable-energy.jpg"
                alt="Renewable Energy"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-gray-100 shadow-md">
              <img
                src="/assets/environment-protection.jpg"
                alt="Emission Reduction"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-gray-100 shadow-md">
              <img
                src="/assets/ai-technology.jpg"
                alt="Technology Support"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex items-center justify-center w-28 h-28 rounded-full bg-gray-100 shadow-md">
              <img
                src="/assets/data-analytics.jpg"
                alt="Analytics"
                className="w-20 h-20 rounded-full"
              />
            </div>
          </div>
        </section>

        {/* Service Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">
              We Provide Comprehensive Solutions for Carbon Footprint Management
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-bold text-green-500 mb-4">Carbon Emissions Quantification</h4>
                <p className="text-gray-600">Accurately measure emissions from various mining activities with advanced data analysis.</p>
              </div>
              {/* Service 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-bold text-green-500 mb-4">Carbon Sink Estimation</h4>
                <p className="text-gray-600">Analyze and estimate carbon absorption levels from existing natural resources.</p>
              </div>
              {/* Service 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-bold text-green-500 mb-4">Gap Analysis & Neutrality Pathways</h4>
                <p className="text-gray-600">Identify the gap between emissions and absorption, suggesting practical pathways to achieve carbon neutrality.</p>
              </div>
              {/* Service 4 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-bold text-green-500 mb-4">Per Capita Emission Analysis</h4>
                <p className="text-gray-600">Break down emissions data to provide insights at an individual or team level for targeted improvements.</p>
              </div>
              {/* Service 5 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-bold text-green-500 mb-4">Data Visualization</h4>
                <p className="text-gray-600">Use interactive charts and graphs to track trends and understand emission patterns effortlessly.</p>
              </div>
              {/* Service 6 */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h4 className="text-xl font-bold text-green-500 mb-4">Scalable & AI-Driven Insights</h4>
                <p className="text-gray-600">Leverage AI to provide actionable recommendations and scalability for mines of all sizes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-100">
          <div className="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Key Features of Our Platform
            </h2>
            <div className="space-y-12">
              {/* Feature 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 p-8 bg-gray-200 shadow-lg rounded-lg mb-8 mx-auto max-w-4xl">
                <div className="lg:w-1/2">
                  <img
                    src="/assets/carbon-emission-tracking.jpg"
                    alt="Carbon Emission Tracking"
                    className="rounded-lg shadow-lg max-h-80 object-cover"
                  />
                </div>
                <div className="lg:w-1/2 text-gray-700 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Carbon Emission Tracking
                  </h3>
                  <p>
                    Monitor emissions with real-time data visualization, breaking down emissions by activity.
                    Use advanced tracking methods for accurate carbon footprint assessments.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 lg:flex-row-reverse p-8 bg-gray-200 shadow-lg rounded-lg mb-8 mx-auto max-w-4xl">
                <div className="lg:w-1/2">
                  <img
                    src="/assets/carbon-sink-estimation.jpg"
                    alt="Carbon Sink Estimation"
                    className="rounded-lg shadow-lg max-h-80 object-cover"
                  />
                </div>
                <div className="lg:w-1/2 text-gray-700 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Carbon Sink Estimation
                  </h3>
                  <p>
                    Assess current carbon sinks like forests and estimate the potential for offsetting emissions.
                    Get a balance analysis of emissions and absorption capabilities.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 p-8 bg-gray-200 shadow-lg rounded-lg mb-8 mx-auto max-w-4xl">
                <div className="lg:w-1/2">
                  <img
                    src="/assets/data-visualization.jpg"
                    alt="Data Visualization"
                    className="rounded-lg shadow-lg max-h-80 object-cover"
                  />
                </div>
                <div className="lg:w-1/2 text-gray-700 space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Interactive Data Visualization
                  </h3>
                  <p>
                    View your data through intuitive charts and graphs. Make informed decisions
                    with clear, actionable insights from your emission data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-100">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Contact Us</h3>
            <p className="text-lg text-gray-600 text-center mb-8">
              Have questions or need assistance? We're here to help!
            </p>
            <form className="max-w-xl mx-auto grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                Submit
              </button>
            </form>

            {/* Contact Info */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Email */}
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Email</h4>
                <p className="text-gray-600">
                  <a href="mailto:support@coalmine.com" className="hover:text-green-500">
                    support@coalmine.com
                  </a>
                </p>
              </div>

              {/* Phone */}
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Phone</h4>
                <p className="text-gray-600">+1 234 567 890</p>
              </div>

              {/* Social Media */}
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h4>
                <div className="flex justify-center space-x-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-gray-600 hover:text-green-500"
                  >
                    <svg className="h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.078v-9.294H9.404v-3.622h2.999V9.29c0-3.013 1.789-4.687 4.603-4.687 1.342 0 2.735.1 3.128.146v3.641h-2.223c-1.742 0-2.232 1.054-2.232 2.137v2.568h4.465l-.708 3.622h-3.757v9.294h7.374c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.206 0 22.675 0z"/>
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-gray-600 hover:text-green-500"
                  >
                    <svg className="h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M23.444 4.834a9.44 9.44 0 0 1-2.688.735A4.731 4.731 0 0 0 22.897 3a9.392 9.392 0 0 1-3.132 1.195A4.721 4.721 0 0 0 16.616 0c-2.513 0-4.56 2.047-4.56 4.56 0 .356.04.702.116 1.034a13.029 13.029 0 0 1-9.471-4.794 4.558 4.558 0 0 0-.616 2.29c0 1.58.805 2.97 2.033 3.786a4.663 4.663 0 0 1-2.07-.572v.06c0 2.205 1.57 4.056 3.647 4.48a4.734 4.734 0 0 1-2.056.078 4.74 4.74 0 0 0 4.419 3.291A9.423 9.423 0 0 1 1 19.77a13.301 13.301 0 0 0 7.2 2.112c8.643 0 13.37-7.168 13.37-13.37 0-.205 0-.408-.015-.61a9.51 9.51 0 0 0 2.071-2.432z"/>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-gray-600 hover:text-green-500"
                  >
                    <svg className="h-6 w-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M22.225 0H1.775C.794 0 0 .794 0 1.775v20.451C0 23.206.794 24 1.775 24h20.451c.981 0 1.775-.794 1.775-1.775V1.775C24 .794 23.206 0 22.225 0zM7.275 20.451H3.7V9.391h3.575v11.06zm-1.788-12.56c-1.017 0-1.85-.84-1.85-1.875s.833-1.875 1.85-1.875 1.85.84 1.85 1.875-.833 1.875-1.85 1.875zm11.338 12.56h-3.575v-5.625c0-1.338-.05-3.06-1.876-3.06-1.874 0-2.163 1.463-2.163 2.96v5.725h-3.575V9.391h3.575v1.548h.048c.5-.946 1.72-1.948 3.517-1.948 3.765 0 4.452 2.475 4.452 5.682v5.478z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">Coal Mining Insights</h3>
                <p className="text-gray-400">Empowering sustainable mining practices</p>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/privacy-policy"
                  className="hover:text-green-400"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  className="hover:text-green-400"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/contact"
                  className="hover:text-green-400"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="mt-8 text-center text-gray-400">
              <p>&copy; 2023 Coal Mining Insights. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
