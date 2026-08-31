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
`/var/www/mamleev.tech`.

Build and publish:

```bash
npm run build && rsync -az --delete out/ root@37.139.62.23:/var/www/mamleev.tech/
```

Do not run `npm run build` while `npm run dev` is running — both use `.next`
and the dev server will start returning 500s when the build replaces it.

### Why this host needs an unusual vhost

Port 443 on this machine does not belong to the http context. It is bound by an
nginx **stream** SNI router (`/etc/nginx/stream.d/stream_proxy.conf`) that reads
SNI from the ClientHello and forwards each connection to the right backend for
several unrelated production domains, which terminate TLS themselves.

A `listen 443 ssl` in the http context therefore does not "add" a vhost — it
opens a second socket on a port the router already `reuseport`-binds, and the
kernel starts splitting incoming connections between the two. Roughly half of
every proxied domain's traffic then lands on the wrong server block. Running
`certbot --nginx` here does exactly that, because its nginx *installer* adds
that listen directive.

So this site follows the same pattern as `cdn3ru.getfloorplan.tech`: the TLS
server listens on loopback and is reached only through the router.

`/etc/nginx/conf.d/mamleev.tech.conf`:

```nginx
server {
    listen 127.0.0.1:9444 ssl proxy_protocol;
    server_name mamleev.tech www.mamleev.tech;

    set_real_ip_from 127.0.0.1;
    real_ip_header proxy_protocol;

    root /var/www/mamleev.tech;
    ssl_certificate     /etc/letsencrypt/live/mamleev.tech/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mamleev.tech/privkey.pem;

    location / { try_files $uri $uri.html $uri/index.html /404.html; }
    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable" always;
    }
}

server {
    listen 80;
    server_name mamleev.tech www.mamleev.tech;
    location ^~ /.well-known/acme-challenge/ { root /var/www/mamleev.tech; }
    location / { return 301 https://$host$request_uri; }
}
```

And the router's SNI map carries:

```
mamleev.tech     127.0.0.1:9444;
www.mamleev.tech 127.0.0.1:9444;
```

`try_files` needs the `$uri.html` entry because the export writes `404.html`
and `_not-found.html` as flat files rather than directories.

After changing the vhost: `nginx -t && systemctl reload nginx`. Then confirm
`ss -lntp | grep :443` still shows only the stream router.

### TLS

Let's Encrypt, covering `mamleev.tech` and `www.mamleev.tech`.

Renewal uses the **webroot** authenticator with `installer = None`, not
`--nginx`, for the reason above; the host's global
`renewal-hooks/deploy/reload-nginx.sh` reloads nginx after a renewal. Never
re-run `certbot --nginx` against this lineage.

```bash
certbot renew --cert-name mamleev.tech --dry-run
```

## Layout

```
app/         page.tsx (all content + copy), layout.tsx (metadata, JSON-LD), globals.css
components/  SplitFlapText, BorderGlow, ColorBends — the three visual effects
public/      portrait, editorial photo, logos, favicon
```

Site copy for both languages lives in the `content` object at the top of
`app/page.tsx`. Language is chosen client-side from `localStorage`, falling
back to the browser locale.
