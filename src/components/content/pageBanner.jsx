import Image from "next/image";

const PageBanner = () => {
  return (
    <section className="section-box mt-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
          <div className="lg:w-full mb-4">
            <div className="box-radius-8 bg-urgent hover-up">
              <div className="image">
                <Image
                  src="/images/job-tools.png"
                  width={151}
                  height={129}
                  alt="logo"
                />
              </div>
              <div className="text-info">
                <h3 className="text-black text-xl font-bold">
                  Design Resume Tool
                </h3>
                <p className="font-sm color-text-paragraph-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam laoreet rutrum quam, id faucibus erat interdum a.
                  Curabitur eget tortor a nulla interdum semper.
                </p>
                <div className="mt-4">
                  <a href="/" className="btn-arrow-right">
                    Find Out More
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-full mb-4">
            <div className="box-radius-8 bg-9 hover-up">
              <div className="image">
                <Image
                  src="/images/planning-job.png"
                  width={151}
                  height={129}
                  alt="logo"
                />
              </div>
              <div className="text-info">
                <h3 className="text-black text-xl font-bold">
                  Job Tool Service
                </h3>
                <p className="font-sm color-text-paragraph-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam laoreet rutrum quam, id faucibus erat interdum a.
                  Curabitur eget tortor a nulla interdum semper.
                </p>
                <div className="mt-4">
                  <a href="/" className="btn-arrow-right">
                    Find Out More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
