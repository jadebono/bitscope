import React, { useState, useRef } from "react";

export default function Subscribe() {
  const [subscriber, setSubscriber] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const nameRef = useRef("");
  const emailRef = useRef("");

  function handleChange(evt) {
    const { name, value } = evt.target;
    setSubscriber((prevSubscriber) => {
      return {
        ...prevSubscriber,
        [name]: value,
      };
    });
  }

  return (
    <React.Fragment>
      <div className="border-2 border-blue-900 rounded-lg shadow-lg bg-blue-100 w-1/3 mx-auto">
        <form className="flex flex-col mx-auto my-5">
          <div className="mx-4 mb-5">
            <label className="text-blue-900 font-bold" htmlFor="name">
              Name:
            </label>
            <input
              className="border-2 border-blue-200 rounded-md ml-4"
              ref={nameRef}
              name="name"
              type="text"
              value={nameRef.current.value}
              onChange={handleChange}
            />
          </div>

          <div className="mx-4 ">
            <label className="text-blue-900 font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="border-2 border-blue-200 rounded-md ml-5"
              ref={emailRef}
              name="email"
              type="email"
              value={emailRef.current.value}
              onChange={handleChange}
            />
          </div>
          <button
            className=" mt-5 w-24  mx-auto border-2 border-blue-900 bg-blue-900 text-white rounded-md hover:shadow-2xl hover:text-blue-900 hover:bg-white transition east-out duration-500"
            onClick={console.log(nameRef)}
          >
            Subscribe
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
