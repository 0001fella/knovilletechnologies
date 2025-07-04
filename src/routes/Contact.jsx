import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone, Mail, MapPin, Wrench, Wifi, Code2, Shield, Cloud,
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaTiktok } from "react-icons/fa";

const issues = [
  { value: "hardware", label: "Hardware", icon: <Wrench className="w-8 h-8 text-yellow-500" /> },
  { value: "networking", label: "Networking", icon: <Wifi className="w-8 h-8 text-green-500" /> },
  { value: "software", label: "Software", icon: <Code2 className="w-8 h-8 text-purple-500" /> },
  { value: "security", label: "Security", icon: <Shield className="w-8 h-8 text-red-500" /> },
  { value: "webdev", label: "Web Dev", icon: <Code2 className="w-8 h-8 text-pink-500" /> },
  { value: "cloud", label: "Cloud", icon: <Cloud className="w-8 h-8 text-blue-500" /> },
];

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.issue) {
      navigate(`/technicians/${formData.issue.toLowerCase()}`);
    } else {
      navigate("/technicians");
    }
  };

  return (
    <div className="min-h-screen px-6 pt-20 pb-10 bg-white text-gray-800 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto relative z-10"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Contact Knoxville Technologies
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reach out to us for inquiries, support, or to visit our offices in Lucky Summer
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Our Contact Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Call Us</h3>
                    <p className="text-gray-600">0726 818 938</p>
                    <p className="text-gray-600">0724 169 963</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">knoxville@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Visit Us</h3>
                    <p className="text-gray-600">Lucky Summer, Ruaraka</p>
                    <p className="text-gray-600">Behind Naivas Supermarket</p>
                    <p className="text-gray-600">Thoram House, Ground Floor</p>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Link */}
            <div className="pt-4">
              <motion.a
                href="https://wa.me/254726818938"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="inline-flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 text-base sm:text-lg"
                whileHover={{ scale: 1.05 }}
              >
                <FaWhatsapp className="w-6 h-6" />
                <span>Chat with us on WhatsApp</span>
              </motion.a>
            </div>

            {/* Social Media Icons */}
            <div className="pt-6">
              <p className="text-gray-700 font-semibold text-base mb-3">Follow us</p>
              <div className="flex gap-6">
                <motion.a
                  href="https://www.facebook.com/share/1E5h7zsjFR/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-blue-600 text-3xl hover:text-blue-800 transition"
                  aria-label="Visit our Facebook page"
                >
                  <FaFacebook />
                </motion.a>
                <motion.a
                  href="https://www.tiktok.com/@knoxville.home.fi?_t=ZM-8wp8uGRB36k&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-black text-3xl hover:text-gray-700 transition"
                  aria-label="Visit our TikTok page"
                >
                  <FaTiktok />
                </motion.a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Business Hours</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">8:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">9:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
            <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you soon</p>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What can we help you with?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {issues.map((issue) => (
                    <motion.div
                      key={issue.value}
                      onClick={() => setFormData({ ...formData, issue: issue.value })}
                      className={`cursor-pointer p-3 rounded-lg flex flex-col items-center gap-2 border ${formData.issue === issue.value ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"} transition`}
                      whileHover={{ scale: 1.03 }}
                    >
                      {issue.icon}
                      <span className="text-sm text-center">{issue.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Message
              </motion.button>
            </div>
          </motion.form>
        </div>

        {/* Map */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location in Lucky Summer</h2>
          <div className="bg-gray-100 rounded-xl overflow-hidden border border-gray-200 h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.845749464442!2d36.8701933!3d-1.241681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f172f478cf6d7%3A0x9ff70d276cc229f4!2sThoram%20House%2C%20Lucky%20Summer!5e0!3m2!1sen!2ske!4v1717140000000!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Knoxville Technologies Location - Lucky Summer, Behind Naivas, Thoram House"
            ></iframe>
          </div>
          <div className="mt-4 text-center text-gray-600">
            <p>Find us at Thoram House, behind Naivas Supermarket in Lucky Summer</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;