import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as SectionLabel, n as Eyebrow, s as Ticker, t as BruteButton } from "./site-chrome-PXtKjev0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-JhUds0b0.js
var import_jsx_runtime = require_jsx_runtime();
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Duality, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Numbers, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Closer, {})
	] });
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b-2 border-ink relative overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 gap-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "col-span-12 md:col-span-3 border-r-0 md:border-r-2 border-ink p-6 md:p-8 flex md:flex-col justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Typtwo / 2026" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2 w-2 bg-flame blink" }), " Online"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-12 md:col-span-9 p-6 md:p-14 relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "display leading-[0.82] tracking-tighter text-[3.2rem] sm:text-[5rem] md:text-[8rem] lg:text-[11rem] rise",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block",
							children: "Two worlds."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block",
							children: [
								"One",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative inline-block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-flame text-paper px-4",
										children: "force"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-2 -right-3 h-3 w-3 bg-volt border-2 border-ink" })]
								}),
								"."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BruteButton, {
							to: "/tech",
							variant: "ink",
							children: "Tech"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BruteButton, {
							to: "/studios",
							variant: "flame",
							children: "Studios"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:block absolute right-8 top-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotatingSeal, {})
					})
				]
			})]
		})
	});
}
function RotatingSeal() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-40 w-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 200 200",
			className: "h-full w-full spin-slow",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				id: "circle",
				d: "M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				className: "mono uppercase",
				fontSize: "14",
				letterSpacing: "4",
				fill: "currentColor",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textPath", {
					href: "#circle",
					children: "✱ TYPTWO ✱ BUILT FOR WHAT'S NEXT ✱ SINCE 2026"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-14 w-14 bg-flame border-2 border-ink flex items-center justify-center display text-3xl text-paper",
				children: "T2"
			})
		})]
	});
}
function Marquee() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-ink text-paper border-b-2 border-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticker, {
			className: "py-6 display text-5xl md:text-7xl",
			items: [
				"OPERATIONS",
				"◆",
				"GROWTH",
				"◆",
				"ENTERPRISE",
				"◆"
			]
		})
	});
}
function Duality() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-b-2 border-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
			n: "01",
			label: "Two divisions"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative p-8 md:p-14 border-b-2 md:border-b-0 md:border-r-2 border-ink bg-paper overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-10 -top-10 h-40 w-40 stripes opacity-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono text-xs uppercase tracking-widest mb-6",
						children: "[ 01 / Tech ]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "display text-6xl md:text-8xl leading-[0.85]",
						children: [
							"Intelligent",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic",
								children: "Operations."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BruteButton, {
							to: "/tech",
							variant: "ink",
							children: "Enter Tech"
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative p-8 md:p-14 bg-flame text-paper overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-10 -bottom-10 h-40 w-40 border-2 border-paper" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono text-xs uppercase tracking-widest mb-6 opacity-90",
						children: "[ 02 / Studios ]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "display text-6xl md:text-8xl leading-[0.85]",
						children: [
							"Intelligent",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic",
								children: "Growth."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BruteButton, {
							to: "/studios",
							variant: "paper",
							children: "Enter Studios"
						})
					})
				]
			})]
		})]
	});
}
function Numbers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b-2 border-ink grid grid-cols-2 md:grid-cols-4",
		children: [
			{
				n: "02",
				l: "Divisions"
			},
			{
				n: "01",
				l: "Vision"
			},
			{
				n: "∞",
				l: "Ambition"
			},
			{
				n: "24/7",
				l: "Momentum"
			}
		].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `p-8 md:p-12 ${i < 3 ? "border-r-0 md:border-r-2" : ""} ${i < 2 ? "border-b-2 md:border-b-0" : ""} border-ink hover:bg-volt transition-colors`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "display text-6xl md:text-8xl leading-none",
				children: s.n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 mono text-xs uppercase tracking-widest",
				children: s.l
			})]
		}, s.l))
	});
}
function Closer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "bg-ink text-paper py-24 md:py-40 relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 stripes opacity-[0.08]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative max-w-6xl mx-auto px-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
					color: "flame",
					children: "Ready"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "display text-6xl md:text-9xl mt-6 leading-[0.85]",
					children: [
						"Built for",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-flame",
							children: "what's next."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 flex flex-wrap justify-center gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BruteButton, {
						to: "/contact",
						variant: "flame",
						children: "Start a project"
					})
				})
			]
		})]
	});
}
//#endregion
export { Index as component };
