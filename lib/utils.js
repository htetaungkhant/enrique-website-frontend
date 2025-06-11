import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parsePhoneNumberWithError, isValidPhoneNumber, getCountries, getCountryCallingCode } from 'libphonenumber-js';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function removeUndefined(obj) {
  if (!obj || typeof obj !== "object") return obj;
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
}

// 'text' | 'single_choice' | 'rating' | 'multiple_choice' | 'email' | 'phone'
export function getQuestionaireErrorMessage(questionType) {
  switch (questionType) {
    case "email":
      return "Please enter a valid email address.";
    case "phone":
      return "Please enter a valid phone number.";
    case "text":
      return "This field cannot be empty.";
    case "single_choice":
      return "Please select an option.";
    case "rating":
      return "Please select a rating.";
    default:
      return "This field is required.";
  }
}

// Convert dial code to country code
export function dialCodeToCountryCode(dialCode) {
  // Remove '+' if present
  const cleanDialCode = dialCode.replace('+', '')

  // Find country that matches this dial code
  const countries = getCountries()
  for (const country of countries) {
    if (getCountryCallingCode(country) === cleanDialCode) {
      return country
    }
  }
  return null
}

// Convert country code to dial code
export function countryCodeToDialCode(countryCode) {
  try {
    return '+' + getCountryCallingCode(countryCode)
  } catch (error) {
    return null
  }
}

export function validatePhoneNumber(phoneNumber, dialCode = '+1') {
  try {
    // Convert dial code to country code
    const countryCode = dialCodeToCountryCode(dialCode)

    if (!countryCode) {
      return {
        isValid: false,
        error: `Invalid dial code: ${dialCode}`
      }
    }

    // Parse the phone number
    const parsedNumber = parsePhoneNumberWithError(phoneNumber, countryCode)

    return {
      isValid: parsedNumber.isValid(),
      formatted: parsedNumber.formatInternational(),
      national: parsedNumber.formatNational(),
      countryCode: parsedNumber.country,
      dialCode: '+' + parsedNumber.countryCallingCode,
      type: parsedNumber.getType(), // 'MOBILE', 'FIXED_LINE', etc.
      e164: parsedNumber.format('E.164')
    }
  } catch (error) {
    return {
      isValid: false,
      error: error.message
    }
  }
}

// Simple validation function with dial code
export function isPhoneValid(phoneNumber, dialCode = '+1') {
  const countryCode = dialCodeToCountryCode(dialCode)
  if (!countryCode) return false

  return isValidPhoneNumber(phoneNumber, countryCode)
}