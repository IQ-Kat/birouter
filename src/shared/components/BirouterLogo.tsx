/**
 * Birouter logo SVG — network hub icon with connected nodes.
 * Matches the favicon and app icon design.
 */
type BirouterLogoProps = {
  size?: number;
  className?: string;
};

export default function BirouterLogo({ size = 20, className = "" }: BirouterLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7 7.5C4.51472 7.5 2.5 9.51472 2.5 12C2.5 14.4853 4.51472 16.5 7 16.5C8.98971 16.5 10.7226 15.2044 11.2852 13.4355L12.7148 10.5645C13.2774 8.79556 15.0103 7.5 17 7.5C19.4853 7.5 21.5 9.51472 21.5 12C21.5 14.4853 19.4853 16.5 17 16.5C15.0103 16.5 13.2774 15.2044 12.7148 13.4355L11.2852 10.5645C10.7226 8.79556 8.98971 7.5 7 7.5Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
