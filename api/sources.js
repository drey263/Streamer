import { upstreamFetch } from './_upstream.js';

export default async function handler(req, res) {
  const { id, season, episode, detailPath } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing query param: id' });

  const params = new URLSearchParams();
  if (season && episode) {
    params.set('season', season);
    params.set('episode', episode);
  }
  if (detailPath) params.set('detailPath', detailPath);
  const qs = params.toString();

  const path = `/api/sources/${encodeURIComponent(id)}${qs ? `?${qs}` : ''}`;

  try {
    const r = await upstreamFetch(path);
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Upstream fetch failed', message: e.message });
  }
}
