import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <section className="container mx-auto px-4">
      {/* Header Section */}
      <div className="text-center text-3xl pt-12 border-t border-gray-100">
        <Title title1={"CONTACT"} title2={"US"} />
      </div>

      {/* Main Content */}
      <div className="my-16 flex flex-col md:flex-row gap-12 justify-center items-center mb-32">
        <img
          src={assets.contact_img}
          alt="Habcom Office"
          className="w-full md:max-w-[480px] rounded-lg shadow-sm object-cover"
        />

        <div className="flex flex-col justify-center items-start gap-8 max-w-md">
          {/* Address Details */}
          <div>
            <h2 className="font-bold text-xl text-gray-800 mb-4 tracking-tight">
              Our Store
            </h2>
            <address className="not-italic leading-relaxed text-gray-600">
              Bole Sub-city, Woreda 03
              <br />
              Bole 340, Addis Ababa, Ethiopia
            </address>
          </div>

          {/* Contact Details */}
          <div className="text-gray-600">
            <p className="mb-1">
              <span className="font-medium text-gray-800">Tel:</span> +251 943
              456 789
            </p>
            <p>
              <span className="font-medium text-gray-800">Email:</span>{" "}
              contact@habcom.com
            </p>
          </div>

          {/* Career Section */}
          <div className="pt-4 border-t border-gray-100 w-full">
            <h2 className="font-bold text-xl text-gray-800 mb-3 tracking-tight">
              Careers at Habcom
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Join our mission. Explore diverse opportunities within our growing
              teams.
            </p>
            <button className="inline-block border border-gray-900 px-10 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:bg-black hover:text-white active:scale-95 focus:outline-none">
              Explore Openings
            </button>
          </div>
        </div>
      </div>

      <NewsLetterBox />
    </section>
  );
};

export default Contact;
