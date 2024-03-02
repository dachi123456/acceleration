
import './homeComponent.css'
const PhotoItem = ({onPhotoClick,photoUrl}: {
    onPhotoClick: () => void,
    photoUrl: string
}) => {
  return (
    <div 
    onClick={onPhotoClick} 
    className="grid-item">
        <img 
            src={photoUrl} 
            alt="" 
            className="grid-img"/>
    </div>
  )
}

export default PhotoItem