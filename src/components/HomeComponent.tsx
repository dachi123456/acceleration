import { FormEvent, useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Photo } from "../interfaces/photos";
import { useQuery } from "@tanstack/react-query";
import { pushTags } from "../redux/slices/tags.slice";
import PopularPhotos from "./PopularPhotos";
import FormComponent from "./Form";
import Modal from "./Modal";
import PhotoItem from "./PhotoItem";
import './homeComponent.css'

const HomeComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [modal, setModal] = useState<Photo | null >(null);
  const [page, setPage] = useState(1)
  const [photos, setPhotos] = useState<Photo[] | []>([])

  
  const { isLoading, error, refetch, isFetching } = useQuery<Photo[], Error>({
    queryKey: ['photos'],
    queryFn: async () => {
      if(!inputRef.current?.value) return [];

      const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputRef.current?.value}&per_page=20&client_id=${import.meta.env.VITE_API_KEY}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const result: { results: Photo[] } = await response.json();

      //IF I CAN'T USE useInfiniteQuery, ITS MY SOLUTION <3
      if(inputRef.current?.value) setPhotos(prev => [...prev,...result.results])

      return result.results;
    }
  });
 
  
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      dispatch(pushTags(inputRef.current.value))
      setPhotos([])
     
      refetch();
    }
  }, [])

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
  }, [])

  const addPage = () => {
    setPage(prev => prev + 1)
    setTimeout(() => {
      refetch()
    }, 500);
  }
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="container">
      <FormComponent handleSubmit={handleSubmit} inputRef={inputRef} />

      <main className="home-container">
        {photos.length !== 0 ? 
        (
          photos?.map(photo => (
            <PhotoItem 
              onPhotoClick={() => openModal(photo)} 
              photoUrl={photo.urls.full}
              key={photo.id}
            />
          ))
        ) : (
          <PopularPhotos />
        )}
      </main>
      {modal && 
      <Modal
       img={modal.urls.full} 
       onClose={closeModal} 
       likes={modal.likes}
       downloads={modal.downloads}
       views={modal.views}
       />}

       {inputRef.current?.value && 

       <button onClick={addPage} 
       disabled={isFetching}
       className="see-more"
       >
        See More
       </button>
       }
    </div>
  );
}

export default HomeComponent;
