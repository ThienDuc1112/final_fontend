import { Button } from "@/components/ui/button";

const SubBanner = () => {
  return (
    <section className="section-box mt-16 mb-10">
      <div className="max-w-[1250px] mx-auto sm:px-4">
        <div className="box-we-hiring">
          <div className="text-1">
            <span className="text-base leading-5 text-gray-500 font-bold uppercase block">
              We are
            </span>
            <span className="text-5xl text-gray-900 font-extrabold uppercase">
              Hiring
            </span>
          </div>
          <div className="text-2">
            {"Let's"}
            <span className="color-brand-1 "> Work</span>
            Together
            <br /> & <span className="color-brand-1"> Explore</span>
            Opportunities
          </div>

          <div className="text-3 my-5">
            <Button variant="blue" className="btn-apply-icon">
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubBanner;
