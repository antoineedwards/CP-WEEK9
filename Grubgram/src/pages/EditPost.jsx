import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import PostForm from '../components/PostForm';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase.from('posts').select('*').eq('id', id).single();
      setPost(data);
    }
    fetchPost();
  }, [id]);

  async function handleSubmit(updatedPost) {
    await supabase.from('posts').update(updatedPost).eq('id', id);
    navigate(`/post/${id}`);
  }

  if (!post) return <p>Loading post...</p>;

  return (
    <div>
      <h2>Edit Recipe</h2>
      <PostForm initialData={post} onSubmit={handleSubmit} />
    </div>
  );
}