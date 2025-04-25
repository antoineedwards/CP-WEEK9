export default function UpvoteButton({ count, onUpvote }) {
    return (
      <button onClick={onUpvote} className="upvote-button">
        👍 {count}
      </button>
    );
  }