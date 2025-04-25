import PostForm from '../components/PostForm';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const navigate = useNavigate();

  async function handleSubmit(postData) {
    const { data } = await supabase.from('posts').insert([{ ...postData, upvotes: 0 }]).select();
    if (data && data[0]) {
      navigate(`/post/${data[0].id}`);
    }
  }

  return (
    <div>
      <h2>Create a New Recipe</h2>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}
