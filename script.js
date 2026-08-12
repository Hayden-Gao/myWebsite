/* ============ 作品数据（引用本地 works/ 素材；含敏感信息的图已用 works/_safe/ 模糊版） ============ */

// 平面设计类 —— 来自 works/ 真实作品
const designItems = [
  { src: "works/LOGO设计理念+过程+样本.jpg", label: "品牌 LOGO · 设计理念与样本" },
  { src: "works/_safe/三折页正面.jpg", label: "宣传三折页 · 正面（联系方式已遮挡）" },
  { src: "works/_safe/三折页反面.jpg", label: "宣传三折页 · 反面（联系方式已遮挡）" },
  { src: "works/_safe/名片1正面.png", label: "名片设计 · 正面（联系方式已遮挡）" },
  { src: "works/_safe/名片1反面.png", label: "名片设计 · 反面（联系方式已遮挡）" },
  { src: "works/奶茶店（1）.png", label: "餐饮品牌视觉 · 奶茶店" },
  { src: "works/奶茶店（2）.png", label: "餐饮品牌视觉 · 延展" },
  { src: "works/_safe/【第二版 正】.jpg", label: "平面设计稿 · 正稿（联系方式已遮挡）" },
  { src: "works/_safe/【第二版 反】.jpg", label: "平面设计稿 · 反稿（联系方式已遮挡）" },
  { src: "works/_safe/单面.jpg", label: "单页视觉设计（联系方式已遮挡）" },
  { src: "works/1.png", label: "系列设计 · 01" },
  { src: "works/2.png", label: "系列设计 · 02" },
  { src: "works/3.png", label: "系列设计 · 03" },
  { src: "works/4.png", label: "系列设计 · 04" },
  { src: "works/5.png", label: "系列设计 · 05" },
  { src: "works/6.png", label: "系列设计 · 06" },
];

// 视频剪辑类 —— 真实剪辑成片
const videoItems = [
  {
    src: "works/zg印象.mp4",
    tag: "品牌视频",
    title: "ZG 印象 · 品牌短片",
    desc: "品牌叙事剪辑成片，约 22MB。",
  },
  {
    src: "works/贺新春宣传片.mp4",
    tag: "节日宣传",
    title: "贺新春宣传片",
    desc: "节日主题动态宣传片，约 25MB。",
  },
];

// AI 短片 / 生成式创作
const aiItems = [
  {
    src: "works/光阴.mp4",
    title: "AI 故事流程游戏《光阴》",
    desc: "生成式影像 · 叙事向短片，约 10MB。",
  },
  {
    src: "works/无名的人.mp4",
    title: "AI 生成短片《无名的人》",
    desc: "生成式影像成片（高清版 422MB，建议 Wi-Fi 下播放）。",
  },
];

/* ============ 渲染 ============ */
function renderDesign() {
  const grid = document.getElementById("designGrid");
  grid.innerHTML = designItems
    .map(
      (it) => `
    <div class="gallery__item reveal" data-label="${it.label}">
      <img src="${it.src}" alt="${it.label}" loading="lazy" />
    </div>`
    )
    .join("");
  grid.querySelectorAll(".gallery__item").forEach((el) => {
    el.addEventListener("click", () => openLightbox(el.querySelector("img").src, el.dataset.label));
  });
}

function renderVideo() {
  const grid = document.getElementById("videoGrid");
  grid.innerHTML = videoItems
    .map(
      (v) => `
    <div class="vid reveal">
      <video src="${v.src}" controls preload="metadata" playsinline></video>
      <div class="vid__meta">
        <span class="vid__tag">${v.tag}</span>
        <h3>${v.title}</h3>
        <p>${v.desc}</p>
      </div>
    </div>`
    )
    .join("");
}

function renderAI() {
  const grid = document.getElementById("aiGrid");
  grid.innerHTML = aiItems
    .map((v) => `
    <div class="vid reveal">
      <video src="${v.src}" controls preload="metadata" playsinline></video>
      <div class="vid__meta">
        <h3>${v.title}</h3>
        <p>${v.desc}</p>
      </div>
    </div>`)
    .join("");
}

/* ============ 灯箱 ============ */
const lightbox = document.getElementById("lightbox");
const lbBody = document.getElementById("lbBody");
function openLightbox(src, label) {
  lbBody.innerHTML = `<img src="${src}" alt="${label || ""}" />`;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lbBody.innerHTML = "";
  document.body.style.overflow = "";
}
document.getElementById("lbClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ============ 导航交互 ============ */
const nav = document.getElementById("nav");
const navLinks = document.getElementById("navLinks");
const burger = document.getElementById("navBurger");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById("scrollProgress").style.width = (window.scrollY / h) * 100 + "%";
});

burger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

/* ============ 数字计数 ============ */
function countUp(el) {
  const target = +el.dataset.count;
  const dur = 1400;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ============ 滚动入场 + 触发 ============ */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        if (e.target.classList.contains("hero__stats")) {
          e.target.querySelectorAll("b").forEach(countUp);
        }
        if (e.target.querySelector && e.target.querySelector(".skill__bar i")) {
          e.target.querySelectorAll(".skill__bar i").forEach((i) => {
            i.style.width = i.style.getPropertyValue("--w");
          });
        }
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.18 }
);

/* ============ 初始化 ============ */
renderDesign();
renderVideo();
renderAI();

document.querySelectorAll(".reveal, .hero__stats, .about__skills").forEach((el) => io.observe(el));
