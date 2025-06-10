import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

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