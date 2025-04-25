import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SortFilterBar from '../components/SortFilterBar';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('new');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      let query = supabase.from('posts').select('*');
      if (sort === 'top') {
        query = query.order('upvotes', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }
      const { data } = await query;
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, [sort]);

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <img src='/src/assets/table.jpg' alt='Table with food'
      style={{width:'100%', margin:'0'}}/>
      <h1 style={{margin:'0 0 4rem 0'}}>Share Your Ideas With The World!</h1>
      <SortFilterBar sort={sort} setSort={setSort} search={search} setSearch={setSearch} />
      {loading ? <LoadingSpinner /> : filteredPosts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  );
}