import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { i as SectionLabel, n as Eyebrow, r as PageHeader } from "./site-chrome-PXtKjev0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-C_68Ws0w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INTERESTS = [
	"Tech · Systems",
	"Tech · AI & Automation",
	"Studios · Brand",
	"Studios · Film",
	"Both divisions",
	"Just exploring"
];
function ContactPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [interest, setInterest] = (0, import_react.useState)("Both divisions");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		n: "04",
		kicker: "Contact / One thread",
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Say ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "italic",
				children: "hello"
			}),
			".",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"We answer fast."
		] }),
		lead: "One email reaches both divisions. Tell us what you're building — or what's stuck — and we'll come back with people, not a form response.",
		accent: "volt"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid md:grid-cols-12 border-b-2 border-ink",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "md:col-span-4 border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-ink p-6 md:p-10 space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Direct" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "mailto:hello@typtwo.com",
					className: "mt-3 block display text-3xl md:text-4xl hover:bg-volt",
					children: "hello@typtwo.com"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mono text-xs uppercase tracking-widest text-muted-foreground mb-2",
					children: "// Response time"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Within one working day." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mono text-xs uppercase tracking-widest text-muted-foreground mb-2",
					children: "// Where"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Everywhere. Headquartered in Dubai." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "brute bg-volt text-ink p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono text-xs uppercase tracking-widest mb-2",
						children: "Fast track"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed",
						children: "Founders and heads of teams — mention \"fast track\" and you'll land on a call within 48 hours."
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "md:col-span-8 p-6 md:p-10",
			children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "brute p-10 bg-flame text-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
						color: "paper",
						children: "Message sent"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "display text-4xl md:text-5xl mt-4 leading-[0.9]",
						children: [
							"Thanks.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic",
								children: "We're on it."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm max-w-[42ch]",
						children: "You'll hear back from a real person at Typtwo within one working day. Meanwhile: two worlds, one force."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSent(false),
						className: "mt-8 mono text-xs uppercase tracking-widest underline underline-offset-4",
						children: "← Send another"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					setSent(true);
				},
				className: "space-y-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						n: "01",
						label: "Who's writing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
								name: "name",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Company",
								name: "company"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								name: "email",
								type: "email",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Role",
								name: "role",
								placeholder: "Founder, CTO, CMO…"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						n: "02",
						label: "What you need"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono text-xs uppercase tracking-widest mb-3",
						children: "Interest"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: INTERESTS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setInterest(i),
							className: `brute px-4 py-2 mono text-xs uppercase tracking-widest ${interest === i ? "bg-ink text-paper" : "bg-paper"}`,
							children: i
						}, i))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mono text-xs uppercase tracking-widest mb-2",
						children: "Project brief"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						name: "message",
						rows: 6,
						placeholder: "Tell us what you're building, what's stuck, or what you want the world to see…",
						className: "w-full bg-paper border-2 border-ink px-4 py-3 focus:outline-none focus:bg-volt/30 mono text-sm"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mono text-xs uppercase tracking-widest text-muted-foreground",
							children: "↳ One thread reaches both divisions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							className: "brute bg-flame text-paper px-8 py-4 mono uppercase tracking-widest text-sm inline-flex items-center gap-3",
							children: ["Send message ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
						})]
					})
				]
			})
		})]
	})] });
}
function Field({ label, name, type = "text", required, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mono text-xs uppercase tracking-widest mb-2",
			children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-flame",
				children: " *"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			name,
			type,
			required,
			placeholder,
			className: "w-full bg-paper border-2 border-ink px-4 py-3 focus:outline-none focus:bg-volt/30 mono text-sm"
		})]
	});
}
//#endregion
export { ContactPage as component };
