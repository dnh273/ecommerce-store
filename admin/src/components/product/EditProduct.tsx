import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProduct } from "../../interfaces/product";
import productApi from "../../api/modules/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../common/LoadingPage";
import ErrorPage from "../common/ErrorPage";

const EditProduct = () => {
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IProduct>();

  const onSubmit: SubmitHandler<IProduct> = (data) => {
    setLoading(true);
    productApi
      .updateProduct(id, data)
      .then((res) => {
        if (res.status === 200) {
          navigate("/products");
        }
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  const handleDiscardChange = () => {
    navigate(-1);
  };

  const productQuery = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return productApi.getSingleProduct(id).then((res) => {
        const { product } = res.data;
        setValue("name", product.name);
        setValue("company", product.company);
        setValue("price", product.price);
        setValue("inventory", product.inventory);
        setValue("category", product.category);
        setValue("image", product.image);
        setValue("description", product.description);
        setValue("averageRating", product.averageRating);
        setValue("numOfReviews", product.numOfReviews);
        return res.data;
      });
    },
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (productQuery.isLoading) {
    return <LoadingPage />;
  }

  if (productQuery.isError) {
    return <ErrorPage />;
  }

  return (
    <section className="bg-white dark:bg-gray-800 p-4 rounded">
      <div className=" mx-auto">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Update product
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product name
              </label>
              <input
                type="text"
                {...register("name", { required: "Product name is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type product name"
              />
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                {errors.name && <span>{errors.name.message}</span>}
              </p>
            </div>

            <div className="w-full">
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand
              </label>
              <input
                type="text"
                {...register("company", {
                  required: "Company name is required",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product brand"
              />
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                {errors.company && <span>{errors.company.message}</span>}
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="$2999"
              />
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                {errors.price && <span>{errors.price.message}</span>}
              </p>
            </div>
            <div className="w-full">
              <label
                htmlFor="averageRating"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Average Rating
              </label>
              <input
                type="text"
                {...register("averageRating")}
                className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product brand"
                disabled={true}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="numOfReviews"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Number of reviews
              </label>
              <input
                type="number"
                {...register("numOfReviews")}
                className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="$2999"
                disabled={true}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>

              <select
                {...register("category", { required: "Category is required" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue="">Select category</option>
                {[
                  "office",
                  "kitchen",
                  "bedroom",
                  "lighting",
                  "storage",
                  "table",
                  "sofas",
                  "outdoor",
                ].map((item, index) => {
                  return (
                    <option key={item} value={item} className="capitalize">
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </option>
                  );
                })}
              </select>
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                {errors.category && <span>{errors.category.message}</span>}
              </p>
            </div>
            <div>
              <label
                htmlFor="inventory"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Inventory
              </label>
              <input
                type="number"
                {...register("inventory", {
                  required: "Inventory is required",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={"12"}
              />
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                {errors.inventory && <span>{errors.inventory.message}</span>}
              </p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image URL
              </label>
              <input
                type="text"
                {...register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value:
                      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                    message:
                      "Ensure your URL starts with HTTP/HTTPS and correct",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type product image"
              />
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                {errors.image && <span>{errors.image.message}</span>}
              </p>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 50, message: "At least 50 characters" },
                  maxLength: { value: 400, message: "Max is 50 characters" },
                })}
                rows={8}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your description here"
              />
              <p
                id="filled_error_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                {errors.description && (
                  <span>{errors.description.message}</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-3">
            <button
              type="submit"
              disabled={isLoading}
              className={`text-white ${
                isLoading && "cursor-not-allowed"
              } bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
              {isLoading ? (
                <div>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-200"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Loading...
                </div>
              ) : (
                "Update product"
              )}
            </button>
            <button
              type="button"
              className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={handleDiscardChange}
            >
              <svg
                className="w-5 h-5 mr-1 -ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Discard change
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
