import { recipe } from "@vanilla-extract/recipes";
import { font, color } from "@style/styles.css.ts";
import { style } from "@vanilla-extract/css";

export const container = style([
  font.label01,
  {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "76.8rem",
    height: "8rem",
    padding: "1.2rem 3rem 1.2rem 3rem",
  },
]);

export const navItem = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 1.2rem",
    whiteSpace: "nowrap",
    width: "7.2rem",
  },
  variants: {
    state: {
      true: {
        color: color.gray.gray900,
      },
      false: {
        color: color.gray.gray500,
      },
    },
    type: {
      community: {
        width: "7.2rem",
      },
      nav: {
        width: "5.6rem",
      },
    },
  },
  defaultVariants: {
    state: false,
    type: "nav",
  },
});

export const imgContainer = {
  width: "7.2rem",
};
