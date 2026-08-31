/**
 * One diagram per project. All six are drawn inside the same 320x136 box with
 * a margin, at one stroke weight, and every shape stays inside that box.
 *
 * The vocabulary is deliberately narrow — rounded boxes, straight rules, bars,
 * dots, and one accent per drawing. At card size anything finer reads as
 * texture rather than as a diagram.
 */

export type VisualName =
  | "sqlRag"
  | "interviewer"
  | "documents"
  | "learning"
  | "conversationalBI"
  | "sutra";

const S = "rgba(255,255,255,0.2)"; // structure
const T = "rgba(255,255,255,0.4)"; // content
const A = "#4f8cff"; // the one thing worth looking at

/* a question in plain language, resolving into one row of a table */
function SqlRag() {
  return (
    <>
      <rect x="8" y="38" width="112" height="50" rx="12" stroke={S} />
      <path d="M24 58h74M24 72h44" stroke={T} strokeLinecap="round" />

      <path d="M124 63h20" stroke={A} strokeOpacity="0.5" strokeDasharray="3 4" />

      <rect x="152" y="14" width="160" height="108" rx="10" stroke={S} />
      <path d="M152 44h160M152 76h160M206 14v108M260 14v108" stroke={S} />

      <path d="M152 44h160v32H152z" fill={A} fillOpacity="0.12" stroke="none" />
      <path d="M166 60h24" stroke={A} strokeLinecap="round" />

      <path
        d="M166 30h24M220 30h24M274 30h20M220 60h26M274 60h16M166 100h22M220 100h26M274 100h20"
        stroke={T}
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
    </>
  );
}

/* a live voice, and a verdict that can be defended */
function Interviewer() {
  const bars = [16, 34, 22, 48, 30, 58, 66, 52, 40, 24, 44, 20, 32, 14];
  return (
    <>
      {bars.map((h, i) => (
        <path
          key={i}
          d={`M${16 + i * 13} ${68 - h / 2}v${h}`}
          stroke={i >= 4 && i <= 8 ? A : T}
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}

      <rect x="212" y="34" width="100" height="68" rx="12" stroke={S} />
      <path d="M230 58h48M230 76h30" stroke={T} strokeLinecap="round" />
      <path
        d="M282 76l6 6 12-14"
        stroke={A}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/* a stack of documents going in, one verified record coming out */
function Documents() {
  return (
    <>
      <rect x="22" y="14" width="76" height="94" rx="9" stroke={S} strokeOpacity="0.45" />
      <rect x="8" y="26" width="76" height="94" rx="9" stroke={S} />
      <path
        d="M24 52h44M24 72h30M24 92h38"
        stroke={T}
        strokeLinecap="round"
      />

      <path d="M132 12v112" stroke={A} strokeOpacity="0.3" strokeDasharray="5 6" />
      <path d="M96 68h24M144 68h18" stroke={S} strokeDasharray="3 4" />

      <rect x="170" y="34" width="142" height="68" rx="10" stroke={S} />
      <path d="M188 60h68M188 78h44" stroke={T} strokeLinecap="round" />
      <path
        d="M272 72l7 7 15-17"
        stroke={A}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/* nine stages, and how far this learner has climbed them */
function Learning() {
  const bars = [26, 44, 62, 80, 96, 112];
  const here = 2; // reached, inclusive
  return (
    <>
      <path d="M8 124h304" stroke={S} strokeLinecap="round" />
      {bars.map((h, i) => {
        const x = 26 + i * 50;
        const reached = i <= here;
        return (
          <rect
            key={i}
            x={x - 13}
            y={124 - h}
            width="26"
            height={h}
            rx="7"
            fill={reached ? A : "none"}
            fillOpacity={reached ? 0.8 : 0}
            stroke={reached ? "none" : T}
          />
        );
      })}
      {/* the teacher's boundary, sitting above the stage they are on */}
      <path
        d={`M${26 + here * 50} 12v${124 - bars[here] - 20}`}
        stroke={A}
        strokeOpacity="0.4"
        strokeDasharray="4 5"
      />
    </>
  );
}

/* a question in the chat they already use, answered as a number */
function ConversationalBI() {
  return (
    <>
      <rect x="8" y="26" width="98" height="32" rx="9" stroke={S} />
      <path d="M24 42h60" stroke={T} strokeLinecap="round" />
      <rect x="8" y="70" width="76" height="32" rx="9" stroke={S} />
      <path d="M24 86h40" stroke={T} strokeLinecap="round" />

      <path d="M110 64h20" stroke={S} strokeDasharray="3 4" />
      <circle cx="146" cy="64" r="12" stroke={A} />
      <circle cx="146" cy="64" r="4" fill={A} stroke="none" />
      <path d="M162 64h20" stroke={A} strokeOpacity="0.45" strokeDasharray="3 4" />

      <path d="M192 124h120" stroke={S} strokeLinecap="round" />
      {[36, 58, 46, 82].map((h, i) => {
        const x = 210 + i * 32;
        const last = i === 3;
        return (
          <rect
            key={i}
            x={x - 11}
            y={124 - h}
            width="22"
            height={h}
            rx="6"
            fill={last ? A : T}
            fillOpacity={last ? 0.85 : 0.35}
            stroke="none"
          />
        );
      })}
    </>
  );
}

/* one model family, reaching a room full of developers */
function Sutra() {
  const arcs = [26, 44, 62].map((r) => ({
    r,
    d: `M${52 + 0.643 * r} ${68 - 0.766 * r}A${r} ${r} 0 0 1 ${52 + 0.643 * r} ${
      68 + 0.766 * r
    }`,
  }));
  const dots: { x: number; y: number; on: boolean }[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      dots.push({
        x: 186 + col * 40,
        y: 34 + row * 34,
        on: (row * 4 + col) % 3 === 1,
      });
    }
  }
  return (
    <>
      <circle cx="52" cy="68" r="10" fill={A} stroke="none" />
      {arcs.map((a, i) => (
        <path key={i} d={a.d} stroke={A} strokeOpacity={0.5 - i * 0.13} strokeWidth="2" />
      ))}

      {dots.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.on ? 6 : 3.6}
          fill={p.on ? A : T}
          fillOpacity={p.on ? 0.85 : 0.5}
          stroke="none"
        />
      ))}
    </>
  );
}

const visuals: Record<VisualName, () => React.ReactElement> = {
  sqlRag: SqlRag,
  interviewer: Interviewer,
  documents: Documents,
  learning: Learning,
  conversationalBI: ConversationalBI,
  sutra: Sutra,
};

interface ProjectVisualProps {
  name: VisualName;
  className?: string;
}

export default function ProjectVisual({ name, className }: ProjectVisualProps) {
  const Draw = visuals[name];
  return (
    <svg
      viewBox="0 0 320 136"
      fill="none"
      strokeWidth={1.8}
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      <Draw />
    </svg>
  );
}
