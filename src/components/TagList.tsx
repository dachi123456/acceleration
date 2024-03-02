import { useSelector } from "react-redux";
import { reduxI } from "../interfaces/photos";
import './taglist.css'

const TagList = ({onTagClick}:{onTagClick: (tag: string) => void}) => {
    const tags: string[] = useSelector((state: reduxI) => state.tag.tags);

  return (
    <div className="tag-container">
    {tags.map((tag, index) => (
      <div 
      key={index} 
      onClick={() => onTagClick(tag)}
      className="tag"
      >
        {tag}
      </div>
    ))}
    </div>
  )
}

export default TagList