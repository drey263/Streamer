import { upstreamFetch } from './_upstream.js';

// Proxies images too, in case the upstream blocks hotlinked <img src> the
// same way it blocks direct API navigation. If plain <img src="..."> to the
// original image URLs works fine in testing, this endpoint isn't needed —
// the frontend already prefers the original URL and only falls back to this.
export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send('Missing query param: url');

  try {
    const r = await upstreamFetch(`/api/imgproxy?url=${encodeURIComponent(url)}`, { binary: true });
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', r.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.status(r.status).send(buf);
  } catch (e) {
    res.status(502).send('Upstream fetch failed');
  }
}
