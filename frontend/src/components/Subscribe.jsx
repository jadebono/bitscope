import React, { useState, useRef } from "react";
import { subscribeUser, unsubscribeUser } from "../requests";

export default function Subscribe() {
  const [subscriber, setSubscriber] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const [email, setEmail] = useState("");

  const nameRef = useRef();
  const surnameRef = useRef();
  const emailRef = useRef();
  const emailUnsubscribeRef = useRef();

  function handleSubscription(evt) {
    const { name, value } = evt.target;
    setSubscriber((prevSubscriber) => {
      return {
        ...prevSubscriber,
        [name]: value,
      };
    });
  }

  function submitSubscriber(evt) {
    evt.preventDefault();
    subscribeUser(subscriber);
    setSubscriber((prevSubscriber) => {
      return {
        name: "",
        surname: "",
        email: "",
      };
    });
  }

  function handleUnsubscribe(evt) {
    const { value } = evt.target;
    setEmail((prevEmail) => value);
  }

  function submitUnsubscribe(evt) {
    evt.preventDefault();
    unsubscribeUser({ email: email });
    setEmail((prevEmail) => "");
  }

  return (
    <React.Fragment>
      {/* Subscribe facility */}
      <div className="mx-4 mt-4 border-2 border-indigo-900 rounded-lg shadow-lg bg-indigo-50 sm:mx-4 md:w-2/3 md:mx-auto">
        <form className="flex flex-col my-5">
          <div className="mb-4 text-center font-bold text-orange-700">
            Not a subscriber? Subscribe to our newsletter
          </div>
          <div className="mb-5 ml-2 sm:mx-auto">
            <label className="text-indigo-900 font-bold" htmlFor="name">
              Name:
            </label>
            <input
              className="border-2 border-indigo-200 rounded-md ml-10"
              ref={nameRef}
              name="name"
              type="text"
              required
              value={subscriber.name || ""}
              onChange={handleSubscription}
            />
          </div>
          <div className="mb-5 ml-2 sm:mx-auto">
            <label className="text-indigo-900 font-bold" htmlFor="surname">
              Surname:
            </label>
            <input
              className="border-2 border-indigo-200 rounded-md ml-4"
              ref={surnameRef}
              name="surname"
              type="text"
              required
              value={subscriber.surname || ""}
              onChange={handleSubscription}
            />
          </div>
          <div className=" ml-2 sm:mx-auto">
            <label className="text-indigo-900 font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="border-2 border-indigo-200 rounded-md ml-11"
              ref={emailRef}
              name="email"
              type="email"
              required
              value={subscriber.email || ""}
              onChange={handleSubscription}
            />
          </div>
          <button
            className=" mt-5 w-24  mx-auto border-2 border-indigo-900 bg-indigo-900 text-white rounded-md hover:shadow-2xl hover:text-indigo-900 hover:bg-white transition east-out duration-500"
            onClick={submitSubscriber}
          >
            Subscribe
          </button>
        </form>
      </div>
      {/* UnSubscribe facility */}
      <div className="mx-4 mt-4 border-2 border-indigo-900 rounded-lg shadow-lg bg-indigo-50 sm:mx-4 md:w-2/3 md:mx-auto">
        <form className="flex flex-col my-5">
          <div className="mx-4 mb-4 text-center font-bold text-orange-700">
            Unsubscribe
          </div>

          <div className="mx-4 sm:mx-auto">
            <label className="text-indigo-900 font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="border-2 border-indigo-200 rounded-md ml-5"
              ref={emailUnsubscribeRef}
              name="email"
              type="email"
              required
              value={email || ""} // see if you need state for this
              onChange={handleUnsubscribe}
            />
          </div>
          <button
            className=" mt-5 w-28 mx-auto border-2 border-indigo-900 bg-indigo-900 text-white rounded-md hover:shadow-2xl hover:text-indigo-900 hover:bg-white transition east-out duration-500"
            onClick={submitUnsubscribe}
          >
            Unsubscribe
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
