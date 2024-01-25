

import React, { Fragment, useEffect, useRef, useState } from "react";
import GeoSidebar from "./GeoSidebar";
import GeoNavbar from "./GeoNavbar";

const GeoLayout = ({ children }) => {
  const togref = useRef();
  const [viewSide, setViewSide] = useState(false);
  useEffect(() => {
    togref &&
      window.addEventListener(
        "click",
        e => {
          togref.current !== null && !togref.current?.contains(e.target) && setViewSide(false);
        },
        true
      );
  }, []);
  return (
    <Fragment>
      <div
        className={`fixed z-20 left-0 top-0 h-screen bg-black/50 w-full ${
          viewSide ? "" : "hidden"
        }`}
      >
        <div ref={togref} className='bg-[#DDDDDD] w-3/5 md:w-[25rem] overflow-y-auto scrolls pb-10 h-screen'>
          <GeoSidebar />
        </div>
      </div>
      <div className='flex items-center w-full h-screen relative overflow-hidden'>
        <div className='hidden lg:block w-72 xl:w-[20rem] bg-[#EFF1F2] h-screen overflow-y-auto pb-10 scrolls'>
          <div>
            <GeoSidebar />
          </div>
        </div>
        <div className='w-full lg:w-[82%] ml-auto h-screen '>
          <div className='h-[10vh]'>
            <GeoNavbar openSidebar={() => setViewSide(true)} />
          </div>
          <div className='h-[90vh] overflow-y-auto scrolls scrollsdown bg-zinc-100/60 pb-20'>{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default GeoLayout;
