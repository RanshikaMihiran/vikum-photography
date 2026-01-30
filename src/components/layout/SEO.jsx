import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  // Default values if you forget to pass props
  const siteTitle = "Vikum Photography | Sri Lanka";
  const defaultDescription = "Professional wedding, engagement, and lifestyle photographer based in Sri Lanka. Capturing your timeless legacies.";
  const siteUrl = "https://www.vikumphotography.com"; // REPLACE WITH YOUR REAL DOMAIN
  const defaultImage = "https://www.vikumphotography.com/social-share.jpg"; // REPLACE WITH REAL DOMAIN

  const metaTitle = title ? `${title} | Vikum Photography` : siteTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image ? `${siteUrl}${image}` : defaultImage; // Ensures absolute URL
  const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* --- Standard Metadata --- */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords || "photography, wedding, sri lanka, portrait, engagement, colombo photographer"} />
      <link rel="canonical" href={metaUrl} />

      {/* --- Facebook / WhatsApp / LinkedIn (Open Graph) --- */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content="Vikum Photography" />

      {/* --- Twitter Cards --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
};

export default SEO;