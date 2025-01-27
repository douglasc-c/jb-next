import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pictures-compliance.fra1.digitaloceanspaces.com',
        pathname: '/**', // Permite todas as imagens neste endpoint
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**', // Permite todas as imagens neste endpoint
      },
    ],
  },
}

export default withNextIntl(nextConfig)
