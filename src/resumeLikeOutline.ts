/** Shared button shell — no border outline */
export const resumeLikeOutline =
  'transition-all duration-200 focus-visible:outline-none';

export const resumeLikeOutlineDisabled =
  'disabled:cursor-not-allowed';

const buttonHoverMotion = 'transition-all duration-200 active:scale-[0.97]';

/** Inset-only depth — outer glow removed so edges don't read as a colored border */
const shadowInset =
  'hover:shadow-[inset_0_3px_10px_rgba(0,0,0,0.75)]';

const shadowInsetStrong =
  'hover:shadow-[inset_0_4px_14px_rgba(0,0,0,0.9)]';

/** @deprecated use specific buttonHoverOn* exports */
export const buttonHoverSoft = buttonHoverMotion;

export const buttonHoverOnBright = `${buttonHoverMotion} hover:bg-black/65 ${shadowInset}`;

/** Dark fill button — uses .btn-dark-fill in index.css (Tailwind hover gradients conflict with solid bg) */
export const buttonDarkFill = 'btn-dark-fill';

/** @deprecated use buttonDarkFill instead */
export const buttonHoverOnDarkFill = buttonDarkFill;

export const buttonHoverOnAccentFill = `${buttonHoverMotion} hover:bg-[#941919] ${shadowInsetStrong}`;

export const buttonHoverOnGray = `${buttonHoverMotion} hover:bg-[#1a1a1a] ${shadowInset}`;
