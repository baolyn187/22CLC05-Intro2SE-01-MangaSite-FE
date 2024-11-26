import MangaPage from "@/components/business/MangaPage";

export default async function Manga({ params }) {
  const {id} = await params
  return <MangaPage id={id} />;
}
