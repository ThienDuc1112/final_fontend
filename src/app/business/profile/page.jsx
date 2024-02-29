"use client";
import DefaultLayout from "@/components/business/Layouts/DefaultLayout";
import TokenService from "@/utils/Token.service";
import { useGetBusinessInfoQuery as GetData } from "@/Context/features/business/businessApiSlice";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Flag from "react-country-flag";
import phoneList from "@/utils/phoneDatabase";
import PhoneSelection from "@/components/content/phoneSelection";
import DropdownInput from "@/components/content/dropdownInput";
import DMInput from "@/components/content/dropdownManyInput";
import { getBusinessSize, getCareer } from "@/app/api/provider/api";
import Gallergy from "@/components/business/Gallergy";

export default function Profile() {
  const { userId, role } = TokenService.getUserProfile();
  const { data, isLoading, error } = GetData(userId);

  const [businessId, setBusinessId] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [shortName, setShortName] = useState("");
  const [fullName, setFullName] = useState("");
  const [foundedYear, setFoundedYear] = useState(null);
  const [businessSize, setBusinessSize] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [linkedlnUrl, setLinkedlnUrl] = useState("");
  const [address, setAddress] = useState("");
  const [licenseFont, setLicenseFont] = useState("");
  const [licenseBack, setLicenseBack] = useState("");
  const [description, setDescription] = useState("");
  const [careers, setCareers] = useState([]);
  const [images, setImages] = useState([]);
  const [phoneCountry, setPhoneCountry] = useState("+1");
  const country = phoneList.find(
    (country) => country.dial_code === phoneCountry
  );
  const [flag, setFlag] = useState(country.code);
  const [show, setShow] = useState(false);
  const [businessSizeData, setBusinessSizeData] = useState([]);

  const [shortNameError, setShortNameError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [foundedYearError, setFoundedYearError] = useState("");
  const [businessSizeError, setBusinessSizeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (data) {
      console.log(data);
      setBusinessId(data.id);
      setShortName(data.shortName);
      setFullName(data.fullName);
      setFoundedYear(data.foundedYear);
      setBusinessSize(data.businessSize);
      setAddress(data.address);
      setTaxCode(data.taxCode);
      setLogoUrl(data.logoUrl);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber.split("-")[1]);
      setPhoneCountry(data.phoneNumber.split("-")[0]);
      setWebsiteUrl(data.websiteUrl);
      setFacebookUrl(data.facebookUrl);
      setLinkedlnUrl(data.linkedinUrl);
      setDescription(data.description);
      setCareers(data.areaDTOs);
      setStatus(data.isApproved);
      setLicenseFont(data.licenseFont);
      setLicenseBack(data.licenseBack);
      setImages(data.mediaDTOs);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBusinessSize();
        setBusinessSizeData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(businessId);

  const handleSetPhoneCountry = (countryCode, countryFlag) => {
    setShow(false);
    setPhoneCountry(countryCode);
    setFlag(countryFlag);
  };
  const handleChangeShow = () => {
    setShow(true);
  };
  const handleBusinessSizeInput = (name) => {
    setBusinessSize(name);
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  const handleLogoChange = async (event) => {
    try {
      const file = event.target.files[0];

      const response = await fetch(`/api/images/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const logo = await response.json();
      const logoPath = logo.url.split("/").pop();
      setLogoUrl(logoPath);
      console.log(logo);
    } catch {
      console.log(error);
    }
  };

  return (
    <>
      <DefaultLayout>
        <div className="relative max-w-[1600px] mt-10 mx-10">
          <div className="mx-5">
            <h2>Business Profile</h2>
            <p className="text-base font-normal">
              {" "}
              Make your business profile more professional is a plus
            </p>
            <div className="mt-10 py-6 px-5 bg-white border rounded-sm shadow-md xl:min-w-[1300px]">
              <h3>Basic Information</h3>
              <div className="mt-3 flex justify-start items-center gap-4">
                <Image
                  src={
                    logoUrl
                      ? `https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/${logoUrl}`
                      : "/images/bulogo.png"
                  }
                  alt="logo"
                  width={150}
                  height={150}
                  style={{ objectFit: "cover" }}
                />
                <div className="flex flex-col gap-3">
                  <Button
                    variant="blue"
                    onClick={handleUploadClick}
                    style={{ width: "200px" }}
                  >
                    Upload logo
                  </Button>
                  <input
                    type="file"
                    accept=".png,.jpg"
                    onChange={handleLogoChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                  <span className="text-gray-500 text-sm">
                    Maximum file size: 1 MB. Only accept file type png or jpg
                  </span>
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="mt-3 flex items-center gap-[100px] w-full">
                <div className="flex flex-col mb-6 min-w-[450px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">Short Name</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={shortName}
                      onChange={(e) => setShortName(e.target.value)}
                      required
                      className="border-gray-700 bg-blue-100/25"
                    />
                    {shortNameError && (
                      <span className=" text-red-500 text-sm">
                        {shortNameError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mb-6 min-w-[450px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">Full Name</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="border-gray-700 bg-blue-100/25"
                    />
                    {fullNameError && (
                      <span className=" text-red-500 text-sm">
                        {fullNameError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="flex items-center gap-[30px] w-full">
                <div className="flex flex-col mb-6 min-w-[350px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">Email</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-gray-700 bg-blue-100/25"
                    />
                    {emailError && (
                      <span className=" text-red-500 text-sm">
                        {emailError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mb-6 min-w-[250px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">
                      Phone Number
                    </Label>
                    <div className="relative w-full">
                      <div className="h-input bg-white rounded-lg border border-gray-100 px-4 flex items-center gap-3">
                        <div className="flex items-center gap-3 flex-shrink-0 cursor-pointer h-full">
                          <Flag
                            countryCode={flag}
                            svg
                            onClick={handleChangeShow}
                          />
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-800">{phoneCountry}</span>
                        </div>
                        <Input
                          type="phoneNumber"
                          id="phone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="0000000000"
                        />
                      </div>
                      {phoneNumberError && (
                        <p className="text-red-500">{phoneNumberError}</p>
                      )}
                      {show && (
                        <PhoneSelection
                          phoneList={phoneList}
                          onCountrySelect={handleSetPhoneCountry}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mb-6 min-w-[350px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">Address</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={address.address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="border-gray-700 bg-blue-100/25"
                    />
                    {addressError && (
                      <span className=" text-red-500 text-sm">
                        {addressError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="flex items-center gap-[30px] w-full">
                <div className="flex flex-col mb-6 min-w-[350px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">
                      Founed Year
                    </Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={foundedYear}
                      onChange={(e) => setFoundedYear(e.target.value)}
                      required
                      maxLength={4}
                      className="border-gray-700 bg-blue-100/25"
                    />
                    {foundedYearError && (
                      <span className=" text-red-500 text-sm">
                        {foundedYearError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mb-4 min-w-[250px]">
                  <div className="ant-form-item-label mt-2">
                    <Label className="ant-form-item-required">
                      Business Size
                    </Label>
                  </div>
                  <div className="w-full">
                    <DropdownInput
                      DataList={businessSizeData}
                      onDataSelect={handleBusinessSizeInput}
                      selectedOption={businessSize}
                    />
                    {businessSizeError && (
                      <p className="text-red-500">{businessSizeError}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col mb-6 min-w-[450px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="ant-form-item-required">Careers</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={careers
                        .map((career) => career.careerName)
                        .join(", ")}
                      disabled={true}
                      className="border-gray-700 bg-blue-100/25"
                    />
                  </div>
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="flex items-center gap-[30px] w-full">
                <div className="flex flex-col mb-6 min-w-[350px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="">Website Company</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      required
                      maxLength={50}
                      className="border-gray-700 bg-blue-100/25"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-6 min-w-[350px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="">Facebook</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      required
                      maxLength={50}
                      className="border-gray-700 bg-blue-100/25"
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-6 min-w-[350px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="">Linkedln</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={linkedlnUrl}
                      onChange={(e) => setLinkedlnUrl(e.target.value)}
                      required
                      maxLength={50}
                      className="border-gray-700 bg-blue-100/25"
                    />
                  </div>
                </div>
              </div>
              {/* //////////////////////////////// */}
              <div className="flex items-center gap-[30px] w-full">
                <div className="flex flex-col mb-6 min-w-[350px]">
                  <div className="ant-form-item-label pt-3">
                    <Label className="">Business Tax</Label>
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      value={taxCode}
                      disabled={true}
                      className="border-gray-700 bg-blue-100/25"
                    />
                  </div>
                </div>
                <div className="text-emerald-600 py-2 px-5 bg-emerald-100 mt-1 rounded-lg">
                  {status}
                </div>
              </div>
              <div className="w-full">
                <div className="ant-form-item-label pt-3">
                  <Label className="">Business License</Label>
                </div>
                {licenseFont !== "" && licenseBack !== "" && (
                  <div className="flex items-center gap-[30px] w-full pt-5">
                    <Image
                      src={`https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/${licenseFont}`}
                      alt="logo"
                      width={300}
                      height={400}
                    />
                    <Image
                      src={`https://fcfqw1pzmmyfx1ve.public.blob.vercel-storage.com/${licenseFont}`}
                      alt="logo"
                      width={300}
                      height={400}
                    />
                  </div>
                )}
              </div>

              <div className="w-full mt-5">
                <div className="max-w-[700px]">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Default textarea
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={8}
                    placeholder="Description..."
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  />
                </div>
              </div>
              <div className="mt-5">
                <Button variant="blue">Update</Button>
              </div>
            </div>
          </div>
          <Gallergy passedImages={images} Id={businessId} />
        </div>
      </DefaultLayout>
    </>
  );
}
