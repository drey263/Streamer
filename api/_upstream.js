// Shared helper: every proxy function forwards to the real MovieBox/Cinexora
// backend with a spoofed Referer/Origin so it looks like the request is
// coming from the real Cinexora site, not a browser hitting the API directly.

export const UPSTREAM_BASE = 'https://moviebox-api-1-u2go.onrender.com';
export const FAKE_ORIGIN = 'https://cinexora-static-alpha.vercel.app';

export async function upstreamFetch(path, { binary = false } = {}) {
  const res = await fetch(`${UPSTREAM_BASE}${path}`, {
    headers: {
      'Referer': `${FAKE_ORIGIN}/`,
      'Origin': FAKE_ORIGIN,
      'Accept': binary ? '*/*' : 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    },
  });
  return res;
}
