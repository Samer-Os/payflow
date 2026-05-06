import React from "react";
import Link from "next/link";

const Location = () => {
  return (
    <>
      <section className="bg-primary py-24">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
            <div className="">
                <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 border-b border-solid border-white border-opacity-50 pb-11">
                    <div className="col-span-3">
                        <h2 className="text-white max-w-56 text-h2 font-bold">London Head Office</h2>
                    </div>
                    <div className="col-span-3">
                        <p className="sm:text-h4 text-xl text-IceBlue font-normal max-w-64 leading-10 text-white text-opacity-50">1 Fintech Plaza, London EC2V 8RT, United Kingdom</p>
                    </div>
                    <div className="col-span-3">
                        <Link href="mailto:london@payflow.io" className="sm:text-h4 text-xl text-white font-medium underline">london@payflow.io</Link>
                        <Link href="tel:+44-20-7946-0958" className="sm:text-h4 text-xl text-white text-opacity-80 flex items-center gap-2 hover:text-opacity-100 w-fit"><span className="text-white text-opacity-40!">Call</span>+44 20 7946 0958</Link>
                    </div>
                </div>
                <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 pt-12">
                    <div className="col-span-3">
                        <h2 className="text-white max-w-52 text-h2 font-bold">Istanbul Office</h2>
                    </div>
                    <div className="col-span-3">
                        <p className="sm:text-h4 text-xl text-white text-opacity-50 font-normal max-w-64 leading-10">Maslak Mahallesi, Büyükdere Cad. No:255, Istanbul 34398, Turkey</p>
                    </div>
                    <div className="col-span-3">
                        <Link href="mailto:istanbul@payflow.io" className="sm:text-h4 text-xl text-white font-medium underline">istanbul@payflow.io</Link>
                        <Link href="tel:+90-212-946-0123" className="sm:text-h4 text-white text-opacity-80 text-xl text-IceBlue flex items-center gap-2 hover:text-opacity-100 w-fit"><span className="text-white text-opacity-40!">Call</span>+90 212 946 0123</Link>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Location;
