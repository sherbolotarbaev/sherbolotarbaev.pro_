'use client';

import { useGetViewsQuery } from '@/app/redux/api/blog';

import scss from '@/app/components/scss/blog.module.scss';

interface ViewsProps {
  slug: string;
}

export default function Views({ slug }: Readonly<ViewsProps>) {
  const { data: allViews } = useGetViewsQuery();

  const viewsForPost = allViews && allViews.find((view) => view.slug === slug);
  const views = new Number(viewsForPost?.count || 0);

  return <span className={scss.views}>{views.toLocaleString()} views</span>;
}
