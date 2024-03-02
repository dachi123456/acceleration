import { useCallback, useEffect, useState } from "react"
import { Photo } from "../interfaces/photos"
import Modal from "./Modal";
import PhotoItem from "./PhotoItem";

const PopularPhotos = () => {
    const [popular,setPopular] = useState<Photo[]>([])
    const [modal, setModal] = useState<Photo | null >(null);
    
    useEffect(() => {
        fetch(`https://api.unsplash.com/photos?order_by=popular&per_page=20&client_id=${import.meta.env.VITE_API_KEY}`)
        .then(res => res.json())
        .then(data => setPopular(data))
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

  return (
    <>
        {popular.map(photo => (
           <PhotoItem 
            onPhotoClick={() => openModal(photo)}
            photoUrl={photo.urls.full}
            key={photo.id}   
            />
        ))}

        {modal && 
            <Modal
            img={modal.urls.full} 
            onClose={closeModal} 
            likes={modal.likes}
            downloads={modal.downloads}
            views={modal.views}
            />}
    </>
  )
}

export default PopularPhotos