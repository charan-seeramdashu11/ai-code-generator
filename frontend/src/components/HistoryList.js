import React from 'react';

export default function HistoryList({ items, onSelect, onDelete }) {
  if (!items.length) {
    return <p className="history-empty">No past generations yet.</p>;
  }

  return (
    <ul className="history-list">
      {items.map((item) => (
        <li key={item._id}>
          <button className="history-item" onClick={() => onSelect(item)}>
            <span className="history-lang">{item.language}</span>
            <span className="history-prompt">{item.prompt.slice(0, 60)}</span>
          </button>
          <button className="history-delete" onClick={() => onDelete(item._id)}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
