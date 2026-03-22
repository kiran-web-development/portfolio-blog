import React, { useState, useEffect } from 'react';
import { Camera, Code, Palette, BookOpen, Grid, Layout, Maximize2, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryView, setGalleryView] = useState('grid'); // grid, masonry, slideshow
  const [selectedImage, setSelectedImage] = useState(null);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [theme, setTheme] = useState('dark'); // dark or light
  const [selectedPost, setSelectedPost] = useState(null);
  const [postRatings, setPostRatings] = useState({});
  const [postFeedback, setPostFeedback] = useState({});
  const [photoLikes, setPhotoLikes] = useState({});
  const [feedbackForm, setFeedbackForm] = useState({ name: '', email: '', comment: '' });

  // Sample data - replace with your actual content
  const projects = [
    { id: 1, title: 'E-commerce Platform', category: 'Web Development', image: '🛍️', description: 'Full-stack shopping experience with React & Node.js', color: '#FF6B6B' },
    { id: 2, title: 'Brand Identity Suite', category: 'Design', image: '🎨', description: 'Complete visual identity for tech startup', color: '#4ECDC4' },
    { id: 3, title: 'Mobile App UI/UX', category: 'Design', image: '📱', description: 'Fitness tracking app interface design', color: '#FFE66D' },
    { id: 4, title: 'API Integration System', category: 'Web Development', image: '⚡', description: 'Microservices architecture with REST APIs', color: '#95E1D3' },
  ];

  const blogPosts = [
    { 
      id: 1, 
      title: 'The Art of Minimalist Photography', 
      date: '2024-03-15', 
      excerpt: 'Exploring negative space and composition in urban environments...', 
      readTime: '5 min',
      content: `Minimalist photography is about finding beauty in simplicity. It's the art of saying more with less, of creating powerful images through careful composition and intentional use of negative space.

In urban environments, opportunities for minimalist photography are everywhere. A lone figure walking across a vast concrete plaza. The geometric patterns of modern architecture against a clear sky. The interplay of light and shadow on a building facade.

The key principles I've learned:
• Negative space is not empty space - it's breathing room for your subject
• Less is more - remove everything that doesn't serve the story
• Geometry and lines create visual interest even in simple scenes
• Light and shadow can be your primary subjects

When I'm shooting, I ask myself: "What can I remove while strengthening the image?" This mindset has transformed how I see the world around me.

The technical side matters too - shoot in RAW, use a narrow aperture for sharpness, and don't be afraid of high contrast in post-processing. But ultimately, minimalism is about vision, not equipment.

Start simple. Find a single subject. Give it space. Watch how the story emerges.`,
    },
    { 
      id: 2, 
      title: 'Modern CSS Grid Techniques', 
      date: '2024-03-10', 
      excerpt: 'Advanced layout patterns using CSS Grid and Subgrid...', 
      readTime: '8 min',
      content: `CSS Grid has revolutionized how we build layouts on the web. Gone are the days of wrestling with floats and clearfix hacks. Grid gives us true two-dimensional layout control.

What makes Grid powerful isn't just the basics - it's the advanced techniques that unlock truly creative layouts:

**Subgrid for Alignment**
The subgrid feature lets child grids inherit their parent's track sizing. This means you can create complex nested layouts where elements align perfectly across different containers.

**Named Grid Areas**
Instead of thinking in line numbers, define semantic areas:
grid-template-areas: "header header" "sidebar content" "footer footer";

This makes your layouts readable and maintainable.

**Auto-fit and Auto-fill**
Create responsive grids that adapt without media queries:
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

**Grid + Flexbox**
Don't choose - combine them! Use Grid for page-level layouts, Flexbox for component-level alignment. They're complementary, not competing.

The real magic happens when you stop thinking in terms of "rows and columns" and start thinking in terms of "areas and flow." Grid isn't just a layout tool - it's a design language that lets you express creative intentions directly in code.

My advice: Build something ambitious. A magazine layout. A dashboard. A portfolio. You'll discover capabilities you didn't know existed.`,
    },
    { 
      id: 3, 
      title: 'Color Theory in Digital Design', 
      date: '2024-03-05', 
      excerpt: 'Understanding complementary palettes and visual hierarchy...', 
      readTime: '6 min',
      content: `Color is one of the most powerful tools in a designer's arsenal, yet it's often the most misunderstood. Good color choices can make or break a design.

**The 60-30-10 Rule**
This classic principle still holds: 60% dominant color, 30% secondary color, 10% accent. This creates visual balance and prevents color chaos.

**Complementary vs Analogous**
Complementary colors (opposite on the color wheel) create vibrant, energetic designs. Analogous colors (next to each other) create harmony and calm. Neither is "better" - they serve different purposes.

**Accessibility Matters**
A beautiful palette means nothing if users can't read your text. Always check contrast ratios:
• Normal text: minimum 4.5:1 contrast
• Large text: minimum 3:1 contrast
• UI components: minimum 3:1 contrast

**Psychological Impact**
Colors carry meaning:
• Blue: Trust, stability, professionalism
• Red: Energy, urgency, passion
• Green: Growth, health, nature
• Yellow: Optimism, creativity, caution

But context matters more than these generalizations. A red donate button on a charity site feels urgent. A red button on a banking app feels alarming.

**My Process**
1. Start with one hero color that defines the brand
2. Add a complementary accent for calls-to-action
3. Build a neutral scale (grays) for UI elements
4. Test in context - colors look different when surrounded by other colors

Remember: The best color palette is the one that serves your users and your message, not the one that looks prettiest in isolation.`,
    },
  ];

  const photos = [
    // Landscape photos
    { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', title: 'Mountain Vista', ratio: 'landscape' },
    { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e', title: 'Forest Path', ratio: 'landscape' },
    { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5', title: 'Desert Dunes', ratio: 'landscape' },
    { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1', title: 'City Lights', ratio: 'landscape' },
    { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', title: 'Coastal Cliffs', ratio: 'landscape' },
    { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d', title: 'Wildflower Meadow', ratio: 'landscape' },
    { id: 7, type: 'image', src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', title: 'Misty Woods', ratio: 'landscape' },
    { id: 8, type: 'image', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', title: 'Northern Lights', ratio: 'landscape' },
    
    // Portrait/Tall photos
    { id: 9, type: 'image', src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29', title: 'Sunset Beach', ratio: 'portrait', tall: true },
    { id: 10, type: 'image', src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff', title: 'Misty Forest', ratio: 'portrait', tall: true },
    { id: 11, type: 'image', src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba', title: 'Starry Night', ratio: 'portrait', tall: true },
    { id: 12, type: 'image', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', title: 'Mountain Peak', ratio: 'portrait', tall: true },
    
    // Square photos
    { id: 13, type: 'image', src: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5', title: 'Lake Reflection', ratio: 'square' },
    { id: 14, type: 'image', src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0', title: 'Tropical Paradise', ratio: 'square' },
    
    // Videos - Landscape
    { id: 15, type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4', poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', title: 'Sunset Timelapse', ratio: 'landscape' },
    { id: 16, type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4', poster: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0', title: 'Ocean Waves', ratio: 'landscape' },
    { id: 17, type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4', poster: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', title: 'Forest Stream', ratio: 'landscape' },
    
    // Videos - Portrait
    { id: 18, type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4', poster: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff', title: 'Spring Blossoms', ratio: 'portrait', tall: true },
    { id: 19, type: 'video', src: 'https://assets.mixkit.co/videos/preview/mixkit-northern-lights-in-the-sky-4371-large.mp4', poster: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', title: 'Aurora Motion', ratio: 'portrait', tall: true },
  ];

  const navigationItems = [
    { id: 'home', label: 'Home', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'gallery', label: 'Gallery', icon: '📷' },
  ];

  // Helper functions
  const ratePost = (postId, rating) => {
    setPostRatings(prev => ({ ...prev, [postId]: rating }));
  };

  const submitFeedback = (postId) => {
    if (!feedbackForm.name || !feedbackForm.comment) {
      alert('Please fill in your name and comment');
      return;
    }
    const newFeedback = {
      ...feedbackForm,
      date: new Date().toLocaleDateString(),
      id: Date.now(),
    };
    setPostFeedback(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newFeedback],
    }));
    setFeedbackForm({ name: '', email: '', comment: '' });
    alert('Thank you for your feedback!');
  };

  const togglePhotoLike = (photoId) => {
    setPhotoLikes(prev => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + (prev[photoId] > 0 && prev[photoId] % 2 === 1 ? -1 : 1),
    }));
  };

  const downloadImage = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${imageName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try right-clicking and saving the image.');
    }
  };

  // Sort photos by likes
  const sortedPhotos = [...photos].sort((a, b) => {
    const likesA = photoLikes[a.id] || 0;
    const likesB = photoLikes[b.id] || 0;
    return likesB - likesA;
  });

  useEffect(() => {
    // Slideshow auto-advance
    if (galleryView === 'slideshow') {
      const timer = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % sortedPhotos.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [galleryView, sortedPhotos.length]);

  const nextSlide = () => setSlideshowIndex((prev) => (prev + 1) % sortedPhotos.length);
  const prevSlide = () => setSlideshowIndex((prev) => (prev - 1 + sortedPhotos.length) % sortedPhotos.length);

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: theme === 'dark' ? 'linear-gradient(to bottom right, var(--bg-gradient-start), var(--bg-gradient-via), var(--bg-gradient-end))' : 'linear-gradient(to bottom right, var(--bg-gradient-start), var(--bg-gradient-via), var(--bg-gradient-end))' }} data-theme={theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --transition-speed: 0.3s;
        }

        /* Dark Theme */
        [data-theme="dark"] {
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --bg-gradient-start: #0f172a;
          --bg-gradient-via: #581c87;
          --bg-gradient-end: #0f172a;
          --text-primary: #ffffff;
          --text-secondary: rgba(255, 255, 255, 0.7);
          --text-tertiary: rgba(255, 255, 255, 0.5);
          --border-color: rgba(255, 255, 255, 0.1);
          --card-bg: rgba(255, 255, 255, 0.05);
          --card-hover-bg: rgba(255, 255, 255, 0.1);
          --blob-1: #FF6B6B;
          --blob-2: #4ECDC4;
          --blob-3: #FFE66D;
        }

        /* Light Theme */
        [data-theme="light"] {
          --bg-primary: #f8fafc;
          --bg-secondary: #e2e8f0;
          --bg-gradient-start: #fce7f3;
          --bg-gradient-via: #ddd6fe;
          --bg-gradient-end: #e0f2fe;
          --text-primary: #0f172a;
          --text-secondary: #334155;
          --text-tertiary: #64748b;
          --border-color: rgba(0, 0, 0, 0.1);
          --card-bg: rgba(255, 255, 255, 0.8);
          --card-hover-bg: rgba(255, 255, 255, 0.95);
          --blob-1: rgba(255, 107, 107, 0.3);
          --blob-2: rgba(78, 205, 196, 0.3);
          --blob-3: rgba(255, 230, 109, 0.3);
        }

        body {
          font-family: 'Space Mono', monospace;
          overflow-x: hidden;
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .slide-in-left {
          animation: slideInLeft 0.5s ease-out;
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.8); }
          50% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }

        .glow {
          box-shadow: 0 0 20px rgba(255, 107, 107, 0.5), 0 0 40px rgba(78, 205, 196, 0.3);
        }

        .project-card:hover {
          transform: translateY(-8px) rotate(1deg);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .masonry-grid {
          column-count: 3;
          column-gap: 1rem;
        }

        @media (max-width: 1024px) {
          .masonry-grid { column-count: 2; }
        }

        @media (max-width: 640px) {
          .masonry-grid { column-count: 1; }
        }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #FF6B6B, #4ECDC4, #FFE66D, #95E1D3);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 6s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: float 8s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .photo-hover {
          transition: all 0.3s ease;
        }

        .photo-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .star-rating {
          display: inline-flex;
          gap: 0.25rem;
        }

        .star {
          cursor: pointer;
          transition: all 0.2s;
        }

        .star:hover {
          transform: scale(1.2);
        }

        .like-button {
          transition: all 0.3s;
        }

        .like-button.liked {
          animation: heartBeat 0.5s ease;
        }

        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.3); }
          50% { transform: scale(1.1); }
        }
      `}</style>

      {/* Animated Background Blobs */}
      <div className="blob" style={{ top: '10%', left: '10%', width: '300px', height: '300px', background: 'var(--blob-1)' }}></div>
      <div className="blob" style={{ top: '60%', right: '10%', width: '400px', height: '400px', background: 'var(--blob-2)', animationDelay: '2s' }}></div>
      <div className="blob" style={{ bottom: '10%', left: '30%', width: '350px', height: '350px', background: 'var(--blob-3)', animationDelay: '4s' }}></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-colors" style={{ backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            YOUR NAME
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentSection === item.id
                    ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white'
                    : 'hover:bg-opacity-10'
                }`}
                style={{ color: currentSection === item.id ? 'white' : 'var(--text-secondary)' }}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
            
            {/* Theme Switcher */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-3 rounded-lg font-semibold transition-all hover:scale-110"
              style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ backgroundColor: 'var(--card-bg)' }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden backdrop-blur-xl border-t slide-in-left" style={{ backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)', borderColor: 'var(--border-color)' }}>
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentSection(item.id); setMenuOpen(false); }}
                className={`w-full px-6 py-4 text-left font-semibold transition-all ${
                  currentSection === item.id ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white' : ''
                }`}
                style={{ color: currentSection === item.id ? 'white' : 'var(--text-secondary)' }}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setMenuOpen(false); }}
              className="w-full px-6 py-4 text-left font-semibold transition-all"
              style={{ color: 'var(--text-secondary)' }}
            >
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-24 relative z-10">
        {/* HOME SECTION */}
        {currentSection === 'home' && (
          <section className="min-h-screen flex items-center justify-center px-6 fade-in">
            <div className="max-w-6xl text-center">
              <div className="mb-8 bounce-in">
                <div className="inline-block p-8 rounded-full bg-gradient-to-br from-pink-500 to-cyan-500 glow">
                  <span className="text-6xl">🚀</span>
                </div>
              </div>
              <h2 className="text-6xl md:text-8xl font-bold mb-6 gradient-text" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                Multi-Disciplinary Creative
              </h2>
              <p className="text-xl md:text-2xl mb-12" style={{ color: 'var(--text-secondary)' }}>
                Web Developer • Designer • Photographer
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="px-6 py-3 bg-gradient-to-r from-pink-500/20 to-pink-500/10 border border-pink-500/50 rounded-full" style={{ color: 'var(--text-primary)' }}>
                  <Code className="inline mr-2" size={20} />
                  Code
                </div>
                <div className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 border border-cyan-500/50 rounded-full" style={{ color: 'var(--text-primary)' }}>
                  <Palette className="inline mr-2" size={20} />
                  Design
                </div>
                <div className="px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border border-yellow-500/50 rounded-full" style={{ color: 'var(--text-primary)' }}>
                  <Camera className="inline mr-2" size={20} />
                  Photography
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setCurrentSection('projects')}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all hover:scale-105 text-white"
                >
                  View My Work
                </button>
                <button
                  onClick={() => setCurrentSection('gallery')}
                  className="px-8 py-4 backdrop-blur-lg border rounded-xl font-bold text-lg transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  Photo Gallery
                </button>
              </div>
            </div>
          </section>
        )}

        {/* PROJECTS SECTION */}
        {currentSection === 'projects' && (
          <section className="min-h-screen px-6 py-12 fade-in">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                Featured Projects
              </h2>
              <p className="text-xl mb-12" style={{ color: 'var(--text-secondary)' }}>A showcase of my latest work across development and design</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="project-card backdrop-blur-lg border rounded-2xl p-8 transition-all"
                    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-6xl mb-4">{project.image}</div>
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500/30 to-cyan-500/30 rounded-full text-sm mb-4">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Clash Display', sans-serif", color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
                    <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all text-white">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* BLOG SECTION */}
        {currentSection === 'blog' && !selectedPost && (
          <section className="min-h-screen px-6 py-12 fade-in">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                Blog & Articles
              </h2>
              <p className="text-xl mb-12" style={{ color: 'var(--text-secondary)' }}>Thoughts on design, development, and photography</p>
              
              <div className="space-y-6">
                {blogPosts.map((post, index) => (
                  <article
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="backdrop-blur-lg border rounded-2xl p-8 transition-all hover:shadow-xl cursor-pointer slide-in-left"
                    style={{ 
                      backgroundColor: 'var(--card-bg)', 
                      borderColor: 'var(--border-color)',
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Clash Display', sans-serif", color: 'var(--text-primary)' }}>
                          {post.title}
                        </h3>
                        <div className="flex gap-4 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                          <span>📅 {post.date}</span>
                          <span>⏱️ {post.readTime} read</span>
                          {postRatings[post.id] && <span>⭐ {postRatings[post.id]}/5</span>}
                        </div>
                      </div>
                      <BookOpen className="text-pink-400" size={32} />
                    </div>
                    <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
                    <button className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                      Read Full Article →
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FULL BLOG POST VIEW */}
        {currentSection === 'blog' && selectedPost && (
          <section className="min-h-screen px-6 py-12 fade-in">
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="mb-6 px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
              >
                ← Back to Articles
              </button>

              {/* Article Content */}
              <article className="backdrop-blur-lg border rounded-2xl p-8 mb-8" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                  {selectedPost.title}
                </h1>
                <div className="flex gap-6 text-sm mb-8" style={{ color: 'var(--text-tertiary)' }}>
                  <span>📅 {selectedPost.date}</span>
                  <span>⏱️ {selectedPost.readTime} read</span>
                </div>
                <div className="prose prose-lg max-w-none mb-8" style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                  {selectedPost.content}
                </div>
              </article>

              {/* Rating Section */}
              <div className="backdrop-blur-lg border rounded-2xl p-8 mb-8" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Clash Display', sans-serif", color: 'var(--text-primary)' }}>
                  Rate This Article
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        className="star text-4xl cursor-pointer"
                        onClick={() => ratePost(selectedPost.id, star)}
                        style={{ color: (postRatings[selectedPost.id] >= star) ? '#FFE66D' : '#ccc' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {postRatings[selectedPost.id] && (
                    <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {postRatings[selectedPost.id]}/5
                    </span>
                  )}
                </div>
                {postRatings[selectedPost.id] && (
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Thank you for rating!</p>
                )}
              </div>

              {/* Feedback Section */}
              <div className="backdrop-blur-lg border rounded-2xl p-8 mb-8" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Clash Display', sans-serif", color: 'var(--text-primary)' }}>
                  Leave Your Feedback
                </h3>
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={feedbackForm.name}
                    onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email (optional)"
                    value={feedbackForm.email}
                    onChange={(e) => setFeedbackForm({...feedbackForm, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                  <textarea
                    placeholder="Your Comment *"
                    value={feedbackForm.comment}
                    onChange={(e) => setFeedbackForm({...feedbackForm, comment: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
                    style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>
                <button
                  onClick={() => submitFeedback(selectedPost.id)}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg font-semibold text-white hover:shadow-lg transition-all"
                >
                  Submit Feedback
                </button>
              </div>

              {/* Display Feedback */}
              {postFeedback[selectedPost.id] && postFeedback[selectedPost.id].length > 0 && (
                <div className="backdrop-blur-lg border rounded-2xl p-8" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
                  <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Clash Display', sans-serif", color: 'var(--text-primary)' }}>
                    Reader Feedback ({postFeedback[selectedPost.id].length})
                  </h3>
                  <div className="space-y-4">
                    {postFeedback[selectedPost.id].map(feedback => (
                      <div key={feedback.id} className="border-l-4 border-pink-500 pl-4 py-2">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{feedback.name}</p>
                          <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{feedback.date}</span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>{feedback.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* GALLERY SECTION */}
        {currentSection === 'gallery' && (
          <section className="min-h-screen px-6 py-12 fade-in">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    Photography
                  </h2>
                  <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>Capturing moments through my lens</p>
                </div>
                
                {/* View Mode Toggles */}
                <div className="flex gap-2 mt-4 md:mt-0 backdrop-blur-lg rounded-xl p-2" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <button
                    onClick={() => setGalleryView('grid')}
                    className={`px-4 py-2 rounded-lg transition-all ${galleryView === 'grid' ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white' : ''}`}
                    style={galleryView !== 'grid' ? { color: 'var(--text-secondary)' } : {}}
                    title="Grid View"
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setGalleryView('masonry')}
                    className={`px-4 py-2 rounded-lg transition-all ${galleryView === 'masonry' ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white' : ''}`}
                    style={galleryView !== 'masonry' ? { color: 'var(--text-secondary)' } : {}}
                    title="Masonry View"
                  >
                    <Layout size={20} />
                  </button>
                  <button
                    onClick={() => { setGalleryView('slideshow'); setSlideshowIndex(0); }}
                    className={`px-4 py-2 rounded-lg transition-all ${galleryView === 'slideshow' ? 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white' : ''}`}
                    style={galleryView !== 'slideshow' ? { color: 'var(--text-secondary)' } : {}}
                    title="Slideshow"
                  >
                    <Maximize2 size={20} />
                  </button>
                </div>
              </div>

              {/* Grid View */}
              {galleryView === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sortedPhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className={`relative overflow-hidden rounded-xl photo-hover group ${photo.tall ? 'md:row-span-2' : ''}`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {photo.type === 'video' ? (
                        <video
                          src={photo.src}
                          poster={photo.poster}
                          className="w-full h-64 md:h-80 object-cover cursor-pointer"
                          onClick={() => setSelectedImage(photo)}
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.target.play()}
                          onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                        />
                      ) : (
                        <img
                          src={photo.src}
                          alt={photo.title}
                          className="w-full h-64 md:h-80 object-cover cursor-pointer"
                          onClick={() => setSelectedImage(photo)}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); togglePhotoLike(photo.id); }}
                            className={`p-2 rounded-full backdrop-blur-lg transition-all ${photoLikes[photo.id] ? 'like-button liked' : ''}`}
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                          >
                            <span className="text-2xl">{photoLikes[photo.id] ? '❤️' : '🤍'}</span>
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); downloadImage(photo.src, photo.title); }}
                            className="p-2 rounded-full backdrop-blur-lg transition-all hover:scale-110"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                          >
                            <span className="text-2xl">⬇️</span>
                          </button>
                        </div>
                        <div>
                          <p className="text-white font-semibold flex items-center gap-2">
                            {photo.type === 'video' && '🎥'} {photo.title}
                          </p>
                          {photoLikes[photo.id] > 0 && (
                            <p className="text-white/70 text-sm">❤️ {photoLikes[photo.id]} {photoLikes[photo.id] === 1 ? 'like' : 'likes'}</p>
                          )}
                        </div>
                      </div>
                      {/* Most Liked Badge */}
                      {index === 0 && photoLikes[photo.id] > 0 && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full text-white text-sm font-bold">
                          🏆 Most Liked
                        </div>
                      )}
                      {/* Video Indicator */}
                      {photo.type === 'video' && (
                        <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                          🎥 Video
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Masonry View */}
              {galleryView === 'masonry' && (
                <div className="masonry-grid">
                  {sortedPhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="masonry-item relative overflow-hidden rounded-xl photo-hover group"
                    >
                      {photo.type === 'video' ? (
                        <video
                          src={photo.src}
                          poster={photo.poster}
                          className="w-full object-cover cursor-pointer"
                          onClick={() => setSelectedImage(photo)}
                          muted
                          loop
                          playsInline
                          onMouseEnter={(e) => e.target.play()}
                          onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                        />
                      ) : (
                        <img
                          src={photo.src}
                          alt={photo.title}
                          className="w-full object-cover cursor-pointer"
                          onClick={() => setSelectedImage(photo)}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); togglePhotoLike(photo.id); }}
                            className={`p-2 rounded-full backdrop-blur-lg transition-all ${photoLikes[photo.id] ? 'like-button liked' : ''}`}
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                          >
                            <span className="text-2xl">{photoLikes[photo.id] ? '❤️' : '🤍'}</span>
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); downloadImage(photo.src, photo.title); }}
                            className="p-2 rounded-full backdrop-blur-lg transition-all hover:scale-110"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                          >
                            <span className="text-2xl">⬇️</span>
                          </button>
                        </div>
                        <div>
                          <p className="text-white font-semibold flex items-center gap-2">
                            {photo.type === 'video' && '🎥'} {photo.title}
                          </p>
                          {photoLikes[photo.id] > 0 && (
                            <p className="text-white/70 text-sm">❤️ {photoLikes[photo.id]} {photoLikes[photo.id] === 1 ? 'like' : 'likes'}</p>
                          )}
                        </div>
                      </div>
                      {/* Most Liked Badge */}
                      {index === 0 && photoLikes[photo.id] > 0 && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full text-white text-sm font-bold">
                          🏆 Most Liked
                        </div>
                      )}
                      {/* Video Indicator */}
                      {photo.type === 'video' && (
                        <div className="absolute top-4 right-4 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                          🎥 Video
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Slideshow View */}
              {galleryView === 'slideshow' && (
                <div className="relative h-[600px] rounded-2xl overflow-hidden" style={{ backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)' }}>
                  {sortedPhotos[slideshowIndex].type === 'video' ? (
                    <video
                      src={sortedPhotos[slideshowIndex].src}
                      poster={sortedPhotos[slideshowIndex].poster}
                      className="w-full h-full object-contain"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={sortedPhotos[slideshowIndex].src}
                      alt={sortedPhotos[slideshowIndex].title}
                      className="w-full h-full object-contain"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <h3 className="text-3xl font-bold mb-2 text-white flex items-center gap-2" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                      {sortedPhotos[slideshowIndex].type === 'video' && '🎥'} {sortedPhotos[slideshowIndex].title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <p className="text-white/70">{slideshowIndex + 1} / {sortedPhotos.length}</p>
                      {photoLikes[sortedPhotos[slideshowIndex].id] > 0 && (
                        <p className="text-white/70">❤️ {photoLikes[sortedPhotos[slideshowIndex].id]} {photoLikes[sortedPhotos[slideshowIndex].id] === 1 ? 'like' : 'likes'}</p>
                      )}
                      {sortedPhotos[slideshowIndex].type === 'video' && (
                        <span className="text-white/70 text-sm">• Video</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Slideshow Controls */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => togglePhotoLike(sortedPhotos[slideshowIndex].id)}
                      className={`p-3 backdrop-blur-lg rounded-full transition-all ${photoLikes[sortedPhotos[slideshowIndex].id] ? 'like-button liked' : ''}`}
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      <span className="text-3xl">{photoLikes[sortedPhotos[slideshowIndex].id] ? '❤️' : '🤍'}</span>
                    </button>
                    <button
                      onClick={() => downloadImage(sortedPhotos[slideshowIndex].src, sortedPhotos[slideshowIndex].title)}
                      className="p-3 backdrop-blur-lg rounded-full transition-all hover:scale-110"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      <span className="text-3xl">⬇️</span>
                    </button>
                  </div>
                  
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 backdrop-blur-lg rounded-full transition-all"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <ChevronLeft size={32} className="text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 backdrop-blur-lg rounded-full transition-all"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                  >
                    <ChevronRight size={32} className="text-white" />
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-xl flex items-center justify-center p-4"
          style={{ backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)' }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full bounce-in" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 backdrop-blur-lg rounded-full transition-all"
              style={{ backgroundColor: 'var(--card-bg)' }}
            >
              <X size={24} style={{ color: 'var(--text-primary)' }} />
            </button>
            {selectedImage.type === 'video' ? (
              <video
                src={selectedImage.src}
                poster={selectedImage.poster}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
                controls
                autoPlay
                loop
                playsInline
              />
            ) : (
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
            )}
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold gradient-text mb-4 flex items-center justify-center gap-2" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                {selectedImage.type === 'video' && '🎥'} {selectedImage.title}
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => togglePhotoLike(selectedImage.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${photoLikes[selectedImage.id] ? 'like-button liked' : ''}`}
                  style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
                >
                  {photoLikes[selectedImage.id] ? '❤️' : '🤍'} {photoLikes[selectedImage.id] > 0 ? photoLikes[selectedImage.id] : ''} Like
                </button>
                <button
                  onClick={() => downloadImage(selectedImage.src, selectedImage.title)}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-xl font-semibold text-white hover:shadow-lg transition-all"
                >
                  ⬇️ Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 border-t backdrop-blur-lg mt-20" style={{ borderColor: 'var(--border-color)', backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)' }}>
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h3 className="text-3xl font-bold mb-4 gradient-text" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            Let's Create Together
          </h3>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Get in touch for collaborations and creative projects</p>
          <div className="flex justify-center gap-4 mb-8">
            <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all text-white">
              Email Me
            </button>
            <button className="px-6 py-3 backdrop-blur-lg border rounded-xl font-semibold transition-all" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              Download Resume
            </button>
          </div>
          <div className="flex justify-center gap-6" style={{ color: 'var(--text-tertiary)' }}>
            <a href="#" className="hover:text-pink-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Instagram</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Dribbble</a>
          </div>
          <p className="mt-8 text-sm" style={{ color: 'var(--text-tertiary)' }}>© 2024 Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
