import { useEffect, useState } from "react"
import { getMangaByID, getChapterList, getRatings } from "../../api/mangaService"
import { useParams } from "react-router-dom"
import { FaFlag, FaCommentAlt } from "react-icons/fa"
import { FaGear } from "react-icons/fa6"
import styles from './MangaPage.module.css'
import ReportForm from "../../components/ReportForm"
import StarRating from "../../components/StarRating"
import RatingForm from "../../components/RatingForm"
import NotificationForm from "../../components/NotificationForm"

export default function Manga() {
	const { id } = useParams();

	const [manga, setManga] = useState({ a: 'a' });
	const [chapters, setChapters] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const [showReportForm, setShowReportForm] = useState(false);

	const [ratings, setRatings] = useState([]);
	const [showRatingForm, setShowRatingForm] = useState(false);

	const [showNotiForm, setShowNotiForm] = useState(false);
	const [notiFormDetails, setNotiFormDetails] = useState({
		success: false,
		message: '',
		details: '',
	});

	const togglePopup = (setCallback, attribute) => {
		setCallback(!attribute);
	}

	const handlePopupClick = (id, setCallback, attribute) => {
		if (id === 'popupContainer') {
			togglePopup(setCallback, attribute);
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const response = await getMangaByID(id);
			if (response.status === 200) {
				setManga(response.manga);

				const chapterResponse = await getChapterList(id);
				if (chapterResponse.status === 200) {
					setChapters(chapterResponse.chaptersInfo.chapters.reverse());
					setPage(chapterResponse.chaptersInfo.page);
					setTotalPages(chapterResponse.chaptersInfo.total_pages);
				}
				else {
					console.log("Couldn't get chapter list");
				}

				const ratingResponse = await getRatings(id);
				if (ratingResponse.status === 200) {
					setRatings(ratingResponse.ratings);
				}
				else {
					console.log("Couldn't get ratings");
				}
			}
			else {
				console.log(response.message);
			}
		}

		fetchData()
	}, [])

	return (
		<>
			<div className={styles.mainContainer}>
				<div className={styles.leftColumnContainer}>
					<img src={manga.cover} />

					<div className={styles.actionBTNsContainer}>
						<FaGear />
						<FaFlag onClick={() => togglePopup(setShowReportForm, showReportForm)} />
						<FaCommentAlt />
						<FaGear />
					</div>

					<div>
						{manga.categories && manga.categories.length > 0 && (
							manga.categories.map(category => (
								<button key={category._id}>{category.name}</button>
							))
						)}
					</div>

					<button>
						Start Reading
					</button>
				</div>
				<div className={styles.rightColumnContainer}>
					<div className={styles.details}>
						<div>
							<h1>{manga.name}</h1>
							{manga.authors &&
								manga.authors.map((author, index) => (
									<span key={author.id} className={styles.authorName}>
										{author.name}
										{index < manga.authors.length - 1 && ',\u00A0'}
									</span>
								))
							}
						</div>

						<div onClick={() => togglePopup(setShowRatingForm, showRatingForm)} className={styles.rating}>
							<StarRating ratings={ratings} />
						</div>

						<div className={styles.synopsis}>
							<p>Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal Titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.</p>
							<p>After witnessing a horrific personal loss at the hands of the invading creatures, Eren Yeager dedicates his life to their eradication by enlisting into the Survey Corps, an elite military unit that combats the merciless humanoids outside the protection of the walls. Eren, his adopted sister Mikasa Ackerman, and his childhood friend Armin Arlert join the brutal war against the Titans and race to discover a way of defeating them before the last walls are breached.</p>

						</div>
					</div>

					<div className={styles.chapterListContainer}>
						<div>All {chapters.length} {chapters.length > 1 ? "Chapters" : "Chapter"}</div>
						<div className={styles.chapterList}>
							{chapters.length > 0 && (
								chapters.map(chapter => (
									<div key={chapter._id} className={styles.chapterContainer}>
										<div><b>{`Chapter #${chapter.number}`}</b></div>
										<div>{chapter.title}</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>

			{showReportForm && <div className={styles.popupContainer}
				onClick={(e) => handlePopupClick(e.target.id, setShowReportForm, showReportForm)}
				id="popupContainer">
				<ReportForm
					setShowThis={setShowReportForm}
					setNotiFormDetails={setNotiFormDetails}
					setShowNotiForm={setShowNotiForm}
				/>
			</div>}

			{showRatingForm && <div className={styles.popupContainer}
				onClick={(e) => handlePopupClick(e.target.id, setShowRatingForm, showRatingForm)}
				id="popupContainer">
				<RatingForm
					ratings={ratings}
					setShowThis={setShowRatingForm}
					setNotiFormDetails={setNotiFormDetails}
					setShowNotiForm={setShowNotiForm}
				/>
			</div>}

			{showNotiForm && <div className={styles.popupContainer}
				onClick={(e) => handlePopupClick(e.target.id, setShowNotiForm, showNotiForm)}
				id="popupContainer">
				<NotificationForm
					message={notiFormDetails.message}
					details={notiFormDetails.details}
					success={notiFormDetails.success}
				/>
			</div>}
		</>
	)
}
