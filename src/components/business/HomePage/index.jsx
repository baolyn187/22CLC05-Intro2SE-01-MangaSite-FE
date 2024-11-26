"use client";

import { useEffect, useState } from "react";
import MangaSlide from "@/components/layout/MangaSlide";
import { getMangas } from "@/services/mangas";

const HomePage = () => {
  const [mangas, setMangas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getMangas(1, 20);
      if (response.status === 200) {
        setMangas(response.mangas.mangas);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MangaSlide title="Trending" mangas={mangas} />
      <MangaSlide title="Top rated" mangas={mangas} />
    </>
  );
};
export default HomePage;
