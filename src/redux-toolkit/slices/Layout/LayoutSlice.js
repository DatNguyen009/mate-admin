import { createSlice } from "@reduxjs/toolkit";
import {
  layoutTypes,
  layoutWidthTypes,
  topBarThemeTypes,
  leftBarThemeImageTypes,
  leftSidebarTypes,
  leftSideBarThemeTypes,
} from "../../../constants/layout";

const initialState = {
  layoutType: layoutTypes.VERTICAL,
  layoutWidth: layoutWidthTypes.FLUID,
  leftSideBarTheme: leftSideBarThemeTypes.DARK,
  leftSideBarThemeImage: leftBarThemeImageTypes.NONE,
  leftSideBarType: leftSidebarTypes.DEFAULT,
  topbarTheme: topBarThemeTypes.LIGHT,
  isPreloader: false,
  showRightSidebar: false,
  isMobile: false,
  showSidebar: true,
  leftMenu: false,
};

const changeBodyAttribute = (attribute, value) => {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
};

const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState,
  reducers: {
    setDefaultDataSideBar: (state, action) => {
      changeBodyAttribute("data-sidebar", state.leftSideBarTheme);
      changeBodyAttribute("data-sidebar-image", state.leftSideBarThemeImage);
      changeBodyAttribute("data-layout-size", state.layoutWidth);
    },
    openRightSidebar: (state, action) => {
      if (action.payload === "open") {
        document.body.classList.add("right-bar-enabled");
        state.showRightSidebar = !state.showRightSidebar;
      } else {
        document.body.classList.remove("right-bar-enabled");
        state.showRightSidebar = !state.showRightSidebar;
      }
    },
    changeLayout: (state, action) => {
      if (action.payload === "horizontal") {
        changeBodyAttribute("data-layout", action.payload);
        changeBodyAttribute("data-topbar", "dark");
        document.body.removeAttribute("data-sidebar");
        document.body.removeAttribute("data-sidebar-image");
        document.body.removeAttribute("data-sidebar-size");
        state.layoutType = "horizontal";
        state.topbarTheme = "dark";
      } else {
        changeBodyAttribute("data-layout", action.payload);
        changeBodyAttribute("data-topbar", "light");
        state.layoutType = "vertical";
        state.topbarTheme = "light";
      }
    },
    changeLayoutWidth: (state, action) => {
      if (action.payload === "fluid") {
        changeBodyAttribute("data-layout-size", "fluid");
        if (document.body.classList.contains("vertical-collpsed")) {
          document.body.classList.remove("vertical-collpsed");
        }
        state.layoutWidth = action.payload;
      }
      if (action.payload === "boxed") {
        changeBodyAttribute("data-layout-size", "boxed");
        if (document.body.classList.contains("right-bar-enabled")) {
          document.body.classList.add("vertical-collpsed");
        }
        state.layoutWidth = action.payload;
      }
      if (action.payload === "scrollable") {
      }
    },
    changeSidebarType: (state, action) => {
      if (action.payload === "icon") {
        changeBodyAttribute("data-sidebar-size");
        state.leftSideBarType = action.payload;
      }
      if (action.payload === "default") {
        changeBodyAttribute("data-sidebar-size");
        state.leftSideBarType = action.payload;
      }
      if (action.payload === "compact") {
        changeBodyAttribute("data-sidebar-size", "small");
        state.leftSideBarType = action.payload;
      }
    },
    changeTopbarTheme: (state, action) => {
      if (action.payload === "dark") {
        changeBodyAttribute("data-topbar", action.payload);
        state.topbarTheme = "dark";
      }
      if (action.payload === "light") {
        changeBodyAttribute("data-topbar", action.payload);
        state.topbarTheme = "light";
      }
    },
  },
});

const { actions, reducer } = layoutSlice;
export default reducer;
export const {
  setDefaultDataSideBar,
  openRightSidebar,
  changeLayout,
  changeLayoutWidth,
  changeSidebarType,
  changeTopbarTheme,
} = actions;
