'use client';
import { motion, easeOut } from "framer-motion";

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut }
  },
};

const badgeVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: easeOut }
  },
};

export default function TechStack() {
  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-start px-6 py-16 font-sans space-y-12 "
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariant}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-[950px]">

        <TechHeading
          title="Programming Languages"
          items={["Java", "JavaScript", "TypeScript"]}
        />

        <TechHeading
          title="Libraries & Frameworks"
          items={["React", "Next.js", "Node.js", "Turbo", "Prisma ORM", "Zod", "Express", "JWT"]}
        />

        <TechHeading
          title="Databases"
          items={["MongoDB", "SQL", "PostgreSQL"]}
        />

        <TechHeading
          title="Tools"
          items={["Git", "GitHub", "Postman", "Vercel", "Docker"]}
        />

      </div>
    </motion.div>
  );
}

function TechHeading({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#1a2727] to-[#201420]  backdrop-blur-md border border-neutral-800 rounded-2xl shadow-lg p-4 md:p-8 transition-shadow hover:shadow-xl"
      variants={cardVariant}
    >
      <h2 className="text-center text-[20px] md:text-xl font-semibold text-neutral-300 uppercase mb-6 tracking-wide">
        {title}
      </h2>
      <motion.div
        className="flex flex-wrap gap-3 justify-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        {items.map((text, i) => (
          <TechBadge key={i} text={text} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function TechBadge({ text }: { text: string }) {
  return (
    <motion.span
      className="px-4 py-2 text-sm font-medium rounded-full border border-neutral-300 text-neutral-700 bg-neutral-100 hover:bg-neutral-200  shadow-xl transition-all duration-200"
      variants={badgeVariant}
      whileHover={{ scale: 1.06 }}
    >
      {text}
    </motion.span>
  );
}
