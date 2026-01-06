import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: false, // Strict Mode 비활성화 (useEffect 중복 실행 방지)
	async redirects() {
		return [
			{
				source: '/',
				destination: '/main', // 원하는 경로
				permanent: false, // 301 redirect (false면 307)
			},
		];
	},
};

export default nextConfig;
