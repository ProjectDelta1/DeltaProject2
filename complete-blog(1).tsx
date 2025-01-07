import React, { useState } from 'react';
import { Search, Calendar, Heart, Edit, Trash, MessageSquare } from 'lucide-react';

const BlogApp = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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

  // UI State
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('');
  const [postMessage, setPostMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  // Functions
  const handleLogin = () => {
    if (email === 'admin' && password === '123') {
      setIsLoggedIn(true);
      setMessage('Logged in successfully!');
    } else {
      setMessage('Invalid credentials. Use admin/123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setMessage('');
  };

  const handleCreatePost = () => {
    if (!newPostTitle || !newPostContent || !newPostTags) {
      setPostMessage('Please fill in all fields');
      return;
    }

    const newPost = {
      id: Date.now(),
      title: newPostTitle,
      content: newPostContent,
      tags: newPostTags.split(',').map(tag => tag.trim()),
      author: 'Admin',
      date: new Date().toISOString().split('T')[0],
      visits: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags('');
    setPostMessage('Post created successfully!');
    setTimeout(() => setPostMessage(''), 3000);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleAddComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            ...comment,
            date: new Date().toISOString().split('T')[0]
          }]
        };
      }
      return post;
    }));
  };

  const incrementVisit = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, visits: post.visits + 1 } : post
    ));
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Get popular tags
  const tagCounts = posts
    .flatMap(post => post.tags)
    .reduce((acc, tag) => ({
      ...acc,
      [tag]: (acc[tag] || 0) + 1
    }), {});

  // Comment Form Component
  const CommentForm = ({ postId }) => {
    const [comment, setComment] = useState({ name: '', email: '', content: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!comment.name || !comment.content) return;
      handleAddComment(postId, comment);
      setComment({ name: '', email: '', content: '' });
    };

    return (
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={comment.name}
          onChange={(e) => setComment({ ...comment, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Your Email (optional)"
          value={comment.email}
          onChange={(e) => setComment({ ...comment, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Your Comment"
          value={comment.content}
          onChange={(e) => setComment({ ...comment, content: e.target.value })}
          className="w-full p-2 border rounded h-24"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Comment
        </button>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold">Blog</h1>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 border rounded-full"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            {!isLoggedIn ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin"
                  className="p-2 border rounded"
                />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="123"
                  className="p-2 border rounded"
                />
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
        {message && (
          <div className={`mt-4 p-3 rounded ${
            isLoggedIn ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Create Post Form */}
          {isLoggedIn && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h2 className="text-xl font-bold mb-4">Create New Post</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={e => setNewPostTitle(e.target.value)}
                  placeholder="Post Title"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  placeholder="Post Content"
                  className="w-full p-2 border rounded h-32"
                />
                <input
                  type="text"
                  value={newPostTags}
                  onChange={e => setNewPostTags(e.target.value)}
                  placeholder="Tags (comma-separated)"
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleCreatePost}
                  className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Create Post
                </button>
                {postMessage && (
                  <div className={`p-3 rounded ${
                    postMessage.includes('successfully') 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {postMessage}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Posts List */}
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <div 
                key={post.id} 
                className="bg-white rounded-lg shadow-md p-4"
                onClick={() => incrementVisit(post.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  {isLoggedIn && (
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePost(post.id);
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.visits} visits
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {post.comments.length} comments
                  </span>
                </div>

                <p className="mb-4">{post.content}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTag(selectedTag === tag ? '' : tag);
                      }}
                      className={`px-3 py-1 rounded-full cursor-pointer ${
                        selectedTag === tag 
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-bold mb-4">Comments</h3>
                  <div className="space-y-4">
                    {post.comments.map(comment => (
                      <div key={comment.id} className="bg-gray-50 p-3 rounded">
                        <div className="font-semibold">{comment.name}</div>
                        {comment.email && (
                          <div className="text-sm text-gray-600">{comment.email}</div>
                        )}
                        <div className="mt-2">{comment.content}</div>
                      </div>
                    ))}
                  </div>
                  <CommentForm postId={post.id} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(tagCounts).map(([tag, count]) => (
                <span
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  className={`px-3 py-1 rounded-full cursor-pointer ${
                    selectedTag === tag 
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  #{tag} ({count})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogApp;