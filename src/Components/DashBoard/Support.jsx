import React from "react";

const ContactForm = () => {
  return (
    <form className="flex flex-col gap-5 mx-10 my-5">
      <input
        type="text"
        placeholder="Your Name"
        required
        name="Name"
        className="bg-white border font-[source sans 3] rounded-xl py-3 px-5 w-full font-semibold text-md outline-none"
      />
      <input
        type="email"
        placeholder="Your Email"
        name="Email"
        className="bg-white border font-[source sans 3] rounded-xl py-3 px-5 w-full font-semibold text-md outline-none"
      />
      <input
        type="tel"
        id="phone"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        required
        placeholder="Your Phone Number"
        name="phone"
        className="bg-white border font-[source sans 3] rounded-xl py-3 px-5 w-full font-semibold text-md outline-none"
      />
    </form>
  );
};

const Support = () => {
  return (
    <div className="bg-[#f6f8fb]">
      <h1 draggable={true} className="font-[lato] font-semibold text-4xl">
        Need More Help?
      </h1>
      <ContactForm />
    </div>
  );
};

export default Support;
