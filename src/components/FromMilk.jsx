import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(8, "Username must be at least 8 characters")
    .matches(
      /^[a-z0-9]+$/,
      "Username can only contain lowercase letters and numbers"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  email: yup.string().required("Email is required").email("Email is not valid"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^0\d{9,10}$/,
      "Phone number must be at least 10 digits and start with 0"
    ),
  website: yup
    .string()
    .required("Website is required")
    .matches(
      /^(https?:\/\/)?([a-zA-Z0-9]+[.-])+[a-zA-Z0-9]{2,6}$/,
      "Website URL is not valid"
    ),
  dateOfBirth: yup
    .string()
    .required("Date of Birth is required")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
      "Date of Birth must be in DD-MM-YYYY format"
    )
    .test("age", "Age must be between 1980 and 2020", (value) => {
      const year = parseInt(value.split("-")[2], 10);
      return year >= 1980 && year <= 2020;
    }),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  linkedIn: yup
    .string()
    .optional()
    .matches(
      /^https:\/\/(www\.)?linkedin\.com\/.*$/,
      "LinkedIn URL is not valid"
    ),
  facebook: yup
    .string()
    .optional()
    .matches(
      /^https:\/\/(www\.)?facebook\.com\/.*$/,
      "Facebook URL is not valid"
    ),
  activeRange: yup
    .object({
      startDate: yup
        .date()
        .required("Start Date is required")
        .min(new Date(), "Start Date must be later than today"),
      endDate: yup
        .date()
        .required("End Date is required")
        .min(yup.ref("startDate"), "End Date must be later than Start Date"),
    })
    .required(),
});

const UserProfileForm = ({ mode }) => {
  const [formMode, setFormMode] = useState(mode || "onSubmit");
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: formMode === "onSubmit" ? "onSubmit" : "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      className="w-full mx-auto p-6 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Username:</label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter username"
              />
            )}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Password:</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter password"
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Confirm Password:
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Confirm password"
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email:</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter email"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Phone Number:</label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter phone number"
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Website:</label>
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter website"
              />
            )}
          />
          {errors.website && (
            <p className="text-red-500 text-xs mt-1">
              {errors.website.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Date of Birth:</label>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
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

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">First Name:</label>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter first name"
              />
            )}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Last Name:</label>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter last name"
              />
            )}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">LinkedIn:</label>
          <Controller
            name="linkedIn"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter LinkedIn URL"
              />
            )}
          />
          {errors.linkedIn && (
            <p className="text-red-500 text-xs mt-1">
              {errors.linkedIn.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Facebook:</label>
          <Controller
            name="facebook"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                placeholder="Enter Facebook URL"
              />
            )}
          />
          {errors.facebook && (
            <p className="text-red-500 text-xs mt-1">
              {errors.facebook.message}
            </p>
          )}
        </div>

        {/* Active Range */}

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

      <button
        type="submit"
        disabled={formMode === "onBlur" && !isValid}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
      >
        Submit
      </button>
    </form>
  );
};

export default UserProfileForm;
