import React from "react";
import Priyanshi_Raval from "../assets/Priyanshi_Raval.jpeg";
import styles from "../styles/team.css";
import mohit from "../assets/mohit.jpeg";
import twitter from "../assets/twitter.png";
import github from "../assets/github.svg";

const Team = () => {
  return (
    <>
      <div className="bg-primary w-full lg:h-screen sm:h-full">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <div className="absolute z-[0] w-[40%] h-[45%] top-0 pink__gradient" />
            <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
            <h1 className="text-white  nav-heading text-7xl text-center mt-6 text-gradient font-bold">
              Buidlers
            </h1>
            <div className="flex lg:flex-row md:flex-col sm:flex-col">
              <div className="founders">
                <div className="card w-100">
                  <h2 className="text-gradient text-3xl font-bold mb-2">
                    Priyanshi Raval
                  </h2>

                  <img
                    src={Priyanshi_Raval}
                    className="w-[250px] h-[300px]"
                  />
                  <p className="text-white mt-4 mb-4 text-2xl">
                    <b>Full Stack Web3 Developer</b>
                  </p>

                  <div className="flex flex-row m-auto justify-center align-center">
                    <a
                      href="https://twitter.com/PriyanshiRaval1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={twitter} alt="Twitter Logo" />
                    </a>
                    <a
                      href="https://github.com/priyaraval12"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={github} alt="Github Logo" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="founders">
                <div className="card w-100">
                  <h2 className="text-gradient text-3xl font-bold mb-2">
                    Mohit Thakkar
                  </h2>

                  <img
                    src={mohit}
                    className="w-[250px] h-[300px]"
                  />
                  <p className="text-white mt-4 mb-4 text-2xl">
                    <b>Full Stack Web3 Developer</b>
                  </p>

                  <div className="flex flex-row m-auto justify-center align-center">
                    <a
                      href="https://twitter.com/mohit_thakkar_"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={twitter} alt="Twitter Logo" />
                    </a>
                    <a
                      href="https://github.com/mohitthakkar30"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={github} alt="Github Logo" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
