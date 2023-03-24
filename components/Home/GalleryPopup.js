import React from "react";
import Modal from "react-modal";
import { Carousel } from "react-responsive-carousel";

const GalleryPopup = ({
  isOpen,
  images,
  selectedImageIndex,
  onRequestClose,
}) => {
    console.log(images);
    console.log(selectedImageIndex);
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="">
      <button onClick={onRequestClose}>Close</button>
      <Carousel
        selectedItem={selectedImageIndex}
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              title={label}
              className="arrow-prev"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              title={label}
              className="arrow-next"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )
        }
      >
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.src} alt={image.category} />
          </div>
        ))}
      </Carousel>
      
    </Modal>
  );
};

export default GalleryPopup;
