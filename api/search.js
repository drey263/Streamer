import { upstreamFetch } from './_upstream.js';

export default async function handler(req, res) {
  const q = (req.query.q || '').toString().trim();
  if (!q) return res.status(400).json({ error: 'Missing query param: q' });

  try {
    const r = await upstreamFetch(`/api/search/${encodeURIComponent(q)}`);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Upstream fetch failed', message: e.message });
  }
}
