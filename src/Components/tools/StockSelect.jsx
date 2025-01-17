import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

const search = (pattern, setter, currentList, finalSet) => {
  let result = [];
  currentList.forEach((item) => {
    if (
      item.match(new RegExp(pattern.toUpperCase(), "i")) &&
      !finalSet.has(item)
    ) {
      result.push(item);
    }
  });
  setter(result);
};

const handleDelete = (setResult, value, setTarget) => {
  // console.log('Result delete : ',result.delete(value));
  setResult((prev) => {
    const updated = new Set(prev);
    updated.delete(value);
    return updated;
  });
  setTarget((prev) => {
    const updated = new Set(prev);
    updated.add(value);
    return updated;
  });
};
const StockSelect = (x) => {
  // let props = this.props;
  const original = x.tickers.map((value) => value.label);
  const [target, setTarget] = useState(original);
  const [result, setResult] = useState(new Set([]));

  useEffect(() => {
    console.log(Array.from(result));
    x.setTickers(Array.from(result));
  }, [result]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => search(e.target.value, setTarget, original, result)}
        className={
          "w-full border-2 px-3 py-3 rounded-xl font-[source sans 3] font-medium outline-none"
        }
      />
      <div className={"flex flex-wrap gap-2 my-5"}>
        {Array.from(result).map((value, key) => {
          return (
            <motion.div
              key={key}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
              initial={{ y: 100, opacity: 0, transition: { duration: 0.1 } }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.2 } }}
              className={
                "hover:cursor-pointer flex py-2 px-3 text-white flex-row rounded-full items-center gap-2  bg-blue-500"
              }
              onClick={() => {
                handleDelete(setResult, value, setTarget);
                console.log("During Exclusion of data", Array.from(result));
              }}
            >
              <h1 className={"font-[source sans 3] text-sm font-semibold font"}>
                {value}
              </h1>
              <IoClose />
            </motion.div>
          );
        })}
      </div>
      <div
        className={"overflow-y-auto h-[22rem] my-3 border py-3 px-5 rounded-xl"}
      >
        {target.length !== 0 &&
          target &&
          target.map((item, key) => {
            return (
              <motion.div
                whileHover={{
                  y: -5,
                  color: "#000000",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.96, transition: { duration: 0.2 } }}
                key={key}
                className={
                  "py-2 hover:cursor-pointer font-[lato] font-semibold text-gray-500"
                }
                onClick={() => {
                  console.log(item);
                  // tickers
                  setResult((prev) => {
                    const updated = new Set(prev);
                    updated.add(item);
                    return updated;
                  });
                  setTarget((prev) => {
                    const updated = new Set(prev);
                    updated.delete(item);
                    return Array.from(updated);
                  });

                  // console.log('During inclusion of data',Array.from(result),result)
                }}
              >
                {item}
              </motion.div>
            );
          })}
        {!target.length && (
          <h1
            className={
              "font-[source sans 3] font-semibold text-lg text-gray-500"
            }
          >
            No Results found
          </h1>
        )}
      </div>
    </div>
  );
};
export default StockSelect;
