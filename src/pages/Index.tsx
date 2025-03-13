
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { ArrowRight, GraduationCap, BookOpen, Users, CheckCircle } from 'lucide-react';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-xavier-50 to-xavier-100 -z-10"></div>
        
        {/* Floating Elements - for visual interest */}
        <div className="absolute top-40 left-10 w-16 h-16 rounded-full bg-xavier-300/20 animate-pulse-scale"></div>
        <div className="absolute top-60 right-20 w-24 h-24 rounded-full bg-xavier-400/10 animate-pulse-scale" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-xavier-200/20 animate-pulse-scale" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:pr-6 animate-fade-in">
              <div className="inline-block px-3 py-1 rounded-full bg-xavier-100 text-xavier-800 text-sm font-medium mb-2">
                Xavier College ERP
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Modern Education Management System
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                A comprehensive platform that connects students, teachers and administrators with seamless digital experiences.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild className="bg-xavier-600 hover:bg-xavier-700 text-white shadow-sm btn-hover">
                  <Link to="/login">
                    Log in to Portal <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="bg-white border-gray-200 shadow-sm hover:bg-gray-50 btn-hover">
                  <Link to="/about">
                    Learn more
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-tr from-xavier-500/20 to-transparent blur-xl"></div>
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Xavier College Campus" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need in One Platform</h2>
            <p className="text-lg text-gray-600">
              Our integrated system brings together all aspects of college management to enhance the learning experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Digital Classrooms",
                description: "Access course materials, submit assignments, and engage with interactive content.",
                delay: 0,
              },
              {
                icon: Users,
                title: "Seamless Collaboration",
                description: "Connect with peers and professors through integrated messaging and discussion forums.",
                delay: 0.1,
              },
              {
                icon: CheckCircle,
                title: "Attendance Tracking",
                description: "QR code-based attendance system for easy and accurate tracking of class participation.",
                delay: 0.2,
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-xavier-100 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-xavier-50 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-xavier-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-xavier-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-xavier-600 to-xavier-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-5 items-center">
              <div className="md:col-span-3 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Academic Experience?</h2>
                <p className="text-xavier-100 mb-6">
                  Join Xavier College's modern ERP system and experience the future of education management.
                </p>
                <Button asChild className="bg-white text-xavier-700 hover:bg-gray-100 btn-hover">
                  <Link to="/login">
                    Get Started Today
                  </Link>
                </Button>
              </div>
              <div className="hidden md:block md:col-span-2 h-full">
                <div className="relative h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="h-24 w-24 text-white/20" />
                  </div>
                  <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10"></div>
                  <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <GraduationCap className="h-8 w-8 text-xavier-600 mr-2" />
              <span className="text-xl font-semibold text-gray-900">Xavier College</span>
            </div>
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Xavier College. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
