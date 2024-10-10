import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Blog() {
  const notify = () => toast("Submitted Successfully!");
  const [errorMessages, setErrorMessages] = useState('');
  
  // React Hook Form
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { id } = useParams();
  const [blogdata, setBlogdata] = useState([]);

  // Form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image[0]); // Get the first file from the FileList

    try {
        const response = await axios.post('http://localhost:3002/blogs', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            notify(); // Show toast
            setErrorMessages(""); // Clear error messages
            reset(); // Reset form fields
        } else {
            setErrorMessages("Submission failed. Please try again.");
        }
    } catch (err) {
        console.log(err); // Log the error
        setErrorMessages(err.response?.data?.message || "An error occurred. Please try again."); // Set the error message
    }
};


  // Fetch data for submitted blogs
  useEffect(() => {
    axios.get('http://localhost:3002/blogssubmitted')
    .then((response) => setBlogdata(response.data))
    .catch((err) => console.log(err));
  }, []);

  return (
    <main className='md:m-5 m-2 bg-[#182B5C] py-2 md:p-5'>
      <section className='border md:m-5 m-2 rounded-xl h-full bg-white border-slate-950 p-4'>
        {errorMessages && (
          <div id="authmessage" className='text-center' style={{ color: 'red' }}>
            {errorMessages}
          </div>
        )}
        <hr className='h-1 bg-black w-80% m-auto' />

        {/* Blog registration form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className='border border-slate-950 m-4 p-4 rounded flex flex-col'>
          <div className='w-full flex justify-around flex-col items-center border border-slate-200 m-1'>
            <div className='flex flex-row gap-2 items-center'>
              <label className='pt-4' htmlFor="title">Title:</label>
              <input
                className='p-2 border border-slate-600 rounded-xl'
                {...register("title", { required: "Title is required" })}
                type="text"
                id="title"
                name="title"
              />
            </div>
            <p className='text-red-500 text-left text-[12px]'>{errors.title?.message}</p>
          </div>

          <div className='w-full flex justify-around flex-col items-center border border-slate-200 m-1'>
            <div className='flex flex-row gap-2 items-center'>
              <label className='pt-4' htmlFor="description">Description:</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className='p-2 border border-slate-600 rounded-xl'
                id="description"
                name="description"
              />
            </div>
            <p className='text-red-500 text-left text-[12px]'>{errors.description?.message}</p>
          </div>

          <div className='w-full flex justify-around flex-col items-center border border-slate-200 m-1'>
            <div className='flex flex-row gap-2 items-center'>
              <label className='pt-4' htmlFor="image">Featured Image:</label>
              <input
                {...register("image", { required: "Image is required" })}
                className='p-2 border border-slate-600 rounded-xl'
                type="file"
                id="image"
                accept="image/*" // Optional: restricts file selection to images only
                name="image"
              />
            </div>
            <p className='text-red-500 text-left text-[12px]'>{errors.image?.message}</p>
          </div>
          
          <div className='flex justify-around items-center'>
            <input className='bg-[#ED7D3B] p-3 rounded-xl m-3' type="submit" value="Submit" />
          </div>
        </form>
      </section>

      {/* Submitted blogs */}
      <section className='border md:m-5 m-2 bg-white rounded-xl border-slate-950 h-full p-4'>
        <p className='text-center'>Posted Blogs</p>
        <hr className='h-1 bg-black w-80% m-auto' />
        <table className="bg-white border my-10 md:w-full overflow-hidden border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="border border-slate-950 text-left">Id</th>
              <th className="border border-slate-950 text-left">Title</th>
              <th className="border border-slate-950 text-left">Description</th>
              <th className="border border-slate-950 text-left">Image</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {blogdata.map((item) => (
              <tr key={item.id}>
                <td className="border text-left">{item.id}</td>
                <td className="border text-left">{item.title}</td>
                <td className="border text-left">{item.description}</td>
                <td className="border text-left">
                  <img src={item.image} alt="" /> </td>
                <td className='border text-left'>
                  <Link to={`/update/${item.id}`}>
                    <button className='text-white rounded-xl bg-green-800 border text-center p-2'>update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ToastContainer
        position="top-center"
        autoClose={3000} // Automatically close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
}

export default Blog;
