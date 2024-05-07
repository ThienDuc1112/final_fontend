'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Guide = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/resume/create");
  }
  return (
    <section className="section-box mt-16 mb-10">
      <div className="max-w-[1350px] mx-auto">
        <div className="text-left">
          <h2 className="section-title mb-2 font-bold text-4xl">
            How it works
          </h2>
          <p className="text-lg color-text-paragraph-2">
            Just via some simple steps, we will find your desired jobs
          </p>
        </div>
        <div className="mt-16">
          <div className="flex flex-wrap">
            <div className="w-1/3">
              <div className="relative text-center step">
                <h1 className="number-element">1</h1>
                <h4 className="mb-5 text-2xl font-bold heading">
                  Register an
                  <br />
                  account to start
                </h4>
              </div>
            </div>
            <div className="w-1/3">
              <div className="relative text-center step">
                <h1 className="number-element">2</h1>
                <h4 className="mb-5 text-2xl font-bold heading">
                  Design your
                  <br />
                  desired resume
                </h4>
              </div>
            </div>
            <div className="w-1/3">
              <div className="relative text-center">
                <h1 className="number-element">3</h1>
                <h4 className="mb-5 text-2xl font-bold heading">
                  Look for
                  <br />
                  opening jobs
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button variant="blue" size="lg" onClick={handleClick}>
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Guide;
