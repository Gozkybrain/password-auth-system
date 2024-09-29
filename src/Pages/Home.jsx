import React, { useState, useEffect} from "react";

export default function PasswordInput({
  label = "Password checker",
  label2 = "Character Length",
  placeholder = "Enter a password to check strength",
  onChange,
}) {
  const [randomPassword, setRandomPassword] = useState(""); //state for the generated password
  const [typedPassword, setTypedPassword] = useState(""); // State for the manually typed password
  const [showPassword, setShowPassword] = useState(false);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [typedPasswordStrength, setTypedPasswordStrength] = useState("")
  const [passwordLength, setPasswordLength] = useState(8); // Default password length

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";
    let characterPool = "";

    if (includeUppercase) characterPool += uppercaseChars;
    if (includeLowercase) characterPool += lowercaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    if (characterPool === "") {
      setRandomPassword("");
      setPasswordStrength("No criteria selected!");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }
    setRandomPassword(generatedPassword);
    checkPasswordStrength(generatedPassword);
    checkTypedPasswordStrenth(generatePassword);
  };

  //function to check strength of generated password
  const checkPasswordStrength = (pwd) => {
    const strongPasswordCriteria =
      includeUppercase && includeLowercase && includeNumbers && includeSymbols;
    const mediumPasswordCriteria =
      (includeUppercase && includeNumbers) ||
      (includeLowercase && includeSymbols);

    if (strongPasswordCriteria && pwd.length >= 10) {
      setPasswordStrength("High");
    } else if (mediumPasswordCriteria && pwd.length >= 8) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Low");
    }
  };

  
  // Function to check the strength of the typed password (independent of checkboxes)
  const checkTypedPasswordStrength = (pwd) => {
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    const hasSymbols = /[!@#$%^&*()_+~`|}{[\]:;?><,./-]/.test(pwd);

    const isStrong = hasUppercase && hasLowercase && hasNumbers && hasSymbols;
    const isMedium =
      (hasUppercase && hasNumbers) ||
      (hasLowercase && hasSymbols) ||
      (hasUppercase && hasSymbols);

    if (pwd.length >= 10 && isStrong) {
      setTypedPasswordStrength("High");
    } else if (pwd.length >= 8 && isMedium) {
      setTypedPasswordStrength("Medium");
    } else {
      setTypedPasswordStrength("Low");
    }
  };

  useEffect(() => {
    checkTypedPasswordStrength(typedPassword); // Check strength for the typed password
  }, [typedPassword]); // Only depend on the typed password

  //function to copy password
  const copyPassword = () => {
    navigator.clipboard.writeText(randomPassword);
    alert("Password copied to clipboard");
  };

  const handleTypedPasswordChange = (e) => {
    const newPassword = e.target.value;
    setTypedPassword(newPassword); //Update the manually typed password
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
        {/* input field to check typed password strength  */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="typedpassword"
            placeholder={placeholder}
            value={typedPassword}
            onChange={handleTypedPasswordChange}
            className="block w-full px-4 py-5 bg-[#555555] text-white text-[5px] focus:border-gray-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-sm text-green-500 hover:text-gray-100"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {/* end of input field to check typed password strenth */}

        {/* dynamically displays password strength */}
        <p className="mt-2 text-sm text-gray-400 mb-3">
        Password Strength: <span className="text-green-500">{typedPasswordStrength}</span>
        </p>
        {/* start of input field to randomize password */}
        <div className="relative">
          <input
            type="text"
            id="randomPassword"
            placeholder="Generate and copy password"
            value={randomPassword}
            readOnly
            className="block w-full px-4 py-5 bg-[#555555] text-white text-[5px] focus:border-gray-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={copyPassword}
            className="absolute inset-y-0 right-0 flex items-center px-4 text-sm text-green-500 hover:text-gray-100"
          >
            Copy
          </button>
        </div>
        {/* end of input field to randomize password*/}  
      </div>

      <div className="max-w-md mx-auto mt-3 p-6 pb-10 bg-[#0c100c] shadow-lg">
         <div className="flex flex-row justify-between">
          {" "}
          <label
            htmlFor="character-length"
            className="block text-sm font-medium mb-6 text-gray-200 "
          >
            {label2}
          </label>
          <p className="text-green-500 text-2xl">{passwordLength}</p>
        </div>
        <input
          type="range"
          min="6"
          max="20"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          className="w-full mb-4 text-green-500"
        />

          {/* Checkboxes for password criteria */}
          <div className="flex items-center space-x-2 mb-5">

            {/* uppercase letters */}
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
        <div className="bg-[#343434] p-4 flex justify-between">
          <p className="text-gray-400 text-center">STRENGTH</p>
          <p className="text-2xl pl-[10px] text-gray-300 text-center mr-8">
            {passwordStrength}
          </p>
        </div>
        <button
          onClick={generatePassword}
          className="w-full mt-2 p-4 text-center bg-green-500 hover:bg-transparent border border-black hover:text-green-500 hover:border-green-500"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}
