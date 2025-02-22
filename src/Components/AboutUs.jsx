import NavBar from "@/components/dashboard/NavBar.jsx";
import { aboutUsContent, teamDetails } from "@/constants/AboutUs.js";
import Footer from "@/components/dashboard/Footer.jsx";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <>
      <div className={"flex flex-col items-center"}>
        <NavBar />
        <h1
          className={" my-20 text-center font-[lato] font-semibold text-[64px]"}
        >
          About Us
        </h1>
        <div className={"flex flex-col items-center gap-4"}>
          {aboutUsContent.map((value, key) => (
            <p key={key} className={"w-[75%] text-center font-[lato] text-lg"}>
              {value}
            </p>
          ))}
        </div>

        <div
          className={
            "flex flex-col bg-gray-200 items-center gap-10 my-20 py-20 px-20 mx-20"
          }
        >
          <h2 className={"font-[lato] mt-10 mb-20 font-bold text-5xl"}>
            Meet the Team
          </h2>
          <div className={"flex flex-row items-center"}>
            {teamDetails.map((value, key) => {
              return (
                <div key={key} className={"flex flex-col items-center"}>
                  <img
                    src={value.image}
                    alt={value.name}
                    className={"w-80 h-80"}
                  />
                  <h3
                    className={
                      "font-[montserrat] font-medium text-4xl mt-10 mb-2"
                    }
                  >
                    {value.name}
                  </h3>
                  <h4 className={"font-[montserrat] font-medium text-lg"}>
                    {value.title}
                  </h4>
                  <p className={"my-5 w-[80%] text-justify"}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className={"flex flex-col  w-full px-20 mb-20 items-center"}>
          <div className={"flex w-full flex-row "}>
            <form
              className={"flex flex-col px-20 pb-20 w-1/2 border items-center"}
            >
              <h2
                className={
                  "font-[montserrat] w-full px-5 my-20 font-semibold text-5xl"
                }
              >
                Reach out to us!
              </h2>
              <div className={"flex flex-row gap-3 w-full items-center"}>
                <input
                  type={"name"}
                  placeholder={"First Name"}
                  className={
                    "w-[70%] border  rounded-md px-3 py-2 font-[lato] "
                  }
                />
                <input
                  type={"name"}
                  placeholder={"Second Name"}
                  className={"w-[70%] border rounded-md px-3 py-2 font-[lato] "}
                />
              </div>
              <div className={"flex my-3 gap-3 flex-row w-full items-center"}>
                <input
                  type={"email"}
                  placeholder={"Email"}
                  className={
                    "w-[70%] border  rounded-md px-3 py-2 font-[lato] "
                  }
                />
                <input
                  type={"phone"}
                  placeholder={"Phone"}
                  className={
                    "w-[70%] border  rounded-md px-3 py-2 font-[lato] "
                  }
                />
              </div>

              <textarea
                type={"name"}
                placeholder={"Message"}
                className={
                  "w-full h-48 border rounded-md  px-3 py-2 font-[lato] "
                }
              />
              <div className={"w-full mt-10"}>
                <motion.button
                  whileHover={{ scale: 1.02, tranision: { duration: 0.2 } }}
                  whileTap={{ scale: 0.97, tranision: { duration: 0.2 } }}
                  className={
                    "px-10 py-3 bg-emerald-500 text-white font-[lato] font-semibold text-lg rounded-xl "
                  }
                >
                  Submit
                </motion.button>
              </div>
            </form>
            <img className={"w-1/2"} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AboutUs;
