import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface Props {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  hiddenY?: number;
  visibleY?: number;
  delay?: number;
}

export const Reveal: React.FC<Props> = ({
  children,
  width = 'fit-content',
  hiddenY = -50,
  visibleY = 0,
  delay = 0.25
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    }
  }, [isInView, mainControl]);

  return (
    <div ref={ref} style={{ position: "relative", width: width }} className='reveal-container'>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: hiddenY },
          visible: { opacity: 1, y: visibleY },
        }}
        initial="hidden"
        animate={mainControl}
        transition={{ duration: 0.75, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
