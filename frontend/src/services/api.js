const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export async function generateCode(prompt, language) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, language })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to generate code');
  }
  return res.json();
}

export async function fetchHistory() {
  const res = await fetch(`${API_BASE}/generate/history`);
  if (!res.ok) throw new Error('Failed to fetch history');
  return res.json();
}

export async function deleteGeneration(id) {
  const res = await fetch(`${API_BASE}/generate/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete entry');
  return res.json();
}
