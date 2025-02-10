import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <hr />
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex flex-wrap justify-center gap-6 px-4 text-center md:justify-between">
          <div className="flex justify-center space-x-6">
            <p className="m-2">
              &copy; {new Date().getFullYear()} Jacob Terren&apos;s Website. All
              rights reserved.
            </p>
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="https://www.linkedin.com/in/jacob-terren/"
                target="_blank"
              >
                <Image
                  src="/LinkedIn.png"
                  alt="LinkedIn"
                  width={"32"}
                  height={"32"}
                />
              </a>
              <a href="mailto:jterren@gmail.com" target="_blank">
                <Image
                  src="/Email.png"
                  alt="Email"
                  width={"48"}
                  height={"64"}
                />
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
