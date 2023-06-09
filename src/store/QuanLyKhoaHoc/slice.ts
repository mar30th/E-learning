import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  GetFetchCategoryResponse,
  GetFetchCoursesDetail,
  GetFetchCoursesResponse,
} from "../../services/quanLyKhoaHoc.services";
import {
  FetchCategory,
  FetchCouresByCategory,
  FetchCourses,
  FetchCoursesDetail,
  FetchSearchCourses,
  handleCancelCourses,
  handleEnrollCourses,
} from "./thunkActions";

type quanLyKhoaHocInitialState = {
  categoryList?: GetFetchCategoryResponse;
  coursesList?: GetFetchCoursesResponse;
  courses?: GetFetchCoursesDetail;
  keyword?: string;
  status?: number;
};

const initialState: quanLyKhoaHocInitialState = {
  keyword: "",
};

export const { reducer: quanLyKhoaHocReducer, actions: quanLyKhoaHocActions } =
  createSlice({
    name: "quanLyKhoaHoc",
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(FetchCategory.fulfilled, (state, action) => {
          state.categoryList = action.payload;
        })
        .addCase(FetchCourses.fulfilled, (state, action) => {
          state.coursesList = action.payload;
        })
        .addCase(FetchSearchCourses.fulfilled, (state, action) => {
          state.coursesList = action.payload;
        })
        .addCase(FetchCouresByCategory.fulfilled, (state, action) => {
          state.coursesList = action.payload;
        })
        .addCase(FetchCoursesDetail.fulfilled, (state, action) => {
          state.courses = action.payload;
        })
        .addCase(handleEnrollCourses.fulfilled, (state, action) => {
          state.status = action.payload
          message.success("Enroll Successfully!");
        })
        .addCase(handleCancelCourses.fulfilled, (state, action) => {
          alert("Cancel Successfully");
        });
    },
  });
