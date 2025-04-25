export default function SortFilterBar({ sort, setSort, search, setSearch }) {
    return (
      <div className="sort-filter-bar">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="new">Newest</option>
          <option value="top">Top Upvoted</option>
        </select>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    );
  }