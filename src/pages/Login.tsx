import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, ArrowRight, Shield, User, Mail, Phone, MapPin } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    company: '',
    rememberMe: false,
  });

  // Mock user data for dashboard
  const [userData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc.',
    joinDate: '2024-01-15',
    totalSpent: 15750,
    activeProjects: 2,
    completedProjects: 5,
  });

  // Mock projects data
  const [projects] = useState([
    {
      id: 1,
      name: 'E-commerce Website',
      status: 'In Progress',
      progress: 75,
      startDate: '2024-01-20',
      budget: 8500,
      spent: 6375,
    },
    {
      id: 2,
      name: 'Mobile App Development',
      status: 'Planning',
      progress: 15,
      startDate: '2024-02-01',
      budget: 12000,
      spent: 1800,
    },
  ]);

  // Mock payment history
  const [paymentHistory] = useState([
    {
      id: 1,
      date: '2024-01-25',
      description: 'E-commerce Website - Milestone 1',
      amount: 2500,
      status: 'Paid',
      invoice: 'INV-2024-001',
    },
    {
      id: 2,
      date: '2024-02-15',
      description: 'E-commerce Website - Milestone 2',
      amount: 2500,
      status: 'Paid',
      invoice: 'INV-2024-002',
    },
    {
      id: 3,
      date: '2024-03-01',
      description: 'Mobile App - Initial Payment',
      amount: 1800,
      status: 'Paid',
      invoice: 'INV-2024-003',
    },
    {
      id: 4,
      date: '2024-03-15',
      description: 'E-commerce Website - Final Payment',
      amount: 1375,
      status: 'Pending',
      invoice: 'INV-2024-004',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Handle login
      if (formData.email && formData.password) {
        setIsLoggedIn(true);
      }
    } else {
      // Handle registration
      if (formData.email && formData.password && formData.confirmPassword && 
          formData.firstName && formData.lastName) {
        if (formData.password === formData.confirmPassword) {
          setIsLoggedIn(true);
        } else {
          alert('Passwords do not match');
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      company: '',
      rememberMe: false,
    });
  };

  const downloadInvoice = (invoiceId: string) => {
    // Mock download functionality
    alert(`Downloading invoice ${invoiceId}...`);
  };

  const makePayment = (amount: number, description: string) => {
    // Mock payment functionality
    alert(`Processing payment of $${amount} for ${description}...`);
  };

  // Dashboard View
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-2">
                  <img 
                    src="/theo-network-logo.png" 
                    alt="Theonetwork Logo" 
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-xl font-bold text-slate-800">Theonetwork</span>
                </Link>
                <span className="text-gray-300">|</span>
                <span className="text-gray-600">Client Dashboard</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Welcome, {userData.firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">${userData.totalSpent.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ArrowRight className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.activeProjects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{userData.completedProjects}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Member Since</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Date(userData.joinDate).getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {userData.firstName} {userData.lastName}
                      </p>
                      <p className="text-sm text-gray-500">Full Name</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{userData.email}</p>
                      <p className="text-sm text-gray-500">Email Address</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{userData.phone}</p>
                      <p className="text-sm text-gray-500">Phone Number</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{userData.company}</p>
                      <p className="text-sm text-gray-500">Company</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                  Edit Profile
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Request New Project
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Schedule Consultation
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Current Projects */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Projects</h3>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.name}</h4>
                          <p className="text-sm text-gray-500">Started: {new Date(project.startDate).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          project.status === 'In Progress' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Budget: ${project.budget.toLocaleString()}
                        </span>
                        <span className="text-gray-600">
                          Spent: ${project.spent.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-900">
                            {payment.description}
                          </td>
                          <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                            ${payment.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              payment.status === 'Paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => downloadInvoice(payment.invoice)}
                                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                              >
                                Download
                              </button>
                              {payment.status === 'Pending' && (
                                <button
                                  onClick={() => makePayment(payment.amount, payment.description)}
                                  className="text-xs text-orange-600 hover:text-orange-800 font-medium"
                                >
                                  Pay Now
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login/Register View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <img 
              src="/TheoNetwork Logo (1).png" 
              alt="Theonetwork Logo" 
              className="w-20 h-20 object-contain"
            />
          </Link>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-600">
            {isLogin ? 'Sign in to access your client portal' : 'Join Theonetwork today'}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              isLogin 
                ? 'bg-white text-orange-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              !isLogin 
                ? 'bg-white text-orange-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-8 shadow-xl rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                placeholder="Enter your email"
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Your company name"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <LogIn className="w-5 h-5 mr-2" />
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Security Notice */}
        <div className="bg-slate-100 rounded-lg p-4 text-center">
          <Shield className="w-5 h-5 text-slate-500 mx-auto mb-2" />
          <p className="text-sm text-slate-600">
            Your data is secured with enterprise-grade encryption
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center space-x-4 text-sm">
          <Link to="/contact" className="text-slate-500 hover:text-orange-600 transition-colors duration-200">
            Need Help?
          </Link>
          <span className="text-slate-300">•</span>
          <Link to="/" className="text-slate-500 hover:text-orange-600 transition-colors duration-200">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;