"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LetterBox = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };
  return (
    <section className="section-box mt-[100px] mb-5">
      <div className="max-w-[1250px] mx-auto">
        <div className="box-newsletter">
          <div className="flex flex-wrap pt-5 pb-[30px] px-3">
            <div className="xl:w-full text-center">
              <div className="inline-block">
                <h2 className="mt-3 text-white-color">
                  Subscribe our newsletter
                </h2>
                <p className="mt-2 text-lg text-white-color mb-6">
                  New Things Will Always Update Regularly
                </p>
                <div className="box-form-newsletter mt-6">
                  <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                      type="text"
                      placeholder="Enter your email here"
                      className="input-newsletter"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      variant="blue"
                      size="xl"
                      className="icon-send-letter"
                    >
                      Subscribe
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetterBox;
