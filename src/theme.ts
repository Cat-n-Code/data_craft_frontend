import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

export default definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: "0",
      xs: "0.25rem",
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1.0rem",
      xl: "1.5rem",
    },
  },
  semantic: {
    primary: {
      50: "{lime.50}",
      100: "{lime.100}",
      200: "{lime.200}",
      300: "{lime.300}",
      400: "{lime.400}",
      500: "{lime.500}",
      600: "{lime.600}",
      700: "{lime.700}",
      800: "{lime.800}",
      900: "{lime.900}",
      950: "{lime.950}",
    },
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "{gray.50}",
          100: "{gray.100}",
          200: "{gray.200}",
          300: "{gray.300}",
          400: "{gray.400}",
          500: "{gray.500}",
          600: "{gray.600}",
          700: "{gray.700}",
          800: "{gray.800}",
          900: "{gray.900}",
          950: "{gray.950}",
        },
      },
    },
  },
});
