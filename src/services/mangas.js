import axiosInstance from "./axiosInstance";

// get mangas
export const getMangas = async (page = 1, per_page = 20) => {
  try {
    const response = await axiosInstance.get("/mangas", {
      params: {
        page: page,
        per_page: per_page,
      },
    });
    return { status: response.status, mangas: response.data };
  } catch (error) {
    return {
      status: 500,
      message: "server is dead",
    };
  }
};

// get a manga by id
export const getMangaByID = async (id) => {
  try {
    const response = await axiosInstance.get(`/mangas/${id}`);
    return { status: response.status, manga: response.data };
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }

    return {
      status: 500,
      message: "Something went wrong, and we have no idea",
    };
  }
};

export const getChapterList = async (mangaID, page = 1, per_page = 20) => {
  try {
    const response = await axiosInstance.get(
      `/mangas/${mangaID}/chapters?page=${page}&per_page=${per_page}`,
    );
    return { status: response.status, chaptersInfo: response.data };
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }

    return {
      status: 500,
      message: "Something went wrong, and we have no idea",
    };
  }
};

export const getRatings = async (mangaID) => {
  try {
    const response = await axiosInstance.get(API_URL + mangaID + `/ratings`);
    return { status: response.status, ratings: response.data };
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message,
      };
    }

    return {
      status: 500,
      message: "Something went wrong, and we have no idea",
    };
  }
};

export const getChapter = async (mangaID, chapterNumber) => {
  try {
    const response = await axiosInstance.get(
      `/mangas/${mangaID}/chapter/${chapterNumber}?page=1&per_page=20`,
    );
    return {
      responseStatus: response.status,
      images: response.data.images,
      title: response.data.title,
    };
  } catch (error) {}
};
