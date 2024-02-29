import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/business/Gallergy/dialog";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function gallergy({ open, setOpen, images }) {
  const convertedImages = images.map((image) => ({
    original: "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/" + image.name,
    thumbnail: "https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/"+image.name,
  }));
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Business Images</DialogTitle>
          <DialogDescription>
            <div className="max-w-[1100px]">
              <ImageGallery items={convertedImages} />
            </div>
          </DialogDescription>
          {/* <div className="max-w-[1100px]">
            <ImageGallery items={convertedImages} />
          </div> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
