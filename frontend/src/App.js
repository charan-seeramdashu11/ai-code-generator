import React, { useEffect, useState } from 'react';
import './App.css';
import CodeGeneratorForm from './components/CodeGeneratorForm';
import CodeOutput from './components/CodeOutput';
import HistoryList from './components/HistoryList';
import { generateCode, fetchHistory, deleteGeneration } from './services/api';

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const loadHistory = async () => {
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleGenerate = async (prompt, language) => {
    setLoading(true);
    setError('');
    try {
      const data = await generateCode(prompt, language);
      setResult(data);
      loadHistory();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item) => {
    setResult(item);
    setError('');
  };

  const handleDelete = async (id) => {
    await deleteGeneration(id);
    loadHistory();
  };

  return (
    <div className="app">
      <header>
        <h1>AI Code Generator</h1>
        <p>React + Node.js + Express + MongoDB</p>
      </header>

      <main>
        <section className="main-panel">
          <CodeGeneratorForm onGenerate={handleGenerate} loading={loading} />
          <CodeOutput
            code={result?.generatedCode}
            language={result?.language}
            error={error}
          />
        </section>

        <aside className="sidebar">
          <h2>History</h2>
          <HistoryList
            items={history}
            onSelect={handleSelectHistory}
            onDelete={handleDelete}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
