import { useRouter } from "next/navigation";
import styles from "./MangaSlide.module.css";

const MangaCarousel = (props) => {
  const router = useRouter()
  const mangaClickHandler = (id) => {
    router.push(`/mangas/${id}`, );
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.mangaListTitle}>{props.title}</div>
        <ul className={styles.mangaListContainer}>
          {props.mangas && props.mangas.length ? (
            props.mangas.map((manga) => (
              <li key={manga._id} onClick={() => mangaClickHandler(manga._id)}>
                <img className={styles.mangaCover} alt="manga-cover" src={manga.cover} />
                <div className={styles.mangaName}>{manga.name}</div>
              </li>
            ))
          ) : (
            <div>Nothing here</div>
          )}
        </ul>
      </div>
    </>
  );
};
export default MangaCarousel;
