import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import Comment from '../components/Comment';
import UpvoteButton from '../components/UpvoteButton';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatDate } from '../utils/formatDate';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: postData } = await supabase.from('posts').select('*').eq('id', id).single();
      const { data: commentsData } = await supabase.from('comments').select('*').eq('post_id', id).order('created_at', { ascending: true });
      setPost(postData);
      setComments(commentsData);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  async function handleUpvote() {
    const { data } = await supabase.rpc('increment_upvotes', { row_id: id });
    setPost(prev => ({ ...prev, upvotes: (prev.upvotes || 0) + 1 }));
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    const { data } = await supabase.from('comments').insert([{ content: newComment, post_id: id }]).select();
    setComments(prev => [...prev, ...data]);
    setNewComment('');
  }

  async function handleDelete() {
    await supabase.from('posts').delete().eq('id', id);
    navigate('/');
  }

  if (loading) return <LoadingSpinner />;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{formatDate(post.created_at)}</p>
      {post.image_url && <img src={post.image_url} alt="Post image" />}
      <p>{post.content}</p>
      <div>
      <div className="post-actions" style={{display:'flex'}}>
      <UpvoteButton count={post.upvotes} onUpvote={handleUpvote} />
        <Link to={`/edit/${post.id}`}><button>Edit</button></Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
      </div>

      <hr />
      <h3>Comments</h3>
      {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}