/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Kit 2 React Base Styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import boxShadows from "assets/theme/base/boxShadows";

// Material Kit 2 React Helper Function
import rgba from "assets/theme/functions/rgba";

const { dark } = colors;
const { borderWidth, borderRadius } = borders;
const { md } = boxShadows;

export default {
  styleOverrides: {
    root: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      backgroundColor: dark.main,
      backgroundClip: "border-box",
      border: `${borderWidth[0]} solid ${rgba(dark.main, 0.125)}`,
      borderRadius: borderRadius.xl,
      boxShadow: md,
      overflow: "visible",
    },
  },
};
