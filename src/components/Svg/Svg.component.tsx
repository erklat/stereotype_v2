"use client";

import { LegacyRef, forwardRef } from "react";

import icons from "./svgManifest";

type TProps = {
  icon: string;
  classNames?: string;
  wrapperClassNames?: string;
  [x: string]: any;
};

const Svg = forwardRef(
  (
    { icon, classNames, wrapperClassNames, ...otherProps }: TProps,
    ref: LegacyRef<HTMLSpanElement> | null
  ) => {
    const SVG = icons?.[icon as keyof typeof icons];

    if (!SVG) return null;

    return (
      <span ref={ref} className={wrapperClassNames}>
        <SVG className={classNames} {...otherProps} aria-hidden="true" />
      </span>
    );
  }
);

Svg.displayName = "Svg";

export default Svg;
