import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ImageFrame from "@/components/business/Gallergy/gallergy";

export default function Gallery({ passedImages, Id }) {
  const [images, setImages] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleShowAll = () => {
    setIsOpen(true);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    setImages([...passedImages] || []);
  }, [passedImages]);

  const remainingImagesCount = images.length - 3;
  const displayedImages = showAll ? images : images.slice(0, 3);

  return (
    <div className="mt-[50px]">
      <div className="mt-10 py-6 px-5 bg-white border rounded-sm shadow-md xl:min-w-[800px]">
        <div className="mt-3 flex justify-start items-center gap-3 pb-5">
          {images[0] !== undefined &&
            displayedImages.map((image, index) => (
              <div
                key={index}
                style={{ position: "relative", display: "inline-block" }}
                onClick={index === 2 ? toggleShowAll : undefined}
              >
                {index === 2 && remainingImagesCount > 0 && (
                  <div
                    className="overlay"
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "100%",
                      height: "100%",
                      background: hovered ? "rgba(0, 0, 0, 0.5)" : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      color: "#fff",
                      fontSize: "14px",
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {hovered && "Click to view all"}
                  </div>
                )}
                <Image
                  src={`https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/${image.name}`}
                  alt="logo"
                  width={250}
                  height={150}
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
                {index === 2 && remainingImagesCount > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "#2669d4",
                      color: "#ffffff",
                      padding: "5px 7px",
                      borderRadius: "50%",
                      fontSize: "12px",
                    }}
                  >
                    {`+${remainingImagesCount}`}
                  </div>
                )}
              </div>
            ))}
          <ImageFrame open={isOpen} setOpen={setIsOpen} images={images} />
        </div>
      </div>
    </div>
  );
}
