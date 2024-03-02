import { FormEvent } from "react";

export interface Photo {
    id: string;
    urls: {
      full: string;
    };
    likes?: number
    downloads?: number
    views?:number
}
export interface reduxI { 
    tag: {
     tags: string[] 
    } 
}
export interface ModalI {
    img: string;
    onClose: () => void; 
    likes?: number
    downloads?: number
    views?:number
  }

export interface FormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}
