"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

function createFadeUpVariants(reduceMotion: boolean, delay = 0): Variants {
  if (reduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.2, delay } },
    };
  }

  return {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay,
      },
    },
  };
}

export function MotionSection({
  children,
  className,
  delay = 0,
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={createFadeUpVariants(Boolean(reduceMotion), delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: StaggerGroupProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: reduceMotion ? 0 : stagger,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={createFadeUpVariants(Boolean(reduceMotion))}
    >
      {children}
    </motion.div>
  );
}
