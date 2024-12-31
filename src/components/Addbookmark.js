import React, { useState } from 'react';
import './css/AddBookmark.css'; 

const AddBookmark = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  // Function to add a bookmark
  const addBookmark = (title, url) => {
    const currentUser = JSON.parse(localStorage.getItem('user')); 

    if (!currentUser) {
      setError('Please log in to add bookmarks.');
      return;
    }

    const newBookmark = {
      id: Date.now(), 
      title,
      url,
      username: currentUser?.username,
      addedAt: new Date().toISOString(),
    };

    // Get existing bookmarks from localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    // Filter bookmarks for the current user
    const userBookmarks = bookmarks.filter(b => b.username === currentUser.username);

    // Check if the user already has 5 bookmarks
    if (userBookmarks.length >= 5) {
      setError('You can only add a maximum of 5 bookmarks!');
      return; 
    }

    // Add the new bookmark and save it to localStorage
    bookmarks.push(newBookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Clear the error if the bookmark was added successfully
    setError('');

    // Clear the input fields
    setTitle('');
    setUrl('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && url) {
      addBookmark(title, url);
    } else {
      setError("Please provide both title and URL");
    }
  };

  return (
    <div className="add-bookmark container mt-5">
      <h2 className="text-center mb-4">Add Bookmark</h2>

      <form onSubmit={handleSubmit} className="row">
        <div className="col-12 col-md-8 mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="col-12 col-md-8 mb-3">
          <label htmlFor="url" className="form-label">URL</label>
          <input
            type="url"
            id="url"
            className="form-control"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        {/* Display the error message inside the form */}
        {error && (
          <div className="col-12 mb-3">
            <div className="alert alert-danger">{error}</div>
          </div>
        )}

        <div className="col-12">
          <button type="submit" className="btn btn-success w-100" disabled={!!error}>
            Add Bookmark
          </button>
        </div>
      </form>










    </div>
  );
};

export default AddBookmark;
