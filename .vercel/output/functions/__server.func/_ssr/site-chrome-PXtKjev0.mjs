import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Moon, t as Sun } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-chrome-PXtKjev0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/tech",
		label: "Tech",
		n: "01"
	},
	{
		to: "/studios",
		label: "Studios",
		n: "02"
	},
	{
		to: "/about",
		label: "About",
		n: "03"
	},
	{
		to: "/contact",
		label: "Contact",
		n: "04"
	}
];
function Ticker({ items, reverse = false, className = "" }) {
	const loop = [
		...items,
		...items,
		...items
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `relative overflow-hidden ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `flex w-max whitespace-nowrap ${reverse ? "ticker-reverse" : "ticker"}`,
			children: loop.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mx-6 inline-flex items-center gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					children: "✱"
				})]
			}, i))
		})
	});
}
function StatusBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "hidden md:flex border-b-2 border-ink bg-paper text-ink mono text-[11px] uppercase tracking-widest",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-1.5 border-r-2 border-ink flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2 w-2 bg-flame" }), " LIVE"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-1.5 border-r-2 border-ink",
				children: "SYS/TYPTWO_v2.0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-1.5 border-r-2 border-ink flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticker, { items: [
					"TWO WORLDS. ONE FORCE.",
					"ENGINEERING INTELLIGENT OPERATIONS",
					"ENGINEERING INTELLIGENT GROWTH",
					"BUILT FOR WHAT'S NEXT",
					"NOW ONBOARDING Q3 PARTNERS"
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-1.5 border-l-2 border-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "blink",
					children: "█"
				}), " ONLINE"]
			})
		]
	});
}
function SiteHeader() {
	const [theme, setTheme] = (0, import_react.useState)("light");
	(0, import_react.useEffect)(() => {
		if (document.documentElement.classList.contains("dark") || localStorage.getItem("theme") === "dark") {
			document.documentElement.classList.add("dark");
			setTheme("dark");
		} else {
			document.documentElement.classList.remove("dark");
			setTheme("light");
		}
	}, []);
	const toggleTheme = () => {
		if (theme === "light") {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
			setTheme("dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
			setTheme("light");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 bg-paper border-b-2 border-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 items-stretch",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "col-span-6 md:col-span-3 flex items-center gap-3 px-6 py-4 border-r-2 border-ink group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "inline-block h-3 w-3 bg-flame group-hover:bg-ink transition"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "display text-3xl leading-none tracking-tight",
						children: [
							"TYP",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-flame",
								children: "TWO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-flame",
								children: "."
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden md:flex col-span-6 items-stretch",
					children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: n.to,
						className: "group flex-1 flex items-center gap-3 px-5 border-r-2 border-ink mono text-xs uppercase tracking-widest hover:bg-ink hover:text-paper transition",
						activeProps: { className: "bg-volt text-ink" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "opacity-60",
							children: [
								"[",
								n.n,
								"]"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.label })]
					}, n.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-6 md:col-span-3 flex items-stretch",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: toggleTheme,
						className: "flex items-center justify-center px-4 hover:bg-ink hover:text-paper border-r-2 border-ink transition cursor-pointer text-ink bg-paper",
						title: "Toggle theme mode",
						style: { minWidth: "56px" },
						children: theme === "light" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { size: 16 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/contact",
						className: "flex-1 flex items-center justify-between gap-2 px-6 py-4 bg-ink text-paper hover:bg-flame transition group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono text-xs uppercase tracking-widest",
							children: "Start a project"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl group-hover:translate-x-1 transition-transform",
							children: "→"
						})]
					})]
				})
			]
		})
	})] });
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t-2 border-ink bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b-2 border-ink bg-ink text-paper overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ticker-slow flex w-max whitespace-nowrap py-6 display text-6xl md:text-8xl",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mx-8 flex items-center gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TWO WORLDS" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-flame",
								children: "✱"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic",
								children: "One force."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-volt",
								children: "✱"
							})
						]
					}, i))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-12 border-b-2 border-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 md:col-span-6 p-8 md:p-14 border-r-0 md:border-r-2 border-ink",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono text-xs uppercase tracking-widest text-muted-foreground mb-6",
							children: "[ Let's build ]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "display text-5xl md:text-7xl leading-[0.9]",
							children: [
								"Something the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-volt px-2",
									children: "world"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								" hasn't seen yet."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "inline-flex items-center gap-3 mt-10 brute bg-flame text-paper px-6 py-4 mono uppercase tracking-widest text-sm",
							children: ["Start a conversation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-12 md:col-span-6 grid grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterCol, {
							title: "Divisions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FLink, {
								to: "/tech",
								children: "01 · Tech"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FLink, {
								to: "/studios",
								children: "02 · Studios"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterCol, {
							title: "Company",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FLink, {
								to: "/about",
								children: "03 · About"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FLink, {
								to: "/contact",
								children: "04 · Contact"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterCol, {
							title: "Contact",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:hello@typtwo.com",
								className: "hover:bg-volt inline-block",
								children: "hello@typtwo.com"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "One thread. Two worlds."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FooterCol, {
							title: "Signal",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:bg-volt inline-block",
								children: "LinkedIn ↗"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:bg-volt inline-block",
								children: "Instagram ↗"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 px-6 py-4 mono text-[11px] uppercase tracking-widest",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" TYPTWO / ALL RIGHTS RESERVED"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-2 w-2 bg-flame blink" }), "BUILT FOR WHAT'S NEXT"]
				})]
			})
		]
	});
}
function FooterCol({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t-2 md:border-t-0 border-l-2 border-ink p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4",
			children: ["// ", title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2 text-sm",
			children: splitChildren(children)
		})]
	});
}
function splitChildren(children) {
	return (Array.isArray(children) ? children : [children]).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, i));
}
function FLink({ to, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: "hover:bg-volt inline-block",
		children
	});
}
function Eyebrow({ children, color = "ink" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `mono text-xs uppercase tracking-[0.25em] ${color === "flame" ? "text-flame" : color === "paper" ? "text-paper" : "text-ink"} flex items-center gap-3`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				children: "["
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				children: "]"
			})
		]
	});
}
function BruteButton({ to, children, variant = "ink" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: `brute inline-flex items-center gap-3 px-6 py-4 mono uppercase tracking-widest text-sm ${{
			ink: "bg-ink text-paper",
			flame: "bg-flame text-paper",
			volt: "bg-volt text-ink",
			paper: "bg-paper text-ink"
		}[variant]}`,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
	});
}
function SectionLabel({ n, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between border-b-2 border-ink py-3 mono text-xs uppercase tracking-widest",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bg-ink text-paper px-2 py-1",
				children: n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden md:inline text-muted-foreground",
			children: "────────────── ✱"
		})]
	});
}
function PageHeader({ n, kicker, title, lead, accent = "flame" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-b-2 border-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
			n,
			label: kicker
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-12 gap-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-span-12 md:col-span-8 p-6 md:p-14 border-r-0 md:border-r-2 border-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display text-6xl md:text-[10rem] leading-[0.85] tracking-tighter rise",
					children: title
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-12 md:col-span-4 p-6 md:p-14 flex flex-col justify-between gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg leading-relaxed",
					children: lead
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-24 ${accent === "flame" ? "bg-flame" : "bg-volt"} brute` })]
			})]
		})]
	});
}
//#endregion
export { SiteFooter as a, SectionLabel as i, Eyebrow as n, SiteHeader as o, PageHeader as r, Ticker as s, BruteButton as t };
