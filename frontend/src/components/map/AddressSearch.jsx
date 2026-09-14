import { useState } from "react";
import { searchAddresses } from "../../api/geocodingApi";
import Icon from "../ui/Icon";

export default function AddressSearch({ onLocationSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (query.trim().length < 2) return;
    setLoading(true); setError("");
    try { setResults(await searchAddresses(query)); }
    catch (requestError) { setResults([]); setError(requestError.message); }
    finally { setLoading(false); }
  }

  function selectResult(result) { setQuery(result.label); setResults([]); onLocationSelect(result); }

  return (
    <div className="address-search">
      <form onSubmit={handleSubmit} className="search-box">
        <Icon name="search" size={18} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm địa chỉ ở Hà Nội..." aria-label="Tìm địa chỉ" />
        {query && <button type="button" className="search-clear" onClick={() => { setQuery(""); setResults([]); }}><Icon name="close" size={15} /></button>}
        <button className="search-submit" type="submit" disabled={loading || query.trim().length < 2}>{loading ? "..." : "Tìm"}</button>
      </form>
      {error && <p className="address-search-error">{error}</p>}
      {results.length > 0 && <ul className="address-results">{results.map((result) => <li key={`${result.lat}-${result.lng}`}><button type="button" onClick={() => selectResult(result)}><Icon name="target" size={15} /><span>{result.label}</span></button></li>)}</ul>}
    </div>
  );
}
