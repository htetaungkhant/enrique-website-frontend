import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parsePhoneNumberWithError, isValidPhoneNumber, getCountries, getCountryCallingCode, parsePhoneNumberFromString } from 'libphonenumber-js';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function removeUndefined(obj) {
  if (!obj || typeof obj !== "object") return obj;
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  );
}

export function maskEmail(email) {
  if (!email || typeof email !== "string") return email;

  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return email; // Invalid email format

  // Mask the local part
  const maskedLocalPart = localPart.length > 6 ?
    localPart.slice(0, 4) + "*".repeat(localPart.length - 5) + localPart[localPart.length - 1]
    : localPart.length > 2
      ? localPart[0] + "*".repeat(localPart.length - 2) + localPart[localPart.length - 1]
      : localPart;

  return `${maskedLocalPart}@${domain}`;
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
      return "Please give an option.";
    case "multiple_choice":
      return "Please give at least one option.";
    case "rating":
      return "Please give a rating.";
    case "time_zone":
      return "Please select a time zone.";
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

export function formatPhoneNumber(phoneNumberString) {
  if (!phoneNumberString || typeof phoneNumberString !== 'string') {
    return phoneNumberString;
  }

  // Attempt to parse the number in a few different ways to be robust.
  let phoneNumber = parsePhoneNumberFromString(phoneNumberString);

  // Try prepending a '+' if the initial parse fails to return a phone number object.
  if (!phoneNumber) {
    phoneNumber = parsePhoneNumberFromString('+' + phoneNumberString);
  }

  // As a fallback for US numbers without country code.
  if (!phoneNumber) {
    phoneNumber = parsePhoneNumberFromString(phoneNumberString, 'US');
  }

  if (phoneNumber) {
    if (phoneNumber.isValid()) {
      return phoneNumber.formatInternational();
    }
    // Even if not valid, if we have a country code, we can format it.
    if (phoneNumber.countryCallingCode) {
      return `+${phoneNumber.countryCallingCode} ${phoneNumber.nationalNumber}`;
    }
  }

  return phoneNumberString; // Return original if all parsing fails
}