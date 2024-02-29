import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoMdAddCircle } from "react-icons/io";
import ImageFrame from "./gallergy";
import { useCreateMediaMutation } from "@/Context/features/business/businessApiSlice";

export default function Gallery({ passedImages, Id }) {
  const [images, setImages] = useState([]);
  const [imagePath, setImagePath] = useState();
  const [businessId, setBusinessId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [createMedia, { isLoading, error, success, isError }] =
    useCreateMediaMutation();

  const toggleShowAll = () => {
    setIsOpen(true);
  };

  console.log(passedImages, images[0]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  useEffect(() => {
    setImages(passedImages || []);
  },[passedImages])

  const remainingImagesCount = images.length - 3;
  const displayedImages = showAll ? images : images.slice(0, 3);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const uploadMedia = async () => {
    const media = {
      name: imagePath,
      type: "image",
      businessId: Id,
    };

    setImages([...images, media]);

    try {
      const response = await createMedia(media);
      console.log("Media added successfully", response);
    } catch (error) {
      console.error("Error adding media", error);
    }
  };

  useEffect(() => {
    uploadMedia();
  }, [imagePath]);

  const handleSendImage = async (event) => {
    try {
      const file = event.target.files[0];

      const response = await fetch(`/api/images/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const logo = await response.json();
      const logoPath = logo.url.split("/").pop();
      console.log(logo);
      setImagePath(logoPath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-5 mt-[50px]">
      <div className="mt-10 py-6 px-5 bg-white border rounded-sm shadow-md xl:min-w-[1300px]">
        <h3>Business Image</h3>
        <div className="mt-3 flex justify-start items-center gap-3 pb-5">
          {images[0] !== undefined && displayedImages.map((image, index) => (
            <div
              key={index}
              style={{ position: "relative", display: "inline-block" }}
              onClick={index === 2 ? toggleShowAll : undefined}
            >
              {index === 2 &&
                remainingImagesCount > 0 && (
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
              {index === 2 &&  remainingImagesCount > 0 &&(
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
          <div className="min-w-[250px] min-h-[120px] flex items-center justify-center bg-gray-100 rounded-lg">
            <button
              className="text-blue-600 hover:text-teal-400"
              onClick={handleUploadClick}
            >
              <IoMdAddCircle size={35} />
            </button>
            <input
              type="file"
              accept=".png,.jpg"
              onChange={handleSendImage}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>
          <ImageFrame open={isOpen} setOpen={setIsOpen} images={images} />
        </div>
      </div>
    </div>
  );
}
