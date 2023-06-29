import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Masonry from "react-responsive-masonry";

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const dropzoneRef = useRef(null);
 const newImageRef = useRef(null);
  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem("images"));
    if (storedImages) {
      setImages(storedImages);
    }
  }, []);
const handleDrop = (acceptedFiles) => {
  acceptedFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageBase64 = reader.result;
      const newImage = {
        id: Date.now().toString(),
        title: `Image ${images.length + 1}`,
        dataURL: imageBase64,
        shake: true,
      };
      setImages((prevImages) => {
        const updatedImages = [...prevImages, newImage];
        localStorage.setItem("images", JSON.stringify(updatedImages));
        return updatedImages;
      });
      setNewImage(null);

      setTimeout(() => {
        scrollToNewImage(newImage.id);
      }, 100);
      setTimeout(() => {
        setImages((prevImages) =>
          prevImages.map((image) =>
            image.id === newImage.id ? { ...image, shake: false } : image
          )
        );
      }, 1000);
    };
    reader.readAsDataURL(file);
  });
};

   const scrollToNewImage = (imageId) => {
     const masonryContainer = newImageRef.current;
     if (masonryContainer) {
       const imageElement = masonryContainer.querySelector(`#image-${imageId}`);

       if (imageElement) {
         imageElement.scrollIntoView({
           behavior: "smooth",
           block: "center",
           inline: "center",
         });
       }
     }
   };

  const handleEditImage = (id, newTitle) => {
    const updatedImages = images.map((image) => {
      if (image.id === id) {
        return { ...image, title: newTitle };
      }
      return image;
    });
    setImages(updatedImages);
    localStorage.setItem("images", JSON.stringify(updatedImages));
  };

  const handleDeleteImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    localStorage.setItem("images", JSON.stringify(updatedImages));
  };

const onDrop = (acceptedFiles) => {
  handleDrop(acceptedFiles);
};
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });
  //
  const [data, setData] = useState({ img: "", i: 0 });

  const viewImage = (img, i) => {
    setData({ img, i });
  };
/*  const imgAction = (action) => {
    let i = data.i;
    if (action === "next-img") {
      setData({ img: images[i + 1], i: i + 1 });
    }
    if (action === "previous-img") {
      setData({ img: images[i - 1], i: i - 1 });
    }
    if (!action) {
      setData({ img: "", i: 0 });
    }
  }; */


const imgAction = (action) => {
  let i = data.i;
  const numImages = images.length;

  if (action === "next-img") {
    i = (i + 1) % numImages;
  } else if (action === "previous-img") {
    i = (i - 1 + numImages) % numImages;
  } else {
    i = -1; // Chỉ số -1 để đóng ảnh
  }

  setData({ img: i >= 0 ? images[i] : "", i: i });
};


  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      <div
        className="image-uploader"
        onClick={(event) => event.stopPropagation()}
      >
        {data.img && (
          <div className="viewImage">
            <button
              className="button"
              onClick={() => imgAction()}
              style={{ position: "absolute", top: "30px", right: "30px" }}
            >
              <i className="bi bi-x"></i>
            </button>
            <button
              style={{ position: "absolute", left: "200px" }}
              className="button"
              onClick={() => imgAction("previous-img")}
            >
              <i className="bi bi-caret-left-fill"></i>
            </button>
            <img
              src={data.img.dataURL}
              style={{ width: "auto", maxWidth: "90%", maxHeight: "90%" }}
            />
            <button
              style={{ position: "absolute", right: "200px" }}
              className="button"
              onClick={() => imgAction("next-img")}
            >
              <i className="bi bi-caret-right-fill"></i>
            </button>
          </div>
        )}
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} />

          <div className="drop">
            {isDragActive ? (
              <p>Drop the images here...</p>
            ) : (
              <p>Drag and drop images here, or click to select images</p>
            )}
          </div>
        </div>
        <div ref={newImageRef}>
          <Masonry
            columnsCount={4}
            gutter="10px"
            ref={dropzoneRef}
          
          >
            {images.map((image, i) => (
              <div
                key={image.id} 
                id={`image-${image.id}`}
                className={`image-card image ${image.shake ? "shake" : ""}`}
              >
                <div className="card">
                  <img
                    src={image.dataURL}
                    alt={image.title}
                    onClick={() => viewImage(image, i)}
                  />

                  <ul className="card-social">
                    <li className="card-social__item i1">
                      <input
                        className="input-title"
                        type="text"
                        value={image.title}
                        onChange={(e) => {
                          handleEditImage(image.id, e.target.value),
                            e.stopPropagation();
                        }}
                      />
                    </li>
                  </ul>
                  <button
                    className="delete"
                    onClick={(e) => handleDeleteImage(image.id)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
