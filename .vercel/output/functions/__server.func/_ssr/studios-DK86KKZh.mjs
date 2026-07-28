import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as SectionLabel, n as Eyebrow, r as PageHeader, t as BruteButton } from "./site-chrome-PXtKjev0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studios-DK86KKZh.js
var import_jsx_runtime = require_jsx_runtime();
var SERVICES = [
	{
		n: "01",
		t: "Brand"
	},
	{
		n: "02",
		t: "Campaigns"
	},
	{
		n: "03",
		t: "Film"
	},
	{
		n: "04",
		t: "Content"
	},
	{
		n: "05",
		t: "Digital"
	},
	{
		n: "06",
		t: "Social"
	}
];
function StudiosPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			n: "02",
			kicker: "Division 02 · Studios",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Intelligent",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic",
					children: "growth."
				})
			] }),
			lead: "Brands people trust. Stories they remember.",
			accent: "volt"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "border-b-2 border-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				n: "02",
				label: "Services"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3",
				children: SERVICES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `p-8 md:p-12 border-ink group hover:bg-flame hover:text-paper transition-colors ${(i + 1) % 3 !== 0 ? "md:border-r-2" : ""} ${i % 2 === 0 ? "border-r-2 md:border-r-2" : ""} ${i < SERVICES.length - 3 ? "border-b-2" : "border-b-2 md:border-b-0"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mono text-xs uppercase tracking-widest",
						children: [
							"[",
							s.n,
							"]"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "display text-3xl md:text-5xl mt-4",
						children: s.t
					})]
				}, s.n))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b-2 border-ink bg-paper overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ticker-reverse flex w-max whitespace-nowrap py-8 display text-3xl md:text-5xl italic",
				children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mx-6 flex items-center gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Strategy" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flame not-italic",
							children: "◆"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Story" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flame not-italic",
							children: "◆"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Craft" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flame not-italic",
							children: "◆"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Momentum" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flame not-italic",
							children: "◆"
						})
					]
				}, i))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "p-6 md:p-14 bg-ink text-paper",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-12 gap-8 items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
						color: "flame",
						children: "Next"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "display text-5xl md:text-7xl mt-4 leading-[0.9]",
						children: [
							"Build a brand",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-flame",
								children: "worth remembering."
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-4 flex flex-wrap gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BruteButton, {
						to: "/contact",
						variant: "flame",
						children: "Start"
					})
				})]
			})
		})
	] });
}
//#endregion
export { StudiosPage as component };
