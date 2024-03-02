import { ModalI } from "../interfaces/photos";
import "./modal.css";
import cancelIcon from '../assets/close-svgrepo-com.svg'

const Modal = ({ img, onClose, likes, downloads, views }: ModalI) => {
  return (
    <div className="modal-div">
      <span className="close-btn" onClick={onClose}>
        <img src={cancelIcon} alt="" />
      </span>
      <img src={img} alt="" onClick={onClose} />

      <div className="stats">
        <p>Likes: {likes}</p>
        <p>Downloads: {downloads}</p>
        <p>Views: {views}</p>
      </div>
    </div>
  );
};

export default Modal;
