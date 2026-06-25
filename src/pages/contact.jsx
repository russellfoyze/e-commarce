import React from "react";
import Title from "../components/title";
import { assets } from "../assets/assets";
import NewsletterBox from '../components/newsLetterBox.jsx'

const contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"Contact"} text2={"Us"}></Title>
        </div>
        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
          <img
            className="w-full md:max-w-[480px]"
            src={assets.hero_img}
            alt=""
          />
          <div className="flex flex-col justify-center items-start gap-6">
            <p className="font-semibold text-xl text-gray-600">Our Store</p>
            <p className="text-gray-500">
              Banasree 10 tala Market <br /> Dhaka , Bangladesh
            </p>
            <p className="text-gray-500">
              {" "}
              Tel: 01331759272 <br />
              Email: theboysware@gmail.com
            </p>
            <p className="font-semibold text-xl text-gray-600">
              BULK ORDER
            </p>
            <p className="text-gray-500">Contact Us for bulk</p>
            <a
  href="https://wa.me/8801331759272" // Replace with your WhatsApp number in international format
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center border px-6 py-2 text-sm hover:bg-black hover:text-white transition-all duration-500"
>
  <img src={assets.wa} alt="WhatsApp" className="mr-2" />
  Whatsapp
</a>
          </div>
        
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default contact;
