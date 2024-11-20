import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HomePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { userEmail, userName, userPhone, deparment, position } = data;
    console.log(data);
    try {
      const userInfo = {
        userEmail,
        userName,
        userPhone,
        deparment,
        position,
      };
      const { data } = await axios.post(
        `http://localhost:5000/add-user`,
        userInfo
      );
      console.log(data);
      if (data.acknowledged === true) {
        navigate("/employlist");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center min-h-[80vh]">
      <div className="bg-slate-500 my-10 rounded-lg p-5 min-w-[600px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div>
              <label htmlFor="name" className="block  text-white mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full px-3 py-2 border outline-none rounded-lg text-white  bg-transparent  "
                {...register("userName", {
                  required: true,
                })}
              />
            </div>
            <div>
              <label htmlFor="photo" className="block  text-white mb-2 text-sm">
                Department
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-lg outline-none border-gray-200 bg-transparent `}
                {...register("position", {
                  required: "Positions",
                })}
              >
                <option value="">Positions</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-white  text-sm">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border rounded-lg outline-none text-white border-gray-200 bg-transparent  "
                {...register("userEmail", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid Email",
                  },
                })}
              />
              {errors.userEmail && (
                <small className="text-red-500 font-bold">
                  {errors.userEmail.message}
                </small>
              )}
            </div>
            <div>
              <label htmlFor="photo" className="block  text-white mb-2 text-sm">
                Phone Number
              </label>
              <input
                type="phone"
                placeholder="+880 1*********"
                className="w-full px-3 py-2 border outline-none text-white rounded-lg bg-transparent  "
                {...register("userPhone", {
                  required: true,
                  minLength: {
                    value: 11,
                    message: "Phone number must be in 11 digit",
                  },
                  maxLength: {
                    value: 11,
                    message: "Phone number must be in 11 digit",
                  },
                })}
              />
            </div>
            <div>
              <label htmlFor="photo" className="block  text-white mb-2 text-sm">
                Department
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border outline-none text-white rounded-lg bg-transparent  "
                {...register("deparment", {
                  required: true,
                })}
              />
            </div>
            <div className="flex my-4 justify-center">
              <div>
                <input
                  type="submit"
                  value="Register"
                  className="bg-slate-600 rounded-lg p-3"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
