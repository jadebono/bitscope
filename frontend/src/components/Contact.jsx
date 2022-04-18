import React, { useState } from "react";
// import { postState } from "../requests";

export default function Contact(props) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
  });
  const [submission, setSubmission] = useState(false);

  // the form field that will be displayed if submission === false
  const form = (
    <div className="flex justify-center mt-5 mb-20 md:mb-10">
      <div className="flex-col flex justify-center items-center w-4/5 md:w-1/3 bg-indigo-50 rounded-2xl border-2 border-indigo-900">
        <div className="my-2 text-xl  uppercase text-indigo-900 font-bold">
          Contact Us
        </div>

        <div className="my-2 text-center text-sm font-semibold  text-orange-700">
          We'll get back to you as soon as possible.{" "}
        </div>
        <form
          className="bg-white w-5/6 m-4 rounded-xl shadow-lg border border-1 border-indigo-900 flex flex-col justify-center text-indigo-900 font-semibold "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col ml-4 my-2">
            <label className="" htmlFor="name">
              Name and surname: <p className="inline-block">*</p>
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="name"
              type="text"
              value={fields.name || ""}
              onChange={handleChange}
              className="ml-4 w-2/3 border border-indigo-900 rounded-md shadow-sm p-1"
            />
          </div>
          <div className="flex flex-col mt-4 ml-4 mb-2">
            <label className="" htmlFor="email">
              Email: <p className="inline-block">*</p>
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="email"
              type="email"
              value={fields.email || ""}
              onChange={handleChange}
              className="ml-4 w-2/3 border border-indigo-900 rounded-md shadow-sm p-1"
            />
          </div>
          <div className="flex flex-col mt-4 ml-4 mb-2">
            <label className="" htmlFor="subject">
              Subject: <p className="inline-block">*</p>
            </label>
          </div>
          <div className="flex flex-col">
            <input
              required
              name="subject"
              type="text"
              value={fields.subject || ""}
              onChange={handleChange}
              className="ml-4 w-2/3 border border-indigo-900 rounded-md shadow-sm p-1"
            />
          </div>
          <div className="flex flex-col mt-4 ml-4 mb-2">
            <label className="" htmlFor="body">
              Text: <p className="inline-block">*</p>
            </label>
          </div>
          <div className="flex flex-col">
            <textarea
              rows="5"
              required
              name="body"
              type="text"
              value={fields.body || ""}
              onChange={handleChange}
              className="ml-4 w-5/6 border border-indigo-900 rounded-md shadow-sm p-1"
            />
          </div>
          <div className="flex flex-row my-4 justify-around">
            <button className=" mt-5 w-28 mx-auto border-2 border-indigo-900 bg-indigo-900 text-white rounded-md hover:shadow-2xl hover:text-indigo-900 hover:bg-white transition east-out duration-500">
              Submit
            </button>
          </div>
        </form>
        <p className="mb-4 text-center text-indigo-900 font-bold">
          *{" "}
          <span className="text-orange-700 font-normal">
            Required Information
          </span>
        </p>
      </div>
    </div>
  );

  // The email confirmation and return home button screen after a successful submission
  const returnHome = (
    <div className="flex justify-center mt-20">
      <div className="flex flex-col justify-center w-4/12 items-center bg-blue-50 rounded-2xl border-2 border-indigo-900">
        <div
          className="bg-orange-100 border-l-4 rounded-lg border-orange-500 text-orange-700 p-2 m-4"
          role="alert"
        >
          <p className="font-bold">Email submitted successfully!</p>
        </div>
        <button
          className="mb-4 p-2 btn-return-home"
          onClick={() => props.goPage("home")}
        >
          Return Home
        </button>
      </div>
    </div>
  );

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFields((prevFields) => {
      return { ...prevFields, [name]: value };
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // postState(fields, setSubmission, props.userId);
  }

  return <React.Fragment>{submission ? returnHome : form}</React.Fragment>;
}
