import React, { useState } from "react";
import Masonry from "react-masonry-css";

import img1 from "/public/img/img/andy-hardy-people-accomodation-photographer-filmmaker-australia-1-400x400-q72.jpg";
import img2 from "/public/img/img/andy-hardy-people-accomodation-photographer-filmmaker-australia-10-400x400-q72.jpg";
import img3 from "/public/img/img/andy-hardy-people-accomodation-photographer-filmmaker-australia-26-400x400-q72.jpg";
import img4 from "/public/img/img/andy-hardy-people-accomodation-photographer-filmmaker-australia-24-400x400-q72.jpg";
import img5 from "/public/img/img/andy-hardy-people-adventure-photographer-filmmaker-australia-34-400x400-q72.jpg";
import Link from "next/link";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";


const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};
const images = [
  { id: 1, src: "https://picsum.photos/500/300?random=2", category: "nature" },
  { id: 2, src: "https://picsum.photos/500/800?random=2", category: "city" },
  { id: 3, src: "https://picsum.photos/500/300?random=9", category: "nature" },
  { id: 4, src: "https://picsum.photos/600/900?random=6", category: "city" },
  { id: 5, src: "https://picsum.photos/400/600?random=15", category: "nature" },
  { id: 6, src: "https://picsum.photos/500/600?random=36", category: "city" },
  { id: 7, src: "https://picsum.photos/500/600?random=96", category: "city" },
  {
    id: 8,
    src: "https://picsum.photos/800/1200?random=85",
    category: "nature",
  },
  { id: 9, src: "https://picsum.photos/500/900?random=28", category: "city" },
  {
    id: 10,
    src: "https://picsum.photos/500/600?random=32",
    category: "nature",
  },
  { id: 11, src: "https://picsum.photos/500/600?random=17", category: "city" },
  {
    id: 12,
    src: "https://picsum.photos/600/600?random=62",
    category: "nature",
  },
  { id: 13, src: "https://picsum.photos/400/900?random=42", category: "city" },
];

const GalleryCom = () => {
  const [filter, setFilter] = useState("all");
  
  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const filteredImages =
    filter === "all"
      ? images
      : images.filter((image) => image.category === filter);
  
  
  const [index, setIndex] = useState(-1);

  const currentImage = filteredImages[index];
  console.log(currentImage);
  const nextIndex = (index + 1) % filteredImages.length;
  const nextImage = filteredImages[nextIndex] || currentImage;
  const prevIndex = (index + filteredImages.length - 1) % filteredImages.length;
  const prevImage = filteredImages[prevIndex] || currentImage;

  const handleClick = (index, item) => {
    console.log(index);
    setIndex(index);
  };
  
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <>
      <div className="filter">
        <div className="wrap">
          <ul className="tags">
            <li onClick={() => handleFilterChange("all")} key={1}>
              <a>All</a>
            </li>
            <li onClick={() => handleFilterChange("nature")} key={2}>
              <a>Nature</a>
            </li>
            <li onClick={() => handleFilterChange("city")} key={3}>
              <a>City</a>
            </li>
          </ul>
        </div>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {filteredImages.map((image, index) => (
          <>
            <img
              key={image.index}
              src={image.src}
              alt={image.category}
              onClick={() => handleClick(index)}
            />
          </>
        ))}
      </Masonry>
      {/* <Gallery
        images={filteredImages}
        onClick={handleClick}
        enableImageSelection={false}
        className="my-masonry-grid_column"
      /> */}
      {currentImage && (
        /* @ts-ignore */
        <Lightbox
          
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.src}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.src}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </>
  );
};

export default GalleryCom;
