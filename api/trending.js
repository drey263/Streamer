import { upstreamFetch } from './_upstream.js';

export default async function handler(req, res) {
  try {
    const r = await upstreamFetch('/api/trending');
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Upstream fetch failed', message: e.message });
  }
}
