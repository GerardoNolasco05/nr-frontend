export default function DissolveFilterDefs() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }} aria-hidden>
      <defs>
        <filter
          id="dissolve-filter"
          x="-200%" y="-200%" width="500%" height="500%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            id="dissolve-filter-turbulence"
            type="fractalNoise"
            baseFrequency="0.004"
            numOctaves="1"
            result="bigNoise"
          />
          <feComponentTransfer in="bigNoise" result="bigNoiseAdjusted">
            <feFuncR type="linear" slope="3" intercept="-1" />
            <feFuncG type="linear" slope="3" intercept="-1" />
          </feComponentTransfer>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1"
            numOctaves="1"
            result="fineNoise"
          />
          <feMerge result="mergedNoise">
            <feMergeNode in="bigNoiseAdjusted" />
            <feMergeNode in="fineNoise" />
          </feMerge>
          <feDisplacementMap
            id="dissolve-filter-displacement"
            in="SourceGraphic"
            in2="mergedNoise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
