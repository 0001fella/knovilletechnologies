import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, Mail, MapPin, Star, CheckCircle, Zap, 
  Shield, Cpu, Wifi, Calendar, ChevronDown, ChevronUp
} from "lucide-react";
import { useInView } from "react-intersection-observer";

// Technician Data
const technicians = [
  {
    id: "tech-1",
    name: "Abraham ",
    role: "Chief Hardware Engineer",
    phone: "+254726818938",
    email: "ooroabraham@gmail.com",
    location: "Nairobi, Kenya",
    specialty: "hardware",
    bookUrl: "#",
    rating: 4.8,
    reviews: 42,
    skills: ["Circuit Repair", "Data Recovery", "Component Replacement", "Diagnostics"],
    bio: "Certified hardware specialist with extensive experience in component-level repairs. Passionate about restoring devices to their optimal performance.",
    stats: [
      { value: "98%", label: "Success Rate" },
      { value: "24h", label: "Avg. Response" },
      { value: "500+", label: "Devices Fixed" }
    ]
  },
  {
    id: "tech-2",
    name: "Colins ",
    role: "Network Architect",
    phone: "+254768085708",
    email: "collinsominde98@gmail.com",
    location: "Nairobi, Kenya",
    specialty: "networking",
    bookUrl: "#",
    rating: 4.6,
    reviews: 36,
    skills: ["Network Setup", "Router Configuration", "Security", "Wireless Optimization"],
    bio: "Network infrastructure expert focused on creating secure, high-performance solutions for businesses of all sizes.",
    stats: [
      { value: "95%", label: "Success Rate" },
      { value: "2h", label: "Avg. Response" },
      { value: "300+", label: "Networks Built" }
    ]
  },
  {
    id: "tech-3",
    name: "Bret Gift ",
    role: "Software Solutions Expert",
    phone: "+254713116766",
    email: "ggiftotieno@gmail.com",
    location: "Nairobi, Kenya",
    specialty: "software",
    bookUrl: "#",
    rating: 4.9,
    reviews: 51,
    skills: ["Software Installation", "Virus Removal", "System Optimization", "Data Migration"],
    bio: "Software troubleshooter dedicated to solving complex system issues and optimizing performance.",
    stats: [
      { value: "99%", label: "Success Rate" },
      { value: "1h", label: "Avg. Response" },
      { value: "700+", label: "Systems Optimized" }
    ]
  },
  {
    id: "tech-4",
    name: "Lameck ",
    role: "Security Specialist",
    phone: "+254758018533",
    email: "lameckooro@gmail.com",
    location: "Nairobi, Kenya",
    specialty: "security",
    bookUrl: "#",
    rating: 4.7,
    reviews: 39,
    skills: ["Security Audits", "Firewall Setup", "Encryption", "Threat Analysis"],
    bio: "Cybersecurity professional committed to protecting your digital assets with cutting-edge solutions.",
    stats: [
      { value: "97%", label: "Success Rate" },
      { value: "4h", label: "Avg. Response" },
      { value: "200+", label: "Systems Secured" }
    ]
  }
];

const specialties = [
  { icon: <Cpu className="w-6 h-6" />, name: "Hardware", color: "text-blue-400" },
  { icon: <Wifi className="w-6 h-6" />, name: "Networking", color: "text-purple-400" },
  { icon: <Zap className="w-6 h-6" />, name: "Software", color: "text-green-400" },
  { icon: <Shield className="w-6 h-6" />, name: "Security", color: "text-yellow-400" }
];

const stats = [
  { value: "1000+", label: "Devices Repaired" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
  { value: "15min", label: "Average Response" }
];

const testimonials = [
  {
    id: 1,
    name: "John D.",
    company: "Tech Solutions Ltd",
    content: "The team at Knoxville completely transformed our network infrastructure. Their expertise and professionalism were beyond our expectations.",
    rating: 5
  },
  {
    id: 2,
    name: "Sarah M.",
    company: "Innovate Africa",
    content: "Prompt response and efficient service. Our security systems are now more robust thanks to Knoxville's comprehensive solutions.",
    rating: 5
  },
  {
    id: 3,
    name: "Thomas K.",
    company: "DataSecure Inc",
    content: "Their hardware specialists recovered critical data we thought was lost forever. Truly exceptional technical skills and customer service.",
    rating: 4
  }
];

const faqs = [
  {
    question: "How quickly can you respond to service requests?",
    answer: "We guarantee a response within 15 minutes during business hours, and our average onsite arrival time is under 2 hours in major urban areas."
  },
  {
    question: "Do you offer ongoing maintenance contracts?",
    answer: "Yes, we provide flexible maintenance packages tailored to your business needs, including 24/7 monitoring and priority response."
  },
  {
    question: "What areas do you serve?",
    answer: "We provide services throughout Kenya with a focus on Nairobi, Mombasa, and Kisumu. Enterprise solutions are available across East Africa."
  },
  {
    question: "How do you ensure data security during repairs?",
    answer: "All our technicians follow strict security protocols, and we offer signed NDAs for sensitive operations. Client data remains confidential at all times."
  }
];

const TechnicianCard = ({ tech, onClick }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 0.77, 0.47, 0.97] }}
      className="relative bg-white rounded-3xl p-1 shadow-lg overflow-hidden group cursor-pointer border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative bg-white rounded-[calc(1.5rem-4px)] h-full overflow-hidden">
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{tech.name}</h3>
            <p className="text-blue-600 font-medium">{tech.role}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tech.skills.slice(0, 3).map((skill, index) => (
              <motion.span 
                key={index}
                className="text-xs bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 text-blue-800"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{tech.location}</span>
            </div>
            
            <motion.a
              href={`https://wa.me/${tech.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-green-600 rounded-full font-medium text-white"
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(37, 211, 102, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.515 5.392 1.521 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TechnicianModal = ({ tech, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  const availableDates = [
    { date: "2023-06-15", day: "Today" },
    { date: "2023-06-16", day: "Tomorrow" },
    { date: "2023-06-17", day: "Saturday" },
    { date: "2023-06-19", day: "Monday" }
  ];
  
  const availableTimes = [
    "09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"
  ];

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative border border-gray-200 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-all z-10"
            whileHover={{ rotate: 90 }}
          >
            <X className="w-6 h-6 text-gray-800" />
          </button>
          
          <div className="grid lg:grid-cols-3 h-full">
            <div className="lg:col-span-1 bg-gray-50 relative p-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold mb-4">
                  {tech.name.split(" ").map((n) => n[0]).join("")}
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 text-center">{tech.name}</h2>
                <p className="text-blue-600 text-xl text-center">{tech.role}</p>
                
                <div className="flex items-center justify-center mt-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(tech.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{tech.rating} ({tech.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 p-8 overflow-y-auto">
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'schedule' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
                  onClick={() => setActiveTab('schedule')}
                >
                  Schedule
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
              </div>
              
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">About {tech.name.split(' ')[0]}</h3>
                    <p className="text-gray-700 leading-relaxed">{tech.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Expertise</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {tech.skills.map((skill, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Stats</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {tech.stats.map((stat, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-gray-500 text-sm">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <Phone className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">{tech.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">{tech.email}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">{tech.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'schedule' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Select Appointment Date</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {availableDates.map((date) => (
                        <button
                          key={date.date}
                          className={`p-3 rounded-lg border ${selectedDate === date.date ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'} transition-colors`}
                          onClick={() => setSelectedDate(date.date)}
                        >
                          <p className="text-gray-900 font-medium">{date.day}</p>
                          <p className="text-gray-500 text-sm">{date.date.split('-')[2]}/{date.date.split('-')[1]}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDate && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Available Time Slots</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            className={`p-3 rounded-lg border ${selectedTime === time ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'} transition-colors`}
                            onClick={() => setSelectedTime(time)}
                          >
                            <p className="text-gray-900">{time}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedDate && selectedTime && (
                    <motion.button
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium text-white mt-6"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Confirm Appointment for {selectedDate} at {selectedTime}
                    </motion.button>
                  )}
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-4xl font-bold text-gray-900">{tech.rating}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(tech.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-gray-600">
                        <p>{tech.reviews} reviews</p>
                        <p className="text-sm">98% positive</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-gray-500 w-8">{star} star</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full" 
                              style={{ width: `${(star === 5 ? 80 : star === 4 ? 15 : star === 3 ? 3 : star === 2 ? 1 : 1)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <div className="flex justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                              {review === 1 ? 'JD' : review === 2 ? 'SM' : 'TK'}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {review === 1 ? 'John D.' : review === 2 ? 'Sarah M.' : 'Thomas K.'}
                              </p>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < (review === 1 ? 5 : review === 2 ? 4 : 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-gray-500 text-sm">2 weeks ago</span>
                        </div>
                        <p className="text-gray-700">
                          {review === 1 
                            ? `${tech.name} provided exceptional service. My device was repaired faster than expected and works perfectly now. Highly recommend!`
                            : review === 2
                            ? `Good service overall. There was a slight delay in parts delivery but the technician kept me informed throughout the process.`
                            : `Absolutely brilliant work! Fixed an issue that two other technicians couldn't figure out. Will definitely use again.`}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const StatCard = ({ value, label, index }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <p className="text-4xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

const SpecialtyCard = ({ icon, name, color, index }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-colors group"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className={`w-12 h-12 rounded-lg ${color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:bg-opacity-30 transition-all`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600">
        {name === "Hardware" 
          ? "Component-level repairs and diagnostics"
          : name === "Networking"
          ? "Infrastructure setup and optimization"
          : name === "Software"
          ? "System troubleshooting and optimization"
          : "Protection against digital threats"}
      </p>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.7 }}
    >
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
      <div>
        <p className="font-bold text-gray-900">{testimonial.name}</p>
        <p className="text-blue-600 text-sm">{testimonial.company}</p>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ faq, index, isOpen, toggle }) => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  return (
    <motion.div
      ref={ref}
      className="border-b border-gray-200 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={toggle}
      >
        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-blue-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <motion.div
          className="mt-4 text-gray-600"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {faq.answer}
        </motion.div>
      )}
    </motion.div>
  );
};

const Technicians = () => {
  const { issue } = useParams();
  const techSectionRef = useRef(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  
  useEffect(() => {
    if (techSectionRef.current) {
      techSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [issue]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      ref={techSectionRef}
      className="min-h-screen bg-white text-gray-900 overflow-hidden"
    >
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Elite Technical Experts
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Meet our certified professionals ready to solve your most complex technical challenges with precision and expertise.
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {stats.map((stat, index) => (
              <StatCard key={index} value={stat.value} label={stat.label} index={index} />
            ))}
          </motion.div>

          {/* Specialties Section */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Our Specialties
              </span>
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specialties.map((specialty, index) => (
                <SpecialtyCard 
                  key={index} 
                  icon={specialty.icon} 
                  name={specialty.name} 
                  color={specialty.color} 
                  index={index} 
                />
              ))}
            </div>
          </motion.div>

          {/* Technicians Section */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Meet the Team
              </span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {technicians.map((tech) => (
                <TechnicianCard 
                  key={tech.id} 
                  tech={tech} 
                  onClick={() => setSelectedTech(tech)}
                />
              ))}
            </div>
          </motion.div>

          {/* Testimonials Section */}
          <motion.div
            className="mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Client Testimonials
              </span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={testimonial.id} 
                  testimonial={testimonial} 
                  index={index} 
                />
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="mb-24 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Frequently Asked Questions
              </span>
            </motion.h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              {faqs.map((faq, index) => (
                <FAQItem 
                  key={index} 
                  faq={faq} 
                  index={index}
                  isOpen={openIndex === index}
                  toggle={() => toggleFAQ(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTech && (
          <TechnicianModal 
            tech={selectedTech} 
            onClose={() => setSelectedTech(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Technicians;