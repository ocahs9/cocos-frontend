import { color, font } from "@style/styles.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const categoryContainer = style({
  width: "100%",
});

export const postsContainer = style({
  padding: "1.6rem 2rem 2rem 2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.6rem",
});

export const filterContainer = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1.6rem 2rem 0rem 2rem",
});

export const floatingBtnContainer = style({
  position: "fixed",
  bottom: "1.6rem",
  right: "max(2.8rem, calc((100% - 76.8rem) / 2 + 2.8rem))",
});

export const tabContainer = style({
  display: "flex",
  padding: "1rem 2rem",
  justifyContent: "flex-start",
  position: "sticky",
  backgroundColor: "#fff",
  top: "6.4rem",
  width: "100%",
  zIndex: 10,
});

export const tabButton = recipe({
  base: {
    textAlign: "left",
    flex: "none",
    cursor: "pointer",
    position: "relative",
    fontFamily: font.body01,
    fontSize: "1.4rem",
    color: color.gray.gray500,
    padding: "0.8rem 1.6rem 0.8rem 1.6rem",
    lineHeight: "-0.028rem",
  },
  variants: {
    isActive: {
      true: {
        color: color.gray.gray900,
        fontWeight: "bold",
      },
      false: {
        color: color.gray.gray500,
        fontWeight: "normal",
      },
    },
  },
});

export const underline = style({
  position: "absolute",
  bottom: "-1.2rem",
  left: "50%",
  transform: "translateX(-50%)",
  width: "2.4rem",
});
