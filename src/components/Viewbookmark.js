import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewBookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user')); 

    if (!currentUser) {
      navigate('/login'); 
      return;
    }

    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const userBookmarks = storedBookmarks.filter(bookmark => bookmark.username === currentUser.username); // Filter bookmarks for the logged-in user
    setBookmarks(userBookmarks);
  }, [navigate]);

  // Filter bookmarks based on the search term
  const filteredBookmarks = bookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const perPage = 3;
  const totalPages = Math.ceil(filteredBookmarks.length / perPage);
  const currentBookmarks = filteredBookmarks.slice((page - 1) * perPage, page * perPage);

  const handleEdit = (bookmark) => {
    navigate('/edit', { state: { bookmark } });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this bookmark?");
    if (confirmed) {
      const updatedBookmarks = bookmarks.filter(b => b.id !== id);
      setBookmarks(updatedBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="view-bookmark container mt-5">
      <h2 className="text-center mb-4">View Bookmarks</h2>
      
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
        />
      </div>

      {currentBookmarks.length > 0 ? (
        currentBookmarks.map((bookmark) => (
          <div key={bookmark.id} className="bookmark-item mb-3 p-3 border rounded">
            <h3>{bookmark.title}</h3>
            <p>{bookmark.url}</p>
            <p>Added on: {new Date(bookmark.addedAt).toLocaleString()}</p>
            <button className="btn btn-warning me-2" onClick={() => handleEdit(bookmark)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(bookmark.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No bookmarks found. Add some bookmarks to view here!</p>
      )}

      {/* Pagination controls */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button className="btn btn-secondary me-2" onClick={goToPreviousPage} disabled={page === 1}>
          Prev
        </button>
        <span className="mx-2">Page {page} of {totalPages}</span>
        <button className="btn btn-secondary ms-2" onClick={goToNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewBookmark;
