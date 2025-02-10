"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

interface CollapsibleWrapperProps {
  children: React.ReactNode;
  buttonLabel: string;
}

const CollapsibleWrapper = ({
  children,
  buttonLabel,
}: CollapsibleWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleContent = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="container-sm">
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleContent"
        aria-expanded={isVisible}
        aria-controls="collapsibleContent"
        onClick={toggleContent}
      >
        {isVisible ? `Hide ${buttonLabel}` : `Show ${buttonLabel}`}
      </button>

      <div
        className={`collapse ${isVisible ? "show" : ""}`}
        id="collapsibleContent"
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsibleWrapper;
