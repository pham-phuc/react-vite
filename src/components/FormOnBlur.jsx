import { useForm, Controller } from "react-hook-form";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const rangePresets = [
  {
    label: "Last 7 Days",
    value: [dayjs().add(-7, "d"), dayjs()],
  },
  {
    label: "Last 14 Days",
    value: [dayjs().add(-14, "d"), dayjs()],
  },
  {
    label: "Last 30 Days",
    value: [dayjs().add(-30, "d"), dayjs()],
  },
  {
    label: "Last 90 Days",
    value: [dayjs().add(-90, "d"), dayjs()],
  },
];
const OnblurForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    control,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phoneNumber: "",
      website: "",
      dateOfBirth: "",
      firstName: "",
      lastName: "",
      linkedIn: "",
      facebook: "",
      activeRange: {
        startDate: "",
        endDate: "",
      },
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  const onRangeChange = (dates) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
    } else {
      console.log("Clear");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <div className="grid md:grid-cols-2 md:gap-6">
        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Username</label>
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 8,
                message: "Username must be at least 8 characters",
              },
              pattern: {
                value: /^[a-z]+$/,
                message:
                  "No uppercase letters, numbers, or special characters allowed",
              },
            })}
            onBlur={() => trigger("username")}
            placeholder="Enter username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message:
                  "Password must include at least one uppercase letter, one number, and one special character",
              },
            })}
            onBlur={() => trigger("password")}
            placeholder="Enter password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            onBlur={() => trigger("confirmPassword")}
            placeholder="Confirm password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            onBlur={() => trigger("email")}
            placeholder="Enter email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Phone Number</label>
          <input
            type="text"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^0\d{9,10}$/,
                message:
                  "Phone number must start with 0 and be at least 10 digits",
              },
            })}
            onBlur={() => trigger("phoneNumber")}
            placeholder="Enter phone number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Website */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Website</label>
          <input
            type="text"
            {...register("website", {
              required: "Website is required",
              pattern: {
                value: /^(https?:\/\/)?([\w-]+)\.([a-z]+)(\/[\w-]*)*$/,
                message: "Invalid website format",
              },
            })}
            onBlur={() => trigger("website")}
            placeholder="Enter website"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.website && (
            <p className="text-red-500 text-xs mt-1">
              {errors.website.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Date of Birth</label>
          <Controller
            name="dateOfBirth"
            control={control}
            rules={{
              required: "Date of Birth is required",
              validate: {
                validDate: (value) => {
                  const year = new Date(value).getFullYear();
                  return (
                    (year >= 1980 && year <= 2020) ||
                    "Year must be between 1980 and 2020"
                  );
                },
              },
            }}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                onBlur={() => trigger("dateOfBirth")}
                placeholder="Select date"
              />
            )}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* First Name and Last Name */}

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">First Name</label>
          <input
            {...register("firstName", {
              required: "First Name is required",
            })}
            onBlur={() => trigger("firstName")}
            placeholder="Enter first name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Last Name</label>
          <input
            {...register("lastName", {
              required: "Last Name is required",
            })}
            onBlur={() => trigger("lastName")}
            placeholder="Enter last name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* LinkedIn */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">LinkedIn</label>
          <input
            {...register("linkedIn", {
              pattern: {
                value: /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
                message: "Invalid LinkedIn URL",
              },
            })}
            onBlur={() => trigger("linkedIn")}
            placeholder="Enter LinkedIn URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.linkedIn && (
            <p className="text-red-500 text-xs mt-1">
              {errors.linkedIn.message}
            </p>
          )}
        </div>

        {/* Facebook */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Facebook</label>
          <input
            {...register("facebook", {
              pattern: {
                value: /^https?:\/\/(www\.)?facebook\.com\/.+$/,
                message: "Invalid Facebook URL",
              },
            })}
            onBlur={() => trigger("facebook")}
            placeholder="Enter Facebook URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.facebook && (
            <p className="text-red-500 text-xs mt-1">
              {errors.facebook.message}
            </p>
          )}
        </div>

        {/* Active Range */}
        <div>
          {/* Other input fields */}

          {/* Active Range */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Active Range</label>
            <Controller
              name="activeRange"
              control={control}
              rules={{
                required: "Start and End Date are required",
                validate: (value) => {
                  const startDate = value ? value[0] : null;
                  const endDate = value ? value[1] : null;
                  return (
                    (startDate &&
                      endDate &&
                      new Date(startDate) < new Date(endDate)) ||
                    "End date must be after start date"
                  );
                },
              }}
              render={({ field }) => (
                <RangePicker
                  {...field}
                  presets={rangePresets}
                  onChange={(dates) => {
                    field.onChange(dates);
                    onRangeChange(dates);
                  }}
                  format="YYYY/MM/DD"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  onBlur={() => trigger("activeRange")}
                />
              )}
            />
            {errors.activeRange && (
              <p className="text-red-500 text-xs mt-1">
                {errors.activeRange.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className=" bg-blue-500 text-white py-2 px-4 rounded-md mt-4 disabled:bg-gray-400"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};

export default OnblurForm;
