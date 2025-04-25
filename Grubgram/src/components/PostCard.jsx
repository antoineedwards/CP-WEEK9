import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
        <p>{formatDate(post.created_at)}</p>
        <p>Upvotes: {post.upvotes}</p>
      </Link>
    </div>
  );
}