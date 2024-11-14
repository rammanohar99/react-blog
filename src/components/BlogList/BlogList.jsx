import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import BlogPost from '../BlogPost/BlogPost';
import Pagination from '../Pagination/Pagination';
import './BlogList.css';

function BlogList({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Simulate loading completion
    }, 2000); // Simulate a 2-second loading time
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearchTerm =
        post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      const matchesAuthor = selectedAuthor ? post.author === selectedAuthor : true;

      return matchesSearchTerm && matchesCategory && matchesAuthor;
    });
  }, [posts, debouncedSearchTerm, selectedCategory, selectedAuthor]);

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // Show loading spinner while data is loading
  }

  return (
    <div className="blog-list">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-select"
      >
        <option value="">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Travel">Travel</option>
      </select>
      <select
        value={selectedAuthor}
        onChange={(e) => setSelectedAuthor(e.target.value)}
        className="author-select"
      >
        <option value="">All Authors</option>
        {Array.from(new Set(posts.map(post => post.author))).map((author) => (
          <option key={author} value={author}>
            {author}
          </option>
        ))}
      </select>
      {currentPosts.map((post) => (
        <BlogPost key={post.id} {...post} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <select
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        className="items-per-page-select"
      >
        <option value={5}>5 items per page</option>
        <option value={10}>10 items per page</option>
        <option value={15}>15 items per page</option>
      </select>
    </div>
  );
}

BlogList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default BlogList;