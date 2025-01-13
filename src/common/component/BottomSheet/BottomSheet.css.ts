import { style } from "@vanilla-extract/css";
import { font, semanticColor } from "@style/styles.css";

export const bottomSheetContainer = style({
  display: "flex",
  width: "37.5rem",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20px 20px 0px 0px",
  backgroundColor: semanticColor.primary.heavy,
});

export const bottomSheetHeader = style({
  display: "flex",
  padding: "1.2rem",
  width: "inherit",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.2rem",
});

export const contentContainer = style({
  display: "flex",
  width: "33.5rem",
  padding: "20px 0px 32px 0px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "2.4rem",
});

export const content = style([
  font.heading03,
  {
    alignSelf: "stretch",
    color: semanticColor.text.normal,
    letterSpacing: "-0.16px",
  },
]);

export const buttonContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  alignSelf: "stretch",
});

export const buttonCancle = style({
  flex: 1,
  height: "4.4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "12px 28px",
  backgroundColor: semanticColor.neutral.strong,
  borderRadius: "0.8rem",
  gap: "1rem",
  whiteSpace: "nowrap",
});

export const buttonDelete = style({
  flex: 1,
  height: "4.4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "12px 28px",
  backgroundColor: semanticColor.primary.strong,
  borderRadius: "0.8rem",
  border: "none",
  whiteSpace: "nowrap",
});
