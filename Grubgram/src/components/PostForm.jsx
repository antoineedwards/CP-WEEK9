import { useState } from 'react';

export default function PostForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [imageUrl, setImageUrl] = useState(initialData.image_url || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, image_url: imageUrl });
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="post-form"
    style={{display:'flex', flexDirection:'column', alignItems:'center'}}
    >
      <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        style={{margin:'10px'}}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's the recipe?"
        style={{margin:'10px'}}
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
        style={{margin:'10px'}}
      />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}
