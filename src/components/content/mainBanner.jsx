import SearchBox from "@/components/content/searchBox";

const MainBanner = () => {
  return (
    <section className="md:max-w-[1450px] md:container mx-auto px-4 mt-10">
      <div className="banner-hero banner-single banner-single-bg">
        <div className="block-banner text-center">
          <h3 className="animate__animated animate__fadeInUp text-3xl">
            <span className="text-blue-btn">Looking For</span>
            <span className="pl-1">Your Desired jobs</span>
          </h3>
          <div className="text-sm color-text-paragraph-2 mt-2 animate__animated animate__fadeInUp">
            We are dedicated to empowering you with our state-of-the-art
            advanced filtering system,
            <br />
            facilitating rapid job searches and helping you find the perfect
            career opportunity
          </div>
          <SearchBox />
        </div>
      </div>
    </section>
  );
};

export default MainBanner;
