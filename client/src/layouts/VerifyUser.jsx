import React, { useEffect } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useDispatch, useSelector } from "react-redux";
import { verifyData } from "@/features/verify/verifSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resendVerifyData } from "@/features/verify/resendSlice";
import Timer from "@/components/countDownTimer.jsx/Timer";
import MaskEmail from "@/components/maskEmail/MaskEmail";

const VerifyUser = () => {
  const [otp, setOtp] = React.useState("");
  const [timeLeft, setTimeLeft] = React.useState(0);

  // get user info from register slice
  const { email, verificationExpiresAt } = useSelector(
    (state) => state.register
  );
  // get success and failed form verify slice
  const { isError, isSuccess } = useSelector((state) => state.verify);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get otp
  const handleChange = (value) => {
    setOtp(value);
  };

  // submit otp
  const handleVerify = () => {
    dispatch(verifyData({ email, otp }));
  };

  // handle resend
  const handleResend = () => {
    dispatch(resendVerifyData({ email }));
  };

  // handle toastify & navigating
  useEffect(() => {
    if (isError) {
      toast.error(isError);
      setOtp("");
    }
    if (isSuccess) {
      navigate("/login");
    }
  }, [isError, isSuccess, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2 py-4 bg-gradient-to-br from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 p-6 sm:p-8 rounded-2xl shadow-2xl border border-blue-100 dark:border-blue-800 flex flex-col items-center transition-all duration-300">
        {/* toast message */}
        <Toaster position="top-right" richColors />

        <h3 className="text-lg sm:text-xl font-bold font-sans mb-2 sm:mb-3 text-blue-700 dark:text-blue-300 text-center">
          Email Verification
        </h3>

        <div className="text-center mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            A verification code was sent to your email
          </p>
          <span className="text-xs sm:text-sm md:text-base font-semibold text-blue-700 dark:text-blue-200 break-all">
            <MaskEmail email={email} />
          </span>
        </div>

        {/* verification input */}
        <div className="mb-4 sm:mb-6 w-full flex justify-center">
          <InputOTP
            maxLength={6}
            className="flex flex-col items-center gap-2 sm:gap-3"
            value={otp}
            onChange={handleChange}
          >
            <div className="flex gap-1 sm:gap-2">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </div>
          </InputOTP>
        </div>

        {/* submit button */}
        <button
          className="mt-4 sm:mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md transition-all duration-200 w-full max-w-xs hover:bg-blue-700 text-sm md:text-base"
          type="submit"
          onClick={timeLeft > 0 ? handleVerify : handleResend}
        >
          {timeLeft > 0 ? "Verify" : "Resend"}
        </button>

        {/* count down timer */}
        <div className="w-full flex justify-center mt-2">
          <Timer
            verificationExpiresAt={verificationExpiresAt}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
