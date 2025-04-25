export default function Comment({ comment }) {
    return (
      <div className="comment">
        <p>{comment.content}</p>
        <small>— {comment.username || 'Anonymous'}</small>
      </div>
    );
  }
  