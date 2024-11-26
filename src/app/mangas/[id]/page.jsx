import MangaPage from "@/components/business/MangaPage";

export default function Manga({ params }) {
  return <MangaPage id={params.id} />;
}
