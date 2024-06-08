import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface Props {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  hiddenX?: number;
  visibleX?: number;
  delay?: number;
  duration?: number;
}

export const Slide: React.FC<Props> = ({
  children,
  width = 'fit-content',
  hiddenX = -100,
  visibleX = 0,
  delay = 0,
  duration = 0.5
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const slideControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      slideControl.start("visible");
    }
  }, [isInView, slideControl]);

  return (
    <div ref={ref} style={{ position: "relative", width: width }} className='slide-container'>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: hiddenX },
          visible: { opacity: 1, x: visibleX },
        }}
        initial="hidden"
        animate={slideControl}
        transition={{ duration: duration, ease: "easeInOut", delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
