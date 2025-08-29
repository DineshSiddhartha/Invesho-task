import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/products") // Calls Netlify Function
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🚀 Product Hunt Insights</h1>
      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: "1rem" }}>
          <h2>{p.name}</h2>
          <p>{p.tagline}</p>
          <p><strong>Upvotes:</strong> {p.votesCount}</p>
          <p><strong>Comments:</strong> {p.commentsCount}</p>
          <p><strong>Tags:</strong> {(p.topics || []).map(t => t.name).join(", ")}</p>
          <a href={p.website} target="_blank" rel="noreferrer">Visit</a>
        </div>
      ))}
    </div>
  );
}

export default App;
