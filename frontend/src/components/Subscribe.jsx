import React, { useState, useRef } from "react";

export default function Subscribe() {
  const [subscriber, setSubscriber] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const nameRef = useRef("");
  const emailRef = useRef("");
  const emailUnsubscribeRef = useRef("");

  function handleUnsubscribe(evt) {}

  function handleSubscription(evt) {
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
      {/* Subscribe facility */}
      <div className="mx-4 mt-4 border-2 border-blue-900 rounded-lg shadow-lg bg-blue-100 sm:mx-4">
        <form className="flex flex-col my-5">
          <div className="mx-4 mb-4 text-center font-bold text-amber-600">
            Not a subscriber? Subscribe to our newsletter
          </div>
          <div className="mx-4 mb-5 sm:mx-auto">
            <label className="text-blue-900 font-bold" htmlFor="name">
              Name:
            </label>
            <input
              className="border-2 border-blue-200 rounded-md ml-4"
              ref={nameRef}
              name="name"
              type="text"
              value={nameRef.current.value}
              onChange={handleSubscription}
            />
          </div>

          <div className="mx-4 sm:mx-auto">
            <label className="text-blue-900 font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="border-2 border-blue-200 rounded-md ml-5"
              ref={emailRef}
              name="email"
              type="email"
              value={emailRef.current.value}
              onChange={handleSubscription}
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
      {/* UnSubscribe facility */}
      <div className="mx-4 mt-4 border-2 border-blue-900 rounded-lg shadow-lg bg-blue-100 sm:mx-4">
        <form className="flex flex-col my-5">
          <div className="mx-4 mb-4 text-center font-bold text-amber-600">
            Unsubscribe
          </div>

          <div className="mx-4 sm:mx-auto">
            <label className="text-blue-900 font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="border-2 border-blue-200 rounded-md ml-5"
              ref={emailUnsubscribeRef}
              name="email"
              type="email"
              value={emailUnsubscribeRef.current.value}
              onChange={handleUnsubscribe}
            />
          </div>
          <button
            className=" mt-5 w-28   mx-auto border-2 border-blue-900 bg-blue-900 text-white rounded-md hover:shadow-2xl hover:text-blue-900 hover:bg-white transition east-out duration-500"
            onClick={console.log(emailUnsubscribeRef)}
          >
            Unsubscribe
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
