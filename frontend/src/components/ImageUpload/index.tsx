import React,{ useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import addBtnImg from '../../public/profile/btnadd.svg';

import "./styles.css";

interface ImageUploadProps {
  setFile: (file: File) => void;
}

const ImageUpload = ({ setFile }: ImageUploadProps) => {
    const [image, setImage] = useState<string>("");
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    useEffect(() => {
        const [ file ] = acceptedFiles;

        if (file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                setImage(reader.result as string);
            };
            setFile(file);
        }
    }, [acceptedFiles]);

    return (
        <div {...getRootProps()} className="img-upload-container">
            {
            image !== "" ? (
                <img src={image} alt="Imagem" className="img" />
            ) : (
                <nav className="input">
                    <input {...getInputProps()} />
                    <img src={addBtnImg} alt="add-image" />
                </nav>
            )}
        </div>
    );
}

export default ImageUpload;