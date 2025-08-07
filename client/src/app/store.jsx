import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import verifyReducer from "@/features/verify/verifSlice";
import resendReducer from "@/features/verify/resendSlice";
import loginReducer from "@/features/login/loginSlice";
import usersReducer from "@/features/users/allUsersSlice";
import updateUserReducer from "@/features/updateUser/updateUserSlice";
import updateUserPassReducer from "@/features/updatePassword/updatePassSlice";
import forgotPasswordReducer from "@/features/forgotPassword/forgotPassSlice";
import resetPasswordReducer from "@/features/resetPassword/restPassSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    verify: verifyReducer,
    resend: resendReducer,
    login: loginReducer,
    users: usersReducer,
    updateUserInfo: updateUserReducer,
    updateUserPass: updateUserPassReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
  },
});
