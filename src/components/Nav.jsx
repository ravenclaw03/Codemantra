import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef ,useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../main";
import {useNavigate} from "react-router-dom"
const URL = import.meta.env.VITE_URL;
import axios from "axios"
const Nav = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { loggedIn,setLoggedIn } = useContext(AuthContext);
  const mainControls = useAnimation();
  const slideControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView, mainControls, slideControls]);
  const navigate=useNavigate();
 const handleLogout=async()=>{
  try {
    const response = await axios.get(`${URL}/logout`, { withCredentials: true });
    if (response.data.Status === "Success") {
      setLoggedIn(false);
      navigate('/');
    }
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-baseline text-white">
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 1.5, delay: 0.25 }}
          className="flex md:flex-row md:gap-3 m-4 justify-around items-baseline flex-col"
        >
          <Link to="">
            <h1 className=" font-extrabold text-4xl">CodeMantra</h1>
          </Link>
          <h3 className=" font-extralight md:text-lg md:mb-2">
            &lt;the ultimate code editor&gt;
          </h3>
        </motion.div>
        {loggedIn ? (
          <div className=" flex">
            <h3 className=" text-white mx-3">Welcome Admin</h3>
            <button className="px-2 hover:bg-white hover:text-[#000814] text-red-600" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className=" m-4">
            <Link to="login">
              <button className="px-2 hover:bg-white hover:text-[#000814]">
                Login as Admin
              </button>
            </Link>
          </div>
        )}
      </div>
      <hr className=" w-full" />
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 1.5, ease: "easeIn" }}
        className=" absolute top-0 bottom-0 left-0 right-0 bg-white z-20"
      />
    </div>
  );
};
export default Nav;
