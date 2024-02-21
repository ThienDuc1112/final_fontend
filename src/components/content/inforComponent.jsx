import Image from "next/image";

export default function InforComponent({ image, title, value }) {
  return (
    <div className="md:w-1/2 flex items-center">
      <div className="sidebar-icon-item">
        <Image src={`/images/${image}`} width={16} height={16} alt="logo" />
      </div>
      <div className="sidebar-text-info ml-2.5 gap-5">
        <span className="text-description industry-icon">{title}</span>
        <strong className="small-heading">{value}</strong>
      </div>
    </div>
  );
}
