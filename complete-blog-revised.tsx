import React, { useState } from 'react';
import { Search, Calendar, Heart, Edit, Trash, MessageSquare, User, Settings } from 'lucide-react';

const BlogApp = () => {
  // User Management State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [message, setMessage] = useState('');
  const [adminMode, setAdminMode] = useState(false);

  // Blog State
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to the Blog",
      content: "This is our first blog post!",
      author: "Admin",
      date: "2024-01-07",
      tags: ["welcome", "first"],
      visits: 0,
      comments: []
    }
  ]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Registration Form
  const RegistrationForm = () => {
    const [userData, setUserData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    const handleRegister = (e) => {
      e.preventDefault();
      if (userData.password !== userData.confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }
      // Simulate user registration
      setCurrentUser({
        username: userData.username,
        email: userData.email,
        role: 'user'
      });
      setIsLoggedIn(true);
      setShowRegister(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={userData.username}
              onChange={(e) => setUserData({...userData, username: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) => setUserData({...userData, password: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={userData.confirmPassword}
              onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowRegister(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Login Form
  const LoginForm = () => {
    const [credentials, setCredentials] = useState({
      email: '',
      password: ''
    });

    const handleLogin = (e) => {
      e.preventDefault();
      // Simulate login (in real app, verify against backend)
      if (credentials.email === 'admin@test.com' && credentials.password === '123') {
        setCurrentUser({
          username: 'Admin',
          email: credentials.email,
          role: 'admin'
        });
        setIsLoggedIn(true);
        setShowLogin(false);
        setAdminMode(true);
      } else {
        setMessage('Invalid credentials');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Admin Panel
  const AdminPanel = () => {
    const [selectedSection, setSelectedSection] = useState('posts');

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelectedSection('posts')}
            className={`px-4 py-2 rounded ${
              selectedSection === 'posts' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Manage Posts
          </button>
          <button
            onClick={() => setSelectedSection('comments')}
            className={`px-4 py-2 rounded ${
              selectedSection === 'comments' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Manage Comments
          </button>
          <button
            onClick={() => setSelectedSection('tags')}
            className={`px-4 py-2 rounded ${
              selectedSection === 'tags' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Manage Tags
          </button>
        </div>
        
        {/* Section Content */}
        {selectedSection === 'posts' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">All Posts</h3>
            {posts.map(post => (
              <div key={post.id} className="border p-4 rounded">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{post.title}</h4>
                  <div className="space-x-2">
                    <button
                      onClick={() => setEditingPost(post)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Tags: {post.tags.join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedSection === 'comments' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Recent Comments</h3>
            {posts.flatMap(post => 
              post.comments.map(comment => (
                <div key={comment.id} className="border p-4 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{comment.name}</div>
                      <div className="text-sm text-gray-600">{comment.email}</div>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(post.id, comment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-2">{comment.content}</div>
                </div>
              ))
            )}
          </div>
        )}

        {selectedSection === 'tags' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Manage Tags</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(posts.flatMap(post => post.tags))).map(tag => (
                <div key={tag} className="flex items-center bg-gray-100 px-3 py-1 rounded">
                  <span>{tag}</span>
                  <button
                    onClick={() => handleDeleteTag(tag)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Post Management Functions
  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData,
      visits: 0,
      comments: []
    };
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (postId, updatedData) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, ...updatedData } : post
    ));
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleDeleteComment = (postId, commentId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.filter(comment => comment.id !== commentId)
        };
      }
      return post;
    }));
  };

  const handleDeleteTag = (tagToDelete) => {
    setPosts(posts.map(post => ({
      ...post,
      tags: post.tags.filter(tag => tag !== tagToDelete)
    })));
  };

  // Filter and Pagination
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Sidebar Data
  const postsByMonth = posts.reduce((acc, post) => {
    const date = new Date(post.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(post);
    return acc;
  }, {});

  const tagCounts = posts.flatMap(post => post.tags)
    .reduce((acc, tag) => ({
      ...acc,
      [tag]: (acc[tag] || 0) + 1
    }), {});

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Blog</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-full"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {!isLoggedIn ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                  >
                    Register
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    Welcome, {currentUser.username}
                  </span>
                  {currentUser.role === 'admin' && (
                    <button
                      onClick={() => setShowAdminPanel(!showAdminPanel)}
                      className="p-2 text-gray-600 hover:text-gray-