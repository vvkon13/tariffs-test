//components/FadeIn.tsx
'use client'

import { createContext, useContext } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const FadeInStaggerContext = createContext(false)

const viewport = { once: true, margin: '0px 0px -200px' }

export function FadeIn(
  props: React.ComponentPropsWithoutRef<typeof motion.div>,
) {
  const shouldReduceMotion = useReducedMotion()
  const isInStaggerGroup = useContext(FadeInStaggerContext)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            whileInView: 'visible',
            viewport,
          })}
      {...props}
    />
  )
}

export function FadeInStagger({
  faster = false,
  ...props
}: React.ComponentPropsWithoutRef<typeof motion.div> & { faster?: boolean }) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  )
}

// Новый компонент для анимации hr
export function FadeInHr(
  props: React.ComponentPropsWithoutRef<typeof motion.hr>,
) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.hr
      initial={{ opacity: 0, scaleX: shouldReduceMotion ? 1 : 0.8 }} 
      whileInView={{ opacity: 1, scaleX: 1 }} 
      transition={{ duration: 0.5, ease: "easeOut" }} 
      viewport={viewport} 
      {...props} 
    />
  );
}

export function FadeInHeader(
    props: React.ComponentPropsWithoutRef<typeof motion.header>
) {
    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            {...props}
        />
    );
}