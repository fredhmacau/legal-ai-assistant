import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        // Primary — Angolan Red
        primary: {
          value: "#a30019",
        },
        "primary.container": {
          value: "#ce1126",
        },
        "primary.fixed": {
          value: "#ffdad7",
        },
        "primary.fixed.dim": {
          value: "#ffb3ae",
        },
        "on.primary": {
          value: "#ffffff",
        },
        "on.primary.container": {
          value: "#ffe0dd",
        },
        "on.primary.fixed": {
          value: "#410004",
        },
        "on.primary.fixed.variant": {
          value: "#930015",
        },
        "inverse.primary": {
          value: "#ffb3ae",
        },

        // Secondary — Golden Yellow
        secondary: {
          value: "#725c00",
        },
        "secondary.container": {
          value: "#fed330",
        },
        "secondary.fixed": {
          value: "#ffe07d",
        },
        "secondary.fixed.dim": {
          value: "#ebc31a",
        },
        "on.secondary": {
          value: "#ffffff",
        },
        "on.secondary.container": {
          value: "#705b00",
        },
        "on.secondary.fixed": {
          value: "#231b00",
        },
        "on.secondary.fixed.variant": {
          value: "#564500",
        },

        // Tertiary — Pitch Black
        tertiary: {
          value: "#4f4f4f",
        },
        "tertiary.container": {
          value: "#676767",
        },
        "tertiary.fixed": {
          value: "#e2e2e2",
        },
        "tertiary.fixed.dim": {
          value: "#c6c6c6",
        },
        "on.tertiary": {
          value: "#ffffff",
        },
        "on.tertiary.container": {
          value: "#e6e6e6",
        },
        "on.tertiary.fixed": {
          value: "#1b1b1b",
        },
        "on.tertiary.fixed.variant": {
          value: "#474747",
        },

        // Surface & Background
        surface: {
          value: "#f8f9fa",
        },
        "surface.dim": {
          value: "#d9dadb",
        },
        "surface.bright": {
          value: "#f8f9fa",
        },
        "surface.container": {
          value: "#edeeef",
        },
        "surface.container.low": {
          value: "#f3f4f5",
        },
        "surface.container.high": {
          value: "#e7e8e9",
        },
        "surface.container.highest": {
          value: "#e1e3e4",
        },
        "surface.container.lowest": {
          value: "#ffffff",
        },
        "surface.tint": {
          value: "#c0001f",
        },
        "surface.variant": {
          value: "#e1e3e4",
        },
        "on.surface": {
          value: "#191c1d",
        },
        "on.surface.variant": {
          value: "#5c3f3d",
        },
        "inverse.surface": {
          value: "#2e3132",
        },
        "inverse.on.surface": {
          value: "#f0f1f2",
        },
        background: {
          value: "#f8f9fa",
        },
        "on.background": {
          value: "#191c1d",
        },

        // Outline
        outline: {
          value: "#916f6c",
        },
        "outline.variant": {
          value: "#e6bdba",
        },

        // Error
        error: {
          value: "#ba1a1a",
        },
        "error.container": {
          value: "#ffdad6",
        },
        "on.error": {
          value: "#ffffff",
        },
        "on.error.container": {
          value: "#93000a",
        },
      },
      fonts: {
        heading: { value: "'Montserrat', sans-serif" },
        body: { value: "'Montserrat', sans-serif" },
        mono: { value: "'JetBrains Mono', monospace" },
      },
      fontSizes: {
        "headline-xl": { value: "40px" },
        "headline-lg": { value: "32px" },
        "headline-lg-mobile": { value: "28px" },
        "headline-md": { value: "24px" },
        "headline-sm": { value: "20px" },
        "body-lg": { value: "18px" },
        "body-md": { value: "16px" },
        "body-sm": { value: "14px" },
        "label-md": { value: "12px" },
      },
      fontWeights: {
        "headline-xl": { value: "800" },
        "headline-lg": { value: "700" },
        "headline-md": { value: "700" },
        "headline-sm": { value: "600" },
        body: { value: "400" },
        "label-md": { value: "500" },
      },
      lineHeights: {
        "headline-xl": { value: "48px" },
        "headline-lg": { value: "40px" },
        "headline-lg-mobile": { value: "34px" },
        "headline-md": { value: "32px" },
        "headline-sm": { value: "28px" },
        "body-lg": { value: "28px" },
        "body-md": { value: "24px" },
        "body-sm": { value: "20px" },
        "label-md": { value: "16px" },
      },
      spacing: {
        unit: { value: "8px" },
        gutter: { value: "24px" },
        "margin-mobile": { value: "16px" },
        "margin-desktop": { value: "40px" },
        "container-max": { value: "1280px" },
      },
      radii: {
        soft: { value: "4px" },
        md: { value: "6px" },
        lg: { value: "8px" },
        xl: { value: "12px" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
