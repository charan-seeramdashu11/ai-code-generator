import React, { useState } from 'react';

const LANGUAGES = [
  'javascript',
  'python',
  'java',
  'c++',
  'typescript',
  'go',
  'sql'
];

export default function CodeGeneratorForm({ onGenerate, loading }) {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGenerate(prompt, language);
  };

  return (
    <form className="generator-form" onSubmit={handleSubmit}>
      <label htmlFor="prompt">Describe the code you need</label>
      <textarea
        id="prompt"
        rows={5}
        placeholder="e.g. Write a function that reverses a linked list"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="form-row">
        <label htmlFor="language">Language</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Code'}
        </button>
      </div>
    </form>
  );
}
