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

## Deploy (nginx)

Copy `out/` to the server and point a root at it:

```nginx
server {
    listen 443 ssl http2;
    server_name mamleev.tech;

    root /var/www/mamleev.tech;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/index.html /404.html;
    }

    # Fingerprinted build assets are safe to cache forever.
    location /_next/static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(jpg|svg|png|webp)$ {
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

`try_files` needs the `$uri.html` entry because the export writes `404.html`
and `_not-found.html` as flat files rather than directories.

## Layout

```
app/         page.tsx (all content + copy), layout.tsx (metadata, JSON-LD), globals.css
components/  SplitFlapText, BorderGlow, ColorBends — the three visual effects
public/      portrait, editorial photo, logos, favicon
```

Site copy for both languages lives in the `content` object at the top of
`app/page.tsx`. Language is chosen client-side from `localStorage`, falling
back to the browser locale.
