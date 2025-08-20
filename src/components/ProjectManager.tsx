import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Eye, Upload, Image as ImageIcon } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  featured: boolean;
  liveUrl?: string;
}

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('theo-network-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Default projects if none exist
      const defaultProjects = [
        {
          id: '1',
          title: 'EliteShop - Premium E-Commerce Platform',
          category: 'Web Development',
          description: 'Premium e-commerce platform featuring modern design, secure payments, and seamless shopping experience. Built with advanced product discovery and customer engagement features.',
          image: '/Capture d\'écran 2025-07-22 171005 copy.png',
          featured: true,
          images: [
            '/Capture d\'écran 2025-07-22 171005 copy.png',
            '/Capture d\'écran 2025-07-22 171005.png',
            'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
        },
        {
          id: '2',
          title: 'Fylisca - Natural Hair Care Platform',
          category: 'Web Development',
          description: 'Beautiful hair care e-commerce platform promoting natural hair growth solutions with educational content and product recommendations.',
          image: '/Capture d\'écran 2025-05-26 021825 copy.png',
          featured: true,
          images: [
            '/Capture d\'écran 2025-05-26 021825 copy.png',
            '/Capture d\'écran 2025-05-26 021825.png',
            'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
        },
        {
          id: '3',
          title: 'Kayanu - Natural Skincare Brand',
          category: 'Web Development',
          description: 'Elegant skincare brand website celebrating natural beauty with clean design, product showcases, and inclusive messaging.',
          image: '/Capture d\'écran 2025-06-01 012837 copy.png',
          featured: true,
          images: [
            '/Capture d\'écran 2025-06-01 012837 copy.png',
            '/Capture d\'écran 2025-06-01 012837.png',
            'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
        },
        {
          id: '4',
          title: 'Chef Cassy - Culinary Experience Platform',
          category: 'Web Development',
          description: 'Authentic Haitian cuisine platform featuring chef profiles, recipe collections, and culinary storytelling with rich cultural elements.',
          image: '/Capture d\'écran 2025-06-03 122156.png',
          featured: false,
        },
        {
          id: '5',
          title: 'Belvys - Fitness & Body Sculpting',
          category: 'E-Commerce',
          description: 'Premium fitness equipment and supplements platform with body transformation focus, featuring workout guides and nutrition plans.',
          image: '/Capture d\'écran 2025-06-06 020142.png',
          featured: false,
        },
      ];
      setProjects(defaultProjects);
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('theo-network-projects', JSON.stringify(projects));
  }, [projects]);

  const createNewProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      category: 'Web Development',
      description: '',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      liveUrl: '',
      images: [
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
    };
    setEditingProject(newProject);
    setIsEditing(true);
  };

  const editProject = (project: Project) => {
    setEditingProject({ ...project });
    setIsEditing(true);
  };

  const saveProject = () => {
    if (!editingProject) return;

    if (editingProject.id && projects.find(p => p.id === editingProject.id)) {
      // Update existing project
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
    } else {
      // Add new project
      setProjects([editingProject, ...projects]);
    }

    setIsEditing(false);
    setEditingProject(null);
  };

  const deleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const toggleFeatured = (id: string) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setEditingProject({ ...editingProject, image: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = ['Web Development', 'Mobile Development', 'E-Commerce', 'Custom Software', 'Design', 'Automation'];

  if (isEditing && editingProject) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {editingProject.id ? 'Edit Project' : 'Create New Project'}
              </h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? 'Edit' : 'Preview'}
                </button>
                <button
                  onClick={saveProject}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingProject(null);
                  }}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>

            {showPreview ? (
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={editingProject.image}
                    alt={editingProject.title || 'Project Preview'}
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {editingProject.category}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    {editingProject.title || 'Untitled Project'}
                  </h3>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {editingProject.description || 'No description provided.'}
                  </p>
                  {editingProject.liveUrl && (
                    <a
                      href={editingProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                      View Live Site
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter project title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={editingProject.category}
                      onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingProject.description}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Describe the project and its key features"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Image
                  </label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 cursor-pointer"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </label>
                      <span className="text-sm text-gray-500">Or enter image URL below</span>
                    </div>
                    <input
                      type="url"
                      value={editingProject.image}
                      onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                    {editingProject.image && (
                      <div className="relative">
                        <img
                          src={editingProject.image}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Live URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://project-website.com"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingProject.featured}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    Featured Project (will appear in the featured section)
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Project Manager</h1>
          <button
            onClick={createNewProject}
            className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={project.image}
                            alt={project.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {project.title || 'Untitled'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {project.description?.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {project.featured && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                            Featured
                          </span>
                        )}
                        {project.liveUrl && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Live
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => editProject(project)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleFeatured(project.id)}
                          className={`${
                            project.featured ? 'text-yellow-600 hover:text-yellow-900' : 'text-purple-600 hover:text-purple-900'
                          }`}
                        >
                          {project.featured ? 'Unfeature' : 'Feature'}
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {projects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <ImageIcon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first project</p>
              <button
                onClick={createNewProject}
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;