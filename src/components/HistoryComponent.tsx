import { Photo } from "../interfaces/photos";
import { useCallback, useEffect, useState } from "react";
import TagList from "./TagList";
import Modal from "./Modal";
import PhotoItem from "./PhotoItem";
import { useQuery } from "@tanstack/react-query";

const HistoryComponent = () => {
  const [data, setData] = useState<Photo[]>([]);
  const [modal, setModal] = useState<Photo | null>(null);
  const [page, setPage] = useState(1);
  const [currentTag, setCurrentTag] = useState<string | null>(null);

  const { refetch, error, isLoading } = useQuery<Photo[], Error>({
    queryKey: ["photos"],
    queryFn: async () => {
      if (currentTag) {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?page=${page}&query=${currentTag}&per_page=20&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result: { results: Photo[] } = await response.json();

        setData((prev) => [...prev, ...result.results]);

        return result.results;
      }
      return [];
    },
  });

  const onTagClick = useCallback(
    (tag: string) => {
      if (currentTag !== tag) {
        setCurrentTag(tag);
        setPage(1);
        setData([]);
      }
    },
    [currentTag]
  );

  const openModal = useCallback(async (photo: Photo) => {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/${photo.id}?client_id=${import.meta.env.VITE_API_KEY}`);
        if (!response.ok) {
            throw new Error('Failed to fetch photo details');
        }
        const photoDetails = await response.json();
        setModal(prevModal => ({ ...prevModal, ...photoDetails }));
    } catch (error) {
        console.error('Error fetching photo details:', error);
    }
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const seeMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, [])

  useEffect(() => {
    if (currentTag) {
      refetch();
    }
  }, [currentTag, page]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <TagList onTagClick={onTagClick} />

      <main className="home-container">
        {data.map((photo) => (
          <PhotoItem
            onPhotoClick={() => openModal(photo)}
            photoUrl={photo.urls.full}
            key={photo.id}
          />
        ))}
        {modal && (
          <Modal
            img={modal.urls.full}
            onClose={closeModal}
            likes={modal.likes}
            downloads={modal.downloads}
            views={modal.views}
          />
        )}
        {data.length !== 0 && (
          <button onClick={seeMore} className="see-more">
            See More
          </button>
        )}
      </main>
    </div>
  );
};

export default HistoryComponent;
