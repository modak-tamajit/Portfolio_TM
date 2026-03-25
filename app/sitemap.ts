import { MetadataRoute } from 'next';

const BASE_URL = 'https://tamajitmodak.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ['', '/about', '/projects', '/contact', '/uses'];

    return routes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));
}
