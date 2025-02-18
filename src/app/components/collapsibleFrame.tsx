"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useId, useState } from "react";

interface CollapsibleWrapperProps {
  children: React.ReactNode;
  buttonLabel: string;
}

const CollapsibleWrapper = ({
  children,
  buttonLabel,
}: CollapsibleWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const uniqueId = `collapsible-${useId().replace(/[^a-zA-Z0-9-_]/g, "")}`; // Generate a unique ID

  const toggleContent = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="container-sm">
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={uniqueId}
        aria-expanded={isVisible}
        aria-controls={uniqueId}
        onClick={toggleContent}
      >
        {isVisible ? `Hide ${buttonLabel}` : `Show ${buttonLabel}`}
      </button>

      <div className={`collapse ${isVisible ? "show" : ""}`} id={uniqueId}>
        {children}
      </div>
    </div>
  );
};

export default CollapsibleWrapper;
