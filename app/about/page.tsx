import Link from "next/link";
import { MapPin, Briefcase, Mail, ArrowLeft } from "lucide-react";

const TOOLS = [
  "Vibe Coding",
  "Unreal Engine 5",
  "Unity 6",
  "DaVinci Resolve",
  "Maya",
  "Substance Painter",
  "MotionBuilder",
  "TouchDesigner",
];

const cardBase =
  "rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-zinc-500 hover:-translate-y-1";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black px-6 pb-20 pt-28 text-zinc-400 sm:px-10">
      {/* 左上角低调返回按钮 */}
      <Link
        href="/"
        className="group fixed left-6 top-24 z-40 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-zinc-500 transition-colors duration-200 hover:text-white sm:left-10"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
        RETURN
      </Link>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
        {/* 第一行：主介绍 —— 整行 */}
        <section className={`${cardBase} md:col-span-3`}>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
            01 / Profile
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            ABOUT ME.
          </h1>
          <div className="mt-8 space-y-4">
            <p className="text-base leading-loose text-zinc-400">
              掌握电影级数字人从扫描、动捕到引擎集成的全流程技术，熟悉
              UE5、Maya、Unity 等核心工具链，拥有将尖端动捕、三维扫描数据深度接入实时管线的跨平台项目经验。具备扎实的影像审美与严苛的质量控制能力。
            </p>
            <p className="text-base leading-loose text-zinc-400">
              能熟练使用达芬奇完成专业剪辑与调色，并拥有多个获奖电影短片的后期制作经验。同时深入涉足
              VR
              游戏开发领域，深刻理解 VR 环境下的视觉性能优化、空间音频与沉浸式交互设计，能够将电影级视听美学与重度
              VR 游戏的实时渲染管线完美融合。
            </p>
            <p className="text-base leading-loose text-zinc-400">
              在复杂的项目生态中，能够作为核心纽带，有效协同技术美术、绑定师、引擎工程师及游戏策划等多方角色，精准转化艺术与技术需求，高效推进项目落地。
            </p>
          </div>
        </section>

        {/* 第二行：照片 / 位置 / 实习 —— 三等分 */}
        {/* 个人照片 —— 3:2 比例 */}
        <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:border-zinc-500 hover:-translate-y-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/me.jpg"
            alt="个人照片"
            className="aspect-[3/2] h-full w-full object-cover"
          />
        </section>

        {/* 位置坐标 */}
        <section
          className={`${cardBase} relative flex flex-col items-center justify-center text-center`}
        >
          {/* 在线状态：闪烁绿点 */}
          <span className="absolute right-5 top-5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>

          <MapPin className="h-8 w-8 text-white" strokeWidth={1.5} />
          <p className="mt-4 font-mono text-sm tracking-[0.25em] text-white">
            BEIJING, CHINA
          </p>
        </section>

        {/* 实习经历 */}
        <section className={`${cardBase} flex flex-col justify-center`}>
          <Briefcase className="h-8 w-8 text-white" strokeWidth={1.5} />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-white">
            Experience
          </p>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-sm text-white">腾讯智影</p>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">
                AIGC 影视工业化项目实习生
              </p>
            </div>
            <div>
              <p className="text-sm text-white">道通智能 · 仿真测评部</p>
              <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">
                三维场景美术实习生
              </p>
            </div>
          </div>
        </section>

        {/* 第三行：工具 / 联系方式 */}
        {/* 常用工具 —— 2 列 */}
        <section className={`${cardBase} md:col-span-2`}>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-600">
            Tools
          </span>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {TOOLS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm text-zinc-400 transition-colors duration-200 hover:border-white hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 联系方式 —— 1 列 */}
        <section className={`${cardBase} flex flex-col justify-center`}>
          <Mail className="h-8 w-8 text-white" strokeWidth={1.5} />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            Get in touch
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex justify-between gap-3">
              <span className="text-zinc-500">WeChat</span>
              <span className="text-white">ccc37521018</span>
            </p>
            <p className="flex justify-between gap-3">
              <span className="text-zinc-500">Email</span>
              <span className="text-white">2052836668@qq.com</span>
            </p>
            <p className="flex justify-between gap-3">
              <span className="text-zinc-500">Phone</span>
              <span className="text-white">15698209880</span>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
