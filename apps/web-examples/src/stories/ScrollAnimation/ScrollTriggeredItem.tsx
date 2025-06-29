import { Variants, motion } from 'framer-motion';

const variants: Variants = {
  hidden: { opacity: 0, translateY: 500 },
  visible: { opacity: 1, translateY: 0 },
};

export default function ScrollTriggeredItem({ index }: { index: number }) {
  return (
    <motion.div
      variants={variants}
      initial={'hidden'}
      whileInView={'visible'}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="h-200 w-200 bg-primary typography-h5-32r flex items-center justify-center text-white"
    >
      <h1>Item {index + 1}</h1>
    </motion.div>
  );
}
