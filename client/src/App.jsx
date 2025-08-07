import { useEffect } from "react";
import Index from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { restoreUser } from "./features/login/loginSlice";
import { setupProactiveRefresh } from "./lib/api";

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);

  useEffect(() => {
    // only try to restore user on initial app load
    dispatch(restoreUser());
  }, [dispatch]);

  // setup proactive refresh only after successful user restoration
  useEffect(() => {
    if (isLoggedIn) {
      setupProactiveRefresh();
      console.log("Proactive refresh setup for logged in user");
    }
  }, [isLoggedIn]);

  return <Index />;
};

export default App;
