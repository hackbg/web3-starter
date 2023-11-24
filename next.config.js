/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  async redirects() {
    return [
      {
        source: '/demo',
        destination: '/demo/network',
        permanent: true,
      },
    ]
  },
}
