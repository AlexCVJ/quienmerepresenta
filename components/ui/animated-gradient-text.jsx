export function AnimatedGradientText({
  children,
  className = "",
  speed = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  ...props
}) {
  return (
    <>
      <style jsx>{`
        .animated-gradient-text {
          display: inline-block;
          background: linear-gradient(90deg, var(--color-from), var(--color-to), var(--color-from));
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-animation 8s ease infinite;
        }

        @keyframes gradient-animation {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
      <span
        className={`animated-gradient-text ${className}`}
        style={{
          "--color-from": colorFrom,
          "--color-to": colorTo,
        }}
        {...props}
      >
        {children}
      </span>
    </>
  );
}
