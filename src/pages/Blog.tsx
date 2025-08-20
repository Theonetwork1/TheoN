import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  // Load posts from localStorage
  const [blogPosts, setBlogPosts] = React.useState([]);
  
  React.useEffect(() => {
    const savedPosts = localStorage.getItem('theo-network-blog-posts');
    if (savedPosts) {
      const posts = JSON.parse(savedPosts).filter((post: any) => post.published);
      setBlogPosts(posts);
    } else {
      // Default posts if none exist
      setBlogPosts([
    {
          id: '1',
      title: '10 Essential Web Development Trends for 2024',
      excerpt: 'Discover the latest web development trends that are shaping the digital landscape this year, from AI integration to advanced security measures.',
      author: 'Theshneider Avril',
      date: '2024-01-15',
      category: 'Web Development',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
          published: true,
          language: 'en',
    },
    {
          id: '2',
      title: 'The Future of Mobile App Development',
      excerpt: 'Exploring how emerging technologies like AR, VR, and AI are revolutionizing mobile app development and user experiences.',
      author: 'Theshneider Avril',
      date: '2024-01-10',
      category: 'Mobile Development',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
          published: true,
          language: 'en',
    },
    {
          id: '3',
      title: 'Automation: Streamlining Business Processes',
      excerpt: 'Learn how business process automation can save time, reduce costs, and improve efficiency across your organization.',
      author: 'Theshneider Avril',
      date: '2024-01-05',
      category: 'Automation',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
          published: true,
          language: 'en',
    },
    {
          id: '4',
      title: 'Building Scalable Enterprise Applications',
      excerpt: 'Best practices for developing enterprise-grade applications that can handle growth and complexity while maintaining performance.',
      author: 'Theshneider Avril',
      date: '2023-12-28',
      category: 'Enterprise',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
          published: true,
          language: 'en',
    },
    {
          id: '5',
      title: 'UI/UX Design Principles for Modern Web Apps',
      excerpt: 'Essential design principles that create intuitive, accessible, and engaging user experiences in modern web applications.',
      author: 'Theshneider Avril',
      date: '2023-12-20',
      category: 'Design',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
          published: true,
          language: 'en',
    },
    {
          id: '6',
      title: 'Cybersecurity Best Practices for Small Businesses',
      excerpt: 'Comprehensive guide to protecting your business from cyber threats with practical, cost-effective security measures.',
      author: 'Theshneider Avril',
      date: '2023-12-15',
      category: 'Security',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
          published: true,
          language: 'en',
    },
      ]);
    }
  }, []);

  const categories = ['All', 'Web Development', 'Mobile Development', 'Automation', 'Design', 'Security', 'Enterprise'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter((post: any) => post.category === selectedCategory);

  const featuredPost = blogPosts.find((post: any) => post.featured);
  const regularPosts = blogPosts.filter((post: any) => !post.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Theo Network Blog
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Insights, trends, and expert advice on technology, development, and digital transformation
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Featured Post
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Latest Insights
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center text-sm text-slate-500 mb-6">
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{featuredPost.author}</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="mr-4">{new Date(featuredPost.date).toLocaleDateString()}</span>
                  <span>{featuredPost.readTime}</span>
                </div>

                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-slate-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  </p>
                  
                  <div className="flex items-center text-sm text-slate-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-3">{new Date(post.date).toLocaleDateString()}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200"
                  >
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.filter(post => !post.featured).length === 0 && (
            <div className="text-center py-16">
              <div className="text-slate-400 mb-4">
                <Tag className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No posts found</h3>
              <p className="text-slate-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest insights delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-r-lg transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;