import { upstreamFetch } from './_upstream.js';

export default async function handler(req, res) {
  const { id, detailPath } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing query param: id' });

  let path = `/api/info/${encodeURIComponent(id)}`;
  if (detailPath) path += `?detailPath=${encodeURIComponent(detailPath)}`;

  try {
    const r = await upstreamFetch(path);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Upstream fetch failed', message: e.message });
  }
}
