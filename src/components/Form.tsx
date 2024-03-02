import './form.css'
import { FormProps } from '../interfaces/photos';


const FormComponent = ({ handleSubmit, inputRef } : FormProps) => {
  return (
    <form onSubmit={handleSubmit}>
       <div className='input-div'>
        <h2>SEARCH IMAGES</h2>
            <input 
                type="text" 
                ref={inputRef}
            />
       </div>
    </form>
  );
};

export default FormComponent;
