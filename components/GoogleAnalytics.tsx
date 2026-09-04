import Script from "next/script";

const MEASUREMENT_ID = "G-SM0Y2VX84P";

// Loaded after hydration so it stays off the critical path. Skipped outside a
// production build so `npm run dev` does not report hits into the property.
export default function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
