import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import Modal from "./Modal";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};
// const images = [
//   {
//     id: 1,
//     src: "https://picsum.photos/500/300?random=2",
//     category: "nature",
//     width: 500,
//     height: 300,
//   },
//   {
//     id: 2,
//     src: "https://picsum.photos/500/800?random=2",
//     category: "city",
//     width: 500,
//     height: 800,
//   },
//   {
//     id: 3,
//     src: "https://picsum.photos/500/300?random=9",
//     category: "nature",
//     width: 500,
//     height: 300,
//   },
//   {
//     id: 4,
//     src: "https://picsum.photos/600/900?random=6",
//     category: "city",
//     width: 600,
//     height: 900,
//   },
//   {
//     id: 5,
//     src: "https://picsum.photos/400/600?random=15",
//     category: "nature",
//     width: 400,
//     height: 600,
//   },
//   {
//     id: 6,
//     src: "https://picsum.photos/500/600?random=36",
//     category: "city",
//     width: 500,
//     height: 600,
//   },
//   {
//     id: 7,
//     src: "https://picsum.photos/500/600?random=96",
//     category: "city",
//     width: 500,
//     height: 600,
//   },
//   {
//     id: 8,
//     src: "https://picsum.photos/800/1200?random=85",
//     category: "nature",
//     width: 800,
//     height: 1200,
//   },
//   {
//     id: 9,
//     src: "https://picsum.photos/500/900?random=28",
//     category: "city",
//     width: 500,
//     height: 900,
//   },
//   {
//     id: 10,
//     src: "https://picsum.photos/500/600?random=32",
//     category: "nature",
//     width: 500,
//     height: 600,
//   },
//   {
//     id: 11,
//     src: "https://picsum.photos/500/600?random=17",
//     category: "city",
//     width: 500,
//     height: 600,
//   },
//   {
//     id: 12,
//     src: "https://picsum.photos/600/600?random=62",
//     category: "nature",
//     width: 500,
//     height: 600,
//   },
//   {
//     id: 13,
//     src: "https://picsum.photos/400/900?random=42",
//     category: "city",
//     width: 400,
//     height: 900,
//   },
// ];

const GalleryCom = () => {
  const [images,setImages] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:1337/api/photos?populate=*")
    .then((res)=>res.json())
    .then((data)=>setImages(data.data));
  },[])
  // console.log(images);
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const filteredImages =
    filter === "all"
      ? images
      : images.filter((image) => image.attributes.category === filter);

  const [clickedImg, setClickedImg] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(null);

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item);
  };

  const handelRotationRight = () => {
    const totalLength = filteredImages.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = filteredImages[0];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = filteredImages.filter((item) => {
      return filteredImages.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0];
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    const totalLength = filteredImages.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = filteredImages[totalLength - 1];
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = filteredImages.filter((item) => {
      return filteredImages.indexOf(item) === newIndex;
    });
    const newItem = newUrl[0];
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };
  // console.log(filteredImages);
  return (
    <>
      <div className="filter">
        <div className="wrap">
          <ul className="tags" key="tags">
            <li onClick={() => handleFilterChange("all")} key={1}>
              All
            </li>
            <li onClick={() => handleFilterChange("nature")} key={2}>
              Nature
            </li>
            <li onClick={() => handleFilterChange("city")} key={3}>
              City
            </li>
          </ul>
        </div>
      </div>
      <>
         <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredImages.map((image, index) => (
            <>
              <Image
                key={image.index}
                src={image.attributes.img.data[0].attributes.url}
                width={image.attributes.img.data[0].attributes.width}
                height={image.attributes.img.data[0].attributes.height}
                style={{width:"100%",height:"auto"}}
                alt={image.attributes.category}
                onClick={() => handleClick(image, index)}
              />
            </>
          ))}
        </Masonry>
        <div>
          {clickedImg && (
            <Modal
              clickedImg={clickedImg}
              handelRotationRight={handelRotationRight}
              setClickedImg={setClickedImg}
              handelRotationLeft={handelRotationLeft}
            />
          )}
        </div> 
      </>
       {/* <Gallery
        images={filteredImages}
        onClick={handleClick}
        enableImageSelection={false}
        className="my-masonry-grid_column"
      />  */}
    </>
  );
};

export default GalleryCom;
// export async function getStaticProps() {
//   const results = await fetch("http://localhost:1337/api/photos?populate=*");
//   const stuff = await results.json();
//   console.log(stuff);
//   return {
//     props: { stuff },
//   };
// }