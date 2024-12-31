import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/EditBookmark.css'; 

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookmark } = location.state; // Get the bookmark passed via state

  const [title, setTitle] = useState(bookmark.title);
  const [url, setUrl] = useState(bookmark.url);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBookmark = { ...bookmark, title, url };

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const updatedBookmarks = bookmarks.map(b =>
      b.id === bookmark.id ? updatedBookmark : b
    );

    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    navigate('/viewbookmark');
  };

  return (
    <div className="edit-bookmark">
      <h2>Edit Bookmark</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
