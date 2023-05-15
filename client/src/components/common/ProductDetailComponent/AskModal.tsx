import * as React from "react";
import { Modal } from "../../../interfaces/product";
import CloseButton from "../CloseButton";

export default function AskModal(props: Modal) {
  return (
    <div className="absolute z-[2] w-full h-[100vh] top-0 left-0 ">
      <div
        onClick={props.closeModal}
        className="absolute w-full h-[100vh] top-0 left-0 bg-stone-950 opacity-60 "
      ></div>
      <div className="h-4/5 absolute z-[3] translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2 bg-gray-100 w-1/3 p-8 animate-[modalHeight_0.5s_ease-in-out]  overflow-y-scroll">
        <div className="border-b-[1px] flex justify-between border-gray-300 mb-8">
          <h2 className="pb-4 text-3xl border-b-2 border-black inline-block">
            Ask a question
          </h2>
          <div>
            <CloseButton closeModal={props.closeModal} />
          </div>
        </div>
        <form
          onClick={(e) => {
            e.preventDefault();
          }}
          className="text-sm"
        >
          <div className="flex gap-4 mb-5">
            <input
              placeholder="Yourname"
              className="bg-gray-200 leading-[50px] basis-1/2 outline-none px-5"
              type="text"
            />
            <input
              placeholder="Your email"
              className="bg-gray-200 leading-[50px] basis-1/2 outline-none px-5"
              type="email"
              required
            />
          </div>
          <div className="mb-5">
            <input
              placeholder="Phone number"
              className="bg-gray-200 leading-[50px] w-full outline-none px-5"
              type="text"
              required
            />
          </div>
          <div className="mb-5">
            <textarea
              placeholder="Your message..."
              className="bg-gray-200 h-52 leading-[50px] w-full outline-none px-5"
            />
          </div>
          <div className="group/message">
            <button
              type="submit"
              className=" uppercase mb-6 leading-[50px] w-full border-black border hover:border-[#6e2f1b] relative text-white text-xs tracking-[3px]"
            >
              <div className="w-0 z-0 h-full group-hover/message:w-full duration-500 bg-[#6e2f1b] absolute"></div>
              <span className="group-hover/message:text-white duration-500 text-black z-[1] relative">
                send message
              </span>
            </button>
          </div>
          <div className="flex">
            <div className="basis-1/5 mr-5">
              <img
                src="https://cdn.shopify.com/s/files/1/0136/8467/0523/products/products-10_1080x1080.jpg?v=1656481580"
                alt=""
              />
            </div>
            <div className="basis-4/5 flex flex-col justify-center gap-2">
              <p className="capitalize">{props.product?.name}</p>
              <p className="text-gray-400">
                ${props.product?.price && props.product?.price / 100}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
