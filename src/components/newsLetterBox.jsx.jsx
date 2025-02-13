import React from "react";

const newsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Suscribe Now for get 20% Off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
        asperiores facere, officiis itaque ex tempora repellendus modi
        excepturi! Perferendis
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
        action=""
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="Email"
          placeholder="Enter Your Email"
        />
        <button type="submit" className="bg-black text-white text-m px-10 py-4">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default newsLetterBox;
