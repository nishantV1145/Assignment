import { createReducer } from "@reduxjs/toolkit";
export const DataReducer = createReducer({}, {
    data_Request : (state) => {
        state.loading = true;
    },
    data_success : (state, action) => {
        state.loading = false;
        state.allTickets = action.payload.tickets;
        state.allUser = action.payload.users;
    },
    request_fail : (state) => {
        state.loading = false;
        state.allTickets = []
        state.allUser = [];
    },
});
export const SelectDataReducer = createReducer({}, {
    select_data : (state) => {
        state.loading = true;
        state.selectedData = [];
    },
   request_success : (state, action) => {
        state.loading = false;
        state.selectedData = action.payload.selectedData;
        state.user = action.payload.user
    },
    request_failure : (state, action) => {
        state.loading = false;
        state.selectedData = []
        state.message = action.payload.message
    },
});