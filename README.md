# mamleev.tech

Personal site of Ruslan Mamleev — CTO & Software Architect.

Single static page, bilingual (EN/RU), no backend.

## Stack

- Next.js App Router in static-export mode (`output: "export"`)
- React 19
- three.js for the animated background (`components/ColorBends`)
- Hand-written CSS in `app/globals.css` — no Tailwind, no UI framework

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Writes a self-contained static site to `out/`. No Node runtime is needed to
serve it.

## Deploy

The site is served by nginx on `sel-proxy-high` (37.139.62.23) from
`/var/www/mamleev.tech`. That host also fronts unrelated production domains, so
the vhost lives in its own file and matches `server_name` exactly rather than
acting as a default server.

Build and publish:

```bash
npm run build && rsync -az --delete out/ root@37.139.62.23:/var/www/mamleev.tech/
```

Do not run `npm run build` while `npm run dev` is running — both use `.next`
and the dev server will start returning 500s when the build replaces it.

The vhost is `/etc/nginx/conf.d/mamleev.tech.conf`. Its essentials:

```nginx
server {
    listen 80;
    server_name mamleev.tech www.mamleev.tech;
    root /var/www/mamleev.tech;
    index index.html;

    location ^~ /.well-known/acme-challenge/ { root /var/www/mamleev.tech; }

    location / { try_files $uri $uri.html $uri/index.html /404.html; }

    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable" always;
    }
}
```

`try_files` needs the `$uri.html` entry because the export writes `404.html`
and `_not-found.html` as flat files rather than directories.

After changing the vhost: `nginx -t && systemctl reload nginx`.

### TLS

Not issued yet. `mamleev.tech` still has an A record pointing at
95.163.244.138, so certbot cannot validate HTTP-01 against this host. Once the
A record for `mamleev.tech` and `www.mamleev.tech` points at 37.139.62.23:

```bash
certbot --nginx -d mamleev.tech -d www.mamleev.tech
```

The vhost already serves `/.well-known/acme-challenge/` from the site root, so
no further nginx changes are needed before requesting the certificate.

## Layout

```
app/         page.tsx (all content + copy), layout.tsx (metadata, JSON-LD), globals.css
components/  SplitFlapText, BorderGlow, ColorBends — the three visual effects
public/      portrait, editorial photo, logos, favicon
```

Site copy for both languages lives in the `content` object at the top of
`app/page.tsx`. Language is chosen client-side from `localStorage`, falling
back to the browser locale.
