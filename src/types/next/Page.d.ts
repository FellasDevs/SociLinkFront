export type PageQueryParams = { [key: string]: string | string[] | undefined };

export type PageProps = {
  params: { slug: string };
  searchParams: PageQueryParams;
}