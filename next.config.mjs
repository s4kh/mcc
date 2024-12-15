/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: "/api/:path*",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || "http://localhost:3000",
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET,POST",
              },
              {
                key: "Access-Control-Allow-Headers",
                value: "Content-Type, Authorization",
              },              
            ],
          },
          {
            source: "/(.*)",
            headers: [
              {
                key: "X-Frame-Options",
                value: "SAMEORIGIN",
              },
            ],
          },
        ];
      },
};

export default nextConfig;
