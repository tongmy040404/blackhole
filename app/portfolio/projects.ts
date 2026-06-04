import {
  Cpu,
  Globe,
  Film,
  Boxes,
  Palette,
  Layers,
  type LucideIcon,
} from "lucide-react";

// 技术文档支持图文混排：标题 / 正文 / 配图
export type DocBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "image"; src: string; caption?: string };

export type Project = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon; // 海报缺失时的占位图标
  image?: string; // 海报图片，放在 public/portfolio/ 下
  video?: string; // 详情页单个视频，放在 public/portfolio/videos/ 下
  videos?: string[]; // 详情页多个视频
  bilibili?: string[]; // B 站视频 BV 号（如 "BV1xx411c7mD"），优先于本地视频
  docTitle?: string; // 文档区小标题（默认 Technical Documentation）
  doc?: DocBlock[]; // 文档内容（图文混排）
  netdiskUrl?: string; // 百度网盘下载链接
  netdiskCode?: string; // 百度网盘提取码（可选）
  noDetail?: boolean; // 为 true 时不生成详情页，列表卡也不可点击跳转
};

// 第一个为置顶作品（Featured），其余进入网格
export const PROJECTS: Project[] = [
  {
    slug: "work-1",
    title: "清风徐来 —— 数字人制作与应用",
    description:
      "以历史人物徐来女士为创作原型，融合前沿数字人技术与艺术叙事，打造了一部兼具历史深度与视觉表现力的叙事短片——《清风徐来》。",
    icon: Cpu,
    image: "/portfolio/work-1.jpg",
    bilibili: ["BV16HnBz5Emb"],
    netdiskUrl: "https://pan.baidu.com/s/1OcvFhGqTEPWsxP7i0OdAPQ?pwd=xkc5",
    netdiskCode: "xkc5",
    doc: [
      { type: "h2", text: "一、项目概述" },
      { type: "h3", text: "1.1 项目目标" },
      {
        type: "p",
        text: "本项目旨在通过整合尖端的光场扫描、光学动捕与传统数字艺术流程，打造一个超高精度、可驱动、具备照片级真实感的数字人资产。最终目标是将该数字人无缝集成到 Unreal Engine 5 引擎中，构建高质量的实时交互应用场景，并为后续的动画、VR/AR、虚拟制片等应用提供核心资产。",
      },
      { type: "h3", text: "1.2 技术路线总览" },
      {
        type: "p",
        text: "本项目技术路线遵循「数据采集 → 数据处理与建模 → 材质贴图制作 → 引擎集成与驱动」的流程：",
      },
      {
        type: "p",
        text: "1. 数据采集阶段：采用光场扫描系统获取高精度静态模型与纹理数据，使用光学惯性混合动捕系统采集表演动画数据。",
      },
      {
        type: "p",
        text: "2. 数据处理阶段：在 MotionBuilder 中对动捕数据进行清理、修复和重定向；使用 ZBrush、Maya 等工具对扫描模型进行拓扑重建和细节雕刻；使用 Substance Painter 绘制 PBR 材质贴图。",
      },
      {
        type: "p",
        text: "3. 引擎集成阶段：在 Unreal Engine 5 中搭建场景、配置光照、导入数字人资产，并通过蓝图系统实现动画控制和交互逻辑。",
      },

      { type: "h2", text: "二、核心技术流程详解" },

      {
        type: "h3",
        text: "2.1 光场扫描建模 (Photogrammetry / Light Field Scanning)",
      },
      {
        type: "p",
        text: "目的：获取演员的初始高精度几何模型和漫反射贴图，作为制作的基准。",
      },
      { type: "p", text: "流程：" },
      {
        type: "p",
        text: "1. 数据采集：演员需保持特定姿势（通常为 A-Pose 或 T-Pose），由多相机阵列同步拍摄一组（通常上百张）不同角度的照片。",
      },
      {
        type: "p",
        text: "2. 数据解算：使用 Agisoft Metashape 对照片集进行处理，通过计算生成密集点云数据。",
      },
      {
        type: "p",
        text: "3. 模型生成：将点云数据转换为高面数多边形网格，并生成初始的漫反射贴图（Diffuse / Albedo Map）和法线贴图（Normal Map）。",
      },
      {
        type: "image",
        src: "/portfolio/work-1/fig-1.jpg",
        caption: "光场扫描建模",
      },

      { type: "h3", text: "2.2 光混动作捕捉 (Optical Motion Capture)" },
      { type: "p", text: "目的：采集演员的表演数据，用于驱动数字人模型。" },
      { type: "p", text: "流程：" },
      {
        type: "p",
        text: "1. 场地标定：使用标定杆对动捕区域进行精确的空间标定，确保所有摄像机坐标系统一。",
      },
      {
        type: "p",
        text: "2. 数据采集：演员在标定区域内进行表演，系统实时记录标记点的三维空间坐标数据。",
      },
      {
        type: "p",
        text: "3. 初步解算：使用诺依腾动捕设备配套软件将标记点数据初步解算为骨骼骨架的运动数据，并生成原始动捕数据文件。",
      },
      {
        type: "image",
        src: "/portfolio/work-1/fig-2.jpg",
        caption: "光学动作捕捉",
      },

      { type: "h3", text: "2.3 动捕数据清理与重定向" },
      {
        type: "p",
        text: "目的：清理原始动捕数据中的噪声和错误，并将其准确地映射到数字人的骨骼上。",
      },
      { type: "p", text: "流程：" },
      {
        type: "p",
        text: "1. 数据导入：将原始文件和数字人的低模绑定骨架导入 MotionBuilder。",
      },
      {
        type: "p",
        text: "2. 标记点清理：修复标记点丢失、抖动和标记点交换（Marker Swapping）等问题。",
      },
      {
        type: "p",
        text: "3. 骨骼映射（重定向）：在 MotionBuilder 中创建角色映射，将动捕骨架的骨骼节点与数字人骨架的骨骼节点一一对应；Plot Character，将清理后的动捕数据烘焙（Bake）到数字人骨骼上，生成最终的动画数据。",
      },
      {
        type: "p",
        text: "4. 动画导出：将烘焙好的动画数据导出为 UE5 支持的 fbx 格式。",
      },
      {
        type: "image",
        src: "/portfolio/work-1/fig-3.jpg",
        caption: "动捕数据清理与重定向",
      },

      { type: "h3", text: "2.4 高模重构与贴图绘制" },
      {
        type: "p",
        text: "目的：创建可用于实时引擎的低面数游戏模型，并为其制作电影级质量的材质贴图。",
      },
      { type: "p", text: "A. 重拓扑与雕刻" },
      {
        type: "p",
        text: "1. 重拓扑（Retopology）：将光场扫描得到的高面数模型作为参考，使用 Wrap，创建面数合理、布线均匀且符合动画要求的低模。",
      },
      {
        type: "p",
        text: "2. 细节雕刻：在 ZBrush 中进一步雕刻皮肤毛孔、皱纹等微观细节，增强真实感；将高模的细节信息通过法线贴图（Normal Map）烘焙到低模上。",
      },
      {
        type: "image",
        src: "/portfolio/work-1/fig-4.jpg",
        caption: "重拓扑与细节雕刻",
      },
      { type: "p", text: "B. 材质绘制" },
      {
        type: "p",
        text: "1. 烘焙贴图：将低模和高模导入 Substance Painter，烘焙出高质量的法线贴图、环境光遮蔽贴图（AO）、曲率贴图（Curvature）、位置贴图（Position）等，作为绘制的基础。",
      },
      {
        type: "p",
        text: "2. 材质绘制：在 SP、PS 中根据光台扫描漫反射纹理创建基础皮肤材质；通过手工绘制细节（如皮肤血管、色斑、衣物磨损、污渍等），增加破损感和叙事性。",
      },
      {
        type: "image",
        src: "/portfolio/work-1/fig-5.jpg",
        caption: "材质绘制",
      },
      {
        type: "image",
        src: "/portfolio/work-1/fig-6.jpg",
        caption: "材质绘制",
      },
      {
        type: "p",
        text: "3. 贴图导出：配置贴图导出模板，导出 UE5 所需的 PBR 贴图集。",
      },
      {
        type: "image",
        src: "/portfolio/work-1/fig-7.jpg",
        caption: "PBR 贴图导出",
      },
      { type: "p", text: "C. 毛发制作" },
      { type: "p", text: "在 Maya 中使用 Xgen 插件进行毛发开发。" },
      {
        type: "image",
        src: "/portfolio/work-1/fig-9.jpg",
        caption: "Xgen 毛发制作",
      },

      { type: "h3", text: "2.5 UE5 集成与蓝图开发" },
      {
        type: "image",
        src: "/portfolio/work-1/fig-10.jpg",
        caption: "UE5 集成与蓝图开发",
      },
      {
        type: "image",
        src: "/portfolio/work-1/fig-11.jpg",
        caption: "UE5 集成与蓝图开发",
      },
      { type: "p", text: "场景渲染" },
      {
        type: "image",
        src: "/portfolio/work-1/fig-12.jpg",
        caption: "Scene 1",
      },
      {
        type: "image",
        src: "/portfolio/work-1/fig-13.jpg",
        caption: "Scene 2",
      },
      {
        type: "image",
        src: "/portfolio/work-1/fig-14.jpg",
        caption: "Scene 3",
      },
      {
        type: "image",
        src: "/portfolio/work-1/fig-15.jpg",
        caption: "Scene 3",
      },
    ],
  },
  {
    slug: "work-2",
    title: "雨幕共舞",
    description:
      "基于经典歌舞电影《雨中曲》中的标志性雨夜场景，构建了一个融合教学引导与沉浸共舞的 VR 舞蹈体验系统。",
    icon: Film,
    image: "/portfolio/work-2.jpg",
    video: "/portfolio/videos/work-2.mp4",
    docTitle: "Overview",
    doc: [
      {
        type: "p",
        text: "沉浸式 VR 游戏，旨在为舞蹈学习提供一个低压力、高效的环境。其核心是通过循序渐进的学习路径（演示、跟练、共舞），引导用户角色从学习者转变为表演者，并构建低干扰的沉浸感，来帮助用户克服学习焦虑并提升体验。",
      },
      {
        type: "p",
        text: "系统在技术上利用 VR 头显、动捕设备，实现用户与实时驱动的数字舞者共同舞蹈。未来工作将探索多人社交共舞、自适应反馈等方向。",
      },
    ],
  },
  {
    slug: "work-3",
    title: "《神女》 老电影 VR 复现",
    description:
      "利用前沿的虚拟现实（VR）技术与实时渲染技术，数字化重现 1934 年中国经典电影《神女》中的核心场景与情感片段。",
    icon: Boxes,
    image: "/portfolio/work-3.jpg",
    video: "/portfolio/videos/work-3.mp4",
    doc: [
      { type: "h2", text: "一、项目概述" },
      {
        type: "p",
        text: "本项目旨在利用前沿的虚拟现实（VR）技术与实时渲染技术，数字化重现 1934 年中国经典默片《神女》中的核心场景与情感片段。项目以原作的电影美学风格为基调，通过高精度还原传奇影星阮玲玉及其戏中儿子的数字人形象，打破传统大银幕的单向观看限制。用户将以第一人称视角步入那个充满戏剧张力的时空，在沉浸式的交互体验中，跨越世纪切身感受母爱的伟大与时代的悲剧，实现「让中国电影史活过来」的数字文创愿景。",
      },

      { type: "h2", text: "二、核心技术架构与全管线流程" },
      {
        type: "p",
        text: "为了完美平衡视觉的「超写实逼真感」与资产开发的「高效率」，项目搭建了一套「人工智能资产生成、实时引擎画面渲染、电影级数字人重建、全套动作与面部混合捕捉」的现代虚拟制片技术管线。",
      },
      {
        type: "p",
        text: "在场景构建上，项目通过 MeshyAI 快速生成时代道具，并在虚幻引擎 5（UE5）中完成老上海风格场景的搭建与 VR 交互逻辑的编写。在角色表现上，利用 Epic 公司的 MetaHuman 技术，完成了阮玲玉及小男孩的超写实、高精度皮肤与毛发数字人重建。最后，在动画驱动层面，通过光学与惯性混合动作捕捉系统抓取演员细腻、高动态的身体戏感，并结合 Live Link Face 实时驱动 MetaHuman 的面部微表情，以此攻克默片电影对眼神与面部情感表达的极端严苛要求。",
      },

      { type: "h2", text: "三、详细技术实现方案" },
      { type: "h3", text: "1. 资产生成与场景构建：AI 赋能与 UE5 场景美学" },
      {
        type: "p",
        text: "针对 1934 年老上海特定的生活道具、家具和街景，项目利用 MeshyAI 这款基于文本与图像生成 3D 模型的 AI 工具，快速生成了大量的基础三维资产。这一举措极大地缩减了传统手工业拓扑与展 UV 的时间周期，配合后期的人工精修，在短时间内高效、高质地复刻了具有时代质感的道具。",
      },
      {
        type: "p",
        text: "将资产导入虚幻引擎 5 后，项目充分利用其强大的 Lumen 全局光照系统，模拟老电影特有的黑白、低饱和度光影质感。通过后期处理体积（Post Process Volume）调色，精准还原了早期胶片的颗粒感与强对比度阴影。在交互设计上，借助虚幻引擎的增强输入系统，开发了诸如「拿取特定道具」、「推门步入弄堂」、「抚摸孩子」等具有叙事推动作用的 VR 交互逻辑，极大增强了用户的临场感与代入感。",
      },
      { type: "h3", text: "2. 数字人复刻：电影级 MetaHuman 的情感承载" },
      {
        type: "p",
        text: "作为项目的核心灵魂，传奇影星阮玲玉的数字重现是攻坚重点。项目组收集了大量《神女》电影的高清修复剧照及历史影像资料，利用 Mesh to MetaHuman 技术，将阮玲玉标志性的面部特征——如经典的柳叶眉、微带忧伤的眼神、东方女性的古典面部轮廓——转化为高精度的 MetaHuman 拓扑模型，并在 MetaHuman Creator 中进行了皮肤材质、民国发型及经典旗袍的精细化定制。",
      },
      {
        type: "p",
        text: "与此同时，项目同步开发了戏中儿子的儿童数字人模型。开发过程中严格控制了面部骨骼比例与毛发质感，确保两位角色在虚幻引擎场景中的视觉画风、材质精细度完全统一，为后续展现母子之间富有张力的对手戏奠定了坚实的视觉底座。",
      },
      { type: "h3", text: "3. 动作与面部双重捕捉：还原戏剧灵魂的「精气神」" },
      {
        type: "p",
        text: "单纯的惯性动作捕捉容易产生空间位置漂移，而纯光学动作捕捉在复杂交互中易受到遮挡影响。为此，项目采用了光学与惯性混合动作捕捉系统。该系统既保留了光学动捕对空间定位的极端精准度，又结合了惯性动捕对关节细节、高动态动作（如母亲紧抱孩子、身体因哭泣而颤抖）的连续捕捉能力，让数字人的肢体语言具备了电影演员的专业「戏感」。",
      },
      {
        type: "p",
        text: "鉴于默片的核心全在眼神与面部微表情，且《神女》中阮玲玉的眼神转换是全片的最高潮，项目通过 Live Link 技术接收高精度面部捕捉数据，并将其完美映射到 MetaHuman 的 400 多个面部表情肌（Blendshapes）上。无论是嘴角细微的抽动、眼眶噙泪的悲伤，还是面对儿子时的温柔凝视，都得到了细腻、流畅的实时驱动。",
      },

      { type: "h2", text: "四、项目亮点与创新价值" },
      {
        type: "p",
        text: "第一，技术与人文的跨世纪共鸣。项目将最新的生成式 AI（MeshyAI）、超写实数字人（MetaHuman）与中国电影史上的里程碑作品深度结合。用现代科技复活经典文化符号，是数字文创和文化遗产数字化保护（Digital Heritage）的优秀范例。",
      },
      {
        type: "p",
        text: "第二，全管线虚拟制片（VP）的成功实践。项目完整跑通了从「AI 模型生成、数字人定制、动捕与面捕数据导入，到虚幻引擎实时渲染与 VR 交互」的全流程，体现了极高的工程整合能力与技术艺术（Technical Art）的融合素养。",
      },
      {
        type: "p",
        text: "第三，打破传统的沉浸式戏剧体验。传统的数字人多用于虚拟导览、电商直播或舞台表演，而本项目将数字人引入了深度的 VR 叙事空间。用户在体验中不再是置身事外的局外人，而是可以真正走近「阮玲玉」，在黑白光影的虚拟包裹中，去跨越近百年时空体验那份震撼人心的母爱。",
      },
    ],
  },
  {
    slug: "work-4",
    title: "电影剪辑作品",
    description:
      "剪辑作品曾在澳门国际微电影节、香岛湾短片季、金鸡手机电影计划、金鸡「金光计划」、上海青年短片展等入围或获奖。",
    icon: Film,
    image: "/portfolio/work-4.jpg",
    noDetail: true,
  },
  {
    slug: "work-5",
    title: "《息壤之森》 Kinect 交互",
    description:
      "将中国古代神话「息壤」（传说中能自行生长的神土）与生态科技概念融合。观众化身为「灵耕者」（三维空间中的小人），通过肢体动作在虚实交织的生态系统中播种未来。",
    icon: Palette,
    image: "/portfolio/work-5.jpg",
    video: "/portfolio/videos/work-5.mp4",
    doc: [
      { type: "h2", text: "一、创意与理念" },
      {
        type: "p",
        text: "将中国古代神话「息壤」（传说中能自行生长的神土）与生态科技概念融合。立方体空间是一个名为「息壤秘境」的异次元生态舱，观众化身为「灵耕者」（三维空间中的小人），通过肢体动作在虚实交织的生态系统中播种未来。",
      },
      {
        type: "p",
        text: "人物移动时，水面自动凹陷出圆形旱地，露出湿润土壤层。张嘴动作象征「第一次呼吸」→ 树苗从胚胎态苏醒。通过肢体动作与生长的联系，强调人与自然的互动。",
      },

      { type: "h2", text: "二、1 Kinect 交互" },
      { type: "h3", text: "核心功能" },
      { type: "p", text: "· Kinect 实时骨骼绑定驱动虚拟小人" },
      { type: "p", text: "· 动态水面避障（人物足迹触发地面交互）" },
      { type: "p", text: "· 动作触发树苗生长（张嘴动作 → 树苗生长）" },

      { type: "h3", text: "Kinect 实时骨骼绑定驱动虚拟小人" },
      {
        type: "p",
        text: "select 出 Kinect 骨骼的 x、y、z 坐标，转化 CHOP 为 TOP 的 RGB 信息传入 geometry，使用实例化的方式在骨骼点生成数个正方体，通过 noise 的 RGB 信息与 scale op 和 color op 绑定，实现生成正方体大小和颜色的变化。",
      },
      { type: "image", src: "/portfolio/work-5/fig-1.jpg" },
      { type: "image", src: "/portfolio/work-5/fig-2.jpg" },

      { type: "h3", text: "动态水面避障（人物足迹触发地面交互）" },
      {
        type: "p",
        text: "水面的构成：使用 grid 提供位置信息，采用实例化的方式创建了 62500 个球体组成水面，使用 Nvidia Flex Solver 进行水面的模拟。",
      },
      {
        type: "p",
        text: "触发逻辑：将人的空间信息传入到 force 的 translate 上，控制力产生的位置；将 x 的数值加上 filter 后传入 force 的 strength 上，控制力的大小，使水面散开。",
      },
      { type: "image", src: "/portfolio/work-5/fig-3.jpg" },
      { type: "image", src: "/portfolio/work-5/fig-4.jpg" },
      { type: "image", src: "/portfolio/work-5/fig-5.jpg" },

      { type: "h3", text: "L-System 简易程序化生成树苗" },
      {
        type: "p",
        text: "F 代表枝干，J 代表传入的模型，+ 代表左生长，- 代表右生长，[] 生成新的枝干，！用于控制枝干的粗细（每次迭代时乘以 Thickness Scale），~ 为随机变化俯仰角 / 滚动角 / 转向角，/ 为逆时针滚动。",
      },
      {
        type: "p",
        text: "通过控制 L-System 的 Generations（迭代次数）的值来控制树苗的生长。",
      },
      { type: "image", src: "/portfolio/work-5/fig-6.jpg" },
      { type: "image", src: "/portfolio/work-5/fig-7.jpg" },

      { type: "h3", text: "动作触发树苗生长（张嘴动作 → 树苗生长）" },
      {
        type: "p",
        text: "嘴部动作检测：计算 Kinect mouse 张开闭合变化；阈值判定：张口 → 触发事件 → 持续 5 秒消失。",
      },
      {
        type: "p",
        text: "生长动画：使用 trigger 输出变化的数值到 Generation 上，实现树苗逐渐生长的效果；Noise CHOP 连接 geo 的 rotate 参数，添加随机摆动效果。",
      },
      { type: "image", src: "/portfolio/work-5/fig-8.jpg" },

      { type: "h2", text: "二、2 TD 场景" },
      { type: "h3", text: "构建三维空间" },
      { type: "image", src: "/portfolio/work-5/fig-9.jpg" },
      { type: "image", src: "/portfolio/work-5/fig-10.jpg" },

      { type: "h3", text: "背景粒子流动" },
      {
        type: "p",
        text: "Movie File In 一张图片，然后使用 edge、composite、feedback 等元件对图像进行处理，最后传入 phong 材质的 color map，用于影响 grid 的表现。",
      },
      { type: "image", src: "/portfolio/work-5/fig-11.jpg" },
      { type: "image", src: "/portfolio/work-5/fig-12.jpg" },
      { type: "image", src: "/portfolio/work-5/fig-13.jpg" },
    ],
  },
  {
    slug: "work-6",
    title: "AIGC 作品",
    description: "",
    icon: Layers,
    image: "/portfolio/work-6.jpg",
    videos: [
      "/portfolio/videos/work-6-1.mp4",
      "/portfolio/videos/work-6-2.mp4",
    ],
  },
  {
    slug: "work-7",
    title: "丝痕",
    description:
      "以 3D Mapping 重述丝绸之路的历史流动。本项目以长城关口式建筑为投影载体，将城门、城墙、城楼与边缘轮廓转化为承载时间、迁徙与文明交汇的影像界面。",
    icon: Globe,
    image: "/portfolio/work-7.jpg",
    video: "/portfolio/videos/work-7.mp4",
    docTitle: "Gallery",
    doc: [
      { type: "image", src: "/portfolio/work-7/fig-1.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-2.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-3.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-4.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-5.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-6.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-7.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-8.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-9.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-10.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-11.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-12.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-13.jpg" },
      { type: "image", src: "/portfolio/work-7/fig-14.jpg" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
