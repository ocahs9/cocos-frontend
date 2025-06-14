import {semanticColor} from "@style/styles.css.ts";
import {style} from "@vanilla-extract/css";

export const carouselContainer = style({
  position: "relative",
  width: "100%",
  height: "20rem",
  overflow: "hidden",
});

export const carouselSlides = style({
  display: "flex",
});

export const carouselSlide = style({
  flex: "0 0 100%",
  position: "relative",
});

export const image = style({
  width: "100%",
  height: "100%",
  objectFit: "fill",
});

export const carouselStatus = style({
  position: "absolute",
  bottom: "3rem",
  right: "1rem",
  padding: "0.5rem 1rem",
  backgroundColor: semanticColor.neutral.assistive,
  borderRadius: "12px",
  color: "white",
  opacity: "0.4",
  zIndex: "4",
});
