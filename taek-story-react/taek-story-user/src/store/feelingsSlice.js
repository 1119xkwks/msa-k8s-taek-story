import { createSlice } from "@reduxjs/toolkit";

// Redux에는 직렬 가능한 값만 저장: 아이콘 객체는 별도 매핑 모듈에서 관리
const initialState = {
  list: [
    { id: "happy", label: "Happy", color: "text-amber-500" },
    { id: "sad", label: "Sad", color: "text-blue-600" },
    { id: "angry", label: "Angry", color: "text-red-600" },
    { id: "tired", label: "Tired", color: "text-gray-600" },
    { id: "love", label: "In love", color: "text-pink-600" },
    { id: "surprised", label: "Surprised", color: "text-purple-600" },
  ],
};

const feelingsSlice = createSlice({
  name: "feelings",
  initialState,
  reducers: {
    setFeelings(state, action) {
      state.list = action.payload || [];
    },
  },
});

export const { setFeelings } = feelingsSlice.actions;
export const selectFeelings = (state) => state.feelings.list;
export default feelingsSlice.reducer;
