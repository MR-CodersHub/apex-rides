/**
 * Accessible Client-Side Form Validation Engine
 * Compliant with WCAG 2.1 AA Guidelines
 */

document.addEventListener("DOMContentLoaded", () => {
  // Target all forms that explicitly opt-in to validation via data attribute
  const dynamicForms = document.querySelectorAll('[data-validate="form"]');

  dynamicForms.forEach((form) => {
    // Disable native browser tooltips so our custom accessible messaging takes over
    form.setAttribute("novalidate", "true");

    const inputFields = form.querySelectorAll("input, textarea, select");

    // Real-time validation as the user types or leaves a field
    inputFields.forEach((field) => {
      field.addEventListener("blur", () => checkFieldValidity(field));
      field.addEventListener("input", () => {
        // If the field becomes valid while typing, clear errors immediately
        if (field.checkValidity()) {
          clearFieldError(field);
        }
      });
    });

    // Final validation check on form submission
    form.addEventListener("submit", (event) => {
      let isFormValid = true;

      inputFields.forEach((field) => {
        const isFieldValid = checkFieldValidity(field);
        if (!isFieldValid) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        event.preventDefault(); // Stop form submission
        
        // Focus the first invalid element to assist keyboard and screen-reader users
        const firstInvalidField = form.querySelector("[aria-invalid='true']");
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
      }
    });
  });

  /**
   * Evaluates a single input element and updates its accessibility state
   */
  function checkFieldValidity(field) {
    // Skip fields that are disabled or read-only
    if (field.disabled || field.readOnly) return true;

    if (!field.checkValidity()) {
      showFieldError(field);
      return false;
    } else {
      clearFieldError(field);
      return true;
    }
  }

  /**
   * Injects accessible errors and pairs them to the input via aria-describedby
   */
  function showFieldError(field) {
    const errorContainerId = `${field.id}-error`;
    let errorElement = document.getElementById(errorContainerId);

    // Create the error message block if it doesn't exist yet
    if (!errorElement) {
      errorElement = document.createElement("p");
      errorElement.id = errorContainerId;
      // Tailwind classes tailored for your design system
      errorElement.className = "text-xs font-medium text-red-500 mt-1 transition-all duration-200 animate-fadeIn ltr:text-left rtl:text-right";
      errorElement.setAttribute("role", "alert"); // Accessible screen reader announcement
      field.parentNode.appendChild(errorElement);
    }

    // Determine the custom error message based on the specific validation failure
    errorElement.textContent = getCustomErrorMessage(field);

    // Link the error element to the input field visually and programmatically
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", errorContainerId);
    
    // Custom visual border state for Tailwind
    field.classList.add("border-red-500", "focus-visible:ring-red-500");
  }

  /**
   * Cleans up error messages and resets accessibility attributes
   */
  function clearFieldError(field) {
    const errorContainerId = `${field.id}-error`;
    const errorElement = document.getElementById(errorContainerId);

    if (errorElement) {
      errorElement.remove();
    }

    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
    field.classList.remove("border-red-500", "focus-visible:ring-red-500");
  }

  /**
   * Maps native validity states to intuitive, context-aware strings
   */
  function getCustomErrorMessage(field) {
    const validity = field.validity;
    const labelName = field.previousElementSibling?.textContent?.replace("*", "").trim() || "This field";

    if (validity.valueMissing) {
      return `${labelName} is required.`;
    }
    if (validity.typeMismatch) {
      if (field.type === "email") return "Please enter a valid email address (e.g., name@domain.com).";
      if (field.type === "url") return "Please enter a valid website address.";
    }
    if (validity.patternMismatch) {
      return field.getAttribute("title") || "Please match the requested format.";
    }
    if (validity.tooShort) {
      return `${labelName} must be at least ${field.getAttribute("minlength")} characters long.`;
    }
    if (validity.rangeUnderflow) {
      return `${labelName} cannot be less than ${field.getAttribute("min")}.`;
    }
    
    return "The value entered is invalid.";
  }
});