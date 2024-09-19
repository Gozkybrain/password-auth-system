import React, { useState } from "react";

export default function PasswordInput({
  label = "Password checker",
  label2 = "Character Length",
  placeholder = "Enter your password",
  onChange,
}) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (onChange) {
      onChange(newPassword);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-5 bg-[#0c100c] shadow-lg">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-200 text-[18px] text-center mb-5"
        >
          {label}
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder={placeholder}
            value={password}
            onChange={handlePasswordChange}
            className="block w-full px-4 py-5 bg-[#555555] text-white text-[5px] focus:border-gray-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-sm text-gray-400 hover:text-gray-100"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-400">
          Your password must be at least 8 characters long.
        </p>
      </div>
      <div className="max-w-md mx-auto mt-3 p-6 pb-10 bg-[#0c100c] shadow-lg">
        <label
          htmlFor="character length"
          className="block text-sm font-medium mb-6 text-gray-200 text-xl mb-2"
        >
          {label2}
        </label>
        
        <div className="flex items-center space-x-2 mb-5">
          {/* Uppercase Letters */}
          <input
            type="checkbox"
            id="uppercase-checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            className="hidden"
          />
          <label
            htmlFor="uppercase-checkbox"
            className={`w-6 h-6 flex items-center justify-center border-2 cursor-pointer ${
              includeUppercase ? "bg-gray-500 border-black" : "border-white"
            }`}
          >
            {includeUppercase && (
              <svg
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
          <span className="text-gray-300">Include Uppercase Letters</span>
        </div>

        <div className="flex items-center space-x-2 mb-5">
          {/* Lowercase Letters */}
          <input
            type="checkbox"
            id="lowercase-checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
            className="hidden"
          />
          <label
            htmlFor="lowercase-checkbox"
            className={`w-6 h-6 flex items-center justify-center border-2 cursor-pointer ${
              includeLowercase ? "bg-gray-500 border-black" : "border-white"
            }`}
          >
            {includeLowercase && (
              <svg
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
          <span className="text-gray-300">Include Lowercase Letters</span>
        </div>

        <div className="flex items-center space-x-2 mb-5">
          {/* Numbers */}
          <input
            type="checkbox"
            id="numbers-checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="hidden"
          />
          <label
            htmlFor="numbers-checkbox"
            className={`w-6 h-6 flex items-center justify-center border-2 cursor-pointer ${
              includeNumbers ? "bg-gray-500 border-black" : "border-white"
            }`}
          >
            {includeNumbers && (
              <svg
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
          <span className="text-gray-300">Include Numbers</span>
        </div>

        <div className="flex items-center space-x-2 mb-5">
          {/* Symbols */}
          <input
            type="checkbox"
            id="symbols-checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            className="hidden"
          />
          <label
            htmlFor="symbols-checkbox"
            className={`w-6 h-6 flex items-center justify-center border-2 cursor-pointer ${
              includeSymbols ? "bg-gray-500 border-black" : "border-white"
            }`}
          >
            {includeSymbols && (
              <svg
                className="h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
          <span className="text-gray-300">Include Symbols</span>
        </div>
        <div className="bg-[#343434] p-4 flex">
            <p className="text-gray-400 text-center">STRENGTH</p>
            <p className="text-2xl pl-[60px] text-gray-300 text-center"> MEDIUM </p>
        </div>
      </div>
    </div>
  );
}
