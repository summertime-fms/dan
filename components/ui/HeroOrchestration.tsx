"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroOrchestration() {
  const reduce = useReducedMotion();

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[12px] border border-border bg-[#0d0f12]"
      aria-label="Схема оркестрации AI, аналитики и процессов"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(0,229,255,0.14),transparent_55%),radial-gradient(ellipse_at_80%_85%,rgba(0,229,255,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(200,209,222,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(200,209,222,0.12)_1px,transparent_1px)] [background-size:28px_28px]" />

      <motion.svg
        viewBox="0 0 400 500"
        className="relative h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="heroPanel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a1d21" />
            <stop offset="100%" stopColor="#22262b" />
          </linearGradient>
          <linearGradient id="heroAccent" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7CF3FF" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="heroFunnel" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.08" />
          </linearGradient>
          <filter id="heroSoft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        <motion.circle
          cx="72"
          cy="86"
          r="28"
          fill="#00E5FF"
          opacity={0.08}
          filter="url(#heroSoft)"
          animate={
            reduce
              ? undefined
              : { cy: [86, 78, 86], opacity: [0.06, 0.12, 0.06] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="330"
          cy="420"
          r="36"
          fill="#00E5FF"
          opacity={0.07}
          filter="url(#heroSoft)"
          animate={
            reduce
              ? undefined
              : { cy: [420, 432, 420], opacity: [0.05, 0.1, 0.05] }
          }
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <g stroke="url(#heroAccent)" strokeWidth="1.4" strokeLinecap="round">
          <motion.path
            d="M118 168 C150 210 170 240 198 268"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
          />
          <motion.path
            d="M278 176 C250 214 230 244 210 270"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
          />
          <motion.path
            d="M200 318 C200 350 200 372 200 408"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.65 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
          />
          <motion.path
            d="M168 318 C140 352 118 378 98 404"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{ duration: 1, delay: 0.95, ease }}
          />
          <motion.path
            d="M232 318 C260 352 282 378 302 404"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.45 }}
            transition={{ duration: 1, delay: 1.05, ease }}
          />
        </g>

        {!reduce && (
          <>
            <motion.circle
              r="3"
              fill="#00E5FF"
              animate={{
                cx: [118, 150, 170, 198],
                cy: [168, 198, 236, 268],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 1.2 }}
            />
            <motion.circle
              r="2.5"
              fill="#7CF3FF"
              animate={{
                cx: [278, 250, 230, 210],
                cy: [176, 204, 240, 270],
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: 1.6 }}
            />
          </>
        )}

        <motion.g
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <Panel x={48} y={110} w={140} h={92} />
          <rect x="68" y="132" width="48" height="8" rx="2" fill="#00E5FF" opacity="0.55" />
          <rect x="68" y="148" width="72" height="5" rx="2" fill="#C8D1DE" opacity="0.22" />
          <rect x="68" y="160" width="58" height="5" rx="2" fill="#C8D1DE" opacity="0.16" />
          <motion.rect
            x="68"
            width="28"
            rx="2"
            fill="#00E5FF"
            opacity="0.35"
            animate={reduce ? { y: 176, height: 12 } : { height: [12, 22, 12], y: [176, 166, 176] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect
            x="102"
            width="28"
            rx="2"
            fill="#00E5FF"
            opacity="0.5"
            animate={reduce ? { y: 170, height: 18 } : { height: [18, 12, 18], y: [170, 176, 170] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
          <motion.rect
            x="136"
            width="28"
            rx="2"
            fill="#00E5FF"
            opacity="0.7"
            animate={reduce ? { y: 164, height: 24 } : { height: [24, 16, 24], y: [164, 172, 164] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
        </motion.g>

        <motion.g
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        >
          <Panel x={214} y={118} w={138} h={88} />
          <AgentNode cx={248} cy={156} delay={0.4} reduce={!!reduce} />
          <AgentNode cx={283} cy={148} delay={0.55} reduce={!!reduce} primary />
          <AgentNode cx={318} cy={160} delay={0.7} reduce={!!reduce} />
          <path
            d="M248 156 L283 148 L318 160"
            stroke="#00E5FF"
            strokeOpacity="0.35"
            strokeWidth="1.2"
          />
          <rect x="236" y="178" width="94" height="5" rx="2" fill="#C8D1DE" opacity="0.18" />
          <rect x="248" y="188" width="70" height="5" rx="2" fill="#C8D1DE" opacity="0.12" />
        </motion.g>

        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.55, ease }}
          style={{ transformOrigin: "200px 300px" }}
        >
          <path
            d="M148 268 L252 268 L228 318 L172 318 Z"
            fill="url(#heroFunnel)"
            stroke="#00E5FF"
            strokeOpacity="0.55"
            strokeWidth="1.4"
          />
          <path
            d="M172 318 L228 318 L214 352 L186 352 Z"
            fill="#00E5FF"
            fillOpacity="0.18"
            stroke="#00E5FF"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <motion.circle
            cx="200"
            cy="300"
            r="7"
            fill="#00E5FF"
            animate={
              reduce ? undefined : { r: [7, 9, 7], opacity: [0.9, 0.55, 0.9] }
            }
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle
            cx="200"
            cy="300"
            r="16"
            fill="#00E5FF"
            opacity="0.12"
            filter="url(#heroSoft)"
          />
        </motion.g>

        <motion.g
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease }}
        >
          <Panel x={42} y={396} w={100} h={64} compact />
          <rect x="58" y="414" width="40" height="6" rx="2" fill="#00E5FF" opacity="0.45" />
          <rect x="58" y="428" width="68" height="4" rx="2" fill="#C8D1DE" opacity="0.16" />
          <rect x="58" y="438" width="52" height="4" rx="2" fill="#C8D1DE" opacity="0.12" />
        </motion.g>

        <motion.g
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.12, ease }}
        >
          <Panel x={150} y={408} w={100} h={64} compact />
          <rect x="166" y="426" width="48" height="6" rx="2" fill="#00E5FF" opacity="0.55" />
          <rect x="166" y="440" width="68" height="4" rx="2" fill="#C8D1DE" opacity="0.16" />
          <rect x="166" y="450" width="44" height="4" rx="2" fill="#C8D1DE" opacity="0.12" />
        </motion.g>

        <motion.g
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.24, ease }}
        >
          <Panel x={258} y={396} w={100} h={64} compact />
          <rect x="274" y="414" width="36" height="6" rx="2" fill="#00E5FF" opacity="0.45" />
          <rect x="274" y="428" width="68" height="4" rx="2" fill="#C8D1DE" opacity="0.16" />
          <rect x="274" y="438" width="56" height="4" rx="2" fill="#C8D1DE" opacity="0.12" />
        </motion.g>
      </motion.svg>
    </div>
  );
}

function Panel({
  x,
  y,
  w,
  h,
  compact = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  compact?: boolean;
}) {
  return (
    <g>
      <rect
        x={x + 4}
        y={y + 6}
        width={w}
        height={h}
        rx={10}
        fill="#000"
        opacity="0.28"
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill="url(#heroPanel)"
        stroke="#00E5FF"
        strokeOpacity={compact ? 0.28 : 0.4}
        strokeWidth="1.3"
      />
      <rect
        x={x + 10}
        y={y + 10}
        width={18}
        height="3"
        rx="1.5"
        fill="#00E5FF"
        opacity="0.35"
      />
    </g>
  );
}

function AgentNode({
  cx,
  cy,
  delay,
  reduce,
  primary = false,
}: {
  cx: number;
  cy: number;
  delay: number;
  reduce: boolean;
  primary?: boolean;
}) {
  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r={primary ? 11 : 8}
        fill="#00E5FF"
        opacity={0.12}
        filter="url(#heroSoft)"
        animate={reduce ? undefined : { r: primary ? [11, 15, 11] : [8, 11, 8] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={primary ? 6 : 4.5}
        fill="#0d0f12"
        stroke="#00E5FF"
        strokeWidth="1.4"
      />
      <circle cx={cx} cy={cy} r={primary ? 2.4 : 1.8} fill="#00E5FF" />
    </g>
  );
}
