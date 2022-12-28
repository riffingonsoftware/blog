import rss from '@astrojs/rss';
import { POSTS_GLOB, SITE_TITLE, SITE_DESCRIPTION } from '../config';

export const get = () =>
	rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: import.meta.glob('./posts/**/*.{md,mdx}'),
	});
