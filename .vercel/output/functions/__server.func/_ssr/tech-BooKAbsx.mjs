import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as SectionLabel, n as Eyebrow, r as PageHeader, t as BruteButton } from "./site-chrome-PXtKjev0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tech-BooKAbsx.js
var import_jsx_runtime = require_jsx_runtime();
var CAPABILITIES = [
	{
		n: "01",
		t: "AI & Automation"
	},
	{
		n: "02",
		t: "Cloud"
	},
	{
		n: "03",
		t: "Security"
	},
	{
		n: "04",
		t: "Data"
	},
	{
		n: "05",
		t: "Platforms"
	},
	{
		n: "06",
		t: "Managed Ops"
	}
];
function TechPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			n: "01",
			kicker: "Division 01 · Tech",
			title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				"Intelligent",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic",
					children: "operations."
				})
			] }),
			lead: "Systems that run the business — quietly, securely, at scale.",
			accent: "flame"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "border-b-2 border-ink",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				n: "02",
				label: "Capabilities"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3",
				children: CAPABILITIES.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `p-8 md:p-12 border-ink group hover:bg-ink hover:text-paper transition-colors ${(i + 1) % 3 !== 0 ? "md:border-r-2" : ""} ${i % 2 === 0 ? "border-r-2 md:border-r-2" : ""} ${i < CAPABILITIES.length - 3 ? "border-b-2" : "border-b-2 md:border-b-0"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mono text-xs uppercase tracking-widest text-flame",
						children: [
							"[",
							c.n,
							"]"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "display text-3xl md:text-5xl mt-4",
						children: c.t
					})]
				}, c.n))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b-2 border-ink overflow-hidden bg-volt",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ticker flex w-max whitespace-nowrap py-8 mono text-2xl md:text-3xl uppercase",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mx-6 flex items-center gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AWS" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flame",
							children: "✱"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OPENAI" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flame",
							children: "✱"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ANTHROPIC" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flame",
							children: "✱"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "POSTGRES" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flame",
							children: "✱"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "K8S" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flame",
							children: "✱"
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
							"Modernise",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-flame",
								children: "the engine."
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-4 flex flex-wrap gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BruteButton, {
						to: "/contact",
						variant: "flame",
						children: "Book a call"
					})
				})]
			})
		})
	] });
}
//#endregion
export { TechPage as component };
