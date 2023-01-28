import React, { useEffect, useState } from "react";
import styles from "../style";
import WorkerCard from "./WorkerCard";
import ABI from "./../utils/abi";
import { useSigner, useContract, useProvider, useAccount } from "wagmi";
import star from "../assets/star.svg";
import matic from "../assets/polygon-matic-logo.svg";
import { CONTRACT_ADDRESS } from "../constants";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import doc from "../assets/worker.svg";

const DashBoard = () => {
  const [workers, setWorkers] = useState([]);
  const [rating, setRating] = useState(0);

  const { data: signer } = useSigner();
  const contractAddress = CONTRACT_ADDRESS;
  const contractABI = ABI;

  const provider = useProvider();

  const { address } = useAccount();

  const navigateTo = useNavigate();

  const contract = useContract({
    address: contractAddress,
    abi: contractABI,
    signerOrProvider: signer || provider,
  });
  const getNumberOfWorkers = async () => {
    const docsCount = await contract.workerId();
    return docsCount.toNumber();
  };

  const checkUserExists = async () => {
    if (address) {
      const userRegistrationStatus = await contract.checkUserExists();
      console.log(userRegistrationStatus);
      if (!userRegistrationStatus) {
        console.log("abcd");
        navigateTo("/auth");
      }
    } else {
      navigateTo("/home");
    }
  };

  const getSingleWorkerData = async (id) => {
    const docData = await contract.getWorker(id);
    const numberOfRaters = docData.numberOfRaters.toNumber();
    const ratingTotal = docData.rating.toNumber();
    if (numberOfRaters !== 0) {
      const rates = ratingTotal / numberOfRaters;
      setRating(rates);
      console.log(rates + "r");
    } else {
      setRating(0);
    }
    const parsedData = {
      id: docData.id,
      name: docData.name,
      pfp: docData.pfp,
      category: docData.category,
      address: docData.workerWallet,
      description: docData.description,
      price: docData.price,
      rating: docData.rating.toNumber(),
      isAvailable: docData.isAvailable,
      numberOfRaters: docData.numberOfRaters.toNumber(),
    };
    return parsedData;
  };

  const getAllWorkerData = async () => {
    checkUserExists()
    const totalWorker = await getNumberOfWorkers();
    const promises = [];
    console.log(totalWorker + " totalWorker");
    for (let id = 0; id < totalWorker; id++) {
      const requestsPromise = getSingleWorkerData(id);
      promises.push(requestsPromise);
    }
    const _workers = await Promise.all(promises);
    setWorkers(_workers);
    console.log("workers",_workers);
  };

  useEffect(() => {
    getAllWorkerData();
  }, []);

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <ToastContainer />
      <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>

        <div className="lg:grid grid-cols-3 gap-8 md:flex-col sm:flex-col">
          {workers ? (
            workers.map((worker) => {
              return (
                <WorkerCard
                  id={worker.id}
                  image={doc}
                  name={worker.name}
                  category={worker.category}
                  price={ethers.utils.formatEther(worker.price)}
                  matic={matic}
                  desc={worker.description}
                  rate={worker.rating}
                  numberOfRaters={worker.numberOfRaters}
                  star={star}
                />
              );
            })
          ) : (
            <a>No workers present</a>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashBoard;