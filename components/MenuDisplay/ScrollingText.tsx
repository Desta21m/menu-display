'use client';

import { useRef, useEffect, useState } from 'react';

function ScrollingText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const content = textRef.current;
    if (container && content) {
      setShouldScroll(content.scrollWidth > container.offsetWidth);
    }
  }, [text]);

  return (
    <div ref={containerRef} className="marquee-wrapper">
      {shouldScroll ? (
        <div className="marquee-track truncate block text-sm font-medium text-center text-yellow-500">
          <span ref={textRef}>{text}</span>
          <span>{text}</span> {/* duplicate for seamless loop */}
        </div>
      ) : (
        <span
          ref={textRef}
          className="truncate block text-sm font-medium text-center text-yellow-500"
        >
          {text}
        </span>
      )}
    </div>
  );
}

export default ScrollingText;