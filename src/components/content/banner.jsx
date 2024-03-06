import SearchBox from "./searchBox";
import JobBanner from "./jobBanner";
import Image from "next/image";
const Banner = () => {
  return (
    <div className="relative">
      <div
        className="bg-cover bg-no-repeat bg-bottom min-h-full z-[-10] w-full top-0 right-0 pt-[100px]"
        style={{ backgroundImage: "url('/images/bannerbg.png')" }}
      >
        <section className="inline-block w-full overflow-visible">
          <div className="pr-16 pl-4 mx-auto relative">
            <div className="z-10 relative px-3.5">
              <div className="flex flex-wrap">
                <div class="sm:flex-none sm:w-7/12 md:flex-none md:w-12/12">
                  <div className=" z-20 relative pt-20 pl-[200px]">
                    <h1 className="text-5xl leading-15 font-bold align-baseline animate__animated animate__fadeInUp">
                      Get The
                      <span className="align-baseline text-blue-btn pl-3">
                        Right Job
                        <div class="bg-blue-600/25 h-6 absolute w-60 ml-[190px] mt-[-20px] z-[-1]"></div>
                      </span>
                      <br />
                      You Desire
                    </h1>
                    <div className="mt-5 text-lg text-gray-600  animate__animated animate__fadeInUp">
                      Each month, more than 3 million job seekers turn to
                      website in their search for work,
                      <br />
                      making over 140,000 applications every single day
                    </div>
                    <SearchBox />
                    <div className="mt-12 list-tags-banner animate__animated animate__fadeInUp">
                      <strong>Popular Searches:</strong>
                      <a href="">Developer,</a>
                      <a href="">Content Createtor,</a>
                      <a href="">Web,</a>
                      <a href="">Senior Engineer,</a>
                    </div>
                  </div>
                </div>
                <div className="xl:w-2/5 pr-4 pl-4 lg:w-full hidden xl:block md:w-1/2">
                  <div className="pt-[65px] px-[0] pb-[0] relative h-full min-h-[540px]">
                    <div className="block-1 shape-1">
                      <Image
                        src="/images/banner.png"
                        width={455}
                        height={260}
                        alt="logo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Banner;
