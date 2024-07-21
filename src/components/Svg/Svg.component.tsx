"use client";

import { forwardRef } from "react";

import icons from "./svgManifest";

const Svg = forwardRef(
  ({ icon, classNames, wrapperClassNames, ...otherProps }, ref) => {
    if (!icons?.[icon]) return null;

    const SVG = icons[icon];

    console.log(SVG);

    return (
      <span ref={ref} className={wrapperClassNames}>
        <SVG className={classNames} {...otherProps} aria-hidden="true" />
      </span>
    );
  }
);

Svg.displayName = "Svg";

export default Svg;
