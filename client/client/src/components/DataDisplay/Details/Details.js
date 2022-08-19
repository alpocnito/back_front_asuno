import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

export default function Details({
  summaryContent,
  open = false,
  onToggle = () => {},
  styles = {
    details: "__react-details",
    summary: "__react-details-summary",
  },
  children,
  ...rest
}) {
  const detailsRef = useRef(null);
  const [isOpen, setIsOpen] = useState(open);

  // useEffect(() => {
  //   if (!detailsRef) {
  //     return;
  //   }

  //   const toggle = () => {
  //     const toggle = detailsRef.current.open;

  //     setIsOpen(toggle);
  //     onToggle(toggle);
  //   };

  //   detailsRef.current.addEventListener("toggle", toggle);

  //   return () =>
  //     detailsRef.current.removeEventListener("toggle", toggle, false);
  // }, [detailsRef, onToggle]);

  // if (!children) {
  //   return null;
  // }

  return (
    <details
      className={styles.details}
      open={isOpen}
      ref={detailsRef}
      {...rest}
    >
      {summaryContent && (
        <summary className={styles.summary}>{summaryContent}</summary>
      )}

      {isOpen && children}
    </details>
  );
}

Details.propTypes = {
  summaryContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
};
