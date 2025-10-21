export default function InputURL({ url, setURL }) {
  return (
    <input
      type="text"
      placeholder="Paste Instagram Reels URL"
      value={url}
      onChange={e => setURL(e.target.value)}
    />
  );
}
