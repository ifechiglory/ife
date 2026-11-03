  "use client";

  import { motion } from "motion/react";
  import { skillCategoryMeta, skillNodes } from "@/lib/data";


  type SkillCardProps = {
    skill: (typeof skillNodes)[number];
    interactive?: boolean;
    animateProgress?: boolean;
  };
  
  function SkillCard({
    skill,
    interactive = true,
    animateProgress = true,
  }: SkillCardProps) {
    const Icon = skill.icon;
  
    return (
      <motion.article
        tabIndex={interactive ? 0 : -1}
        whileHover={
          interactive
            ? {
                y: -6,
                transition: { duration: 0.2 },
              }
            : undefined
        }
        whileFocus={
          interactive
            ? {
                y: -6,
                transition: { duration: 0.2 },
              }
            : undefined
        }
        className="group/card w-[78vw] max-w-[320px] rounded-2xl border border-line bg-surface-raised p-5 outline-none transition-colors focus-visible:border-pine focus-visible:ring-2 focus-visible:ring-pine/40 sm:w-67.5 md:w-72.5 md:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className="grid transition-transform duration-300 border size-12 place-items-center rounded-xl border-white/10 bg-white/3 md:group-hover/card:scale-110"
            style={{ color: skill.color }}
          >
            <Icon aria-hidden="true" className="size-6" />
          </div>
  
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone">
            {skillCategoryMeta[skill.category].label}
          </span>
        </div>
  
        <h3 className="text-2xl font-medium tracking-tight mt-7 font-display text-paper">
          {skill.name}
        </h3>
  
        <p className="mt-2 min-h-12 font-mono text-[11px] leading-5 text-stone/80 md:text-stone/65 md:transition-colors md:group-hover/card:text-stone">
          {skill.description}
        </p>
  
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-stone">
            <span>Proficiency</span>
  
            <span style={{ color: skill.color }}>{skill.level}%</span>
          </div>
  
          <div className="h-px overflow-hidden bg-line">
            {animateProgress ? (
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full"
                style={{ backgroundColor: skill.color }}
              />
            ) : (
              <div
                className="h-full"
                style={{
                  width: `${skill.level}%`,
                  backgroundColor: skill.color,
                }}
              />
            )}
          </div>
        </div>
      </motion.article>
    );
}
  
  export default function Skills() {
    return (
      <section
        id="skills"
        className="relative py-24 overflow-hidden border-t z-2 border-line md:py-36"
      >
        <div className="px-6 md:px-20">
          <div className="mb-4 flex items-baseline gap-4.5">
            <span className="font-mono text-sm text-pine">02</span>

            <h2 className="whitespace-nowrap font-display text-[30px] font-medium tracking-tight text-paper md:text-[42px]">
              Skills
            </h2>

            <span className="flex-1 h-px mt-1 bg-line" />
          </div>

          <p className="max-w-xl font-mono text-[11px] leading-6 text-stone/75">
            The tools I use to turn ideas, design systems, and product
            requirements into thoughtful frontend experiences.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-10 w-10 pointer-events-none bg-linear-to-r from-bg to-transparent sm:w-20"
          />

          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 z-10 w-10 pointer-events-none bg-linear-to-l from-bg to-transparent sm:w-20"
          />

          <div className="skills-marquee">
            <div className="skills-marquee">
              <div className="flex gap-4 px-6 shrink-0 md:gap-5 md:px-20">
                {skillNodes.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>

              <div
                aria-hidden="true"
                className="flex gap-4 px-6 shrink-0 md:gap-5 md:px-20"
              >
                {skillNodes.map((skill) => (
                  <SkillCard
                    key={`${skill.name}-duplicate`}
                    skill={skill}
                    interactive={false}
                    animateProgress={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 px-6 text-center font-mono text-[11px] text-stone/70 md:px-20">
          Hover or focus the skill cards to pause the stream and explore each
          tool.
        </p>
      </section>
    );
  }
