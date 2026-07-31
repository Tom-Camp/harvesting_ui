import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Form, Link, Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, createCookieSessionStorage, isRouteErrorResponse, redirect, useActionData, useFetcher, useLoaderData, useNavigation, useOutletContext, useRouteError, useSearchParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Children, PureComponent, cloneElement, createContext, createElement, forwardRef, isValidElement, memo, useCallback, useContext, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Calendar, ChartNoAxesCombined, ChevronDown, Eye, EyeOff, LayoutDashboard, Leaf, NotebookText, Search, Sparkles, Sprout, TrendingUp, UserCog, Wheat, X } from "lucide-react";
import zxcvbn from "zxcvbn";
import { clsx } from "clsx";
import { createPortal } from "react-dom";
import { area, curveBasis, curveBasisClosed, curveBasisOpen, curveBumpX, curveBumpY, curveLinear, curveLinearClosed, curveMonotoneX, curveMonotoneY, curveNatural, curveStep, curveStepAfter, curveStepBefore, line, stack, stackOffsetExpand, stackOffsetNone, stackOffsetSilhouette, stackOffsetWiggle, stackOrderNone, symbol, symbolCircle, symbolCross, symbolDiamond, symbolSquare, symbolStar, symbolTriangle, symbolWye } from "victory-vendor/d3-shape";
import get from "es-toolkit/compat/get";
import uniqBy from "es-toolkit/compat/uniqBy";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";
import { createSelector } from "reselect";
import sortBy from "es-toolkit/compat/sortBy";
import { autoBatchEnhancer, combineReducers, configureStore, createAction, createListenerMiddleware, createSlice, current, prepareAutoBatched } from "@reduxjs/toolkit";
import throttle from "es-toolkit/compat/throttle";
import { castDraft } from "immer";
import { Provider, shallowEqual } from "react-redux";
import range from "es-toolkit/compat/range";
import Decimal from "decimal.js-light";
import * as d3Scales from "victory-vendor/d3-scale";
import EventEmitter from "eventemitter3";
import { isFragment } from "react-is";
import isPlainObject from "es-toolkit/compat/isPlainObject";
import invariant from "tiny-invariant";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), streamTimeout + 1e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary$4,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links,
	loader: () => loader$20
});
async function loader$20() {
	return { ENV: { API_BASE_URL: process.env.API_BASE_URL ?? "" } };
}
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
	}
];
function Layout({ children }) {
	const data = useLoaderData();
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			data?.ENV && /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: { __html: `window.ENV = ${JSON.stringify(data.ENV)}` } }),
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(Outlet, {});
});
var ErrorBoundary$4 = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region app/.server/session.ts
var { getSession, commitSession, destroySession } = createCookieSessionStorage({ cookie: {
	name: "__hf_session",
	httpOnly: true,
	maxAge: 3600 * 24 * 30,
	path: "/",
	sameSite: "lax",
	secrets: [process.env.SESSION_SECRET],
	secure: process.env.NODE_ENV === "production"
} });
async function getToken(request) {
	return (await getSession(request.headers.get("Cookie"))).get("token") ?? null;
}
async function requireToken(request) {
	const token = await getToken(request);
	if (!token) throw redirect("/auth/login");
	return token;
}
async function createUserSession(token, userId, redirectTo) {
	const session = await getSession();
	session.set("token", token);
	session.set("userId", userId);
	return redirect(redirectTo, { headers: { "Set-Cookie": await commitSession(session) } });
}
async function destroyUserSession(request) {
	const session = await getSession(request.headers.get("Cookie"));
	return redirect("/auth/login", { headers: { "Set-Cookie": await destroySession(session) } });
}
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	loader: () => loader$19
});
async function loader$19({ request }) {
	return redirect(await getToken(request) ? "/gardens" : "/auth/login");
}
var home_default = UNSAFE_withComponentProps(function Home() {
	return null;
});
//#endregion
//#region app/routes/register-redirect.tsx
var register_redirect_exports = /* @__PURE__ */ __exportAll({ loader: () => loader$18 });
async function loader$18({ request }) {
	const token = new URL(request.url).searchParams.get("token");
	throw redirect(token ? `/auth/register?token=${encodeURIComponent(token)}` : "/auth/register", 301);
}
//#endregion
//#region app/assets/logo.svg
var logo_default = "/assets/logo-BtIhDltN.svg";
//#endregion
//#region app/components/layout/AuthShell.tsx
function AuthShell({ children, title }) {
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-gray-50 flex items-center justify-center px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "mb-8 text-center",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: logo_default,
						alt: "harvesting.food",
						className: "mx-auto mb-4 h-32 w-auto"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-3xl font-bold text-green-700",
						children: "harvesting.food"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-gray-600",
						children: title
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "rounded-lg border border-gray-200 bg-white p-8 shadow-sm",
				children
			})]
		})
	});
}
//#endregion
//#region app/components/ui/Button.tsx
var variantClasses = {
	primary: "bg-green-700 text-white hover:bg-green-800 focus-visible:ring-green-700",
	secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400",
	danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600"
};
function Button({ variant = "primary", isLoading = false, disabled, children, className = "", ...props }) {
	return /* @__PURE__ */ jsxs("button", {
		disabled: disabled || isLoading,
		className: `inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${className}`,
		...props,
		children: [isLoading && /* @__PURE__ */ jsxs("svg", {
			className: "h-4 w-4 animate-spin",
			xmlns: "http://www.w3.org/2000/svg",
			fill: "none",
			viewBox: "0 0 24 24",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("circle", {
				className: "opacity-25",
				cx: "12",
				cy: "12",
				r: "10",
				stroke: "currentColor",
				strokeWidth: "4"
			}), /* @__PURE__ */ jsx("path", {
				className: "opacity-75",
				fill: "currentColor",
				d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
			})]
		}), children]
	});
}
//#endregion
//#region app/components/ui/FormError.tsx
function FormError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200",
		children: message
	});
}
//#endregion
//#region app/components/ui/Input.tsx
function Input({ label, error, id, className = "", ...props }) {
	const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-1",
		children: [
			/* @__PURE__ */ jsx("label", {
				htmlFor: inputId,
				className: "text-sm font-medium text-gray-700",
				children: label
			}),
			/* @__PURE__ */ jsx("input", {
				id: inputId,
				"aria-invalid": !!error,
				"aria-describedby": error ? `${inputId}-error` : void 0,
				className: `rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-1 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"} ${className}`,
				...props
			}),
			error && /* @__PURE__ */ jsx("p", {
				id: `${inputId}-error`,
				className: "text-xs text-red-600",
				children: error
			})
		]
	});
}
//#endregion
//#region app/lib/api-client.ts
var ApiClientError = class extends Error {
	status;
	message;
	constructor(message, status) {
		super(message);
		this.message = message;
		this.status = status;
	}
};
async function request(baseUrl, path, options) {
	const { token, ...init } = options;
	const headers = {
		"Content-Type": "application/json",
		...init.headers
	};
	if (token) headers["Authorization"] = `Bearer ${token}`;
	const response = await fetch(`${baseUrl}${path}`, {
		...init,
		headers
	});
	if (!response.ok) {
		let message = response.statusText;
		try {
			const body = await response.json();
			if (body?.detail) message = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
		} catch {}
		throw new ApiClientError(message, response.status);
	}
	if (response.status === 204) return;
	return response.json();
}
function createApiClient(baseUrl, token) {
	const opts = { token };
	return {
		get(path) {
			return request(baseUrl, path, {
				method: "GET",
				...opts
			});
		},
		post(path, body) {
			return request(baseUrl, path, {
				method: "POST",
				body: JSON.stringify(body),
				...opts
			});
		},
		patch(path, body) {
			return request(baseUrl, path, {
				method: "PATCH",
				body: JSON.stringify(body),
				...opts
			});
		},
		delete(path) {
			return request(baseUrl, path, {
				method: "DELETE",
				...opts
			});
		}
	};
}
//#endregion
//#region app/.server/api.ts
function client(token) {
	const api = createApiClient(process.env.API_BASE_URL, token);
	async function guard(fn) {
		try {
			return await fn();
		} catch (err) {
			if (err instanceof ApiClientError && err.status === 401) throw redirect("/auth/logout");
			throw err;
		}
	}
	return {
		get: (path) => guard(() => api.get(path)),
		post: (path, body) => guard(() => api.post(path, body)),
		patch: (path, body) => guard(() => api.patch(path, body)),
		delete: (path) => guard(() => api.delete(path))
	};
}
async function registerUser(data) {
	return client().post("/auth/register", data);
}
async function loginUser(data) {
	return client().post("/auth/login", data);
}
async function forgotPassword(data) {
	return client().post("/auth/forgot-password", data);
}
async function resetPassword(data) {
	return client().post("/auth/reset-password", data);
}
async function getMe(token) {
	return client(token).get("/users/me");
}
async function updateMe(token, data) {
	return client(token).patch("/users/me", data);
}
async function listGardens(token) {
	return client(token).get("/gardens");
}
async function getGarden(token, slug) {
	return client(token).get(`/gardens/${slug}`);
}
async function createGarden(token, data) {
	return client(token).post("/gardens", data);
}
async function updateGarden(token, slug, data) {
	return client(token).patch(`/gardens/${slug}`, data);
}
async function deleteGarden(token, slug) {
	return client(token).delete(`/gardens/${slug}`);
}
async function listGardenNotes(token, gardenSlug) {
	return client(token).get(`/gardens/${gardenSlug}/notes`);
}
async function createGardenNote(token, gardenSlug, data) {
	return client(token).post(`/gardens/${gardenSlug}/notes`, data);
}
async function updateGardenNote(token, gardenSlug, noteId, data) {
	return client(token).patch(`/gardens/${gardenSlug}/notes/${noteId}`, data);
}
async function deleteGardenNote(token, gardenSlug, noteId) {
	return client(token).delete(`/gardens/${gardenSlug}/notes/${noteId}`);
}
async function listPlants(token, gardenSlug) {
	return client(token).get(`/gardens/${gardenSlug}/plants`);
}
async function getPlant(token, gardenSlug, plantId) {
	return client(token).get(`/gardens/${gardenSlug}/plants/${plantId}`);
}
async function createPlant(token, gardenSlug, data) {
	return client(token).post(`/gardens/${gardenSlug}/plants`, data);
}
async function updatePlant(token, gardenSlug, plantId, data) {
	return client(token).patch(`/gardens/${gardenSlug}/plants/${plantId}`, data);
}
async function deletePlant(token, gardenSlug, plantId) {
	return client(token).delete(`/gardens/${gardenSlug}/plants/${plantId}`);
}
async function getPlantCareInfo(token, gardenSlug, plantId) {
	return client(token).post(`/gardens/${gardenSlug}/plants/${plantId}/care`);
}
async function createHarvest(token, gardenSlug, plantId, data) {
	return client(token).post(`/gardens/${gardenSlug}/plants/${plantId}/harvests`, data);
}
async function updateHarvest(token, gardenSlug, plantId, harvestId, data) {
	return client(token).patch(`/gardens/${gardenSlug}/plants/${plantId}/harvests/${harvestId}`, data);
}
async function deleteHarvest(token, gardenSlug, plantId, harvestId) {
	return client(token).delete(`/gardens/${gardenSlug}/plants/${plantId}/harvests/${harvestId}`);
}
async function createNote(token, gardenSlug, plantId, data) {
	return client(token).post(`/gardens/${gardenSlug}/plants/${plantId}/notes`, data);
}
async function updateNote(token, gardenSlug, plantId, noteId, data) {
	return client(token).patch(`/gardens/${gardenSlug}/plants/${plantId}/notes/${noteId}`, data);
}
async function deleteNote(token, gardenSlug, plantId, noteId) {
	return client(token).delete(`/gardens/${gardenSlug}/plants/${plantId}/notes/${noteId}`);
}
async function listMembers(token, gardenSlug) {
	return client(token).get(`/gardens/${gardenSlug}/members`);
}
async function inviteMember(token, gardenSlug, email) {
	return client(token).post(`/gardens/${gardenSlug}/members/invite`, { email });
}
async function removeMember(token, gardenSlug, userId) {
	return client(token).delete(`/gardens/${gardenSlug}/members/${userId}`);
}
async function listAdminUsers(token) {
	return client(token).get("/admin/users");
}
async function listAdminGardens(token) {
	return client(token).get("/admin/gardens");
}
async function approveUsers(token, userId) {
	return client(token).patch(`/admin/users/${userId}/approve`, {});
}
async function suspendUsers(token, userId) {
	return client(token).patch(`/admin/users/${userId}/suspend`, {});
}
async function setUserRole(token, userId, role) {
	const payload = { role };
	return client(token).patch(`/admin/users/${userId}/role`, payload);
}
async function acceptInvitation(token, invitationToken) {
	return client(token).post(`/invitations/${invitationToken}/accept`);
}
async function sendAdminInvitation(token, payload) {
	return client(token).post("/admin/invitations", payload);
}
async function listAdminInvitations(token) {
	return client(token).get("/admin/invitations");
}
async function submitFeedback(token, data) {
	return client(token).post("/feedback", data);
}
//#endregion
//#region app/routes/auth.login.tsx
var auth_login_exports = /* @__PURE__ */ __exportAll({
	action: () => action$15,
	default: () => auth_login_default,
	loader: () => loader$17,
	meta: () => meta$22
});
function meta$22() {
	return [{ title: "Sign in — harvesting.food" }];
}
async function loader$17({ request }) {
	if (await getToken(request)) throw redirect("/gardens");
	return null;
}
async function action$15({ request }) {
	const form = await request.formData();
	const email = String(form.get("email") ?? "");
	const password = String(form.get("password") ?? "");
	if (!email || !password) return { error: "Email and password are required." };
	try {
		const { access_token } = await loginUser({
			email,
			password
		});
		return createUserSession(access_token, "", "/gardens");
	} catch (err) {
		if (err instanceof ApiClientError) return { error: err.message };
		return { error: "Something went wrong. Please try again." };
	}
}
var auth_login_default = UNSAFE_withComponentProps(function Login() {
	const actionData = useActionData();
	const isSubmitting = useNavigation().state === "submitting";
	return /* @__PURE__ */ jsxs(AuthShell, {
		title: "Sign in to your account",
		children: [/* @__PURE__ */ jsxs(Form, {
			method: "post",
			className: "flex flex-col gap-5",
			children: [
				/* @__PURE__ */ jsx(FormError, { message: actionData?.error }),
				/* @__PURE__ */ jsx(Input, {
					label: "Email",
					name: "email",
					type: "email",
					autoComplete: "email",
					required: true
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ jsx(Input, {
						label: "Password",
						name: "password",
						type: "password",
						autoComplete: "current-password",
						required: true
					}), /* @__PURE__ */ jsx("div", {
						className: "text-right",
						children: /* @__PURE__ */ jsx(Link, {
							to: "/auth/forgot-password",
							className: "text-sm text-green-700 hover:underline",
							children: "Forgot your password?"
						})
					})]
				}),
				/* @__PURE__ */ jsx(Button, {
					type: "submit",
					isLoading: isSubmitting,
					children: "Sign in"
				})
			]
		}), /* @__PURE__ */ jsxs("p", {
			className: "mt-6 text-center text-sm text-gray-600",
			children: [
				"Don't have an account?",
				" ",
				/* @__PURE__ */ jsx(Link, {
					to: "/auth/register",
					className: "font-medium text-green-700 hover:underline",
					children: "Create one"
				})
			]
		})]
	});
});
//#endregion
//#region app/components/ui/PasswordInput.tsx
function PasswordInput({ label, error, id, className = "", ...props }) {
	const [show, setShow] = useState(false);
	const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-1",
		children: [
			/* @__PURE__ */ jsx("label", {
				htmlFor: inputId,
				className: "text-sm font-medium text-gray-700",
				children: label
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative",
				children: [/* @__PURE__ */ jsx("input", {
					id: inputId,
					type: show ? "text" : "password",
					"aria-invalid": !!error,
					"aria-describedby": error ? `${inputId}-error` : void 0,
					className: `w-full rounded-md border px-3 py-2 pr-10 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-1 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"} ${className}`,
					...props
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => setShow((s) => !s),
					className: "absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600",
					"aria-label": show ? "Hide password" : "Show password",
					children: show ? /* @__PURE__ */ jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsx(Eye, { size: 16 })
				})]
			}),
			error && /* @__PURE__ */ jsx("p", {
				id: `${inputId}-error`,
				className: "text-xs text-red-600",
				children: error
			})
		]
	});
}
//#endregion
//#region app/routes/auth.register.tsx
var auth_register_exports = /* @__PURE__ */ __exportAll({
	action: () => action$14,
	default: () => auth_register_default,
	loader: () => loader$16,
	meta: () => meta$21
});
function meta$21() {
	return [{ title: "Create account — harvesting.food" }];
}
async function loader$16({ request }) {
	if (await getToken(request)) throw redirect("/gardens");
	return { invitationToken: new URL(request.url).searchParams.get("token") };
}
async function action$14({ request }) {
	const form = await request.formData();
	const email = String(form.get("email") ?? "");
	const password = String(form.get("password") ?? "");
	const confirm_password = String(form.get("confirm_password") ?? "");
	const username = String(form.get("username") ?? "");
	const first_name = String(form.get("first_name") ?? "") || void 0;
	const last_name = String(form.get("last_name") ?? "") || void 0;
	const invitation_token = String(form.get("invitation_token") ?? "") || void 0;
	if (!email || !password || !username) return { error: "Username, email, and password are required." };
	if (password !== confirm_password) return { error: "Passwords do not match." };
	try {
		const { access_token } = await registerUser({
			email,
			password,
			username,
			first_name,
			last_name,
			invitation_token
		});
		return createUserSession(access_token, "", "/gardens");
	} catch (err) {
		if (err instanceof ApiClientError) return { error: err.message };
		return { error: "Something went wrong. Please try again." };
	}
}
var auth_register_default = UNSAFE_withComponentProps(function Register() {
	const { invitationToken } = useLoaderData();
	const actionData = useActionData();
	const isSubmitting = useNavigation().state === "submitting";
	return /* @__PURE__ */ jsxs(AuthShell, {
		title: "Create your account",
		children: [
			invitationToken && /* @__PURE__ */ jsx("p", {
				className: "mb-4 rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800",
				children: "You've been invited! Register below to get started."
			}),
			/* @__PURE__ */ jsxs(Form, {
				method: "post",
				className: "flex flex-col gap-5",
				children: [
					invitationToken && /* @__PURE__ */ jsx("input", {
						type: "hidden",
						name: "invitation_token",
						value: invitationToken
					}),
					/* @__PURE__ */ jsx(FormError, { message: actionData?.error }),
					/* @__PURE__ */ jsx(Input, {
						label: "Username",
						name: "username",
						type: "text",
						autoComplete: "username",
						required: true
					}),
					/* @__PURE__ */ jsx(Input, {
						label: "First name",
						name: "first_name",
						type: "text",
						autoComplete: "given-name"
					}),
					/* @__PURE__ */ jsx(Input, {
						label: "Last name",
						name: "last_name",
						type: "text",
						autoComplete: "family-name"
					}),
					/* @__PURE__ */ jsx(Input, {
						label: "Email",
						name: "email",
						type: "email",
						autoComplete: "email",
						required: true
					}),
					/* @__PURE__ */ jsx(PasswordInput, {
						label: "Password",
						name: "password",
						autoComplete: "new-password",
						required: true
					}),
					/* @__PURE__ */ jsx(PasswordInput, {
						label: "Confirm password",
						name: "confirm_password",
						autoComplete: "new-password",
						required: true
					}),
					/* @__PURE__ */ jsx(Button, {
						type: "submit",
						isLoading: isSubmitting,
						children: "Create account"
					})
				]
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-6 text-center text-sm text-gray-600",
				children: [
					"Already have an account?",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/auth/login",
						className: "font-medium text-green-700 hover:underline",
						children: "Sign in"
					})
				]
			})
		]
	});
});
//#endregion
//#region app/routes/auth.logout.tsx
var auth_logout_exports = /* @__PURE__ */ __exportAll({
	action: () => action$13,
	loader: () => loader$15
});
async function loader$15({ request }) {
	return destroyUserSession(request);
}
async function action$13({ request }) {
	return destroyUserSession(request);
}
//#endregion
//#region app/routes/auth.forgot-password.tsx
var auth_forgot_password_exports = /* @__PURE__ */ __exportAll({
	action: () => action$12,
	default: () => auth_forgot_password_default,
	meta: () => meta$20
});
function meta$20() {
	return [{ title: "Forgot password — harvesting.food" }];
}
async function action$12({ request }) {
	const form = await request.formData();
	const email = String(form.get("email") ?? "");
	if (!email) return {
		error: "Email is required.",
		success: false
	};
	try {
		await forgotPassword({ email });
		return {
			error: null,
			success: true
		};
	} catch (err) {
		if (err instanceof ApiClientError) return {
			error: err.message,
			success: false
		};
		return {
			error: "Something went wrong. Please try again.",
			success: false
		};
	}
}
var auth_forgot_password_default = UNSAFE_withComponentProps(function ForgotPassword() {
	const actionData = useActionData();
	const isSubmitting = useNavigation().state === "submitting";
	return /* @__PURE__ */ jsxs(AuthShell, {
		title: "Reset your password",
		children: [actionData?.success ? /* @__PURE__ */ jsx("div", {
			className: "rounded-md bg-green-50 p-4 text-sm text-green-800",
			children: "If an account exists for that email, you will receive a password reset link shortly."
		}) : /* @__PURE__ */ jsxs(Form, {
			method: "post",
			className: "flex flex-col gap-5",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-gray-600",
					children: "Enter your email address and we'll send you a link to reset your password."
				}),
				/* @__PURE__ */ jsx(FormError, { message: actionData?.error ?? void 0 }),
				/* @__PURE__ */ jsx(Input, {
					label: "Email",
					name: "email",
					type: "email",
					autoComplete: "email",
					required: true
				}),
				/* @__PURE__ */ jsx(Button, {
					type: "submit",
					isLoading: isSubmitting,
					children: "Send reset link"
				})
			]
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-6 text-center text-sm text-gray-600",
			children: /* @__PURE__ */ jsx(Link, {
				to: "/auth/login",
				className: "font-medium text-green-700 hover:underline",
				children: "Back to sign in"
			})
		})]
	});
});
//#endregion
//#region app/routes/auth.reset-password.tsx
var auth_reset_password_exports = /* @__PURE__ */ __exportAll({
	action: () => action$11,
	default: () => auth_reset_password_default,
	loader: () => loader$14,
	meta: () => meta$19
});
function meta$19() {
	return [{ title: "Set new password — harvesting.food" }];
}
async function loader$14({ request }) {
	const token = new URL(request.url).searchParams.get("token");
	if (!token) throw redirect("/auth/forgot-password");
	return { token };
}
async function action$11({ request }) {
	const form = await request.formData();
	const token = String(form.get("token") ?? "");
	const new_password = String(form.get("new_password") ?? "");
	const confirm_password = String(form.get("confirm_password") ?? "");
	if (!new_password) return {
		error: "Password is required.",
		success: false
	};
	if (new_password !== confirm_password) return {
		error: "Passwords do not match.",
		success: false
	};
	try {
		await resetPassword({
			token,
			new_password
		});
		return {
			error: null,
			success: true
		};
	} catch (err) {
		if (err instanceof ApiClientError) return {
			error: err.message,
			success: false
		};
		return {
			error: "Something went wrong. Please try again.",
			success: false
		};
	}
}
var strengthLabels = [
	"Very weak",
	"Weak",
	"Fair",
	"Strong",
	"Very strong"
];
var strengthColors = [
	"bg-red-500",
	"bg-orange-400",
	"bg-yellow-400",
	"bg-lime-500",
	"bg-green-600"
];
var auth_reset_password_default = UNSAFE_withComponentProps(function ResetPassword({ loaderData }) {
	const { token } = loaderData;
	const actionData = useActionData();
	const isSubmitting = useNavigation().state === "submitting";
	const [score, setScore] = useState(null);
	function handlePasswordChange(e) {
		const value = e.target.value;
		setScore(value ? zxcvbn(value).score : null);
	}
	return /* @__PURE__ */ jsxs(AuthShell, {
		title: "Set a new password",
		children: [actionData?.success ? /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ jsx("div", {
				className: "rounded-md bg-green-50 p-4 text-sm text-green-800",
				children: "Your password has been reset successfully."
			}), /* @__PURE__ */ jsx(Link, {
				to: "/auth/login",
				className: "text-center text-sm font-medium text-green-700 hover:underline",
				children: "Sign in with your new password"
			})]
		}) : /* @__PURE__ */ jsxs(Form, {
			method: "post",
			className: "flex flex-col gap-5",
			children: [
				/* @__PURE__ */ jsx("input", {
					type: "hidden",
					name: "token",
					value: token
				}),
				/* @__PURE__ */ jsx(FormError, { message: actionData?.error ?? void 0 }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ jsx(PasswordInput, {
						label: "New password",
						name: "new_password",
						autoComplete: "new-password",
						required: true,
						onChange: handlePasswordChange
					}), score !== null && /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-1",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex gap-1",
							children: [
								0,
								1,
								2,
								3,
								4
							].map((i) => /* @__PURE__ */ jsx("div", { className: `h-1.5 flex-1 rounded-full transition-colors ${i <= score ? strengthColors[score] : "bg-gray-200"}` }, i))
						}), /* @__PURE__ */ jsx("p", {
							className: "text-xs text-gray-500",
							children: strengthLabels[score]
						})]
					})]
				}),
				/* @__PURE__ */ jsx(PasswordInput, {
					label: "Confirm password",
					name: "confirm_password",
					autoComplete: "new-password",
					required: true
				}),
				/* @__PURE__ */ jsx(Button, {
					type: "submit",
					isLoading: isSubmitting,
					children: "Set new password"
				})
			]
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-6 text-center text-sm text-gray-600",
			children: /* @__PURE__ */ jsx(Link, {
				to: "/auth/login",
				className: "font-medium text-green-700 hover:underline",
				children: "Back to sign in"
			})
		})]
	});
});
//#endregion
//#region app/components/FeedbackModal.tsx
function FeedbackModal({ open, onClose }) {
	const fetcher = useFetcher();
	const dialogRef = useRef(null);
	useEffect(() => {
		if (open) dialogRef.current?.showModal();
		else dialogRef.current?.close();
	}, [open]);
	const data = fetcher.data;
	const succeeded = fetcher.state === "idle" && data?.success === true;
	const error = fetcher.state === "idle" && !data?.success ? data?.error ?? null : null;
	return /* @__PURE__ */ jsx("dialog", {
		ref: dialogRef,
		className: "m-auto w-full max-w-md rounded-3xl border border-black/10 bg-surface p-6 shadow-lg backdrop:bg-black/40 open:flex open:flex-col",
		onClose,
		onClick: (e) => {
			if (e.target === dialogRef.current) onClose();
		},
		children: succeeded ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold text-text-main",
				children: "Send Feedback"
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onClose,
				className: "text-xl leading-none text-text-faint transition hover:text-text-main",
				"aria-label": "Close",
				children: "×"
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col items-center gap-4 py-4 text-center",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex h-12 w-12 items-center justify-center rounded-full bg-green-100",
					children: /* @__PURE__ */ jsx("svg", {
						className: "h-6 w-6 text-green-600",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						strokeWidth: 2,
						children: /* @__PURE__ */ jsx("path", {
							strokeLinecap: "round",
							strokeLinejoin: "round",
							d: "M5 13l4 4L19 7"
						})
					})
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "text-sm font-medium text-text-main",
					children: "Thanks for the feedback!"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs text-text-muted",
					children: "We'll take a look and get back to you if needed."
				})] }),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: onClose,
					className: "mt-2 inline-flex items-center rounded-full bg-primary px-5 py-2 text-xs font-medium text-white transition hover:bg-primary-strong",
					children: "Done"
				})
			]
		})] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold text-text-main",
				children: "Send Feedback"
			}), /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onClose,
				className: "text-xl leading-none text-text-faint transition hover:text-text-main",
				"aria-label": "Close",
				children: "×"
			})]
		}), /* @__PURE__ */ jsxs(fetcher.Form, {
			method: "post",
			action: "/feedback",
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
					className: "mb-1.5 block text-xs font-medium text-text-muted",
					children: ["Type ", /* @__PURE__ */ jsx("span", {
						className: "text-orange",
						children: "*"
					})]
				}), /* @__PURE__ */ jsxs("select", {
					name: "type",
					required: true,
					defaultValue: "bug",
					className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30",
					children: [/* @__PURE__ */ jsx("option", {
						value: "bug",
						children: "Bug report"
					}), /* @__PURE__ */ jsx("option", {
						value: "enhancement",
						children: "Feature idea"
					})]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
					className: "mb-1.5 block text-xs font-medium text-text-muted",
					children: ["Title ", /* @__PURE__ */ jsx("span", {
						className: "text-orange",
						children: "*"
					})]
				}), /* @__PURE__ */ jsx("input", {
					name: "title",
					type: "text",
					required: true,
					placeholder: "Brief summary",
					className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30"
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					className: "mb-1.5 block text-xs font-medium text-text-muted",
					children: "Description"
				}), /* @__PURE__ */ jsx("textarea", {
					name: "description",
					rows: 4,
					placeholder: "What happened? What did you expect?",
					className: "w-full resize-none rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30"
				})] }),
				error && /* @__PURE__ */ jsx("p", {
					className: "text-xs text-orange",
					children: error
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onClose,
						className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-4 py-2 text-xs font-medium text-text-muted transition hover:bg-surface-offset",
						children: "Cancel"
					}), /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: fetcher.state !== "idle",
						className: "inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary-strong disabled:opacity-60",
						children: fetcher.state !== "idle" ? "Sending…" : "Send feedback"
					})]
				})
			]
		})] })
	});
}
//#endregion
//#region app/components/layout/AppShell.tsx
function AppShell({ user }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [feedbackOpen, setFeedbackOpen] = useState(false);
	const [feedbackKey, setFeedbackKey] = useState(0);
	const openFeedback = () => {
		setFeedbackKey((k) => k + 1);
		setFeedbackOpen(true);
	};
	const displayName = user.first_name ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}` : user.username ?? user.email;
	const closeMenu = () => setMenuOpen(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-bg",
		children: [
			/* @__PURE__ */ jsxs("header", {
				className: "sticky top-0 z-40 border-b border-black/10 bg-surface/90 backdrop-blur",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-6",
							children: [/* @__PURE__ */ jsxs(Link, {
								to: "/gardens",
								className: "flex items-center gap-2 font-display text-2xl leading-none text-primary",
								children: [/* @__PURE__ */ jsx("img", {
									src: logo_default,
									alt: "",
									className: "h-8 w-auto",
									"aria-hidden": "true"
								}), "harvesting.food"]
							}), /* @__PURE__ */ jsxs("nav", {
								className: "hidden sm:flex items-center gap-4",
								children: [/* @__PURE__ */ jsx(NavLink, {
									to: "/gardens",
									className: ({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-text-muted hover:text-text-main"}`,
									children: "My Gardens"
								}), user.role === "admin" && /* @__PURE__ */ jsx(NavLink, {
									to: "/admin",
									end: false,
									className: ({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-orange" : "text-text-muted hover:text-text-main"}`,
									children: "Admin"
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "hidden sm:flex items-center gap-4",
							children: [
								/* @__PURE__ */ jsx(NavLink, {
									to: "/help",
									className: ({ isActive }) => `text-sm transition-colors ${isActive ? "text-primary font-medium" : "text-text-muted hover:text-text-main"}`,
									children: "Help"
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: openFeedback,
									className: "text-sm text-text-muted hover:text-text-main transition-colors",
									children: "Feedback"
								}),
								/* @__PURE__ */ jsx(NavLink, {
									to: "/settings",
									className: ({ isActive }) => `text-sm transition-colors ${isActive ? "text-primary font-medium" : "text-text-muted hover:text-text-main"}`,
									children: displayName
								}),
								/* @__PURE__ */ jsx(Form, {
									method: "post",
									action: "/auth/logout",
									children: /* @__PURE__ */ jsx("button", {
										type: "submit",
										className: "text-sm font-medium text-text-muted hover:text-text-main transition-colors",
										children: "Sign out"
									})
								})
							]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							className: "sm:hidden p-2 -mr-2 text-text-muted hover:text-text-main transition-colors",
							onClick: () => setMenuOpen((o) => !o),
							"aria-label": menuOpen ? "Close menu" : "Open menu",
							"aria-expanded": menuOpen,
							children: menuOpen ? /* @__PURE__ */ jsx("svg", {
								xmlns: "http://www.w3.org/2000/svg",
								className: "h-6 w-6",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								strokeWidth: 2,
								children: /* @__PURE__ */ jsx("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									d: "M6 18L18 6M6 6l12 12"
								})
							}) : /* @__PURE__ */ jsx("svg", {
								xmlns: "http://www.w3.org/2000/svg",
								className: "h-6 w-6",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								strokeWidth: 2,
								children: /* @__PURE__ */ jsx("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									d: "M4 6h16M4 12h16M4 18h16"
								})
							})
						})
					]
				}), menuOpen && /* @__PURE__ */ jsxs("nav", {
					className: "sm:hidden border-t border-black/10 px-4 py-4 flex flex-col gap-4",
					children: [
						/* @__PURE__ */ jsx(NavLink, {
							to: "/gardens",
							onClick: closeMenu,
							className: ({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-text-muted hover:text-text-main"}`,
							children: "My Gardens"
						}),
						user.role === "admin" && /* @__PURE__ */ jsx(NavLink, {
							to: "/admin",
							end: false,
							onClick: closeMenu,
							className: ({ isActive }) => `text-sm font-medium transition-colors ${isActive ? "text-orange" : "text-text-muted hover:text-text-main"}`,
							children: "Admin"
						}),
						/* @__PURE__ */ jsx(NavLink, {
							to: "/settings",
							onClick: closeMenu,
							className: ({ isActive }) => `text-sm transition-colors ${isActive ? "text-primary font-medium" : "text-text-muted hover:text-text-main"}`,
							children: displayName
						}),
						/* @__PURE__ */ jsx(NavLink, {
							to: "/help",
							onClick: closeMenu,
							className: ({ isActive }) => `text-sm transition-colors ${isActive ? "text-primary font-medium" : "text-text-muted hover:text-text-main"}`,
							children: "Help"
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => {
								openFeedback();
								closeMenu();
							},
							className: "text-sm text-text-muted hover:text-text-main transition-colors text-left",
							children: "Feedback"
						}),
						/* @__PURE__ */ jsx(Form, {
							method: "post",
							action: "/auth/logout",
							children: /* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "text-sm font-medium text-text-muted hover:text-text-main transition-colors",
								children: "Sign out"
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx(FeedbackModal, {
				open: feedbackOpen,
				onClose: () => setFeedbackOpen(false)
			}, feedbackKey),
			/* @__PURE__ */ jsx(Outlet, {})
		]
	});
}
//#endregion
//#region app/routes/_app.tsx
var _app_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary$3,
	default: () => _app_default,
	loader: () => loader$13
});
async function loader$13({ request }) {
	const token = await requireToken(request);
	return {
		user: await getMe(token),
		token
	};
}
var _app_default = UNSAFE_withComponentProps(function AppLayout() {
	const { user } = useLoaderData();
	return /* @__PURE__ */ jsx(AppShell, { user });
});
var ErrorBoundary$3 = UNSAFE_withErrorBoundaryProps(function ErrorBoundary() {
	const error = useRouteError();
	const is404 = isRouteErrorResponse(error) && error.status === 404;
	return /* @__PURE__ */ jsx("div", {
		className: "min-h-screen bg-gray-50 flex items-center justify-center px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-5xl font-bold text-green-700",
					children: is404 ? "404" : "Error"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-3 text-gray-600",
					children: is404 ? "Page not found." : "Something went wrong."
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/gardens",
					className: "mt-6 inline-block text-sm font-medium text-green-700 hover:underline",
					children: "← Back to My Gardens"
				})
			]
		})
	});
});
//#endregion
//#region app/routes/_app.settings.tsx
var _app_settings_exports = /* @__PURE__ */ __exportAll({
	action: () => action$10,
	default: () => _app_settings_default,
	loader: () => loader$12,
	meta: () => meta$18
});
function meta$18() {
	return [{ title: "Settings — harvesting.food" }];
}
async function loader$12({ request }) {
	return { user: await getMe(await requireToken(request)) };
}
async function action$10({ request }) {
	const token = await requireToken(request);
	const form = await request.formData();
	const username = String(form.get("username") ?? "").trim() || void 0;
	const first_name = String(form.get("first_name") ?? "").trim() || void 0;
	const last_name = String(form.get("last_name") ?? "").trim() || void 0;
	try {
		await updateMe(token, {
			username,
			first_name,
			last_name
		});
		return {
			success: true,
			error: null
		};
	} catch (err) {
		if (err instanceof ApiClientError) return {
			success: false,
			error: err.message
		};
		return {
			success: false,
			error: "Something went wrong. Please try again."
		};
	}
}
var _app_settings_default = UNSAFE_withComponentProps(function Settings() {
	const { user } = useLoaderData();
	const actionData = useActionData();
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "font-display text-[clamp(1.6rem,2vw+1rem,2.4rem)] leading-none mb-8",
			children: "Settings"
		}), /* @__PURE__ */ jsxs("article", {
			className: "rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
					children: "Profile"
				}),
				actionData?.success && /* @__PURE__ */ jsx("div", {
					className: "mb-5 rounded-2xl border border-green-200/60 bg-green-50 px-4 py-3 text-sm text-green-800",
					children: "Profile updated."
				}),
				/* @__PURE__ */ jsxs(Form, {
					method: "post",
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ jsx(FormError, { message: actionData?.error ?? void 0 }),
						/* @__PURE__ */ jsx(Input, {
							label: "Username",
							name: "username",
							type: "text",
							autoComplete: "username",
							defaultValue: user.username ?? "",
							required: true
						}),
						/* @__PURE__ */ jsx(Input, {
							label: "First name",
							name: "first_name",
							type: "text",
							autoComplete: "given-name",
							defaultValue: user.first_name ?? ""
						}),
						/* @__PURE__ */ jsx(Input, {
							label: "Last name",
							name: "last_name",
							type: "text",
							autoComplete: "family-name",
							defaultValue: user.last_name ?? ""
						}),
						/* @__PURE__ */ jsx("div", {
							className: "pt-2",
							children: /* @__PURE__ */ jsx(Button, {
								type: "submit",
								children: "Save changes"
							})
						})
					]
				})
			]
		})]
	});
});
//#endregion
//#region app/routes/_app.feedback.tsx
var _app_feedback_exports = /* @__PURE__ */ __exportAll({ action: () => action$9 });
async function action$9({ request }) {
	const token = await requireToken(request);
	const form = await request.formData();
	const type = String(form.get("type"));
	const title = String(form.get("title") ?? "").trim();
	const description = String(form.get("description") ?? "").trim();
	try {
		await submitFeedback(token, {
			type,
			title,
			description
		});
		return {
			success: true,
			error: null
		};
	} catch (err) {
		if (err instanceof ApiClientError) return {
			success: false,
			error: err.message
		};
		return {
			success: false,
			error: "Something went wrong. Please try again."
		};
	}
}
//#endregion
//#region app/routes/_app.help.tsx
var _app_help_exports = /* @__PURE__ */ __exportAll({
	default: () => _app_help_default,
	meta: () => meta$17
});
var helpNavItems = [
	{
		to: "/help",
		label: "Getting Started",
		Icon: BookOpen,
		end: true
	},
	{
		to: "/help/gardens",
		label: "Gardens & Members",
		Icon: Sprout
	},
	{
		to: "/help/plants",
		label: "Plants",
		Icon: Leaf
	},
	{
		to: "/help/notes",
		label: "Notes",
		Icon: NotebookText
	},
	{
		to: "/help/harvests",
		label: "Harvests",
		Icon: Wheat
	},
	{
		to: "/help/ai-tips",
		label: "AI Care Tips",
		Icon: Sparkles
	},
	{
		to: "/help/account",
		label: "Account & Settings",
		Icon: UserCog
	}
];
function meta$17() {
	return [{ title: "Help — harvesting.food" }];
}
var _app_help_default = UNSAFE_withComponentProps(function HelpLayout() {
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "font-display text-[clamp(1.6rem,2vw+1rem,2.4rem)] leading-none mb-8",
			children: "Help Center"
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-6 lg:flex-row lg:gap-8",
			children: [/* @__PURE__ */ jsx("nav", {
				className: "flex shrink-0 gap-1 overflow-x-auto lg:w-56 lg:flex-col lg:overflow-visible",
				children: helpNavItems.map(({ to, label, Icon, end }) => /* @__PURE__ */ jsxs(NavLink, {
					to,
					end,
					className: ({ isActive }) => `flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${isActive ? "bg-primary-soft text-primary" : "text-text-muted hover:bg-black/[0.03] hover:text-text-main"}`,
					children: [/* @__PURE__ */ jsx(Icon, { className: "h-4 w-4 shrink-0" }), label]
				}, to))
			}), /* @__PURE__ */ jsx("article", {
				className: "min-w-0 flex-1 rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6",
				children: /* @__PURE__ */ jsx(Outlet, {})
			})]
		})]
	});
});
//#endregion
//#region app/routes/_app.help._index.tsx
var _app_help__index_exports = /* @__PURE__ */ __exportAll({
	default: () => _app_help__index_default,
	meta: () => meta$16
});
function meta$16() {
	return [{ title: "Help — harvesting.food" }];
}
var topics = [
	{
		to: "/help/gardens",
		label: "Gardens & Members",
		description: "Create a garden, invite members, and read the garden dashboard.",
		Icon: Sprout
	},
	{
		to: "/help/plants",
		label: "Plants",
		description: "Add plants to a garden and track their status over time.",
		Icon: Leaf
	},
	{
		to: "/help/notes",
		label: "Notes",
		description: "Log observations, actions, pests, harvests, and milestones.",
		Icon: NotebookText
	},
	{
		to: "/help/harvests",
		label: "Harvests",
		description: "Record what you've picked and watch your harvest trend.",
		Icon: Wheat
	},
	{
		to: "/help/ai-tips",
		label: "AI Care Tips",
		description: "Generate planting, care, and harvesting guidance for a plant.",
		Icon: Sparkles
	},
	{
		to: "/help/account",
		label: "Account & Settings",
		description: "Manage your profile, send feedback, and sign out.",
		Icon: UserCog
	}
];
var _app_help__index_default = UNSAFE_withComponentProps(function HelpIndex() {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h1", {
			className: "font-display text-2xl leading-none mb-3",
			children: "Getting Started"
		}),
		/* @__PURE__ */ jsx("p", {
			className: "mb-6 text-sm leading-7 text-text-muted",
			children: "harvesting.food helps you journal your gardens and plants, and get AI-generated tips personalised to your location. Here's a quick tour of what you can do."
		}),
		/* @__PURE__ */ jsxs("ol", {
			className: "mb-8 list-decimal space-y-2 pl-5 text-sm leading-7 text-text-muted",
			children: [
				/* @__PURE__ */ jsxs("li", { children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/gardens/new",
						className: "font-medium text-primary hover:underline",
						children: "Create a garden"
					}),
					" ",
					"with a name, location, and optional description."
				] }),
				/* @__PURE__ */ jsxs("li", { children: [
					"Add the plants you're growing, then log",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/help/notes",
						className: "font-medium text-primary hover:underline",
						children: "notes"
					}),
					" ",
					"and",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/help/harvests",
						className: "font-medium text-primary hover:underline",
						children: "harvests"
					}),
					" ",
					"as your garden progresses."
				] }),
				/* @__PURE__ */ jsxs("li", { children: [
					"Open a plant and generate",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/help/ai-tips",
						className: "font-medium text-primary hover:underline",
						children: "AI care tips"
					}),
					" ",
					"for planting, care, and harvesting guidance based on your garden's location."
				] }),
				/* @__PURE__ */ jsxs("li", { children: [
					"Invite others to a garden from its",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/help/gardens",
						className: "font-medium text-primary hover:underline",
						children: "Members"
					}),
					" ",
					"page so you can journal together."
				] })
			]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: topics.map(({ to, label, description, Icon }) => /* @__PURE__ */ jsxs(Link, {
				to,
				className: "flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-bg px-4 py-3.5 transition hover:bg-black/[0.03]",
				children: [/* @__PURE__ */ jsx("span", {
					className: "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary",
					children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
				}), /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
					className: "block text-sm font-medium text-text-main",
					children: label
				}), /* @__PURE__ */ jsx("span", {
					className: "block text-xs leading-5 text-text-faint",
					children: description
				})] })]
			}, to))
		})
	] });
});
//#endregion
//#region app/components/help/HelpArticle.tsx
function HelpArticle({ title, intro, children }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("h1", {
			className: "font-display text-2xl leading-none mb-3",
			children: title
		}),
		intro && /* @__PURE__ */ jsx("p", {
			className: "mb-6 text-sm leading-7 text-text-muted",
			children: intro
		}),
		/* @__PURE__ */ jsx("div", {
			className: "\n          [&_h2]:font-display [&_h2]:text-lg [&_h2]:leading-none [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:first:mt-0\n          [&_p]:text-sm [&_p]:leading-7 [&_p]:text-text-muted [&_p]:mb-4\n          [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:text-sm [&_ul]:leading-7 [&_ul]:text-text-muted\n          [&_strong]:font-medium [&_strong]:text-text-main\n          [&_code]:rounded-md [&_code]:bg-black/[0.05] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px]\n        ",
			children
		})
	] });
}
//#endregion
//#region app/routes/_app.help.gardens.tsx
var _app_help_gardens_exports = /* @__PURE__ */ __exportAll({
	default: () => _app_help_gardens_default,
	meta: () => meta$15
});
function meta$15() {
	return [{ title: "Gardens & Members — Help — harvesting.food" }];
}
var _app_help_gardens_default = UNSAFE_withComponentProps(function HelpGardens() {
	return /* @__PURE__ */ jsxs(HelpArticle, {
		title: "Gardens & Members",
		intro: "A garden is the top-level space for a growing area — a backyard plot, a raised bed, an allotment. Everything else (plants, notes, harvests) lives inside a garden.",
		children: [
			/* @__PURE__ */ jsx("h2", { children: "Creating a garden" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"From ",
				/* @__PURE__ */ jsx("strong", { children: "My Gardens" }),
				", click ",
				/* @__PURE__ */ jsx("strong", { children: "+ New garden" }),
				" and fill in a name, location, and an optional description. The location is used to personalise",
				" ",
				"AI care tips for the plants you add later."
			] }),
			/* @__PURE__ */ jsx("h2", { children: "The garden dashboard" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Opening a garden shows a dashboard with two summary cards — ",
				/* @__PURE__ */ jsx("strong", { children: "Garden Age" }),
				" ",
				"(time since the garden was created) and ",
				/* @__PURE__ */ jsx("strong", { children: "Total Plants" }),
				" — followed by a",
				" ",
				/* @__PURE__ */ jsx("strong", { children: "Plants by Type" }),
				" breakdown. Click a type to filter the plant list down to just that type; click it again to clear the filter."
			] }),
			/* @__PURE__ */ jsxs("p", { children: [
				"The dashboard also includes a ",
				/* @__PURE__ */ jsx("strong", { children: "Garden Notes" }),
				" timeline for whole-garden journal entries that aren't tied to a single plant — see",
				" ",
				/* @__PURE__ */ jsx("strong", { children: "Notes" }),
				" for details."
			] }),
			/* @__PURE__ */ jsx("h2", { children: "Editing a garden" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Use the ",
				/* @__PURE__ */ jsx("strong", { children: "Edit" }),
				" action on the garden page to update its name, location, or description at any time."
			] }),
			/* @__PURE__ */ jsx("h2", { children: "Members & invitations" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Open a garden's ",
				/* @__PURE__ */ jsx("strong", { children: "Members" }),
				" page to see everyone with access and their role. Enter an email address and send an invite to give someone else access to the garden. Invited members receive a link that lets them accept once they're signed in. You can remove a member from the same page at any time."
			] })
		]
	});
});
//#endregion
//#region app/routes/_app.help.plants.tsx
var _app_help_plants_exports = /* @__PURE__ */ __exportAll({
	default: () => _app_help_plants_default,
	meta: () => meta$14
});
function meta$14() {
	return [{ title: "Plants — Help — harvesting.food" }];
}
var _app_help_plants_default = UNSAFE_withComponentProps(function HelpPlants() {
	return /* @__PURE__ */ jsxs(HelpArticle, {
		title: "Plants",
		intro: "Plants are what you're actually growing inside a garden — each one gets its own page for notes, harvests, and AI care tips.",
		children: [
			/* @__PURE__ */ jsx("h2", { children: "Adding a plant" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"From a garden page, click ",
				/* @__PURE__ */ jsx("strong", { children: "+ Add plant" }),
				" and choose a plant type (herb, vegetable, fruit, flower, shrub, tree, or vine), then enter the species. You can optionally add a variety, a plot or bed location, and the date it was planted."
			] }),
			/* @__PURE__ */ jsx("h2", { children: "The plant page" }),
			/* @__PURE__ */ jsx("p", { children: "Each plant has its own page showing a status badge, a season progress ring based on how long it's been in the ground, and a growth duration summary. If a planted date is set, a season progress card tracks how far along the plant is relative to a typical year." }),
			/* @__PURE__ */ jsxs("p", { children: [
				"From the plant page you can also log ",
				/* @__PURE__ */ jsx("strong", { children: "notes" }),
				" and",
				" ",
				/* @__PURE__ */ jsx("strong", { children: "harvests" }),
				", and generate ",
				/* @__PURE__ */ jsx("strong", { children: "AI care tips" }),
				"."
			] }),
			/* @__PURE__ */ jsx("h2", { children: "Editing or removing a plant" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Use the ",
				/* @__PURE__ */ jsx("strong", { children: "Edit" }),
				" action on a plant to update its variety, plot, planted date, or harvest unit. Deleting a plant also removes its notes, harvests, and care tips, so it's worth double-checking before you confirm."
			] })
		]
	});
});
//#endregion
//#region app/routes/_app.help.notes.tsx
var _app_help_notes_exports = /* @__PURE__ */ __exportAll({
	default: () => _app_help_notes_default,
	meta: () => meta$13
});
function meta$13() {
	return [{ title: "Notes — Help — harvesting.food" }];
}
var _app_help_notes_default = UNSAFE_withComponentProps(function HelpNotes() {
	return /* @__PURE__ */ jsxs(HelpArticle, {
		title: "Notes",
		intro: "Notes are journal entries with a type, an optional message, and a date. They show up as a timeline, newest first.",
		children: [
			/* @__PURE__ */ jsx("h2", { children: "Garden notes vs. plant notes" }),
			/* @__PURE__ */ jsxs("p", { children: [
				/* @__PURE__ */ jsx("strong", { children: "Garden notes" }),
				" live on the garden dashboard and are for observations about the garden as a whole. ",
				/* @__PURE__ */ jsx("strong", { children: "Plant notes" }),
				" live on an individual plant's page and are for anything specific to that plant. Both work the same way — pick whichever fits what you're logging."
			] }),
			/* @__PURE__ */ jsx("h2", { children: "Note types" }),
			/* @__PURE__ */ jsxs("ul", { children: [
				/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Note" }), " — a general observation."] }),
				/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Action" }), " — something you did, like watering or pruning."] }),
				/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Pest" }), " — pest or disease sightings and treatment."] }),
				/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Harvest" }), " — a harvest-related callout (separate from logging an actual harvest amount)."] }),
				/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Milestone" }), " — a notable stage, like first bloom or transplanting."] })
			] }),
			/* @__PURE__ */ jsx("h2", { children: "Adding, editing, and deleting" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Click ",
				/* @__PURE__ */ jsx("strong", { children: "+ Add a note" }),
				", choose a type, and write your message. Click any existing note in the timeline to view it, then use ",
				/* @__PURE__ */ jsx("strong", { children: "Edit" }),
				" to change its type, message, or date, or ",
				/* @__PURE__ */ jsx("strong", { children: "Delete" }),
				" to remove it permanently."
			] }),
			/* @__PURE__ */ jsxs("p", { children: [
				"For garden notes, you can also edit the ",
				/* @__PURE__ */ jsx("strong", { children: "date" }),
				", which changes where the note sits in the timeline — useful if you're logging something after the fact and want it to appear on the day it actually happened."
			] })
		]
	});
});
//#endregion
//#region app/routes/_app.help.harvests.tsx
var _app_help_harvests_exports = /* @__PURE__ */ __exportAll({
	default: () => _app_help_harvests_default,
	meta: () => meta$12
});
function meta$12() {
	return [{ title: "Harvests — Help — harvesting.food" }];
}
var _app_help_harvests_default = UNSAFE_withComponentProps(function HelpHarvests() {
	return /* @__PURE__ */ jsxs(HelpArticle, {
		title: "Harvests",
		intro: "Harvests track how much you've picked from a plant over time, in whatever unit makes sense for it.",
		children: [
			/* @__PURE__ */ jsx("h2", { children: "Logging a harvest" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"On a plant page, click ",
				/* @__PURE__ */ jsx("strong", { children: "+ Log harvest" }),
				", enter an amount, and choose a unit — items, g, kg, oz, lbs, bunches, bags, or jars. You can log as many harvests as you like over a plant's lifetime."
			] }),
			/* @__PURE__ */ jsx("h2", { children: "Harvest trend" }),
			/* @__PURE__ */ jsx("p", { children: "Once a plant has two or more harvests logged, a bar chart appears showing the amount harvested over time, so you can see how a plant's yield changes across the season." }),
			/* @__PURE__ */ jsx("h2", { children: "Editing or removing a harvest" }),
			/* @__PURE__ */ jsx("p", { children: "Open a logged harvest to correct its amount, or delete it if it was logged in error." })
		]
	});
});
//#endregion
//#region app/routes/_app.help.ai-tips.tsx
var _app_help_ai_tips_exports = /* @__PURE__ */ __exportAll({
	default: () => _app_help_ai_tips_default,
	meta: () => meta$11
});
function meta$11() {
	return [{ title: "AI Care Tips — Help — harvesting.food" }];
}
var _app_help_ai_tips_default = UNSAFE_withComponentProps(function HelpAiTips() {
	return /* @__PURE__ */ jsxs(HelpArticle, {
		title: "AI Care Tips",
		intro: "Generate planting, care, and harvesting guidance for a plant, personalised to your garden's location.",
		children: [
			/* @__PURE__ */ jsx("h2", { children: "Generating tips" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"On a plant page, click ",
				/* @__PURE__ */ jsx("strong", { children: "Generate care info" }),
				". This sends the plant's species and your garden's location to produce guidance tailored to your climate."
			] }),
			/* @__PURE__ */ jsx("h2", { children: "What you get" }),
			/* @__PURE__ */ jsxs("ul", { children: [
				/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Summary" }), " — a quick overview of the plant."] }),
				/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Planting" }), " — how and when to plant it."] }),
				/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Care" }), " — watering, sunlight, and general upkeep."] }),
				/* @__PURE__ */ jsxs("li", { children: [/* @__PURE__ */ jsx("strong", { children: "Harvesting" }), " — when and how to harvest."] })
			] }),
			/* @__PURE__ */ jsx("p", { children: "Each section appears as its own tab once generated." }),
			/* @__PURE__ */ jsx("h2", { children: "Regenerating" }),
			/* @__PURE__ */ jsx("p", { children: "You can generate care info again at any time — for example after updating a plant's details — and it will replace the previous guidance." })
		]
	});
});
//#endregion
//#region app/routes/_app.help.account.tsx
var _app_help_account_exports = /* @__PURE__ */ __exportAll({
	default: () => _app_help_account_default,
	meta: () => meta$10
});
function meta$10() {
	return [{ title: "Account & Settings — Help — harvesting.food" }];
}
var _app_help_account_default = UNSAFE_withComponentProps(function HelpAccount() {
	return /* @__PURE__ */ jsxs(HelpArticle, {
		title: "Account & Settings",
		children: [
			/* @__PURE__ */ jsx("h2", { children: "Profile" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Open ",
				/* @__PURE__ */ jsx("strong", { children: "Settings" }),
				" from the account menu to update your username, first name, or last name."
			] }),
			/* @__PURE__ */ jsx("h2", { children: "Invitations" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Registration is invite-only. If someone invites you to a garden, you'll receive a link — sign in (or create an account) and click ",
				/* @__PURE__ */ jsx("strong", { children: "Accept" }),
				" to get access to that garden."
			] }),
			/* @__PURE__ */ jsx("h2", { children: "Feedback" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Use the ",
				/* @__PURE__ */ jsx("strong", { children: "Feedback" }),
				" link in the navigation bar to report a bug or suggest an enhancement at any time."
			] }),
			/* @__PURE__ */ jsx("h2", { children: "Signing out" }),
			/* @__PURE__ */ jsxs("p", { children: [
				"Click ",
				/* @__PURE__ */ jsx("strong", { children: "Sign out" }),
				" in the navigation bar to end your session."
			] })
		]
	});
});
//#endregion
//#region app/routes/_app.admin.tsx
var _app_admin_exports = /* @__PURE__ */ __exportAll({
	default: () => _app_admin_default,
	loader: () => loader$11
});
async function loader$11({ request }) {
	if ((await getMe(await requireToken(request))).role !== "admin") throw redirect("/gardens");
	return null;
}
var adminNavItems = [
	{
		to: "/admin/users",
		label: "Users"
	},
	{
		to: "/admin/gardens",
		label: "Gardens"
	},
	{
		to: "/admin/invitations",
		label: "Invitations"
	}
];
var _app_admin_default = UNSAFE_withComponentProps(function AdminLayout() {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
		className: "border-b border-orange/20 bg-orange-soft",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-6 py-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-xs font-semibold uppercase tracking-widest text-orange",
					children: "Admin"
				}), /* @__PURE__ */ jsx("nav", {
					className: "flex items-center gap-1",
					children: adminNavItems.map(({ to, label }) => /* @__PURE__ */ jsx(NavLink, {
						to,
						className: ({ isActive }) => `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${isActive ? "bg-orange/15 text-orange" : "text-text-muted hover:text-orange"}`,
						children: label
					}, to))
				})]
			})
		})
	}), /* @__PURE__ */ jsx(Outlet, {})] });
});
//#endregion
//#region app/routes/_app.admin._index.tsx
var _app_admin__index_exports = /* @__PURE__ */ __exportAll({ loader: () => loader$10 });
function loader$10() {
	throw redirect("/admin/users");
}
//#endregion
//#region app/routes/_app.admin.users.tsx
var _app_admin_users_exports = /* @__PURE__ */ __exportAll({
	action: () => action$8,
	default: () => _app_admin_users_default,
	loader: () => loader$9,
	meta: () => meta$9
});
function meta$9() {
	return [{ title: "Users — harvesting.food Admin" }];
}
async function loader$9({ request }) {
	const token = await requireToken(request);
	const currentUser = await getMe(token);
	return {
		users: await listAdminUsers(token),
		currentUserId: currentUser.id
	};
}
async function action$8({ request }) {
	const token = await requireToken(request);
	const form = await request.formData();
	const intent = String(form.get("intent") ?? "");
	const userId = String(form.get("userId") ?? "");
	try {
		if (intent === "approve") await approveUsers(token, userId);
		else if (intent === "suspend") {
			const currentUser = await getMe(token);
			if (userId === String(currentUser.id)) return { error: "You cannot suspend your own account." };
			await suspendUsers(token, userId);
		} else if (intent === "set-role") await setUserRole(token, userId, String(form.get("role") ?? ""));
		else return { error: "Unknown action." };
		return { error: null };
	} catch (err) {
		if (err instanceof ApiClientError) return { error: err.message };
		return { error: "Something went wrong. Please try again." };
	}
}
var STATUS_LABELS = {
	pending: "Pending",
	active: "Active",
	suspended: "Suspended"
};
var STATUS_CLASSES$1 = {
	pending: "bg-yellow-100 text-yellow-800",
	active: "bg-green-100 text-green-800",
	suspended: "bg-red-100 text-red-800"
};
var ROLE_CLASSES$1 = {
	user: "bg-gray-100 text-gray-700",
	admin: "bg-blue-100 text-blue-800"
};
var _app_admin_users_default = UNSAFE_withComponentProps(function AdminUsers() {
	const { users, currentUserId } = useLoaderData();
	const actionData = useActionData();
	return /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("h1", {
						className: "text-2xl font-bold text-gray-900",
						children: "User Administration"
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-sm text-gray-500",
						children: [
							users.length,
							" user",
							users.length !== 1 ? "s" : ""
						]
					})]
				}),
				actionData?.error && /* @__PURE__ */ jsx("div", {
					className: "rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700",
					children: actionData.error
				}),
				/* @__PURE__ */ jsx("div", {
					className: "overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm",
					children: /* @__PURE__ */ jsxs("table", {
						className: "min-w-full divide-y divide-gray-200",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-gray-50",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
									children: "User"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
									children: "Status"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
									children: "Role"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
									children: "Joined"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500",
									children: "Actions"
								})
							] })
						}), /* @__PURE__ */ jsxs("tbody", {
							className: "divide-y divide-gray-200",
							children: [users.map((user) => {
								const displayName = user.first_name ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}` : null;
								return /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-gray-50",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex flex-col",
												children: [displayName && /* @__PURE__ */ jsx("span", {
													className: "text-sm font-medium text-gray-900",
													children: displayName
												}), /* @__PURE__ */ jsx("span", {
													className: `text-sm ${displayName ? "text-gray-500" : "font-medium text-gray-900"}`,
													children: user.email
												})]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ jsx("span", {
												className: `inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASSES$1[user.status]}`,
												children: STATUS_LABELS[user.status]
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ jsx("span", {
												className: `inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_CLASSES$1[user.role]}`,
												children: user.role
											})
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-sm text-gray-500",
											children: new Date(user.created_at).toLocaleDateString()
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-end gap-2",
												children: [
													user.status === "pending" && /* @__PURE__ */ jsxs("form", {
														method: "post",
														children: [
															/* @__PURE__ */ jsx("input", {
																type: "hidden",
																name: "intent",
																value: "approve"
															}),
															/* @__PURE__ */ jsx("input", {
																type: "hidden",
																name: "userId",
																value: user.id
															}),
															/* @__PURE__ */ jsx(Button, {
																type: "submit",
																variant: "primary",
																className: "py-1 px-3 text-xs",
																children: "Approve"
															})
														]
													}),
													user.status === "active" && user.id !== currentUserId && /* @__PURE__ */ jsxs("form", {
														method: "post",
														children: [
															/* @__PURE__ */ jsx("input", {
																type: "hidden",
																name: "intent",
																value: "suspend"
															}),
															/* @__PURE__ */ jsx("input", {
																type: "hidden",
																name: "userId",
																value: user.id
															}),
															/* @__PURE__ */ jsx(Button, {
																type: "submit",
																variant: "danger",
																className: "py-1 px-3 text-xs",
																children: "Suspend"
															})
														]
													}),
													user.status === "suspended" && /* @__PURE__ */ jsxs("form", {
														method: "post",
														children: [
															/* @__PURE__ */ jsx("input", {
																type: "hidden",
																name: "intent",
																value: "approve"
															}),
															/* @__PURE__ */ jsx("input", {
																type: "hidden",
																name: "userId",
																value: user.id
															}),
															/* @__PURE__ */ jsx(Button, {
																type: "submit",
																variant: "secondary",
																className: "py-1 px-3 text-xs",
																children: "Reinstate"
															})
														]
													}),
													/* @__PURE__ */ jsxs("form", {
														method: "post",
														className: "flex items-center gap-1",
														children: [
															/* @__PURE__ */ jsx("input", {
																type: "hidden",
																name: "intent",
																value: "set-role"
															}),
															/* @__PURE__ */ jsx("input", {
																type: "hidden",
																name: "userId",
																value: user.id
															}),
															/* @__PURE__ */ jsxs("select", {
																name: "role",
																defaultValue: user.role,
																className: "rounded border border-gray-300 py-1 pl-2 pr-6 text-xs text-gray-700 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600",
																children: [/* @__PURE__ */ jsx("option", {
																	value: "user",
																	children: "user"
																}), /* @__PURE__ */ jsx("option", {
																	value: "admin",
																	children: "admin"
																})]
															}),
															/* @__PURE__ */ jsx(Button, {
																type: "submit",
																variant: "secondary",
																className: "py-1 px-2 text-xs",
																children: "Set"
															})
														]
													})
												]
											})
										})
									]
								}, user.id);
							}), users.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
								colSpan: 5,
								className: "px-6 py-12 text-center text-sm text-gray-500",
								children: "No users found."
							}) })]
						})]
					})
				})
			]
		})
	});
});
//#endregion
//#region app/routes/_app.admin.gardens.tsx
var _app_admin_gardens_exports = /* @__PURE__ */ __exportAll({
	default: () => _app_admin_gardens_default,
	loader: () => loader$8,
	meta: () => meta$8
});
function meta$8() {
	return [{ title: "Gardens — harvesting.food Admin" }];
}
async function loader$8({ request }) {
	return { gardens: await listAdminGardens(await requireToken(request)) };
}
var _app_admin_gardens_default = UNSAFE_withComponentProps(function AdminGardens() {
	const { gardens } = useLoaderData();
	return /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold text-gray-900",
					children: "Garden Administration"
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-sm text-gray-500",
					children: [
						gardens.length,
						" garden",
						gardens.length !== 1 ? "s" : ""
					]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm",
				children: /* @__PURE__ */ jsxs("table", {
					className: "min-w-full divide-y divide-gray-200",
					children: [/* @__PURE__ */ jsx("thead", {
						className: "bg-gray-50",
						children: /* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsx("th", {
								className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
								children: "Name"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
								children: "Location"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
								children: "Owner ID"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
								children: "Created"
							})
						] })
					}), /* @__PURE__ */ jsxs("tbody", {
						className: "divide-y divide-gray-200",
						children: [gardens.map((garden) => /* @__PURE__ */ jsxs("tr", {
							className: "hover:bg-gray-50",
							children: [
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4",
									children: /* @__PURE__ */ jsx(Link, {
										to: `/gardens/${garden.slug}`,
										className: "text-sm font-medium text-green-700 hover:underline",
										children: garden.name
									})
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 text-sm text-gray-500",
									children: garden.location
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 text-sm text-gray-500 font-mono",
									children: garden.user_id
								}),
								/* @__PURE__ */ jsx("td", {
									className: "px-6 py-4 text-sm text-gray-500",
									children: new Date(garden.created_at).toLocaleDateString()
								})
							]
						}, garden.id)), gardens.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
							colSpan: 4,
							className: "px-6 py-12 text-center text-sm text-gray-500",
							children: "No gardens found."
						}) })]
					})]
				})
			})]
		})
	});
});
//#endregion
//#region app/routes/_app.admin.invitations.tsx
var _app_admin_invitations_exports = /* @__PURE__ */ __exportAll({
	action: () => action$7,
	default: () => _app_admin_invitations_default,
	loader: () => loader$7,
	meta: () => meta$7
});
function meta$7() {
	return [{ title: "Invitations — harvesting.food Admin" }];
}
async function loader$7({ request }) {
	return { invitations: await listAdminInvitations(await requireToken(request)) };
}
async function action$7({ request }) {
	const token = await requireToken(request);
	const form = await request.formData();
	const email = String(form.get("email") ?? "").trim();
	if (!email) return {
		error: "Email address is required.",
		success: null
	};
	try {
		await sendAdminInvitation(token, { email });
		return {
			error: null,
			success: `Invitation sent to ${email}.`
		};
	} catch (err) {
		if (err instanceof ApiClientError) return {
			error: err.message,
			success: null
		};
		return {
			error: "Something went wrong. Please try again.",
			success: null
		};
	}
}
function invitationStatus(inv) {
	if (inv.accepted_at) return "accepted";
	if (new Date(inv.expires_at) < /* @__PURE__ */ new Date()) return "expired";
	return "pending";
}
var STATUS_LABEL = {
	accepted: "Accepted",
	expired: "Expired",
	pending: "Pending"
};
var STATUS_CLASSES = {
	accepted: "bg-green-100 text-green-800",
	expired: "bg-gray-100 text-gray-600",
	pending: "bg-yellow-100 text-yellow-800"
};
var _app_admin_invitations_default = UNSAFE_withComponentProps(function AdminInvitations() {
	const { invitations } = useLoaderData();
	const actionData = useActionData();
	const isSubmitting = useNavigation().state === "submitting";
	return /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-8",
			children: [
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold text-gray-900",
					children: "Invitations"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-gray-500",
					children: "Send an invitation email to allow a new user to register. Tokens expire after 7 days and are single-use."
				})] }),
				/* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-orange/20 bg-orange-soft/40 p-6",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "mb-4 text-sm font-semibold uppercase tracking-wide text-orange",
							children: "Send Invitation"
						}),
						/* @__PURE__ */ jsxs("form", {
							method: "post",
							className: "flex flex-col gap-4 sm:flex-row sm:items-end",
							children: [/* @__PURE__ */ jsx("div", {
								className: "flex-1",
								children: /* @__PURE__ */ jsx(Input, {
									label: "Email address",
									name: "email",
									type: "email",
									autoComplete: "off",
									required: true,
									placeholder: "newuser@example.com"
								})
							}), /* @__PURE__ */ jsx(Button, {
								type: "submit",
								isLoading: isSubmitting,
								className: "shrink-0",
								children: "Send invitation"
							})]
						}),
						actionData?.error && /* @__PURE__ */ jsx("div", {
							className: "mt-3",
							children: /* @__PURE__ */ jsx(FormError, { message: actionData.error })
						}),
						actionData?.success && /* @__PURE__ */ jsx("p", {
							className: "mt-3 text-sm text-green-700",
							children: actionData.success
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "text-sm font-semibold uppercase tracking-wide text-gray-500",
						children: "Sent Invitations"
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-sm text-gray-500",
						children: [
							invitations.length,
							" invitation",
							invitations.length !== 1 ? "s" : ""
						]
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm",
					children: /* @__PURE__ */ jsxs("table", {
						className: "min-w-full divide-y divide-gray-200",
						children: [/* @__PURE__ */ jsx("thead", {
							className: "bg-gray-50",
							children: /* @__PURE__ */ jsxs("tr", { children: [
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
									children: "Email"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
									children: "Expires"
								}),
								/* @__PURE__ */ jsx("th", {
									className: "px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
									children: "Status"
								})
							] })
						}), /* @__PURE__ */ jsxs("tbody", {
							className: "divide-y divide-gray-200",
							children: [invitations.map((inv) => {
								const status = invitationStatus(inv);
								return /* @__PURE__ */ jsxs("tr", {
									className: "hover:bg-gray-50",
									children: [
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-sm text-gray-900",
											children: inv.invited_email
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4 text-sm text-gray-500",
											children: new Date(inv.expires_at).toLocaleDateString()
										}),
										/* @__PURE__ */ jsx("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ jsx("span", {
												className: `inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLASSES[status]}`,
												children: STATUS_LABEL[status]
											})
										})
									]
								}, inv.id);
							}), invitations.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
								colSpan: 3,
								className: "px-6 py-12 text-center text-sm text-gray-500",
								children: "No invitations sent yet."
							}) })]
						})]
					})
				})] })
			]
		})
	});
});
//#endregion
//#region app/routes/_app.invitations.$token.tsx
var _app_invitations_$token_exports = /* @__PURE__ */ __exportAll({
	action: () => action$6,
	default: () => _app_invitations_$token_default,
	meta: () => meta$6
});
function meta$6() {
	return [{ title: "Accept Invitation — harvesting.food" }];
}
async function action$6({ request, params }) {
	const token = await requireToken(request);
	try {
		await acceptInvitation(token, params.token);
		return redirect("/gardens");
	} catch (err) {
		if (err instanceof ApiClientError) return { error: err.message };
		return { error: "Failed to accept invitation. The link may have expired." };
	}
}
var _app_invitations_$token_default = UNSAFE_withComponentProps(function AcceptInvitation() {
	const actionData = useActionData();
	return /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-md px-4 py-24 sm:px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "rounded-3xl border border-black/10 bg-surface p-8 shadow-soft text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "font-display text-3xl leading-none mb-3",
					children: "Garden invitation"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-text-muted mb-8",
					children: "You've been invited to join a garden. Accept below to get access."
				}),
				actionData?.error && /* @__PURE__ */ jsx("div", {
					className: "mb-6 rounded-2xl border border-red-200/60 bg-red-50 px-4 py-3 text-sm text-orange",
					children: actionData.error
				}),
				/* @__PURE__ */ jsx(Form, {
					method: "post",
					children: /* @__PURE__ */ jsx("button", {
						type: "submit",
						className: "inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:bg-primary-strong",
						children: "Accept invitation"
					})
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/gardens",
					className: "mt-4 inline-block text-sm text-text-faint transition hover:text-text-muted",
					children: "Go to my gardens"
				})
			]
		})
	});
});
//#endregion
//#region app/components/gardens/GardenCard.tsx
function GardenCard({ garden }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative rounded-lg border border-gray-200 bg-white p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-start justify-between gap-2",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Link, {
				to: `/gardens/${garden.slug}`,
				className: "text-lg font-semibold text-gray-900 hover:text-green-700 transition-colors after:absolute after:inset-0",
				children: garden.name
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-gray-500 mt-0.5",
				children: garden.location
			})] }), /* @__PURE__ */ jsx(Link, {
				to: `/gardens/${garden.slug}/edit`,
				className: "relative z-10 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors shrink-0",
				children: "Edit"
			})]
		}), garden.description && /* @__PURE__ */ jsx("p", {
			className: "text-sm text-gray-600 line-clamp-2",
			children: garden.description
		})]
	});
}
//#endregion
//#region app/routes/_app.gardens.tsx
var _app_gardens_exports = /* @__PURE__ */ __exportAll({
	default: () => _app_gardens_default,
	loader: () => loader$6,
	meta: () => meta$5
});
function meta$5() {
	return [{ title: "My Gardens — harvesting.food" }];
}
async function loader$6({ request }) {
	return { gardens: await listGardens(await requireToken(request)) };
}
var _app_gardens_default = UNSAFE_withComponentProps(function Gardens() {
	const { gardens } = useLoaderData();
	return /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-6",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold text-gray-900",
					children: "My Gardens"
				}), /* @__PURE__ */ jsx(Link, {
					to: "/gardens/new",
					className: "inline-flex items-center gap-1 rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 transition-colors",
					children: "+ New garden"
				})]
			}), gardens.length === 0 ? /* @__PURE__ */ jsxs("div", {
				className: "rounded-lg border border-dashed border-gray-300 bg-white px-6 py-16 text-center",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-gray-500 text-sm",
					children: "You don't have any gardens yet."
				}), /* @__PURE__ */ jsx(Link, {
					to: "/gardens/new",
					className: "mt-3 inline-block text-sm font-medium text-green-700 hover:underline",
					children: "Create your first garden →"
				})]
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: gardens.map((garden) => /* @__PURE__ */ jsx(GardenCard, { garden }, garden.id))
			})]
		})
	});
});
//#endregion
//#region app/components/gardens/GardenForm.tsx
function GardenForm({ defaultValues, error, submitLabel }) {
	const isSubmitting = useNavigation().state === "submitting";
	const [showLocationInfo, setShowLocationInfo] = useState(false);
	return /* @__PURE__ */ jsxs(Form, {
		method: "post",
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ jsx(FormError, { message: error }),
			/* @__PURE__ */ jsx(Input, {
				label: "Garden name",
				name: "name",
				type: "text",
				defaultValue: defaultValues?.name,
				required: true
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ jsx("label", {
							htmlFor: "location",
							className: "text-sm font-medium text-gray-700",
							children: "Location"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-expanded": showLocationInfo,
							"aria-controls": "location-info",
							onClick: () => setShowLocationInfo((v) => !v),
							className: "flex items-center justify-center w-4 h-4 rounded-full bg-green-700 text-white text-xs font-bold leading-none focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-1",
							children: "i"
						})]
					}),
					showLocationInfo && /* @__PURE__ */ jsxs("div", {
						id: "location-info",
						role: "note",
						className: "rounded-md border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-900",
						children: [/* @__PURE__ */ jsx("p", {
							className: "font-semibold mb-0.5",
							children: "Why do we want location data?"
						}), /* @__PURE__ */ jsx("p", { children: "The location data is used for the AI care instructions that can be generated for each plant. You can be as specific or generic as you like. We will never share this information with anyone!!" })]
					}),
					/* @__PURE__ */ jsx("input", {
						id: "location",
						name: "location",
						type: "text",
						defaultValue: defaultValues?.location,
						placeholder: "e.g. 123 Main St, Anytown, USA",
						required: true,
						className: "rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-1"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ jsx("label", {
					htmlFor: "description",
					className: "text-sm font-medium text-gray-700",
					children: "Description"
				}), /* @__PURE__ */ jsx("textarea", {
					id: "description",
					name: "description",
					rows: 3,
					defaultValue: defaultValues?.description ?? "",
					className: "rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-1"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-3 justify-end",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "button",
					variant: "secondary",
					onClick: () => history.back(),
					children: "Cancel"
				}), /* @__PURE__ */ jsx(Button, {
					type: "submit",
					isLoading: isSubmitting,
					children: submitLabel
				})]
			})
		]
	});
}
//#endregion
//#region app/routes/_app.gardens.new.tsx
var _app_gardens_new_exports = /* @__PURE__ */ __exportAll({
	action: () => action$5,
	default: () => _app_gardens_new_default,
	loader: () => loader$5,
	meta: () => meta$4
});
function meta$4() {
	return [{ title: "New Garden — harvesting.food" }];
}
async function loader$5({ request }) {
	await requireToken(request);
	return null;
}
async function action$5({ request }) {
	const token = await requireToken(request);
	const form = await request.formData();
	const name = String(form.get("name") ?? "");
	const location = String(form.get("location") ?? "");
	const description = String(form.get("description") ?? "") || void 0;
	if (!name || !location) return { error: "Name and location are required." };
	try {
		return redirect(`/gardens/${(await createGarden(token, {
			name,
			location,
			description
		})).slug}`);
	} catch (err) {
		if (err instanceof ApiClientError) return { error: err.message };
		return { error: "Something went wrong. Please try again." };
	}
}
var _app_gardens_new_default = UNSAFE_withComponentProps(function NewGarden() {
	const actionData = useActionData();
	return /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-lg",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "text-2xl font-bold text-gray-900 mb-6",
				children: "New Garden"
			}), /* @__PURE__ */ jsx(GardenForm, {
				error: actionData?.error,
				submitLabel: "Create garden"
			})]
		})
	});
});
//#endregion
//#region app/routes/_app.gardens.$gardenSlug.tsx
var _app_gardens_$gardenSlug_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary$2,
	action: () => action$4,
	default: () => _app_gardens_$gardenSlug_default,
	loader: () => loader$4,
	meta: () => meta$3
});
function meta$3({ data }) {
	return [{ title: `${data?.garden.name ?? "Garden"} — harvesting.food` }];
}
async function action$4({ request, params }) {
	const token = await requireToken(request);
	if ((await request.formData()).get("intent") === "delete") {
		await deleteGarden(token, params.gardenSlug);
		return redirect("/gardens");
	}
	return null;
}
async function loader$4({ request, params }) {
	const token = await requireToken(request);
	const [garden, plants, members, me] = await Promise.all([
		getGarden(token, params.gardenSlug),
		listPlants(token, params.gardenSlug),
		listMembers(token, params.gardenSlug),
		getMe(token)
	]);
	return {
		garden,
		plants,
		isOwner: members.some((m) => m.user_id === me.id && m.role === "owner")
	};
}
var _app_gardens_$gardenSlug_default = UNSAFE_withComponentProps(function GardenLayout() {
	const { garden, plants, isOwner } = useLoaderData();
	return /* @__PURE__ */ jsx(Outlet, { context: {
		garden,
		plants,
		isOwner
	} });
});
var ErrorBoundary$2 = UNSAFE_withErrorBoundaryProps(function ErrorBoundary() {
	const error = useRouteError();
	const is404 = isRouteErrorResponse(error) && error.status === 404;
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "text-4xl font-bold text-primary",
				children: is404 ? "404" : "Error"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-3 text-text-muted",
				children: is404 ? "Garden not found." : "Failed to load garden."
			}),
			/* @__PURE__ */ jsx(Link, {
				to: "/gardens",
				className: "mt-6 inline-block text-sm font-medium text-primary hover:underline",
				children: "← Back to My Gardens"
			})
		]
	});
});
//#endregion
//#region app/components/plants/PlantModal.tsx
var PLANT_TYPES = [
	{
		value: "herb",
		label: "Herb"
	},
	{
		value: "vegetable",
		label: "Vegetable"
	},
	{
		value: "fruit",
		label: "Fruit"
	},
	{
		value: "flower",
		label: "Flower"
	},
	{
		value: "shrub",
		label: "Shrub"
	},
	{
		value: "tree",
		label: "Tree"
	},
	{
		value: "vine",
		label: "Vine"
	}
];
function PlantModal({ state, onClose, onCreated }) {
	const fetcher = useFetcher();
	const dialogRef = useRef(null);
	const didSubmitRef = useRef(false);
	useEffect(() => {
		if (state) dialogRef.current?.showModal();
		else dialogRef.current?.close();
	}, [state]);
	useEffect(() => {
		if (fetcher.state === "submitting") didSubmitRef.current = true;
	}, [fetcher.state]);
	useEffect(() => {
		if (didSubmitRef.current && fetcher.state === "idle" && fetcher.data != null && !("error" in fetcher.data)) {
			didSubmitRef.current = false;
			if (state?.mode === "create" && fetcher.data && "plantId" in fetcher.data) onCreated?.(fetcher.data.plantId);
			onClose();
		}
	}, [
		fetcher.state,
		fetcher.data,
		onClose,
		onCreated,
		state?.mode
	]);
	const plant = state?.mode === "edit" ? state.plant : null;
	return /* @__PURE__ */ jsx("dialog", {
		ref: dialogRef,
		className: "m-auto w-full max-w-md rounded-3xl border border-black/10 bg-surface p-6 shadow-lg backdrop:bg-black/40 open:flex open:flex-col",
		onClose,
		onClick: (e) => {
			if (e.target === dialogRef.current) onClose();
		},
		children: state && /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-sm font-semibold text-text-main",
					children: state.mode === "create" ? "Add Plant" : "Edit Plant"
				}), /* @__PURE__ */ jsx("button", {
					onClick: onClose,
					className: "text-xl leading-none text-text-faint transition hover:text-text-main",
					"aria-label": "Close",
					children: "×"
				})]
			}),
			/* @__PURE__ */ jsxs(fetcher.Form, {
				method: "post",
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ jsx("input", {
						type: "hidden",
						name: "intent",
						value: state.mode === "create" ? "create_plant" : "update_plant"
					}),
					state.mode === "edit" && /* @__PURE__ */ jsx("input", {
						type: "hidden",
						name: "plant_id",
						value: plant.id
					}),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
						className: "mb-1.5 block text-xs font-medium text-text-muted",
						children: ["Type", state.mode === "create" && /* @__PURE__ */ jsx("span", {
							className: "ml-0.5 text-orange",
							children: "*"
						})]
					}), state.mode === "create" ? /* @__PURE__ */ jsx("select", {
						name: "plant_type",
						defaultValue: "vegetable",
						required: true,
						className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30",
						children: PLANT_TYPES.map(({ value, label }) => /* @__PURE__ */ jsx("option", {
							value,
							children: label
						}, value))
					}) : /* @__PURE__ */ jsxs("div", {
						className: "flex items-center rounded-xl border border-black/10 bg-black/[0.03] px-3 py-2 text-sm capitalize text-text-muted",
						children: [plant.plant_type, /* @__PURE__ */ jsx("span", {
							className: "ml-auto text-[11px] text-text-faint",
							children: "locked"
						})]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
						className: "mb-1.5 block text-xs font-medium text-text-muted",
						children: ["Species", state.mode === "create" && /* @__PURE__ */ jsx("span", {
							className: "ml-0.5 text-orange",
							children: "*"
						})]
					}), state.mode === "create" ? /* @__PURE__ */ jsx("input", {
						type: "text",
						name: "species",
						required: true,
						placeholder: "e.g. Basil, Tomato, Lavender",
						className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
					}) : /* @__PURE__ */ jsxs("div", {
						className: "flex items-center rounded-xl border border-black/10 bg-black/[0.03] px-3 py-2 text-sm text-text-muted",
						children: [plant.species, /* @__PURE__ */ jsx("span", {
							className: "ml-auto text-[11px] text-text-faint",
							children: "locked"
						})]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "mb-1.5 block text-xs font-medium text-text-muted",
						children: "Variety"
					}), /* @__PURE__ */ jsx("input", {
						type: "text",
						name: "variety",
						defaultValue: plant?.variety ?? "",
						placeholder: "e.g. Sweet Genovese, Cherry, English",
						className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "mb-1.5 block text-xs font-medium text-text-muted",
						children: "Plot / Bed"
					}), /* @__PURE__ */ jsx("input", {
						type: "text",
						name: "plot",
						defaultValue: plant?.plot ?? "",
						placeholder: "e.g. A1, North Bed, Raised Bed 3",
						className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "mb-1.5 block text-xs font-medium text-text-muted",
						children: "Planted date"
					}), /* @__PURE__ */ jsx("input", {
						type: "date",
						name: "planted_date",
						defaultValue: plant?.planted_date ? plant.planted_date.slice(0, 10) : "",
						className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
					})] }),
					fetcher.data && "error" in fetcher.data && /* @__PURE__ */ jsx("p", {
						className: "text-xs text-orange",
						children: String(fetcher.data.error)
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex justify-end gap-2 pt-1",
						children: [/* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: onClose,
							className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-4 py-2 text-xs font-medium text-text-muted transition hover:bg-surface-offset",
							children: "Cancel"
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: fetcher.state !== "idle",
							className: "inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary-strong disabled:opacity-60",
							children: fetcher.state !== "idle" ? "Saving…" : state.mode === "create" ? "Add Plant" : "Save Changes"
						})]
					})
				]
			}),
			state.mode === "edit" && /* @__PURE__ */ jsx("div", {
				className: "mt-4 border-t border-black/10 pt-4",
				children: /* @__PURE__ */ jsxs(fetcher.Form, {
					method: "post",
					children: [
						/* @__PURE__ */ jsx("input", {
							type: "hidden",
							name: "intent",
							value: "delete_plant"
						}),
						/* @__PURE__ */ jsx("input", {
							type: "hidden",
							name: "plant_id",
							value: plant.id
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "inline-flex items-center rounded-full border border-red-200/60 bg-surface px-3 py-1.5 text-xs font-medium text-orange transition hover:bg-orange-soft",
							onClick: (e) => {
								if (!confirm(`Delete ${plant.species}? This cannot be undone.`)) e.preventDefault();
							},
							children: "Delete plant"
						})
					]
				})
			})
		] })
	});
}
//#endregion
//#region app/components/plants/PlantSidebar.tsx
var plantTypeColors$2 = {
	herb: "#3a7a45",
	vegetable: "#4a9e4a",
	fruit: "#e05d2b",
	flower: "#d83b8c",
	shrub: "#6c9e50",
	tree: "#2d6036",
	vine: "#c08a00"
};
function PlantButton({ plant, selectedId, onSelect }) {
	return /* @__PURE__ */ jsxs("button", {
		onClick: () => onSelect(plant.id),
		className: ["relative mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition", selectedId === plant.id ? "bg-primary-soft font-semibold text-primary" : "text-text-muted hover:bg-surface-offset hover:text-text-main"].join(" "),
		children: [/* @__PURE__ */ jsx("span", {
			className: "h-2.5 w-2.5 shrink-0 rounded-full",
			style: { backgroundColor: plantTypeColors$2[plant.plant_type] }
		}), /* @__PURE__ */ jsxs("span", {
			className: "truncate capitalize",
			children: [plant.species, plant.variety && /* @__PURE__ */ jsx("em", {
				className: "ml-1 not-italic text-text-faint capitalize",
				children: plant.variety
			})]
		})]
	}, plant.id);
}
function PlantSidebar({ plants, gardenName, selectedId, showDashboard, onSelect, onAddPlant, onShowDashboard, typeFilter, onClearTypeFilter }) {
	const [query, setQuery] = useState("");
	const sortPlants = (list) => [...list].sort((a, b) => {
		const s = a.species.localeCompare(b.species);
		if (s !== 0) return s;
		return (a.variety ?? "").localeCompare(b.variety ?? "");
	});
	const hasPlots = plants.some((p) => p.plot);
	const needle = query.trim().toLowerCase();
	const filteredPlants = needle ? sortPlants(plants.filter((p) => p.species.toLowerCase().includes(needle) || (p.variety ?? "").toLowerCase().includes(needle))) : null;
	const grouped = [];
	if (!filteredPlants && hasPlots) {
		const byPlot = /* @__PURE__ */ new Map();
		const unplotted = [];
		for (const plant of plants) if (plant.plot) {
			const group = byPlot.get(plant.plot) ?? [];
			group.push(plant);
			byPlot.set(plant.plot, group);
		} else unplotted.push(plant);
		const sortedPlots = [...byPlot.keys()].sort((a, b) => a.localeCompare(b));
		for (const plot of sortedPlots) grouped.push({
			label: plot,
			plants: sortPlants(byPlot.get(plot))
		});
		if (unplotted.length > 0) grouped.push({
			label: null,
			plants: sortPlants(unplotted)
		});
	}
	return /* @__PURE__ */ jsxs("aside", {
		className: "hidden lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)] lg:w-60 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-black/10 lg:bg-surface lg:px-3 lg:py-4",
		children: [
			/* @__PURE__ */ jsxs("button", {
				onClick: onShowDashboard,
				className: ["flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition", showDashboard ? "bg-primary-soft font-semibold text-primary" : "text-text-muted hover:bg-surface-offset hover:text-text-main"].join(" "),
				children: [/* @__PURE__ */ jsx(LayoutDashboard, { className: "h-3.5 w-3.5 shrink-0" }), "Dashboard"]
			}),
			/* @__PURE__ */ jsx("div", { className: "my-2 border-t border-black/10" }),
			/* @__PURE__ */ jsxs("div", {
				className: "px-2 pb-2 pt-1",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-text-faint",
						children: gardenName
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-0.5 text-xs text-text-muted",
						children: "Plants"
					}),
					typeFilter && /* @__PURE__ */ jsx("div", {
						className: "mt-2",
						children: /* @__PURE__ */ jsxs("span", {
							className: "inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "h-2 w-2 shrink-0 rounded-full",
									style: { backgroundColor: plantTypeColors$2[typeFilter] }
								}),
								/* @__PURE__ */ jsx("span", {
									className: "capitalize",
									children: typeFilter
								}),
								/* @__PURE__ */ jsx("button", {
									onClick: onClearTypeFilter,
									"aria-label": "Clear type filter",
									children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
								})
							]
						})
					})
				]
			}),
			plants.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "relative px-1 pb-2",
				children: [
					/* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-faint" }),
					/* @__PURE__ */ jsx("input", {
						type: "search",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search plants…",
						className: "w-full rounded-lg border border-black/10 bg-bg py-1.5 pl-8 pr-7 text-xs text-text-main placeholder:text-text-faint focus:outline-none focus:ring-1 focus:ring-primary/40"
					}),
					query && /* @__PURE__ */ jsx("button", {
						onClick: () => setQuery(""),
						className: "absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-muted",
						"aria-label": "Clear search",
						children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
					})
				]
			}),
			plants.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "px-3 py-2 text-sm text-text-faint",
				children: typeFilter ? "No plants of this type." : "No plants yet."
			}) : filteredPlants ? filteredPlants.length === 0 ? /* @__PURE__ */ jsx("p", {
				className: "px-3 py-2 text-sm text-text-faint",
				children: "No plants match."
			}) : filteredPlants.map((plant) => /* @__PURE__ */ jsx(PlantButton, {
				plant,
				selectedId,
				onSelect
			}, plant.id)) : hasPlots ? grouped.map(({ label, plants: group }, i) => /* @__PURE__ */ jsxs("div", {
				className: i > 0 ? "mt-3" : void 0,
				children: [/* @__PURE__ */ jsx("div", {
					className: "px-3 pb-0.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-faint",
					children: label ?? "Other"
				}), group.map((plant) => /* @__PURE__ */ jsx(PlantButton, {
					plant,
					selectedId,
					onSelect
				}, plant.id))]
			}, label ?? "__unplotted")) : sortPlants(plants).map((plant) => /* @__PURE__ */ jsx(PlantButton, {
				plant,
				selectedId,
				onSelect
			}, plant.id)),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4 border-t border-black/10 pt-3",
				children: /* @__PURE__ */ jsx("button", {
					onClick: onAddPlant,
					className: "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-text-muted transition hover:bg-surface-offset hover:text-text-main",
					children: "+ Add plant"
				})
			})
		]
	});
}
//#endregion
//#region app/components/plants/PlantStatusBadge.tsx
var typeConfig = {
	herb: {
		label: "Herb",
		className: "bg-primary-soft text-primary"
	},
	vegetable: {
		label: "Vegetable",
		className: "bg-success-soft text-success"
	},
	fruit: {
		label: "Fruit",
		className: "bg-orange-soft text-orange"
	},
	flower: {
		label: "Flower",
		className: "bg-gold-soft text-gold"
	},
	shrub: {
		label: "Shrub",
		className: "bg-primary-soft text-primary-strong"
	},
	tree: {
		label: "Tree",
		className: "bg-success-soft text-success"
	},
	vine: {
		label: "Vine",
		className: "bg-gold-soft text-gold"
	}
};
function PlantStatusBadge({ type }) {
	const config = typeConfig[type];
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.04em] ${config.className}`,
		children: config.label
	});
}
//#endregion
//#region app/components/plants/PlantKPICard.tsx
function PlantKPICard({ label, value, meta, Icon }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-3xl border border-black/10 bg-surface p-4 shadow-soft sm:p-5",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted",
				children: label
			}),
			/* @__PURE__ */ jsx("div", {
				className: "font-display text-3xl leading-none sm:text-4xl",
				children: value
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-2 flex items-center gap-2 text-xs text-text-muted",
				children: [/* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ jsx("span", { children: meta })]
			})
		]
	});
}
//#endregion
//#region app/components/plants/SeasonProgressCard.tsx
var now$1 = Date.now();
function SeasonProgressCard({ plantedDate }) {
	const days = useMemo(() => Math.floor((now$1 - new Date(plantedDate).getTime()) / 864e5), [plantedDate]);
	const cycle = days % 365;
	const pct = Math.round(cycle / 365 * 100);
	const yearNum = Math.floor(days / 365) + 1;
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-3xl border border-black/10 bg-surface p-4 shadow-soft sm:p-5",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted",
				children: "Season"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "font-display text-3xl leading-none sm:text-4xl",
				children: [pct, "%"]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-3",
				children: /* @__PURE__ */ jsx("div", {
					className: "h-1.5 overflow-hidden rounded-full bg-black/10",
					children: /* @__PURE__ */ jsx("div", {
						className: "h-full rounded-full bg-primary transition-all",
						style: { width: `${pct}%` }
					})
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-2 flex items-center gap-2 text-xs text-text-muted",
				children: [/* @__PURE__ */ jsx(Leaf, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ jsxs("span", { children: [
					"year ",
					yearNum,
					" of growing"
				] })]
			})
		]
	});
}
//#endregion
//#region app/components/plants/PlantNoteTimeline.tsx
function PlantNoteTimeline({ notes, color, onNoteClick }) {
	const tagClasses = {
		note: "bg-blue-soft text-blue",
		action: "bg-primary-soft text-primary",
		pest: "bg-orange-soft text-orange",
		harvest: "bg-gold-soft text-gold",
		milestone: "bg-success-soft text-success"
	};
	const emojiMap = {
		note: "👁",
		action: "🛠",
		pest: "⚠️",
		harvest: "🌾",
		milestone: "🎯"
	};
	const toTitleCase = (s) => s.split(/[\s-_]+/).map((w) => w ? w[0].toUpperCase() + w.slice(1) : w).join(" ");
	if (notes.length === 0) return /* @__PURE__ */ jsx("div", {
		className: "py-10 text-center text-sm text-text-faint",
		children: "No notes yet"
	});
	const sorted = [...notes].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-0",
		children: sorted.map((note, idx) => /* @__PURE__ */ jsxs("div", {
			role: onNoteClick ? "button" : void 0,
			tabIndex: onNoteClick ? 0 : void 0,
			onClick: onNoteClick ? () => onNoteClick(note) : void 0,
			onKeyDown: onNoteClick ? (e) => {
				if (e.key === "Enter" || e.key === " ") onNoteClick(note);
			} : void 0,
			className: ["grid grid-cols-[18px_74px_1fr] gap-3 pb-4 last:pb-0", onNoteClick ? "cursor-pointer rounded-xl px-2 -mx-2 hover:bg-black/[0.03] transition-colors" : ""].join(" "),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "timeline-track flex flex-col items-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "z-10 mt-1 h-2.5 w-2.5 rounded-full border-2 border-surface",
						style: { backgroundColor: color }
					}), idx !== sorted.length - 1 && /* @__PURE__ */ jsx("span", { className: "mt-1 block w-px flex-1 bg-divider" })]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "timeline-date",
					children: new Date(note.created_at).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric"
					})
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
					className: `mb-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] ${tagClasses[note.label]}`,
					children: [
						emojiMap[note.label] ?? "",
						" ",
						toTitleCase(note.label)
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "timeline-text",
					children: note.note ?? /* @__PURE__ */ jsx("span", {
						className: "italic text-text-faint",
						children: "Empty note"
					})
				})] })
			]
		}, note.id))
	});
}
//#endregion
//#region app/components/plants/NoteModal.tsx
var NOTE_TYPES$1 = [
	"note",
	"action",
	"pest",
	"harvest",
	"milestone"
];
var NOTE_TYPE_LABELS$1 = {
	note: "Note",
	action: "Action",
	pest: "Pest",
	harvest: "Harvest",
	milestone: "Milestone"
};
var tagClasses$1 = {
	note: "bg-blue-soft text-blue",
	action: "bg-primary-soft text-primary",
	pest: "bg-orange-soft text-orange",
	harvest: "bg-gold-soft text-gold",
	milestone: "bg-success-soft text-success"
};
function NoteModal({ state, onClose, onEdit }) {
	const fetcher = useFetcher();
	const dialogRef = useRef(null);
	const didSubmitRef = useRef(false);
	useEffect(() => {
		if (state) dialogRef.current?.showModal();
		else dialogRef.current?.close();
	}, [state]);
	useEffect(() => {
		if (fetcher.state === "submitting") didSubmitRef.current = true;
	}, [fetcher.state]);
	useEffect(() => {
		if (didSubmitRef.current && fetcher.state === "idle" && fetcher.data != null && !("error" in fetcher.data)) {
			didSubmitRef.current = false;
			onClose();
		}
	}, [
		fetcher.state,
		fetcher.data,
		onClose
	]);
	const note = state && state.mode !== "create" ? state.note : null;
	const plantId = state?.plantId ?? "";
	const isForm = state?.mode === "create" || state?.mode === "edit";
	return /* @__PURE__ */ jsxs("dialog", {
		ref: dialogRef,
		className: "m-auto w-full max-w-md rounded-3xl border border-black/10 bg-surface p-6 shadow-lg backdrop:bg-black/40 open:flex open:flex-col",
		onClose,
		onClick: (e) => {
			if (e.target === dialogRef.current) onClose();
		},
		children: [state?.mode === "view" && note && /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: `inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] ${tagClasses$1[note.label]}`,
					children: NOTE_TYPE_LABELS$1[note.label]
				}), /* @__PURE__ */ jsx("button", {
					onClick: onClose,
					className: "text-xl leading-none text-text-faint transition hover:text-text-main",
					"aria-label": "Close",
					children: "×"
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-6 min-h-[3rem] text-sm leading-6 text-text-main whitespace-pre-wrap",
				children: note.note ?? /* @__PURE__ */ jsx("span", {
					className: "italic text-text-faint",
					children: "Empty note"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-xs text-text-faint",
					children: new Date(note.created_at).toLocaleDateString("en-US", {
						month: "long",
						day: "numeric",
						year: "numeric"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => onEdit(note, plantId),
						className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main",
						children: "Edit"
					}), /* @__PURE__ */ jsxs(fetcher.Form, {
						method: "post",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "hidden",
								name: "intent",
								value: "delete_note"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "hidden",
								name: "plant_id",
								value: plantId
							}),
							/* @__PURE__ */ jsx("input", {
								type: "hidden",
								name: "note_id",
								value: note.id
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "inline-flex items-center rounded-full border border-red-200/60 bg-surface px-3 py-1.5 text-xs font-medium text-orange transition hover:bg-orange-soft",
								onClick: (e) => {
									if (!confirm("Delete this note? This cannot be undone.")) e.preventDefault();
								},
								children: "Delete"
							})
						]
					})]
				})]
			})
		] }), isForm && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold text-text-main",
				children: state?.mode === "create" ? "Add a Note" : "Edit Note"
			}), /* @__PURE__ */ jsx("button", {
				onClick: onClose,
				className: "text-xl leading-none text-text-faint transition hover:text-text-main",
				"aria-label": "Close",
				children: "×"
			})]
		}), /* @__PURE__ */ jsxs(fetcher.Form, {
			method: "post",
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ jsx("input", {
					type: "hidden",
					name: "intent",
					value: state?.mode === "create" ? "create_note" : "update_note"
				}),
				/* @__PURE__ */ jsx("input", {
					type: "hidden",
					name: "plant_id",
					value: plantId
				}),
				state?.mode === "edit" && note && /* @__PURE__ */ jsx("input", {
					type: "hidden",
					name: "note_id",
					value: note.id
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					className: "mb-1.5 block text-xs font-medium text-text-muted",
					children: "Type"
				}), /* @__PURE__ */ jsx("select", {
					name: "label",
					defaultValue: note?.label ?? "note",
					className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30",
					children: NOTE_TYPES$1.map((t) => /* @__PURE__ */ jsx("option", {
						value: t,
						children: NOTE_TYPE_LABELS$1[t]
					}, t))
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					className: "mb-1.5 block text-xs font-medium text-text-muted",
					children: "Note"
				}), /* @__PURE__ */ jsx("textarea", {
					name: "note",
					defaultValue: note?.note ?? "",
					rows: 4,
					className: "w-full resize-none rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30",
					placeholder: "Write your note…"
				})] }),
				fetcher.data && "error" in fetcher.data && /* @__PURE__ */ jsx("p", {
					className: "text-xs text-orange",
					children: String(fetcher.data.error)
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onClose,
						className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-4 py-2 text-xs font-medium text-text-muted transition hover:bg-surface-offset",
						children: "Cancel"
					}), /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: fetcher.state !== "idle",
						className: "inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary-strong disabled:opacity-60",
						children: fetcher.state !== "idle" ? "Saving…" : state?.mode === "create" ? "Add Note" : "Save Changes"
					})]
				})
			]
		})] })]
	});
}
//#endregion
//#region app/components/plants/HarvestModal.tsx
var UNITS = [
	"items",
	"g",
	"kg",
	"oz",
	"lbs",
	"bunches",
	"bags",
	"jars"
];
function formatDate(dateStr) {
	return new Date(dateStr).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
function HarvestModal({ state, onClose, onEdit }) {
	const fetcher = useFetcher();
	const dialogRef = useRef(null);
	const didSubmitRef = useRef(false);
	useEffect(() => {
		if (state) dialogRef.current?.showModal();
		else dialogRef.current?.close();
	}, [state]);
	useEffect(() => {
		if (fetcher.state === "submitting") didSubmitRef.current = true;
	}, [fetcher.state]);
	useEffect(() => {
		if (didSubmitRef.current && fetcher.state === "idle" && fetcher.data != null && !("error" in fetcher.data)) {
			didSubmitRef.current = false;
			onClose();
		}
	}, [
		fetcher.state,
		fetcher.data,
		onClose
	]);
	const harvest = state && state.mode !== "create" ? state.harvest : null;
	const plantId = state?.plantId ?? "";
	const isForm = state?.mode === "create" || state?.mode === "edit";
	const lockedUnit = (state?.mode === "create" ? state.harvestUnit : void 0) ?? (state?.mode === "edit" ? harvest?.unit : void 0);
	const [selectedUnit, setSelectedUnit] = useState(lockedUnit ?? "items");
	useEffect(() => {
		setSelectedUnit(lockedUnit ?? "items");
	}, [state?.mode, harvest?.id]);
	return /* @__PURE__ */ jsxs("dialog", {
		ref: dialogRef,
		className: "m-auto w-full max-w-md rounded-3xl border border-black/10 bg-surface p-6 shadow-lg backdrop:bg-black/40 open:flex open:flex-col",
		onClose,
		onClick: (e) => {
			if (e.target === dialogRef.current) onClose();
		},
		children: [state?.mode === "view" && harvest && /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-sm font-semibold text-text-main",
					children: "Harvest"
				}), /* @__PURE__ */ jsx("button", {
					onClick: onClose,
					className: "text-xl leading-none text-text-faint transition hover:text-text-main",
					"aria-label": "Close",
					children: "×"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "font-display text-4xl leading-none text-text-main",
					children: [harvest.amount, /* @__PURE__ */ jsx("span", {
						className: "ml-1.5 text-xl text-text-muted",
						children: harvest.unit
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-1 text-xs text-text-faint",
					children: formatDate(harvest.created_at)
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-end gap-2 pt-2",
				children: [/* @__PURE__ */ jsx("button", {
					onClick: () => onEdit(harvest, plantId),
					className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main",
					children: "Edit"
				}), /* @__PURE__ */ jsxs(fetcher.Form, {
					method: "post",
					children: [
						/* @__PURE__ */ jsx("input", {
							type: "hidden",
							name: "intent",
							value: "delete_harvest"
						}),
						/* @__PURE__ */ jsx("input", {
							type: "hidden",
							name: "plant_id",
							value: plantId
						}),
						/* @__PURE__ */ jsx("input", {
							type: "hidden",
							name: "harvest_id",
							value: harvest.id
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "inline-flex items-center rounded-full border border-red-200/60 bg-surface px-3 py-1.5 text-xs font-medium text-orange transition hover:bg-orange-soft",
							onClick: (e) => {
								if (!confirm("Delete this harvest record? This cannot be undone.")) e.preventDefault();
							},
							children: "Delete"
						})
					]
				})]
			})
		] }), isForm && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold text-text-main",
				children: state?.mode === "create" ? "Record a Harvest" : "Edit Harvest"
			}), /* @__PURE__ */ jsx("button", {
				onClick: onClose,
				className: "text-xl leading-none text-text-faint transition hover:text-text-main",
				"aria-label": "Close",
				children: "×"
			})]
		}), /* @__PURE__ */ jsxs(fetcher.Form, {
			method: "post",
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ jsx("input", {
					type: "hidden",
					name: "intent",
					value: state?.mode === "create" ? "create_harvest" : "update_harvest"
				}),
				/* @__PURE__ */ jsx("input", {
					type: "hidden",
					name: "plant_id",
					value: plantId
				}),
				state?.mode === "edit" && harvest && /* @__PURE__ */ jsx("input", {
					type: "hidden",
					name: "harvest_id",
					value: harvest.id
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
						className: "mb-1.5 block text-xs font-medium text-text-muted",
						children: ["Amount ", /* @__PURE__ */ jsx("span", {
							className: "text-orange",
							children: "*"
						})]
					}), /* @__PURE__ */ jsx("input", {
						type: "number",
						name: "amount",
						min: "0",
						step: "any",
						required: true,
						defaultValue: harvest?.amount ?? "",
						placeholder: "0",
						className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
					})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
						className: "mb-1.5 block text-xs font-medium text-text-muted",
						children: "Unit"
					}), lockedUnit ? /* @__PURE__ */ jsxs(Fragment, { children: [
						/* @__PURE__ */ jsx("input", {
							type: "hidden",
							name: "unit",
							value: lockedUnit
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center rounded-xl border border-black/10 bg-black/[0.03] px-3 py-2 text-sm text-text-muted",
							children: [lockedUnit, /* @__PURE__ */ jsx("span", {
								className: "ml-auto text-[11px] text-text-faint",
								children: "locked"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-xs text-text-faint",
							children: "Unit is fixed for this plant."
						})
					] }) : /* @__PURE__ */ jsx("select", {
						name: "unit",
						value: selectedUnit,
						onChange: (e) => setSelectedUnit(e.target.value),
						className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30",
						children: UNITS.map((u) => /* @__PURE__ */ jsx("option", {
							value: u,
							children: u
						}, u))
					})] })]
				}),
				fetcher.data && "error" in fetcher.data && /* @__PURE__ */ jsx("p", {
					className: "text-xs text-orange",
					children: String(fetcher.data.error)
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onClose,
						className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-4 py-2 text-xs font-medium text-text-muted transition hover:bg-surface-offset",
						children: "Cancel"
					}), /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: fetcher.state !== "idle",
						className: "inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary-strong disabled:opacity-60",
						children: fetcher.state !== "idle" ? "Saving…" : state?.mode === "create" ? "Record Harvest" : "Save Changes"
					})]
				})
			]
		})] })]
	});
}
//#endregion
//#region app/components/gardens/GardenNoteTimeline.tsx
function GardenNoteTimeline({ notes, color, onNoteClick }) {
	const tagClasses = {
		note: "bg-blue-soft text-blue",
		action: "bg-primary-soft text-primary",
		pest: "bg-orange-soft text-orange",
		harvest: "bg-gold-soft text-gold",
		milestone: "bg-success-soft text-success"
	};
	const emojiMap = {
		note: "👁",
		action: "🛠",
		pest: "⚠️",
		harvest: "🌾",
		milestone: "🎯"
	};
	const toTitleCase = (s) => s.split(/[\s-_]+/).map((w) => w ? w[0].toUpperCase() + w.slice(1) : w).join(" ");
	if (notes.length === 0) return /* @__PURE__ */ jsx("div", {
		className: "py-10 text-center text-sm text-text-faint",
		children: "No notes yet"
	});
	const sorted = [...notes].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
	return /* @__PURE__ */ jsx("div", {
		className: "space-y-0",
		children: sorted.map((note, idx) => /* @__PURE__ */ jsxs("div", {
			role: onNoteClick ? "button" : void 0,
			tabIndex: onNoteClick ? 0 : void 0,
			onClick: onNoteClick ? () => onNoteClick(note) : void 0,
			onKeyDown: onNoteClick ? (e) => {
				if (e.key === "Enter" || e.key === " ") onNoteClick(note);
			} : void 0,
			className: ["grid grid-cols-[18px_74px_1fr] gap-3 pb-4 last:pb-0", onNoteClick ? "cursor-pointer rounded-xl px-2 -mx-2 hover:bg-black/[0.03] transition-colors" : ""].join(" "),
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "timeline-track flex flex-col items-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "z-10 mt-1 h-2.5 w-2.5 rounded-full border-2 border-surface",
						style: { backgroundColor: color }
					}), idx !== sorted.length - 1 && /* @__PURE__ */ jsx("span", { className: "mt-1 block w-px flex-1 bg-divider" })]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "timeline-date",
					children: new Date(note.created_at).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric"
					})
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("span", {
					className: `mb-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] ${tagClasses[note.label]}`,
					children: [
						emojiMap[note.label] ?? "",
						" ",
						toTitleCase(note.label)
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "timeline-text",
					children: note.note ?? /* @__PURE__ */ jsx("span", {
						className: "italic text-text-faint",
						children: "Empty note"
					})
				})] })
			]
		}, note.id))
	});
}
//#endregion
//#region app/components/gardens/GardenNoteModal.tsx
var NOTE_TYPES = [
	"note",
	"action",
	"pest",
	"harvest",
	"milestone"
];
var NOTE_TYPE_LABELS = {
	note: "Note",
	action: "Action",
	pest: "Pest",
	harvest: "Harvest",
	milestone: "Milestone"
};
var tagClasses = {
	note: "bg-blue-soft text-blue",
	action: "bg-primary-soft text-primary",
	pest: "bg-orange-soft text-orange",
	harvest: "bg-gold-soft text-gold",
	milestone: "bg-success-soft text-success"
};
function GardenNoteModal({ state, onClose, onEdit }) {
	const fetcher = useFetcher();
	const dialogRef = useRef(null);
	const didSubmitRef = useRef(false);
	useEffect(() => {
		if (state) dialogRef.current?.showModal();
		else dialogRef.current?.close();
	}, [state]);
	useEffect(() => {
		if (fetcher.state === "submitting") didSubmitRef.current = true;
	}, [fetcher.state]);
	useEffect(() => {
		if (didSubmitRef.current && fetcher.state === "idle" && fetcher.data != null && !("error" in fetcher.data)) {
			didSubmitRef.current = false;
			onClose();
		}
	}, [
		fetcher.state,
		fetcher.data,
		onClose
	]);
	const note = state && state.mode !== "create" ? state.note : null;
	const isForm = state?.mode === "create" || state?.mode === "edit";
	return /* @__PURE__ */ jsxs("dialog", {
		ref: dialogRef,
		className: "m-auto w-full max-w-md rounded-3xl border border-black/10 bg-surface p-6 shadow-lg backdrop:bg-black/40 open:flex open:flex-col",
		onClose,
		onClick: (e) => {
			if (e.target === dialogRef.current) onClose();
		},
		children: [state?.mode === "view" && note && /* @__PURE__ */ jsxs(Fragment, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-4 flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: `inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] ${tagClasses[note.label]}`,
					children: NOTE_TYPE_LABELS[note.label]
				}), /* @__PURE__ */ jsx("button", {
					onClick: onClose,
					className: "text-xl leading-none text-text-faint transition hover:text-text-main",
					"aria-label": "Close",
					children: "×"
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mb-6 min-h-[3rem] text-sm leading-6 text-text-main whitespace-pre-wrap",
				children: note.note ?? /* @__PURE__ */ jsx("span", {
					className: "italic text-text-faint",
					children: "Empty note"
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsx("span", {
					className: "text-xs text-text-faint",
					children: new Date(note.created_at).toLocaleDateString("en-US", {
						month: "long",
						day: "numeric",
						year: "numeric"
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => onEdit(note),
						className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main",
						children: "Edit"
					}), /* @__PURE__ */ jsxs(fetcher.Form, {
						method: "post",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "hidden",
								name: "intent",
								value: "delete_garden_note"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "hidden",
								name: "note_id",
								value: note.id
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "inline-flex items-center rounded-full border border-red-200/60 bg-surface px-3 py-1.5 text-xs font-medium text-orange transition hover:bg-orange-soft",
								onClick: (e) => {
									if (!confirm("Delete this note? This cannot be undone.")) e.preventDefault();
								},
								children: "Delete"
							})
						]
					})]
				})]
			})
		] }), isForm && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "text-sm font-semibold text-text-main",
				children: state?.mode === "create" ? "Add a Note" : "Edit Note"
			}), /* @__PURE__ */ jsx("button", {
				onClick: onClose,
				className: "text-xl leading-none text-text-faint transition hover:text-text-main",
				"aria-label": "Close",
				children: "×"
			})]
		}), /* @__PURE__ */ jsxs(fetcher.Form, {
			method: "post",
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ jsx("input", {
					type: "hidden",
					name: "intent",
					value: state?.mode === "create" ? "create_garden_note" : "update_garden_note"
				}),
				state?.mode === "edit" && note && /* @__PURE__ */ jsx("input", {
					type: "hidden",
					name: "note_id",
					value: note.id
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					className: "mb-1.5 block text-xs font-medium text-text-muted",
					children: "Type"
				}), /* @__PURE__ */ jsx("select", {
					name: "label",
					defaultValue: note?.label ?? "note",
					className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30",
					children: NOTE_TYPES.map((t) => /* @__PURE__ */ jsx("option", {
						value: t,
						children: NOTE_TYPE_LABELS[t]
					}, t))
				})] }),
				state?.mode === "edit" && /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					className: "mb-1.5 block text-xs font-medium text-text-muted",
					children: "Date"
				}), /* @__PURE__ */ jsx("input", {
					type: "date",
					name: "created_at",
					defaultValue: note?.created_at ? note.created_at.slice(0, 10) : "",
					className: "w-full rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30"
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
					className: "mb-1.5 block text-xs font-medium text-text-muted",
					children: "Note"
				}), /* @__PURE__ */ jsx("textarea", {
					name: "note",
					defaultValue: note?.note ?? "",
					rows: 4,
					className: "w-full resize-none rounded-xl border border-black/10 bg-surface px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-2 focus:ring-primary/30",
					placeholder: "Write your note…"
				})] }),
				fetcher.data && "error" in fetcher.data && /* @__PURE__ */ jsx("p", {
					className: "text-xs text-orange",
					children: String(fetcher.data.error)
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onClose,
						className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-4 py-2 text-xs font-medium text-text-muted transition hover:bg-surface-offset",
						children: "Cancel"
					}), /* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: fetcher.state !== "idle",
						className: "inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition hover:bg-primary-strong disabled:opacity-60",
						children: fetcher.state !== "idle" ? "Saving…" : state?.mode === "create" ? "Add Note" : "Save Changes"
					})]
				})
			]
		})] })]
	});
}
//#endregion
//#region app/components/ProgressRing.tsx
function ProgressRing({ percent, days, maturity, color }) {
	const radius = 38;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - percent / 100 * circumference;
	const remaining = maturity != null ? maturity - days : null;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-5",
		children: [/* @__PURE__ */ jsxs("svg", {
			className: "h-28 w-28 -rotate-90",
			viewBox: "0 0 100 100",
			"aria-hidden": "true",
			children: [/* @__PURE__ */ jsx("circle", {
				cx: "50",
				cy: "50",
				r: radius,
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "10",
				className: "text-black/8 dark:text-white/8"
			}), /* @__PURE__ */ jsx("circle", {
				cx: "50",
				cy: "50",
				r: radius,
				fill: "none",
				stroke: color,
				strokeWidth: "10",
				strokeLinecap: "round",
				strokeDasharray: circumference,
				strokeDashoffset: offset,
				className: "transition-all duration-700 ease-out"
			})]
		}), /* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "font-display text-4xl leading-none",
				children: [days, /* @__PURE__ */ jsx("span", {
					className: "ml-1 text-sm font-medium text-text-muted",
					children: "days"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-1 text-xs uppercase tracking-[0.16em] text-text-muted",
				children: "since planted"
			}),
			remaining != null && /* @__PURE__ */ jsx("div", {
				className: "mt-3 text-sm text-text-muted",
				children: remaining > 0 ? `~${remaining} days to maturity` : "Past maturity date"
			})
		] })]
	});
}
//#endregion
//#region node_modules/recharts/es6/util/excludeEventProps.js
var EventKeys = [
	"dangerouslySetInnerHTML",
	"onCopy",
	"onCopyCapture",
	"onCut",
	"onCutCapture",
	"onPaste",
	"onPasteCapture",
	"onCompositionEnd",
	"onCompositionEndCapture",
	"onCompositionStart",
	"onCompositionStartCapture",
	"onCompositionUpdate",
	"onCompositionUpdateCapture",
	"onFocus",
	"onFocusCapture",
	"onBlur",
	"onBlurCapture",
	"onChange",
	"onChangeCapture",
	"onBeforeInput",
	"onBeforeInputCapture",
	"onInput",
	"onInputCapture",
	"onReset",
	"onResetCapture",
	"onSubmit",
	"onSubmitCapture",
	"onInvalid",
	"onInvalidCapture",
	"onLoad",
	"onLoadCapture",
	"onError",
	"onErrorCapture",
	"onKeyDown",
	"onKeyDownCapture",
	"onKeyPress",
	"onKeyPressCapture",
	"onKeyUp",
	"onKeyUpCapture",
	"onAbort",
	"onAbortCapture",
	"onCanPlay",
	"onCanPlayCapture",
	"onCanPlayThrough",
	"onCanPlayThroughCapture",
	"onDurationChange",
	"onDurationChangeCapture",
	"onEmptied",
	"onEmptiedCapture",
	"onEncrypted",
	"onEncryptedCapture",
	"onEnded",
	"onEndedCapture",
	"onLoadedData",
	"onLoadedDataCapture",
	"onLoadedMetadata",
	"onLoadedMetadataCapture",
	"onLoadStart",
	"onLoadStartCapture",
	"onPause",
	"onPauseCapture",
	"onPlay",
	"onPlayCapture",
	"onPlaying",
	"onPlayingCapture",
	"onProgress",
	"onProgressCapture",
	"onRateChange",
	"onRateChangeCapture",
	"onSeeked",
	"onSeekedCapture",
	"onSeeking",
	"onSeekingCapture",
	"onStalled",
	"onStalledCapture",
	"onSuspend",
	"onSuspendCapture",
	"onTimeUpdate",
	"onTimeUpdateCapture",
	"onVolumeChange",
	"onVolumeChangeCapture",
	"onWaiting",
	"onWaitingCapture",
	"onAuxClick",
	"onAuxClickCapture",
	"onClick",
	"onClickCapture",
	"onContextMenu",
	"onContextMenuCapture",
	"onDoubleClick",
	"onDoubleClickCapture",
	"onDrag",
	"onDragCapture",
	"onDragEnd",
	"onDragEndCapture",
	"onDragEnter",
	"onDragEnterCapture",
	"onDragExit",
	"onDragExitCapture",
	"onDragLeave",
	"onDragLeaveCapture",
	"onDragOver",
	"onDragOverCapture",
	"onDragStart",
	"onDragStartCapture",
	"onDrop",
	"onDropCapture",
	"onMouseDown",
	"onMouseDownCapture",
	"onMouseEnter",
	"onMouseLeave",
	"onMouseMove",
	"onMouseMoveCapture",
	"onMouseOut",
	"onMouseOutCapture",
	"onMouseOver",
	"onMouseOverCapture",
	"onMouseUp",
	"onMouseUpCapture",
	"onSelect",
	"onSelectCapture",
	"onTouchCancel",
	"onTouchCancelCapture",
	"onTouchEnd",
	"onTouchEndCapture",
	"onTouchMove",
	"onTouchMoveCapture",
	"onTouchStart",
	"onTouchStartCapture",
	"onPointerDown",
	"onPointerDownCapture",
	"onPointerMove",
	"onPointerMoveCapture",
	"onPointerUp",
	"onPointerUpCapture",
	"onPointerCancel",
	"onPointerCancelCapture",
	"onPointerEnter",
	"onPointerEnterCapture",
	"onPointerLeave",
	"onPointerLeaveCapture",
	"onPointerOver",
	"onPointerOverCapture",
	"onPointerOut",
	"onPointerOutCapture",
	"onGotPointerCapture",
	"onGotPointerCaptureCapture",
	"onLostPointerCapture",
	"onLostPointerCaptureCapture",
	"onScroll",
	"onScrollCapture",
	"onWheel",
	"onWheelCapture",
	"onAnimationStart",
	"onAnimationStartCapture",
	"onAnimationEnd",
	"onAnimationEndCapture",
	"onAnimationIteration",
	"onAnimationIterationCapture",
	"onTransitionEnd",
	"onTransitionEndCapture"
];
function isEventKey(key) {
	if (typeof key !== "string") return false;
	return EventKeys.includes(key);
}
//#endregion
//#region node_modules/recharts/es6/util/svgPropertiesNoEvents.js
var SVGElementPropKeySet = new Set([
	"aria-activedescendant",
	"aria-atomic",
	"aria-autocomplete",
	"aria-busy",
	"aria-checked",
	"aria-colcount",
	"aria-colindex",
	"aria-colspan",
	"aria-controls",
	"aria-current",
	"aria-describedby",
	"aria-details",
	"aria-disabled",
	"aria-errormessage",
	"aria-expanded",
	"aria-flowto",
	"aria-haspopup",
	"aria-hidden",
	"aria-invalid",
	"aria-keyshortcuts",
	"aria-label",
	"aria-labelledby",
	"aria-level",
	"aria-live",
	"aria-modal",
	"aria-multiline",
	"aria-multiselectable",
	"aria-orientation",
	"aria-owns",
	"aria-placeholder",
	"aria-posinset",
	"aria-pressed",
	"aria-readonly",
	"aria-relevant",
	"aria-required",
	"aria-roledescription",
	"aria-rowcount",
	"aria-rowindex",
	"aria-rowspan",
	"aria-selected",
	"aria-setsize",
	"aria-sort",
	"aria-valuemax",
	"aria-valuemin",
	"aria-valuenow",
	"aria-valuetext",
	"className",
	"color",
	"height",
	"id",
	"lang",
	"max",
	"media",
	"method",
	"min",
	"name",
	"style",
	"target",
	"width",
	"role",
	"tabIndex",
	"accentHeight",
	"accumulate",
	"additive",
	"alignmentBaseline",
	"allowReorder",
	"alphabetic",
	"amplitude",
	"arabicForm",
	"ascent",
	"attributeName",
	"attributeType",
	"autoReverse",
	"azimuth",
	"baseFrequency",
	"baselineShift",
	"baseProfile",
	"bbox",
	"begin",
	"bias",
	"by",
	"calcMode",
	"capHeight",
	"clip",
	"clipPath",
	"clipPathUnits",
	"clipRule",
	"colorInterpolation",
	"colorInterpolationFilters",
	"colorProfile",
	"colorRendering",
	"contentScriptType",
	"contentStyleType",
	"cursor",
	"cx",
	"cy",
	"d",
	"decelerate",
	"descent",
	"diffuseConstant",
	"direction",
	"display",
	"divisor",
	"dominantBaseline",
	"dur",
	"dx",
	"dy",
	"edgeMode",
	"elevation",
	"enableBackground",
	"end",
	"exponent",
	"externalResourcesRequired",
	"fill",
	"fillOpacity",
	"fillRule",
	"filter",
	"filterRes",
	"filterUnits",
	"floodColor",
	"floodOpacity",
	"focusable",
	"fontFamily",
	"fontSize",
	"fontSizeAdjust",
	"fontStretch",
	"fontStyle",
	"fontVariant",
	"fontWeight",
	"format",
	"from",
	"fx",
	"fy",
	"g1",
	"g2",
	"glyphName",
	"glyphOrientationHorizontal",
	"glyphOrientationVertical",
	"glyphRef",
	"gradientTransform",
	"gradientUnits",
	"hanging",
	"horizAdvX",
	"horizOriginX",
	"href",
	"ideographic",
	"imageRendering",
	"in2",
	"in",
	"intercept",
	"k1",
	"k2",
	"k3",
	"k4",
	"k",
	"kernelMatrix",
	"kernelUnitLength",
	"kerning",
	"keyPoints",
	"keySplines",
	"keyTimes",
	"lengthAdjust",
	"letterSpacing",
	"lightingColor",
	"limitingConeAngle",
	"local",
	"markerEnd",
	"markerHeight",
	"markerMid",
	"markerStart",
	"markerUnits",
	"markerWidth",
	"mask",
	"maskContentUnits",
	"maskUnits",
	"mathematical",
	"mode",
	"numOctaves",
	"offset",
	"opacity",
	"operator",
	"order",
	"orient",
	"orientation",
	"origin",
	"overflow",
	"overlinePosition",
	"overlineThickness",
	"paintOrder",
	"panose1",
	"pathLength",
	"patternContentUnits",
	"patternTransform",
	"patternUnits",
	"pointerEvents",
	"pointsAtX",
	"pointsAtY",
	"pointsAtZ",
	"preserveAlpha",
	"preserveAspectRatio",
	"primitiveUnits",
	"r",
	"radius",
	"refX",
	"refY",
	"renderingIntent",
	"repeatCount",
	"repeatDur",
	"requiredExtensions",
	"requiredFeatures",
	"restart",
	"result",
	"rotate",
	"rx",
	"ry",
	"seed",
	"shapeRendering",
	"slope",
	"spacing",
	"specularConstant",
	"specularExponent",
	"speed",
	"spreadMethod",
	"startOffset",
	"stdDeviation",
	"stemh",
	"stemv",
	"stitchTiles",
	"stopColor",
	"stopOpacity",
	"strikethroughPosition",
	"strikethroughThickness",
	"string",
	"stroke",
	"strokeDasharray",
	"strokeDashoffset",
	"strokeLinecap",
	"strokeLinejoin",
	"strokeMiterlimit",
	"strokeOpacity",
	"strokeWidth",
	"surfaceScale",
	"systemLanguage",
	"tableValues",
	"targetX",
	"targetY",
	"textAnchor",
	"textDecoration",
	"textLength",
	"textRendering",
	"to",
	"transform",
	"u1",
	"u2",
	"underlinePosition",
	"underlineThickness",
	"unicode",
	"unicodeBidi",
	"unicodeRange",
	"unitsPerEm",
	"vAlphabetic",
	"values",
	"vectorEffect",
	"version",
	"vertAdvY",
	"vertOriginX",
	"vertOriginY",
	"vHanging",
	"vIdeographic",
	"viewTarget",
	"visibility",
	"vMathematical",
	"widths",
	"wordSpacing",
	"writingMode",
	"x1",
	"x2",
	"x",
	"xChannelSelector",
	"xHeight",
	"xlinkActuate",
	"xlinkArcrole",
	"xlinkHref",
	"xlinkRole",
	"xlinkShow",
	"xlinkTitle",
	"xlinkType",
	"xmlBase",
	"xmlLang",
	"xmlns",
	"xmlnsXlink",
	"xmlSpace",
	"y1",
	"y2",
	"y",
	"yChannelSelector",
	"z",
	"zoomAndPan",
	"ref",
	"key",
	"angle"
]);
function isSvgElementPropKey(key) {
	if (typeof key !== "string") return false;
	return SVGElementPropKeySet.has(key);
}
/**
* Checks if the property is a data attribute.
* @param key The property key.
* @returns True if the key starts with 'data-', false otherwise.
*/
function isDataAttribute(key) {
	return typeof key === "string" && key.startsWith("data-");
}
/**
* Filters an object to only include SVG properties. Removes all event handlers too.
* @param obj - The object to filter
* @returns A new object containing only valid SVG properties, excluding event handlers.
*/
function svgPropertiesNoEvents(obj) {
	if (typeof obj !== "object" || obj === null) return {};
	var result = {};
	for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
		if (isSvgElementPropKey(key) || isDataAttribute(key)) result[key] = obj[key];
	}
	return result;
}
/**
* Function to filter SVG properties from various input types.
* The input types can be:
* - A record of string keys to any values, in which case it returns a record of only SVG properties
* - A React element, in which case it returns the props of the element filtered to only SVG properties
* - Anything else, in which case it returns null
*
* This function has a wide-open return type, because it will read and filter the props of an arbitrary React element.
* This can be SVG, HTML, whatnot, with arbitrary values, so we can't type it more specifically.
*
* If you wish to have a type-safe version, use svgPropertiesNoEvents directly with a typed object.
*
* @param input - The input to filter, which can be a record, a React element, or other types.
* @returns A record of SVG properties if the input is a record or React element, otherwise null.
*/
function svgPropertiesNoEventsFromUnknown(input) {
	if (input == null) return null;
	if (/* @__PURE__ */ isValidElement(input) && typeof input.props === "object" && input.props !== null) {
		var p = input.props;
		return svgPropertiesNoEvents(p);
	}
	if (typeof input === "object" && !Array.isArray(input)) return svgPropertiesNoEvents(input);
	return null;
}
//#endregion
//#region node_modules/recharts/es6/util/svgPropertiesAndEvents.js
/**
* Filters an object to only include SVG properties, data attributes, and event handlers.
* @param obj - The object to filter.
* @returns A new object containing only valid SVG properties, data attributes, and event handlers.
*/
function svgPropertiesAndEvents(obj) {
	var result = {};
	for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
		if (isSvgElementPropKey(key) || isDataAttribute(key) || isEventKey(key)) result[key] = obj[key];
	}
	return result;
}
//#endregion
//#region node_modules/recharts/es6/container/Surface.js
var _excluded$19 = [
	"children",
	"width",
	"height",
	"viewBox",
	"className",
	"style",
	"title",
	"desc"
];
function _extends$23() {
	return _extends$23 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$23.apply(null, arguments);
}
function _objectWithoutProperties$19(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$19(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$19(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
/**
* Renders an SVG element.
*
* All charts already include a Surface component, so you would not normally use this directly.
*
* @link https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
*/
var Surface = /* @__PURE__ */ forwardRef((props, ref) => {
	var { children, width, height, viewBox, className, style, title, desc } = props, others = _objectWithoutProperties$19(props, _excluded$19);
	var svgView = viewBox || {
		width,
		height,
		x: 0,
		y: 0
	};
	var layerClass = clsx("recharts-surface", className);
	return /* @__PURE__ */ React.createElement("svg", _extends$23({}, svgPropertiesAndEvents(others), {
		className: layerClass,
		width,
		height,
		style,
		viewBox: "".concat(svgView.x, " ").concat(svgView.y, " ").concat(svgView.width, " ").concat(svgView.height),
		ref
	}), /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("desc", null, desc), children);
});
//#endregion
//#region node_modules/recharts/es6/container/Layer.js
var _excluded$18 = ["children", "className"];
function _extends$22() {
	return _extends$22 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$22.apply(null, arguments);
}
function _objectWithoutProperties$18(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$18(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$18(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
/**
* Creates an SVG group element to group other SVG elements.
*
* Useful if you want to apply transformations or styles to a set of elements
* without affecting other elements in the SVG.
*
* @link https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/g
*/
var Layer = /* @__PURE__ */ React.forwardRef((props, ref) => {
	var { children, className } = props, others = _objectWithoutProperties$18(props, _excluded$18);
	var layerClass = clsx("recharts-layer", className);
	return /* @__PURE__ */ React.createElement("g", _extends$22({ className: layerClass }, svgPropertiesAndEvents(others), { ref }), children);
});
//#endregion
//#region node_modules/recharts/es6/context/legendPortalContext.js
var LegendPortalContext = /* @__PURE__ */ createContext(null);
//#endregion
//#region node_modules/recharts/es6/util/round.js
var defaultRoundPrecision = 4;
function round(num) {
	var factor = 10 ** (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultRoundPrecision);
	var rounded = Math.round(num * factor) / factor;
	if (Object.is(rounded, -0)) return 0;
	return rounded;
}
/**
* This function will accept a string template literal and for each
* variable placeholder, it will round the value to avoid long float numbers in
* the SVG path which might cause rendering issues in some browsers.
*/
function roundTemplateLiteral(strings) {
	for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) values[_key - 1] = arguments[_key];
	return strings.reduce((result, string, i) => {
		var value = values[i - 1];
		if (typeof value === "string") return result + value + string;
		if (value !== void 0) return result + round(value) + string;
		return result + string;
	}, "");
}
//#endregion
//#region node_modules/recharts/es6/util/DataUtils.js
var mathSign = (value) => {
	if (value === 0) return 0;
	if (value > 0) return 1;
	return -1;
};
var isNan = (value) => {
	return typeof value == "number" && value != +value;
};
var isPercent = (value) => typeof value === "string" && value.indexOf("%") === value.length - 1;
var isNumber = (value) => (typeof value === "number" || value instanceof Number) && !isNan(value);
var isNumOrStr = (value) => isNumber(value) || typeof value === "string";
var idCounter = 0;
var uniqueId = (prefix) => {
	var id = ++idCounter;
	return "".concat(prefix || "").concat(id);
};
/**
* Calculates the numeric value represented by a percent string or number, based on a total value.
*
* - If `percent` is not a number or string, returns `defaultValue`.
* - If `percent` is a percent string but `totalValue` is null/undefined, returns `defaultValue`.
* - If the result is NaN, returns `defaultValue`.
* - If `validate` is true and the result exceeds `totalValue`, returns `totalValue`.
*
* @param percent - The percent value to convert. Can be a number (e.g. 25) or a string ending with '%' (e.g. '25%').
*                  If a string, it must end with '%' to be treated as a percent; otherwise, it is parsed as a number.
* @param totalValue - The total value to calculate the percent of. Required if `percent` is a percent string.
* @param defaultValue - The value returned if `percent` is undefined, invalid, or cannot be converted to a number.
* @param validate - If true, ensures the result does not exceed `totalValue` (when provided).
* @returns The calculated value, or `defaultValue` for invalid input.
*/
var getPercentValue = function getPercentValue(percent, totalValue) {
	var defaultValue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
	var validate = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
	if (!isNumber(percent) && typeof percent !== "string") return defaultValue;
	var value;
	if (isPercent(percent)) {
		if (totalValue == null) return defaultValue;
		var index = percent.indexOf("%");
		value = totalValue * parseFloat(percent.slice(0, index)) / 100;
	} else value = +percent;
	if (isNan(value)) value = defaultValue;
	if (validate && totalValue != null && value > totalValue) value = totalValue;
	return value;
};
var hasDuplicate = (ary) => {
	if (!Array.isArray(ary)) return false;
	var len = ary.length;
	var cache = {};
	for (var i = 0; i < len; i++) if (!cache[String(ary[i])]) cache[String(ary[i])] = true;
	else return true;
	return false;
};
function interpolate(start, end, t) {
	if (isNumber(start) && isNumber(end)) return round(start + t * (end - start));
	return end;
}
function findEntryInArray(ary, specifiedKey, specifiedValue) {
	if (!ary || !ary.length) return;
	return ary.find((entry) => entry && (typeof specifiedKey === "function" ? specifiedKey(entry) : get(entry, specifiedKey)) === specifiedValue);
}
/**
* Checks if the value is null or undefined
* @param value The value to check
* @returns true if the value is null or undefined
*/
var isNullish = (value) => {
	return value === null || typeof value === "undefined";
};
/**
* Uppercase the first letter of a string
* @param {string} value The string to uppercase
* @returns {string} The uppercased string
*/
var upperFirst = (value) => {
	if (isNullish(value)) return value;
	return "".concat(value.charAt(0).toUpperCase()).concat(value.slice(1));
};
/**
* Checks if the value is not null nor undefined.
* @param value The value to check
* @returns true if the value is not null nor undefined
*/
function isNotNil(value) {
	return value != null;
}
/**
* No-operation function that does nothing.
* Useful as a placeholder or default callback function.
*/
function noop$1() {}
//#endregion
//#region node_modules/recharts/es6/shape/Symbols.js
var _excluded$17 = [
	"type",
	"size",
	"sizeType"
];
function _extends$21() {
	return _extends$21 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$21.apply(null, arguments);
}
function ownKeys$37(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$37(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$37(Object(t), !0).forEach(function(r) {
			_defineProperty$39(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$37(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$39(e, r, t) {
	return (r = _toPropertyKey$39(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$39(t) {
	var i = _toPrimitive$39(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$39(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$17(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$17(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$17(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var symbolFactories = {
	symbolCircle,
	symbolCross,
	symbolDiamond,
	symbolSquare,
	symbolStar,
	symbolTriangle,
	symbolWye
};
var RADIAN$1 = Math.PI / 180;
var getSymbolFactory = (type) => {
	return symbolFactories["symbol".concat(upperFirst(type))] || symbolCircle;
};
var calculateAreaSize = (size, sizeType, type) => {
	if (sizeType === "area") return size;
	switch (type) {
		case "cross": return 5 * size * size / 9;
		case "diamond": return .5 * size * size / Math.sqrt(3);
		case "square": return size * size;
		case "star":
			var angle = 18 * RADIAN$1;
			return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.tan(angle) ** 2);
		case "triangle": return Math.sqrt(3) * size * size / 4;
		case "wye": return (21 - 10 * Math.sqrt(3)) * size * size / 8;
		default: return Math.PI * size * size / 4;
	}
};
var registerSymbol = (key, factory) => {
	symbolFactories["symbol".concat(upperFirst(key))] = factory;
};
/**
* Renders a symbol from a set of predefined shapes.
*/
var Symbols = (_ref) => {
	var { type = "circle", size = 64, sizeType = "area" } = _ref;
	var props = _objectSpread$37(_objectSpread$37({}, _objectWithoutProperties$17(_ref, _excluded$17)), {}, {
		type,
		size,
		sizeType
	});
	var realType = "circle";
	if (typeof type === "string") realType = type;
	/**
	* Calculate the path of curve
	* @return {String} path
	*/
	var getPath = () => {
		var symbolFactory = getSymbolFactory(realType);
		var s = symbol().type(symbolFactory).size(calculateAreaSize(size, sizeType, realType))();
		if (s === null) return;
		return s;
	};
	var { className, cx, cy } = props;
	var filteredProps = svgPropertiesAndEvents(props);
	if (isNumber(cx) && isNumber(cy) && isNumber(size)) return /* @__PURE__ */ React.createElement("path", _extends$21({}, filteredProps, {
		className: clsx("recharts-symbols", className),
		transform: "translate(".concat(cx, ", ").concat(cy, ")"),
		d: getPath()
	}));
	return null;
};
Symbols.registerSymbol = registerSymbol;
//#endregion
//#region node_modules/recharts/es6/util/types.js
/**
* Determines how values are stacked:
*
* - `none` is the default, it adds values on top of each other. No smarts. Negative values will overlap.
* - `expand` make it so that the values always add up to 1 - so the chart will look like a rectangle.
* - `wiggle` and `silhouette` tries to keep the chart centered.
* - `sign` stacks positive values above zero and negative values below zero. Similar to `none` but handles negatives.
* - `positive` ignores all negative values, and then behaves like \`none\`.
*
* @see {@link https://d3js.org/d3-shape/stack#stack-offsets}
* (note that the `diverging` offset in d3 is named `sign` in recharts)
*
* @inline
*/
/**
* @deprecated use either `CartesianLayout` or `PolarLayout` instead.
* Mixing both charts families leads to ambiguity in the type system.
* These two layouts share very few properties, so it is best to keep them separate.
*/
/**
* The type of axis.
*
* `category`: Treats data as distinct values.
* Each value is in the same distance from its neighbors, regardless of their actual numeric difference.
*
* `number`: Treats data as continuous range.
* Values that are numerically closer are placed closer together on the axis.
*
* `auto`: the type is inferred based on the chart layout.
*
* This is external type - users will provide this type in props.
* Internally we will evaluate it to either 'category' or 'number' based on the layout,
* before sending it to the store.
*
* @inline
*/
/**
* Individual axes are responsible for resolving the 'auto' type to either 'number' or 'category',
* based on the chart layout and axis kind. Then they can start using this type.
*/
/**
* Extracts values from data objects.
*
* @inline
*/
/**
* @inline
*/
/**
* @inline
*/
/**
* @deprecated do not use: too many properties, mixing too many concepts, cartesian and polar together, everything optional.
* Instead, use either `Coordinate` or `PolarCoordinate`.
*/
var isPolarCoordinate = (c) => {
	return "radius" in c && "startAngle" in c && "endAngle" in c;
};
/**
* String shortcuts for scale types.
* In case none of these does what you want you can also provide your own scale function
* @see {@link CustomScaleDefinition}
*/
/**
* The type of easing function to use for animations
*
* @inline
*/
/** Specifies the duration of animation, the unit of this option is ms. */
/**
* This object defines the offset of the chart area and width and height and brush and ... it's a bit too much information all in one.
* We use it internally but let's not expose it to the outside world.
* If you are looking for this information, instead import `ChartOffset` or `PlotArea` from `recharts`.
*/
/**
* The domain of axis.
* This is the definition
*
* Numeric domain is always defined by an array of exactly two values, for the min and the max of the axis.
* Categorical domain is defined as array of all possible values.
*
* Can be specified in many ways:
* - array of numbers
* - with special strings like 'dataMin' and 'dataMax'
* - with special string math like 'dataMin - 100'
* - with keyword 'auto'
* - or a function
* - array of functions
* - or a combination of the above
*/
/**
* NumberDomain is an evaluated {@link AxisDomain}.
* Unlike {@link AxisDomain}, it has no variety - it's a tuple of two number.
* This is after all the keywords and functions were evaluated and what is left is [min, max].
*
* Know that the min, max values are not guaranteed to be nice numbers - values like -Infinity or NaN are possible.
*
* There are also `category` axes that have different things than numbers in their domain.
*/
/**
* Props shared in all renderable axes - meaning the ones that are drawn on the chart,
* can have ticks, axis line, etc.
*/
/** Defines how ticks are placed and whether / how tick collisions are handled.
* 'preserveStart' keeps the left tick on collision and ensures that the first tick is always shown.
* 'preserveEnd' keeps the right tick on collision and ensures that the last tick is always shown.
* 'preserveStartEnd' keeps the left tick on collision and ensures that the first and last ticks always show.
* 'equidistantPreserveStart' selects a number N such that every nTh tick will be shown without collision.
* 'equidistantPreserveEnd' selects a number N such that every nTh tick will be shown, ensuring the last tick is always visible.
*/
/**
* Ticks can be any type when the axis is the type of category.
*
* Ticks must be numbers when the axis is the type of number.
*
* @inline
*/
/**
* @inline
*/
/**
* @inline
*/
var adaptEventHandlers = (props, newHandler) => {
	if (!props || typeof props === "function" || typeof props === "boolean") return null;
	var inputProps = props;
	if (/* @__PURE__ */ isValidElement(props)) inputProps = props.props;
	if (typeof inputProps !== "object" && typeof inputProps !== "function") return null;
	var out = {};
	Object.keys(inputProps).forEach((key) => {
		if (isEventKey(key) && typeof inputProps[key] === "function") out[key] = newHandler || ((e) => inputProps[key](inputProps, e));
	});
	return out;
};
var getEventHandlerOfChild = (originalHandler, data, index) => (e) => {
	originalHandler(data, index, e);
	return null;
};
var adaptEventsOfChild = (props, data, index) => {
	if (props === null || typeof props !== "object" && typeof props !== "function") return null;
	var out = null;
	Object.keys(props).forEach((key) => {
		var item = props[key];
		if (isEventKey(key) && typeof item === "function") {
			if (!out) out = {};
			out[key] = getEventHandlerOfChild(item, data, index);
		}
	});
	return out;
};
//#endregion
//#region node_modules/recharts/es6/util/resolveDefaultProps.js
function ownKeys$36(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$36(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$36(Object(t), !0).forEach(function(r) {
			_defineProperty$38(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$36(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$38(e, r, t) {
	return (r = _toPropertyKey$38(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$38(t) {
	var i = _toPrimitive$38(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$38(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/**
* This function mimics the behavior of the `defaultProps` static property in React.
* Functional components do not have a defaultProps property, so this function is useful to resolve default props.
*
* The common recommendation is to use ES6 destructuring with default values in the function signature,
* but you need to be careful there and make sure you destructure all the individual properties
* and not the whole object. See the test file for example.
*
* And because destructuring all properties one by one is a faff, and it's easy to miss one property,
* this function exists.
*
* @param realProps - the props object passed to the component by the user
* @param defaultProps - the default props object defined in the component by Recharts
* @returns - the props object with all the default props resolved. All `undefined` values are replaced with the default value.
*/
function resolveDefaultProps(realProps, defaultProps) {
	var resolvedProps = _objectSpread$36({}, realProps);
	var dp = defaultProps;
	return Object.keys(defaultProps).reduce((acc, key) => {
		if (acc[key] === void 0 && dp[key] !== void 0) acc[key] = dp[key];
		return acc;
	}, resolvedProps);
}
/**
* Helper type to extract the keys of T that are required.
* It iterates through each key K in T. If Pick<T, K> cannot be assigned an empty object {},
* it means K is required, so we keep K; otherwise, we discard it (never).
* [keyof T] at the end creates a union of the kept keys.
*/
/**
* Helper type to extract the keys of T that are optional.
* It iterates through each key K in T. If Pick<T, K> can be assigned an empty object {},
* it means K is optional (or potentially missing), so we keep K; otherwise, we discard it (never).
* [keyof T] at the end creates a union of the kept keys.
*/
/**
* Helper type to ensure keys of D exist in T.
* For each key K in D, if K is also a key of T, keep the type D[K].
* If K is NOT a key of T, map it to type `never`.
* An object cannot have a property of type `never`, effectively disallowing extra keys.
*/
/**
* This type will take a source type `Props` and a default type `Defaults` and will return a new type
* where all properties that are optional in `Props` but required in `Defaults` are made required in the result.
* Properties that are required in `Props` and optional in `Defaults` will remain required.
* Properties that are optional in both `Props` and `Defaults` will remain optional.
*
* This is useful for creating a type that represents the resolved props of a component with default props.
*/
//#endregion
//#region node_modules/recharts/es6/util/payload/getUniqPayload.js
/**
* This is configuration option that decides how to filter for unique values only:
*
* - `false` means "no filter"
* - `true` means "use recharts default filter"
* - function means "use return of this function as the default key"
*/
function getUniqPayload(payload, option, defaultUniqBy) {
	if (option === true) return uniqBy(payload, defaultUniqBy);
	if (typeof option === "function") return uniqBy(payload, option);
	return payload;
}
//#endregion
//#region node_modules/recharts/es6/state/RechartsReduxContext.js
/**
* We need to use our own independent Redux context because we need to avoid interfering with other people's Redux stores
* in case they decide to install and use Recharts in another Redux app which is likely to happen.
*
* https://react-redux.js.org/using-react-redux/accessing-store#providing-custom-context
*/
var RechartsReduxContext = /* @__PURE__ */ createContext(null);
//#endregion
//#region node_modules/recharts/es6/state/hooks.js
var noopDispatch = (a) => a;
var useAppDispatch = () => {
	var context = useContext(RechartsReduxContext);
	if (context) return context.store.dispatch;
	return noopDispatch;
};
var noop = () => {};
var addNestedSubNoop = () => noop;
var refEquality = (a, b) => a === b;
/**
* This is a recharts variant of `useSelector` from 'react-redux' package.
*
* The difference is that react-redux version will throw an Error when used outside of Redux context.
*
* This, recharts version, will return undefined instead.
*
* This is because we want to allow using our components outside the Chart wrapper,
* and have people provide all props explicitly.
*
* If however they use the component inside a chart wrapper then those props become optional,
* and we read them from Redux state instead.
*
* @param selector for pulling things out of Redux store; will not be called if the store is not accessible
* @return whatever the selector returned; or undefined when outside of Redux store
*/
function useAppSelector(selector) {
	var context = useContext(RechartsReduxContext);
	var outOfContextSelector = useMemo(() => {
		if (!context) return noop;
		return (state) => {
			if (state == null) return;
			return selector(state);
		};
	}, [context, selector]);
	return useSyncExternalStoreWithSelector(context ? context.subscription.addNestedSub : addNestedSubNoop, context ? context.store.getState : noop, context ? context.store.getState : noop, outOfContextSelector, refEquality);
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/legendSelectors.js
var selectLegendSettings = (state) => state.legend.settings;
var selectLegendSize = (state) => state.legend.size;
var selectAllLegendPayload2DArray = (state) => state.legend.payload;
createSelector([selectAllLegendPayload2DArray, selectLegendSettings], (payloads, _ref) => {
	var { itemSorter } = _ref;
	var flat = payloads.flat(1);
	return itemSorter ? sortBy(flat, itemSorter) : flat;
});
//#endregion
//#region node_modules/recharts/es6/util/useElementOffset.js
var EPS = 1;
/**
* TODO this documentation does not reflect what this hook is doing, update it.
* Stores the `offsetHeight`, `offsetLeft`, `offsetTop`, and `offsetWidth` of a DOM element.
*/
/**
* Use this to listen to element layout changes.
*
* Very useful for reading actual sizes of DOM elements relative to the viewport.
*
* @param extraDependencies use this to trigger new DOM dimensions read when any of these change. Good for things like payload and label, that will re-render something down in the children array, but you want to read the layout box of a parent.
* @returns [lastElementOffset, updateElementOffset] most recent value, and setter. Pass the setter to a DOM element ref like this: `<div ref={updateElementOffset}>`
*/
function useElementOffset() {
	var extraDependencies = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
	var [lastBoundingBox, setLastBoundingBox] = useState({
		height: 0,
		left: 0,
		top: 0,
		width: 0
	});
	return [lastBoundingBox, useCallback((node) => {
		if (node != null) {
			var rect = node.getBoundingClientRect();
			var box = {
				height: rect.height,
				left: rect.left,
				top: rect.top,
				width: rect.width
			};
			if (Math.abs(box.height - lastBoundingBox.height) > EPS || Math.abs(box.left - lastBoundingBox.left) > EPS || Math.abs(box.top - lastBoundingBox.top) > EPS || Math.abs(box.width - lastBoundingBox.width) > EPS) setLastBoundingBox({
				height: box.height,
				left: box.left,
				top: box.top,
				width: box.width
			});
		}
	}, [
		lastBoundingBox.width,
		lastBoundingBox.height,
		lastBoundingBox.top,
		lastBoundingBox.left,
		...extraDependencies
	])];
}
//#endregion
//#region node_modules/recharts/es6/state/layoutSlice.js
var chartLayoutSlice = createSlice({
	name: "chartLayout",
	initialState: {
		layoutType: "horizontal",
		width: 0,
		height: 0,
		margin: {
			top: 5,
			right: 5,
			bottom: 5,
			left: 5
		},
		scale: 1
	},
	reducers: {
		setLayout(state, action) {
			state.layoutType = action.payload;
		},
		setChartSize(state, action) {
			state.width = action.payload.width;
			state.height = action.payload.height;
		},
		setMargin(state, action) {
			var _action$payload$top, _action$payload$right, _action$payload$botto, _action$payload$left;
			state.margin.top = (_action$payload$top = action.payload.top) !== null && _action$payload$top !== void 0 ? _action$payload$top : 0;
			state.margin.right = (_action$payload$right = action.payload.right) !== null && _action$payload$right !== void 0 ? _action$payload$right : 0;
			state.margin.bottom = (_action$payload$botto = action.payload.bottom) !== null && _action$payload$botto !== void 0 ? _action$payload$botto : 0;
			state.margin.left = (_action$payload$left = action.payload.left) !== null && _action$payload$left !== void 0 ? _action$payload$left : 0;
		},
		setScale(state, action) {
			state.scale = action.payload;
		}
	}
});
var { setMargin, setLayout, setChartSize, setScale } = chartLayoutSlice.actions;
var chartLayoutReducer = chartLayoutSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/util/getSliced.js
function getSliced(arr, startIndex, endIndex) {
	if (!Array.isArray(arr)) return arr;
	if (arr && startIndex + endIndex !== 0) return arr.slice(startIndex, endIndex + 1);
	return arr;
}
//#endregion
//#region node_modules/recharts/es6/util/isWellBehavedNumber.js
function isWellBehavedNumber(n) {
	return Number.isFinite(n);
}
function isPositiveNumber(n) {
	return typeof n === "number" && n > 0 && Number.isFinite(n);
}
//#endregion
//#region node_modules/recharts/es6/util/ChartUtils.js
function ownKeys$35(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$35(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$35(Object(t), !0).forEach(function(r) {
			_defineProperty$37(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$35(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$37(e, r, t) {
	return (r = _toPropertyKey$37(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$37(t) {
	var i = _toPrimitive$37(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$37(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function getValueByDataKey(obj, dataKey, defaultValue) {
	if (isNullish(obj) || isNullish(dataKey)) return defaultValue;
	if (isNumOrStr(dataKey)) return get(obj, dataKey, defaultValue);
	if (typeof dataKey === "function") return dataKey(obj);
	return defaultValue;
}
var appendOffsetOfLegend = (offset, legendSettings, legendSize) => {
	if (legendSettings && legendSize) {
		var { width: boxWidth, height: boxHeight } = legendSize;
		var { align, verticalAlign, layout } = legendSettings;
		if ((layout === "vertical" || layout === "horizontal" && verticalAlign === "middle") && align !== "center" && isNumber(offset[align])) return _objectSpread$35(_objectSpread$35({}, offset), {}, { [align]: offset[align] + (boxWidth || 0) });
		if ((layout === "horizontal" || layout === "vertical" && align === "center") && verticalAlign !== "middle" && isNumber(offset[verticalAlign])) return _objectSpread$35(_objectSpread$35({}, offset), {}, { [verticalAlign]: offset[verticalAlign] + (boxHeight || 0) });
	}
	return offset;
};
var isCategoricalAxis = (layout, axisType) => layout === "horizontal" && axisType === "xAxis" || layout === "vertical" && axisType === "yAxis" || layout === "centric" && axisType === "angleAxis" || layout === "radial" && axisType === "radiusAxis";
/**
* Calculate the Coordinates of grid
* @param  {Array} ticks           The ticks in axis
* @param {Number} minValue        The minimum value of axis
* @param {Number} maxValue        The maximum value of axis
* @param {boolean} syncWithTicks  Synchronize grid lines with ticks or not
* @return {Array}                 Coordinates
*/
var getCoordinatesOfGrid = (ticks, minValue, maxValue, syncWithTicks) => {
	if (syncWithTicks) return ticks.map((entry) => entry.coordinate);
	var hasMin, hasMax;
	var values = ticks.map((entry) => {
		if (entry.coordinate === minValue) hasMin = true;
		if (entry.coordinate === maxValue) hasMax = true;
		return entry.coordinate;
	});
	if (!hasMin) values.push(minValue);
	if (!hasMax) values.push(maxValue);
	return values;
};
/**
* Of on four almost identical implementations of tick generation.
* The four horsemen of tick generation are:
* - {@link selectTooltipAxisTicks}
* - {@link combineAxisTicks}
* - {@link getTicksOfAxis}.
* - {@link combineGraphicalItemTicks}
*/
var getTicksOfAxis = (axis, isGrid, isAll) => {
	if (!axis) return null;
	var { duplicateDomain, type, range, scale, realScaleType, isCategorical, categoricalDomain, tickCount, ticks, niceTicks, axisType } = axis;
	if (!scale) return null;
	var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
	var offset = (isGrid || isAll) && type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
	offset = axisType === "angleAxis" && range && range.length >= 2 ? mathSign(range[0] - range[1]) * 2 * offset : offset;
	if (isGrid && (ticks || niceTicks)) return (ticks || niceTicks || []).map((entry, index) => {
		var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
		var scaled = scale.map(scaleContent);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: entry,
			offset,
			index
		};
	}).filter(isNotNil);
	if (isCategorical && categoricalDomain) return categoricalDomain.map((entry, index) => {
		var scaled = scale.map(entry);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: entry,
			index,
			offset
		};
	}).filter(isNotNil);
	if (scale.ticks && !isAll && tickCount != null) return scale.ticks(tickCount).map((entry, index) => {
		var scaled = scale.map(entry);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: entry,
			index,
			offset
		};
	}).filter(isNotNil);
	return scale.domain().map((entry, index) => {
		var scaled = scale.map(entry);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: duplicateDomain ? duplicateDomain[entry] : entry,
			index,
			offset
		};
	}).filter(isNotNil);
};
/**
* Both value and domain are tuples of two numbers
* - but the type stays as array of numbers until we have better support in rest of the app
* @param value input that will be truncated
* @param domain boundaries
* @returns tuple of two numbers
*/
var truncateByDomain = (value, domain) => {
	if (!domain || domain.length !== 2 || !isNumber(domain[0]) || !isNumber(domain[1])) return value;
	var minValue = Math.min(domain[0], domain[1]);
	var maxValue = Math.max(domain[0], domain[1]);
	var result = [value[0], value[1]];
	if (!isNumber(value[0]) || value[0] < minValue) result[0] = minValue;
	if (!isNumber(value[1]) || value[1] > maxValue) result[1] = maxValue;
	if (result[0] > maxValue) result[0] = maxValue;
	if (result[1] < minValue) result[1] = minValue;
	return result;
};
/**
* Stacks all positive numbers above zero and all negative numbers below zero.
*
* If all values in the series are positive then this behaves the same as 'none' stacker.
*
* @param {Array} series from d3-shape Stack
* @return {Array} series with applied offset
*/
var offsetSign = (series) => {
	var _series$;
	var n = series.length;
	if (n <= 0) return;
	var m = (_series$ = series[0]) === null || _series$ === void 0 ? void 0 : _series$.length;
	if (m == null || m <= 0) return;
	for (var j = 0; j < m; ++j) {
		var positive = 0;
		var negative = 0;
		for (var i = 0; i < n; ++i) {
			var row = series[i];
			var col = row === null || row === void 0 ? void 0 : row[j];
			if (col == null) continue;
			var series1 = col[1];
			var series0 = col[0];
			var value = isNan(series1) ? series0 : series1;
			if (value >= 0) {
				col[0] = positive;
				positive += value;
				col[1] = positive;
			} else {
				col[0] = negative;
				negative += value;
				col[1] = negative;
			}
		}
	}
};
/**
* Replaces all negative values with zero when stacking data.
*
* If all values in the series are positive then this behaves the same as 'none' stacker.
*
* @param {Array} series from d3-shape Stack
* @return {Array} series with applied offset
*/
var offsetPositive = (series) => {
	var _series$2;
	var n = series.length;
	if (n <= 0) return;
	var m = (_series$2 = series[0]) === null || _series$2 === void 0 ? void 0 : _series$2.length;
	if (m == null || m <= 0) return;
	for (var j = 0; j < m; ++j) {
		var positive = 0;
		for (var i = 0; i < n; ++i) {
			var row = series[i];
			var col = row === null || row === void 0 ? void 0 : row[j];
			if (col == null) continue;
			var value = isNan(col[1]) ? col[0] : col[1];
			if (value >= 0) {
				col[0] = positive;
				positive += value;
				col[1] = positive;
			} else {
				col[0] = 0;
				col[1] = 0;
			}
		}
	}
};
/**
* Function type to compute offset for stacked data.
*
* d3-shape has something fishy going on with its types.
* In @definitelytyped/d3-shape, this function (the offset accessor) is typed as Series<> => void.
* However! When I actually open the storybook I can see that the offset accessor actually receives Array<Series<>>.
* The same I can see in the source code itself:
* https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/66042
* That one unfortunately has no types but we can tell it passes three-dimensional array.
*
* Which leads me to believe that definitelytyped is wrong on this one.
* There's open discussion on this topic without much attention:
* https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/66042
*/
var STACK_OFFSET_MAP = {
	sign: offsetSign,
	expand: stackOffsetExpand,
	none: stackOffsetNone,
	silhouette: stackOffsetSilhouette,
	wiggle: stackOffsetWiggle,
	positive: offsetPositive
};
var getStackedData = (data, dataKeys, offsetType) => {
	var _STACK_OFFSET_MAP$off;
	var offsetAccessor = (_STACK_OFFSET_MAP$off = STACK_OFFSET_MAP[offsetType]) !== null && _STACK_OFFSET_MAP$off !== void 0 ? _STACK_OFFSET_MAP$off : stackOffsetNone;
	var result = stack().keys(dataKeys).value((d, key) => Number(getValueByDataKey(d, key, 0))).order(stackOrderNone).offset(offsetAccessor)(data);
	result.forEach((series, seriesIndex) => {
		series.forEach((point, pointIndex) => {
			var value = getValueByDataKey(data[pointIndex], dataKeys[seriesIndex], 0);
			if (Array.isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1])) {
				point[0] = value[0];
				point[1] = value[1];
			}
		});
	});
	return result;
};
/**
* Externally, we accept both strings and numbers as stack IDs
* @inline
*/
/**
* Stack IDs in the external props allow numbers; but internally we use it as an object key
* and object keys are always strings. Also, it would be kinda confusing if stackId=8 and stackId='8' were different stacks
* so let's just force a string.
*/
function getNormalizedStackId(publicStackId) {
	return publicStackId == null ? void 0 : String(publicStackId);
}
var getCateCoordinateOfBar = (_ref2) => {
	var { axis, ticks, offset, bandSize, entry, index } = _ref2;
	if (axis.type === "category") return ticks[index] ? ticks[index].coordinate + offset : null;
	var value = getValueByDataKey(entry, axis.dataKey, axis.scale.domain()[index]);
	if (isNullish(value)) return null;
	var scaled = axis.scale.map(value);
	if (!isNumber(scaled)) return null;
	return scaled - bandSize / 2 + offset;
};
var getBaseValueOfBar = (_ref3) => {
	var { numericAxis } = _ref3;
	var domain = numericAxis.scale.domain();
	if (numericAxis.type === "number") {
		var minValue = Math.min(domain[0], domain[1]);
		var maxValue = Math.max(domain[0], domain[1]);
		if (minValue <= 0 && maxValue >= 0) return 0;
		if (maxValue < 0) return maxValue;
		return minValue;
	}
	return domain[0];
};
var getDomainOfSingle = (data) => {
	var flat = data.flat(2).filter(isNumber);
	return [Math.min(...flat), Math.max(...flat)];
};
var makeDomainFinite = (domain) => {
	return [domain[0] === Infinity ? 0 : domain[0], domain[1] === -Infinity ? 0 : domain[1]];
};
var getDomainOfStackGroups = (stackGroups, startIndex, endIndex) => {
	if (stackGroups == null) return;
	return makeDomainFinite(Object.keys(stackGroups).reduce((result, stackId) => {
		var group = stackGroups[stackId];
		if (!group) return result;
		var { stackedData } = group;
		var domain = stackedData.reduce((res, entry) => {
			var s = getDomainOfSingle(getSliced(entry, startIndex, endIndex));
			if (!isWellBehavedNumber(s[0]) || !isWellBehavedNumber(s[1])) return res;
			return [Math.min(res[0], s[0]), Math.max(res[1], s[1])];
		}, [Infinity, -Infinity]);
		return [Math.min(domain[0], result[0]), Math.max(domain[1], result[1])];
	}, [Infinity, -Infinity]));
};
var MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
/**
* Calculate the size between two category
* @param  {Object} axis  The options of axis
* @param  {Array}  ticks The ticks of axis
* @param  {Boolean} isBar if items in axis are bars
* @return {Number} Size
*/
var getBandSizeOfAxis = (axis, ticks, isBar) => {
	if (axis && axis.scale && axis.scale.bandwidth) {
		var bandWidth = axis.scale.bandwidth();
		if (!isBar || bandWidth > 0) return bandWidth;
	}
	if (axis && ticks && ticks.length >= 2) {
		var orderedTicks = sortBy(ticks, (o) => o.coordinate);
		var bandSize = Infinity;
		for (var i = 1, len = orderedTicks.length; i < len; i++) {
			var cur = orderedTicks[i];
			var prev = orderedTicks[i - 1];
			bandSize = Math.min(((cur === null || cur === void 0 ? void 0 : cur.coordinate) || 0) - ((prev === null || prev === void 0 ? void 0 : prev.coordinate) || 0), bandSize);
		}
		return bandSize === Infinity ? 0 : bandSize;
	}
	return isBar ? void 0 : 0;
};
function getTooltipEntry(_ref4) {
	var { tooltipEntrySettings, dataKey, payload, value, name } = _ref4;
	return _objectSpread$35(_objectSpread$35({}, tooltipEntrySettings), {}, {
		dataKey,
		payload,
		value,
		name
	});
}
function getTooltipNameProp(nameFromItem, dataKey) {
	if (nameFromItem) return String(nameFromItem);
	if (typeof dataKey === "string") return dataKey;
}
var calculateCartesianTooltipPos = (coordinate, layout) => {
	if (layout === "horizontal") return coordinate.relativeX;
	if (layout === "vertical") return coordinate.relativeY;
};
var calculatePolarTooltipPos = (rangeObj, layout) => {
	if (layout === "centric") return rangeObj.angle;
	return rangeObj.radius;
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/containerSelectors.js
var selectChartWidth = (state) => state.layout.width;
var selectChartHeight = (state) => state.layout.height;
var selectContainerScale = (state) => state.layout.scale;
var selectMargin = (state) => state.layout.margin;
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectAllAxes.js
var selectAllXAxes = createSelector((state) => state.cartesianAxis.xAxis, (xAxisMap) => {
	return Object.values(xAxisMap);
});
var selectAllYAxes = createSelector((state) => state.cartesianAxis.yAxis, (yAxisMap) => {
	return Object.values(yAxisMap);
});
//#endregion
//#region node_modules/recharts/es6/util/Constants.js
/**
* We use this attribute to identify which element is the one that the user is touching.
* The index is the position of the element in the data array.
* This can be either a number (for array-based charts) or a string (for the charts that have a matrix-shaped data).
*/
var DATA_ITEM_INDEX_ATTRIBUTE_NAME = "data-recharts-item-index";
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectChartOffsetInternal.js
function ownKeys$34(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$34(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$34(Object(t), !0).forEach(function(r) {
			_defineProperty$36(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$34(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$36(e, r, t) {
	return (r = _toPropertyKey$36(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$36(t) {
	var i = _toPrimitive$36(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$36(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var selectBrushHeight = (state) => state.brush.height;
function selectLeftAxesOffset(state) {
	return selectAllYAxes(state).reduce((result, entry) => {
		if (entry.orientation === "left" && !entry.mirror && !entry.hide) return result + (typeof entry.width === "number" ? entry.width : 60);
		return result;
	}, 0);
}
function selectRightAxesOffset(state) {
	return selectAllYAxes(state).reduce((result, entry) => {
		if (entry.orientation === "right" && !entry.mirror && !entry.hide) return result + (typeof entry.width === "number" ? entry.width : 60);
		return result;
	}, 0);
}
function selectTopAxesOffset(state) {
	return selectAllXAxes(state).reduce((result, entry) => {
		if (entry.orientation === "top" && !entry.mirror && !entry.hide) return result + entry.height;
		return result;
	}, 0);
}
function selectBottomAxesOffset(state) {
	return selectAllXAxes(state).reduce((result, entry) => {
		if (entry.orientation === "bottom" && !entry.mirror && !entry.hide) return result + entry.height;
		return result;
	}, 0);
}
/**
* For internal use only.
*
* @param root state
* @return ChartOffsetInternal
*/
var selectChartOffsetInternal = createSelector([
	selectChartWidth,
	selectChartHeight,
	selectMargin,
	selectBrushHeight,
	selectLeftAxesOffset,
	selectRightAxesOffset,
	selectTopAxesOffset,
	selectBottomAxesOffset,
	selectLegendSettings,
	selectLegendSize
], (chartWidth, chartHeight, margin, brushHeight, leftAxesOffset, rightAxesOffset, topAxesOffset, bottomAxesOffset, legendSettings, legendSize) => {
	var offsetH = {
		left: (margin.left || 0) + leftAxesOffset,
		right: (margin.right || 0) + rightAxesOffset
	};
	var offset = _objectSpread$34(_objectSpread$34({}, {
		top: (margin.top || 0) + topAxesOffset,
		bottom: (margin.bottom || 0) + bottomAxesOffset
	}), offsetH);
	var brushBottom = offset.bottom;
	offset.bottom += brushHeight;
	offset = appendOffsetOfLegend(offset, legendSettings, legendSize);
	var offsetWidth = chartWidth - offset.left - offset.right;
	var offsetHeight = chartHeight - offset.top - offset.bottom;
	return _objectSpread$34(_objectSpread$34({ brushBottom }, offset), {}, {
		width: Math.max(offsetWidth, 0),
		height: Math.max(offsetHeight, 0)
	});
});
var selectChartViewBox = createSelector(selectChartOffsetInternal, (offset) => ({
	x: offset.left,
	y: offset.top,
	width: offset.width,
	height: offset.height
}));
var selectAxisViewBox = createSelector(selectChartWidth, selectChartHeight, (width, height) => ({
	x: 0,
	y: 0,
	width,
	height
}));
//#endregion
//#region node_modules/recharts/es6/context/PanoramaContext.js
var PanoramaContext = /* @__PURE__ */ createContext(null);
var useIsPanorama = () => useContext(PanoramaContext) != null;
//#endregion
//#region node_modules/recharts/es6/state/selectors/brushSelectors.js
var selectBrushSettings = (state) => state.brush;
var selectBrushDimensions = createSelector([
	selectBrushSettings,
	selectChartOffsetInternal,
	selectMargin
], (brushSettings, offset, margin) => ({
	height: brushSettings.height,
	x: isNumber(brushSettings.x) ? brushSettings.x : offset.left,
	y: isNumber(brushSettings.y) ? brushSettings.y : offset.top + offset.height + offset.brushBottom - ((margin === null || margin === void 0 ? void 0 : margin.bottom) || 0),
	width: isNumber(brushSettings.width) ? brushSettings.width : offset.width
}));
//#endregion
//#region node_modules/recharts/es6/util/LogUtils.js
var isDev = true;
var warn = function warn(condition, format) {
	for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) args[_key - 2] = arguments[_key];
	if (isDev && typeof console !== "undefined" && console.warn) {
		if (format === void 0) console.warn("LogUtils requires an error message argument");
		if (!condition) if (format === void 0) console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
		else {
			var argIndex = 0;
			console.warn(format.replace(/%s/g, () => args[argIndex++]));
		}
	}
};
//#endregion
//#region node_modules/recharts/es6/component/responsiveContainerUtils.js
var defaultResponsiveContainerProps = {
	width: "100%",
	height: "100%",
	debounce: 0,
	minWidth: 0,
	initialDimension: {
		width: -1,
		height: -1
	}
};
var calculateChartDimensions = (containerWidth, containerHeight, props) => {
	var { width = defaultResponsiveContainerProps.width, height = defaultResponsiveContainerProps.height, aspect, maxHeight } = props;
	var calculatedWidth = isPercent(width) ? containerWidth : Number(width);
	var calculatedHeight = isPercent(height) ? containerHeight : Number(height);
	if (aspect && aspect > 0) {
		if (calculatedWidth) calculatedHeight = calculatedWidth / aspect;
		else if (calculatedHeight) calculatedWidth = calculatedHeight * aspect;
		if (maxHeight && calculatedHeight != null && calculatedHeight > maxHeight) calculatedHeight = maxHeight;
	}
	return {
		calculatedWidth,
		calculatedHeight
	};
};
var bothOverflow = {
	width: 0,
	height: 0,
	overflow: "visible"
};
var overflowX = {
	width: 0,
	overflowX: "visible"
};
var overflowY = {
	height: 0,
	overflowY: "visible"
};
var noStyle = {};
/**
* This zero-size, overflow-visible is required to allow the chart to shrink.
* Without it, the chart itself will fill the ResponsiveContainer, and while it allows the chart to grow,
* it would always keep the container at the size of the chart,
* and ResizeObserver would never fire.
* With this zero-size element, the chart itself never actually fills the container,
* it just so happens that it is visible because it overflows.
* I learned this trick from the `react-virtualized` library: https://github.com/bvaughn/react-virtualized-auto-sizer/blob/master/src/AutoSizer.ts
* See https://github.com/recharts/recharts/issues/172 and also https://github.com/bvaughn/react-virtualized/issues/68
*
* Also, we don't need to apply the zero-size style if the dimension is a fixed number (or undefined),
* because in that case the chart can't shrink in that dimension anyway.
* This fixes defining the dimensions using aspect ratio: https://github.com/recharts/recharts/issues/6245
*/
var getInnerDivStyle = (props) => {
	var { width, height } = props;
	var isWidthPercent = isPercent(width);
	var isHeightPercent = isPercent(height);
	if (isWidthPercent && isHeightPercent) return bothOverflow;
	if (isWidthPercent) return overflowX;
	if (isHeightPercent) return overflowY;
	return noStyle;
};
function getDefaultWidthAndHeight(_ref) {
	var { width, height, aspect } = _ref;
	var calculatedWidth = width;
	var calculatedHeight = height;
	if (calculatedWidth === void 0 && calculatedHeight === void 0) {
		calculatedWidth = defaultResponsiveContainerProps.width;
		calculatedHeight = defaultResponsiveContainerProps.height;
	} else if (calculatedWidth === void 0) calculatedWidth = aspect && aspect > 0 ? void 0 : defaultResponsiveContainerProps.width;
	else if (calculatedHeight === void 0) calculatedHeight = aspect && aspect > 0 ? void 0 : defaultResponsiveContainerProps.height;
	return {
		width: calculatedWidth,
		height: calculatedHeight
	};
}
//#endregion
//#region node_modules/recharts/es6/component/ResponsiveContainer.js
function _extends$20() {
	return _extends$20 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$20.apply(null, arguments);
}
function ownKeys$33(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$33(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$33(Object(t), !0).forEach(function(r) {
			_defineProperty$35(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$33(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$35(e, r, t) {
	return (r = _toPropertyKey$35(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$35(t) {
	var i = _toPrimitive$35(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$35(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var ResponsiveContainerContext = /* @__PURE__ */ createContext(defaultResponsiveContainerProps.initialDimension);
function isAcceptableSize(size) {
	return isPositiveNumber(size.width) && isPositiveNumber(size.height);
}
function ResponsiveContainerContextProvider(_ref) {
	var { children, width, height } = _ref;
	var size = useMemo(() => ({
		width,
		height
	}), [width, height]);
	if (!isAcceptableSize(size)) return null;
	return /* @__PURE__ */ React.createElement(ResponsiveContainerContext.Provider, { value: size }, children);
}
var useResponsiveContainerContext = () => useContext(ResponsiveContainerContext);
var SizeDetectorContainer = /* @__PURE__ */ forwardRef((_ref2, ref) => {
	var { aspect, initialDimension = defaultResponsiveContainerProps.initialDimension, width, height, minWidth = defaultResponsiveContainerProps.minWidth, minHeight, maxHeight, children, debounce = defaultResponsiveContainerProps.debounce, id, className, onResize, style = {} } = _ref2;
	var containerRef = useRef(null);
	var onResizeRef = useRef();
	onResizeRef.current = onResize;
	useImperativeHandle(ref, () => containerRef.current);
	var [sizes, setSizes] = useState({
		containerWidth: initialDimension.width,
		containerHeight: initialDimension.height
	});
	var setContainerSize = useCallback((newWidth, newHeight) => {
		setSizes((prevState) => {
			var roundedWidth = Math.round(newWidth);
			var roundedHeight = Math.round(newHeight);
			if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) return prevState;
			return {
				containerWidth: roundedWidth,
				containerHeight: roundedHeight
			};
		});
	}, []);
	useEffect(() => {
		if (containerRef.current == null || typeof ResizeObserver === "undefined") return noop$1;
		var callback = (entries) => {
			var _onResizeRef$current;
			var entry = entries[0];
			if (entry == null) return;
			var { width: containerWidth, height: containerHeight } = entry.contentRect;
			setContainerSize(containerWidth, containerHeight);
			(_onResizeRef$current = onResizeRef.current) === null || _onResizeRef$current === void 0 || _onResizeRef$current.call(onResizeRef, containerWidth, containerHeight);
		};
		if (debounce > 0) callback = throttle(callback, debounce, {
			trailing: true,
			leading: false
		});
		var observer = new ResizeObserver(callback);
		var { width: containerWidth, height: containerHeight } = containerRef.current.getBoundingClientRect();
		setContainerSize(containerWidth, containerHeight);
		observer.observe(containerRef.current);
		return () => {
			observer.disconnect();
		};
	}, [setContainerSize, debounce]);
	var { containerWidth, containerHeight } = sizes;
	warn(!aspect || aspect > 0, "The aspect(%s) must be greater than zero.", aspect);
	var { calculatedWidth, calculatedHeight } = calculateChartDimensions(containerWidth, containerHeight, {
		width,
		height,
		aspect,
		maxHeight
	});
	warn(calculatedWidth != null && calculatedWidth > 0 || calculatedHeight != null && calculatedHeight > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", calculatedWidth, calculatedHeight, width, height, minWidth, minHeight, aspect);
	return /* @__PURE__ */ React.createElement("div", {
		id: id ? "".concat(id) : void 0,
		className: clsx("recharts-responsive-container", className),
		style: _objectSpread$33(_objectSpread$33({}, style), {}, {
			width,
			height,
			minWidth,
			minHeight,
			maxHeight
		}),
		ref: containerRef
	}, /* @__PURE__ */ React.createElement("div", { style: getInnerDivStyle({
		width,
		height
	}) }, /* @__PURE__ */ React.createElement(ResponsiveContainerContextProvider, {
		width: calculatedWidth,
		height: calculatedHeight
	}, children)));
});
/**
* The `ResponsiveContainer` component is a container that adjusts its width and height based on the size of its parent element.
* It is used to create responsive charts that adapt to different screen sizes.
*
* This component uses the {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver ResizeObserver} API to monitor changes to the size of its parent element.
* If you need to support older browsers that do not support this API, you may need to include a polyfill.
*
* @see {@link https://recharts.github.io/en-US/guide/sizes/ Chart size guide}
*
* @provides ResponsiveContainerContext
*/
var ResponsiveContainer = /* @__PURE__ */ forwardRef((props, ref) => {
	var responsiveContainerContext = useResponsiveContainerContext();
	if (isPositiveNumber(responsiveContainerContext.width) && isPositiveNumber(responsiveContainerContext.height)) return props.children;
	var { width, height } = getDefaultWidthAndHeight({
		width: props.width,
		height: props.height,
		aspect: props.aspect
	});
	var { calculatedWidth, calculatedHeight } = calculateChartDimensions(void 0, void 0, {
		width,
		height,
		aspect: props.aspect,
		maxHeight: props.maxHeight
	});
	if (isNumber(calculatedWidth) && isNumber(calculatedHeight)) return /* @__PURE__ */ React.createElement(ResponsiveContainerContextProvider, {
		width: calculatedWidth,
		height: calculatedHeight
	}, props.children);
	return /* @__PURE__ */ React.createElement(SizeDetectorContainer, _extends$20({}, props, {
		width,
		height,
		ref
	}));
});
//#endregion
//#region node_modules/recharts/es6/context/chartLayoutContext.js
function cartesianViewBoxToTrapezoid(box) {
	if (!box) return;
	return {
		x: box.x,
		y: box.y,
		upperWidth: "upperWidth" in box ? box.upperWidth : box.width,
		lowerWidth: "lowerWidth" in box ? box.lowerWidth : box.width,
		width: box.width,
		height: box.height
	};
}
var useViewBox = () => {
	var _useAppSelector;
	var panorama = useIsPanorama();
	var rootViewBox = useAppSelector(selectChartViewBox);
	var brushDimensions = useAppSelector(selectBrushDimensions);
	var brushPadding = (_useAppSelector = useAppSelector(selectBrushSettings)) === null || _useAppSelector === void 0 ? void 0 : _useAppSelector.padding;
	if (!panorama || !brushDimensions || !brushPadding) return rootViewBox;
	return {
		width: brushDimensions.width - brushPadding.left - brushPadding.right,
		height: brushDimensions.height - brushPadding.top - brushPadding.bottom,
		x: brushPadding.left,
		y: brushPadding.top
	};
};
var manyComponentsThrowErrorsIfOffsetIsUndefined = {
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	width: 0,
	height: 0,
	brushBottom: 0
};
/**
* For internal use only. If you want this information, `import { useOffset } from 'recharts'` instead.
*
* Returns the offset of the chart in pixels.
*
* @returns {ChartOffsetInternal} The offset of the chart in pixels, or a default value if not in a chart context.
*/
var useOffsetInternal = () => {
	var _useAppSelector2;
	return (_useAppSelector2 = useAppSelector(selectChartOffsetInternal)) !== null && _useAppSelector2 !== void 0 ? _useAppSelector2 : manyComponentsThrowErrorsIfOffsetIsUndefined;
};
/**
* Returns the width of the chart in pixels.
*
* If you are using chart with hardcoded `width` prop, then the width returned will be the same
* as the `width` prop on the main chart element.
*
* If you are using a chart with a `ResponsiveContainer`, the width will be the size of the chart
* as the ResponsiveContainer has decided it would be.
*
* If the chart has any axes or legend, the `width` will be the size of the chart
* including the axes and legend. Meaning: adding axes and legend will not change the width.
*
* The dimensions do not scale, meaning as user zoom in and out, the width number will not change
* as the chart gets visually larger or smaller.
*
* Returns `undefined` if used outside a chart context.
*
* @returns {number | undefined} The width of the chart in pixels, or `undefined` if not in a chart context.
*/
var useChartWidth = () => {
	return useAppSelector(selectChartWidth);
};
/**
* Returns the height of the chart in pixels.
*
* If you are using chart with hardcoded `height` props, then the height returned will be the same
* as the `height` prop on the main chart element.
*
* If you are using a chart with a `ResponsiveContainer`, the height will be the size of the chart
* as the ResponsiveContainer has decided it would be.
*
* If the chart has any axes or legend, the `height` will be the size of the chart
* including the axes and legend. Meaning: adding axes and legend will not change the height.
*
* The dimensions do not scale, meaning as user zoom in and out, the height number will not change
* as the chart gets visually larger or smaller.
*
* Returns `undefined` if used outside a chart context.
*
* @returns {number | undefined} The height of the chart in pixels, or `undefined` if not in a chart context.
*/
var useChartHeight = () => {
	return useAppSelector(selectChartHeight);
};
var selectChartLayout = (state) => state.layout.layoutType;
var useChartLayout = () => useAppSelector(selectChartLayout);
var useCartesianChartLayout = () => {
	var layout = useChartLayout();
	if (layout === "horizontal" || layout === "vertical") return layout;
};
var selectPolarChartLayout = (state) => {
	var layout = state.layout.layoutType;
	if (layout === "centric" || layout === "radial") return layout;
};
/**
* Returns true if the component is rendered inside a chart context.
* Some components may be used both inside and outside of charts,
* and this hook allows them to determine if they are in a chart context or not.
*
* Other selectors may return undefined when used outside a chart context,
* or undefined when inside a chart, but without relevant data.
* This hook provides a more explicit way to check for chart context.
*
* @returns {boolean} True if in chart context, false otherwise.
*/
var useIsInChartContext = () => {
	return useChartLayout() !== void 0;
};
var ReportChartSize = (props) => {
	var dispatch = useAppDispatch();
	var isPanorama = useIsPanorama();
	var { width: widthFromProps, height: heightFromProps } = props;
	var responsiveContainerCalculations = useResponsiveContainerContext();
	var width = widthFromProps;
	var height = heightFromProps;
	if (responsiveContainerCalculations) {
		width = responsiveContainerCalculations.width > 0 ? responsiveContainerCalculations.width : widthFromProps;
		height = responsiveContainerCalculations.height > 0 ? responsiveContainerCalculations.height : heightFromProps;
	}
	useEffect(() => {
		if (!isPanorama && isPositiveNumber(width) && isPositiveNumber(height)) dispatch(setChartSize({
			width,
			height
		}));
	}, [
		dispatch,
		isPanorama,
		width,
		height
	]);
	return null;
};
//#endregion
//#region node_modules/recharts/es6/state/legendSlice.js
var legendSlice = createSlice({
	name: "legend",
	initialState: {
		settings: {
			layout: "horizontal",
			align: "center",
			verticalAlign: "middle",
			itemSorter: "value"
		},
		size: {
			width: 0,
			height: 0
		},
		payload: []
	},
	reducers: {
		setLegendSize(state, action) {
			state.size.width = action.payload.width;
			state.size.height = action.payload.height;
		},
		setLegendSettings(state, action) {
			state.settings.align = action.payload.align;
			state.settings.layout = action.payload.layout;
			state.settings.verticalAlign = action.payload.verticalAlign;
			state.settings.itemSorter = action.payload.itemSorter;
		},
		addLegendPayload: {
			reducer(state, action) {
				state.payload.push(castDraft(action.payload));
			},
			prepare: prepareAutoBatched()
		},
		replaceLegendPayload: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				var index = current(state).payload.indexOf(castDraft(prev));
				if (index > -1) state.payload[index] = castDraft(next);
			},
			prepare: prepareAutoBatched()
		},
		removeLegendPayload: {
			reducer(state, action) {
				var index = current(state).payload.indexOf(castDraft(action.payload));
				if (index > -1) state.payload.splice(index, 1);
			},
			prepare: prepareAutoBatched()
		}
	}
});
var { setLegendSize, setLegendSettings, addLegendPayload, replaceLegendPayload, removeLegendPayload } = legendSlice.actions;
var legendReducer = legendSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/util/propsAreEqual.js
var propsToShallowCompare = new Set([
	"axisLine",
	"tickLine",
	"activeBar",
	"activeDot",
	"activeLabel",
	"activeShape",
	"allowEscapeViewBox",
	"background",
	"cursor",
	"dot",
	"label",
	"line",
	"margin",
	"padding",
	"position",
	"shape",
	"style",
	"tick",
	"wrapperStyle",
	"radius",
	"throttledEvents"
]);
/**
* When comparing two values, returns true if they are the same value or
* are both NaN.
*
* If we used just a simple triple equals, we would get false negatives for two NaNs
* which could cause extra re-renders so let's have this instead.
*
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness#same-value-zero_equality
*
* @param x first value to compare
* @param y second value to compare
* return true if the same, false if different
*/
function sameValueZero(x, y) {
	if (x == null && y == null) return true;
	if (typeof x === "number" && typeof y === "number") return x === y || x !== x && y !== y;
	return x === y;
}
/**
* So usually React would compare only the first level of props using Object.is.
* However, in our case many props are objects or arrays, and our own docs recommend to do that!
* Therefore, we need a custom comparison function that does a shallow comparison of each prop value.
*
* Because charts can and do receive large props (typically the data array),
* we only limit this to a subset of known props that are likely to be objects/arrays.
*
* @param prevProps
* @param nextProps
*/
function propsAreEqual(prevProps, nextProps) {
	for (var key of new Set([...Object.keys(prevProps), ...Object.keys(nextProps)])) if (propsToShallowCompare.has(key)) {
		if (prevProps[key] == null && nextProps[key] == null) continue;
		if (!shallowEqual(prevProps[key], nextProps[key])) return false;
	} else if (!sameValueZero(prevProps[key], nextProps[key])) return false;
	return true;
}
//#endregion
//#region node_modules/recharts/es6/component/DefaultTooltipContent.js
/**
* @fileOverview Default Tooltip Content
*/
function _extends$19() {
	return _extends$19 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$19.apply(null, arguments);
}
function ownKeys$32(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$32(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$32(Object(t), !0).forEach(function(r) {
			_defineProperty$34(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$32(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$34(e, r, t) {
	return (r = _toPropertyKey$34(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$34(t) {
	var i = _toPrimitive$34(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$34(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function defaultFormatter(value) {
	return Array.isArray(value) && isNumOrStr(value[0]) && isNumOrStr(value[1]) ? value.join(" ~ ") : value;
}
/**
* @inline
*/
var defaultDefaultTooltipContentProps = {
	separator: " : ",
	contentStyle: {
		margin: 0,
		padding: 10,
		backgroundColor: "#fff",
		border: "1px solid #ccc",
		whiteSpace: "nowrap"
	},
	itemStyle: {
		display: "block",
		paddingTop: 4,
		paddingBottom: 4,
		color: "#000"
	},
	labelStyle: {},
	accessibilityLayer: false
};
function lodashLikeSortBy(array, itemSorter) {
	if (itemSorter == null) return array;
	return sortBy(array, itemSorter);
}
/**
* This component is by default rendered inside the {@link Tooltip} component. You would not use it directly.
*
* You can use this component to customize the content of the tooltip,
* or you can provide your own completely independent content.
*/
var DefaultTooltipContent = (props) => {
	var { separator = defaultDefaultTooltipContentProps.separator, contentStyle, itemStyle, labelStyle = defaultDefaultTooltipContentProps.labelStyle, payload, formatter, itemSorter, wrapperClassName, labelClassName, label, labelFormatter, accessibilityLayer = defaultDefaultTooltipContentProps.accessibilityLayer } = props;
	var renderContent = () => {
		if (payload && payload.length) {
			var listStyle = {
				padding: 0,
				margin: 0
			};
			var items = lodashLikeSortBy(payload, itemSorter).map((entry, i) => {
				if (!entry || entry.type === "none") return null;
				var finalFormatter = entry.formatter || formatter || defaultFormatter;
				var { value, name } = entry;
				var finalValue = value;
				var finalName = name;
				if (finalFormatter) {
					var formatted = finalFormatter(value, name, entry, i, payload);
					if (Array.isArray(formatted)) [finalValue, finalName] = formatted;
					else if (formatted != null) finalValue = formatted;
					else return null;
				}
				var finalItemStyle = _objectSpread$32(_objectSpread$32({}, defaultDefaultTooltipContentProps.itemStyle), {}, { color: entry.color || defaultDefaultTooltipContentProps.itemStyle.color }, itemStyle);
				return /* @__PURE__ */ React.createElement("li", {
					className: "recharts-tooltip-item",
					key: "tooltip-item-".concat(i),
					style: finalItemStyle
				}, isNumOrStr(finalName) ? /* @__PURE__ */ React.createElement("span", { className: "recharts-tooltip-item-name" }, finalName) : null, isNumOrStr(finalName) ? /* @__PURE__ */ React.createElement("span", { className: "recharts-tooltip-item-separator" }, separator) : null, /* @__PURE__ */ React.createElement("span", { className: "recharts-tooltip-item-value" }, finalValue), /* @__PURE__ */ React.createElement("span", { className: "recharts-tooltip-item-unit" }, entry.unit || ""));
			});
			return /* @__PURE__ */ React.createElement("ul", {
				className: "recharts-tooltip-item-list",
				style: listStyle
			}, items);
		}
		return null;
	};
	var finalStyle = _objectSpread$32(_objectSpread$32({}, defaultDefaultTooltipContentProps.contentStyle), contentStyle);
	var finalLabelStyle = _objectSpread$32({ margin: 0 }, labelStyle);
	var hasLabel = !isNullish(label);
	var finalLabel = hasLabel ? label : "";
	var wrapperCN = clsx("recharts-default-tooltip", wrapperClassName);
	var labelCN = clsx("recharts-tooltip-label", labelClassName);
	if (hasLabel && labelFormatter && payload !== void 0 && payload !== null) finalLabel = labelFormatter(label, payload);
	var accessibilityAttributes = accessibilityLayer ? {
		role: "status",
		"aria-live": "assertive"
	} : {};
	return /* @__PURE__ */ React.createElement("div", _extends$19({
		className: wrapperCN,
		style: finalStyle
	}, accessibilityAttributes), /* @__PURE__ */ React.createElement("p", {
		className: labelCN,
		style: finalLabelStyle
	}, /* @__PURE__ */ React.isValidElement(finalLabel) ? finalLabel : "".concat(finalLabel)), renderContent());
};
//#endregion
//#region node_modules/recharts/es6/util/tooltip/translate.js
var CSS_CLASS_PREFIX = "recharts-tooltip-wrapper";
var TOOLTIP_HIDDEN = { visibility: "hidden" };
function getTooltipCSSClassName(_ref) {
	var { coordinate, translateX, translateY } = _ref;
	return clsx(CSS_CLASS_PREFIX, {
		["".concat(CSS_CLASS_PREFIX, "-right")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX >= coordinate.x,
		["".concat(CSS_CLASS_PREFIX, "-left")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX < coordinate.x,
		["".concat(CSS_CLASS_PREFIX, "-bottom")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY >= coordinate.y,
		["".concat(CSS_CLASS_PREFIX, "-top")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY < coordinate.y
	});
}
function getTooltipTranslateXY(_ref2) {
	var { allowEscapeViewBox, coordinate, key, offset, position, reverseDirection, tooltipDimension, viewBox, viewBoxDimension } = _ref2;
	if (position && isNumber(position[key])) return position[key];
	var negative = coordinate[key] - tooltipDimension - (offset > 0 ? offset : 0);
	var positive = coordinate[key] + offset;
	if (allowEscapeViewBox[key]) return reverseDirection[key] ? negative : positive;
	var viewBoxKey = viewBox[key];
	if (viewBoxKey == null) return 0;
	if (reverseDirection[key]) {
		if (negative < viewBoxKey) return Math.max(positive, viewBoxKey);
		return Math.max(negative, viewBoxKey);
	}
	if (viewBoxDimension == null) return 0;
	if (positive + tooltipDimension > viewBoxKey + viewBoxDimension) return Math.max(negative, viewBoxKey);
	return Math.max(positive, viewBoxKey);
}
function getTransformStyle(_ref3) {
	var { translateX, translateY, useTranslate3d } = _ref3;
	return { transform: useTranslate3d ? "translate3d(".concat(translateX, "px, ").concat(translateY, "px, 0)") : "translate(".concat(translateX, "px, ").concat(translateY, "px)") };
}
function getTooltipTranslate(_ref4) {
	var { allowEscapeViewBox, coordinate, offsetTop, offsetLeft, position, reverseDirection, tooltipBox, useTranslate3d, viewBox } = _ref4;
	var cssProperties, translateX, translateY;
	if (tooltipBox.height > 0 && tooltipBox.width > 0 && coordinate) {
		translateX = getTooltipTranslateXY({
			allowEscapeViewBox,
			coordinate,
			key: "x",
			offset: offsetLeft,
			position,
			reverseDirection,
			tooltipDimension: tooltipBox.width,
			viewBox,
			viewBoxDimension: viewBox.width
		});
		translateY = getTooltipTranslateXY({
			allowEscapeViewBox,
			coordinate,
			key: "y",
			offset: offsetTop,
			position,
			reverseDirection,
			tooltipDimension: tooltipBox.height,
			viewBox,
			viewBoxDimension: viewBox.height
		});
		cssProperties = getTransformStyle({
			translateX,
			translateY,
			useTranslate3d
		});
	} else cssProperties = TOOLTIP_HIDDEN;
	return {
		cssProperties,
		cssClasses: getTooltipCSSClassName({
			translateX,
			translateY,
			coordinate
		})
	};
}
//#endregion
//#region node_modules/recharts/es6/util/Global.js
var parseIsSsrByDefault = () => !(typeof window !== "undefined" && window.document && Boolean(window.document.createElement) && window.setTimeout);
var Global = {
	devToolsEnabled: true,
	isSsr: parseIsSsrByDefault()
};
//#endregion
//#region node_modules/recharts/es6/util/usePrefersReducedMotion.js
/**
* Detects and subscribes to the user's `prefers-reduced-motion` system preference.
* Returns `true` when the user prefers reduced motion, `false` otherwise.
* SSR-safe: always returns `false` during server-side rendering.
*/
function usePrefersReducedMotion() {
	var [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
		if (Global.isSsr) return false;
		if (!window.matchMedia) return false;
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	});
	useEffect(() => {
		if (!window.matchMedia) return;
		var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		var handleChange = () => {
			setPrefersReducedMotion(mediaQuery.matches);
		};
		mediaQuery.addEventListener("change", handleChange);
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);
	return prefersReducedMotion;
}
//#endregion
//#region node_modules/recharts/es6/component/TooltipBoundingBox.js
function ownKeys$31(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$31(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$31(Object(t), !0).forEach(function(r) {
			_defineProperty$33(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$31(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$33(e, r, t) {
	return (r = _toPropertyKey$33(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$33(t) {
	var i = _toPrimitive$33(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$33(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function resolveTransitionProperty(args) {
	if (args.prefersReducedMotion && args.isAnimationActive === "auto") return;
	if (args.isAnimationActive && args.active) return "transform ".concat(args.animationDuration, "ms ").concat(args.animationEasing);
}
function TooltipBoundingBoxImpl(props) {
	var _props$coordinate3, _props$coordinate4, _props$coordinate$x2, _props$coordinate5, _props$coordinate$y2, _props$coordinate6;
	var prefersReducedMotion = usePrefersReducedMotion();
	var [state, setState] = React.useState(() => ({
		dismissed: false,
		dismissedAtCoordinate: {
			x: 0,
			y: 0
		}
	}));
	React.useEffect(() => {
		var handleKeyDown = (event) => {
			if (event.key === "Escape") {
				var _props$coordinate$x, _props$coordinate, _props$coordinate$y, _props$coordinate2;
				setState({
					dismissed: true,
					dismissedAtCoordinate: {
						x: (_props$coordinate$x = (_props$coordinate = props.coordinate) === null || _props$coordinate === void 0 ? void 0 : _props$coordinate.x) !== null && _props$coordinate$x !== void 0 ? _props$coordinate$x : 0,
						y: (_props$coordinate$y = (_props$coordinate2 = props.coordinate) === null || _props$coordinate2 === void 0 ? void 0 : _props$coordinate2.y) !== null && _props$coordinate$y !== void 0 ? _props$coordinate$y : 0
					}
				});
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [(_props$coordinate3 = props.coordinate) === null || _props$coordinate3 === void 0 ? void 0 : _props$coordinate3.x, (_props$coordinate4 = props.coordinate) === null || _props$coordinate4 === void 0 ? void 0 : _props$coordinate4.y]);
	if (state.dismissed && (((_props$coordinate$x2 = (_props$coordinate5 = props.coordinate) === null || _props$coordinate5 === void 0 ? void 0 : _props$coordinate5.x) !== null && _props$coordinate$x2 !== void 0 ? _props$coordinate$x2 : 0) !== state.dismissedAtCoordinate.x || ((_props$coordinate$y2 = (_props$coordinate6 = props.coordinate) === null || _props$coordinate6 === void 0 ? void 0 : _props$coordinate6.y) !== null && _props$coordinate$y2 !== void 0 ? _props$coordinate$y2 : 0) !== state.dismissedAtCoordinate.y)) setState(_objectSpread$31(_objectSpread$31({}, state), {}, { dismissed: false }));
	var { cssClasses, cssProperties } = getTooltipTranslate({
		allowEscapeViewBox: props.allowEscapeViewBox,
		coordinate: props.coordinate,
		offsetLeft: typeof props.offset === "number" ? props.offset : props.offset.x,
		offsetTop: typeof props.offset === "number" ? props.offset : props.offset.y,
		position: props.position,
		reverseDirection: props.reverseDirection,
		tooltipBox: {
			height: props.lastBoundingBox.height,
			width: props.lastBoundingBox.width
		},
		useTranslate3d: props.useTranslate3d,
		viewBox: props.viewBox
	});
	var outerStyle = _objectSpread$31(_objectSpread$31({}, props.hasPortalFromProps ? {} : _objectSpread$31(_objectSpread$31({ transition: resolveTransitionProperty({
		prefersReducedMotion,
		isAnimationActive: props.isAnimationActive,
		active: props.active,
		animationDuration: props.animationDuration,
		animationEasing: props.animationEasing
	}) }, cssProperties), {}, {
		pointerEvents: "none",
		position: "absolute",
		top: 0,
		left: 0
	})), {}, { visibility: !state.dismissed && props.active && props.hasPayload ? "visible" : "hidden" }, props.wrapperStyle);
	return /* @__PURE__ */ React.createElement("div", {
		xmlns: "http://www.w3.org/1999/xhtml",
		tabIndex: -1,
		className: cssClasses,
		style: outerStyle,
		ref: props.innerRef
	}, props.children);
}
var TooltipBoundingBox = /* @__PURE__ */ React.memo(TooltipBoundingBoxImpl);
//#endregion
//#region node_modules/recharts/es6/context/accessibilityContext.js
var useAccessibilityLayer = () => {
	var _useAppSelector;
	return (_useAppSelector = useAppSelector((state) => state.rootProps.accessibilityLayer)) !== null && _useAppSelector !== void 0 ? _useAppSelector : true;
};
//#endregion
//#region node_modules/recharts/es6/shape/Curve.js
/**
* @fileOverview Curve
*/
function _extends$18() {
	return _extends$18 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$18.apply(null, arguments);
}
function ownKeys$30(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$30(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$30(Object(t), !0).forEach(function(r) {
			_defineProperty$32(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$30(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$32(e, r, t) {
	return (r = _toPropertyKey$32(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$32(t) {
	var i = _toPrimitive$32(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$32(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var CURVE_FACTORIES = {
	curveBasisClosed,
	curveBasisOpen,
	curveBasis,
	curveBumpX,
	curveBumpY,
	curveLinearClosed,
	curveLinear,
	curveMonotoneX,
	curveMonotoneY,
	curveNatural,
	curveStep,
	curveStepAfter,
	curveStepBefore
};
/**
* @inline
*/
/**
* @inline
*/
var defined = (p) => isWellBehavedNumber(p.x) && isWellBehavedNumber(p.y);
var areaDefined = (d) => d.base != null && defined(d.base) && defined(d);
var getX = (p) => p.x;
var getY = (p) => p.y;
var getCurveFactory = (type, layout) => {
	if (typeof type === "function") return type;
	var name = "curve".concat(upperFirst(type));
	if ((name === "curveMonotone" || name === "curveBump") && layout) {
		var factory = CURVE_FACTORIES["".concat(name).concat(layout === "vertical" ? "Y" : "X")];
		if (factory) return factory;
	}
	return CURVE_FACTORIES[name] || curveLinear;
};
var defaultCurveProps = {
	connectNulls: false,
	type: "linear"
};
/**
* Calculate the path of curve. Returns null if points is an empty array.
* @return path or null
*/
var getPath$1 = (_ref) => {
	var { type = defaultCurveProps.type, points = [], baseLine, layout, connectNulls = defaultCurveProps.connectNulls } = _ref;
	var curveFactory = getCurveFactory(type, layout);
	var formatPoints = connectNulls ? points.filter(defined) : points;
	if (Array.isArray(baseLine)) {
		var _lineFunction;
		var areaPoints = points.map((entry, index) => _objectSpread$30(_objectSpread$30({}, entry), {}, { base: baseLine[index] }));
		if (layout === "vertical") _lineFunction = area().y(getY).x1(getX).x0((d) => d.base.x);
		else _lineFunction = area().x(getX).y1(getY).y0((d) => d.base.y);
		return _lineFunction.defined(areaDefined).curve(curveFactory)(connectNulls ? areaPoints.filter(areaDefined) : areaPoints);
	}
	var lineFunction;
	if (layout === "vertical" && isNumber(baseLine)) lineFunction = area().y(getY).x1(getX).x0(baseLine);
	else if (isNumber(baseLine)) lineFunction = area().x(getX).y1(getY).y0(baseLine);
	else lineFunction = line().x(getX).y(getY);
	return lineFunction.defined(defined).curve(curveFactory)(formatPoints);
};
var Curve = (props) => {
	var { className, points, path, pathRef } = props;
	var layout = useChartLayout();
	if ((!points || !points.length) && !path) return null;
	var getPathInput = {
		type: props.type,
		points: props.points,
		baseLine: props.baseLine,
		layout: props.layout || layout,
		connectNulls: props.connectNulls
	};
	var realPath = points && points.length ? getPath$1(getPathInput) : path;
	return /* @__PURE__ */ React.createElement("path", _extends$18({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
		className: clsx("recharts-curve", className),
		d: realPath === null ? void 0 : realPath,
		ref: pathRef
	}));
};
//#endregion
//#region node_modules/recharts/es6/shape/Cross.js
/**
* @fileOverview Cross
*/
var _excluded$16 = [
	"x",
	"y",
	"top",
	"left",
	"width",
	"height",
	"className"
];
function _extends$17() {
	return _extends$17 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$17.apply(null, arguments);
}
function ownKeys$29(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$29(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$29(Object(t), !0).forEach(function(r) {
			_defineProperty$31(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$29(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$31(e, r, t) {
	return (r = _toPropertyKey$31(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$31(t) {
	var i = _toPrimitive$31(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$31(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$16(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$16(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$16(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var getPath = (x, y, width, height, top, left) => {
	return "M".concat(x, ",").concat(top, "v").concat(height, "M").concat(left, ",").concat(y, "h").concat(width);
};
var Cross = (_ref) => {
	var { x = 0, y = 0, top = 0, left = 0, width = 0, height = 0, className } = _ref, rest = _objectWithoutProperties$16(_ref, _excluded$16);
	var props = _objectSpread$29({
		x,
		y,
		top,
		left,
		width,
		height
	}, rest);
	if (!isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height) || !isNumber(top) || !isNumber(left)) return null;
	return /* @__PURE__ */ React.createElement("path", _extends$17({}, svgPropertiesAndEvents(props), {
		className: clsx("recharts-cross", className),
		d: getPath(x, y, width, height, top, left)
	}));
};
//#endregion
//#region node_modules/recharts/es6/util/cursor/getCursorRectangle.js
function getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize) {
	var halfSize = tooltipAxisBandSize / 2;
	return {
		stroke: "none",
		fill: "#ccc",
		x: layout === "horizontal" ? activeCoordinate.x - halfSize : offset.left + .5,
		y: layout === "horizontal" ? offset.top + .5 : activeCoordinate.y - halfSize,
		width: layout === "horizontal" ? tooltipAxisBandSize : offset.width - 1,
		height: layout === "horizontal" ? offset.height - 1 : tooltipAxisBandSize
	};
}
//#endregion
//#region node_modules/recharts/es6/animation/util.js
function ownKeys$28(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$28(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$28(Object(t), !0).forEach(function(r) {
			_defineProperty$30(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$28(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$30(e, r, t) {
	return (r = _toPropertyKey$30(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$30(t) {
	var i = _toPrimitive$30(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$30(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getDashCase = (name) => name.replace(/([A-Z])/g, (v) => "-".concat(v.toLowerCase()));
var getTransitionVal = (props, duration, easing) => props.map((prop) => "".concat(getDashCase(prop), " ").concat(duration, "ms ").concat(easing)).join(",");
/**
* Finds the intersection of keys between two objects
* @param {object} preObj previous object
* @param {object} nextObj next object
* @returns an array of keys that exist in both objects
*/
var getIntersectionKeys = (preObj, nextObj) => [Object.keys(preObj), Object.keys(nextObj)].reduce((a, b) => a.filter((c) => b.includes(c)));
/**
* Maps an object to another object
* @param {function} fn function to map
* @param {object} obj object to map
* @returns mapped object
*/
var mapObject = (fn, obj) => Object.keys(obj).reduce((res, key) => _objectSpread$28(_objectSpread$28({}, res), {}, { [key]: fn(key, obj[key]) }), {});
//#endregion
//#region node_modules/recharts/es6/animation/configUpdate.js
function ownKeys$27(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$27(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$27(Object(t), !0).forEach(function(r) {
			_defineProperty$29(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$27(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$29(e, r, t) {
	return (r = _toPropertyKey$29(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$29(t) {
	var i = _toPrimitive$29(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$29(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var alpha = (begin, end, k) => begin + (end - begin) * k;
var needContinue = (_ref) => {
	var { from, to } = _ref;
	return from !== to;
};
var calStepperVals = (easing, preVals, steps) => {
	var nextStepVals = mapObject((key, val) => {
		if (needContinue(val)) {
			var [newX, newV] = easing(val.from, val.to, val.velocity);
			return _objectSpread$27(_objectSpread$27({}, val), {}, {
				from: newX,
				velocity: newV
			});
		}
		return val;
	}, preVals);
	if (steps < 1) return mapObject((key, val) => {
		if (needContinue(val) && nextStepVals[key] != null) return _objectSpread$27(_objectSpread$27({}, val), {}, {
			velocity: alpha(val.velocity, nextStepVals[key].velocity, steps),
			from: alpha(val.from, nextStepVals[key].from, steps)
		});
		return val;
	}, preVals);
	return calStepperVals(easing, nextStepVals, steps - 1);
};
function createStepperUpdate(from, to, easing, interKeys, render, timeoutController) {
	var preTime;
	var stepperStyle = interKeys.reduce((res, key) => _objectSpread$27(_objectSpread$27({}, res), {}, { [key]: {
		from: from[key],
		velocity: 0,
		to: to[key]
	} }), {});
	var getCurrStyle = () => mapObject((key, val) => val.from, stepperStyle);
	var shouldStopAnimation = () => !Object.values(stepperStyle).filter(needContinue).length;
	var stopAnimation = null;
	var stepperUpdate = (now) => {
		if (!preTime) preTime = now;
		var steps = (now - preTime) / easing.dt;
		stepperStyle = calStepperVals(easing, stepperStyle, steps);
		render(_objectSpread$27(_objectSpread$27(_objectSpread$27({}, from), to), getCurrStyle()));
		preTime = now;
		if (!shouldStopAnimation()) stopAnimation = timeoutController.setTimeout(stepperUpdate);
	};
	return () => {
		stopAnimation = timeoutController.setTimeout(stepperUpdate);
		return () => {
			var _stopAnimation;
			(_stopAnimation = stopAnimation) === null || _stopAnimation === void 0 || _stopAnimation();
		};
	};
}
function createTimingUpdate(from, to, easing, duration, interKeys, render, timeoutController) {
	var stopAnimation = null;
	var timingStyle = interKeys.reduce((res, key) => {
		var fromElement = from[key];
		var toElement = to[key];
		if (fromElement == null || toElement == null) return res;
		return _objectSpread$27(_objectSpread$27({}, res), {}, { [key]: [fromElement, toElement] });
	}, {});
	var beginTime;
	var timingUpdate = (now) => {
		if (!beginTime) beginTime = now;
		var t = (now - beginTime) / duration;
		var currStyle = mapObject((key, val) => alpha(...val, easing(t)), timingStyle);
		render(_objectSpread$27(_objectSpread$27(_objectSpread$27({}, from), to), currStyle));
		if (t < 1) stopAnimation = timeoutController.setTimeout(timingUpdate);
		else {
			var finalStyle = mapObject((key, val) => alpha(...val, easing(1)), timingStyle);
			render(_objectSpread$27(_objectSpread$27(_objectSpread$27({}, from), to), finalStyle));
		}
	};
	return () => {
		stopAnimation = timeoutController.setTimeout(timingUpdate);
		return () => {
			var _stopAnimation2;
			(_stopAnimation2 = stopAnimation) === null || _stopAnimation2 === void 0 || _stopAnimation2();
		};
	};
}
var configUpdate_default = (from, to, easing, duration, render, timeoutController) => {
	var interKeys = getIntersectionKeys(from, to);
	if (easing == null) return () => {
		render(_objectSpread$27(_objectSpread$27({}, from), to));
		return () => {};
	};
	return easing.isStepper === true ? createStepperUpdate(from, to, easing, interKeys, render, timeoutController) : createTimingUpdate(from, to, easing, duration, interKeys, render, timeoutController);
};
var cubicBezierFactor = (c1, c2) => [
	0,
	3 * c1,
	3 * c2 - 6 * c1,
	3 * c1 - 3 * c2 + 1
];
var evaluatePolynomial = (params, t) => params.map((param, i) => param * t ** i).reduce((pre, curr) => pre + curr);
var cubicBezier = (c1, c2) => (t) => {
	return evaluatePolynomial(cubicBezierFactor(c1, c2), t);
};
var derivativeCubicBezier = (c1, c2) => (t) => {
	return evaluatePolynomial([...cubicBezierFactor(c1, c2).map((param, i) => param * i).slice(1), 0], t);
};
var parseCubicBezier = (easing) => {
	var _easingParts$;
	var easingParts = easing.split("(");
	if (easingParts.length !== 2 || easingParts[0] !== "cubic-bezier") return null;
	var numbers = (_easingParts$ = easingParts[1]) === null || _easingParts$ === void 0 || (_easingParts$ = _easingParts$.split(")")[0]) === null || _easingParts$ === void 0 ? void 0 : _easingParts$.split(",");
	if (numbers == null || numbers.length !== 4) return null;
	var coords = numbers.map((x) => parseFloat(x));
	return [
		coords[0],
		coords[1],
		coords[2],
		coords[3]
	];
};
var getBezierCoordinates = function getBezierCoordinates() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	if (args.length === 1) switch (args[0]) {
		case "linear": return [
			0,
			0,
			1,
			1
		];
		case "ease": return [
			.25,
			.1,
			.25,
			1
		];
		case "ease-in": return [
			.42,
			0,
			1,
			1
		];
		case "ease-out": return [
			.42,
			0,
			.58,
			1
		];
		case "ease-in-out": return [
			0,
			0,
			.58,
			1
		];
		default:
			var easing = parseCubicBezier(args[0]);
			if (easing) return easing;
	}
	if (args.length === 4) return args;
	return [
		0,
		0,
		1,
		1
	];
};
var createBezierEasing = (x1, y1, x2, y2) => {
	var curveX = cubicBezier(x1, x2);
	var curveY = cubicBezier(y1, y2);
	var derCurveX = derivativeCubicBezier(x1, x2);
	var rangeValue = (value) => {
		if (value > 1) return 1;
		if (value < 0) return 0;
		return value;
	};
	var bezier = (_t) => {
		var t = _t > 1 ? 1 : _t;
		var x = t;
		for (var i = 0; i < 8; ++i) {
			var evalT = curveX(x) - t;
			var derVal = derCurveX(x);
			if (Math.abs(evalT - t) < 1e-4 || derVal < 1e-4) return curveY(x);
			x = rangeValue(x - evalT / derVal);
		}
		return curveY(x);
	};
	bezier.isStepper = false;
	return bezier;
};
var configBezier = function configBezier() {
	return createBezierEasing(...getBezierCoordinates(...arguments));
};
var configSpring = function configSpring() {
	var { stiff = 100, damping = 8, dt = 17 } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
	var stepper = (currX, destX, currV) => {
		var newV = currV + (-(currX - destX) * stiff - currV * damping) * dt / 1e3;
		var newX = currV * dt / 1e3 + currX;
		if (Math.abs(newX - destX) < 1e-4 && Math.abs(newV) < 1e-4) return [destX, 0];
		return [newX, newV];
	};
	stepper.isStepper = true;
	stepper.dt = dt;
	return stepper;
};
var configEasing = (easing) => {
	if (typeof easing === "string") switch (easing) {
		case "ease":
		case "ease-in-out":
		case "ease-out":
		case "ease-in":
		case "linear": return configBezier(easing);
		case "spring": return configSpring();
		default: if (easing.split("(")[0] === "cubic-bezier") return configBezier(easing);
	}
	if (typeof easing === "function") return easing;
	return null;
};
//#endregion
//#region node_modules/recharts/es6/animation/AnimationManager.js
/**
* Represents a single item in the ReactSmoothQueue.
* The item can be:
* - A number representing a delay in milliseconds.
* - An object representing a style change
* - A StartAnimationFunction that starts eased transition and calls different render
*      because of course in Recharts we have to have three ways to do everything
* - An arbitrary function to be executed
*/
function createAnimateManager(timeoutController) {
	var currStyle;
	var handleChange = () => null;
	var shouldStop = false;
	var cancelTimeout = null;
	var setStyle = (_style) => {
		if (shouldStop) return;
		if (Array.isArray(_style)) {
			if (!_style.length) return;
			var [curr, ...restStyles] = _style;
			if (typeof curr === "number") {
				cancelTimeout = timeoutController.setTimeout(setStyle.bind(null, restStyles), curr);
				return;
			}
			setStyle(curr);
			cancelTimeout = timeoutController.setTimeout(setStyle.bind(null, restStyles));
			return;
		}
		if (typeof _style === "string") {
			currStyle = _style;
			handleChange(currStyle);
		}
		if (typeof _style === "object") {
			currStyle = _style;
			handleChange(currStyle);
		}
		if (typeof _style === "function") _style();
	};
	return {
		stop: () => {
			shouldStop = true;
		},
		start: (style) => {
			shouldStop = false;
			if (cancelTimeout) {
				cancelTimeout();
				cancelTimeout = null;
			}
			setStyle(style);
		},
		subscribe: (_handleChange) => {
			handleChange = _handleChange;
			return () => {
				handleChange = () => null;
			};
		},
		getTimeoutController: () => timeoutController
	};
}
//#endregion
//#region node_modules/recharts/es6/animation/timeoutController.js
/**
* Callback type for the timeout function.
* Receives current time in milliseconds as an argument.
*/
/**
* A function that, when called, cancels the timeout.
*/
var RequestAnimationFrameTimeoutController = class {
	setTimeout(callback) {
		var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
		var startTime = performance.now();
		var requestId = null;
		var executeCallback = (now) => {
			if (now - startTime >= delay) callback(now);
			else if (typeof requestAnimationFrame === "function") requestId = requestAnimationFrame(executeCallback);
		};
		requestId = requestAnimationFrame(executeCallback);
		return () => {
			if (requestId != null) cancelAnimationFrame(requestId);
		};
	}
};
//#endregion
//#region node_modules/recharts/es6/animation/createDefaultAnimationManager.js
function createDefaultAnimationManager() {
	return createAnimateManager(new RequestAnimationFrameTimeoutController());
}
//#endregion
//#region node_modules/recharts/es6/animation/useAnimationManager.js
var AnimationManagerContext = /* @__PURE__ */ createContext(createDefaultAnimationManager);
function useAnimationManager(animationId, animationManagerFromProps) {
	var contextAnimationManager = useContext(AnimationManagerContext);
	return useMemo(() => animationManagerFromProps !== null && animationManagerFromProps !== void 0 ? animationManagerFromProps : contextAnimationManager(animationId), [
		animationId,
		animationManagerFromProps,
		contextAnimationManager
	]);
}
//#endregion
//#region node_modules/recharts/es6/animation/JavascriptAnimate.js
var defaultJavascriptAnimateProps = {
	begin: 0,
	duration: 1e3,
	easing: "ease",
	isActive: true,
	canBegin: true,
	onAnimationEnd: () => {},
	onAnimationStart: () => {}
};
var from = { t: 0 };
var to = { t: 1 };
function JavascriptAnimate(outsideProps) {
	var props = resolveDefaultProps(outsideProps, defaultJavascriptAnimateProps);
	var { isActive: isActiveProp, canBegin, duration, easing, begin, onAnimationEnd, onAnimationStart, children } = props;
	var prefersReducedMotion = usePrefersReducedMotion();
	var isActive = isActiveProp === "auto" ? !Global.isSsr && !prefersReducedMotion : isActiveProp;
	var animationManager = useAnimationManager(props.animationId, props.animationManager);
	var [style, setStyle] = useState(isActive ? from : to);
	var stopJSAnimation = useRef(null);
	useEffect(() => {
		if (!isActive) setStyle(to);
	}, [isActive]);
	useEffect(() => {
		if (!isActive || !canBegin) return noop$1;
		var startAnimation = configUpdate_default(from, to, configEasing(easing), duration, setStyle, animationManager.getTimeoutController());
		var onAnimationActive = () => {
			stopJSAnimation.current = startAnimation();
		};
		animationManager.start([
			onAnimationStart,
			begin,
			onAnimationActive,
			duration,
			onAnimationEnd
		]);
		return () => {
			animationManager.stop();
			if (stopJSAnimation.current) stopJSAnimation.current();
			onAnimationEnd();
		};
	}, [
		isActive,
		canBegin,
		duration,
		easing,
		begin,
		onAnimationStart,
		onAnimationEnd,
		animationManager
	]);
	return children(style.t);
}
//#endregion
//#region node_modules/recharts/es6/util/useAnimationId.js
/**
* This hook returns a unique animation id for the object input.
* If input changes (as in, reference equality is different), the animation id will change.
* If input does not change, the animation id will not change.
*
* This is useful for animations. The Animate component
* does have a `shouldReAnimate` prop but that doesn't seem to be doing what the name implies.
* Also, we don't always want to re-animate on every render;
* we only want to re-animate when the input changes. Not the internal state (e.g. `isAnimating`).
*
* @param input The object to check for changes. Uses reference equality (=== operator)
* @param prefix Optional prefix to use for the animation id
* @returns A unique animation id
*/
function useAnimationId(input) {
	var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-";
	var animationId = useRef(uniqueId(prefix));
	var prevProps = useRef(input);
	if (prevProps.current !== input) {
		animationId.current = uniqueId(prefix);
		prevProps.current = input;
	}
	return animationId.current;
}
//#endregion
//#region node_modules/recharts/es6/shape/Rectangle.js
/**
* @fileOverview Rectangle
*/
var _excluded$15 = ["radius"], _excluded2$8 = ["radius"];
var _templateObject$2, _templateObject2$2, _templateObject3$2, _templateObject4$2, _templateObject5$2, _templateObject6$1, _templateObject7$1, _templateObject8, _templateObject9, _templateObject0;
function ownKeys$26(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$26(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$26(Object(t), !0).forEach(function(r) {
			_defineProperty$28(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$26(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$28(e, r, t) {
	return (r = _toPropertyKey$28(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$28(t) {
	var i = _toPrimitive$28(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$28(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$16() {
	return _extends$16 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$16.apply(null, arguments);
}
function _objectWithoutProperties$15(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$15(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$15(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _taggedTemplateLiteral$2(e, t) {
	return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
/**
* @inline
*/
var getRectanglePath = (x, y, width, height, radius) => {
	var roundedWidth = round(width);
	var roundedHeight = round(height);
	var maxRadius = Math.min(Math.abs(roundedWidth) / 2, Math.abs(roundedHeight) / 2);
	var ySign = roundedHeight >= 0 ? 1 : -1;
	var xSign = roundedWidth >= 0 ? 1 : -1;
	var clockWise = roundedHeight >= 0 && roundedWidth >= 0 || roundedHeight < 0 && roundedWidth < 0 ? 1 : 0;
	var path;
	if (maxRadius > 0 && Array.isArray(radius)) {
		var newRadius = [
			0,
			0,
			0,
			0
		];
		for (var i = 0, len = 4; i < len; i++) {
			var _radius$i;
			var r = (_radius$i = radius[i]) !== null && _radius$i !== void 0 ? _radius$i : 0;
			newRadius[i] = r > maxRadius ? maxRadius : r;
		}
		path = roundTemplateLiteral(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral$2([
			"M",
			",",
			""
		])), x, y + ySign * newRadius[0]);
		if (newRadius[0] > 0) path += roundTemplateLiteral(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteral$2([
			"A ",
			",",
			",0,0,",
			",",
			",",
			""
		])), newRadius[0], newRadius[0], clockWise, x + xSign * newRadius[0], y);
		path += roundTemplateLiteral(_templateObject3$2 || (_templateObject3$2 = _taggedTemplateLiteral$2([
			"L ",
			",",
			""
		])), x + width - xSign * newRadius[1], y);
		if (newRadius[1] > 0) path += roundTemplateLiteral(_templateObject4$2 || (_templateObject4$2 = _taggedTemplateLiteral$2([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		])), newRadius[1], newRadius[1], clockWise, x + width, y + ySign * newRadius[1]);
		path += roundTemplateLiteral(_templateObject5$2 || (_templateObject5$2 = _taggedTemplateLiteral$2([
			"L ",
			",",
			""
		])), x + width, y + height - ySign * newRadius[2]);
		if (newRadius[2] > 0) path += roundTemplateLiteral(_templateObject6$1 || (_templateObject6$1 = _taggedTemplateLiteral$2([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		])), newRadius[2], newRadius[2], clockWise, x + width - xSign * newRadius[2], y + height);
		path += roundTemplateLiteral(_templateObject7$1 || (_templateObject7$1 = _taggedTemplateLiteral$2([
			"L ",
			",",
			""
		])), x + xSign * newRadius[3], y + height);
		if (newRadius[3] > 0) path += roundTemplateLiteral(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral$2([
			"A ",
			",",
			",0,0,",
			",\n        ",
			",",
			""
		])), newRadius[3], newRadius[3], clockWise, x, y + height - ySign * newRadius[3]);
		path += "Z";
	} else if (maxRadius > 0 && radius === +radius && radius > 0) {
		var _newRadius = Math.min(maxRadius, radius);
		path = roundTemplateLiteral(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral$2([
			"M ",
			",",
			"\n            A ",
			",",
			",0,0,",
			",",
			",",
			"\n            L ",
			",",
			"\n            A ",
			",",
			",0,0,",
			",",
			",",
			"\n            L ",
			",",
			"\n            A ",
			",",
			",0,0,",
			",",
			",",
			"\n            L ",
			",",
			"\n            A ",
			",",
			",0,0,",
			",",
			",",
			" Z"
		])), x, y + ySign * _newRadius, _newRadius, _newRadius, clockWise, x + xSign * _newRadius, y, x + width - xSign * _newRadius, y, _newRadius, _newRadius, clockWise, x + width, y + ySign * _newRadius, x + width, y + height - ySign * _newRadius, _newRadius, _newRadius, clockWise, x + width - xSign * _newRadius, y + height, x + xSign * _newRadius, y + height, _newRadius, _newRadius, clockWise, x, y + height - ySign * _newRadius);
	} else path = roundTemplateLiteral(_templateObject0 || (_templateObject0 = _taggedTemplateLiteral$2([
		"M ",
		",",
		" h ",
		" v ",
		" h ",
		" Z"
	])), x, y, width, height, -width);
	return path;
};
var defaultRectangleProps = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	radius: 0,
	isAnimationActive: false,
	isUpdateAnimationActive: false,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease"
};
/**
* Renders a rectangle element. Unlike the {@link https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/rect rect SVG element}, this component supports rounded corners
* and animation.
*
* This component accepts X and Y coordinates in pixels.
* If you need to position the rectangle based on your chart's data,
* consider using the {@link ReferenceArea} component instead.
*
* @param rectangleProps
* @constructor
*/
var Rectangle = (rectangleProps) => {
	var props = resolveDefaultProps(rectangleProps, defaultRectangleProps);
	var pathRef = useRef(null);
	var [totalLength, setTotalLength] = useState(-1);
	useEffect(() => {
		if (pathRef.current && pathRef.current.getTotalLength) try {
			var pathTotalLength = pathRef.current.getTotalLength();
			if (pathTotalLength) setTotalLength(pathTotalLength);
		} catch (_unused) {}
	}, []);
	var { x, y, width, height, radius, className } = props;
	var { animationEasing, animationDuration, animationBegin, isAnimationActive, isUpdateAnimationActive } = props;
	var prevWidthRef = useRef(width);
	var prevHeightRef = useRef(height);
	var prevXRef = useRef(x);
	var prevYRef = useRef(y);
	var animationId = useAnimationId(useMemo(() => ({
		x,
		y,
		width,
		height,
		radius
	}), [
		x,
		y,
		width,
		height,
		radius
	]), "rectangle-");
	if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) return null;
	var layerClass = clsx("recharts-rectangle", className);
	if (!isUpdateAnimationActive) {
		var _svgPropertiesAndEven = svgPropertiesAndEvents(props), { radius: _ } = _svgPropertiesAndEven, otherPathProps = _objectWithoutProperties$15(_svgPropertiesAndEven, _excluded$15);
		return /* @__PURE__ */ React.createElement("path", _extends$16({}, otherPathProps, {
			x: round(x),
			y: round(y),
			width: round(width),
			height: round(height),
			radius: typeof radius === "number" ? radius : void 0,
			className: layerClass,
			d: getRectanglePath(x, y, width, height, radius)
		}));
	}
	var prevWidth = prevWidthRef.current;
	var prevHeight = prevHeightRef.current;
	var prevX = prevXRef.current;
	var prevY = prevYRef.current;
	var from = "0px ".concat(totalLength === -1 ? 1 : totalLength, "px");
	var to = "".concat(totalLength, "px ").concat(totalLength, "px");
	var transition = getTransitionVal(["strokeDasharray"], animationDuration, typeof animationEasing === "string" ? animationEasing : defaultRectangleProps.animationEasing);
	return /* @__PURE__ */ React.createElement(JavascriptAnimate, {
		animationId,
		key: animationId,
		canBegin: totalLength > 0,
		duration: animationDuration,
		easing: animationEasing,
		isActive: isUpdateAnimationActive,
		begin: animationBegin
	}, (t) => {
		var currWidth = interpolate(prevWidth, width, t);
		var currHeight = interpolate(prevHeight, height, t);
		var currX = interpolate(prevX, x, t);
		var currY = interpolate(prevY, y, t);
		if (pathRef.current) {
			prevWidthRef.current = currWidth;
			prevHeightRef.current = currHeight;
			prevXRef.current = currX;
			prevYRef.current = currY;
		}
		var animationStyle;
		if (!isAnimationActive) animationStyle = { strokeDasharray: to };
		else if (t > 0) animationStyle = {
			transition,
			strokeDasharray: to
		};
		else animationStyle = { strokeDasharray: from };
		var _svgPropertiesAndEven2 = svgPropertiesAndEvents(props), { radius: _ } = _svgPropertiesAndEven2, otherPathProps = _objectWithoutProperties$15(_svgPropertiesAndEven2, _excluded2$8);
		return /* @__PURE__ */ React.createElement("path", _extends$16({}, otherPathProps, {
			radius: typeof radius === "number" ? radius : void 0,
			className: layerClass,
			d: getRectanglePath(currX, currY, currWidth, currHeight, radius),
			ref: pathRef,
			style: _objectSpread$26(_objectSpread$26({}, animationStyle), props.style)
		}));
	});
};
//#endregion
//#region node_modules/recharts/es6/util/PolarUtils.js
function ownKeys$25(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$25(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$25(Object(t), !0).forEach(function(r) {
			_defineProperty$27(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$25(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$27(e, r, t) {
	return (r = _toPropertyKey$27(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$27(t) {
	var i = _toPrimitive$27(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$27(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var RADIAN = Math.PI / 180;
var radianToDegree = (angleInRadian) => angleInRadian * 180 / Math.PI;
var polarToCartesian = (cx, cy, radius, angle) => ({
	x: cx + Math.cos(-RADIAN * angle) * radius,
	y: cy + Math.sin(-RADIAN * angle) * radius
});
var getMaxRadius = function getMaxRadius(width, height) {
	var offset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: 0,
		height: 0,
		brushBottom: 0
	};
	return Math.min(Math.abs(width - (offset.left || 0) - (offset.right || 0)), Math.abs(height - (offset.top || 0) - (offset.bottom || 0))) / 2;
};
var distanceBetweenPoints = (point, anotherPoint) => {
	var { x: x1, y: y1 } = point;
	var { x: x2, y: y2 } = anotherPoint;
	return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
var getAngleOfPoint = (_ref, _ref2) => {
	var { x, y } = _ref;
	var { cx, cy } = _ref2;
	var radius = distanceBetweenPoints({
		x,
		y
	}, {
		x: cx,
		y: cy
	});
	if (radius <= 0) return {
		radius,
		angle: 0
	};
	var cos = (x - cx) / radius;
	var angleInRadian = Math.acos(cos);
	if (y > cy) angleInRadian = 2 * Math.PI - angleInRadian;
	return {
		radius,
		angle: radianToDegree(angleInRadian),
		angleInRadian
	};
};
var formatAngleOfSector = (_ref3) => {
	var { startAngle, endAngle } = _ref3;
	var startCnt = Math.floor(startAngle / 360);
	var endCnt = Math.floor(endAngle / 360);
	var min = Math.min(startCnt, endCnt);
	return {
		startAngle: startAngle - min * 360,
		endAngle: endAngle - min * 360
	};
};
var reverseFormatAngleOfSector = (angle, _ref4) => {
	var { startAngle, endAngle } = _ref4;
	var startCnt = Math.floor(startAngle / 360);
	var endCnt = Math.floor(endAngle / 360);
	return angle + Math.min(startCnt, endCnt) * 360;
};
var inRangeOfSector = (_ref5, viewBox) => {
	var { relativeX: x, relativeY: y } = _ref5;
	var { radius, angle } = getAngleOfPoint({
		x,
		y
	}, viewBox);
	var { innerRadius, outerRadius } = viewBox;
	if (radius < innerRadius || radius > outerRadius) return null;
	if (radius === 0) return null;
	var { startAngle, endAngle } = formatAngleOfSector(viewBox);
	var formatAngle = angle;
	var inRange;
	if (startAngle <= endAngle) {
		while (formatAngle > endAngle) formatAngle -= 360;
		while (formatAngle < startAngle) formatAngle += 360;
		inRange = formatAngle >= startAngle && formatAngle <= endAngle;
	} else {
		while (formatAngle > startAngle) formatAngle -= 360;
		while (formatAngle < endAngle) formatAngle += 360;
		inRange = formatAngle >= endAngle && formatAngle <= startAngle;
	}
	if (inRange) return _objectSpread$25(_objectSpread$25({}, viewBox), {}, {
		radius,
		angle: reverseFormatAngleOfSector(formatAngle, viewBox)
	});
	return null;
};
//#endregion
//#region node_modules/recharts/es6/util/cursor/getRadialCursorPoints.js
/**
* Only applicable for radial layouts
* @param {Object} activeCoordinate ChartCoordinate
* @returns {Object} RadialCursorPoints
*/
function getRadialCursorPoints(activeCoordinate) {
	var { cx, cy, radius, startAngle, endAngle } = activeCoordinate;
	return {
		points: [polarToCartesian(cx, cy, radius, startAngle), polarToCartesian(cx, cy, radius, endAngle)],
		cx,
		cy,
		radius,
		startAngle,
		endAngle
	};
}
//#endregion
//#region node_modules/recharts/es6/shape/Sector.js
var _templateObject$1, _templateObject2$1, _templateObject3$1, _templateObject4$1, _templateObject5$1, _templateObject6, _templateObject7;
function _extends$15() {
	return _extends$15 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$15.apply(null, arguments);
}
function _taggedTemplateLiteral$1(e, t) {
	return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var getDeltaAngle$1 = (startAngle, endAngle) => {
	return mathSign(endAngle - startAngle) * Math.min(Math.abs(endAngle - startAngle), 359.999);
};
var getTangentCircle = (_ref) => {
	var { cx, cy, radius, angle, sign, isExternal, cornerRadius, cornerIsExternal } = _ref;
	var centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius;
	var theta = Math.asin(cornerRadius / centerRadius) / RADIAN;
	var centerAngle = cornerIsExternal ? angle : angle + sign * theta;
	var center = polarToCartesian(cx, cy, centerRadius, centerAngle);
	var circleTangency = polarToCartesian(cx, cy, radius, centerAngle);
	var lineTangencyAngle = cornerIsExternal ? angle - sign * theta : angle;
	return {
		center,
		circleTangency,
		lineTangency: polarToCartesian(cx, cy, centerRadius * Math.cos(theta * RADIAN), lineTangencyAngle),
		theta
	};
};
var getSectorPath = (_ref2) => {
	var { cx, cy, innerRadius, outerRadius, startAngle, endAngle } = _ref2;
	var angle = getDeltaAngle$1(startAngle, endAngle);
	var tempEndAngle = startAngle + angle;
	var outerStartPoint = polarToCartesian(cx, cy, outerRadius, startAngle);
	var outerEndPoint = polarToCartesian(cx, cy, outerRadius, tempEndAngle);
	var path = roundTemplateLiteral(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral$1([
		"M ",
		",",
		"\n    A ",
		",",
		",0,\n    ",
		",",
		",\n    ",
		",",
		"\n  "
	])), outerStartPoint.x, outerStartPoint.y, outerRadius, outerRadius, +(Math.abs(angle) > 180), +(startAngle > tempEndAngle), outerEndPoint.x, outerEndPoint.y);
	if (innerRadius > 0) {
		var innerStartPoint = polarToCartesian(cx, cy, innerRadius, startAngle);
		var innerEndPoint = polarToCartesian(cx, cy, innerRadius, tempEndAngle);
		path += roundTemplateLiteral(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral$1([
			"L ",
			",",
			"\n            A ",
			",",
			",0,\n            ",
			",",
			",\n            ",
			",",
			" Z"
		])), innerEndPoint.x, innerEndPoint.y, innerRadius, innerRadius, +(Math.abs(angle) > 180), +(startAngle <= tempEndAngle), innerStartPoint.x, innerStartPoint.y);
	} else path += roundTemplateLiteral(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteral$1([
		"L ",
		",",
		" Z"
	])), cx, cy);
	return path;
};
var getSectorWithCorner = (_ref3) => {
	var { cx, cy, innerRadius, outerRadius, cornerRadius, forceCornerRadius, cornerIsExternal, startAngle, endAngle } = _ref3;
	var sign = mathSign(endAngle - startAngle);
	var { circleTangency: soct, lineTangency: solt, theta: sot } = getTangentCircle({
		cx,
		cy,
		radius: outerRadius,
		angle: startAngle,
		sign,
		cornerRadius,
		cornerIsExternal
	});
	var { circleTangency: eoct, lineTangency: eolt, theta: eot } = getTangentCircle({
		cx,
		cy,
		radius: outerRadius,
		angle: endAngle,
		sign: -sign,
		cornerRadius,
		cornerIsExternal
	});
	var outerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sot - eot;
	if (outerArcAngle < 0) {
		if (forceCornerRadius) return roundTemplateLiteral(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteral$1([
			"M ",
			",",
			"\n        a",
			",",
			",0,0,1,",
			",0\n        a",
			",",
			",0,0,1,",
			",0\n      "
		])), solt.x, solt.y, cornerRadius, cornerRadius, cornerRadius * 2, cornerRadius, cornerRadius, -cornerRadius * 2);
		return getSectorPath({
			cx,
			cy,
			innerRadius,
			outerRadius,
			startAngle,
			endAngle
		});
	}
	var path = roundTemplateLiteral(_templateObject5$1 || (_templateObject5$1 = _taggedTemplateLiteral$1([
		"M ",
		",",
		"\n    A",
		",",
		",0,0,",
		",",
		",",
		"\n    A",
		",",
		",0,",
		",",
		",",
		",",
		"\n    A",
		",",
		",0,0,",
		",",
		",",
		"\n  "
	])), solt.x, solt.y, cornerRadius, cornerRadius, +(sign < 0), soct.x, soct.y, outerRadius, outerRadius, +(outerArcAngle > 180), +(sign < 0), eoct.x, eoct.y, cornerRadius, cornerRadius, +(sign < 0), eolt.x, eolt.y);
	if (innerRadius > 0) {
		var { circleTangency: sict, lineTangency: silt, theta: sit } = getTangentCircle({
			cx,
			cy,
			radius: innerRadius,
			angle: startAngle,
			sign,
			isExternal: true,
			cornerRadius,
			cornerIsExternal
		});
		var { circleTangency: eict, lineTangency: eilt, theta: eit } = getTangentCircle({
			cx,
			cy,
			radius: innerRadius,
			angle: endAngle,
			sign: -sign,
			isExternal: true,
			cornerRadius,
			cornerIsExternal
		});
		var innerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sit - eit;
		if (innerArcAngle < 0 && cornerRadius === 0) return "".concat(path, "L").concat(cx, ",").concat(cy, "Z");
		path += roundTemplateLiteral(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral$1([
			"L",
			",",
			"\n      A",
			",",
			",0,0,",
			",",
			",",
			"\n      A",
			",",
			",0,",
			",",
			",",
			",",
			"\n      A",
			",",
			",0,0,",
			",",
			",",
			"Z"
		])), eilt.x, eilt.y, cornerRadius, cornerRadius, +(sign < 0), eict.x, eict.y, innerRadius, innerRadius, +(innerArcAngle > 180), +(sign > 0), sict.x, sict.y, cornerRadius, cornerRadius, +(sign < 0), silt.x, silt.y);
	} else path += roundTemplateLiteral(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral$1([
		"L",
		",",
		"Z"
	])), cx, cy);
	return path;
};
/**
* SVG cx, cy are `string | number | undefined`, but internally we use `number` so let's
* override the types here.
*/
var defaultSectorProps = {
	cx: 0,
	cy: 0,
	innerRadius: 0,
	outerRadius: 0,
	startAngle: 0,
	endAngle: 0,
	cornerRadius: 0,
	forceCornerRadius: false,
	cornerIsExternal: false
};
var Sector = (sectorProps) => {
	var props = resolveDefaultProps(sectorProps, defaultSectorProps);
	var { cx, cy, innerRadius, outerRadius, cornerRadius, forceCornerRadius, cornerIsExternal, startAngle, endAngle, className } = props;
	if (outerRadius < innerRadius || startAngle === endAngle) return null;
	var layerClass = clsx("recharts-sector", className);
	var deltaRadius = outerRadius - innerRadius;
	var cr = getPercentValue(cornerRadius, deltaRadius, 0, true);
	var path;
	if (cr > 0 && Math.abs(startAngle - endAngle) < 360) path = getSectorWithCorner({
		cx,
		cy,
		innerRadius,
		outerRadius,
		cornerRadius: Math.min(cr, deltaRadius / 2),
		forceCornerRadius,
		cornerIsExternal,
		startAngle,
		endAngle
	});
	else path = getSectorPath({
		cx,
		cy,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle
	});
	return /* @__PURE__ */ React.createElement("path", _extends$15({}, svgPropertiesAndEvents(props), {
		className: layerClass,
		d: path
	}));
};
//#endregion
//#region node_modules/recharts/es6/util/cursor/getCursorPoints.js
function getCursorPoints(layout, activeCoordinate, offset) {
	if (layout === "horizontal") return [{
		x: activeCoordinate.x,
		y: offset.top
	}, {
		x: activeCoordinate.x,
		y: offset.top + offset.height
	}];
	if (layout === "vertical") return [{
		x: offset.left,
		y: activeCoordinate.y
	}, {
		x: offset.left + offset.width,
		y: activeCoordinate.y
	}];
	if (isPolarCoordinate(activeCoordinate)) {
		if (layout === "centric") {
			var { cx, cy, innerRadius, outerRadius, angle } = activeCoordinate;
			var innerPoint = polarToCartesian(cx, cy, innerRadius, angle);
			var outerPoint = polarToCartesian(cx, cy, outerRadius, angle);
			return [{
				x: innerPoint.x,
				y: innerPoint.y
			}, {
				x: outerPoint.x,
				y: outerPoint.y
			}];
		}
		return getRadialCursorPoints(activeCoordinate);
	}
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/dataSelectors.js
/**
* This selector always returns the data with the indexes set by a Brush.
* Trouble is, that might or might not be what you want.
*
* In charts with Brush, you will sometimes want to select the full range of data, and sometimes the one decided by the Brush
* - even if the Brush is active, the panorama inside the Brush should show the full range of data.
*
* So instead of this selector, consider using either selectChartDataAndAlwaysIgnoreIndexes or selectChartDataWithIndexesIfNotInPanorama
*
* @param state RechartsRootState
* @returns data defined on the chart root element, such as BarChart or ScatterChart
*/
var selectChartDataWithIndexes = (state) => state.chartData;
/**
* This selector will always return the full range of data, ignoring the indexes set by a Brush.
* Useful for when you want to render the full range of data, even if a Brush is active.
* For example: in the Brush panorama, in Legend, in Tooltip.
*/
var selectChartDataAndAlwaysIgnoreIndexes = createSelector([selectChartDataWithIndexes], (dataState) => {
	var dataEndIndex = dataState.chartData != null ? dataState.chartData.length - 1 : 0;
	return {
		chartData: dataState.chartData,
		computedData: dataState.computedData,
		dataEndIndex,
		dataStartIndex: 0
	};
});
var selectChartDataWithIndexesIfNotInPanoramaPosition4 = (state, _unused1, _unused2, isPanorama) => {
	if (isPanorama) return selectChartDataAndAlwaysIgnoreIndexes(state);
	return selectChartDataWithIndexes(state);
};
var selectChartDataWithIndexesIfNotInPanoramaPosition3 = (state, _unused1, isPanorama) => {
	if (isPanorama) return selectChartDataAndAlwaysIgnoreIndexes(state);
	return selectChartDataWithIndexes(state);
};
/**
* Returns the chart-level data slice (respecting Brush indexes), memoized by content so that
* spurious Immer reference changes (e.g. dispatching `setChartData(undefined)` when data is
* already `undefined`) do not propagate to downstream selectors.
*
* Used when a selector needs chart-level data but must avoid extra recomputes when the
* data content has not actually changed.
*/
var selectChartDataSliceIfNotInPanorama = createSelector([selectChartDataWithIndexesIfNotInPanoramaPosition4], (_ref) => {
	var { chartData, dataStartIndex, dataEndIndex } = _ref;
	return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
createSelector([selectChartDataAndAlwaysIgnoreIndexes], (_ref2) => {
	var { chartData, dataStartIndex, dataEndIndex } = _ref2;
	return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
/**
* Returns the chart-level data slice (with Brush indexes applied), memoized by content.
* Used in tooltip selectors.
*/
var selectChartDataSliceWithIndexes = createSelector([selectChartDataWithIndexes], (_ref3) => {
	var { chartData, dataStartIndex, dataEndIndex } = _ref3;
	return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
//#endregion
//#region node_modules/recharts/es6/util/isDomainSpecifiedByUser.js
function isWellFormedNumberDomain(v) {
	if (Array.isArray(v) && v.length === 2) {
		var [min, max] = v;
		if (isWellBehavedNumber(min) && isWellBehavedNumber(max)) return true;
	}
	return false;
}
function extendDomain(providedDomain, boundaryDomain, allowDataOverflow) {
	if (allowDataOverflow) return providedDomain;
	return [Math.min(providedDomain[0], boundaryDomain[0]), Math.max(providedDomain[1], boundaryDomain[1])];
}
/**
* So Recharts allows users to provide their own domains,
* but it also places some expectations on what the domain is.
* We can improve on the typescript typing, but we also need a runtime test
to observe that the user-provided domain is well-formed,
* that is: an array with exactly two numbers.
*
* This function does not accept data as an argument.
* This is to enable a performance optimization - if the domain is there,
* and we know what it is without traversing all the data,
* then we don't have to traverse all the data!
*
* If the user-provided domain is not well-formed,
* this function will return undefined - in which case we should traverse the data to calculate the real domain.
*
* This function is for parsing the numerical domain only.
*
* @param userDomain external prop, user provided, before validation. Can have various shapes: array, function, special magical strings inside too.
* @param allowDataOverflow boolean, provided by users. If true then the data domain wins
*
* @return [min, max] domain if it's well-formed; undefined if the domain is invalid
*/
function numericalDomainSpecifiedWithoutRequiringData(userDomain, allowDataOverflow) {
	if (!allowDataOverflow) return;
	if (typeof userDomain === "function") return;
	if (Array.isArray(userDomain) && userDomain.length === 2) {
		var [providedMin, providedMax] = userDomain;
		var finalMin, finalMax;
		if (isWellBehavedNumber(providedMin)) finalMin = providedMin;
		else if (typeof providedMin === "function") return;
		if (isWellBehavedNumber(providedMax)) finalMax = providedMax;
		else if (typeof providedMax === "function") return;
		var candidate = [finalMin, finalMax];
		if (isWellFormedNumberDomain(candidate)) return candidate;
	}
}
/**
* So Recharts allows users to provide their own domains,
* but it also places some expectations on what the domain is.
* We can improve on the typescript typing, but we also need a runtime test
* to observe that the user-provided domain is well-formed,
* that is: an array with exactly two numbers.
* If the user-provided domain is not well-formed,
* this function will return undefined - in which case we should traverse the data to calculate the real domain.
*
* This function is for parsing the numerical domain only.
*
* You are probably thinking, why does domain need tick count?
* Well it adjusts the domain based on where the "nice ticks" land, and nice ticks depend on the tick count.
*
* @param userDomain external prop, user provided, before validation. Can have various shapes: array, function, special magical strings inside too.
* @param dataDomain calculated from data. Can be undefined, as an option for performance optimization
* @param allowDataOverflow provided by users. If true then the data domain wins
*
* @return [min, max] domain if it's well-formed; undefined if the domain is invalid
*/
function parseNumericalUserDomain(userDomain, dataDomain, allowDataOverflow) {
	if (!allowDataOverflow && dataDomain == null) return;
	if (typeof userDomain === "function" && dataDomain != null) try {
		var result = userDomain(dataDomain, allowDataOverflow);
		if (isWellFormedNumberDomain(result)) return extendDomain(result, dataDomain, allowDataOverflow);
	} catch (_unused) {}
	if (Array.isArray(userDomain) && userDomain.length === 2) {
		var [providedMin, providedMax] = userDomain;
		var finalMin, finalMax;
		if (providedMin === "auto") {
			if (dataDomain != null) finalMin = Math.min(...dataDomain);
		} else if (isNumber(providedMin)) finalMin = providedMin;
		else if (typeof providedMin === "function") try {
			if (dataDomain != null) finalMin = providedMin(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0]);
		} catch (_unused2) {}
		else if (typeof providedMin === "string" && MIN_VALUE_REG.test(providedMin)) {
			var match = MIN_VALUE_REG.exec(providedMin);
			if (match == null || match[1] == null || dataDomain == null) finalMin = void 0;
			else {
				var value = +match[1];
				finalMin = dataDomain[0] - value;
			}
		} else finalMin = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0];
		if (providedMax === "auto") {
			if (dataDomain != null) finalMax = Math.max(...dataDomain);
		} else if (isNumber(providedMax)) finalMax = providedMax;
		else if (typeof providedMax === "function") try {
			if (dataDomain != null) finalMax = providedMax(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1]);
		} catch (_unused3) {}
		else if (typeof providedMax === "string" && MAX_VALUE_REG.test(providedMax)) {
			var _match = MAX_VALUE_REG.exec(providedMax);
			if (_match == null || _match[1] == null || dataDomain == null) finalMax = void 0;
			else {
				var _value = +_match[1];
				finalMax = dataDomain[1] + _value;
			}
		} else finalMax = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1];
		var candidate = [finalMin, finalMax];
		if (isWellFormedNumberDomain(candidate)) {
			if (dataDomain == null) return candidate;
			return extendDomain(candidate, dataDomain, allowDataOverflow);
		}
	}
}
//#endregion
//#region node_modules/recharts/es6/util/scale/util/arithmetic.js
/**
* @fileOverview Some common arithmetic methods
* @author xile611
* @date 2015-09-17
*/
/**
* Get the digit count of a number.
* If the absolute value is in the interval [0.1, 1), the result is 0.
* If the absolute value is in the interval [0.01, 0.1), the digit count is -1.
* If the absolute value is in the interval [0.001, 0.01), the digit count is -2.
*
* @param  {Number} value The number
* @return {Integer}      Digit count
*/
function getDigitCount(value) {
	var result;
	if (value === 0) result = 1;
	else result = Math.floor(new Decimal(value).abs().log(10).toNumber()) + 1;
	return result;
}
/**
* Get the data in the interval [start, end) with a fixed step.
* Also handles JS calculation precision issues.
*
* @param  {Decimal} start Start point
* @param  {Decimal} end   End point, not included
* @param  {Decimal} step  Step size
* @return {Array}         Array of numbers
*/
function rangeStep(start, end, step) {
	var num = new Decimal(start);
	var i = 0;
	var result = [];
	while (num.lt(end) && i < 1e5) {
		result.push(num.toNumber());
		num = num.add(step);
		i++;
	}
	return result;
}
//#endregion
//#region node_modules/recharts/es6/util/scale/getNiceTickValues.js
/**
* @fileOverview calculate tick values of scale
* @author xile611, arcthur
* @date 2015-09-17
*/
/**
* Calculate a interval of a minimum value and a maximum value
*
* @param  {Number} min       The minimum value
* @param  {Number} max       The maximum value
* @return {Array} An interval
*/
var getValidInterval = (_ref) => {
	var [min, max] = _ref;
	var [validMin, validMax] = [min, max];
	if (min > max) [validMin, validMax] = [max, min];
	return [validMin, validMax];
};
/**
* Calculate the step which is easy to understand between ticks, like 10, 20, 25
*
* @param  roughStep        The rough step calculated by dividing the difference by the tickCount
* @param  allowDecimals    Allow the ticks to be decimals or not
* @param  correctionFactor A correction factor
* @return The step which is easy to understand between two ticks
*/
var getAdaptiveStep = (roughStep, allowDecimals, correctionFactor) => {
	if (roughStep.lte(0)) return new Decimal(0);
	var digitCount = getDigitCount(roughStep.toNumber());
	var digitCountValue = new Decimal(10).pow(digitCount);
	var stepRatio = roughStep.div(digitCountValue);
	var stepRatioScale = digitCount !== 1 ? .05 : .1;
	var formatStep = new Decimal(Math.ceil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale).mul(digitCountValue);
	return allowDecimals ? new Decimal(formatStep.toNumber()) : new Decimal(Math.ceil(formatStep.toNumber()));
};
/**
* The snap125 step algorithm snaps to nice numbers (1, 2, 2.5, 5) at each
* order of magnitude, producing human-friendly tick intervals like
* 0, 5, 10, 15, 20 instead of 0, 4, 8, 12, 16.
*
* This is opt-in and can be enabled via the `niceTicks` prop on axis components.
*
* @param  roughStep        The rough step calculated by dividing the difference by the tickCount
* @param  allowDecimals    Allow the ticks to be decimals or not
* @param  correctionFactor A correction factor
* @return The step which is easy to understand between two ticks
*/
var getSnap125Step = (roughStep, allowDecimals, correctionFactor) => {
	var _NICE_STEPS$niceIdx;
	if (roughStep.lte(0)) return new Decimal(0);
	var NICE_STEPS = [
		1,
		2,
		2.5,
		5
	];
	var roughNum = roughStep.toNumber();
	var exponent = Math.floor(new Decimal(roughNum).abs().log(10).toNumber());
	var magnitude = new Decimal(10).pow(exponent);
	var normalized = roughStep.div(magnitude).toNumber();
	var niceIdx = NICE_STEPS.findIndex((s) => s >= normalized - 1e-10);
	if (niceIdx === -1) {
		magnitude = magnitude.mul(10);
		niceIdx = 0;
	}
	niceIdx += correctionFactor;
	if (niceIdx >= NICE_STEPS.length) {
		var extraMag = Math.floor(niceIdx / NICE_STEPS.length);
		niceIdx %= NICE_STEPS.length;
		magnitude = magnitude.mul(new Decimal(10).pow(extraMag));
	}
	var formatStep = new Decimal((_NICE_STEPS$niceIdx = NICE_STEPS[niceIdx]) !== null && _NICE_STEPS$niceIdx !== void 0 ? _NICE_STEPS$niceIdx : 1).mul(magnitude);
	return allowDecimals ? formatStep : new Decimal(Math.ceil(formatStep.toNumber()));
};
/**
* calculate the ticks when the minimum value equals to the maximum value
*
* @param  value         The minimum value which is also the maximum value
* @param  tickCount     The count of ticks
* @param  allowDecimals Allow the ticks to be decimals or not
* @return array of ticks
*/
var getTickOfSingleValue = (value, tickCount, allowDecimals) => {
	var step = new Decimal(1);
	var middle = new Decimal(value);
	if (!middle.isint() && allowDecimals) {
		var absVal = Math.abs(value);
		if (absVal < 1) {
			step = new Decimal(10).pow(getDigitCount(value) - 1);
			middle = new Decimal(Math.floor(middle.div(step).toNumber())).mul(step);
		} else if (absVal > 1) middle = new Decimal(Math.floor(value));
	} else if (value === 0) middle = new Decimal(Math.floor((tickCount - 1) / 2));
	else if (!allowDecimals) middle = new Decimal(Math.floor(value));
	var middleIndex = Math.floor((tickCount - 1) / 2);
	var ticks = [];
	for (var i = 0; i < tickCount; i++) ticks.push(middle.add(new Decimal(i - middleIndex).mul(step)).toNumber());
	return ticks;
};
/**
* Calculate the step
*
* @param  min              The minimum value of an interval
* @param  max              The maximum value of an interval
* @param  tickCount        The count of ticks
* @param  allowDecimals    Allow the ticks to be decimals or not
* @param  correctionFactor A correction factor
* @return The step, minimum value of ticks, maximum value of ticks
*/
var _calculateStep = function calculateStep(min, max, tickCount, allowDecimals) {
	var correctionFactor = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
	var stepFn = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : getAdaptiveStep;
	if (!Number.isFinite((max - min) / (tickCount - 1))) return {
		step: new Decimal(0),
		tickMin: new Decimal(0),
		tickMax: new Decimal(0)
	};
	var step = stepFn(new Decimal(max).sub(min).div(tickCount - 1), allowDecimals, correctionFactor);
	var middle;
	if (min <= 0 && max >= 0) middle = new Decimal(0);
	else {
		middle = new Decimal(min).add(max).div(2);
		middle = middle.sub(new Decimal(middle).mod(step));
	}
	var belowCount = Math.ceil(middle.sub(min).div(step).toNumber());
	var upCount = Math.ceil(new Decimal(max).sub(middle).div(step).toNumber());
	var scaleCount = belowCount + upCount + 1;
	if (scaleCount > tickCount) return _calculateStep(min, max, tickCount, allowDecimals, correctionFactor + 1, stepFn);
	if (scaleCount < tickCount) {
		upCount = max > 0 ? upCount + (tickCount - scaleCount) : upCount;
		belowCount = max > 0 ? belowCount : belowCount + (tickCount - scaleCount);
	}
	return {
		step,
		tickMin: middle.sub(new Decimal(belowCount).mul(step)),
		tickMax: middle.add(new Decimal(upCount).mul(step))
	};
};
var getNiceTickValues = function getNiceTickValues(_ref2) {
	var [min, max] = _ref2;
	var tickCount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6;
	var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
	var niceTicksMode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto";
	var count = Math.max(tickCount, 2);
	var [cormin, cormax] = getValidInterval([min, max]);
	if (cormin === -Infinity || cormax === Infinity) {
		var _values = cormax === Infinity ? [cormin, ...Array(tickCount - 1).fill(Infinity)] : [...Array(tickCount - 1).fill(-Infinity), cormax];
		return min > max ? _values.reverse() : _values;
	}
	if (cormin === cormax) return getTickOfSingleValue(cormin, tickCount, allowDecimals);
	var { step, tickMin, tickMax } = _calculateStep(cormin, cormax, count, allowDecimals, 0, niceTicksMode === "snap125" ? getSnap125Step : getAdaptiveStep);
	var values = rangeStep(tickMin, tickMax.add(new Decimal(.1).mul(step)), step);
	return min > max ? values.reverse() : values;
};
/**
* Calculate the ticks of an interval.
* Ticks will be constrained to the interval [min, max] even if it makes them less rounded and nice.
*
* @param tuple of [min,max] min: The minimum value, max: The maximum value
* @param tickCount     The count of ticks. This function may return less than tickCount ticks if the interval is too small.
* @param allowDecimals Allow the ticks to be decimals or not
* @param niceTicksMode          The algorithm to use for calculating nice ticks. See {@link NiceTicksAlgorithm}.
* @return array of ticks
*/
var getTickValuesFixedDomain = function getTickValuesFixedDomain(_ref3, tickCount) {
	var [min, max] = _ref3;
	var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
	var niceTicksMode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto";
	var [cormin, cormax] = getValidInterval([min, max]);
	if (cormin === -Infinity || cormax === Infinity) return [min, max];
	if (cormin === cormax) return [cormin];
	var stepFn = niceTicksMode === "snap125" ? getSnap125Step : getAdaptiveStep;
	var count = Math.max(tickCount, 2);
	var step = stepFn(new Decimal(cormax).sub(cormin).div(count - 1), allowDecimals, 0);
	var values = [...rangeStep(new Decimal(cormin), new Decimal(cormax), step), cormax];
	if (allowDecimals === false) values = values.map((value) => Math.round(value));
	return min > max ? values.reverse() : values;
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/rootPropsSelectors.js
var selectRootMaxBarSize = (state) => state.rootProps.maxBarSize;
var selectBarGap = (state) => state.rootProps.barGap;
var selectBarCategoryGap = (state) => state.rootProps.barCategoryGap;
var selectRootBarSize = (state) => state.rootProps.barSize;
var selectStackOffsetType = (state) => state.rootProps.stackOffset;
var selectReverseStackOrder = (state) => state.rootProps.reverseStackOrder;
var selectChartName = (state) => state.options.chartName;
var selectSyncId = (state) => state.rootProps.syncId;
var selectSyncMethod = (state) => state.rootProps.syncMethod;
var selectEventEmitter = (state) => state.options.eventEmitter;
//#endregion
//#region node_modules/recharts/es6/zIndex/DefaultZIndexes.js
/**
* A collection of all default zIndex values used by Recharts.
*
* You can reuse these, or you can define your own.
*/
var DefaultZIndexes = {
	grid: -100,
	barBackground: -50,
	area: 100,
	cursorRectangle: 200,
	bar: 300,
	line: 400,
	axis: 500,
	scatter: 600,
	activeBar: 1e3,
	cursorLine: 1100,
	activeDot: 1200,
	label: 2e3
};
//#endregion
//#region node_modules/recharts/es6/polar/defaultPolarAngleAxisProps.js
var defaultPolarAngleAxisProps = {
	allowDecimals: false,
	allowDuplicatedCategory: true,
	allowDataOverflow: false,
	angle: 0,
	angleAxisId: 0,
	axisLine: true,
	axisLineType: "polygon",
	cx: 0,
	cy: 0,
	hide: false,
	includeHidden: false,
	label: false,
	niceTicks: "auto",
	orientation: "outer",
	reversed: false,
	scale: "auto",
	tick: true,
	tickLine: true,
	tickSize: 8,
	type: "auto",
	zIndex: DefaultZIndexes.axis
};
//#endregion
//#region node_modules/recharts/es6/polar/defaultPolarRadiusAxisProps.js
var defaultPolarRadiusAxisProps = {
	allowDataOverflow: false,
	allowDecimals: false,
	allowDuplicatedCategory: true,
	angle: 0,
	axisLine: true,
	includeHidden: false,
	hide: false,
	niceTicks: "auto",
	label: false,
	orientation: "right",
	radiusAxisId: 0,
	reversed: false,
	scale: "auto",
	stroke: "#ccc",
	tick: true,
	tickCount: 5,
	tickLine: true,
	type: "auto",
	zIndex: DefaultZIndexes.axis
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineAxisRangeWithReverse.js
var combineAxisRangeWithReverse = (axisSettings, axisRange) => {
	if (!axisSettings || !axisRange) return;
	if (axisSettings !== null && axisSettings !== void 0 && axisSettings.reversed) return [axisRange[1], axisRange[0]];
	return axisRange;
};
//#endregion
//#region node_modules/recharts/es6/util/getAxisTypeBasedOnLayout.js
/**
* This function evaluates the "auto" axis domain type based on the chart layout and axis type.
* It outputs a definitive axis domain type that can be used for further processing.
*/
function getAxisTypeBasedOnLayout(layout, axisType, axisDomainType) {
	if (axisDomainType !== "auto") return axisDomainType;
	if (layout == null) return;
	return isCategoricalAxis(layout, axisType) ? "category" : "number";
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/polarAxisSelectors.js
function ownKeys$24(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$24(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$24(Object(t), !0).forEach(function(r) {
			_defineProperty$26(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$24(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$26(e, r, t) {
	return (r = _toPropertyKey$26(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$26(t) {
	var i = _toPrimitive$26(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$26(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var implicitAngleAxis = {
	allowDataOverflow: defaultPolarAngleAxisProps.allowDataOverflow,
	allowDecimals: defaultPolarAngleAxisProps.allowDecimals,
	allowDuplicatedCategory: false,
	dataKey: void 0,
	domain: void 0,
	id: defaultPolarAngleAxisProps.angleAxisId,
	includeHidden: false,
	name: void 0,
	reversed: defaultPolarAngleAxisProps.reversed,
	scale: defaultPolarAngleAxisProps.scale,
	tick: defaultPolarAngleAxisProps.tick,
	tickCount: void 0,
	ticks: void 0,
	type: defaultPolarAngleAxisProps.type,
	unit: void 0,
	niceTicks: "auto"
};
var implicitRadiusAxis = {
	allowDataOverflow: defaultPolarRadiusAxisProps.allowDataOverflow,
	allowDecimals: defaultPolarRadiusAxisProps.allowDecimals,
	allowDuplicatedCategory: defaultPolarRadiusAxisProps.allowDuplicatedCategory,
	dataKey: void 0,
	domain: void 0,
	id: defaultPolarRadiusAxisProps.radiusAxisId,
	includeHidden: defaultPolarRadiusAxisProps.includeHidden,
	name: void 0,
	reversed: defaultPolarRadiusAxisProps.reversed,
	scale: defaultPolarRadiusAxisProps.scale,
	tick: defaultPolarRadiusAxisProps.tick,
	tickCount: defaultPolarRadiusAxisProps.tickCount,
	ticks: void 0,
	type: defaultPolarRadiusAxisProps.type,
	unit: void 0,
	niceTicks: "auto"
};
var selectAngleAxisNoDefaults = (state, angleAxisId) => {
	if (angleAxisId == null) return;
	return state.polarAxis.angleAxis[angleAxisId];
};
var selectAngleAxis = createSelector([selectAngleAxisNoDefaults, selectPolarChartLayout], (angleAxisSettings, layout) => {
	var _getAxisTypeBasedOnLa;
	if (angleAxisSettings != null) return angleAxisSettings;
	var evaluatedType = (_getAxisTypeBasedOnLa = getAxisTypeBasedOnLayout(layout, "angleAxis", implicitAngleAxis.type)) !== null && _getAxisTypeBasedOnLa !== void 0 ? _getAxisTypeBasedOnLa : "category";
	return _objectSpread$24(_objectSpread$24({}, implicitAngleAxis), {}, { type: evaluatedType });
});
var selectRadiusAxisNoDefaults = (state, radiusAxisId) => {
	return state.polarAxis.radiusAxis[radiusAxisId];
};
var selectRadiusAxis = createSelector([selectRadiusAxisNoDefaults, selectPolarChartLayout], (radiusAxisSettings, layout) => {
	var _getAxisTypeBasedOnLa2;
	if (radiusAxisSettings != null) return radiusAxisSettings;
	var evaluatedType = (_getAxisTypeBasedOnLa2 = getAxisTypeBasedOnLayout(layout, "radiusAxis", implicitRadiusAxis.type)) !== null && _getAxisTypeBasedOnLa2 !== void 0 ? _getAxisTypeBasedOnLa2 : "category";
	return _objectSpread$24(_objectSpread$24({}, implicitRadiusAxis), {}, { type: evaluatedType });
});
var selectPolarOptions = (state) => state.polarOptions;
var selectMaxRadius = createSelector([
	selectChartWidth,
	selectChartHeight,
	selectChartOffsetInternal
], getMaxRadius);
var selectInnerRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
	if (polarChartOptions == null) return;
	return getPercentValue(polarChartOptions.innerRadius, maxRadius, 0);
});
var selectOuterRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
	if (polarChartOptions == null) return;
	return getPercentValue(polarChartOptions.outerRadius, maxRadius, maxRadius * .8);
});
var combineAngleAxisRange = (polarOptions) => {
	if (polarOptions == null) return [0, 0];
	var { startAngle, endAngle } = polarOptions;
	return [startAngle, endAngle];
};
var selectAngleAxisRange = createSelector([selectPolarOptions], combineAngleAxisRange);
createSelector([selectAngleAxis, selectAngleAxisRange], combineAxisRangeWithReverse);
var selectRadiusAxisRange = createSelector([
	selectMaxRadius,
	selectInnerRadius,
	selectOuterRadius
], (maxRadius, innerRadius, outerRadius) => {
	if (maxRadius == null || innerRadius == null || outerRadius == null) return;
	return [innerRadius, outerRadius];
});
createSelector([selectRadiusAxis, selectRadiusAxisRange], combineAxisRangeWithReverse);
var selectPolarViewBox = createSelector([
	selectChartLayout,
	selectPolarOptions,
	selectInnerRadius,
	selectOuterRadius,
	selectChartWidth,
	selectChartHeight
], (layout, polarOptions, innerRadius, outerRadius, width, height) => {
	if (layout !== "centric" && layout !== "radial" || polarOptions == null || innerRadius == null || outerRadius == null) return;
	var { cx, cy, startAngle, endAngle } = polarOptions;
	return {
		cx: getPercentValue(cx, width, width / 2),
		cy: getPercentValue(cy, height, height / 2),
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		clockWise: false
	};
});
//#endregion
//#region node_modules/recharts/es6/state/selectors/pickAxisType.js
var pickAxisType = (_state, axisType) => axisType;
//#endregion
//#region node_modules/recharts/es6/state/selectors/pickAxisId.js
var pickAxisId = (_state, _axisType, axisId) => axisId;
//#endregion
//#region node_modules/recharts/es6/util/stacks/getStackSeriesIdentifier.js
/**
* Returns identifier for stack series which is one individual graphical item in the stack.
* @param graphicalItem - The graphical item representing the series in the stack.
* @return The identifier for the series in the stack
*/
function getStackSeriesIdentifier(graphicalItem) {
	return graphicalItem === null || graphicalItem === void 0 ? void 0 : graphicalItem.id;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineDisplayedStackedData.js
/**
* In a stacked chart, each graphical item has its own data. That data could be either:
* - defined on the chart root, in which case the item gets a unique dataKey
* - or defined on the item itself, in which case multiple items can share the same dataKey
*
* That means we cannot use the dataKey as a unique identifier for the item.
*
* This type represents a single data point in a stacked chart, where each key is a series identifier
* and the value is the numeric value for that series using the numerical axis dataKey.
*/
function combineDisplayedStackedData(stackedGraphicalItems, _ref, tooltipAxisSettings) {
	var { chartData = [] } = _ref;
	var { allowDuplicatedCategory, dataKey: tooltipDataKey } = tooltipAxisSettings;
	var knownItemsByDataKey = /* @__PURE__ */ new Map();
	stackedGraphicalItems.forEach((item) => {
		var _item$data;
		var resolvedData = (_item$data = item.data) !== null && _item$data !== void 0 ? _item$data : chartData;
		if (resolvedData == null || resolvedData.length === 0) return;
		var stackIdentifier = getStackSeriesIdentifier(item);
		resolvedData.forEach((entry, index) => {
			var tooltipValue = tooltipDataKey == null || allowDuplicatedCategory ? index : String(getValueByDataKey(entry, tooltipDataKey, null));
			var numericValue = getValueByDataKey(entry, item.dataKey, 0);
			var curr;
			if (knownItemsByDataKey.has(tooltipValue)) curr = knownItemsByDataKey.get(tooltipValue);
			else curr = {};
			Object.assign(curr, { [stackIdentifier]: numericValue });
			knownItemsByDataKey.set(tooltipValue, curr);
		});
	});
	return Array.from(knownItemsByDataKey.values());
}
//#endregion
//#region node_modules/recharts/es6/state/types/StackedGraphicalItem.js
/**
* Some graphical items allow data stacking. The stacks are optional,
* so all props here are optional too.
*/
/**
* Some graphical items allow data stacking.
* This interface is used to represent the items that are stacked
* because the user has provided the stackId and dataKey properties.
*/
function isStacked(graphicalItem) {
	return "stackId" in graphicalItem && graphicalItem.stackId != null && graphicalItem.dataKey != null;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/numberDomainEqualityCheck.js
var numberDomainEqualityCheck = (a, b) => {
	if (a === b) return true;
	if (a == null || b == null) return false;
	return a[0] === b[0] && a[1] === b[1];
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/arrayEqualityCheck.js
/**
* Checks if two arrays are equal, treating empty arrays as equal regardless of reference.
* If both arrays are non-empty, it checks for reference equality.
* @param a
* @param b
*/
function emptyArraysAreEqualCheck(a, b) {
	if (Array.isArray(a) && Array.isArray(b) && a.length === 0 && b.length === 0) return true;
	return a === b;
}
/**
* Checks if two arrays have the same contents in the same order.
* @param a
* @param b
*/
function arrayContentsAreEqualCheck(a, b) {
	if (a.length === b.length) {
		for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
		return true;
	}
	return false;
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectTooltipAxisType.js
/**
* angle, radius, X, Y, and Z axes all have domain and range and scale and associated settings
*/
/**
* Z axis is never displayed and so it lacks ticks and tick settings.
*/
var selectTooltipAxisType = (state) => {
	var layout = selectChartLayout(state);
	if (layout === "horizontal") return "xAxis";
	if (layout === "vertical") return "yAxis";
	if (layout === "centric") return "angleAxis";
	return "radiusAxis";
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectTooltipAxisId.js
var selectTooltipAxisId = (state) => state.tooltip.settings.axisId;
//#endregion
//#region node_modules/recharts/es6/util/scale/RechartsScale.js
/**
* This is internal representation of scale used in Recharts.
* Users will provide CustomScaleDefinition or a string, which we will parse into RechartsScale.
* Most importantly, RechartsScale is fully immutable - there are no setters that mutate the scale in place.
* This is important for React integration - if the scale changes, we want to trigger re-renders.
* Mutating the scale in place would not trigger re-renders, leading to stale UI.
*/
/**
* Position within a band for banded scales.
* In scales that are not banded, this parameter is ignored.
*
* @inline
*/
function rechartsScaleFactory(d3Scale) {
	if (d3Scale == null) return;
	var ticksFn = d3Scale.ticks;
	var bandwidthFn = d3Scale.bandwidth;
	var d3Range = d3Scale.range();
	var range = [Math.min(...d3Range), Math.max(...d3Range)];
	return {
		domain: () => d3Scale.domain(),
		range: function(_range) {
			function range() {
				return _range.apply(this, arguments);
			}
			range.toString = function() {
				return _range.toString();
			};
			return range;
		}(() => range),
		rangeMin: () => range[0],
		rangeMax: () => range[1],
		isInRange(value) {
			var first = range[0];
			var last = range[1];
			return first <= last ? value >= first && value <= last : value >= last && value <= first;
		},
		bandwidth: bandwidthFn ? () => bandwidthFn.call(d3Scale) : void 0,
		ticks: ticksFn ? (count) => ticksFn.call(d3Scale, count) : void 0,
		map: (input, options) => {
			var baseValue = d3Scale(input);
			if (baseValue == null) return;
			if (d3Scale.bandwidth && options !== null && options !== void 0 && options.position) {
				var bandWidth = d3Scale.bandwidth();
				switch (options.position) {
					case "middle":
						baseValue += bandWidth / 2;
						break;
					case "end":
						baseValue += bandWidth;
						break;
					default: break;
				}
			}
			return baseValue;
		}
	};
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineCheckedDomain.js
/**
* This function validates and transforms the axis domain so that it is safe to use in the provided scale.
*/
var combineCheckedDomain = (realScaleType, axisDomain) => {
	if (axisDomain == null) return;
	switch (realScaleType) {
		case "linear":
			if (!isWellFormedNumberDomain(axisDomain)) {
				var min, max;
				for (var i = 0; i < axisDomain.length; i++) {
					var value = axisDomain[i];
					if (!isWellBehavedNumber(value)) continue;
					if (min === void 0 || value < min) min = value;
					if (max === void 0 || value > max) max = value;
				}
				if (min !== void 0 && max !== void 0) return [min, max];
				return;
			}
			return axisDomain;
		default: return axisDomain;
	}
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineConfiguredScale.js
function getD3ScaleFromType(realScaleType) {
	var scales = d3Scales;
	if (realScaleType in scales && typeof scales[realScaleType] === "function") return scales[realScaleType]();
	var name = "scale".concat(upperFirst(realScaleType));
	if (name in scales && typeof scales[name] === "function") return scales[name]();
}
/**
* Converts external scale definition into internal RechartsScale definition.
* @param scale custom function scale - if you have the `string` from outside, use `combineRealScaleType` first which will validate it and return RechartsScaleType or undefined
* @param axisDomain
* @param axisRange
*/
function combineConfiguredScaleInternal(scale, axisDomain, axisRange) {
	if (typeof scale === "function") return scale.copy().domain(axisDomain).range(axisRange);
	if (scale == null) return;
	var d3ScaleFunction = getD3ScaleFromType(scale);
	if (d3ScaleFunction == null) return;
	d3ScaleFunction.domain(axisDomain).range(axisRange);
	return d3ScaleFunction;
}
function combineConfiguredScale(axis, realScaleType, axisDomain, axisRange) {
	if (axisDomain == null || axisRange == null) return;
	if (typeof axis.scale === "function") return combineConfiguredScaleInternal(axis.scale, axisDomain, axisRange);
	return combineConfiguredScaleInternal(realScaleType, axisDomain, axisRange);
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineRealScaleType.js
function getD3ScaleName(name) {
	return "scale".concat(upperFirst(name));
}
function isSupportedScaleName(name) {
	return getD3ScaleName(name) in d3Scales;
}
var combineRealScaleType = (axisConfig, hasBar, chartType) => {
	if (axisConfig == null) return;
	var { scale, type } = axisConfig;
	if (scale === "auto") {
		if (type === "category" && chartType && (chartType.indexOf("LineChart") >= 0 || chartType.indexOf("AreaChart") >= 0 || chartType.indexOf("ComposedChart") >= 0 && !hasBar)) return "point";
		if (type === "category") return "band";
		return "linear";
	}
	if (typeof scale === "string") return isSupportedScaleName(scale) ? scale : "point";
};
//#endregion
//#region node_modules/recharts/es6/util/scale/createCategoricalInverse.js
/**
* Binary search to find the index where x would fit in array a.
* Works for arrays that are sorted both ascending and descending.
*
* Unlike d3.bisect, this implementation handles both ascending and descending arrays.
*
* @param haystack Sorted array of numbers
* @param needle Number to find the insertion index for
* @returns Index where x would fit in array a
*/
function bisect(haystack, needle) {
	var lo = 0;
	var hi = haystack.length;
	var ascending = haystack[0] < haystack[haystack.length - 1];
	while (lo < hi) {
		var mid = Math.floor((lo + hi) / 2);
		if (ascending ? haystack[mid] < needle : haystack[mid] > needle) lo = mid + 1;
		else hi = mid;
	}
	return lo;
}
/**
* Computes an inverse scale function for categorical/ordinal scales.
* Uses bisect to find the closest domain value for a given pixel coordinate.
*/
function createCategoricalInverse(scale, allDataPointsOnAxis) {
	if (!scale) return;
	var domain = allDataPointsOnAxis !== null && allDataPointsOnAxis !== void 0 ? allDataPointsOnAxis : scale.domain();
	var pixelPositions = domain.map((d) => {
		var _scale;
		return (_scale = scale(d)) !== null && _scale !== void 0 ? _scale : 0;
	});
	var range = scale.range();
	if (domain.length === 0 || range.length < 2) return;
	return (pixelValue) => {
		var _pixelPositions, _pixelPositions$index;
		var index = bisect(pixelPositions, pixelValue);
		if (index <= 0) return domain[0];
		if (index >= domain.length) return domain[domain.length - 1];
		var leftPixel = (_pixelPositions = pixelPositions[index - 1]) !== null && _pixelPositions !== void 0 ? _pixelPositions : 0;
		var rightPixel = (_pixelPositions$index = pixelPositions[index]) !== null && _pixelPositions$index !== void 0 ? _pixelPositions$index : 0;
		if (Math.abs(pixelValue - leftPixel) <= Math.abs(pixelValue - rightPixel)) return domain[index - 1];
		return domain[index];
	};
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineInverseScaleFunction.js
function combineInverseScaleFunction(configuredScale) {
	if (configuredScale == null) return;
	if ("invert" in configuredScale && typeof configuredScale.invert === "function") return configuredScale.invert.bind(configuredScale);
	return createCategoricalInverse(configuredScale, void 0);
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/axisSelectors.js
function ownKeys$23(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$23(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$23(Object(t), !0).forEach(function(r) {
			_defineProperty$25(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$23(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$25(e, r, t) {
	return (r = _toPropertyKey$25(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$25(t) {
	var i = _toPrimitive$25(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$25(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var defaultNumericDomain = [0, "auto"];
/**
* If an axis is not explicitly defined as an element,
* we still need to render something in the chart and we need
* some object to hold the domain and default settings.
*/
var implicitXAxis = {
	allowDataOverflow: false,
	allowDecimals: true,
	allowDuplicatedCategory: true,
	angle: 0,
	dataKey: void 0,
	domain: void 0,
	height: 30,
	hide: true,
	id: 0,
	includeHidden: false,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: false,
	name: void 0,
	orientation: "bottom",
	padding: {
		left: 0,
		right: 0
	},
	reversed: false,
	scale: "auto",
	tick: true,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "category",
	unit: void 0,
	niceTicks: "auto"
};
var selectXAxisSettingsNoDefaults = (state, axisId) => {
	return state.cartesianAxis.xAxis[axisId];
};
var selectXAxisSettings = (state, axisId) => {
	var axis = selectXAxisSettingsNoDefaults(state, axisId);
	if (axis == null) return implicitXAxis;
	return axis;
};
/**
* If an axis is not explicitly defined as an element,
* we still need to render something in the chart and we need
* some object to hold the domain and default settings.
*/
var implicitYAxis = {
	allowDataOverflow: false,
	allowDecimals: true,
	allowDuplicatedCategory: true,
	angle: 0,
	dataKey: void 0,
	domain: defaultNumericDomain,
	hide: true,
	id: 0,
	includeHidden: false,
	interval: "preserveEnd",
	minTickGap: 5,
	mirror: false,
	name: void 0,
	orientation: "left",
	padding: {
		top: 0,
		bottom: 0
	},
	reversed: false,
	scale: "auto",
	tick: true,
	tickCount: 5,
	tickFormatter: void 0,
	ticks: void 0,
	type: "number",
	unit: void 0,
	niceTicks: "auto",
	width: 60
};
var selectYAxisSettingsNoDefaults = (state, axisId) => {
	return state.cartesianAxis.yAxis[axisId];
};
var selectYAxisSettings = (state, axisId) => {
	var axis = selectYAxisSettingsNoDefaults(state, axisId);
	if (axis == null) return implicitYAxis;
	return axis;
};
var implicitZAxis = {
	domain: [0, "auto"],
	includeHidden: false,
	reversed: false,
	allowDataOverflow: false,
	allowDuplicatedCategory: false,
	dataKey: void 0,
	id: 0,
	name: "",
	range: [64, 64],
	scale: "auto",
	type: "number",
	unit: ""
};
var selectZAxisSettings = (state, axisId) => {
	var axis = state.cartesianAxis.zAxis[axisId];
	if (axis == null) return implicitZAxis;
	return axis;
};
var selectBaseAxis = (state, axisType, axisId) => {
	switch (axisType) {
		case "xAxis": return selectXAxisSettings(state, axisId);
		case "yAxis": return selectYAxisSettings(state, axisId);
		case "zAxis": return selectZAxisSettings(state, axisId);
		case "angleAxis": return selectAngleAxis(state, axisId);
		case "radiusAxis": return selectRadiusAxis(state, axisId);
		default: throw new Error("Unexpected axis type: ".concat(axisType));
	}
};
var selectCartesianAxisSettings = (state, axisType, axisId) => {
	switch (axisType) {
		case "xAxis": return selectXAxisSettings(state, axisId);
		case "yAxis": return selectYAxisSettings(state, axisId);
		default: throw new Error("Unexpected axis type: ".concat(axisType));
	}
};
/**
* Selects either an X or Y axis. Doesn't work with Z axis - for that, instead use selectBaseAxis.
* @param state Root state
* @param axisType xAxis | yAxis
* @param axisId xAxisId | yAxisId
* @returns axis settings object
*/
var selectRenderableAxisSettings = (state, axisType, axisId) => {
	switch (axisType) {
		case "xAxis": return selectXAxisSettings(state, axisId);
		case "yAxis": return selectYAxisSettings(state, axisId);
		case "angleAxis": return selectAngleAxis(state, axisId);
		case "radiusAxis": return selectRadiusAxis(state, axisId);
		default: throw new Error("Unexpected axis type: ".concat(axisType));
	}
};
/**
* @param state RechartsRootState
* @return boolean true if there is at least one Bar or RadialBar
*/
var selectHasBar = (state) => state.graphicalItems.cartesianItems.some((item) => item.type === "bar") || state.graphicalItems.polarItems.some((item) => item.type === "radialBar");
/**
* Filters CartesianGraphicalItemSettings by the relevant axis ID
* @param axisType 'xAxis' | 'yAxis' | 'zAxis' | 'radiusAxis' | 'angleAxis'
* @param axisId from props, defaults to 0
*
* @returns Predicate function that return true for CartesianGraphicalItemSettings that are relevant to the specified axis
*/
function itemAxisPredicate(axisType, axisId) {
	return (item) => {
		switch (axisType) {
			case "xAxis": return "xAxisId" in item && item.xAxisId === axisId;
			case "yAxis": return "yAxisId" in item && item.yAxisId === axisId;
			case "zAxis": return "zAxisId" in item && item.zAxisId === axisId;
			case "angleAxis": return "angleAxisId" in item && item.angleAxisId === axisId;
			case "radiusAxis": return "radiusAxisId" in item && item.radiusAxisId === axisId;
			default: return false;
		}
	};
}
var selectUnfilteredCartesianItems = (state) => state.graphicalItems.cartesianItems;
var selectAxisPredicate = createSelector([pickAxisType, pickAxisId], itemAxisPredicate);
var combineGraphicalItemsSettings = (graphicalItems, axisSettings, axisPredicate) => graphicalItems.filter(axisPredicate).filter((item) => {
	if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.includeHidden) === true) return true;
	return !item.hide;
});
var selectCartesianItemsSettings = createSelector([
	selectUnfilteredCartesianItems,
	selectBaseAxis,
	selectAxisPredicate
], combineGraphicalItemsSettings, { memoizeOptions: { resultEqualityCheck: emptyArraysAreEqualCheck } });
var selectStackedCartesianItemsSettings = createSelector([selectCartesianItemsSettings], (cartesianItems) => {
	return cartesianItems.filter((item) => item.type === "area" || item.type === "bar").filter(isStacked);
});
var filterGraphicalNotStackedItems = (cartesianItems) => cartesianItems.filter((item) => !("stackId" in item) || item.stackId === void 0);
var selectCartesianItemsSettingsExceptStacked = createSelector([selectCartesianItemsSettings], filterGraphicalNotStackedItems);
var combineGraphicalItemsData = (cartesianItems) => cartesianItems.map((item) => item.data).filter(Boolean).flat(1);
/**
* Returns true if at least one graphical item does not define its own `data` prop
* and therefore relies on the chart-level data.
* This is used to decide whether to merge chart-level data into the axis domain calculation.
*/
var selectAnyCartesianItemsUsesChartData = createSelector([selectCartesianItemsSettings], (items) => items.some((item) => !item.data));
/**
* This is a "cheap" selector - it returns the data but doesn't iterate them, so it is not sensitive on the array length.
* Also does not apply dataKey yet.
* @param state RechartsRootState
* @returns data defined on the chart graphical items, such as Line or Scatter or Pie, and filtered with appropriate dataKey
*/
var selectCartesianGraphicalItemsData = createSelector([selectCartesianItemsSettings], combineGraphicalItemsData, { memoizeOptions: { resultEqualityCheck: emptyArraysAreEqualCheck } });
var combineDisplayedData = (graphicalItemsData, _ref) => {
	var { chartData = [], dataStartIndex, dataEndIndex } = _ref;
	if (graphicalItemsData.length > 0) return graphicalItemsData;
	return chartData.slice(dataStartIndex, dataEndIndex + 1);
};
/**
* This selector will return all data there is in the chart: graphical items, chart root, all together.
* Useful for figuring out an axis domain (because that needs to know of everything),
* not useful for rendering individual graphical elements (because they need to know which data is theirs and which is not).
*
* This function will discard the original indexes, so it is also not useful for anything that depends on ordering.
*/
var selectDisplayedData = createSelector([selectCartesianGraphicalItemsData, selectChartDataWithIndexesIfNotInPanoramaPosition4], combineDisplayedData);
var combineAppliedValues = (data, axisSettings, items) => {
	if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null) return data.map((item) => ({ value: getValueByDataKey(item, axisSettings.dataKey) }));
	if (items.length > 0) return items.map((item) => item.dataKey).flatMap((dataKey) => data.map((entry) => ({ value: getValueByDataKey(entry, dataKey) })));
	return data.map((entry) => ({ value: entry }));
};
/**
* Computes applied values from graphical items data plus, when needed, chart-level data.
*
* When at least one graphical item has no own `data` (it relies on chart root data) AND the axis has a `dataKey`,
* AND there are other items that do have their own data (meaning `displayedData` only contains graphical items data,
* not chart root data), we also include chart root data values so the axis domain covers all categories,
* including those only present in the chart root data but not in any graphical item's own data.
*
* Values from chart root data that don't match the axis dataKey (undefined) are excluded.
*/
var combineAllAppliedValues = (displayedData, axisSettings, items, _ref2, anyItemUsesChartData, graphicalItemsData) => {
	var { chartData = [], dataStartIndex, dataEndIndex } = _ref2;
	var appliedValues = combineAppliedValues(displayedData, axisSettings, items);
	if (anyItemUsesChartData && (axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null && graphicalItemsData.length > 0) return [...chartData.slice(dataStartIndex, dataEndIndex + 1).map((item) => ({ value: getValueByDataKey(item, axisSettings.dataKey) })).filter((av) => av.value != null), ...appliedValues];
	return appliedValues;
};
/**
* This selector will return all values with the appropriate dataKey applied on them.
* Which dataKey is appropriate depends on where it is defined.
*
* This is an expensive selector - it will iterate all data and compute their value using the provided dataKey.
*/
var selectAllAppliedValues = createSelector([
	selectDisplayedData,
	selectBaseAxis,
	selectCartesianItemsSettings,
	selectChartDataWithIndexesIfNotInPanoramaPosition4,
	selectAnyCartesianItemsUsesChartData,
	selectCartesianGraphicalItemsData
], combineAllAppliedValues);
function makeNumber(val) {
	if (isNumOrStr(val) || val instanceof Date) {
		var n = Number(val);
		if (isWellBehavedNumber(n)) return n;
	}
}
function makeDomain(val) {
	if (Array.isArray(val)) {
		var attempt = [makeNumber(val[0]), makeNumber(val[1])];
		if (isWellFormedNumberDomain(attempt)) return attempt;
		return;
	}
	var n = makeNumber(val);
	if (n == null) return;
	return [n, n];
}
function onlyAllowNumbers(data) {
	return data.map(makeNumber).filter(isNotNil);
}
function sortBy$1(a, b) {
	var aNum = makeNumber(a);
	var bNum = makeNumber(b);
	if (aNum == null && bNum == null) return 0;
	if (aNum == null) return -1;
	if (bNum == null) return 1;
	return aNum - bNum;
}
var selectSortedDataPoints = createSelector([selectAllAppliedValues], (appliedData) => {
	return appliedData === null || appliedData === void 0 ? void 0 : appliedData.map((item) => item.value).sort(sortBy$1);
});
function isErrorBarRelevantForAxisType(axisType, errorBar) {
	switch (axisType) {
		case "xAxis": return errorBar.direction === "x";
		case "yAxis": return errorBar.direction === "y";
		default: return false;
	}
}
/**
* @param entry One item in the 'data' array. Could be anything really - this is defined externally. This is the raw, before dataKey application
* @param appliedValue This is the result of applying the 'main' dataKey on the `entry`.
* @param relevantErrorBars Error bars that are relevant for the current axis and layout and all that.
* @return either undefined or an array of ErrorValue
*/
function getErrorDomainByDataKey(entry, appliedValue, relevantErrorBars) {
	if (!relevantErrorBars) return [];
	if (!relevantErrorBars.length) return [];
	var appliedNumericValue;
	if (typeof appliedValue === "number" && !isNan(appliedValue)) appliedNumericValue = appliedValue;
	else if (Array.isArray(appliedValue)) {
		var numericRangeValues = onlyAllowNumbers(appliedValue);
		if (numericRangeValues.length > 0) appliedNumericValue = Math.max(...numericRangeValues);
	}
	if (appliedNumericValue == null) return [];
	return onlyAllowNumbers(relevantErrorBars.flatMap((eb) => {
		var errorValue = getValueByDataKey(entry, eb.dataKey);
		var lowBound, highBound;
		if (Array.isArray(errorValue)) [lowBound, highBound] = errorValue;
		else lowBound = highBound = errorValue;
		if (!isWellBehavedNumber(lowBound) || !isWellBehavedNumber(highBound)) return;
		return [appliedNumericValue - lowBound, appliedNumericValue + highBound];
	}));
}
var selectTooltipAxis = (state) => {
	return selectRenderableAxisSettings(state, selectTooltipAxisType(state), selectTooltipAxisId(state));
};
var selectTooltipAxisDataKey = createSelector([selectTooltipAxis], (axis) => axis === null || axis === void 0 ? void 0 : axis.dataKey);
var selectDisplayedStackedData = createSelector([
	selectStackedCartesianItemsSettings,
	selectChartDataWithIndexesIfNotInPanoramaPosition4,
	selectTooltipAxis
], combineDisplayedStackedData);
var combineStackGroups = (displayedData, items, stackOffsetType, reverseStackOrder) => {
	var itemsGroup = items.reduce((acc, item) => {
		if (item.stackId == null) return acc;
		var stack = acc[item.stackId];
		if (stack == null) stack = [];
		stack.push(item);
		acc[item.stackId] = stack;
		return acc;
	}, {});
	return Object.fromEntries(Object.entries(itemsGroup).map((_ref3) => {
		var [stackId, graphicalItems] = _ref3;
		var orderedGraphicalItems = reverseStackOrder ? [...graphicalItems].reverse() : graphicalItems;
		return [stackId, {
			stackedData: getStackedData(displayedData, orderedGraphicalItems.map(getStackSeriesIdentifier), stackOffsetType),
			graphicalItems: orderedGraphicalItems
		}];
	}));
};
/**
* Stack groups are groups of graphical items that stack on each other.
* Stack is a function of axis type (X, Y), axis ID, and stack ID.
* Graphical items that do not have a stack ID are not going to be present in stack groups.
*/
var selectStackGroups = createSelector([
	selectDisplayedStackedData,
	selectStackedCartesianItemsSettings,
	selectStackOffsetType,
	selectReverseStackOrder
], combineStackGroups);
var combineDomainOfStackGroups = (stackGroups, _ref4, axisType, domainFromUserPreference) => {
	var { dataStartIndex, dataEndIndex } = _ref4;
	if (domainFromUserPreference != null) return;
	if (axisType === "zAxis") return;
	var domainOfStackGroups = getDomainOfStackGroups(stackGroups, dataStartIndex, dataEndIndex);
	if (domainOfStackGroups != null && domainOfStackGroups[0] === 0 && domainOfStackGroups[1] === 0) return;
	return domainOfStackGroups;
};
var selectAllowsDataOverflow = createSelector([selectBaseAxis], (axisSettings) => axisSettings.allowDataOverflow);
var getDomainDefinition = (axisSettings) => {
	var _axisSettings$domain;
	if (axisSettings == null || !("domain" in axisSettings)) return defaultNumericDomain;
	if (axisSettings.domain != null) return axisSettings.domain;
	if ("ticks" in axisSettings && axisSettings.ticks != null) {
		if (axisSettings.type === "number") {
			var allValues = onlyAllowNumbers(axisSettings.ticks);
			return [Math.min(...allValues), Math.max(...allValues)];
		}
		if (axisSettings.type === "category") return axisSettings.ticks.map(String);
	}
	return (_axisSettings$domain = axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.domain) !== null && _axisSettings$domain !== void 0 ? _axisSettings$domain : defaultNumericDomain;
};
var selectDomainDefinition = createSelector([selectBaseAxis], getDomainDefinition);
/**
* Under certain circumstances, we can determine the domain without looking at the data at all.
* This is the case when the domain is explicitly specified as numbers, or when it is specified
* as 'auto' or 'dataMin'/'dataMax' and data overflow is not allowed.
*
* In that case, this function will return the domain, otherwise it returns undefined.
*
* This is an optimization to avoid unnecessary data processing.
* @param state
* @param axisType
* @param axisId
* @param isPanorama
*/
var selectDomainFromUserPreference = createSelector([selectDomainDefinition, selectAllowsDataOverflow], numericalDomainSpecifiedWithoutRequiringData);
var selectDomainOfStackGroups = createSelector([
	selectStackGroups,
	selectChartDataWithIndexes,
	pickAxisType,
	selectDomainFromUserPreference
], combineDomainOfStackGroups, { memoizeOptions: { resultEqualityCheck: numberDomainEqualityCheck } });
var selectAllErrorBarSettings = (state) => state.errorBars;
var combineRelevantErrorBarSettings = (cartesianItemsSettings, allErrorBarSettings, axisType) => {
	return cartesianItemsSettings.flatMap((item) => {
		return allErrorBarSettings[item.id];
	}).filter(Boolean).filter((e) => {
		return isErrorBarRelevantForAxisType(axisType, e);
	});
};
var mergeDomains = function mergeDomains() {
	for (var _len = arguments.length, domains = new Array(_len), _key = 0; _key < _len; _key++) domains[_key] = arguments[_key];
	var allDomains = domains.filter(Boolean);
	if (allDomains.length === 0) return;
	var allValues = allDomains.flat();
	return [Math.min(...allValues), Math.max(...allValues)];
};
var combineDomainOfAllAppliedNumericalValuesIncludingErrorValues = function combineDomainOfAllAppliedNumericalValuesIncludingErrorValues(displayedData, axisSettings, items, errorBars, axisType) {
	var chartDataSlice = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
	var lowerEnd, upperEnd;
	if (items.length > 0) items.forEach((item) => {
		var _errorBars$item$id;
		var itemData = item.data != null ? [...item.data] : chartDataSlice;
		var relevantErrorBars = (_errorBars$item$id = errorBars[item.id]) === null || _errorBars$item$id === void 0 ? void 0 : _errorBars$item$id.filter((errorBar) => isErrorBarRelevantForAxisType(axisType, errorBar));
		itemData.forEach((entry) => {
			var _axisSettings$dataKey;
			var valueByDataKey = getValueByDataKey(entry, (_axisSettings$dataKey = axisSettings.dataKey) !== null && _axisSettings$dataKey !== void 0 ? _axisSettings$dataKey : item.dataKey);
			var errorDomain = getErrorDomainByDataKey(entry, valueByDataKey, relevantErrorBars);
			if (errorDomain.length >= 2) {
				var localLower = Math.min(...errorDomain);
				var localUpper = Math.max(...errorDomain);
				if (lowerEnd == null || localLower < lowerEnd) lowerEnd = localLower;
				if (upperEnd == null || localUpper > upperEnd) upperEnd = localUpper;
			}
			var dataValueDomain = makeDomain(valueByDataKey);
			if (dataValueDomain != null) {
				lowerEnd = lowerEnd == null ? dataValueDomain[0] : Math.min(lowerEnd, dataValueDomain[0]);
				upperEnd = upperEnd == null ? dataValueDomain[1] : Math.max(upperEnd, dataValueDomain[1]);
			}
		});
	});
	if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null && items.length === 0) displayedData.forEach((item) => {
		var dataValueDomain = makeDomain(getValueByDataKey(item, axisSettings.dataKey));
		if (dataValueDomain != null) {
			lowerEnd = lowerEnd == null ? dataValueDomain[0] : Math.min(lowerEnd, dataValueDomain[0]);
			upperEnd = upperEnd == null ? dataValueDomain[1] : Math.max(upperEnd, dataValueDomain[1]);
		}
	});
	if (isWellBehavedNumber(lowerEnd) && isWellBehavedNumber(upperEnd)) return [lowerEnd, upperEnd];
};
var selectDomainOfAllAppliedNumericalValuesIncludingErrorValues$1 = createSelector([
	selectDisplayedData,
	selectBaseAxis,
	selectCartesianItemsSettingsExceptStacked,
	selectAllErrorBarSettings,
	pickAxisType,
	selectChartDataSliceIfNotInPanorama
], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues, { memoizeOptions: { resultEqualityCheck: numberDomainEqualityCheck } });
function onlyAllowNumbersAndStringsAndDates(item) {
	var { value } = item;
	if (isNumOrStr(value) || value instanceof Date) return value;
}
var computeDomainOfTypeCategory = (allDataSquished, axisSettings, isCategorical) => {
	var categoricalDomain = allDataSquished.map(onlyAllowNumbersAndStringsAndDates).filter((v) => v != null);
	if (isCategorical && (axisSettings.dataKey == null || axisSettings.allowDuplicatedCategory && hasDuplicate(categoricalDomain))) return range(0, allDataSquished.length);
	if (axisSettings.allowDuplicatedCategory) return categoricalDomain;
	return Array.from(new Set(categoricalDomain));
};
var selectReferenceDots = (state) => state.referenceElements.dots;
var filterReferenceElements = (elements, axisType, axisId) => {
	return elements.filter((el) => el.ifOverflow === "extendDomain").filter((el) => {
		if (axisType === "xAxis") return el.xAxisId === axisId;
		return el.yAxisId === axisId;
	});
};
var selectReferenceDotsByAxis = createSelector([
	selectReferenceDots,
	pickAxisType,
	pickAxisId
], filterReferenceElements);
var selectReferenceAreas = (state) => state.referenceElements.areas;
var selectReferenceAreasByAxis = createSelector([
	selectReferenceAreas,
	pickAxisType,
	pickAxisId
], filterReferenceElements);
var selectReferenceLines = (state) => state.referenceElements.lines;
var selectReferenceLinesByAxis = createSelector([
	selectReferenceLines,
	pickAxisType,
	pickAxisId
], filterReferenceElements);
var combineDotsDomain = (dots, axisType) => {
	if (dots == null) return;
	var allCoords = onlyAllowNumbers(dots.map((dot) => axisType === "xAxis" ? dot.x : dot.y));
	if (allCoords.length === 0) return;
	return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceDotsDomain = createSelector(selectReferenceDotsByAxis, pickAxisType, combineDotsDomain);
var combineAreasDomain = (areas, axisType) => {
	if (areas == null) return;
	var allCoords = onlyAllowNumbers(areas.flatMap((area) => [axisType === "xAxis" ? area.x1 : area.y1, axisType === "xAxis" ? area.x2 : area.y2]));
	if (allCoords.length === 0) return;
	return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceAreasDomain = createSelector([selectReferenceAreasByAxis, pickAxisType], combineAreasDomain);
function extractXCoordinates(line) {
	var _line$segment;
	if (line.x != null) return onlyAllowNumbers([line.x]);
	var segmentCoordinates = (_line$segment = line.segment) === null || _line$segment === void 0 ? void 0 : _line$segment.map((s) => s.x);
	if (segmentCoordinates == null || segmentCoordinates.length === 0) return [];
	return onlyAllowNumbers(segmentCoordinates);
}
function extractYCoordinates(line) {
	var _line$segment2;
	if (line.y != null) return onlyAllowNumbers([line.y]);
	var segmentCoordinates = (_line$segment2 = line.segment) === null || _line$segment2 === void 0 ? void 0 : _line$segment2.map((s) => s.y);
	if (segmentCoordinates == null || segmentCoordinates.length === 0) return [];
	return onlyAllowNumbers(segmentCoordinates);
}
var combineLinesDomain = (lines, axisType) => {
	if (lines == null) return;
	var allCoords = lines.flatMap((line) => axisType === "xAxis" ? extractXCoordinates(line) : extractYCoordinates(line));
	if (allCoords.length === 0) return;
	return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceElementsDomain = createSelector(selectReferenceDotsDomain, createSelector([selectReferenceLinesByAxis, pickAxisType], combineLinesDomain), selectReferenceAreasDomain, (dotsDomain, linesDomain, areasDomain) => {
	return mergeDomains(dotsDomain, areasDomain, linesDomain);
});
var combineNumericalDomain = (axisSettings, domainDefinition, domainFromUserPreference, domainOfStackGroups, dataAndErrorBarsDomain, referenceElementsDomain, layout, axisType) => {
	if (domainFromUserPreference != null) return domainFromUserPreference;
	return parseNumericalUserDomain(domainDefinition, layout === "vertical" && axisType === "xAxis" || layout === "horizontal" && axisType === "yAxis" ? mergeDomains(domainOfStackGroups, referenceElementsDomain, dataAndErrorBarsDomain) : mergeDomains(referenceElementsDomain, dataAndErrorBarsDomain), axisSettings.allowDataOverflow);
};
var selectNumericalDomain = createSelector([
	selectBaseAxis,
	selectDomainDefinition,
	selectDomainFromUserPreference,
	selectDomainOfStackGroups,
	selectDomainOfAllAppliedNumericalValuesIncludingErrorValues$1,
	selectReferenceElementsDomain,
	selectChartLayout,
	pickAxisType
], combineNumericalDomain, { memoizeOptions: { resultEqualityCheck: numberDomainEqualityCheck } });
/**
* Expand by design maps everything between 0 and 1,
* there is nothing to compute.
* See https://d3js.org/d3-shape/stack#stack-offsets
*/
var expandDomain = [0, 1];
var combineAxisDomain = (axisSettings, layout, displayedData, allAppliedValues, stackOffsetType, axisType, numericalDomain) => {
	if ((axisSettings == null || displayedData == null || displayedData.length === 0) && numericalDomain === void 0) return;
	var { dataKey, type } = axisSettings;
	var isCategorical = isCategoricalAxis(layout, axisType);
	if (isCategorical && dataKey == null) {
		var _displayedData$length;
		return range(0, (_displayedData$length = displayedData === null || displayedData === void 0 ? void 0 : displayedData.length) !== null && _displayedData$length !== void 0 ? _displayedData$length : 0);
	}
	if (type === "category") return computeDomainOfTypeCategory(allAppliedValues, axisSettings, isCategorical);
	if (stackOffsetType === "expand" && !isCategorical) return expandDomain;
	return numericalDomain;
};
var selectAxisDomain = createSelector([
	selectBaseAxis,
	selectChartLayout,
	selectDisplayedData,
	selectAllAppliedValues,
	selectStackOffsetType,
	pickAxisType,
	selectNumericalDomain
], combineAxisDomain);
var selectRealScaleType = createSelector([
	selectBaseAxis,
	selectHasBar,
	selectChartName
], combineRealScaleType);
var combineNiceTicks = (axisDomain, axisSettings, realScaleType) => {
	var { niceTicks } = axisSettings;
	if (niceTicks === "none") return;
	var domainDefinition = getDomainDefinition(axisSettings);
	var hasDomainAutoKeyword = Array.isArray(domainDefinition) && (domainDefinition[0] === "auto" || domainDefinition[1] === "auto");
	if ((niceTicks === "snap125" || niceTicks === "adaptive") && axisSettings != null && axisSettings.tickCount && isWellFormedNumberDomain(axisDomain)) {
		if (hasDomainAutoKeyword) return getNiceTickValues(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, niceTicks);
		if (axisSettings.type === "number") return getTickValuesFixedDomain(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, niceTicks);
	}
	if (niceTicks === "auto" && realScaleType === "linear" && axisSettings != null && axisSettings.tickCount) {
		if (hasDomainAutoKeyword && isWellFormedNumberDomain(axisDomain)) return getNiceTickValues(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, "adaptive");
		if (axisSettings.type === "number" && isWellFormedNumberDomain(axisDomain)) return getTickValuesFixedDomain(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, "adaptive");
	}
};
var selectNiceTicks = createSelector([
	selectAxisDomain,
	selectRenderableAxisSettings,
	selectRealScaleType
], combineNiceTicks);
var combineAxisDomainWithNiceTicks = (axisSettings, domain, niceTicks, axisType) => {
	if (axisType !== "angleAxis" && (axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.type) === "number" && isWellFormedNumberDomain(domain) && Array.isArray(niceTicks) && niceTicks.length > 0) {
		var _niceTicks$, _niceTicks;
		var minFromDomain = domain[0];
		var minFromTicks = (_niceTicks$ = niceTicks[0]) !== null && _niceTicks$ !== void 0 ? _niceTicks$ : 0;
		var maxFromDomain = domain[1];
		var maxFromTicks = (_niceTicks = niceTicks[niceTicks.length - 1]) !== null && _niceTicks !== void 0 ? _niceTicks : 0;
		return [Math.min(minFromDomain, minFromTicks), Math.max(maxFromDomain, maxFromTicks)];
	}
	return domain;
};
var selectAxisDomainIncludingNiceTicks = createSelector([
	selectBaseAxis,
	selectAxisDomain,
	selectNiceTicks,
	pickAxisType
], combineAxisDomainWithNiceTicks);
var selectCalculatedPadding = createSelector(createSelector(selectAllAppliedValues, selectBaseAxis, (allDataSquished, axisSettings) => {
	if (!axisSettings || axisSettings.type !== "number") return;
	var smallestDistanceBetweenValues = Infinity;
	var sortedValues = Array.from(onlyAllowNumbers(allDataSquished.map((d) => d.value))).sort((a, b) => a - b);
	var first = sortedValues[0];
	var last = sortedValues[sortedValues.length - 1];
	if (first == null || last == null) return Infinity;
	var diff = last - first;
	if (diff === 0) return Infinity;
	for (var i = 0; i < sortedValues.length - 1; i++) {
		var curr = sortedValues[i];
		var next = sortedValues[i + 1];
		if (curr == null || next == null) continue;
		var distance = next - curr;
		smallestDistanceBetweenValues = Math.min(smallestDistanceBetweenValues, distance);
	}
	return smallestDistanceBetweenValues / diff;
}), selectChartLayout, selectBarCategoryGap, selectChartOffsetInternal, (_1, _2, _3, _4, padding) => padding, (smallestDistanceInPercent, layout, barCategoryGap, offset, padding) => {
	if (!isWellBehavedNumber(smallestDistanceInPercent)) return 0;
	var rangeWidth = layout === "vertical" ? offset.height : offset.width;
	if (padding === "gap") return smallestDistanceInPercent * rangeWidth / 2;
	if (padding === "no-gap") {
		var gap = getPercentValue(barCategoryGap, smallestDistanceInPercent * rangeWidth);
		var halfBand = smallestDistanceInPercent * rangeWidth / 2;
		return halfBand - gap - (halfBand - gap) / rangeWidth * gap;
	}
	return 0;
});
var selectCalculatedXAxisPadding = (state, axisId, isPanorama) => {
	var xAxisSettings = selectXAxisSettings(state, axisId);
	if (xAxisSettings == null || typeof xAxisSettings.padding !== "string") return 0;
	return selectCalculatedPadding(state, "xAxis", axisId, isPanorama, xAxisSettings.padding);
};
var selectCalculatedYAxisPadding = (state, axisId, isPanorama) => {
	var yAxisSettings = selectYAxisSettings(state, axisId);
	if (yAxisSettings == null || typeof yAxisSettings.padding !== "string") return 0;
	return selectCalculatedPadding(state, "yAxis", axisId, isPanorama, yAxisSettings.padding);
};
var selectXAxisPadding = createSelector(selectXAxisSettings, selectCalculatedXAxisPadding, (xAxisSettings, calculated) => {
	var _padding$left, _padding$right;
	if (xAxisSettings == null) return {
		left: 0,
		right: 0
	};
	var { padding } = xAxisSettings;
	if (typeof padding === "string") return {
		left: calculated,
		right: calculated
	};
	return {
		left: ((_padding$left = padding.left) !== null && _padding$left !== void 0 ? _padding$left : 0) + calculated,
		right: ((_padding$right = padding.right) !== null && _padding$right !== void 0 ? _padding$right : 0) + calculated
	};
});
var selectYAxisPadding = createSelector(selectYAxisSettings, selectCalculatedYAxisPadding, (yAxisSettings, calculated) => {
	var _padding$top, _padding$bottom;
	if (yAxisSettings == null) return {
		top: 0,
		bottom: 0
	};
	var { padding } = yAxisSettings;
	if (typeof padding === "string") return {
		top: calculated,
		bottom: calculated
	};
	return {
		top: ((_padding$top = padding.top) !== null && _padding$top !== void 0 ? _padding$top : 0) + calculated,
		bottom: ((_padding$bottom = padding.bottom) !== null && _padding$bottom !== void 0 ? _padding$bottom : 0) + calculated
	};
});
var selectXAxisRange = createSelector([
	selectChartOffsetInternal,
	selectXAxisPadding,
	selectBrushDimensions,
	selectBrushSettings,
	(_state, _axisId, isPanorama) => isPanorama
], (offset, padding, brushDimensions, _ref5, isPanorama) => {
	var { padding: brushPadding } = _ref5;
	if (isPanorama) return [brushPadding.left, brushDimensions.width - brushPadding.right];
	return [offset.left + padding.left, offset.left + offset.width - padding.right];
});
var selectYAxisRange = createSelector([
	selectChartOffsetInternal,
	selectChartLayout,
	selectYAxisPadding,
	selectBrushDimensions,
	selectBrushSettings,
	(_state, _axisId, isPanorama) => isPanorama
], (offset, layout, padding, brushDimensions, _ref6, isPanorama) => {
	var { padding: brushPadding } = _ref6;
	if (isPanorama) return [brushDimensions.height - brushPadding.bottom, brushPadding.top];
	if (layout === "horizontal") return [offset.top + offset.height - padding.bottom, offset.top + padding.top];
	return [offset.top + padding.top, offset.top + offset.height - padding.bottom];
});
var selectAxisRange = (state, axisType, axisId, isPanorama) => {
	var _selectZAxisSettings;
	switch (axisType) {
		case "xAxis": return selectXAxisRange(state, axisId, isPanorama);
		case "yAxis": return selectYAxisRange(state, axisId, isPanorama);
		case "zAxis": return (_selectZAxisSettings = selectZAxisSettings(state, axisId)) === null || _selectZAxisSettings === void 0 ? void 0 : _selectZAxisSettings.range;
		case "angleAxis": return selectAngleAxisRange(state);
		case "radiusAxis": return selectRadiusAxisRange(state, axisId);
		default: return;
	}
};
var selectAxisRangeWithReverse = createSelector([selectBaseAxis, selectAxisRange], combineAxisRangeWithReverse);
var selectConfiguredScale = createSelector([
	selectBaseAxis,
	selectRealScaleType,
	createSelector([selectRealScaleType, selectAxisDomainIncludingNiceTicks], combineCheckedDomain),
	selectAxisRangeWithReverse
], combineConfiguredScale);
var combineCategoricalDomain = (layout, appliedValues, axis, axisType) => {
	if (axis == null || axis.dataKey == null) return;
	var { type, scale } = axis;
	if (isCategoricalAxis(layout, axisType) && (type === "number" || scale !== "auto")) return appliedValues.map((d) => d.value);
};
var selectCategoricalDomain = createSelector([
	selectChartLayout,
	selectAllAppliedValues,
	selectRenderableAxisSettings,
	pickAxisType
], combineCategoricalDomain);
var selectAxisScale = createSelector([selectConfiguredScale], rechartsScaleFactory);
createSelector([selectConfiguredScale], combineInverseScaleFunction);
createSelector([selectConfiguredScale, selectSortedDataPoints], createCategoricalInverse);
createSelector([
	selectCartesianItemsSettings,
	selectAllErrorBarSettings,
	pickAxisType
], combineRelevantErrorBarSettings);
function compareIds(a, b) {
	if (a.id < b.id) return -1;
	if (a.id > b.id) return 1;
	return 0;
}
var pickAxisOrientation = (_state, orientation) => orientation;
var pickMirror = (_state, _orientation, mirror) => mirror;
var selectAllXAxesWithOffsetType = createSelector(selectAllXAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var selectAllYAxesWithOffsetType = createSelector(selectAllYAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var getXAxisSize = (offset, axisSettings) => {
	return {
		width: offset.width,
		height: axisSettings.height
	};
};
var getYAxisSize = (offset, axisSettings) => {
	return {
		width: typeof axisSettings.width === "number" ? axisSettings.width : 60,
		height: offset.height
	};
};
var selectXAxisSize = createSelector(selectChartOffsetInternal, selectXAxisSettings, getXAxisSize);
var combineXAxisPositionStartingPoint = (offset, orientation, chartHeight) => {
	switch (orientation) {
		case "top": return offset.top;
		case "bottom": return chartHeight - offset.bottom;
		default: return 0;
	}
};
var combineYAxisPositionStartingPoint = (offset, orientation, chartWidth) => {
	switch (orientation) {
		case "left": return offset.left;
		case "right": return chartWidth - offset.right;
		default: return 0;
	}
};
var selectAllXAxesOffsetSteps = createSelector(selectChartHeight, selectChartOffsetInternal, selectAllXAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartHeight, offset, allAxesWithSameOffsetType, orientation, mirror) => {
	var steps = {};
	var position;
	allAxesWithSameOffsetType.forEach((axis) => {
		var axisSize = getXAxisSize(offset, axis);
		if (position == null) position = combineXAxisPositionStartingPoint(offset, orientation, chartHeight);
		var needSpace = orientation === "top" && !mirror || orientation === "bottom" && mirror;
		steps[axis.id] = position - Number(needSpace) * axisSize.height;
		position += (needSpace ? -1 : 1) * axisSize.height;
	});
	return steps;
});
var selectAllYAxesOffsetSteps = createSelector(selectChartWidth, selectChartOffsetInternal, selectAllYAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartWidth, offset, allAxesWithSameOffsetType, orientation, mirror) => {
	var steps = {};
	var position;
	allAxesWithSameOffsetType.forEach((axis) => {
		var axisSize = getYAxisSize(offset, axis);
		if (position == null) position = combineYAxisPositionStartingPoint(offset, orientation, chartWidth);
		var needSpace = orientation === "left" && !mirror || orientation === "right" && mirror;
		steps[axis.id] = position - Number(needSpace) * axisSize.width;
		position += (needSpace ? -1 : 1) * axisSize.width;
	});
	return steps;
});
var selectXAxisOffsetSteps = (state, axisId) => {
	var axisSettings = selectXAxisSettings(state, axisId);
	if (axisSettings == null) return;
	return selectAllXAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
};
var selectXAxisPosition = createSelector([
	selectChartOffsetInternal,
	selectXAxisSettings,
	selectXAxisOffsetSteps,
	(_, axisId) => axisId
], (offset, axisSettings, allSteps, axisId) => {
	if (axisSettings == null) return;
	var stepOfThisAxis = allSteps === null || allSteps === void 0 ? void 0 : allSteps[axisId];
	if (stepOfThisAxis == null) return {
		x: offset.left,
		y: 0
	};
	return {
		x: offset.left,
		y: stepOfThisAxis
	};
});
var selectYAxisOffsetSteps = (state, axisId) => {
	var axisSettings = selectYAxisSettings(state, axisId);
	if (axisSettings == null) return;
	return selectAllYAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
};
var selectYAxisPosition = createSelector([
	selectChartOffsetInternal,
	selectYAxisSettings,
	selectYAxisOffsetSteps,
	(_, axisId) => axisId
], (offset, axisSettings, allSteps, axisId) => {
	if (axisSettings == null) return;
	var stepOfThisAxis = allSteps === null || allSteps === void 0 ? void 0 : allSteps[axisId];
	if (stepOfThisAxis == null) return {
		x: 0,
		y: offset.top
	};
	return {
		x: stepOfThisAxis,
		y: offset.top
	};
});
var selectYAxisSize = createSelector(selectChartOffsetInternal, selectYAxisSettings, (offset, axisSettings) => {
	return {
		width: typeof axisSettings.width === "number" ? axisSettings.width : 60,
		height: offset.height
	};
});
var selectCartesianAxisSize = (state, axisType, axisId) => {
	switch (axisType) {
		case "xAxis": return selectXAxisSize(state, axisId).width;
		case "yAxis": return selectYAxisSize(state, axisId).height;
		default: return;
	}
};
var combineDuplicateDomain = (chartLayout, appliedValues, axis, axisType) => {
	if (axis == null) return;
	var { allowDuplicatedCategory, type, dataKey } = axis;
	var isCategorical = isCategoricalAxis(chartLayout, axisType);
	var allData = appliedValues.map((av) => av.value);
	var validData = allData.filter((v) => v != null);
	if (dataKey && isCategorical && type === "category" && allowDuplicatedCategory && hasDuplicate(validData)) return allData;
};
var selectDuplicateDomain = createSelector([
	selectChartLayout,
	selectAllAppliedValues,
	selectBaseAxis,
	pickAxisType
], combineDuplicateDomain);
var selectAxisPropsNeededForCartesianGridTicksGenerator = createSelector([
	selectChartLayout,
	selectCartesianAxisSettings,
	selectRealScaleType,
	selectAxisScale,
	selectDuplicateDomain,
	selectCategoricalDomain,
	selectAxisRange,
	selectNiceTicks,
	pickAxisType
], (layout, axis, realScaleType, scale, duplicateDomain, categoricalDomain, axisRange, niceTicks, axisType) => {
	if (axis == null) return;
	var isCategorical = isCategoricalAxis(layout, axisType);
	return {
		angle: axis.angle,
		interval: axis.interval,
		minTickGap: axis.minTickGap,
		orientation: axis.orientation,
		tick: axis.tick,
		tickCount: axis.tickCount,
		tickFormatter: axis.tickFormatter,
		ticks: axis.ticks,
		type: axis.type,
		unit: axis.unit,
		axisType,
		categoricalDomain,
		duplicateDomain,
		isCategorical,
		niceTicks,
		range: axisRange,
		realScaleType,
		scale
	};
});
/**
* Of on four almost identical implementations of tick generation.
* The four horsemen of tick generation are:
* - {@link selectTooltipAxisTicks}
* - {@link combineAxisTicks}
* - {@link getTicksOfAxis}.
* - {@link combineGraphicalItemTicks}
*/
var combineAxisTicks = (layout, axis, realScaleType, scale, niceTicks, axisRange, duplicateDomain, categoricalDomain, axisType) => {
	if (axis == null || scale == null) return;
	var isCategorical = isCategoricalAxis(layout, axisType);
	var { type, ticks, tickCount } = axis;
	var offsetForBand = realScaleType === "scaleBand" && typeof scale.bandwidth === "function" ? scale.bandwidth() / 2 : 2;
	var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
	offset = axisType === "angleAxis" && axisRange != null && axisRange.length >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
	var ticksOrNiceTicks = ticks || niceTicks;
	if (ticksOrNiceTicks) return ticksOrNiceTicks.map((entry, index) => {
		var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
		var scaled = scale.map(scaleContent);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			index,
			coordinate: scaled + offset,
			value: entry,
			offset
		};
	}).filter(isNotNil);
	if (isCategorical && categoricalDomain) return categoricalDomain.map((entry, index) => {
		var scaled = scale.map(entry);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: entry,
			index,
			offset
		};
	}).filter(isNotNil);
	if (scale.ticks) return scale.ticks(tickCount).map((entry, index) => {
		var scaled = scale.map(entry);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: entry,
			index,
			offset
		};
	}).filter(isNotNil);
	return scale.domain().map((entry, index) => {
		var scaled = scale.map(entry);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: duplicateDomain ? duplicateDomain[entry] : entry,
			index,
			offset
		};
	}).filter(isNotNil);
};
var selectTicksOfAxis = createSelector([
	selectChartLayout,
	selectRenderableAxisSettings,
	selectRealScaleType,
	selectAxisScale,
	selectNiceTicks,
	selectAxisRange,
	selectDuplicateDomain,
	selectCategoricalDomain,
	pickAxisType
], combineAxisTicks);
/**
* Of on four almost identical implementations of tick generation.
* The four horsemen of tick generation are:
* - {@link selectTooltipAxisTicks}
* - {@link combineAxisTicks}
* - {@link getTicksOfAxis}.
* - {@link combineGraphicalItemTicks}
*/
var combineGraphicalItemTicks = (layout, axis, scale, axisRange, duplicateDomain, categoricalDomain, axisType) => {
	if (axis == null || scale == null || axisRange == null || axisRange[0] === axisRange[1]) return;
	var isCategorical = isCategoricalAxis(layout, axisType);
	var { tickCount } = axis;
	var offset = 0;
	offset = axisType === "angleAxis" && (axisRange === null || axisRange === void 0 ? void 0 : axisRange.length) >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
	if (isCategorical && categoricalDomain) return categoricalDomain.map((entry, index) => {
		var scaled = scale.map(entry);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: entry,
			index,
			offset
		};
	}).filter(isNotNil);
	if (scale.ticks) return scale.ticks(tickCount).map((entry, index) => {
		var scaled = scale.map(entry);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: entry,
			index,
			offset
		};
	}).filter(isNotNil);
	return scale.domain().map((entry, index) => {
		var scaled = scale.map(entry);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: duplicateDomain ? duplicateDomain[entry] : entry,
			index,
			offset
		};
	}).filter(isNotNil);
};
var selectTicksOfGraphicalItem = createSelector([
	selectChartLayout,
	selectRenderableAxisSettings,
	selectAxisScale,
	selectAxisRange,
	selectDuplicateDomain,
	selectCategoricalDomain,
	pickAxisType
], combineGraphicalItemTicks);
/**
* This is the internal representation of an axis along with its scale function.
* Here we have already computed the scale function for the axis,
* and replaced the union type of scale (string | function) with just the function type.
*/
var selectAxisWithScale = createSelector(selectBaseAxis, selectAxisScale, (axis, scale) => {
	if (axis == null || scale == null) return;
	return _objectSpread$23(_objectSpread$23({}, axis), {}, { scale });
});
createSelector((state, _axisType, axisId) => selectZAxisSettings(state, axisId), createSelector([createSelector([
	selectBaseAxis,
	selectRealScaleType,
	selectAxisDomain,
	selectAxisRangeWithReverse
], combineConfiguredScale)], rechartsScaleFactory), (axis, scale) => {
	if (axis == null || scale == null) return;
	return _objectSpread$23(_objectSpread$23({}, axis), {}, { scale });
});
/**
* We are also going to need to implement polar chart directions if we want to support keyboard controls for those.
*/
var selectChartDirection = createSelector([
	selectChartLayout,
	selectAllXAxes,
	selectAllYAxes
], (layout, allXAxes, allYAxes) => {
	switch (layout) {
		case "horizontal": return allXAxes.some((axis) => axis.reversed) ? "right-to-left" : "left-to-right";
		case "vertical": return allYAxes.some((axis) => axis.reversed) ? "bottom-to-top" : "top-to-bottom";
		case "centric":
		case "radial": return "left-to-right";
		default: return;
	}
});
var selectRenderedTicksOfAxis = (state, axisType, axisId) => {
	var _state$renderedTicks$;
	return (_state$renderedTicks$ = state.renderedTicks[axisType]) === null || _state$renderedTicks$ === void 0 ? void 0 : _state$renderedTicks$[axisId];
};
createSelector([selectRenderedTicksOfAxis], (ticks) => {
	if (!ticks || ticks.length === 0) return;
	return (pixelValue) => {
		var _closestTick;
		var minDistance = Infinity;
		var closestTick = ticks[0];
		for (var tick of ticks) {
			var distance = Math.abs(tick.coordinate - pixelValue);
			if (distance < minDistance) {
				minDistance = distance;
				closestTick = tick;
			}
		}
		return (_closestTick = closestTick) === null || _closestTick === void 0 ? void 0 : _closestTick.value;
	};
});
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectTooltipEventType.js
var selectDefaultTooltipEventType = (state) => state.options.defaultTooltipEventType;
var selectValidateTooltipEventTypes = (state) => state.options.validateTooltipEventTypes;
function combineTooltipEventType(shared, defaultTooltipEventType, validateTooltipEventTypes) {
	if (shared == null) return defaultTooltipEventType;
	var eventType = shared ? "axis" : "item";
	if (validateTooltipEventTypes == null) return defaultTooltipEventType;
	return validateTooltipEventTypes.includes(eventType) ? eventType : defaultTooltipEventType;
}
function selectTooltipEventType$1(state, shared) {
	return combineTooltipEventType(shared, selectDefaultTooltipEventType(state), selectValidateTooltipEventTypes(state));
}
function useTooltipEventType(shared) {
	return useAppSelector((state) => selectTooltipEventType$1(state, shared));
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineActiveLabel.js
var combineActiveLabel = (tooltipTicks, activeIndex) => {
	var _tooltipTicks$n;
	var n = Number(activeIndex);
	if (isNan(n) || activeIndex == null) return;
	return n >= 0 ? tooltipTicks === null || tooltipTicks === void 0 || (_tooltipTicks$n = tooltipTicks[n]) === null || _tooltipTicks$n === void 0 ? void 0 : _tooltipTicks$n.value : void 0;
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectTooltipSettings.js
var selectTooltipSettings = (state) => state.tooltip.settings;
//#endregion
//#region node_modules/recharts/es6/state/tooltipSlice.js
/**
* One Tooltip can display multiple TooltipPayloadEntries at a time.
*/
/**
* So what happens is that the tooltip payload is decided based on the available data, and the dataKey.
* The dataKey can either be defined on the graphical element (like Line, or Bar)
* or on the tooltip itself.
*
* The data can be defined in the chart element, or in the graphical item.
*
* So this type is all the settings, other than the data + dataKey complications.
*/
/**
* This is what Tooltip renders.
*/
/**
* null means no active index
* string means: whichever index from the chart data it is.
* Different charts have different requirements on data shapes,
* and are also responsible for providing a function that will accept this index
* and return data.
*/
/**
* Different items have different data shapes so the state has no opinion on what the data shape should be;
* the only requirement is that the chart also provides a searcher function
* that accepts the data, and a key, and returns whatever the payload in Tooltip should be.
*/
/**
* So this informs the "tooltip event type". Tooltip event type can be either "axis" or "item"
* and it is used for two things:
* 1. Sets the active area
* 2. Sets the background and cursor highlights
*
* Some charts only allow to have one type of tooltip event type, some allow both.
* Those charts that allow both will have one default, and the "shared" prop will be used to switch between them.
* Undefined means "use the chart default".
*
* Charts that only allow one tooltip event type, will ignore the shared prop.
*/
/**
* A generic state for user interaction with the chart.
* User interaction can come through multiple channels: mouse events, keyboard events, or hardcoded in props, or synchronised from other charts.
*
* Each of the interaction states is represented as TooltipInteractionState,
* and then the selectors and Tooltip will decide which of the interaction states to use.
*/
var noInteraction = {
	active: false,
	index: null,
	dataKey: void 0,
	graphicalItemId: void 0,
	coordinate: void 0
};
/**
* This is the event we get when user is interacting with a specific graphical item.
*/
/**
* Keyboard interaction payload has no graphical item ID,
* and no dataKey, because keyboard interaction is always
* with the whole chart, not with a specific graphical item.
*/
var tooltipSlice = createSlice({
	name: "tooltip",
	initialState: {
		itemInteraction: {
			click: noInteraction,
			hover: noInteraction
		},
		axisInteraction: {
			click: noInteraction,
			hover: noInteraction
		},
		keyboardInteraction: noInteraction,
		syncInteraction: {
			active: false,
			index: null,
			dataKey: void 0,
			label: void 0,
			coordinate: void 0,
			sourceViewBox: void 0,
			graphicalItemId: void 0
		},
		tooltipItemPayloads: [],
		settings: {
			shared: void 0,
			trigger: "hover",
			axisId: 0,
			active: false,
			defaultIndex: void 0
		}
	},
	reducers: {
		addTooltipEntrySettings: {
			reducer(state, action) {
				state.tooltipItemPayloads.push(castDraft(action.payload));
			},
			prepare: prepareAutoBatched()
		},
		replaceTooltipEntrySettings: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				var index = current(state).tooltipItemPayloads.indexOf(castDraft(prev));
				if (index > -1) state.tooltipItemPayloads[index] = castDraft(next);
			},
			prepare: prepareAutoBatched()
		},
		removeTooltipEntrySettings: {
			reducer(state, action) {
				var index = current(state).tooltipItemPayloads.indexOf(castDraft(action.payload));
				if (index > -1) state.tooltipItemPayloads.splice(index, 1);
			},
			prepare: prepareAutoBatched()
		},
		setTooltipSettingsState(state, action) {
			state.settings = action.payload;
		},
		setActiveMouseOverItemIndex(state, action) {
			state.syncInteraction.active = false;
			state.syncInteraction.sourceViewBox = void 0;
			state.keyboardInteraction.active = false;
			state.itemInteraction.hover.active = true;
			state.itemInteraction.hover.index = action.payload.activeIndex;
			state.itemInteraction.hover.dataKey = action.payload.activeDataKey;
			state.itemInteraction.hover.graphicalItemId = action.payload.activeGraphicalItemId;
			state.itemInteraction.hover.coordinate = action.payload.activeCoordinate;
		},
		mouseLeaveChart(state) {
			state.itemInteraction.hover.active = false;
			state.axisInteraction.hover.active = false;
		},
		mouseLeaveItem(state) {
			state.itemInteraction.hover.active = false;
		},
		setActiveClickItemIndex(state, action) {
			state.syncInteraction.active = false;
			state.syncInteraction.sourceViewBox = void 0;
			state.itemInteraction.click.active = true;
			state.keyboardInteraction.active = false;
			state.itemInteraction.click.index = action.payload.activeIndex;
			state.itemInteraction.click.dataKey = action.payload.activeDataKey;
			state.itemInteraction.click.graphicalItemId = action.payload.activeGraphicalItemId;
			state.itemInteraction.click.coordinate = action.payload.activeCoordinate;
		},
		setMouseOverAxisIndex(state, action) {
			state.syncInteraction.active = false;
			state.syncInteraction.sourceViewBox = void 0;
			state.axisInteraction.hover.active = true;
			state.keyboardInteraction.active = false;
			state.axisInteraction.hover.index = action.payload.activeIndex;
			state.axisInteraction.hover.dataKey = action.payload.activeDataKey;
			state.axisInteraction.hover.coordinate = action.payload.activeCoordinate;
		},
		setMouseClickAxisIndex(state, action) {
			state.syncInteraction.active = false;
			state.syncInteraction.sourceViewBox = void 0;
			state.keyboardInteraction.active = false;
			state.axisInteraction.click.active = true;
			state.axisInteraction.click.index = action.payload.activeIndex;
			state.axisInteraction.click.dataKey = action.payload.activeDataKey;
			state.axisInteraction.click.coordinate = action.payload.activeCoordinate;
		},
		setSyncInteraction(state, action) {
			state.syncInteraction = action.payload;
		},
		setKeyboardInteraction(state, action) {
			state.keyboardInteraction.active = action.payload.active;
			state.keyboardInteraction.index = action.payload.activeIndex;
			state.keyboardInteraction.coordinate = action.payload.activeCoordinate;
		}
	}
});
var { addTooltipEntrySettings, replaceTooltipEntrySettings, removeTooltipEntrySettings, setTooltipSettingsState, setActiveMouseOverItemIndex, mouseLeaveItem, mouseLeaveChart, setActiveClickItemIndex, setMouseOverAxisIndex, setMouseClickAxisIndex, setSyncInteraction, setKeyboardInteraction } = tooltipSlice.actions;
var tooltipReducer = tooltipSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineTooltipInteractionState.js
function ownKeys$22(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$22(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$22(Object(t), !0).forEach(function(r) {
			_defineProperty$24(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$22(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$24(e, r, t) {
	return (r = _toPropertyKey$24(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$24(t) {
	var i = _toPrimitive$24(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$24(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger) {
	if (tooltipEventType === "axis") {
		if (trigger === "click") return tooltipState.axisInteraction.click;
		return tooltipState.axisInteraction.hover;
	}
	if (trigger === "click") return tooltipState.itemInteraction.click;
	return tooltipState.itemInteraction.hover;
}
function hasBeenActivePreviously(tooltipInteractionState) {
	return tooltipInteractionState.index != null;
}
var combineTooltipInteractionState = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
	if (tooltipEventType == null) return noInteraction;
	var appropriateMouseInteraction = chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger);
	if (appropriateMouseInteraction == null) return noInteraction;
	if (appropriateMouseInteraction.active) return appropriateMouseInteraction;
	if (tooltipState.keyboardInteraction.active) return tooltipState.keyboardInteraction;
	if (tooltipState.syncInteraction.active && tooltipState.syncInteraction.index != null) return tooltipState.syncInteraction;
	var activeFromProps = tooltipState.settings.active === true;
	if (hasBeenActivePreviously(appropriateMouseInteraction)) {
		if (activeFromProps) return _objectSpread$22(_objectSpread$22({}, appropriateMouseInteraction), {}, { active: true });
	} else if (defaultIndex != null) return {
		active: true,
		coordinate: void 0,
		dataKey: void 0,
		index: defaultIndex,
		graphicalItemId: void 0
	};
	return _objectSpread$22(_objectSpread$22({}, noInteraction), {}, { coordinate: appropriateMouseInteraction.coordinate });
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineActiveTooltipIndex.js
function toFiniteNumber(value) {
	if (typeof value === "number") return Number.isFinite(value) ? value : void 0;
	if (value instanceof Date) {
		var numericValue = value.valueOf();
		return Number.isFinite(numericValue) ? numericValue : void 0;
	}
	var parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : void 0;
}
function isValueWithinNumberDomain(value, domain) {
	var numericValue = toFiniteNumber(value);
	var lowerBound = domain[0];
	var upperBound = domain[1];
	if (numericValue === void 0) return false;
	return numericValue >= Math.min(lowerBound, upperBound) && numericValue <= Math.max(lowerBound, upperBound);
}
function isValueWithinDomain(entry, axisDataKey, domain) {
	if (domain == null || axisDataKey == null) return true;
	var value = getValueByDataKey(entry, axisDataKey);
	if (value == null) return true;
	if (!isWellFormedNumberDomain(domain)) return true;
	return isValueWithinNumberDomain(value, domain);
}
var combineActiveTooltipIndex = (tooltipInteraction, chartData, axisDataKey, domain) => {
	var desiredIndex = tooltipInteraction === null || tooltipInteraction === void 0 ? void 0 : tooltipInteraction.index;
	if (desiredIndex == null) return null;
	var indexAsNumber = Number(desiredIndex);
	if (!isWellBehavedNumber(indexAsNumber)) return desiredIndex;
	var lowerLimit = 0;
	var upperLimit = Infinity;
	if (chartData.length > 0) upperLimit = chartData.length - 1;
	var clampedIndex = Math.max(lowerLimit, Math.min(indexAsNumber, upperLimit));
	var entry = chartData[clampedIndex];
	if (entry == null) return String(clampedIndex);
	if (!isValueWithinDomain(entry, axisDataKey, domain)) return null;
	return String(clampedIndex);
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineCoordinateForDefaultIndex.js
var combineCoordinateForDefaultIndex = (width, height, layout, offset, tooltipTicks, defaultIndex, tooltipConfigurations) => {
	if (defaultIndex == null) return;
	var firstConfiguration = tooltipConfigurations[0];
	var maybePosition = firstConfiguration === null || firstConfiguration === void 0 ? void 0 : firstConfiguration.getPosition(defaultIndex);
	if (maybePosition != null) return maybePosition;
	var tick = tooltipTicks === null || tooltipTicks === void 0 ? void 0 : tooltipTicks[Number(defaultIndex)];
	if (!tick) return;
	switch (layout) {
		case "horizontal": return {
			x: tick.coordinate,
			y: (offset.top + height) / 2
		};
		default: return {
			x: (offset.left + width) / 2,
			y: tick.coordinate
		};
	}
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineTooltipPayloadConfigurations.js
var combineTooltipPayloadConfigurations = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
	if (tooltipEventType === "axis") return tooltipState.tooltipItemPayloads;
	if (tooltipState.tooltipItemPayloads.length === 0) return [];
	var filterByGraphicalItemId;
	if (trigger === "hover") filterByGraphicalItemId = tooltipState.itemInteraction.hover.graphicalItemId;
	else filterByGraphicalItemId = tooltipState.itemInteraction.click.graphicalItemId;
	if (tooltipState.syncInteraction.active && filterByGraphicalItemId == null) return tooltipState.tooltipItemPayloads;
	if (filterByGraphicalItemId == null && (defaultIndex != null || tooltipState.keyboardInteraction.active)) {
		var firstItemPayload = tooltipState.tooltipItemPayloads[0];
		if (firstItemPayload != null) return [firstItemPayload];
		return [];
	}
	return tooltipState.tooltipItemPayloads.filter((tpc) => {
		var _tpc$settings;
		return ((_tpc$settings = tpc.settings) === null || _tpc$settings === void 0 ? void 0 : _tpc$settings.graphicalItemId) === filterByGraphicalItemId;
	});
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectTooltipPayloadSearcher.js
var selectTooltipPayloadSearcher = (state) => state.options.tooltipPayloadSearcher;
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectTooltipState.js
var selectTooltipState = (state) => state.tooltip;
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineTooltipPayload.js
function ownKeys$21(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$21(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$21(Object(t), !0).forEach(function(r) {
			_defineProperty$23(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$21(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$23(e, r, t) {
	return (r = _toPropertyKey$23(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$23(t) {
	var i = _toPrimitive$23(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$23(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function parseName(value) {
	if (typeof value === "string" || typeof value === "number") return value;
}
function parseUnit(value) {
	if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return value;
}
function parseDataKey(value) {
	if (typeof value === "string" || typeof value === "number") return value;
	if (typeof value === "function") return (obj) => value(obj);
}
function parseColor(value) {
	if (typeof value === "string") return value;
}
function parseTooltipPayloadItem(item) {
	if (item == null || typeof item !== "object") return;
	return {
		name: "name" in item ? parseName(item.name) : void 0,
		unit: "unit" in item ? parseUnit(item.unit) : void 0,
		dataKey: "dataKey" in item ? parseDataKey(item.dataKey) : void 0,
		payload: "payload" in item ? item.payload : void 0,
		color: "color" in item ? parseColor(item.color) : void 0,
		fill: "fill" in item ? parseColor(item.fill) : void 0
	};
}
function selectFinalData(dataDefinedOnItem, dataDefinedOnChart) {
	if (dataDefinedOnItem != null) return dataDefinedOnItem;
	return dataDefinedOnChart;
}
var combineTooltipPayload = (tooltipPayloadConfigurations, activeIndex, chartDataState, tooltipAxisDataKey, activeLabel, tooltipPayloadSearcher, tooltipEventType) => {
	if (activeIndex == null || tooltipPayloadSearcher == null) return;
	var { chartData, computedData, dataStartIndex, dataEndIndex } = chartDataState;
	return tooltipPayloadConfigurations.reduce((agg, _ref) => {
		var _settings$dataKey;
		var { dataDefinedOnItem, settings } = _ref;
		var finalData = selectFinalData(dataDefinedOnItem, chartData);
		var sliced = Array.isArray(finalData) ? getSliced(finalData, dataStartIndex, dataEndIndex) : finalData;
		var finalDataKey = (_settings$dataKey = settings === null || settings === void 0 ? void 0 : settings.dataKey) !== null && _settings$dataKey !== void 0 ? _settings$dataKey : tooltipAxisDataKey;
		var finalNameKey = settings === null || settings === void 0 ? void 0 : settings.nameKey;
		var tooltipPayload;
		if (tooltipAxisDataKey && Array.isArray(sliced) && !Array.isArray(sliced[0]) && tooltipEventType === "axis") tooltipPayload = findEntryInArray(sliced, tooltipAxisDataKey, activeLabel);
		else tooltipPayload = tooltipPayloadSearcher(sliced, activeIndex, computedData, finalNameKey);
		if (Array.isArray(tooltipPayload)) tooltipPayload.forEach((item) => {
			var _parsedItem$color, _parsedItem$fill;
			var parsedItem = parseTooltipPayloadItem(item);
			var itemName = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.name;
			var itemDataKey = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.dataKey;
			var itemPayload = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.payload;
			var newSettings = _objectSpread$21(_objectSpread$21({}, settings), {}, {
				name: itemName,
				unit: parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.unit,
				color: (_parsedItem$color = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.color) !== null && _parsedItem$color !== void 0 ? _parsedItem$color : settings === null || settings === void 0 ? void 0 : settings.color,
				fill: (_parsedItem$fill = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.fill) !== null && _parsedItem$fill !== void 0 ? _parsedItem$fill : settings === null || settings === void 0 ? void 0 : settings.fill
			});
			agg.push(getTooltipEntry({
				tooltipEntrySettings: newSettings,
				dataKey: itemDataKey,
				payload: itemPayload,
				value: getValueByDataKey(itemPayload, itemDataKey),
				name: itemName == null ? void 0 : String(itemName)
			}));
		});
		else {
			var _getValueByDataKey;
			agg.push(getTooltipEntry({
				tooltipEntrySettings: settings,
				dataKey: finalDataKey,
				payload: tooltipPayload,
				value: getValueByDataKey(tooltipPayload, finalDataKey),
				name: (_getValueByDataKey = getValueByDataKey(tooltipPayload, finalNameKey)) !== null && _getValueByDataKey !== void 0 ? _getValueByDataKey : settings === null || settings === void 0 ? void 0 : settings.name
			}));
		}
		return agg;
	}, []);
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/tooltipSelectors.js
var selectTooltipAxisRealScaleType = createSelector([
	selectTooltipAxis,
	selectHasBar,
	selectChartName
], combineRealScaleType);
var selectAllGraphicalItemsSettings = createSelector([
	createSelector([(state) => state.graphicalItems.cartesianItems, (state) => state.graphicalItems.polarItems], (cartesianItems, polarItems) => [...cartesianItems, ...polarItems]),
	selectTooltipAxis,
	createSelector([selectTooltipAxisType, selectTooltipAxisId], itemAxisPredicate)
], combineGraphicalItemsSettings, { memoizeOptions: { resultEqualityCheck: emptyArraysAreEqualCheck } });
var selectAllStackedGraphicalItemsSettings = createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked));
var selectTooltipGraphicalItemsData = createSelector([selectAllGraphicalItemsSettings], combineGraphicalItemsData, { memoizeOptions: { resultEqualityCheck: emptyArraysAreEqualCheck } });
var selectAnyTooltipItemUsesChartData = createSelector([selectAllGraphicalItemsSettings], (items) => items.some((item) => !item.data));
/**
* Data for tooltip always use the data with indexes set by a Brush,
* and never accept the isPanorama flag:
* because Tooltip never displays inside the panorama anyway
* so we don't need to worry what would happen there.
*/
var selectTooltipDisplayedData = createSelector([selectTooltipGraphicalItemsData, selectChartDataWithIndexes], combineDisplayedData);
var selectTooltipStackedData = createSelector([
	selectAllStackedGraphicalItemsSettings,
	selectChartDataWithIndexes,
	selectTooltipAxis
], combineDisplayedStackedData);
var selectAllTooltipAppliedValues = createSelector([
	selectTooltipDisplayedData,
	selectTooltipAxis,
	selectAllGraphicalItemsSettings,
	selectChartDataWithIndexes,
	selectAnyTooltipItemUsesChartData,
	selectTooltipGraphicalItemsData
], combineAllAppliedValues);
var selectTooltipAxisDomainDefinition = createSelector([selectTooltipAxis], getDomainDefinition);
var selectTooltipDomainFromUserPreferences = createSelector([selectTooltipAxisDomainDefinition, createSelector([selectTooltipAxis], (axisSettings) => axisSettings.allowDataOverflow)], numericalDomainSpecifiedWithoutRequiringData);
var selectTooltipDomainOfStackGroups = createSelector([
	createSelector([
		selectTooltipStackedData,
		createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked)),
		selectStackOffsetType,
		selectReverseStackOrder
	], combineStackGroups),
	selectChartDataWithIndexes,
	selectTooltipAxisType,
	selectTooltipDomainFromUserPreferences
], combineDomainOfStackGroups);
var selectDomainOfAllAppliedNumericalValuesIncludingErrorValues = createSelector([
	selectTooltipDisplayedData,
	selectTooltipAxis,
	createSelector([selectAllGraphicalItemsSettings], filterGraphicalNotStackedItems),
	selectAllErrorBarSettings,
	selectTooltipAxisType,
	selectChartDataSliceWithIndexes
], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues, { memoizeOptions: { resultEqualityCheck: numberDomainEqualityCheck } });
var selectTooltipReferenceDotsDomain = createSelector([createSelector([
	selectReferenceDots,
	selectTooltipAxisType,
	selectTooltipAxisId
], filterReferenceElements), selectTooltipAxisType], combineDotsDomain);
var selectTooltipReferenceAreasDomain = createSelector([createSelector([
	selectReferenceAreas,
	selectTooltipAxisType,
	selectTooltipAxisId
], filterReferenceElements), selectTooltipAxisType], combineAreasDomain);
var selectTooltipAxisDomain = createSelector([
	selectTooltipAxis,
	selectChartLayout,
	selectTooltipDisplayedData,
	selectAllTooltipAppliedValues,
	selectStackOffsetType,
	selectTooltipAxisType,
	createSelector([
		selectTooltipAxis,
		selectTooltipAxisDomainDefinition,
		selectTooltipDomainFromUserPreferences,
		selectTooltipDomainOfStackGroups,
		selectDomainOfAllAppliedNumericalValuesIncludingErrorValues,
		createSelector([
			selectTooltipReferenceDotsDomain,
			createSelector([createSelector([
				selectReferenceLines,
				selectTooltipAxisType,
				selectTooltipAxisId
			], filterReferenceElements), selectTooltipAxisType], combineLinesDomain),
			selectTooltipReferenceAreasDomain
		], mergeDomains),
		selectChartLayout,
		selectTooltipAxisType
	], combineNumericalDomain)
], combineAxisDomain);
var selectTooltipAxisDomainIncludingNiceTicks = createSelector([
	selectTooltipAxis,
	selectTooltipAxisDomain,
	createSelector([
		selectTooltipAxisDomain,
		selectTooltipAxis,
		selectTooltipAxisRealScaleType
	], combineNiceTicks),
	selectTooltipAxisType
], combineAxisDomainWithNiceTicks);
var selectTooltipAxisRange = (state) => {
	return selectAxisRange(state, selectTooltipAxisType(state), selectTooltipAxisId(state), false);
};
var selectTooltipAxisRangeWithReverse = createSelector([selectTooltipAxis, selectTooltipAxisRange], combineAxisRangeWithReverse);
var selectTooltipAxisScale = createSelector([createSelector([
	selectTooltipAxis,
	selectTooltipAxisRealScaleType,
	selectTooltipAxisDomainIncludingNiceTicks,
	selectTooltipAxisRangeWithReverse
], combineConfiguredScale)], rechartsScaleFactory);
var selectTooltipDuplicateDomain = createSelector([
	selectChartLayout,
	selectAllTooltipAppliedValues,
	selectTooltipAxis,
	selectTooltipAxisType
], combineDuplicateDomain);
var selectTooltipCategoricalDomain = createSelector([
	selectChartLayout,
	selectAllTooltipAppliedValues,
	selectTooltipAxis,
	selectTooltipAxisType
], combineCategoricalDomain);
var combineTicksOfTooltipAxis = (layout, axis, realScaleType, scale, range, duplicateDomain, categoricalDomain, axisType) => {
	if (!axis) return;
	var { type } = axis;
	var isCategorical = isCategoricalAxis(layout, axisType);
	if (!scale) return;
	var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
	var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
	offset = axisType === "angleAxis" && range != null && (range === null || range === void 0 ? void 0 : range.length) >= 2 ? mathSign(range[0] - range[1]) * 2 * offset : offset;
	if (isCategorical && categoricalDomain) return categoricalDomain.map((entry, index) => {
		var scaled = scale.map(entry);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: entry,
			index,
			offset
		};
	}).filter(isNotNil);
	return scale.domain().map((entry, index) => {
		var scaled = scale.map(entry);
		if (!isWellBehavedNumber(scaled)) return null;
		return {
			coordinate: scaled + offset,
			value: duplicateDomain ? duplicateDomain[entry] : entry,
			index,
			offset
		};
	}).filter(isNotNil);
};
/**
* Of on four almost identical implementations of tick generation.
* The four horsemen of tick generation are:
* - {@link selectTooltipAxisTicks}
* - {@link combineAxisTicks}
* - {@link getTicksOfAxis}.
* - {@link combineGraphicalItemTicks}
*/
var selectTooltipAxisTicks = createSelector([
	selectChartLayout,
	selectTooltipAxis,
	selectTooltipAxisRealScaleType,
	selectTooltipAxisScale,
	selectTooltipAxisRange,
	selectTooltipDuplicateDomain,
	selectTooltipCategoricalDomain,
	selectTooltipAxisType
], combineTicksOfTooltipAxis);
var selectTooltipEventType = createSelector([
	selectDefaultTooltipEventType,
	selectValidateTooltipEventTypes,
	selectTooltipSettings
], (defaultTooltipEventType, validateTooltipEventType, settings) => combineTooltipEventType(settings.shared, defaultTooltipEventType, validateTooltipEventType));
var selectTooltipTrigger = (state) => state.tooltip.settings.trigger;
var selectDefaultIndex = (state) => state.tooltip.settings.defaultIndex;
var selectTooltipInteractionState$1 = createSelector([
	selectTooltipState,
	selectTooltipEventType,
	selectTooltipTrigger,
	selectDefaultIndex
], combineTooltipInteractionState);
var selectActiveTooltipIndex = createSelector([
	selectTooltipInteractionState$1,
	selectTooltipDisplayedData,
	selectTooltipAxisDataKey,
	selectTooltipAxisDomain
], combineActiveTooltipIndex);
var selectActiveLabel$1 = createSelector([selectTooltipAxisTicks, selectActiveTooltipIndex], combineActiveLabel);
var selectActiveTooltipDataKey = createSelector([selectTooltipInteractionState$1], (tooltipInteraction) => {
	if (!tooltipInteraction) return;
	return tooltipInteraction.dataKey;
});
var selectActiveTooltipGraphicalItemId = createSelector([selectTooltipInteractionState$1], (tooltipInteraction) => {
	if (!tooltipInteraction) return;
	return tooltipInteraction.graphicalItemId;
});
var selectTooltipPayloadConfigurations$1 = createSelector([
	selectTooltipState,
	selectTooltipEventType,
	selectTooltipTrigger,
	selectDefaultIndex
], combineTooltipPayloadConfigurations);
var selectActiveTooltipCoordinate = createSelector([selectTooltipInteractionState$1, createSelector([
	selectChartWidth,
	selectChartHeight,
	selectChartLayout,
	selectChartOffsetInternal,
	selectTooltipAxisTicks,
	selectDefaultIndex,
	selectTooltipPayloadConfigurations$1
], combineCoordinateForDefaultIndex)], (tooltipInteractionState, defaultIndexCoordinate) => {
	if (tooltipInteractionState !== null && tooltipInteractionState !== void 0 && tooltipInteractionState.coordinate) return tooltipInteractionState.coordinate;
	return defaultIndexCoordinate;
});
var selectIsTooltipActive$1 = createSelector([selectTooltipInteractionState$1], (tooltipInteractionState) => {
	var _tooltipInteractionSt;
	return (_tooltipInteractionSt = tooltipInteractionState === null || tooltipInteractionState === void 0 ? void 0 : tooltipInteractionState.active) !== null && _tooltipInteractionSt !== void 0 ? _tooltipInteractionSt : false;
});
createSelector([createSelector([
	selectTooltipPayloadConfigurations$1,
	selectActiveTooltipIndex,
	selectChartDataWithIndexes,
	selectTooltipAxisDataKey,
	selectActiveLabel$1,
	selectTooltipPayloadSearcher,
	selectTooltipEventType
], combineTooltipPayload)], (payload) => {
	if (payload == null) return;
	var dataPoints = payload.map((p) => p.payload).filter((p) => p != null);
	return Array.from(new Set(dataPoints));
});
//#endregion
//#region node_modules/recharts/es6/context/useTooltipAxis.js
function ownKeys$20(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$20(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$20(Object(t), !0).forEach(function(r) {
			_defineProperty$22(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$20(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$22(e, r, t) {
	return (r = _toPropertyKey$22(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$22(t) {
	var i = _toPrimitive$22(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$22(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var useTooltipAxis = () => useAppSelector(selectTooltipAxis);
var useTooltipAxisBandSize = () => {
	var tooltipAxis = useTooltipAxis();
	var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
	var tooltipAxisScale = useAppSelector(selectTooltipAxisScale);
	if (!tooltipAxis || !tooltipAxisScale) return getBandSizeOfAxis(void 0, tooltipTicks);
	return getBandSizeOfAxis(_objectSpread$20(_objectSpread$20({}, tooltipAxis), {}, { scale: tooltipAxisScale }), tooltipTicks);
};
//#endregion
//#region node_modules/recharts/es6/util/getActiveCoordinate.js
function ownKeys$19(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$19(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$19(Object(t), !0).forEach(function(r) {
			_defineProperty$21(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$19(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$21(e, r, t) {
	return (r = _toPropertyKey$21(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$21(t) {
	var i = _toPrimitive$21(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$21(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var getActiveCartesianCoordinate = (layout, tooltipTicks, activeIndex, pointer) => {
	var entry = tooltipTicks.find((tick) => tick && tick.index === activeIndex);
	if (entry) {
		if (layout === "horizontal") return {
			x: entry.coordinate,
			y: pointer.relativeY
		};
		if (layout === "vertical") return {
			x: pointer.relativeX,
			y: entry.coordinate
		};
	}
	return {
		x: 0,
		y: 0
	};
};
/**
* Get the active coordinate in polar coordinate system.
* Internally we only really use x and y, but this returned object is part of public API
* (because it goes straight to the tooltip content) so we keep all the other properties
* for backwards compatibility.
*
* @param layout - The polar layout type ('centric' or 'radial').
* @param tooltipTicks - Array of tick items used for tooltips.
* @param activeIndex - The index of the active tick.
* @param rangeObj - The range object containing polar chart properties.
* @returns The active coordinate object with polar properties.
*/
var getActivePolarCoordinate = (layout, tooltipTicks, activeIndex, rangeObj) => {
	var entry = tooltipTicks.find((tick) => tick && tick.index === activeIndex);
	if (entry) {
		if (layout === "centric") {
			var _angle = entry.coordinate;
			var { radius: _radius } = rangeObj;
			return _objectSpread$19(_objectSpread$19(_objectSpread$19({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, _radius, _angle)), {}, {
				angle: _angle,
				radius: _radius
			});
		}
		var radius = entry.coordinate;
		var { angle } = rangeObj;
		return _objectSpread$19(_objectSpread$19(_objectSpread$19({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, radius, angle)), {}, {
			angle,
			radius
		});
	}
	return {
		angle: 0,
		clockWise: false,
		cx: 0,
		cy: 0,
		endAngle: 0,
		innerRadius: 0,
		outerRadius: 0,
		radius: 0,
		startAngle: 0,
		x: 0,
		y: 0
	};
};
function isInCartesianRange(pointer, offset) {
	var { relativeX: x, relativeY: y } = pointer;
	return x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height;
}
var calculateActiveTickIndex = (coordinate, ticks, unsortedTicks, axisType, range) => {
	var _ticks$length;
	var len = (_ticks$length = ticks === null || ticks === void 0 ? void 0 : ticks.length) !== null && _ticks$length !== void 0 ? _ticks$length : 0;
	if (len <= 1 || coordinate == null) return 0;
	if (axisType === "angleAxis" && range != null && Math.abs(Math.abs(range[1] - range[0]) - 360) <= 1e-6) for (var i = 0; i < len; i++) {
		var _unsortedTicks, _unsortedTicks2, _unsortedTicks$i, _unsortedTicks$, _unsortedTicks3;
		var before = i > 0 ? (_unsortedTicks = unsortedTicks[i - 1]) === null || _unsortedTicks === void 0 ? void 0 : _unsortedTicks.coordinate : (_unsortedTicks2 = unsortedTicks[len - 1]) === null || _unsortedTicks2 === void 0 ? void 0 : _unsortedTicks2.coordinate;
		var cur = (_unsortedTicks$i = unsortedTicks[i]) === null || _unsortedTicks$i === void 0 ? void 0 : _unsortedTicks$i.coordinate;
		var after = i >= len - 1 ? (_unsortedTicks$ = unsortedTicks[0]) === null || _unsortedTicks$ === void 0 ? void 0 : _unsortedTicks$.coordinate : (_unsortedTicks3 = unsortedTicks[i + 1]) === null || _unsortedTicks3 === void 0 ? void 0 : _unsortedTicks3.coordinate;
		var sameDirectionCoord = void 0;
		if (before == null || cur == null || after == null) continue;
		if (mathSign(cur - before) !== mathSign(after - cur)) {
			var diffInterval = [];
			if (mathSign(after - cur) === mathSign(range[1] - range[0])) {
				sameDirectionCoord = after;
				var curInRange = cur + range[1] - range[0];
				diffInterval[0] = Math.min(curInRange, (curInRange + before) / 2);
				diffInterval[1] = Math.max(curInRange, (curInRange + before) / 2);
			} else {
				sameDirectionCoord = before;
				var afterInRange = after + range[1] - range[0];
				diffInterval[0] = Math.min(cur, (afterInRange + cur) / 2);
				diffInterval[1] = Math.max(cur, (afterInRange + cur) / 2);
			}
			var sameInterval = [Math.min(cur, (sameDirectionCoord + cur) / 2), Math.max(cur, (sameDirectionCoord + cur) / 2)];
			if (coordinate > sameInterval[0] && coordinate <= sameInterval[1] || coordinate >= diffInterval[0] && coordinate <= diffInterval[1]) {
				var _unsortedTicks$i2;
				return (_unsortedTicks$i2 = unsortedTicks[i]) === null || _unsortedTicks$i2 === void 0 ? void 0 : _unsortedTicks$i2.index;
			}
		} else {
			var minValue = Math.min(before, after);
			var maxValue = Math.max(before, after);
			if (coordinate > (minValue + cur) / 2 && coordinate <= (maxValue + cur) / 2) {
				var _unsortedTicks$i3;
				return (_unsortedTicks$i3 = unsortedTicks[i]) === null || _unsortedTicks$i3 === void 0 ? void 0 : _unsortedTicks$i3.index;
			}
		}
	}
	else if (ticks) for (var _i = 0; _i < len; _i++) {
		var curr = ticks[_i];
		if (curr == null) continue;
		var next = ticks[_i + 1];
		var prev = ticks[_i - 1];
		if (_i === 0 && next != null && coordinate <= (curr.coordinate + next.coordinate) / 2) return curr.index;
		if (_i === len - 1 && prev != null && coordinate > (curr.coordinate + prev.coordinate) / 2) return curr.index;
		if (_i > 0 && _i < len - 1 && prev != null && next != null && coordinate > (curr.coordinate + prev.coordinate) / 2 && coordinate <= (curr.coordinate + next.coordinate) / 2) return curr.index;
	}
	return -1;
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectors.js
var useChartName = () => {
	return useAppSelector(selectChartName);
};
var pickTooltipEventType = (_state, tooltipEventType) => tooltipEventType;
var pickTrigger = (_state, _tooltipEventType, trigger) => trigger;
var pickDefaultIndex = (_state, _tooltipEventType, _trigger, defaultIndex) => defaultIndex;
var selectOrderedTooltipTicks = createSelector(selectTooltipAxisTicks, (ticks) => sortBy(ticks, (o) => o.coordinate));
var selectTooltipInteractionState = createSelector([
	selectTooltipState,
	pickTooltipEventType,
	pickTrigger,
	pickDefaultIndex
], combineTooltipInteractionState);
var selectActiveIndex = createSelector([
	selectTooltipInteractionState,
	selectTooltipDisplayedData,
	selectTooltipAxisDataKey,
	selectTooltipAxisDomain
], combineActiveTooltipIndex);
var selectTooltipDataKey = (state, tooltipEventType, trigger) => {
	if (tooltipEventType == null) return;
	var tooltipState = selectTooltipState(state);
	if (tooltipEventType === "axis") {
		if (trigger === "hover") return tooltipState.axisInteraction.hover.dataKey;
		return tooltipState.axisInteraction.click.dataKey;
	}
	if (trigger === "hover") return tooltipState.itemInteraction.hover.dataKey;
	return tooltipState.itemInteraction.click.dataKey;
};
var selectTooltipPayloadConfigurations = createSelector([
	selectTooltipState,
	pickTooltipEventType,
	pickTrigger,
	pickDefaultIndex
], combineTooltipPayloadConfigurations);
var selectCoordinateForDefaultIndex = createSelector([
	selectChartWidth,
	selectChartHeight,
	selectChartLayout,
	selectChartOffsetInternal,
	selectTooltipAxisTicks,
	pickDefaultIndex,
	selectTooltipPayloadConfigurations
], combineCoordinateForDefaultIndex);
var selectActiveCoordinate = createSelector([selectTooltipInteractionState, selectCoordinateForDefaultIndex], (tooltipInteractionState, defaultIndexCoordinate) => {
	var _tooltipInteractionSt;
	return (_tooltipInteractionSt = tooltipInteractionState.coordinate) !== null && _tooltipInteractionSt !== void 0 ? _tooltipInteractionSt : defaultIndexCoordinate;
});
var selectActiveLabel = createSelector([selectTooltipAxisTicks, selectActiveIndex], combineActiveLabel);
var selectTooltipPayload = createSelector([
	selectTooltipPayloadConfigurations,
	selectActiveIndex,
	selectChartDataWithIndexes,
	selectTooltipAxisDataKey,
	selectActiveLabel,
	selectTooltipPayloadSearcher,
	pickTooltipEventType
], combineTooltipPayload);
var selectIsTooltipActive = createSelector([selectTooltipInteractionState, selectActiveIndex], (tooltipInteractionState, activeIndex) => {
	return {
		isActive: tooltipInteractionState.active && activeIndex != null,
		activeIndex
	};
});
var combineActiveCartesianProps = (chartEvent, layout, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset) => {
	if (!chartEvent || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks) return;
	if (!isInCartesianRange(chartEvent, offset)) return;
	var activeIndex = calculateActiveTickIndex(calculateCartesianTooltipPos(chartEvent, layout), orderedTooltipTicks, tooltipTicks, tooltipAxisType, tooltipAxisRange);
	var activeCoordinate = getActiveCartesianCoordinate(layout, tooltipTicks, activeIndex, chartEvent);
	return {
		activeIndex: String(activeIndex),
		activeCoordinate
	};
};
var combineActivePolarProps = (chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks) => {
	if (!chartEvent || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks || !polarViewBox) return;
	var rangeObj = inRangeOfSector(chartEvent, polarViewBox);
	if (!rangeObj) return;
	var activeIndex = calculateActiveTickIndex(calculatePolarTooltipPos(rangeObj, layout), orderedTooltipTicks, tooltipTicks, tooltipAxisType, tooltipAxisRange);
	var activeCoordinate = getActivePolarCoordinate(layout, tooltipTicks, activeIndex, rangeObj);
	return {
		activeIndex: String(activeIndex),
		activeCoordinate
	};
};
var combineActiveProps = (chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset) => {
	if (!chartEvent || !layout || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks) return;
	if (layout === "horizontal" || layout === "vertical") return combineActiveCartesianProps(chartEvent, layout, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset);
	return combineActivePolarProps(chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks);
};
//#endregion
//#region node_modules/recharts/es6/zIndex/zIndexSelectors.js
/**
* Given a zIndex, returns the corresponding portal element reference.
* If no zIndex is provided or if the zIndex is not registered, returns undefined.
*
* It also returns undefined in case the z-index portal has not been rendered yet.
*/
var selectZIndexPortalElement = createSelector((state) => state.zIndex.zIndexMap, (_, zIndex) => zIndex, (_, _zIndex, isPanorama) => isPanorama, (zIndexMap, zIndex, isPanorama) => {
	if (zIndex == null) return;
	var entry = zIndexMap[zIndex];
	if (entry == null) return;
	if (isPanorama) return entry.panoramaElement;
	return entry.element;
});
var selectAllRegisteredZIndexes = createSelector((state) => state.zIndex.zIndexMap, (zIndexMap) => {
	var allNumbers = Object.keys(zIndexMap).map((zIndexStr) => parseInt(zIndexStr, 10)).concat(Object.values(DefaultZIndexes));
	return Array.from(new Set(allNumbers)).sort((a, b) => a - b);
}, { memoizeOptions: { resultEqualityCheck: arrayContentsAreEqualCheck } });
//#endregion
//#region node_modules/recharts/es6/state/zIndexSlice.js
/**
* This slice contains a registry of z-index values for various components.
* The state is a map from z-index numbers to element references.
*/
function ownKeys$18(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$18(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$18(Object(t), !0).forEach(function(r) {
			_defineProperty$20(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$18(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$20(e, r, t) {
	return (r = _toPropertyKey$20(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$20(t) {
	var i = _toPrimitive$20(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$20(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var initialState$4 = { zIndexMap: Object.values(DefaultZIndexes).reduce((acc, current) => _objectSpread$18(_objectSpread$18({}, acc), {}, { [current]: {
	element: void 0,
	panoramaElement: void 0,
	consumers: 0
} }), {}) };
var defaultZIndexSet = new Set(Object.values(DefaultZIndexes));
function isDefaultZIndex(zIndex) {
	return defaultZIndexSet.has(zIndex);
}
var zIndexSlice = createSlice({
	name: "zIndex",
	initialState: initialState$4,
	reducers: {
		registerZIndexPortal: {
			reducer: (state, action) => {
				var { zIndex } = action.payload;
				if (state.zIndexMap[zIndex]) state.zIndexMap[zIndex].consumers += 1;
				else state.zIndexMap[zIndex] = {
					consumers: 1,
					element: void 0,
					panoramaElement: void 0
				};
			},
			prepare: prepareAutoBatched()
		},
		unregisterZIndexPortal: {
			reducer: (state, action) => {
				var { zIndex } = action.payload;
				if (state.zIndexMap[zIndex]) {
					state.zIndexMap[zIndex].consumers -= 1;
					if (state.zIndexMap[zIndex].consumers <= 0 && !isDefaultZIndex(zIndex)) delete state.zIndexMap[zIndex];
				}
			},
			prepare: prepareAutoBatched()
		},
		registerZIndexPortalElement: {
			reducer: (state, action) => {
				var { zIndex, element, isPanorama } = action.payload;
				if (state.zIndexMap[zIndex]) if (isPanorama) state.zIndexMap[zIndex].panoramaElement = castDraft(element);
				else state.zIndexMap[zIndex].element = castDraft(element);
				else state.zIndexMap[zIndex] = {
					consumers: 0,
					element: isPanorama ? void 0 : castDraft(element),
					panoramaElement: isPanorama ? castDraft(element) : void 0
				};
			},
			prepare: prepareAutoBatched()
		},
		unregisterZIndexPortalElement: {
			reducer: (state, action) => {
				var { zIndex } = action.payload;
				if (state.zIndexMap[zIndex]) if (action.payload.isPanorama) state.zIndexMap[zIndex].panoramaElement = void 0;
				else state.zIndexMap[zIndex].element = void 0;
			},
			prepare: prepareAutoBatched()
		}
	}
});
var { registerZIndexPortal, unregisterZIndexPortal, registerZIndexPortalElement, unregisterZIndexPortalElement } = zIndexSlice.actions;
var zIndexReducer = zIndexSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/zIndex/ZIndexLayer.js
/**
* @since 3.4
*/
/**
* A layer that renders its children into a portal corresponding to the given zIndex.
* We can't use regular CSS `z-index` because SVG does not support it.
* So instead, we create separate DOM nodes for each zIndex layer
* and render the children into the corresponding DOM node using React portals.
*
* This component must be used inside a Chart component.
*
* @param zIndex numeric zIndex value, higher values are rendered on top of lower values
* @param children the content to render inside this zIndex layer
*
* @since 3.4
*/
function ZIndexLayer(_ref) {
	var { zIndex, children } = _ref;
	var shouldRenderInPortal = useIsInChartContext() && zIndex !== void 0 && zIndex !== 0;
	var isPanorama = useIsPanorama();
	/**
	* When zIndex changes, the new portal element is not immediately available because
	* it requires a full render cycle through AllZIndexPortals → ZIndexSvgPortal.
	* During this transition we keep rendering into the previous portal element
	* to avoid an unmount/remount cycle that would cause children to briefly disappear.
	*
	* `registeredZIndexesRef` tracks every zIndex we have registered so that
	* we can defer unregistration of old values until the new portal is ready.
	* `lastPortalElementRef` caches the most recent valid portal DOM node.
	*/
	var lastPortalElementRef = useRef(void 0);
	var registeredZIndexesRef = useRef(/* @__PURE__ */ new Set());
	var dispatch = useAppDispatch();
	var portalElement = useAppSelector((state) => selectZIndexPortalElement(state, zIndex, isPanorama));
	useLayoutEffect(() => {
		if (!shouldRenderInPortal) {
			var registered = registeredZIndexesRef.current;
			registered.forEach((z) => {
				dispatch(unregisterZIndexPortal({ zIndex: z }));
			});
			registered.clear();
			lastPortalElementRef.current = void 0;
			return;
		}
		if (!registeredZIndexesRef.current.has(zIndex)) {
			dispatch(registerZIndexPortal({ zIndex }));
			registeredZIndexesRef.current.add(zIndex);
		}
		if (portalElement) {
			lastPortalElementRef.current = portalElement;
			var _registered = registeredZIndexesRef.current;
			_registered.forEach((z) => {
				if (z !== zIndex) {
					dispatch(unregisterZIndexPortal({ zIndex: z }));
					_registered.delete(z);
				}
			});
		}
	}, [
		dispatch,
		zIndex,
		shouldRenderInPortal,
		portalElement
	]);
	useLayoutEffect(() => {
		var registered = registeredZIndexesRef.current;
		return () => {
			registered.forEach((z) => {
				dispatch(unregisterZIndexPortal({ zIndex: z }));
			});
			registered.clear();
		};
	}, [dispatch]);
	if (!shouldRenderInPortal) return children;
	var targetElement = portalElement !== null && portalElement !== void 0 ? portalElement : lastPortalElementRef.current;
	if (!targetElement) return null;
	return /* @__PURE__ */ createPortal(children, targetElement);
}
//#endregion
//#region node_modules/recharts/es6/component/Cursor.js
function _extends$14() {
	return _extends$14 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$14.apply(null, arguments);
}
function ownKeys$17(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$17(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$17(Object(t), !0).forEach(function(r) {
			_defineProperty$19(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$17(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$19(e, r, t) {
	return (r = _toPropertyKey$19(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$19(t) {
	var i = _toPrimitive$19(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$19(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/**
* If set false, no cursor will be drawn when tooltip is active.
* If set an object, the option is the configuration of cursor.
* If set a React element, the option is the custom react element of drawing cursor
*/
function RenderCursor(_ref) {
	var { cursor, cursorComp, cursorProps } = _ref;
	if (/* @__PURE__ */ isValidElement(cursor)) return /* @__PURE__ */ cloneElement(cursor, cursorProps);
	return /* @__PURE__ */ createElement(cursorComp, cursorProps);
}
function CursorInternal(props) {
	var _props$zIndex;
	var { coordinate, payload, index, offset, tooltipAxisBandSize, layout, cursor, tooltipEventType, chartName } = props;
	var activeCoordinate = coordinate;
	var activePayload = payload;
	var activeTooltipIndex = index;
	if (!cursor || !activeCoordinate || chartName !== "ScatterChart" && tooltipEventType !== "axis") return null;
	var restProps, cursorComp, preferredZIndex;
	if (chartName === "ScatterChart") {
		restProps = activeCoordinate;
		cursorComp = Cross;
		preferredZIndex = DefaultZIndexes.cursorLine;
	} else if (chartName === "BarChart") {
		restProps = getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize);
		cursorComp = Rectangle;
		preferredZIndex = DefaultZIndexes.cursorRectangle;
	} else if (layout === "radial" && isPolarCoordinate(activeCoordinate)) {
		var { cx, cy, radius, startAngle, endAngle } = getRadialCursorPoints(activeCoordinate);
		restProps = {
			cx,
			cy,
			startAngle,
			endAngle,
			innerRadius: radius,
			outerRadius: radius
		};
		cursorComp = Sector;
		preferredZIndex = DefaultZIndexes.cursorLine;
	} else {
		restProps = { points: getCursorPoints(layout, activeCoordinate, offset) };
		cursorComp = Curve;
		preferredZIndex = DefaultZIndexes.cursorLine;
	}
	var extraClassName = typeof cursor === "object" && "className" in cursor ? cursor.className : void 0;
	var cursorProps = _objectSpread$17(_objectSpread$17(_objectSpread$17(_objectSpread$17({
		stroke: "#ccc",
		pointerEvents: "none"
	}, offset), restProps), svgPropertiesNoEventsFromUnknown(cursor)), {}, {
		payload: activePayload,
		payloadIndex: activeTooltipIndex,
		className: clsx("recharts-tooltip-cursor", extraClassName)
	});
	return /* @__PURE__ */ React.createElement(ZIndexLayer, { zIndex: (_props$zIndex = props.zIndex) !== null && _props$zIndex !== void 0 ? _props$zIndex : preferredZIndex }, /* @__PURE__ */ React.createElement(RenderCursor, {
		cursor,
		cursorComp,
		cursorProps
	}));
}
function Cursor(props) {
	var tooltipAxisBandSize = useTooltipAxisBandSize();
	var offset = useOffsetInternal();
	var layout = useChartLayout();
	var chartName = useChartName();
	if (tooltipAxisBandSize == null || offset == null || layout == null || chartName == null) return null;
	return /* @__PURE__ */ React.createElement(CursorInternal, _extends$14({}, props, {
		offset,
		layout,
		tooltipAxisBandSize,
		chartName
	}));
}
//#endregion
//#region node_modules/recharts/es6/context/tooltipPortalContext.js
var TooltipPortalContext = /* @__PURE__ */ createContext(null);
var useTooltipPortal = () => useContext(TooltipPortalContext);
//#endregion
//#region node_modules/recharts/es6/util/Events.js
var eventCenter = new EventEmitter();
var TOOLTIP_SYNC_EVENT = "recharts.syncEvent.tooltip";
var BRUSH_SYNC_EVENT = "recharts.syncEvent.brush";
//#endregion
//#region node_modules/recharts/es6/state/optionsSlice.js
/**
* These chart options are decided internally, by Recharts,
* and will not change during the lifetime of the chart.
*
* Changing these options can be done by swapping the root element
* which will make a brand-new Redux store.
*
* If you want to store options that can be changed by the user,
* use UpdatableChartOptions in rootPropsSlice.ts.
*/
var arrayTooltipSearcher = (data, strIndex) => {
	if (!strIndex) return void 0;
	if (!Array.isArray(data)) return void 0;
	var numIndex = Number.parseInt(strIndex, 10);
	if (isNan(numIndex)) return;
	return data[numIndex];
};
var optionsSlice = createSlice({
	name: "options",
	initialState: {
		chartName: "",
		tooltipPayloadSearcher: () => void 0,
		eventEmitter: void 0,
		defaultTooltipEventType: "axis"
	},
	reducers: { createEventEmitter: (state) => {
		if (state.eventEmitter == null) state.eventEmitter = Symbol("rechartsEventEmitter");
	} }
});
var optionsReducer = optionsSlice.reducer;
var { createEventEmitter } = optionsSlice.actions;
//#endregion
//#region node_modules/recharts/es6/synchronisation/syncSelectors.js
function selectSynchronisedTooltipState(state) {
	return state.tooltip.syncInteraction;
}
var chartDataSlice = createSlice({
	name: "chartData",
	initialState: {
		chartData: void 0,
		computedData: void 0,
		dataStartIndex: 0,
		dataEndIndex: 0
	},
	reducers: {
		setChartData(state, action) {
			state.chartData = castDraft(action.payload);
			if (action.payload == null) {
				state.dataStartIndex = 0;
				state.dataEndIndex = 0;
				return;
			}
			if (action.payload.length > 0 && state.dataEndIndex !== action.payload.length - 1) state.dataEndIndex = action.payload.length - 1;
		},
		setComputedData(state, action) {
			state.computedData = action.payload;
		},
		setDataStartEndIndexes(state, action) {
			var { startIndex, endIndex } = action.payload;
			if (startIndex != null) state.dataStartIndex = startIndex;
			if (endIndex != null) state.dataEndIndex = endIndex;
		}
	}
});
var { setChartData, setDataStartEndIndexes, setComputedData } = chartDataSlice.actions;
var chartDataReducer = chartDataSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/synchronisation/useChartSynchronisation.js
var _excluded$14 = ["x", "y"];
function ownKeys$16(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$16(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$16(Object(t), !0).forEach(function(r) {
			_defineProperty$18(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$16(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$18(e, r, t) {
	return (r = _toPropertyKey$18(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$18(t) {
	var i = _toPrimitive$18(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$18(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$14(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$14(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$14(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
/**
* Listens for tooltip sync events from other charts and dispatches the appropriate
* sync interaction state based on the current chart's syncMethod.
*
* Handles three sync methods:
* - 'index': passes through the tooltip index with coordinate scaling between chart viewBoxes
* - 'value': matches the incoming label against this chart's axis ticks by string comparison
* - function: delegates tick resolution to a user-provided callback
*
* When a synced label has no matching tick (e.g. sparse chart), the tooltip is hidden
* but sourceViewBox is preserved to prevent counter-emission cascades.
*/
function useTooltipSyncEventsListener() {
	var mySyncId = useAppSelector(selectSyncId);
	var myEventEmitter = useAppSelector(selectEventEmitter);
	var dispatch = useAppDispatch();
	var syncMethod = useAppSelector(selectSyncMethod);
	var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
	var layout = useChartLayout();
	var viewBox = useViewBox();
	useEffect(() => {
		if (mySyncId == null) return noop$1;
		var listener = (incomingSyncId, action, emitter) => {
			if (myEventEmitter === emitter) return;
			if (mySyncId !== incomingSyncId) return;
			if (action.payload.active === false) {
				dispatch(setSyncInteraction({
					active: false,
					coordinate: void 0,
					dataKey: void 0,
					index: null,
					label: void 0,
					sourceViewBox: void 0,
					graphicalItemId: void 0
				}));
				return;
			}
			if (syncMethod === "index") {
				var _action$payload;
				if (viewBox && action !== null && action !== void 0 && (_action$payload = action.payload) !== null && _action$payload !== void 0 && _action$payload.coordinate && action.payload.sourceViewBox) {
					var _action$payload$coord = action.payload.coordinate, { x: _x, y: _y } = _action$payload$coord, otherCoordinateProps = _objectWithoutProperties$14(_action$payload$coord, _excluded$14);
					var { x: sourceX, y: sourceY, width: sourceWidth, height: sourceHeight } = action.payload.sourceViewBox;
					var scaledCoordinate = _objectSpread$16(_objectSpread$16({}, otherCoordinateProps), {}, {
						x: viewBox.x + (sourceWidth ? (_x - sourceX) / sourceWidth : 0) * viewBox.width,
						y: viewBox.y + (sourceHeight ? (_y - sourceY) / sourceHeight : 0) * viewBox.height
					});
					dispatch(_objectSpread$16(_objectSpread$16({}, action), {}, { payload: _objectSpread$16(_objectSpread$16({}, action.payload), {}, { coordinate: scaledCoordinate }) }));
				} else dispatch(action);
				return;
			}
			if (tooltipTicks == null) return;
			var activeTick;
			if (typeof syncMethod === "function") activeTick = tooltipTicks[syncMethod(tooltipTicks, {
				activeTooltipIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
				isTooltipActive: action.payload.active,
				activeIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
				activeLabel: action.payload.label,
				activeDataKey: action.payload.dataKey,
				activeCoordinate: action.payload.coordinate
			})];
			else if (syncMethod === "value") activeTick = tooltipTicks.find((tick) => String(tick.value) === action.payload.label);
			var { coordinate } = action.payload;
			if (coordinate == null || viewBox == null) {
				dispatch(setSyncInteraction({
					active: false,
					coordinate: void 0,
					dataKey: void 0,
					index: null,
					label: void 0,
					sourceViewBox: void 0,
					graphicalItemId: void 0
				}));
				return;
			}
			if (activeTick == null) {
				dispatch(setSyncInteraction({
					active: false,
					coordinate: void 0,
					dataKey: void 0,
					index: null,
					label: void 0,
					sourceViewBox: action.payload.sourceViewBox,
					graphicalItemId: void 0
				}));
				return;
			}
			var { x, y } = coordinate;
			var validateChartX = Math.min(x, viewBox.x + viewBox.width);
			var validateChartY = Math.min(y, viewBox.y + viewBox.height);
			var activeCoordinate = {
				x: layout === "horizontal" ? activeTick.coordinate : validateChartX,
				y: layout === "horizontal" ? validateChartY : activeTick.coordinate
			};
			dispatch(setSyncInteraction({
				active: action.payload.active,
				coordinate: activeCoordinate,
				dataKey: action.payload.dataKey,
				index: String(activeTick.index),
				label: action.payload.label,
				sourceViewBox: action.payload.sourceViewBox,
				graphicalItemId: action.payload.graphicalItemId
			}));
		};
		eventCenter.on(TOOLTIP_SYNC_EVENT, listener);
		return () => {
			eventCenter.off(TOOLTIP_SYNC_EVENT, listener);
		};
	}, [
		useAppSelector((state) => state.rootProps.className),
		dispatch,
		myEventEmitter,
		mySyncId,
		syncMethod,
		tooltipTicks,
		layout,
		viewBox
	]);
}
/**
* Listens for brush sync events from other charts and updates this chart's
* data start/end indexes to match, keeping brush positions synchronised.
*/
function useBrushSyncEventsListener() {
	var mySyncId = useAppSelector(selectSyncId);
	var myEventEmitter = useAppSelector(selectEventEmitter);
	var dispatch = useAppDispatch();
	useEffect(() => {
		if (mySyncId == null) return noop$1;
		var listener = (incomingSyncId, action, emitter) => {
			if (myEventEmitter === emitter) return;
			if (mySyncId === incomingSyncId) dispatch(setDataStartEndIndexes(action));
		};
		eventCenter.on(BRUSH_SYNC_EVENT, listener);
		return () => {
			eventCenter.off(BRUSH_SYNC_EVENT, listener);
		};
	}, [
		dispatch,
		myEventEmitter,
		mySyncId
	]);
}
/**
* Will receive synchronisation events from other charts.
*
* Reads syncMethod from state and decides how to synchronise the tooltip based on that.
*
* @returns void
*/
function useSynchronisedEventsFromOtherCharts() {
	var dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(createEventEmitter());
	}, [dispatch]);
	useTooltipSyncEventsListener();
	useBrushSyncEventsListener();
}
/**
* Will send events to other charts.
* If syncId is undefined, no events will be sent.
*
* This ignores the syncMethod, because that is set and computed on the receiving end.
*
* Outgoing emissions are suppressed when `isReceivingSynchronisation` is true,
* which is determined by the presence of `sourceViewBox` in the sync state (not by
* the tooltip's `active` flag). This matters for charts with sparse data: when an
* incoming sync label has no matching tick, the tooltip becomes inactive but
* `sourceViewBox` remains set, so the chart is still considered "receiving" and
* will not emit a counter-sync event that would cascade-clear other charts' tooltips.
*
* @param tooltipEventType from Tooltip
* @param trigger from Tooltip
* @param activeCoordinate from state
* @param activeLabel from state
* @param activeIndex from state
* @param isTooltipActive from state
* @returns void
*/
function useTooltipChartSynchronisation(tooltipEventType, trigger, activeCoordinate, activeLabel, activeIndex, isTooltipActive) {
	var activeDataKey = useAppSelector((state) => selectTooltipDataKey(state, tooltipEventType, trigger));
	var activeGraphicalItemId = useAppSelector(selectActiveTooltipGraphicalItemId);
	var eventEmitterSymbol = useAppSelector(selectEventEmitter);
	var syncId = useAppSelector(selectSyncId);
	var syncMethod = useAppSelector(selectSyncMethod);
	var tooltipState = useAppSelector(selectSynchronisedTooltipState);
	var isReceivingSynchronisation = (tooltipState === null || tooltipState === void 0 ? void 0 : tooltipState.sourceViewBox) != null;
	var viewBox = useViewBox();
	useEffect(() => {
		if (isReceivingSynchronisation) return;
		if (syncId == null) return;
		if (eventEmitterSymbol == null) return;
		var syncAction = setSyncInteraction({
			active: isTooltipActive,
			coordinate: activeCoordinate,
			dataKey: activeDataKey,
			index: activeIndex,
			label: typeof activeLabel === "number" ? String(activeLabel) : activeLabel,
			sourceViewBox: viewBox,
			graphicalItemId: activeGraphicalItemId
		});
		eventCenter.emit(TOOLTIP_SYNC_EVENT, syncId, syncAction, eventEmitterSymbol);
	}, [
		isReceivingSynchronisation,
		activeCoordinate,
		activeDataKey,
		activeGraphicalItemId,
		activeIndex,
		activeLabel,
		eventEmitterSymbol,
		syncId,
		syncMethod,
		isTooltipActive,
		viewBox
	]);
}
//#endregion
//#region node_modules/recharts/es6/component/Tooltip.js
function ownKeys$15(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$15(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$15(Object(t), !0).forEach(function(r) {
			_defineProperty$17(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$15(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$17(e, r, t) {
	return (r = _toPropertyKey$17(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$17(t) {
	var i = _toPrimitive$17(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$17(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function defaultUniqBy(entry) {
	return entry.dataKey;
}
function renderContent(content, props) {
	if (/* @__PURE__ */ React.isValidElement(content)) return /* @__PURE__ */ React.cloneElement(content, props);
	if (typeof content === "function") return /* @__PURE__ */ React.createElement(content, props);
	return /* @__PURE__ */ React.createElement(DefaultTooltipContent, props);
}
var emptyPayload = [];
var defaultTooltipProps = {
	allowEscapeViewBox: {
		x: false,
		y: false
	},
	animationDuration: 400,
	animationEasing: "ease",
	axisId: 0,
	contentStyle: {},
	cursor: true,
	filterNull: true,
	includeHidden: false,
	isAnimationActive: "auto",
	itemSorter: "name",
	itemStyle: {},
	labelStyle: {},
	offset: 10,
	reverseDirection: {
		x: false,
		y: false
	},
	separator: " : ",
	trigger: "hover",
	useTranslate3d: false,
	wrapperStyle: {}
};
/**
* The Tooltip component displays a floating box with data values when hovering over or clicking on chart elements.
*
* It can be configured to show information for individual data points or for all points at a specific axis coordinate.
* The appearance and content of the tooltip can be customized via props.
*
* @see {@link https://github.com/recharts/recharts/wiki/Tooltip-event-type-and-shared-prop Tooltip event type and shared prop wiki page}
* @see {@link https://recharts.github.io/en-US/guide/activeIndex/ Active index replacement when migrating from Recharts v2 to v3}
*
* @consumes CartesianChartContext
* @consumes PolarChartContext
* @consumes TooltipEntrySettings
*/
function Tooltip(outsideProps) {
	var _useAppSelector, _ref;
	var props = resolveDefaultProps(outsideProps, defaultTooltipProps);
	var { active: activeFromProps, allowEscapeViewBox, animationDuration, animationEasing, content, filterNull, isAnimationActive, offset, payloadUniqBy, position, reverseDirection, useTranslate3d, wrapperStyle, cursor, shared, trigger, defaultIndex, portal: portalFromProps, axisId } = props;
	var dispatch = useAppDispatch();
	var defaultIndexAsString = typeof defaultIndex === "number" ? String(defaultIndex) : defaultIndex;
	useEffect(() => {
		dispatch(setTooltipSettingsState({
			shared,
			trigger,
			axisId,
			active: activeFromProps,
			defaultIndex: defaultIndexAsString
		}));
	}, [
		dispatch,
		shared,
		trigger,
		axisId,
		activeFromProps,
		defaultIndexAsString
	]);
	var viewBox = useViewBox();
	var accessibilityLayer = useAccessibilityLayer();
	var tooltipEventType = useTooltipEventType(shared);
	var { activeIndex, isActive } = (_useAppSelector = useAppSelector((state) => selectIsTooltipActive(state, tooltipEventType, trigger, defaultIndexAsString))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {};
	var payloadFromRedux = useAppSelector((state) => selectTooltipPayload(state, tooltipEventType, trigger, defaultIndexAsString));
	var labelFromRedux = useAppSelector((state) => selectActiveLabel(state, tooltipEventType, trigger, defaultIndexAsString));
	var coordinate = useAppSelector((state) => selectActiveCoordinate(state, tooltipEventType, trigger, defaultIndexAsString));
	var payload = payloadFromRedux;
	var tooltipPortalFromContext = useTooltipPortal();
	var finalIsActive = (_ref = activeFromProps !== null && activeFromProps !== void 0 ? activeFromProps : isActive) !== null && _ref !== void 0 ? _ref : false;
	var [lastBoundingBox, updateBoundingBox] = useElementOffset([payload, finalIsActive]);
	var finalLabel = tooltipEventType === "axis" ? labelFromRedux : void 0;
	useTooltipChartSynchronisation(tooltipEventType, trigger, coordinate, finalLabel, activeIndex, finalIsActive);
	var tooltipPortal = portalFromProps !== null && portalFromProps !== void 0 ? portalFromProps : tooltipPortalFromContext;
	if (tooltipPortal == null || viewBox == null || tooltipEventType == null) return null;
	var finalPayload = payload !== null && payload !== void 0 ? payload : emptyPayload;
	if (!finalIsActive) finalPayload = emptyPayload;
	if (filterNull && finalPayload.length) finalPayload = getUniqPayload(finalPayload.filter((entry) => entry.value != null && (entry.hide !== true || props.includeHidden)), payloadUniqBy, defaultUniqBy);
	var hasPayload = finalPayload.length > 0;
	var tooltipContentProps = _objectSpread$15(_objectSpread$15({}, props), {}, {
		payload: finalPayload,
		label: finalLabel,
		active: finalIsActive,
		activeIndex,
		coordinate,
		accessibilityLayer
	});
	var tooltipElement = /* @__PURE__ */ React.createElement(TooltipBoundingBox, {
		allowEscapeViewBox,
		animationDuration,
		animationEasing,
		isAnimationActive,
		active: finalIsActive,
		coordinate,
		hasPayload,
		offset,
		position,
		reverseDirection,
		useTranslate3d,
		viewBox,
		wrapperStyle,
		lastBoundingBox,
		innerRef: updateBoundingBox,
		hasPortalFromProps: Boolean(portalFromProps)
	}, renderContent(content, tooltipContentProps));
	return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ createPortal(tooltipElement, tooltipPortal), finalIsActive && /* @__PURE__ */ React.createElement(Cursor, {
		cursor,
		tooltipEventType,
		coordinate,
		payload: finalPayload,
		index: activeIndex
	}));
}
//#endregion
//#region node_modules/recharts/es6/component/Cell.js
/**
* Cell component used to define colors and styles of chart elements.
*
* This component is now deprecated and will be removed in Recharts 4.0.
*
* Please use the `shape` prop or `content` prop on the respective chart components
* to customize the rendering of chart elements instead of using `Cell`.
*
* @see {@link https://recharts.github.io/en-US/guide/cell/ Guide: Migrate from Cell component to shape prop}
*
* @deprecated
* @consumes CellReader
*/
var Cell = (_props) => null;
Cell.displayName = "Cell";
//#endregion
//#region node_modules/recharts/es6/util/LRUCache.js
function _defineProperty$16(e, r, t) {
	return (r = _toPropertyKey$16(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$16(t) {
	var i = _toPrimitive$16(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$16(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/**
* Simple LRU (Least Recently Used) cache implementation
*/
var LRUCache = class {
	constructor(maxSize) {
		_defineProperty$16(this, "cache", /* @__PURE__ */ new Map());
		this.maxSize = maxSize;
	}
	get(key) {
		var value = this.cache.get(key);
		if (value !== void 0) {
			this.cache.delete(key);
			this.cache.set(key, value);
		}
		return value;
	}
	set(key, value) {
		if (this.cache.has(key)) this.cache.delete(key);
		else if (this.cache.size >= this.maxSize) {
			var firstKey = this.cache.keys().next().value;
			if (firstKey != null) this.cache.delete(firstKey);
		}
		this.cache.set(key, value);
	}
	clear() {
		this.cache.clear();
	}
	size() {
		return this.cache.size;
	}
};
//#endregion
//#region node_modules/recharts/es6/util/DOMUtils.js
function ownKeys$14(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$14(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$14(Object(t), !0).forEach(function(r) {
			_defineProperty$15(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$14(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$15(e, r, t) {
	return (r = _toPropertyKey$15(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$15(t) {
	var i = _toPrimitive$15(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$15(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var currentConfig = _objectSpread$14({}, {
	cacheSize: 2e3,
	enableCache: true
});
var stringCache = new LRUCache(currentConfig.cacheSize);
var SPAN_STYLE = {
	position: "absolute",
	top: "-20000px",
	left: 0,
	padding: 0,
	margin: 0,
	border: "none",
	whiteSpace: "pre"
};
var MEASUREMENT_SPAN_ID = "recharts_measurement_span";
function createCacheKey(text, style) {
	var fontSize = style.fontSize || "";
	var fontFamily = style.fontFamily || "";
	var fontWeight = style.fontWeight || "";
	var fontStyle = style.fontStyle || "";
	var letterSpacing = style.letterSpacing || "";
	var textTransform = style.textTransform || "";
	return "".concat(text, "|").concat(fontSize, "|").concat(fontFamily, "|").concat(fontWeight, "|").concat(fontStyle, "|").concat(letterSpacing, "|").concat(textTransform);
}
/**
* Measure text using DOM (accurate but slower)
* @param text - The text to measure
* @param style - CSS style properties to apply
* @returns The size of the text
*/
var measureTextWithDOM = (text, style) => {
	try {
		var measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
		if (!measurementSpan) {
			measurementSpan = document.createElement("span");
			measurementSpan.setAttribute("id", MEASUREMENT_SPAN_ID);
			measurementSpan.setAttribute("aria-hidden", "true");
			document.body.appendChild(measurementSpan);
		}
		Object.assign(measurementSpan.style, SPAN_STYLE, style);
		measurementSpan.textContent = "".concat(text);
		var rect = measurementSpan.getBoundingClientRect();
		return {
			width: rect.width,
			height: rect.height
		};
	} catch (_unused) {
		return {
			width: 0,
			height: 0
		};
	}
};
var getStringSize = function getStringSize(text) {
	var style = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
	if (text === void 0 || text === null || Global.isSsr) return {
		width: 0,
		height: 0
	};
	if (!currentConfig.enableCache) return measureTextWithDOM(text, style);
	var cacheKey = createCacheKey(text, style);
	var cachedResult = stringCache.get(cacheKey);
	if (cachedResult) return cachedResult;
	var result = measureTextWithDOM(text, style);
	stringCache.set(cacheKey, result);
	return result;
};
//#endregion
//#region node_modules/recharts/es6/util/ReduceCSSCalc.js
var _DecimalCSS;
function _defineProperty$14(e, r, t) {
	return (r = _toPropertyKey$14(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$14(t) {
	var i = _toPrimitive$14(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$14(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var MULTIPLY_OR_DIVIDE_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var ADD_OR_SUBTRACT_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var CSS_LENGTH_UNIT_REGEX = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/;
var NUM_SPLIT_REGEX = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/;
var CONVERSION_RATES = {
	cm: 96 / 2.54,
	mm: 96 / 25.4,
	pt: 96 / 72,
	pc: 96 / 6,
	in: 96,
	Q: 96 / (2.54 * 40),
	px: 1
};
var FIXED_CSS_LENGTH_UNITS = [
	"cm",
	"mm",
	"pt",
	"pc",
	"in",
	"Q",
	"px"
];
function isSupportedUnit(unit) {
	return FIXED_CSS_LENGTH_UNITS.includes(unit);
}
var STR_NAN = "NaN";
function convertToPx(value, unit) {
	return value * CONVERSION_RATES[unit];
}
var DecimalCSS = class DecimalCSS {
	static parse(str) {
		var _NUM_SPLIT_REGEX$exec;
		var [, numStr, unit] = (_NUM_SPLIT_REGEX$exec = NUM_SPLIT_REGEX.exec(str)) !== null && _NUM_SPLIT_REGEX$exec !== void 0 ? _NUM_SPLIT_REGEX$exec : [];
		if (numStr == null) return DecimalCSS.NaN;
		return new DecimalCSS(parseFloat(numStr), unit !== null && unit !== void 0 ? unit : "");
	}
	constructor(num, unit) {
		this.num = num;
		this.unit = unit;
		this.num = num;
		this.unit = unit;
		if (isNan(num)) this.unit = "";
		if (unit !== "" && !CSS_LENGTH_UNIT_REGEX.test(unit)) {
			this.num = NaN;
			this.unit = "";
		}
		if (isSupportedUnit(unit)) {
			this.num = convertToPx(num, unit);
			this.unit = "px";
		}
	}
	add(other) {
		if (this.unit !== other.unit) return new DecimalCSS(NaN, "");
		return new DecimalCSS(this.num + other.num, this.unit);
	}
	subtract(other) {
		if (this.unit !== other.unit) return new DecimalCSS(NaN, "");
		return new DecimalCSS(this.num - other.num, this.unit);
	}
	multiply(other) {
		if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) return new DecimalCSS(NaN, "");
		return new DecimalCSS(this.num * other.num, this.unit || other.unit);
	}
	divide(other) {
		if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) return new DecimalCSS(NaN, "");
		return new DecimalCSS(this.num / other.num, this.unit || other.unit);
	}
	toString() {
		return "".concat(this.num).concat(this.unit);
	}
	isNaN() {
		return isNan(this.num);
	}
};
_DecimalCSS = DecimalCSS;
_defineProperty$14(DecimalCSS, "NaN", new _DecimalCSS(NaN, ""));
function calculateArithmetic(expr) {
	if (expr == null || expr.includes(STR_NAN)) return STR_NAN;
	var newExpr = expr;
	while (newExpr.includes("*") || newExpr.includes("/")) {
		var _MULTIPLY_OR_DIVIDE_R;
		var [, leftOperand, operator, rightOperand] = (_MULTIPLY_OR_DIVIDE_R = MULTIPLY_OR_DIVIDE_REGEX.exec(newExpr)) !== null && _MULTIPLY_OR_DIVIDE_R !== void 0 ? _MULTIPLY_OR_DIVIDE_R : [];
		var lTs = DecimalCSS.parse(leftOperand !== null && leftOperand !== void 0 ? leftOperand : "");
		var rTs = DecimalCSS.parse(rightOperand !== null && rightOperand !== void 0 ? rightOperand : "");
		var result = operator === "*" ? lTs.multiply(rTs) : lTs.divide(rTs);
		if (result.isNaN()) return STR_NAN;
		newExpr = newExpr.replace(MULTIPLY_OR_DIVIDE_REGEX, result.toString());
	}
	while (newExpr.includes("+") || /.-\d+(?:\.\d+)?/.test(newExpr)) {
		var _ADD_OR_SUBTRACT_REGE;
		var [, _leftOperand, _operator, _rightOperand] = (_ADD_OR_SUBTRACT_REGE = ADD_OR_SUBTRACT_REGEX.exec(newExpr)) !== null && _ADD_OR_SUBTRACT_REGE !== void 0 ? _ADD_OR_SUBTRACT_REGE : [];
		var _lTs = DecimalCSS.parse(_leftOperand !== null && _leftOperand !== void 0 ? _leftOperand : "");
		var _rTs = DecimalCSS.parse(_rightOperand !== null && _rightOperand !== void 0 ? _rightOperand : "");
		var _result = _operator === "+" ? _lTs.add(_rTs) : _lTs.subtract(_rTs);
		if (_result.isNaN()) return STR_NAN;
		newExpr = newExpr.replace(ADD_OR_SUBTRACT_REGEX, _result.toString());
	}
	return newExpr;
}
var PARENTHESES_REGEX = /\(([^()]*)\)/;
function calculateParentheses(expr) {
	var newExpr = expr;
	var match;
	while ((match = PARENTHESES_REGEX.exec(newExpr)) != null) {
		var [, parentheticalExpression] = match;
		newExpr = newExpr.replace(PARENTHESES_REGEX, calculateArithmetic(parentheticalExpression));
	}
	return newExpr;
}
function evaluateExpression(expression) {
	var newExpr = expression.replace(/\s+/g, "");
	newExpr = calculateParentheses(newExpr);
	newExpr = calculateArithmetic(newExpr);
	return newExpr;
}
function safeEvaluateExpression(expression) {
	try {
		return evaluateExpression(expression);
	} catch (_unused) {
		return STR_NAN;
	}
}
function reduceCSSCalc(expression) {
	var result = safeEvaluateExpression(expression.slice(5, -1));
	if (result === STR_NAN) return "";
	return result;
}
//#endregion
//#region node_modules/recharts/es6/component/Text.js
var _excluded$13 = [
	"x",
	"y",
	"lineHeight",
	"capHeight",
	"fill",
	"scaleToFit",
	"textAnchor",
	"verticalAnchor"
], _excluded2$7 = [
	"dx",
	"dy",
	"angle",
	"className",
	"breakAll"
];
function _extends$13() {
	return _extends$13 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$13.apply(null, arguments);
}
function _objectWithoutProperties$13(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$13(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$13(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
var calculateWordWidths = (_ref) => {
	var { children, breakAll, style } = _ref;
	try {
		var words = [];
		if (!isNullish(children)) if (breakAll) words = children.toString().split("");
		else words = children.toString().split(BREAKING_SPACES);
		return {
			wordsWithComputedWidth: words.map((word) => ({
				word,
				width: getStringSize(word, style).width
			})),
			spaceWidth: breakAll ? 0 : getStringSize("\xA0", style).width
		};
	} catch (_unused) {
		return null;
	}
};
/**
* @inline
*/
function isValidTextAnchor(value) {
	return value === "start" || value === "middle" || value === "end" || value === "inherit";
}
/**
* @inline
*/
/**
* @inline
*/
function isRenderableText(val) {
	return isNullish(val) || typeof val === "string" || typeof val === "number" || typeof val === "boolean";
}
var calculate = (words, lineWidth, spaceWidth, scaleToFit) => words.reduce((result, _ref2) => {
	var { word, width } = _ref2;
	var currentLine = result[result.length - 1];
	if (currentLine && width != null && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))) {
		currentLine.words.push(word);
		currentLine.width += width + spaceWidth;
	} else {
		var newLine = {
			words: [word],
			width
		};
		result.push(newLine);
	}
	return result;
}, []);
var findLongestLine = (words) => words.reduce((a, b) => a.width > b.width ? a : b);
var suffix = "…";
var checkOverflow = (text, index, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit) => {
	var words = calculateWordWidths({
		breakAll,
		style,
		children: text.slice(0, index) + suffix
	});
	if (!words) return [false, []];
	var result = calculate(words.wordsWithComputedWidth, lineWidth, spaceWidth, scaleToFit);
	return [result.length > maxLines || findLongestLine(result).width > Number(lineWidth), result];
};
var calculateWordsByLines = (_ref3, initialWordsWithComputedWith, spaceWidth, lineWidth, scaleToFit) => {
	var { maxLines, children, style, breakAll } = _ref3;
	var shouldLimitLines = isNumber(maxLines);
	var text = String(children);
	var originalResult = calculate(initialWordsWithComputedWith, lineWidth, spaceWidth, scaleToFit);
	if (!shouldLimitLines || scaleToFit) return originalResult;
	if (!(originalResult.length > maxLines || findLongestLine(originalResult).width > Number(lineWidth))) return originalResult;
	var start = 0;
	var end = text.length - 1;
	var iterations = 0;
	var trimmedResult;
	while (start <= end && iterations <= text.length - 1) {
		var middle = Math.floor((start + end) / 2);
		var [doesPrevOverflow, result] = checkOverflow(text, middle - 1, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit);
		var [doesMiddleOverflow] = checkOverflow(text, middle, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit);
		if (!doesPrevOverflow && !doesMiddleOverflow) start = middle + 1;
		if (doesPrevOverflow && doesMiddleOverflow) end = middle - 1;
		if (!doesPrevOverflow && doesMiddleOverflow) {
			trimmedResult = result;
			break;
		}
		iterations++;
	}
	return trimmedResult || originalResult;
};
var getWordsWithoutCalculate = (children) => {
	return [{
		words: !isNullish(children) ? children.toString().split(BREAKING_SPACES) : [],
		width: void 0
	}];
};
var getWordsByLines = (_ref4) => {
	var { width, scaleToFit, children, style, breakAll, maxLines } = _ref4;
	if ((width || scaleToFit) && !Global.isSsr) {
		var wordsWithComputedWidth, spaceWidth;
		var wordWidths = calculateWordWidths({
			breakAll,
			children,
			style
		});
		if (wordWidths) {
			var { wordsWithComputedWidth: wcw, spaceWidth: sw } = wordWidths;
			wordsWithComputedWidth = wcw;
			spaceWidth = sw;
		} else return getWordsWithoutCalculate(children);
		return calculateWordsByLines({
			breakAll,
			children,
			maxLines,
			style
		}, wordsWithComputedWidth, spaceWidth, width, Boolean(scaleToFit));
	}
	return getWordsWithoutCalculate(children);
};
var DEFAULT_FILL = "#808080";
var textDefaultProps = {
	angle: 0,
	breakAll: false,
	capHeight: "0.71em",
	fill: DEFAULT_FILL,
	lineHeight: "1em",
	scaleToFit: false,
	textAnchor: "start",
	verticalAnchor: "end",
	x: 0,
	y: 0
};
var Text = /* @__PURE__ */ forwardRef((outsideProps, ref) => {
	var _resolveDefaultProps = resolveDefaultProps(outsideProps, textDefaultProps), { x: propsX, y: propsY, lineHeight, capHeight, fill, scaleToFit, textAnchor, verticalAnchor } = _resolveDefaultProps, props = _objectWithoutProperties$13(_resolveDefaultProps, _excluded$13);
	var wordsByLines = useMemo(() => {
		return getWordsByLines({
			breakAll: props.breakAll,
			children: props.children,
			maxLines: props.maxLines,
			scaleToFit,
			style: props.style,
			width: props.width
		});
	}, [
		props.breakAll,
		props.children,
		props.maxLines,
		scaleToFit,
		props.style,
		props.width
	]);
	var { dx, dy, angle, className, breakAll } = props, textProps = _objectWithoutProperties$13(props, _excluded2$7);
	if (!isNumOrStr(propsX) || !isNumOrStr(propsY) || wordsByLines.length === 0) return null;
	var x = Number(propsX) + (isNumber(dx) ? dx : 0);
	var y = Number(propsY) + (isNumber(dy) ? dy : 0);
	if (!isWellBehavedNumber(x) || !isWellBehavedNumber(y)) return null;
	var startDy;
	switch (verticalAnchor) {
		case "start":
			startDy = reduceCSSCalc("calc(".concat(capHeight, ")"));
			break;
		case "middle":
			startDy = reduceCSSCalc("calc(".concat((wordsByLines.length - 1) / 2, " * -").concat(lineHeight, " + (").concat(capHeight, " / 2))"));
			break;
		default:
			startDy = reduceCSSCalc("calc(".concat(wordsByLines.length - 1, " * -").concat(lineHeight, ")"));
			break;
	}
	var transforms = [];
	var firstLine = wordsByLines[0];
	if (scaleToFit && firstLine != null) {
		var lineWidth = firstLine.width;
		var { width } = props;
		transforms.push("scale(".concat(isNumber(width) && isNumber(lineWidth) ? width / lineWidth : 1, ")"));
	}
	if (angle) transforms.push("rotate(".concat(angle, ", ").concat(x, ", ").concat(y, ")"));
	if (transforms.length) textProps.transform = transforms.join(" ");
	return /* @__PURE__ */ React.createElement("text", _extends$13({}, svgPropertiesAndEvents(textProps), {
		ref,
		x,
		y,
		className: clsx("recharts-text", className),
		textAnchor,
		fill: fill.includes("url") ? DEFAULT_FILL : fill
	}), wordsByLines.map((line, index) => {
		var words = line.words.join(breakAll ? "" : " ");
		return /* @__PURE__ */ React.createElement("tspan", {
			x,
			dy: index === 0 ? startDy : lineHeight,
			key: "".concat(words, "-").concat(index)
		}, words);
	}));
});
Text.displayName = "Text";
//#endregion
//#region node_modules/recharts/es6/cartesian/getCartesianPosition.js
function ownKeys$13(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$13(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$13(Object(t), !0).forEach(function(r) {
			_defineProperty$13(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$13(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$13(e, r, t) {
	return (r = _toPropertyKey$13(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$13(t) {
	var i = _toPrimitive$13(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$13(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/**
* Calculates the position and alignment for a generic element in a Cartesian coordinate system.
*
* @param options - The options including viewBox, position, and offset.
* @returns The calculated x, y, alignment and size.
*/
var getCartesianPosition = (options) => {
	var { viewBox, position, offset = 0, parentViewBox: parentViewBoxFromOptions, clamp } = options;
	var { x, y, height, upperWidth, lowerWidth } = cartesianViewBoxToTrapezoid(viewBox);
	var upperX = x;
	var lowerX = x + (upperWidth - lowerWidth) / 2;
	var middleX = (upperX + lowerX) / 2;
	var midHeightWidth = (upperWidth + lowerWidth) / 2;
	var centerX = upperX + upperWidth / 2;
	var verticalSign = height >= 0 ? 1 : -1;
	var verticalOffset = verticalSign * offset;
	var verticalEnd = verticalSign > 0 ? "end" : "start";
	var verticalStart = verticalSign > 0 ? "start" : "end";
	var horizontalSign = upperWidth >= 0 ? 1 : -1;
	var horizontalOffset = horizontalSign * offset;
	var horizontalEnd = horizontalSign > 0 ? "end" : "start";
	var horizontalStart = horizontalSign > 0 ? "start" : "end";
	var parentViewBox = parentViewBoxFromOptions;
	if (position === "top") {
		var result = {
			x: upperX + upperWidth / 2,
			y: y - verticalOffset,
			horizontalAnchor: "middle",
			verticalAnchor: verticalEnd
		};
		if (clamp && parentViewBox) {
			result.height = Math.max(y - parentViewBox.y, 0);
			result.width = upperWidth;
		}
		return result;
	}
	if (position === "bottom") {
		var _result = {
			x: lowerX + lowerWidth / 2,
			y: y + height + verticalOffset,
			horizontalAnchor: "middle",
			verticalAnchor: verticalStart
		};
		if (clamp && parentViewBox) {
			_result.height = Math.max(parentViewBox.y + parentViewBox.height - (y + height), 0);
			_result.width = lowerWidth;
		}
		return _result;
	}
	if (position === "left") {
		var _result2 = {
			x: middleX - horizontalOffset,
			y: y + height / 2,
			horizontalAnchor: horizontalEnd,
			verticalAnchor: "middle"
		};
		if (clamp && parentViewBox) {
			_result2.width = Math.max(_result2.x - parentViewBox.x, 0);
			_result2.height = height;
		}
		return _result2;
	}
	if (position === "right") {
		var _result3 = {
			x: middleX + midHeightWidth + horizontalOffset,
			y: y + height / 2,
			horizontalAnchor: horizontalStart,
			verticalAnchor: "middle"
		};
		if (clamp && parentViewBox) {
			_result3.width = Math.max(parentViewBox.x + parentViewBox.width - _result3.x, 0);
			_result3.height = height;
		}
		return _result3;
	}
	var sizeAttrs = clamp && parentViewBox ? {
		width: midHeightWidth,
		height
	} : {};
	if (position === "insideLeft") return _objectSpread$13({
		x: middleX + horizontalOffset,
		y: y + height / 2,
		horizontalAnchor: horizontalStart,
		verticalAnchor: "middle"
	}, sizeAttrs);
	if (position === "insideRight") return _objectSpread$13({
		x: middleX + midHeightWidth - horizontalOffset,
		y: y + height / 2,
		horizontalAnchor: horizontalEnd,
		verticalAnchor: "middle"
	}, sizeAttrs);
	if (position === "insideTop") return _objectSpread$13({
		x: upperX + upperWidth / 2,
		y: y + verticalOffset,
		horizontalAnchor: "middle",
		verticalAnchor: verticalStart
	}, sizeAttrs);
	if (position === "insideBottom") return _objectSpread$13({
		x: lowerX + lowerWidth / 2,
		y: y + height - verticalOffset,
		horizontalAnchor: "middle",
		verticalAnchor: verticalEnd
	}, sizeAttrs);
	if (position === "insideTopLeft") return _objectSpread$13({
		x: upperX + horizontalOffset,
		y: y + verticalOffset,
		horizontalAnchor: horizontalStart,
		verticalAnchor: verticalStart
	}, sizeAttrs);
	if (position === "insideTopRight") return _objectSpread$13({
		x: upperX + upperWidth - horizontalOffset,
		y: y + verticalOffset,
		horizontalAnchor: horizontalEnd,
		verticalAnchor: verticalStart
	}, sizeAttrs);
	if (position === "insideBottomLeft") return _objectSpread$13({
		x: lowerX + horizontalOffset,
		y: y + height - verticalOffset,
		horizontalAnchor: horizontalStart,
		verticalAnchor: verticalEnd
	}, sizeAttrs);
	if (position === "insideBottomRight") return _objectSpread$13({
		x: lowerX + lowerWidth - horizontalOffset,
		y: y + height - verticalOffset,
		horizontalAnchor: horizontalEnd,
		verticalAnchor: verticalEnd
	}, sizeAttrs);
	if (!!position && typeof position === "object" && (isNumber(position.x) || isPercent(position.x)) && (isNumber(position.y) || isPercent(position.y))) return _objectSpread$13({
		x: x + getPercentValue(position.x, midHeightWidth),
		y: y + getPercentValue(position.y, height),
		horizontalAnchor: "end",
		verticalAnchor: "end"
	}, sizeAttrs);
	return _objectSpread$13({
		x: centerX,
		y: y + height / 2,
		horizontalAnchor: "middle",
		verticalAnchor: "middle"
	}, sizeAttrs);
};
//#endregion
//#region node_modules/recharts/es6/component/Label.js
var _excluded$12 = ["labelRef"], _excluded2$6 = ["content"];
function _objectWithoutProperties$12(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$12(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$12(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function ownKeys$12(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$12(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$12(Object(t), !0).forEach(function(r) {
			_defineProperty$12(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$12(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$12(e, r, t) {
	return (r = _toPropertyKey$12(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$12(t) {
	var i = _toPrimitive$12(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$12(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$12() {
	return _extends$12 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$12.apply(null, arguments);
}
/**
* @inline
*/
/**
* @inline
*/
/**
* @inline
*/
var CartesianLabelContext = /* @__PURE__ */ createContext(null);
var CartesianLabelContextProvider = (_ref) => {
	var { x, y, upperWidth, lowerWidth, width, height, children } = _ref;
	var viewBox = useMemo(() => ({
		x,
		y,
		upperWidth,
		lowerWidth,
		width,
		height
	}), [
		x,
		y,
		upperWidth,
		lowerWidth,
		width,
		height
	]);
	return /* @__PURE__ */ React.createElement(CartesianLabelContext.Provider, { value: viewBox }, children);
};
var useCartesianLabelContext = () => {
	var labelChildContext = useContext(CartesianLabelContext);
	var chartContext = useViewBox();
	return labelChildContext || (chartContext ? cartesianViewBoxToTrapezoid(chartContext) : void 0);
};
var PolarLabelContext = /* @__PURE__ */ createContext(null);
var usePolarLabelContext = () => {
	var labelChildContext = useContext(PolarLabelContext);
	var chartContext = useAppSelector(selectPolarViewBox);
	return labelChildContext || chartContext;
};
var getLabel = (props) => {
	var { value, formatter } = props;
	var label = isNullish(props.children) ? value : props.children;
	if (typeof formatter === "function") return formatter(label);
	return label;
};
var isLabelContentAFunction = (content) => {
	return content != null && typeof content === "function";
};
var getDeltaAngle = (startAngle, endAngle) => {
	return mathSign(endAngle - startAngle) * Math.min(Math.abs(endAngle - startAngle), 360);
};
var renderRadialLabel = (labelProps, position, label, attrs, viewBox) => {
	var { offset, className } = labelProps;
	var { cx, cy, innerRadius, outerRadius, startAngle, endAngle, clockWise } = viewBox;
	var radius = (innerRadius + outerRadius) / 2;
	var deltaAngle = getDeltaAngle(startAngle, endAngle);
	var sign = deltaAngle >= 0 ? 1 : -1;
	var labelAngle, direction;
	switch (position) {
		case "insideStart":
			labelAngle = startAngle + sign * offset;
			direction = clockWise;
			break;
		case "insideEnd":
			labelAngle = endAngle - sign * offset;
			direction = !clockWise;
			break;
		case "end":
			labelAngle = endAngle + sign * offset;
			direction = clockWise;
			break;
		default: throw new Error("Unsupported position ".concat(position));
	}
	direction = deltaAngle <= 0 ? direction : !direction;
	var startPoint = polarToCartesian(cx, cy, radius, labelAngle);
	var endPoint = polarToCartesian(cx, cy, radius, labelAngle + (direction ? 1 : -1) * 359);
	var path = "M".concat(startPoint.x, ",").concat(startPoint.y, "\n    A").concat(radius, ",").concat(radius, ",0,1,").concat(direction ? 0 : 1, ",\n    ").concat(endPoint.x, ",").concat(endPoint.y);
	var id = isNullish(labelProps.id) ? uniqueId("recharts-radial-line-") : labelProps.id;
	return /* @__PURE__ */ React.createElement("text", _extends$12({}, attrs, {
		dominantBaseline: "central",
		className: clsx("recharts-radial-bar-label", className)
	}), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("path", {
		id,
		d: path
	})), /* @__PURE__ */ React.createElement("textPath", { xlinkHref: "#".concat(id) }, label));
};
var getAttrsOfPolarLabel = (viewBox, offset, position) => {
	var { cx, cy, innerRadius, outerRadius, startAngle, endAngle } = viewBox;
	var midAngle = (startAngle + endAngle) / 2;
	if (position === "outside") {
		var { x: _x, y: _y } = polarToCartesian(cx, cy, outerRadius + offset, midAngle);
		return {
			x: _x,
			y: _y,
			textAnchor: _x >= cx ? "start" : "end",
			verticalAnchor: "middle"
		};
	}
	if (position === "center") return {
		x: cx,
		y: cy,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
	if (position === "centerTop") return {
		x: cx,
		y: cy,
		textAnchor: "middle",
		verticalAnchor: "start"
	};
	if (position === "centerBottom") return {
		x: cx,
		y: cy,
		textAnchor: "middle",
		verticalAnchor: "end"
	};
	var { x, y } = polarToCartesian(cx, cy, (innerRadius + outerRadius) / 2, midAngle);
	return {
		x,
		y,
		textAnchor: "middle",
		verticalAnchor: "middle"
	};
};
var isPolar = (viewBox) => viewBox != null && "cx" in viewBox && isNumber(viewBox.cx);
var defaultLabelProps = {
	angle: 0,
	offset: 5,
	zIndex: DefaultZIndexes.label,
	position: "middle",
	textBreakAll: false
};
function polarViewBoxToTrapezoid(viewBox) {
	if (!isPolar(viewBox)) return viewBox;
	var { cx, cy, outerRadius } = viewBox;
	var diameter = outerRadius * 2;
	return {
		x: cx - outerRadius,
		y: cy - outerRadius,
		width: diameter,
		upperWidth: diameter,
		lowerWidth: diameter,
		height: diameter
	};
}
/**
* @consumes CartesianViewBoxContext
* @consumes PolarViewBoxContext
* @consumes CartesianLabelContext
* @consumes PolarLabelContext
*/
function Label(outerProps) {
	var props = resolveDefaultProps(outerProps, defaultLabelProps);
	var { viewBox: viewBoxFromProps, parentViewBox, position, value, children, content, className = "", textBreakAll, labelRef } = props;
	var polarViewBox = usePolarLabelContext();
	var cartesianViewBox = useCartesianLabelContext();
	var resolvedViewBox = position === "center" ? cartesianViewBox : polarViewBox !== null && polarViewBox !== void 0 ? polarViewBox : cartesianViewBox;
	var viewBox, label, positionAttrs;
	if (viewBoxFromProps == null) viewBox = resolvedViewBox;
	else if (isPolar(viewBoxFromProps)) viewBox = viewBoxFromProps;
	else viewBox = cartesianViewBoxToTrapezoid(viewBoxFromProps);
	var cartesianBox = polarViewBoxToTrapezoid(viewBox);
	if (!viewBox || isNullish(value) && isNullish(children) && !/* @__PURE__ */ isValidElement(content) && typeof content !== "function") return null;
	var propsWithViewBox = _objectSpread$12(_objectSpread$12({}, props), {}, { viewBox });
	if (/* @__PURE__ */ isValidElement(content)) {
		var { labelRef: _ } = propsWithViewBox;
		return /* @__PURE__ */ cloneElement(content, _objectWithoutProperties$12(propsWithViewBox, _excluded$12));
	}
	if (typeof content === "function") {
		var { content: _2 } = propsWithViewBox;
		label = /* @__PURE__ */ createElement(content, _objectWithoutProperties$12(propsWithViewBox, _excluded2$6));
		if (/* @__PURE__ */ isValidElement(label)) return label;
	} else label = getLabel(props);
	var attrs = svgPropertiesAndEvents(props);
	if (isPolar(viewBox)) {
		if (position === "insideStart" || position === "insideEnd" || position === "end") return renderRadialLabel(props, position, label, attrs, viewBox);
		positionAttrs = getAttrsOfPolarLabel(viewBox, props.offset, props.position);
	} else {
		if (!cartesianBox) return null;
		var cartesianResult = getCartesianPosition({
			viewBox: cartesianBox,
			position,
			offset: props.offset,
			parentViewBox: isPolar(parentViewBox) ? void 0 : parentViewBox,
			clamp: true
		});
		positionAttrs = _objectSpread$12(_objectSpread$12({
			x: cartesianResult.x,
			y: cartesianResult.y,
			textAnchor: cartesianResult.horizontalAnchor,
			verticalAnchor: cartesianResult.verticalAnchor
		}, cartesianResult.width !== void 0 ? { width: cartesianResult.width } : {}), cartesianResult.height !== void 0 ? { height: cartesianResult.height } : {});
	}
	return /* @__PURE__ */ React.createElement(ZIndexLayer, { zIndex: props.zIndex }, /* @__PURE__ */ React.createElement(Text, _extends$12({
		ref: labelRef,
		className: clsx("recharts-label", className)
	}, attrs, positionAttrs, {
		textAnchor: isValidTextAnchor(attrs.textAnchor) ? attrs.textAnchor : positionAttrs.textAnchor,
		breakAll: textBreakAll
	}), label));
}
Label.displayName = "Label";
var parseLabel = (label, viewBox, labelRef) => {
	if (!label) return null;
	var commonProps = {
		viewBox,
		labelRef
	};
	if (label === true) return /* @__PURE__ */ React.createElement(Label, _extends$12({ key: "label-implicit" }, commonProps));
	if (isNumOrStr(label)) return /* @__PURE__ */ React.createElement(Label, _extends$12({
		key: "label-implicit",
		value: label
	}, commonProps));
	if (/* @__PURE__ */ isValidElement(label)) {
		if (label.type === Label) return /* @__PURE__ */ cloneElement(label, _objectSpread$12({ key: "label-implicit" }, commonProps));
		return /* @__PURE__ */ React.createElement(Label, _extends$12({
			key: "label-implicit",
			content: label
		}, commonProps));
	}
	if (isLabelContentAFunction(label)) return /* @__PURE__ */ React.createElement(Label, _extends$12({
		key: "label-implicit",
		content: label
	}, commonProps));
	if (label && typeof label === "object") return /* @__PURE__ */ React.createElement(Label, _extends$12({}, label, { key: "label-implicit" }, commonProps));
	return null;
};
function CartesianLabelFromLabelProp(_ref3) {
	var { label, labelRef } = _ref3;
	return parseLabel(label, useCartesianLabelContext(), labelRef) || null;
}
//#endregion
//#region node_modules/recharts/es6/component/LabelList.js
var _excluded$11 = ["valueAccessor"], _excluded2$5 = [
	"dataKey",
	"clockWise",
	"id",
	"textBreakAll",
	"zIndex"
];
function _extends$11() {
	return _extends$11 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$11.apply(null, arguments);
}
function _objectWithoutProperties$11(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$11(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$11(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
/**
* This is public API because we expose it as the valueAccessor parameter.
*
* The properties of "viewBox" are repeated as the root props of the entry object.
* So it doesn't matter if you read entry.x or entry.viewBox.x, they are the same.
*
* It's not necessary to pass redundant data, but we keep it for backward compatibility.
*/
/**
* LabelList props do not allow refs because the same props are reused in multiple elements so we don't have a good single place to ref to.
*/
/**
* This is the type accepted for the `label` prop on various graphical items.
* It accepts:
*
* boolean:
*    true = labels show,
*    false = labels don't show
* React element:
*    will be cloned with extra props
* function:
*    is used as <Label content={function} />, so this will be called once for each individual label (so typically once for each data point)
* object:
*    the props to be passed to a LabelList component
*
* @inline
*/
var defaultAccessor = (entry) => {
	var val = Array.isArray(entry.value) ? entry.value[entry.value.length - 1] : entry.value;
	if (isRenderableText(val)) return val;
};
var CartesianLabelListContext = /* @__PURE__ */ createContext(void 0);
var CartesianLabelListContextProvider = CartesianLabelListContext.Provider;
var PolarLabelListContext = /* @__PURE__ */ createContext(void 0);
PolarLabelListContext.Provider;
function useCartesianLabelListContext() {
	return useContext(CartesianLabelListContext);
}
function usePolarLabelListContext() {
	return useContext(PolarLabelListContext);
}
/**
* @consumes LabelListContext
*/
function LabelList(_ref) {
	var { valueAccessor = defaultAccessor } = _ref, restProps = _objectWithoutProperties$11(_ref, _excluded$11);
	var { dataKey, clockWise, id, textBreakAll, zIndex } = restProps, others = _objectWithoutProperties$11(restProps, _excluded2$5);
	var cartesianData = useCartesianLabelListContext();
	var polarData = usePolarLabelListContext();
	var data = cartesianData || polarData;
	if (!data || !data.length) return null;
	return /* @__PURE__ */ React.createElement(ZIndexLayer, { zIndex: zIndex !== null && zIndex !== void 0 ? zIndex : DefaultZIndexes.label }, /* @__PURE__ */ React.createElement(Layer, { className: "recharts-label-list" }, data.map((entry, index) => {
		var _restProps$fill;
		var value = isNullish(dataKey) ? valueAccessor(entry, index) : getValueByDataKey(entry.payload, dataKey);
		var idProps = isNullish(id) ? {} : { id: "".concat(id, "-").concat(index) };
		return /* @__PURE__ */ React.createElement(Label, _extends$11({ key: "label-".concat(index) }, svgPropertiesAndEvents(entry), others, idProps, {
			fill: (_restProps$fill = restProps.fill) !== null && _restProps$fill !== void 0 ? _restProps$fill : entry.fill,
			parentViewBox: entry.parentViewBox,
			value,
			textBreakAll,
			viewBox: entry.viewBox,
			index,
			zIndex: 0
		}));
	})));
}
LabelList.displayName = "LabelList";
function LabelListFromLabelProp(_ref2) {
	var { label } = _ref2;
	if (!label) return null;
	if (label === true) return /* @__PURE__ */ React.createElement(LabelList, { key: "labelList-implicit" });
	if (/* @__PURE__ */ React.isValidElement(label) || isLabelContentAFunction(label)) return /* @__PURE__ */ React.createElement(LabelList, {
		key: "labelList-implicit",
		content: label
	});
	if (typeof label === "object") return /* @__PURE__ */ React.createElement(LabelList, _extends$11({ key: "labelList-implicit" }, label, { type: String(label.type) }));
	return null;
}
//#endregion
//#region node_modules/recharts/es6/state/polarAxisSlice.js
var polarAxisSlice = createSlice({
	name: "polarAxis",
	initialState: {
		radiusAxis: {},
		angleAxis: {}
	},
	reducers: {
		addRadiusAxis(state, action) {
			state.radiusAxis[action.payload.id] = castDraft(action.payload);
		},
		removeRadiusAxis(state, action) {
			delete state.radiusAxis[action.payload.id];
		},
		addAngleAxis(state, action) {
			state.angleAxis[action.payload.id] = castDraft(action.payload);
		},
		removeAngleAxis(state, action) {
			delete state.angleAxis[action.payload.id];
		}
	}
});
var { addRadiusAxis, removeRadiusAxis, addAngleAxis, removeAngleAxis } = polarAxisSlice.actions;
var polarAxisReducer = polarAxisSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/util/getClassNameFromUnknown.js
function getClassNameFromUnknown(u) {
	if (u && typeof u === "object" && "className" in u && typeof u.className === "string") return u.className;
	return "";
}
//#endregion
//#region node_modules/recharts/es6/util/ReactUtils.js
/**
* @deprecated instead find another approach that does not depend on displayName.
* Get the display name of a component
* @param  {Object} Comp Specified Component
* @return {String}      Display name of Component
*/
var getDisplayName = (Comp) => {
	if (typeof Comp === "string") return Comp;
	if (!Comp) return "";
	return Comp.displayName || Comp.name || "Component";
};
var lastChildren = null;
var lastResult = null;
/**
* @deprecated instead find another approach that does not require reading React Elements from DOM.
*
* @param children do not use
* @return deprecated do not use
*/
var toArray = (children) => {
	if (children === lastChildren && Array.isArray(lastResult)) return lastResult;
	var result = [];
	Children.forEach(children, (child) => {
		if (isNullish(child)) return;
		if (isFragment(child)) result = result.concat(toArray(child.props.children));
		else result.push(child);
	});
	lastResult = result;
	lastChildren = children;
	return result;
};
/**
* @deprecated instead find another approach that does not require reading React Elements from DOM.
*
* Find and return all matched children by type.
* `type` must be a React.ComponentType
*
* @param children do not use
* @param type do not use
* @return deprecated do not use
*/
function findAllByType(children, type) {
	var result = [];
	var types = [];
	if (Array.isArray(type)) types = type.map((t) => getDisplayName(t));
	else types = [getDisplayName(type)];
	toArray(children).forEach((child) => {
		var childType = get(child, "type.displayName") || get(child, "type.name");
		if (childType && types.indexOf(childType) !== -1) result.push(child);
	});
	return result;
}
//#endregion
//#region node_modules/recharts/es6/shape/Trapezoid.js
/**
* @fileOverview Rectangle
*/
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function ownKeys$11(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$11(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$11(Object(t), !0).forEach(function(r) {
			_defineProperty$11(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$11(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$11(e, r, t) {
	return (r = _toPropertyKey$11(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$11(t) {
	var i = _toPrimitive$11(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$11(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$10() {
	return _extends$10 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$10.apply(null, arguments);
}
function _taggedTemplateLiteral(e, t) {
	return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var getTrapezoidPath = (x, y, upperWidth, lowerWidth, height) => {
	var widthGap = upperWidth - lowerWidth;
	var path = roundTemplateLiteral(_templateObject || (_templateObject = _taggedTemplateLiteral([
		"M ",
		",",
		""
	])), x, y);
	path += roundTemplateLiteral(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral([
		"L ",
		",",
		""
	])), x + upperWidth, y);
	path += roundTemplateLiteral(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral([
		"L ",
		",",
		""
	])), x + upperWidth - widthGap / 2, y + height);
	path += roundTemplateLiteral(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral([
		"L ",
		",",
		""
	])), x + upperWidth - widthGap / 2 - lowerWidth, y + height);
	path += roundTemplateLiteral(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral([
		"L ",
		",",
		" Z"
	])), x, y);
	return path;
};
var defaultTrapezoidProps = {
	x: 0,
	y: 0,
	upperWidth: 0,
	lowerWidth: 0,
	height: 0,
	isUpdateAnimationActive: false,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease"
};
var Trapezoid = (outsideProps) => {
	var trapezoidProps = resolveDefaultProps(outsideProps, defaultTrapezoidProps);
	var { x, y, upperWidth, lowerWidth, height, className } = trapezoidProps;
	var { animationEasing, animationDuration, animationBegin, isUpdateAnimationActive } = trapezoidProps;
	var pathRef = useRef(null);
	var [totalLength, setTotalLength] = useState(-1);
	var prevUpperWidthRef = useRef(upperWidth);
	var prevLowerWidthRef = useRef(lowerWidth);
	var prevHeightRef = useRef(height);
	var prevXRef = useRef(x);
	var prevYRef = useRef(y);
	var animationId = useAnimationId(outsideProps, "trapezoid-");
	useEffect(() => {
		if (pathRef.current && pathRef.current.getTotalLength) try {
			var pathTotalLength = pathRef.current.getTotalLength();
			if (pathTotalLength) setTotalLength(pathTotalLength);
		} catch (_unused) {}
	}, []);
	if (x !== +x || y !== +y || upperWidth !== +upperWidth || lowerWidth !== +lowerWidth || height !== +height || upperWidth === 0 && lowerWidth === 0 || height === 0) return null;
	var layerClass = clsx("recharts-trapezoid", className);
	if (!isUpdateAnimationActive) return /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("path", _extends$10({}, svgPropertiesAndEvents(trapezoidProps), {
		className: layerClass,
		d: getTrapezoidPath(x, y, upperWidth, lowerWidth, height)
	})));
	var prevUpperWidth = prevUpperWidthRef.current;
	var prevLowerWidth = prevLowerWidthRef.current;
	var prevHeight = prevHeightRef.current;
	var prevX = prevXRef.current;
	var prevY = prevYRef.current;
	var from = "0px ".concat(totalLength === -1 ? 1 : totalLength, "px");
	var to = "".concat(totalLength, "px ").concat(totalLength, "px");
	var transition = getTransitionVal(["strokeDasharray"], animationDuration, animationEasing);
	return /* @__PURE__ */ React.createElement(JavascriptAnimate, {
		animationId,
		key: animationId,
		canBegin: totalLength > 0,
		duration: animationDuration,
		easing: animationEasing,
		isActive: isUpdateAnimationActive,
		begin: animationBegin
	}, (t) => {
		var currUpperWidth = interpolate(prevUpperWidth, upperWidth, t);
		var currLowerWidth = interpolate(prevLowerWidth, lowerWidth, t);
		var currHeight = interpolate(prevHeight, height, t);
		var currX = interpolate(prevX, x, t);
		var currY = interpolate(prevY, y, t);
		if (pathRef.current) {
			prevUpperWidthRef.current = currUpperWidth;
			prevLowerWidthRef.current = currLowerWidth;
			prevHeightRef.current = currHeight;
			prevXRef.current = currX;
			prevYRef.current = currY;
		}
		var animationStyle = t > 0 ? {
			transition,
			strokeDasharray: to
		} : { strokeDasharray: from };
		return /* @__PURE__ */ React.createElement("path", _extends$10({}, svgPropertiesAndEvents(trapezoidProps), {
			className: layerClass,
			d: getTrapezoidPath(currX, currY, currUpperWidth, currLowerWidth, currHeight),
			ref: pathRef,
			style: _objectSpread$11(_objectSpread$11({}, animationStyle), trapezoidProps.style)
		}));
	});
};
//#endregion
//#region node_modules/recharts/es6/util/ActiveShapeUtils.js
var _excluded$10 = [
	"option",
	"shapeType",
	"activeClassName",
	"inActiveClassName"
];
function _objectWithoutProperties$10(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$10(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$10(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function ownKeys$10(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$10(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$10(Object(t), !0).forEach(function(r) {
			_defineProperty$10(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$10(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$10(e, r, t) {
	return (r = _toPropertyKey$10(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$10(t) {
	var i = _toPrimitive$10(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$10(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/**
* This is an abstraction for rendering a user defined prop for a customized shape in several forms.
*
* <Shape /> is the root and will handle taking in:
*  - an object of svg properties
*  - a boolean
*  - a render prop(inline function that returns jsx)
*  - a React element
*
* <ShapeSelector /> is a subcomponent of <Shape /> and used to match a component
* to the value of props.shapeType that is passed to the root.
*
*/
function defaultPropTransformer(option, props) {
	return _objectSpread$10(_objectSpread$10({}, props), option);
}
function isSymbolsProps(shapeType, _elementProps) {
	return shapeType === "symbols";
}
function ShapeSelector(_ref) {
	var { shapeType, elementProps } = _ref;
	switch (shapeType) {
		case "rectangle": return /* @__PURE__ */ React.createElement(Rectangle, elementProps);
		case "trapezoid": return /* @__PURE__ */ React.createElement(Trapezoid, elementProps);
		case "sector": return /* @__PURE__ */ React.createElement(Sector, elementProps);
		case "symbols":
			if (isSymbolsProps(shapeType, elementProps)) return /* @__PURE__ */ React.createElement(Symbols, elementProps);
			break;
		case "curve": return /* @__PURE__ */ React.createElement(Curve, elementProps);
		default: return null;
	}
}
function getPropsFromShapeOption(option) {
	if (/* @__PURE__ */ isValidElement(option)) return option.props;
	return option;
}
function Shape(_ref2) {
	var { option, shapeType, activeClassName = "recharts-active-shape", inActiveClassName = "recharts-shape" } = _ref2, props = _objectWithoutProperties$10(_ref2, _excluded$10);
	var shape;
	if (/* @__PURE__ */ isValidElement(option)) shape = /* @__PURE__ */ cloneElement(option, _objectSpread$10(_objectSpread$10({}, props), getPropsFromShapeOption(option)));
	else if (typeof option === "function") shape = option(props, props.index);
	else if (isPlainObject(option) && typeof option !== "boolean") {
		var nextProps = defaultPropTransformer(option, props);
		shape = /* @__PURE__ */ React.createElement(ShapeSelector, {
			shapeType,
			elementProps: nextProps
		});
	} else {
		var elementProps = props;
		shape = /* @__PURE__ */ React.createElement(ShapeSelector, {
			shapeType,
			elementProps
		});
	}
	if (props.isActive) return /* @__PURE__ */ React.createElement(Layer, { className: activeClassName }, shape);
	return /* @__PURE__ */ React.createElement(Layer, { className: inActiveClassName }, shape);
}
//#endregion
//#region node_modules/recharts/es6/context/tooltipContext.js
/**
* Some graphical items choose to provide more information to the tooltip
* and some do not.
*/
var useMouseEnterItemDispatch = (onMouseEnterFromProps, dataKey, graphicalItemId) => {
	var dispatch = useAppDispatch();
	return (data, index) => (event) => {
		onMouseEnterFromProps === null || onMouseEnterFromProps === void 0 || onMouseEnterFromProps(data, index, event);
		dispatch(setActiveMouseOverItemIndex({
			activeIndex: String(index),
			activeDataKey: dataKey,
			activeCoordinate: data.tooltipPosition,
			activeGraphicalItemId: graphicalItemId
		}));
	};
};
var useMouseLeaveItemDispatch = (onMouseLeaveFromProps) => {
	var dispatch = useAppDispatch();
	return (data, index) => (event) => {
		onMouseLeaveFromProps === null || onMouseLeaveFromProps === void 0 || onMouseLeaveFromProps(data, index, event);
		dispatch(mouseLeaveItem());
	};
};
var useMouseClickItemDispatch = (onMouseClickFromProps, dataKey, graphicalItemId) => {
	var dispatch = useAppDispatch();
	return (data, index) => (event) => {
		onMouseClickFromProps === null || onMouseClickFromProps === void 0 || onMouseClickFromProps(data, index, event);
		dispatch(setActiveClickItemIndex({
			activeIndex: String(index),
			activeDataKey: dataKey,
			activeCoordinate: data.tooltipPosition,
			activeGraphicalItemId: graphicalItemId
		}));
	};
};
//#endregion
//#region node_modules/recharts/es6/state/SetTooltipEntrySettings.js
function SetTooltipEntrySettings(_ref) {
	var { tooltipEntrySettings } = _ref;
	var dispatch = useAppDispatch();
	var isPanorama = useIsPanorama();
	var prevSettingsRef = useRef(null);
	useLayoutEffect(() => {
		if (isPanorama) return;
		if (prevSettingsRef.current === null) dispatch(addTooltipEntrySettings(tooltipEntrySettings));
		else if (prevSettingsRef.current !== tooltipEntrySettings) dispatch(replaceTooltipEntrySettings({
			prev: prevSettingsRef.current,
			next: tooltipEntrySettings
		}));
		prevSettingsRef.current = tooltipEntrySettings;
	}, [
		tooltipEntrySettings,
		dispatch,
		isPanorama
	]);
	useLayoutEffect(() => {
		return () => {
			if (prevSettingsRef.current) {
				dispatch(removeTooltipEntrySettings(prevSettingsRef.current));
				prevSettingsRef.current = null;
			}
		};
	}, [dispatch]);
	return null;
}
//#endregion
//#region node_modules/recharts/es6/state/SetLegendPayload.js
function SetLegendPayload(_ref) {
	var { legendPayload } = _ref;
	var dispatch = useAppDispatch();
	var isPanorama = useIsPanorama();
	var prevPayloadRef = useRef(null);
	useLayoutEffect(() => {
		if (isPanorama) return;
		if (prevPayloadRef.current === null) dispatch(addLegendPayload(legendPayload));
		else if (prevPayloadRef.current !== legendPayload) dispatch(replaceLegendPayload({
			prev: prevPayloadRef.current,
			next: legendPayload
		}));
		prevPayloadRef.current = legendPayload;
	}, [
		dispatch,
		isPanorama,
		legendPayload
	]);
	useLayoutEffect(() => {
		return () => {
			if (prevPayloadRef.current) {
				dispatch(removeLegendPayload(prevPayloadRef.current));
				prevPayloadRef.current = null;
			}
		};
	}, [dispatch]);
	return null;
}
//#endregion
//#region node_modules/recharts/es6/util/useId.js
var _ref;
/**
* Fallback for React.useId() for versions prior to React 18.
* Generates a unique ID using a simple counter and a prefix.
*
* @returns A unique ID that remains consistent across renders.
*/
var useIdFallback = () => {
	var [id] = React.useState(() => uniqueId("uid-"));
	return id;
};
var useId = (_ref = React["useId".toString()]) !== null && _ref !== void 0 ? _ref : useIdFallback;
//#endregion
//#region node_modules/recharts/es6/util/useUniqueId.js
/**
* A hook that generates a unique ID. It uses React.useId() in React 18+ for SSR safety
* and falls back to a client-side-only unique ID generator for older versions.
*
* The ID will stay the same across renders, and you can optionally provide a prefix.
*
* @param [prefix] - An optional prefix for the generated ID.
* @param [customId] - An optional custom ID to override the generated one.
* @returns The unique ID.
*/
function useUniqueId(prefix, customId) {
	var generatedId = useId();
	if (customId) return customId;
	return prefix ? "".concat(prefix, "-").concat(generatedId) : generatedId;
}
/**
* The useUniqueId hook returns a unique ID that is either reused from external props or generated internally.
* Either way the ID is now guaranteed to be present so no more nulls or undefined.
*/
//#endregion
//#region node_modules/recharts/es6/context/RegisterGraphicalItemId.js
var GraphicalItemIdContext = /* @__PURE__ */ createContext(void 0);
var RegisterGraphicalItemId = (_ref) => {
	var { id, type, children } = _ref;
	var resolvedId = useUniqueId("recharts-".concat(type), id);
	return /* @__PURE__ */ React.createElement(GraphicalItemIdContext.Provider, { value: resolvedId }, children(resolvedId));
};
//#endregion
//#region node_modules/recharts/es6/state/graphicalItemsSlice.js
var graphicalItemsSlice = createSlice({
	name: "graphicalItems",
	initialState: {
		cartesianItems: [],
		polarItems: []
	},
	reducers: {
		addCartesianGraphicalItem: {
			reducer(state, action) {
				state.cartesianItems.push(castDraft(action.payload));
			},
			prepare: prepareAutoBatched()
		},
		replaceCartesianGraphicalItem: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				var index = current(state).cartesianItems.indexOf(castDraft(prev));
				if (index > -1) state.cartesianItems[index] = castDraft(next);
			},
			prepare: prepareAutoBatched()
		},
		removeCartesianGraphicalItem: {
			reducer(state, action) {
				var index = current(state).cartesianItems.indexOf(castDraft(action.payload));
				if (index > -1) state.cartesianItems.splice(index, 1);
			},
			prepare: prepareAutoBatched()
		},
		addPolarGraphicalItem: {
			reducer(state, action) {
				state.polarItems.push(castDraft(action.payload));
			},
			prepare: prepareAutoBatched()
		},
		removePolarGraphicalItem: {
			reducer(state, action) {
				var index = current(state).polarItems.indexOf(castDraft(action.payload));
				if (index > -1) state.polarItems.splice(index, 1);
			},
			prepare: prepareAutoBatched()
		},
		replacePolarGraphicalItem: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				var index = current(state).polarItems.indexOf(castDraft(prev));
				if (index > -1) state.polarItems[index] = castDraft(next);
			},
			prepare: prepareAutoBatched()
		}
	}
});
var { addCartesianGraphicalItem, replaceCartesianGraphicalItem, removeCartesianGraphicalItem, addPolarGraphicalItem, removePolarGraphicalItem, replacePolarGraphicalItem } = graphicalItemsSlice.actions;
var graphicalItemsReducer = graphicalItemsSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/state/SetGraphicalItem.js
var SetCartesianGraphicalItemImpl = (props) => {
	var dispatch = useAppDispatch();
	var prevPropsRef = useRef(null);
	useLayoutEffect(() => {
		if (prevPropsRef.current === null) dispatch(addCartesianGraphicalItem(props));
		else if (prevPropsRef.current !== props) dispatch(replaceCartesianGraphicalItem({
			prev: prevPropsRef.current,
			next: props
		}));
		prevPropsRef.current = props;
	}, [dispatch, props]);
	useLayoutEffect(() => {
		return () => {
			if (prevPropsRef.current) {
				dispatch(removeCartesianGraphicalItem(prevPropsRef.current));
				prevPropsRef.current = null;
			}
		};
	}, [dispatch]);
	return null;
};
var SetCartesianGraphicalItem = /* @__PURE__ */ memo(SetCartesianGraphicalItemImpl);
//#endregion
//#region node_modules/recharts/es6/state/cartesianAxisSlice.js
function ownKeys$9(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$9(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$9(Object(t), !0).forEach(function(r) {
			_defineProperty$9(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$9(e, r, t) {
	return (r = _toPropertyKey$9(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$9(t) {
	var i = _toPrimitive$9(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$9(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/**
* This is the slice where each individual Axis element pushes its own configuration.
* Prefer to use this one instead of axisSlice.
*/
var cartesianAxisSlice = createSlice({
	name: "cartesianAxis",
	initialState: {
		xAxis: {},
		yAxis: {},
		zAxis: {}
	},
	reducers: {
		addXAxis: {
			reducer(state, action) {
				state.xAxis[action.payload.id] = castDraft(action.payload);
			},
			prepare: prepareAutoBatched()
		},
		replaceXAxis: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				if (state.xAxis[prev.id] !== void 0) {
					if (prev.id !== next.id) delete state.xAxis[prev.id];
					state.xAxis[next.id] = castDraft(next);
				}
			},
			prepare: prepareAutoBatched()
		},
		removeXAxis: {
			reducer(state, action) {
				delete state.xAxis[action.payload.id];
			},
			prepare: prepareAutoBatched()
		},
		addYAxis: {
			reducer(state, action) {
				state.yAxis[action.payload.id] = castDraft(action.payload);
			},
			prepare: prepareAutoBatched()
		},
		replaceYAxis: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				if (state.yAxis[prev.id] !== void 0) {
					if (prev.id !== next.id) delete state.yAxis[prev.id];
					state.yAxis[next.id] = castDraft(next);
				}
			},
			prepare: prepareAutoBatched()
		},
		removeYAxis: {
			reducer(state, action) {
				delete state.yAxis[action.payload.id];
			},
			prepare: prepareAutoBatched()
		},
		addZAxis: {
			reducer(state, action) {
				state.zAxis[action.payload.id] = castDraft(action.payload);
			},
			prepare: prepareAutoBatched()
		},
		replaceZAxis: {
			reducer(state, action) {
				var { prev, next } = action.payload;
				if (state.zAxis[prev.id] !== void 0) {
					if (prev.id !== next.id) delete state.zAxis[prev.id];
					state.zAxis[next.id] = castDraft(next);
				}
			},
			prepare: prepareAutoBatched()
		},
		removeZAxis: {
			reducer(state, action) {
				delete state.zAxis[action.payload.id];
			},
			prepare: prepareAutoBatched()
		},
		updateYAxisWidth(state, action) {
			var { id, width } = action.payload;
			var axis = state.yAxis[id];
			if (axis) {
				var _history$;
				var history = axis.widthHistory || [];
				if (history.length === 3 && history[0] === history[2] && width === history[1] && width !== axis.width && Math.abs(width - ((_history$ = history[0]) !== null && _history$ !== void 0 ? _history$ : 0)) <= 1) return;
				var newHistory = [...history, width].slice(-3);
				state.yAxis[id] = _objectSpread$9(_objectSpread$9({}, axis), {}, {
					width,
					widthHistory: newHistory
				});
			}
		}
	}
});
var { addXAxis, replaceXAxis, removeXAxis, addYAxis, replaceYAxis, removeYAxis, addZAxis, replaceZAxis, removeZAxis, updateYAxisWidth } = cartesianAxisSlice.actions;
var cartesianAxisReducer = cartesianAxisSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectPlotArea.js
var selectPlotArea = createSelector([
	createSelector([selectChartOffsetInternal], (offsetInternal) => {
		return {
			top: offsetInternal.top,
			bottom: offsetInternal.bottom,
			left: offsetInternal.left,
			right: offsetInternal.right
		};
	}),
	selectChartWidth,
	selectChartHeight
], (offset, chartWidth, chartHeight) => {
	if (!offset || chartWidth == null || chartHeight == null) return;
	return {
		x: offset.left,
		y: offset.top,
		width: Math.max(0, chartWidth - offset.left - offset.right),
		height: Math.max(0, chartHeight - offset.top - offset.bottom)
	};
});
//#endregion
//#region node_modules/recharts/es6/hooks.js
/**
* Plot area is the area where the actual chart data is rendered.
* This means: bars, lines, scatter points, etc.
*
* The plot area is calculated based on the chart dimensions and the offset.
*
* Plot area `width` and `height` are the dimensions in pixels;
* `x` and `y` are the coordinates of the top-left corner of the plot area relative to the chart container.
*
* They are also independent of the scale and zoom, meaning that as the user zooms in and out,
* the plot area dimensions will not change as the chart gets visually larger or smaller.
*
* This hook must be used within a chart context (inside a `<LineChart>`, `<BarChart>`, etc.).
* This hook returns `undefined` if used outside a chart context.
*
* @returns Plot area of the chart in pixels, or undefined if used outside a chart context.
* @since 3.1
*/
var usePlotArea = () => {
	return useAppSelector(selectPlotArea);
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineBarSizeList.js
var getBarSize = (globalSize, totalSize, selfSize) => {
	var barSize = selfSize !== null && selfSize !== void 0 ? selfSize : globalSize;
	if (isNullish(barSize)) return;
	return getPercentValue(barSize, totalSize, 0);
};
var combineBarSizeList = (allBars, globalSize, totalSize) => {
	var initialValue = {};
	var stackedBars = allBars.filter(isStacked);
	var unstackedBars = allBars.filter((b) => b.stackId == null);
	var groupByStack = stackedBars.reduce((acc, bar) => {
		var s = acc[bar.stackId];
		if (s == null) s = [];
		s.push(bar);
		acc[bar.stackId] = s;
		return acc;
	}, initialValue);
	var stackedSizeList = Object.entries(groupByStack).map((_ref) => {
		var _bars$;
		var [stackId, bars] = _ref;
		return {
			stackId,
			dataKeys: bars.map((b) => b.dataKey),
			barSize: getBarSize(globalSize, totalSize, (_bars$ = bars[0]) === null || _bars$ === void 0 ? void 0 : _bars$.barSize)
		};
	});
	var unstackedSizeList = unstackedBars.map((b) => {
		return {
			stackId: void 0,
			dataKeys: [b.dataKey].filter((dk) => dk != null),
			barSize: getBarSize(globalSize, totalSize, b.barSize)
		};
	});
	return [...stackedSizeList, ...unstackedSizeList];
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineAllBarPositions.js
function ownKeys$8(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$8(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$8(Object(t), !0).forEach(function(r) {
			_defineProperty$8(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$8(e, r, t) {
	return (r = _toPropertyKey$8(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$8(t) {
	var i = _toPrimitive$8(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$8(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function getBarPositions(barGap, barCategoryGap, bandSize, sizeList, maxBarSize) {
	var _sizeList$;
	var len = sizeList.length;
	if (len < 1) return;
	var realBarGap = getPercentValue(barGap, bandSize, 0, true);
	var result;
	var initialValue = [];
	if (isWellBehavedNumber((_sizeList$ = sizeList[0]) === null || _sizeList$ === void 0 ? void 0 : _sizeList$.barSize)) {
		var useFull = false;
		var fullBarSize = bandSize / len;
		var sum = sizeList.reduce((res, entry) => res + (entry.barSize || 0), 0);
		sum += (len - 1) * realBarGap;
		if (sum >= bandSize) {
			sum -= (len - 1) * realBarGap;
			realBarGap = 0;
		}
		if (sum >= bandSize && fullBarSize > 0) {
			useFull = true;
			fullBarSize *= .9;
			sum = len * fullBarSize;
		}
		var prev = {
			offset: ((bandSize - sum) / 2 >> 0) - realBarGap,
			size: 0
		};
		result = sizeList.reduce((res, entry) => {
			var _entry$barSize;
			var newPosition = {
				stackId: entry.stackId,
				dataKeys: entry.dataKeys,
				position: {
					offset: prev.offset + prev.size + realBarGap,
					size: useFull ? fullBarSize : (_entry$barSize = entry.barSize) !== null && _entry$barSize !== void 0 ? _entry$barSize : 0
				}
			};
			var newRes = [...res, newPosition];
			prev = newPosition.position;
			return newRes;
		}, initialValue);
	} else {
		var _offset = getPercentValue(barCategoryGap, bandSize, 0, true);
		if (bandSize - 2 * _offset - (len - 1) * realBarGap <= 0) realBarGap = 0;
		var originalSize = (bandSize - 2 * _offset - (len - 1) * realBarGap) / len;
		if (originalSize > 1) originalSize >>= 0;
		var size = isWellBehavedNumber(maxBarSize) ? Math.min(originalSize, maxBarSize) : originalSize;
		result = sizeList.reduce((res, entry, i) => [...res, {
			stackId: entry.stackId,
			dataKeys: entry.dataKeys,
			position: {
				offset: _offset + (originalSize + realBarGap) * i + (originalSize - size) / 2,
				size
			}
		}], initialValue);
	}
	return result;
}
var combineAllBarPositions = (sizeList, globalMaxBarSize, barGap, barCategoryGap, barBandSize, bandSize, childMaxBarSize) => {
	var maxBarSize = isNullish(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
	var allBarPositions = getBarPositions(barGap, barCategoryGap, barBandSize !== bandSize ? barBandSize : bandSize, sizeList, maxBarSize);
	if (barBandSize !== bandSize && allBarPositions != null) allBarPositions = allBarPositions.map((pos) => _objectSpread$8(_objectSpread$8({}, pos), {}, { position: _objectSpread$8(_objectSpread$8({}, pos.position), {}, { offset: pos.position.offset - barBandSize / 2 }) }));
	return allBarPositions;
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineStackedData.js
var combineStackedData = (stackGroups, barSettings) => {
	var stackSeriesIdentifier = getStackSeriesIdentifier(barSettings);
	if (!stackGroups || stackSeriesIdentifier == null || barSettings == null) return;
	var { stackId } = barSettings;
	if (stackId == null) return;
	var stackGroup = stackGroups[stackId];
	if (!stackGroup) return;
	var { stackedData } = stackGroup;
	if (!stackedData) return;
	return stackedData.find((sd) => sd.key === stackSeriesIdentifier);
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/combiners/combineBarPosition.js
var combineBarPosition = (allBarPositions, barSettings) => {
	if (allBarPositions == null || barSettings == null) return;
	var position = allBarPositions.find((p) => p.stackId === barSettings.stackId && barSettings.dataKey != null && p.dataKeys.includes(barSettings.dataKey));
	if (position == null) return;
	return position.position;
};
//#endregion
//#region node_modules/recharts/es6/zIndex/getZIndexFromUnknown.js
function getZIndexFromUnknown(input, defaultZIndex) {
	if (input && typeof input === "object" && "zIndex" in input && typeof input.zIndex === "number" && isWellBehavedNumber(input.zIndex)) return input.zIndex;
	return defaultZIndex;
}
//#endregion
//#region node_modules/recharts/es6/context/chartDataContext.js
var ChartDataContextProvider = (props) => {
	var { chartData } = props;
	var dispatch = useAppDispatch();
	var isPanorama = useIsPanorama();
	useEffect(() => {
		if (isPanorama) return () => {};
		dispatch(setChartData(chartData));
		return () => {
			dispatch(setChartData(void 0));
		};
	}, [
		chartData,
		dispatch,
		isPanorama
	]);
	return null;
};
//#endregion
//#region node_modules/recharts/es6/state/brushSlice.js
/**
* From all Brush properties, only height has a default value and will always be defined.
* Other properties are nullable and will be computed from offsets and margins if they are not set.
*/
var initialState$3 = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	padding: {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
};
var brushSlice = createSlice({
	name: "brush",
	initialState: initialState$3,
	reducers: { setBrushSettings(_state, action) {
		if (action.payload == null) return initialState$3;
		return action.payload;
	} }
});
var { setBrushSettings } = brushSlice.actions;
var brushReducer = brushSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/util/CartesianUtils.js
/** Normalizes the angle so that 0 <= angle < 180.
* @param {number} angle Angle in degrees.
* @return {number} the normalized angle with a value of at least 0 and never greater or equal to 180. */
function normalizeAngle(angle) {
	return (angle % 180 + 180) % 180;
}
/** Calculates the width of the largest horizontal line that fits inside a rectangle that is displayed at an angle.
* @param {Object} size Width and height of the text in a horizontal position.
* @param {number} angle Angle in degrees in which the text is displayed.
* @return {number} The width of the largest horizontal line that fits inside a rectangle that is displayed at an angle.
*/
var getAngledRectangleWidth = function getAngledRectangleWidth(_ref4) {
	var { width, height } = _ref4;
	var angleRadians = normalizeAngle(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0) * Math.PI / 180;
	var angleThreshold = Math.atan(height / width);
	var angledWidth = angleRadians > angleThreshold && angleRadians < Math.PI - angleThreshold ? height / Math.sin(angleRadians) : width / Math.cos(angleRadians);
	return Math.abs(angledWidth);
};
var referenceElementsSlice = createSlice({
	name: "referenceElements",
	initialState: {
		dots: [],
		areas: [],
		lines: []
	},
	reducers: {
		addDot: (state, action) => {
			state.dots.push(action.payload);
		},
		removeDot: (state, action) => {
			var index = current(state).dots.findIndex((dot) => dot === action.payload);
			if (index !== -1) state.dots.splice(index, 1);
		},
		addArea: (state, action) => {
			state.areas.push(action.payload);
		},
		removeArea: (state, action) => {
			var index = current(state).areas.findIndex((area) => area === action.payload);
			if (index !== -1) state.areas.splice(index, 1);
		},
		addLine: (state, action) => {
			state.lines.push(castDraft(action.payload));
		},
		removeLine: (state, action) => {
			var index = current(state).lines.findIndex((line) => line === action.payload);
			if (index !== -1) state.lines.splice(index, 1);
		}
	}
});
var { addDot, removeDot, addArea, removeArea, addLine, removeLine } = referenceElementsSlice.actions;
var referenceElementsReducer = referenceElementsSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/container/ClipPathProvider.js
var ClipPathIdContext = /* @__PURE__ */ createContext(void 0);
/**
* Generates a unique clip path ID for use in SVG elements,
* and puts it in a context provider.
*
* To read the clip path ID, use the `useClipPathId` hook,
* or render `<ClipPath>` component which will automatically use the ID from this context.
*
* @param props children - React children to be wrapped by the provider
* @returns React Context Provider
*/
var ClipPathProvider = (_ref) => {
	var { children } = _ref;
	var [clipPathId] = useState("".concat(uniqueId("recharts"), "-clip"));
	var plotArea = usePlotArea();
	if (plotArea == null) return null;
	var { x, y, width, height } = plotArea;
	return /* @__PURE__ */ React.createElement(ClipPathIdContext.Provider, { value: clipPathId }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: clipPathId }, /* @__PURE__ */ React.createElement("rect", {
		x,
		y,
		height,
		width
	}))), children);
};
//#endregion
//#region node_modules/recharts/es6/util/getEveryNth.js
/**
* Given an array and a number N, return a new array which contains every nTh
* element of the input array. For n below 1, an empty array is returned.
* For n equal to 1, the input array is returned as is.
* For n greater than the length of the array, an array containing the first element
* and every nTh element after that (if any) is returned.
*
* @param array An input array.
* @param n A number specifying which elements to take.
* @returns The result array of the same type as the input array.
*/
function getEveryNth(array, n) {
	if (n < 1) return [];
	if (n === 1) return array;
	var result = [];
	for (var i = 0; i < array.length; i += n) {
		var item = array[i];
		if (item !== void 0) result.push(item);
	}
	return result;
}
//#endregion
//#region node_modules/recharts/es6/util/TickUtils.js
function getAngledTickWidth(contentSize, unitSize, angle) {
	return getAngledRectangleWidth({
		width: contentSize.width + unitSize.width,
		height: contentSize.height + unitSize.height
	}, angle);
}
function getTickBoundaries(viewBox, sign, sizeKey) {
	var isWidth = sizeKey === "width";
	var { x, y, width, height } = viewBox;
	if (sign === 1) return {
		start: isWidth ? x : y,
		end: isWidth ? x + width : y + height
	};
	return {
		start: isWidth ? x + width : y + height,
		end: isWidth ? x : y
	};
}
function isVisible(sign, tickPosition, getSize, start, end) {
	if (sign * tickPosition < sign * start || sign * tickPosition > sign * end) return false;
	var size = getSize();
	return sign * (tickPosition - sign * size / 2 - start) >= 0 && sign * (tickPosition + sign * size / 2 - end) <= 0;
}
function getNumberIntervalTicks(ticks, interval) {
	return getEveryNth(ticks, interval + 1);
}
//#endregion
//#region node_modules/recharts/es6/cartesian/getEquidistantTicks.js
function getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap) {
	var result = (ticks || []).slice();
	var { start: initialStart, end } = boundaries;
	var index = 0;
	var stepsize = 1;
	var start = initialStart;
	var _loop = function _loop() {
		var entry = ticks === null || ticks === void 0 ? void 0 : ticks[index];
		if (entry === void 0) return { v: getEveryNth(ticks, stepsize) };
		var i = index;
		var size;
		var getSize = () => {
			if (size === void 0) size = getTickSize(entry, i);
			return size;
		};
		var tickCoord = entry.coordinate;
		var isShow = index === 0 || isVisible(sign, tickCoord, getSize, start, end);
		if (!isShow) {
			index = 0;
			start = initialStart;
			stepsize += 1;
		}
		if (isShow) {
			start = tickCoord + sign * (getSize() / 2 + minTickGap);
			index += stepsize;
		}
	}, _ret;
	while (stepsize <= result.length) {
		_ret = _loop();
		if (_ret) return _ret.v;
	}
	return [];
}
function getEquidistantPreserveEndTicks(sign, boundaries, getTickSize, ticks, minTickGap) {
	var len = (ticks || []).slice().length;
	if (len === 0) return [];
	var { start: initialStart, end } = boundaries;
	for (var stepsize = 1; stepsize <= len; stepsize++) {
		var offset = (len - 1) % stepsize;
		var start = initialStart;
		var ok = true;
		var _loop2 = function _loop2() {
			var entry = ticks[index];
			if (entry == null) return 0;
			var i = index;
			var size;
			var getSize = () => {
				if (size === void 0) size = getTickSize(entry, i);
				return size;
			};
			var tickCoord = entry.coordinate;
			var isShow = index === offset || isVisible(sign, tickCoord, getSize, start, end);
			if (!isShow) {
				ok = false;
				return 1;
			}
			if (isShow) start = tickCoord + sign * (getSize() / 2 + minTickGap);
		}, _ret2;
		for (var index = offset; index < len; index += stepsize) {
			_ret2 = _loop2();
			if (_ret2 === 0) continue;
			if (_ret2 === 1) break;
		}
		if (ok) {
			var finalTicks = [];
			for (var _index = offset; _index < len; _index += stepsize) {
				var tick = ticks[_index];
				if (tick != null) finalTicks.push(tick);
			}
			return finalTicks;
		}
	}
	return [];
}
//#endregion
//#region node_modules/recharts/es6/cartesian/getTicks.js
function ownKeys$7(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$7(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$7(Object(t), !0).forEach(function(r) {
			_defineProperty$7(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$7(e, r, t) {
	return (r = _toPropertyKey$7(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$7(t) {
	var i = _toPrimitive$7(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$7(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap) {
	var result = (ticks || []).slice();
	var len = result.length;
	var { start } = boundaries;
	var { end } = boundaries;
	var _loop = function _loop(i) {
		var initialEntry = result[i];
		if (initialEntry == null) return 1;
		var entry = initialEntry;
		var size;
		var getSize = () => {
			if (size === void 0) size = getTickSize(initialEntry, i);
			return size;
		};
		if (i === len - 1) {
			var gap = sign * (entry.coordinate + sign * getSize() / 2 - end);
			result[i] = entry = _objectSpread$7(_objectSpread$7({}, entry), {}, { tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate });
		} else result[i] = entry = _objectSpread$7(_objectSpread$7({}, entry), {}, { tickCoord: entry.coordinate });
		if (entry.tickCoord != null) {
			if (isVisible(sign, entry.tickCoord, getSize, start, end)) {
				end = entry.tickCoord - sign * (getSize() / 2 + minTickGap);
				result[i] = _objectSpread$7(_objectSpread$7({}, entry), {}, { isShow: true });
			}
		}
	};
	for (var i = len - 1; i >= 0; i--) if (_loop(i)) continue;
	return result;
}
function getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, preserveEnd) {
	var result = (ticks || []).slice();
	var len = result.length;
	var { start, end } = boundaries;
	if (preserveEnd) {
		var tail = ticks[len - 1];
		if (tail != null) {
			var tailSize = getTickSize(tail, len - 1);
			var tailGap = sign * (tail.coordinate + sign * tailSize / 2 - end);
			result[len - 1] = tail = _objectSpread$7(_objectSpread$7({}, tail), {}, { tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate });
			if (tail.tickCoord != null) {
				if (isVisible(sign, tail.tickCoord, () => tailSize, start, end)) {
					end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
					result[len - 1] = _objectSpread$7(_objectSpread$7({}, tail), {}, { isShow: true });
				}
			}
		}
	}
	var count = preserveEnd ? len - 1 : len;
	var _loop2 = function _loop2(i) {
		var initialEntry = result[i];
		if (initialEntry == null) return 1;
		var entry = initialEntry;
		var size;
		var getSize = () => {
			if (size === void 0) size = getTickSize(initialEntry, i);
			return size;
		};
		if (i === 0) {
			var gap = sign * (entry.coordinate - sign * getSize() / 2 - start);
			result[i] = entry = _objectSpread$7(_objectSpread$7({}, entry), {}, { tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate });
		} else result[i] = entry = _objectSpread$7(_objectSpread$7({}, entry), {}, { tickCoord: entry.coordinate });
		if (entry.tickCoord != null) {
			if (isVisible(sign, entry.tickCoord, getSize, start, end)) {
				start = entry.tickCoord + sign * (getSize() / 2 + minTickGap);
				result[i] = _objectSpread$7(_objectSpread$7({}, entry), {}, { isShow: true });
			}
		}
	};
	for (var i = 0; i < count; i++) if (_loop2(i)) continue;
	return result;
}
function getTicks(props, fontSize, letterSpacing) {
	var { tick, ticks, viewBox, minTickGap, orientation, interval, tickFormatter, unit, angle } = props;
	if (!ticks || !ticks.length || !tick) return [];
	if (isNumber(interval) || Global.isSsr) {
		var _getNumberIntervalTic;
		return (_getNumberIntervalTic = getNumberIntervalTicks(ticks, isNumber(interval) ? interval : 0)) !== null && _getNumberIntervalTic !== void 0 ? _getNumberIntervalTic : [];
	}
	var candidates = [];
	var sizeKey = orientation === "top" || orientation === "bottom" ? "width" : "height";
	var unitSize = unit && sizeKey === "width" ? getStringSize(unit, {
		fontSize,
		letterSpacing
	}) : {
		width: 0,
		height: 0
	};
	var getTickSize = (content, index) => {
		var value = typeof tickFormatter === "function" ? tickFormatter(content.value, index) : content.value;
		return sizeKey === "width" ? getAngledTickWidth(getStringSize(value, {
			fontSize,
			letterSpacing
		}), unitSize, angle) : getStringSize(value, {
			fontSize,
			letterSpacing
		})[sizeKey];
	};
	var tick0 = ticks[0];
	var tick1 = ticks[1];
	var sign = ticks.length >= 2 && tick0 != null && tick1 != null ? mathSign(tick1.coordinate - tick0.coordinate) : 1;
	var boundaries = getTickBoundaries(viewBox, sign, sizeKey);
	if (interval === "equidistantPreserveStart") return getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap);
	if (interval === "equidistantPreserveEnd") return getEquidistantPreserveEndTicks(sign, boundaries, getTickSize, ticks, minTickGap);
	if (interval === "preserveStart" || interval === "preserveStartEnd") candidates = getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, interval === "preserveStartEnd");
	else candidates = getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap);
	return candidates.filter((entry) => entry.isShow);
}
//#endregion
//#region node_modules/recharts/es6/util/YAxisUtils.js
/**
* Calculates the width of the Y-axis based on the tick labels and the axis label.
* @param params - The parameters object.
* @param [params.ticks] - An array-like object of tick elements, each with a `getBoundingClientRect` method.
* @param [params.label] - The axis label element, with a `getBoundingClientRect` method.
* @param [params.labelGapWithTick=5] - The gap between the label and the tick.
* @param [params.tickSize=0] - The length of the tick line.
* @param [params.tickMargin=0] - The margin between the tick line and the tick text.
* @returns The calculated width of the Y-axis.
*/
var getCalculatedYAxisWidth = (_ref) => {
	var { ticks, label, labelGapWithTick = 5, tickSize = 0, tickMargin = 0 } = _ref;
	var maxTickWidth = 0;
	if (ticks) {
		Array.from(ticks).forEach((tickNode) => {
			if (tickNode) {
				var bbox = tickNode.getBoundingClientRect();
				if (bbox.width > maxTickWidth) maxTickWidth = bbox.width;
			}
		});
		var labelWidth = label ? label.getBoundingClientRect().width : 0;
		var tickWidth = tickSize + tickMargin;
		var updatedYAxisWidth = maxTickWidth + tickWidth + labelWidth + (label ? labelGapWithTick : 0);
		return Math.round(updatedYAxisWidth);
	}
	return 0;
};
var renderedTicksSlice = createSlice({
	name: "renderedTicks",
	initialState: {
		xAxis: {},
		yAxis: {}
	},
	reducers: {
		setRenderedTicks: (state, action) => {
			var { axisType, axisId, ticks } = action.payload;
			state[axisType][axisId] = castDraft(ticks);
		},
		removeRenderedTicks: (state, action) => {
			var { axisType, axisId } = action.payload;
			delete state[axisType][axisId];
		}
	}
});
var { setRenderedTicks, removeRenderedTicks } = renderedTicksSlice.actions;
var renderedTicksReducer = renderedTicksSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/cartesian/CartesianAxis.js
/**
* @fileOverview Cartesian Axis
*/
var _excluded$9 = [
	"axisLine",
	"width",
	"height",
	"className",
	"hide",
	"ticks",
	"axisType",
	"axisId"
];
function _objectWithoutProperties$9(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$9(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$9(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _extends$9() {
	return _extends$9 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$9.apply(null, arguments);
}
function ownKeys$6(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$6(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$6(Object(t), !0).forEach(function(r) {
			_defineProperty$6(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$6(e, r, t) {
	return (r = _toPropertyKey$6(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$6(t) {
	var i = _toPrimitive$6(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$6(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
/** The orientation of the axis in correspondence to the chart */
/** A unit to be appended to a value */
/** The formatter function of tick */
var defaultCartesianAxisProps = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	viewBox: {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	},
	orientation: "bottom",
	ticks: [],
	stroke: "#666",
	tickLine: true,
	axisLine: true,
	tick: true,
	mirror: false,
	minTickGap: 5,
	tickSize: 6,
	tickMargin: 2,
	interval: "preserveEnd",
	zIndex: DefaultZIndexes.axis
};
function AxisLine(axisLineProps) {
	var { x, y, width, height, orientation, mirror, axisLine, otherSvgProps } = axisLineProps;
	if (!axisLine) return null;
	var props = _objectSpread$6(_objectSpread$6(_objectSpread$6({}, otherSvgProps), svgPropertiesNoEvents(axisLine)), {}, { fill: "none" });
	if (orientation === "top" || orientation === "bottom") {
		var needHeight = +(orientation === "top" && !mirror || orientation === "bottom" && mirror);
		props = _objectSpread$6(_objectSpread$6({}, props), {}, {
			x1: x,
			y1: y + needHeight * height,
			x2: x + width,
			y2: y + needHeight * height
		});
	} else {
		var needWidth = +(orientation === "left" && !mirror || orientation === "right" && mirror);
		props = _objectSpread$6(_objectSpread$6({}, props), {}, {
			x1: x + needWidth * width,
			y1: y,
			x2: x + needWidth * width,
			y2: y + height
		});
	}
	return /* @__PURE__ */ React.createElement("line", _extends$9({}, props, { className: clsx("recharts-cartesian-axis-line", get(axisLine, "className")) }));
}
/**
* Calculate the coordinates of endpoints in ticks.
* @param data The data of a simple tick.
* @param x The x-coordinate of the axis.
* @param y The y-coordinate of the axis.
* @param width The width of the axis.
* @param height The height of the axis.
* @param orientation The orientation of the axis.
* @param tickSize The length of the tick line.
* @param mirror If true, the ticks are mirrored.
* @param tickMargin The margin between the tick line and the tick text.
* @returns An object with `line` and `tick` coordinates.
* `line` is the coordinates for the tick line, and `tick` is the coordinate for the tick text.
*/
function getTickLineCoord(data, x, y, width, height, orientation, tickSize, mirror, tickMargin) {
	var x1, x2, y1, y2, tx, ty;
	var sign = mirror ? -1 : 1;
	var finalTickSize = data.tickSize || tickSize;
	var tickCoord = isNumber(data.tickCoord) ? data.tickCoord : data.coordinate;
	switch (orientation) {
		case "top":
			x1 = x2 = data.coordinate;
			y2 = y + +!mirror * height;
			y1 = y2 - sign * finalTickSize;
			ty = y1 - sign * tickMargin;
			tx = tickCoord;
			break;
		case "left":
			y1 = y2 = data.coordinate;
			x2 = x + +!mirror * width;
			x1 = x2 - sign * finalTickSize;
			tx = x1 - sign * tickMargin;
			ty = tickCoord;
			break;
		case "right":
			y1 = y2 = data.coordinate;
			x2 = x + +mirror * width;
			x1 = x2 + sign * finalTickSize;
			tx = x1 + sign * tickMargin;
			ty = tickCoord;
			break;
		default:
			x1 = x2 = data.coordinate;
			y2 = y + +mirror * height;
			y1 = y2 + sign * finalTickSize;
			ty = y1 + sign * tickMargin;
			tx = tickCoord;
			break;
	}
	return {
		line: {
			x1,
			y1,
			x2,
			y2
		},
		tick: {
			x: tx,
			y: ty
		}
	};
}
/**
* @param orientation The orientation of the axis.
* @param mirror If true, the ticks are mirrored.
* @returns The text anchor of the tick.
*/
function getTickTextAnchor(orientation, mirror) {
	switch (orientation) {
		case "left": return mirror ? "start" : "end";
		case "right": return mirror ? "end" : "start";
		default: return "middle";
	}
}
/**
* @param orientation The orientation of the axis.
* @param mirror If true, the ticks are mirrored.
* @returns The vertical text anchor of the tick.
*/
function getTickVerticalAnchor(orientation, mirror) {
	switch (orientation) {
		case "left":
		case "right": return "middle";
		case "top": return mirror ? "start" : "end";
		default: return mirror ? "end" : "start";
	}
}
function TickItem(props) {
	var { option, tickProps, value } = props;
	var tickItem;
	var combinedClassName = clsx(tickProps.className, "recharts-cartesian-axis-tick-value");
	if (/* @__PURE__ */ React.isValidElement(option)) tickItem = /* @__PURE__ */ React.cloneElement(option, _objectSpread$6(_objectSpread$6({}, tickProps), {}, { className: combinedClassName }));
	else if (typeof option === "function") tickItem = option(_objectSpread$6(_objectSpread$6({}, tickProps), {}, { className: combinedClassName }));
	else {
		var className = "recharts-cartesian-axis-tick-value";
		if (typeof option !== "boolean") className = clsx(className, getClassNameFromUnknown(option));
		tickItem = /* @__PURE__ */ React.createElement(Text, _extends$9({}, tickProps, { className }), value);
	}
	return tickItem;
}
function RenderedTicksReporter(_ref) {
	var { ticks, axisType, axisId } = _ref;
	var dispatch = useAppDispatch();
	useEffect(() => {
		if (axisId == null || axisType == null) return noop$1;
		dispatch(setRenderedTicks({
			ticks: ticks.map((tick) => ({
				value: tick.value,
				coordinate: tick.coordinate,
				offset: tick.offset,
				index: tick.index
			})),
			axisId,
			axisType
		}));
		return () => {
			dispatch(removeRenderedTicks({
				axisId,
				axisType
			}));
		};
	}, [
		dispatch,
		ticks,
		axisId,
		axisType
	]);
	return null;
}
var Ticks = /* @__PURE__ */ forwardRef((props, ref) => {
	var { ticks = [], tick, tickLine, stroke, tickFormatter, unit, padding, tickTextProps, orientation, mirror, x, y, width, height, tickSize, tickMargin, fontSize, letterSpacing, getTicksConfig, events, axisType, axisId } = props;
	var finalTicks = getTicks(_objectSpread$6(_objectSpread$6({}, getTicksConfig), {}, { ticks }), fontSize, letterSpacing);
	var axisProps = svgPropertiesNoEvents(getTicksConfig);
	var customTickProps = svgPropertiesNoEventsFromUnknown(tick);
	var textAnchor = isValidTextAnchor(axisProps.textAnchor) ? axisProps.textAnchor : getTickTextAnchor(orientation, mirror);
	var verticalAnchor = getTickVerticalAnchor(orientation, mirror);
	var tickLinePropsObject = {};
	if (typeof tickLine === "object") tickLinePropsObject = tickLine;
	var tickLineProps = _objectSpread$6(_objectSpread$6({}, axisProps), {}, { fill: "none" }, tickLinePropsObject);
	var tickLineCoords = finalTicks.map((entry) => _objectSpread$6({ entry }, getTickLineCoord(entry, x, y, width, height, orientation, tickSize, mirror, tickMargin)));
	var tickLines = tickLineCoords.map((_ref2) => {
		var { entry, line: lineCoord } = _ref2;
		return /* @__PURE__ */ React.createElement(Layer, {
			className: "recharts-cartesian-axis-tick",
			key: "tick-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
		}, tickLine && /* @__PURE__ */ React.createElement("line", _extends$9({}, tickLineProps, lineCoord, { className: clsx("recharts-cartesian-axis-tick-line", get(tickLine, "className")) })));
	});
	var tickLabels = tickLineCoords.map((_ref3, i) => {
		var _ref4, _tickTextProps$angle;
		var { entry, tick: tickCoord } = _ref3;
		var finalTickProps = _objectSpread$6(_objectSpread$6({}, _objectSpread$6(_objectSpread$6(_objectSpread$6(_objectSpread$6({ verticalAnchor }, axisProps), {}, {
			textAnchor,
			stroke: "none",
			fill: stroke
		}, tickCoord), {}, {
			index: i,
			payload: entry,
			visibleTicksCount: finalTicks.length,
			tickFormatter,
			padding
		}, tickTextProps), {}, { angle: (_ref4 = (_tickTextProps$angle = tickTextProps === null || tickTextProps === void 0 ? void 0 : tickTextProps.angle) !== null && _tickTextProps$angle !== void 0 ? _tickTextProps$angle : axisProps.angle) !== null && _ref4 !== void 0 ? _ref4 : 0 })), customTickProps);
		return /* @__PURE__ */ React.createElement(Layer, _extends$9({
			className: "recharts-cartesian-axis-tick-label",
			key: "tick-label-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
		}, adaptEventsOfChild(events, entry, i)), tick && /* @__PURE__ */ React.createElement(TickItem, {
			option: tick,
			tickProps: finalTickProps,
			value: "".concat(typeof tickFormatter === "function" ? tickFormatter(entry.value, i) : entry.value).concat(unit || "")
		}));
	});
	return /* @__PURE__ */ React.createElement("g", { className: "recharts-cartesian-axis-ticks recharts-".concat(axisType, "-ticks") }, /* @__PURE__ */ React.createElement(RenderedTicksReporter, {
		ticks: finalTicks,
		axisId,
		axisType
	}), tickLabels.length > 0 && /* @__PURE__ */ React.createElement(ZIndexLayer, { zIndex: DefaultZIndexes.label }, /* @__PURE__ */ React.createElement("g", {
		className: "recharts-cartesian-axis-tick-labels recharts-".concat(axisType, "-tick-labels"),
		ref
	}, tickLabels)), tickLines.length > 0 && /* @__PURE__ */ React.createElement("g", { className: "recharts-cartesian-axis-tick-lines recharts-".concat(axisType, "-tick-lines") }, tickLines));
});
var CartesianAxisComponent = /* @__PURE__ */ forwardRef((props, ref) => {
	var { axisLine, width, height, className, hide, ticks, axisType, axisId } = props, rest = _objectWithoutProperties$9(props, _excluded$9);
	var [fontSize, setFontSize] = useState("");
	var [letterSpacing, setLetterSpacing] = useState("");
	var tickRefs = useRef(null);
	useImperativeHandle(ref, () => ({ getCalculatedWidth: () => {
		var _props$labelRef;
		return getCalculatedYAxisWidth({
			ticks: tickRefs.current,
			label: (_props$labelRef = props.labelRef) === null || _props$labelRef === void 0 ? void 0 : _props$labelRef.current,
			labelGapWithTick: 5,
			tickSize: props.tickSize,
			tickMargin: props.tickMargin
		});
	} }));
	var layerRef = useCallback((el) => {
		if (el) {
			var tickNodes = el.getElementsByClassName("recharts-cartesian-axis-tick-value");
			tickRefs.current = tickNodes;
			var tick = tickNodes[0];
			if (tick) {
				var computedStyle = window.getComputedStyle(tick);
				var calculatedFontSize = computedStyle.fontSize;
				var calculatedLetterSpacing = computedStyle.letterSpacing;
				if (calculatedFontSize !== fontSize || calculatedLetterSpacing !== letterSpacing) {
					setFontSize(calculatedFontSize);
					setLetterSpacing(calculatedLetterSpacing);
				}
			}
		}
	}, [fontSize, letterSpacing]);
	if (hide) return null;
	if (width != null && width <= 0 || height != null && height <= 0) return null;
	return /* @__PURE__ */ React.createElement(ZIndexLayer, { zIndex: props.zIndex }, /* @__PURE__ */ React.createElement(Layer, { className: clsx("recharts-cartesian-axis", className) }, /* @__PURE__ */ React.createElement(AxisLine, {
		x: props.x,
		y: props.y,
		width,
		height,
		orientation: props.orientation,
		mirror: props.mirror,
		axisLine,
		otherSvgProps: svgPropertiesNoEvents(props)
	}), /* @__PURE__ */ React.createElement(Ticks, {
		ref: layerRef,
		axisType,
		events: rest,
		fontSize,
		getTicksConfig: props,
		height: props.height,
		letterSpacing,
		mirror: props.mirror,
		orientation: props.orientation,
		padding: props.padding,
		stroke: props.stroke,
		tick: props.tick,
		tickFormatter: props.tickFormatter,
		tickLine: props.tickLine,
		tickMargin: props.tickMargin,
		tickSize: props.tickSize,
		tickTextProps: props.tickTextProps,
		ticks,
		unit: props.unit,
		width: props.width,
		x: props.x,
		y: props.y,
		axisId
	}), /* @__PURE__ */ React.createElement(CartesianLabelContextProvider, {
		x: props.x,
		y: props.y,
		width: props.width,
		height: props.height,
		lowerWidth: props.width,
		upperWidth: props.width
	}, /* @__PURE__ */ React.createElement(CartesianLabelFromLabelProp, {
		label: props.label,
		labelRef: props.labelRef
	}), props.children)));
});
/**
* @deprecated
*
* This component is not meant to be used directly in app code.
* Use XAxis or YAxis instead.
*
* Starting from Recharts v4.0 we will make this component internal only.
*/
var CartesianAxis = /* @__PURE__ */ React.forwardRef((outsideProps, ref) => {
	var props = resolveDefaultProps(outsideProps, defaultCartesianAxisProps);
	return /* @__PURE__ */ React.createElement(CartesianAxisComponent, _extends$9({}, props, { ref }));
});
CartesianAxis.displayName = "CartesianAxis";
//#endregion
//#region node_modules/recharts/es6/cartesian/CartesianGrid.js
var _excluded$8 = [
	"x1",
	"y1",
	"x2",
	"y2",
	"key"
], _excluded2$4 = ["offset"], _excluded3$3 = ["xAxisId", "yAxisId"], _excluded4$1 = ["xAxisId", "yAxisId"];
function ownKeys$5(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$5(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$5(Object(t), !0).forEach(function(r) {
			_defineProperty$5(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$5(e, r, t) {
	return (r = _toPropertyKey$5(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$5(t) {
	var i = _toPrimitive$5(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$5(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$8() {
	return _extends$8 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$8.apply(null, arguments);
}
function _objectWithoutProperties$8(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$8(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$8(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
/**
* The <CartesianGrid horizontal
*/
var Background = (props) => {
	var { fill } = props;
	if (!fill || fill === "none") return null;
	var { fillOpacity, x, y, width, height, ry } = props;
	return /* @__PURE__ */ React.createElement("rect", {
		x,
		y,
		ry,
		width,
		height,
		stroke: "none",
		fill,
		fillOpacity,
		className: "recharts-cartesian-grid-bg"
	});
};
function LineItem(_ref) {
	var { option, lineItemProps } = _ref;
	var lineItem;
	if (/* @__PURE__ */ React.isValidElement(option)) lineItem = /* @__PURE__ */ React.cloneElement(option, lineItemProps);
	else if (typeof option === "function") lineItem = option(lineItemProps);
	else {
		var _svgPropertiesNoEvent;
		var { x1, y1, x2, y2, key } = lineItemProps;
		var _ref2 = (_svgPropertiesNoEvent = svgPropertiesNoEvents(_objectWithoutProperties$8(lineItemProps, _excluded$8))) !== null && _svgPropertiesNoEvent !== void 0 ? _svgPropertiesNoEvent : {}, { offset: __ } = _ref2, restOfFilteredProps = _objectWithoutProperties$8(_ref2, _excluded2$4);
		lineItem = /* @__PURE__ */ React.createElement("line", _extends$8({}, restOfFilteredProps, {
			x1,
			y1,
			x2,
			y2,
			fill: "none",
			key
		}));
	}
	return lineItem;
}
function HorizontalGridLines(props) {
	var { x, width, horizontal = true, horizontalPoints } = props;
	if (!horizontal || !horizontalPoints || !horizontalPoints.length) return null;
	var { xAxisId, yAxisId } = props, otherLineItemProps = _objectWithoutProperties$8(props, _excluded3$3);
	var items = horizontalPoints.map((entry, i) => {
		var lineItemProps = _objectSpread$5(_objectSpread$5({}, otherLineItemProps), {}, {
			x1: x,
			y1: entry,
			x2: x + width,
			y2: entry,
			key: "line-".concat(i),
			index: i
		});
		return /* @__PURE__ */ React.createElement(LineItem, {
			key: "line-".concat(i),
			option: horizontal,
			lineItemProps
		});
	});
	return /* @__PURE__ */ React.createElement("g", { className: "recharts-cartesian-grid-horizontal" }, items);
}
function VerticalGridLines(props) {
	var { y, height, vertical = true, verticalPoints } = props;
	if (!vertical || !verticalPoints || !verticalPoints.length) return null;
	var { xAxisId, yAxisId } = props, otherLineItemProps = _objectWithoutProperties$8(props, _excluded4$1);
	var items = verticalPoints.map((entry, i) => {
		var lineItemProps = _objectSpread$5(_objectSpread$5({}, otherLineItemProps), {}, {
			x1: entry,
			y1: y,
			x2: entry,
			y2: y + height,
			key: "line-".concat(i),
			index: i
		});
		return /* @__PURE__ */ React.createElement(LineItem, {
			option: vertical,
			lineItemProps,
			key: "line-".concat(i)
		});
	});
	return /* @__PURE__ */ React.createElement("g", { className: "recharts-cartesian-grid-vertical" }, items);
}
function HorizontalStripes(props) {
	var { horizontalFill, fillOpacity, x, y, width, height, horizontalPoints, horizontal = true } = props;
	if (!horizontal || !horizontalFill || !horizontalFill.length || horizontalPoints == null) return null;
	var roundedSortedHorizontalPoints = horizontalPoints.map((e) => Math.round(e + y - y)).sort((a, b) => a - b);
	if (y !== roundedSortedHorizontalPoints[0]) roundedSortedHorizontalPoints.unshift(0);
	var items = roundedSortedHorizontalPoints.map((entry, i) => {
		var nextPoint = roundedSortedHorizontalPoints[i + 1];
		var lineHeight = nextPoint == null ? y + height - entry : nextPoint - entry;
		if (lineHeight <= 0) return null;
		var colorIndex = i % horizontalFill.length;
		return /* @__PURE__ */ React.createElement("rect", {
			key: "react-".concat(i),
			y: entry,
			x,
			height: lineHeight,
			width,
			stroke: "none",
			fill: horizontalFill[colorIndex],
			fillOpacity,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /* @__PURE__ */ React.createElement("g", { className: "recharts-cartesian-gridstripes-horizontal" }, items);
}
function VerticalStripes(props) {
	var { vertical = true, verticalFill, fillOpacity, x, y, width, height, verticalPoints } = props;
	if (!vertical || !verticalFill || !verticalFill.length) return null;
	var roundedSortedVerticalPoints = verticalPoints.map((e) => Math.round(e + x - x)).sort((a, b) => a - b);
	if (x !== roundedSortedVerticalPoints[0]) roundedSortedVerticalPoints.unshift(0);
	var items = roundedSortedVerticalPoints.map((entry, i) => {
		var nextPoint = roundedSortedVerticalPoints[i + 1];
		var lineWidth = nextPoint == null ? x + width - entry : nextPoint - entry;
		if (lineWidth <= 0) return null;
		var colorIndex = i % verticalFill.length;
		return /* @__PURE__ */ React.createElement("rect", {
			key: "react-".concat(i),
			x: entry,
			y,
			width: lineWidth,
			height,
			stroke: "none",
			fill: verticalFill[colorIndex],
			fillOpacity,
			className: "recharts-cartesian-grid-bg"
		});
	});
	return /* @__PURE__ */ React.createElement("g", { className: "recharts-cartesian-gridstripes-vertical" }, items);
}
var defaultVerticalCoordinatesGenerator = (_ref3, syncWithTicks) => {
	var { xAxis, width, height, offset } = _ref3;
	return getCoordinatesOfGrid(getTicks(_objectSpread$5(_objectSpread$5(_objectSpread$5({}, defaultCartesianAxisProps), xAxis), {}, {
		ticks: getTicksOfAxis(xAxis, true),
		viewBox: {
			x: 0,
			y: 0,
			width,
			height
		}
	})), offset.left, offset.left + offset.width, syncWithTicks);
};
var defaultHorizontalCoordinatesGenerator = (_ref4, syncWithTicks) => {
	var { yAxis, width, height, offset } = _ref4;
	return getCoordinatesOfGrid(getTicks(_objectSpread$5(_objectSpread$5(_objectSpread$5({}, defaultCartesianAxisProps), yAxis), {}, {
		ticks: getTicksOfAxis(yAxis, true),
		viewBox: {
			x: 0,
			y: 0,
			width,
			height
		}
	})), offset.top, offset.top + offset.height, syncWithTicks);
};
var defaultCartesianGridProps = {
	horizontal: true,
	vertical: true,
	horizontalPoints: [],
	verticalPoints: [],
	stroke: "#ccc",
	fill: "none",
	verticalFill: [],
	horizontalFill: [],
	xAxisId: 0,
	yAxisId: 0,
	syncWithTicks: false,
	zIndex: DefaultZIndexes.grid
};
/**
* Renders background grid with lines and fill colors in a Cartesian chart.
*
* @consumes CartesianChartContext
*/
function CartesianGrid(props) {
	var chartWidth = useChartWidth();
	var chartHeight = useChartHeight();
	var offset = useOffsetInternal();
	var propsIncludingDefaults = _objectSpread$5(_objectSpread$5({}, resolveDefaultProps(props, defaultCartesianGridProps)), {}, {
		x: isNumber(props.x) ? props.x : offset.left,
		y: isNumber(props.y) ? props.y : offset.top,
		width: isNumber(props.width) ? props.width : offset.width,
		height: isNumber(props.height) ? props.height : offset.height
	});
	var { xAxisId, yAxisId, x, y, width, height, syncWithTicks, horizontalValues, verticalValues } = propsIncludingDefaults;
	var isPanorama = useIsPanorama();
	var xAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "xAxis", xAxisId, isPanorama));
	var yAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "yAxis", yAxisId, isPanorama));
	if (!isPositiveNumber(width) || !isPositiveNumber(height) || !isNumber(x) || !isNumber(y)) return null;
	var verticalCoordinatesGenerator = propsIncludingDefaults.verticalCoordinatesGenerator || defaultVerticalCoordinatesGenerator;
	var horizontalCoordinatesGenerator = propsIncludingDefaults.horizontalCoordinatesGenerator || defaultHorizontalCoordinatesGenerator;
	var { horizontalPoints, verticalPoints } = propsIncludingDefaults;
	if ((!horizontalPoints || !horizontalPoints.length) && typeof horizontalCoordinatesGenerator === "function") {
		var isHorizontalValues = horizontalValues && horizontalValues.length;
		var generatorResult = horizontalCoordinatesGenerator({
			yAxis: yAxis ? _objectSpread$5(_objectSpread$5({}, yAxis), {}, { ticks: isHorizontalValues ? horizontalValues : yAxis.ticks }) : void 0,
			width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
			height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
			offset
		}, isHorizontalValues ? true : syncWithTicks);
		warn(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof generatorResult, "]"));
		if (Array.isArray(generatorResult)) horizontalPoints = generatorResult;
	}
	if ((!verticalPoints || !verticalPoints.length) && typeof verticalCoordinatesGenerator === "function") {
		var isVerticalValues = verticalValues && verticalValues.length;
		var _generatorResult = verticalCoordinatesGenerator({
			xAxis: xAxis ? _objectSpread$5(_objectSpread$5({}, xAxis), {}, { ticks: isVerticalValues ? verticalValues : xAxis.ticks }) : void 0,
			width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
			height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
			offset
		}, isVerticalValues ? true : syncWithTicks);
		warn(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof _generatorResult, "]"));
		if (Array.isArray(_generatorResult)) verticalPoints = _generatorResult;
	}
	return /* @__PURE__ */ React.createElement(ZIndexLayer, { zIndex: propsIncludingDefaults.zIndex }, /* @__PURE__ */ React.createElement("g", { className: "recharts-cartesian-grid" }, /* @__PURE__ */ React.createElement(Background, {
		fill: propsIncludingDefaults.fill,
		fillOpacity: propsIncludingDefaults.fillOpacity,
		x: propsIncludingDefaults.x,
		y: propsIncludingDefaults.y,
		width: propsIncludingDefaults.width,
		height: propsIncludingDefaults.height,
		ry: propsIncludingDefaults.ry
	}), /* @__PURE__ */ React.createElement(HorizontalStripes, _extends$8({}, propsIncludingDefaults, { horizontalPoints })), /* @__PURE__ */ React.createElement(VerticalStripes, _extends$8({}, propsIncludingDefaults, { verticalPoints })), /* @__PURE__ */ React.createElement(HorizontalGridLines, _extends$8({}, propsIncludingDefaults, {
		offset,
		horizontalPoints,
		xAxis,
		yAxis
	})), /* @__PURE__ */ React.createElement(VerticalGridLines, _extends$8({}, propsIncludingDefaults, {
		offset,
		verticalPoints,
		xAxis,
		yAxis
	}))));
}
CartesianGrid.displayName = "CartesianGrid";
//#endregion
//#region node_modules/recharts/es6/state/errorBarSlice.js
var errorBarSlice = createSlice({
	name: "errorBars",
	initialState: {},
	reducers: {
		addErrorBar: (state, action) => {
			var { itemId, errorBar } = action.payload;
			if (!state[itemId]) state[itemId] = [];
			state[itemId].push(errorBar);
		},
		replaceErrorBar: (state, action) => {
			var { itemId, prev, next } = action.payload;
			if (state[itemId]) state[itemId] = state[itemId].map((e) => e.dataKey === prev.dataKey && e.direction === prev.direction ? next : e);
		},
		removeErrorBar: (state, action) => {
			var { itemId, errorBar } = action.payload;
			if (state[itemId]) state[itemId] = state[itemId].filter((e) => e.dataKey !== errorBar.dataKey || e.direction !== errorBar.direction);
		}
	}
});
var { addErrorBar, replaceErrorBar, removeErrorBar } = errorBarSlice.actions;
var errorBarReducer = errorBarSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/context/ErrorBarContext.js
var _excluded$7 = ["children"];
function _objectWithoutProperties$7(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$7(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$7(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var ErrorBarContext = /* @__PURE__ */ createContext({
	data: [],
	xAxisId: "xAxis-0",
	yAxisId: "yAxis-0",
	dataPointFormatter: () => ({
		x: 0,
		y: 0,
		value: 0
	}),
	errorBarOffset: 0
});
function SetErrorBarContext(props) {
	var { children } = props, rest = _objectWithoutProperties$7(props, _excluded$7);
	return /* @__PURE__ */ React.createElement(ErrorBarContext.Provider, { value: rest }, children);
}
//#endregion
//#region node_modules/recharts/es6/cartesian/GraphicalItemClipPath.js
function useNeedsClip(xAxisId, yAxisId) {
	var _xAxis$allowDataOverf, _yAxis$allowDataOverf;
	var xAxis = useAppSelector((state) => selectXAxisSettings(state, xAxisId));
	var yAxis = useAppSelector((state) => selectYAxisSettings(state, yAxisId));
	var needClipX = (_xAxis$allowDataOverf = xAxis === null || xAxis === void 0 ? void 0 : xAxis.allowDataOverflow) !== null && _xAxis$allowDataOverf !== void 0 ? _xAxis$allowDataOverf : implicitXAxis.allowDataOverflow;
	var needClipY = (_yAxis$allowDataOverf = yAxis === null || yAxis === void 0 ? void 0 : yAxis.allowDataOverflow) !== null && _yAxis$allowDataOverf !== void 0 ? _yAxis$allowDataOverf : implicitYAxis.allowDataOverflow;
	return {
		needClip: needClipX || needClipY,
		needClipX,
		needClipY
	};
}
function GraphicalItemClipPath(_ref) {
	var { xAxisId, yAxisId, clipPathId } = _ref;
	var plotArea = usePlotArea();
	var { needClipX, needClipY, needClip } = useNeedsClip(xAxisId, yAxisId);
	if (!needClip || !plotArea) return null;
	var { x, y, width, height } = plotArea;
	return /* @__PURE__ */ React.createElement("clipPath", { id: "clipPath-".concat(clipPathId) }, /* @__PURE__ */ React.createElement("rect", {
		x: needClipX ? x : x - width / 2,
		y: needClipY ? y : y - height / 2,
		width: needClipX ? width : width * 2,
		height: needClipY ? height : height * 2
	}));
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/graphicalItemSelectors.js
function selectXAxisIdFromGraphicalItemId(state, id) {
	var _state$graphicalItems, _state$graphicalItems2;
	return (_state$graphicalItems = (_state$graphicalItems2 = state.graphicalItems.cartesianItems.find((item) => item.id === id)) === null || _state$graphicalItems2 === void 0 ? void 0 : _state$graphicalItems2.xAxisId) !== null && _state$graphicalItems !== void 0 ? _state$graphicalItems : 0;
}
function selectYAxisIdFromGraphicalItemId(state, id) {
	var _state$graphicalItems3, _state$graphicalItems4;
	return (_state$graphicalItems3 = (_state$graphicalItems4 = state.graphicalItems.cartesianItems.find((item) => item.id === id)) === null || _state$graphicalItems4 === void 0 ? void 0 : _state$graphicalItems4.yAxisId) !== null && _state$graphicalItems3 !== void 0 ? _state$graphicalItems3 : 0;
}
//#endregion
//#region node_modules/recharts/es6/util/BarUtils.js
function _extends$7() {
	return _extends$7 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$7.apply(null, arguments);
}
function BarRectangle(props) {
	return /* @__PURE__ */ React.createElement(Shape, _extends$7({
		shapeType: "rectangle",
		activeClassName: "recharts-active-bar",
		inActiveClassName: "recharts-inactive-bar"
	}, props));
}
/**
* Safely gets minPointSize from the minPointSize prop if it is a function
* @param minPointSize minPointSize as passed to the Bar component
* @param defaultValue default minPointSize
* @returns minPointSize
*/
var minPointSizeCallback = function minPointSizeCallback(minPointSize) {
	var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
	return (value, index) => {
		if (isNumber(minPointSize)) return minPointSize;
		var isValueNumberOrNil = isNumber(value) || isNullish(value);
		if (isValueNumberOrNil) return minPointSize(value, index);
		!isValueNumberOrNil && invariant(false, "minPointSize callback function received a value with type of ".concat(typeof value, ". Currently only numbers or null/undefined are supported."));
		return defaultValue;
	};
};
//#endregion
//#region node_modules/recharts/es6/state/selectors/barSelectors.js
var pickIsPanorama = (_state, _id, isPanorama) => isPanorama;
var pickBarId = (_state, id) => id;
var selectSynchronisedBarSettings = createSelector([selectUnfilteredCartesianItems, pickBarId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "bar").find((item) => item.id === id));
var selectMaxBarSize = createSelector([selectSynchronisedBarSettings], (barSettings) => barSettings === null || barSettings === void 0 ? void 0 : barSettings.maxBarSize);
var pickCells = (_state, _id, _isPanorama, cells) => cells;
var selectAllVisibleBars = createSelector([
	selectChartLayout,
	selectUnfilteredCartesianItems,
	selectXAxisIdFromGraphicalItemId,
	selectYAxisIdFromGraphicalItemId,
	pickIsPanorama
], (layout, allItems, xAxisId, yAxisId, isPanorama) => allItems.filter((i) => {
	if (layout === "horizontal") return i.xAxisId === xAxisId;
	return i.yAxisId === yAxisId;
}).filter((i) => i.isPanorama === isPanorama).filter((i) => i.hide === false).filter((i) => i.type === "bar"));
var selectBarStackGroups = (state, id, isPanorama) => {
	var layout = selectChartLayout(state);
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null || yAxisId == null) return;
	if (layout === "horizontal") return selectStackGroups(state, "yAxis", yAxisId, isPanorama);
	return selectStackGroups(state, "xAxis", xAxisId, isPanorama);
};
var selectBarCartesianAxisSize = (state, id) => {
	var layout = selectChartLayout(state);
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null || yAxisId == null) return;
	if (layout === "horizontal") return selectCartesianAxisSize(state, "xAxis", xAxisId);
	return selectCartesianAxisSize(state, "yAxis", yAxisId);
};
var selectBarSizeList = createSelector([
	selectAllVisibleBars,
	selectRootBarSize,
	selectBarCartesianAxisSize
], combineBarSizeList);
var selectBarBandSize = (state, id, isPanorama) => {
	var _ref, _getBandSizeOfAxis;
	var barSettings = selectSynchronisedBarSettings(state, id);
	if (barSettings == null) return 0;
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null || yAxisId == null) return 0;
	var layout = selectChartLayout(state);
	var globalMaxBarSize = selectRootMaxBarSize(state);
	var { maxBarSize: childMaxBarSize } = barSettings;
	var maxBarSize = isNullish(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
	var axis, ticks;
	if (layout === "horizontal") {
		axis = selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
		ticks = selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
	} else {
		axis = selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
		ticks = selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
	}
	return (_ref = (_getBandSizeOfAxis = getBandSizeOfAxis(axis, ticks, true)) !== null && _getBandSizeOfAxis !== void 0 ? _getBandSizeOfAxis : maxBarSize) !== null && _ref !== void 0 ? _ref : 0;
};
var selectAxisBandSize = (state, id, isPanorama) => {
	var layout = selectChartLayout(state);
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null || yAxisId == null) return;
	var axis, ticks;
	if (layout === "horizontal") {
		axis = selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
		ticks = selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
	} else {
		axis = selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
		ticks = selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
	}
	return getBandSizeOfAxis(axis, ticks);
};
var selectAllBarPositions = createSelector([
	selectBarSizeList,
	selectRootMaxBarSize,
	selectBarGap,
	selectBarCategoryGap,
	selectBarBandSize,
	selectAxisBandSize,
	selectMaxBarSize
], combineAllBarPositions);
var selectXAxisWithScale = (state, id, isPanorama) => {
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null) return;
	return selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
};
var selectYAxisWithScale = (state, id, isPanorama) => {
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (yAxisId == null) return;
	return selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
};
var selectXAxisTicks = (state, id, isPanorama) => {
	var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
	if (xAxisId == null) return;
	return selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
};
var selectYAxisTicks = (state, id, isPanorama) => {
	var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
	if (yAxisId == null) return;
	return selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
};
var selectBarRectangles = createSelector([
	selectChartOffsetInternal,
	selectAxisViewBox,
	selectXAxisWithScale,
	selectYAxisWithScale,
	selectXAxisTicks,
	selectYAxisTicks,
	createSelector([selectAllBarPositions, selectSynchronisedBarSettings], combineBarPosition),
	selectChartLayout,
	selectChartDataWithIndexesIfNotInPanoramaPosition3,
	selectAxisBandSize,
	createSelector([selectBarStackGroups, selectSynchronisedBarSettings], combineStackedData),
	selectSynchronisedBarSettings,
	pickCells
], (offset, axisViewBox, xAxis, yAxis, xAxisTicks, yAxisTicks, pos, layout, _ref2, bandSize, stackedData, barSettings, cells) => {
	var { chartData, dataStartIndex, dataEndIndex } = _ref2;
	if (barSettings == null || pos == null || axisViewBox == null || layout !== "horizontal" && layout !== "vertical" || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || bandSize == null) return;
	var { data } = barSettings;
	var displayedData;
	if (data != null && data.length > 0) displayedData = data;
	else displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
	if (displayedData == null) return;
	return computeBarRectangles({
		layout,
		barSettings,
		pos,
		parentViewBox: axisViewBox,
		bandSize,
		xAxis,
		yAxis,
		xAxisTicks,
		yAxisTicks,
		stackedData,
		displayedData,
		offset,
		cells,
		dataStartIndex
	});
});
//#endregion
//#region node_modules/recharts/es6/cartesian/BarStack.js
var _excluded$6 = ["index"];
function _extends$6() {
	return _extends$6 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$6.apply(null, arguments);
}
function _objectWithoutProperties$6(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$6(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$6(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var BarStackContext = /* @__PURE__ */ createContext(void 0);
/**
* Hook to resolve the stack ID for a Bar component.
* If a stack ID is provided via props, it is used directly.
* Otherwise, this will read stack ID from BarStack context if available.
* If both are undefined, it returns undefined.
* @param childStackId
*/
var useStackId = (childStackId) => {
	var stackSettings = useContext(BarStackContext);
	if (stackSettings != null) return stackSettings.stackId;
	if (childStackId == null) return;
	return getNormalizedStackId(childStackId);
};
var getClipPathId = (stackId, index) => {
	return "recharts-bar-stack-clip-path-".concat(stackId, "-").concat(index);
};
var useBarStackClipPathUrl = (index) => {
	var barStackContext = useContext(BarStackContext);
	if (barStackContext == null) return;
	var { stackId } = barStackContext;
	return "url(#".concat(getClipPathId(stackId, index), ")");
};
var BarStackClipLayer = (_ref) => {
	var { index } = _ref, rest = _objectWithoutProperties$6(_ref, _excluded$6);
	var clipPathUrl = useBarStackClipPathUrl(index);
	return /* @__PURE__ */ React.createElement(Layer, _extends$6({
		className: "recharts-bar-stack-layer",
		clipPath: clipPathUrl
	}, rest));
};
//#endregion
//#region node_modules/recharts/es6/cartesian/Bar.js
var _excluded$5 = [
	"onMouseEnter",
	"onMouseLeave",
	"onClick"
], _excluded2$3 = [
	"value",
	"background",
	"tooltipPosition"
], _excluded3$2 = ["id"], _excluded4 = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
];
function _extends$5() {
	return _extends$5 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$5.apply(null, arguments);
}
function ownKeys$4(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$4(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$4(Object(t), !0).forEach(function(r) {
			_defineProperty$4(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$4(e, r, t) {
	return (r = _toPropertyKey$4(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$4(t) {
	var i = _toPrimitive$4(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$4(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$5(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$5(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$5(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var computeLegendPayloadFromBarData = (props) => {
	var { dataKey, name, fill, legendType, hide } = props;
	return [{
		inactive: hide,
		dataKey,
		type: legendType,
		color: fill,
		value: getTooltipNameProp(name, dataKey),
		payload: props
	}];
};
var SetBarTooltipEntrySettings = /* @__PURE__ */ React.memo((_ref) => {
	var { dataKey, stroke, strokeWidth, fill, name, hide, unit, tooltipType, id } = _ref;
	var tooltipEntrySettings = {
		dataDefinedOnItem: void 0,
		getPosition: noop$1,
		settings: {
			stroke,
			strokeWidth,
			fill,
			dataKey,
			nameKey: void 0,
			name: getTooltipNameProp(name, dataKey),
			hide,
			type: tooltipType,
			color: fill,
			unit,
			graphicalItemId: id
		}
	};
	return /* @__PURE__ */ React.createElement(SetTooltipEntrySettings, { tooltipEntrySettings });
});
function BarBackground(props) {
	var activeIndex = useAppSelector(selectActiveTooltipIndex);
	var { data, dataKey, background: backgroundFromProps, allOtherBarProps } = props;
	var { onMouseEnter: onMouseEnterFromProps, onMouseLeave: onMouseLeaveFromProps, onClick: onItemClickFromProps } = allOtherBarProps, restOfAllOtherProps = _objectWithoutProperties$5(allOtherBarProps, _excluded$5);
	var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, dataKey, allOtherBarProps.id);
	var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
	var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, dataKey, allOtherBarProps.id);
	if (!backgroundFromProps || data == null) return null;
	var backgroundProps = svgPropertiesNoEventsFromUnknown(backgroundFromProps);
	return /* @__PURE__ */ React.createElement(ZIndexLayer, { zIndex: getZIndexFromUnknown(backgroundFromProps, DefaultZIndexes.barBackground) }, data.map((entry, i) => {
		var { value, background: backgroundFromDataEntry, tooltipPosition } = entry, rest = _objectWithoutProperties$5(entry, _excluded2$3);
		if (!backgroundFromDataEntry) return null;
		var onMouseEnter = onMouseEnterFromContext(entry, i);
		var onMouseLeave = onMouseLeaveFromContext(entry, i);
		var onClick = onClickFromContext(entry, i);
		var barRectangleProps = _objectSpread$4(_objectSpread$4(_objectSpread$4(_objectSpread$4(_objectSpread$4({
			option: backgroundFromProps,
			isActive: String(i) === activeIndex
		}, rest), {}, { fill: "#eee" }, backgroundFromDataEntry), backgroundProps), adaptEventsOfChild(restOfAllOtherProps, entry, i)), {}, {
			onMouseEnter,
			onMouseLeave,
			onClick,
			dataKey,
			index: i,
			className: "recharts-bar-background-rectangle"
		});
		return /* @__PURE__ */ React.createElement(BarRectangle, _extends$5({ key: "background-bar-".concat(i) }, barRectangleProps));
	}));
}
function BarLabelListProvider(_ref2) {
	var { showLabels, children, rects } = _ref2;
	var labelListEntries = rects === null || rects === void 0 ? void 0 : rects.map((entry) => {
		var viewBox = {
			x: entry.x,
			y: entry.y,
			width: entry.width,
			lowerWidth: entry.width,
			upperWidth: entry.width,
			height: entry.height
		};
		return _objectSpread$4(_objectSpread$4({}, viewBox), {}, {
			value: entry.value,
			payload: entry.payload,
			parentViewBox: entry.parentViewBox,
			viewBox,
			fill: entry.fill
		});
	});
	return /* @__PURE__ */ React.createElement(CartesianLabelListContextProvider, { value: showLabels ? labelListEntries : void 0 }, children);
}
function BarRectangleWithActiveState(props) {
	var { shape, activeBar, baseProps, entry, index, dataKey } = props;
	var activeIndex = useAppSelector(selectActiveTooltipIndex);
	var activeDataKey = useAppSelector(selectActiveTooltipDataKey);
	var isActive = activeBar && String(entry.originalDataIndex) === activeIndex && (activeDataKey == null || dataKey === activeDataKey);
	var [stayInLayer, setStayInLayer] = useState(false);
	var [hasMountedActive, setHasMountedActive] = useState(false);
	useEffect(() => {
		var rafId;
		if (isActive) {
			setStayInLayer(true);
			rafId = requestAnimationFrame(() => {
				setHasMountedActive(true);
			});
		} else setHasMountedActive(false);
		return () => {
			cancelAnimationFrame(rafId);
		};
	}, [isActive]);
	var handleTransitionEnd = useCallback(() => {
		if (!isActive) setStayInLayer(false);
	}, [isActive]);
	var isVisuallyActive = isActive && hasMountedActive;
	var shouldRenderInLayer = isActive || stayInLayer;
	var option;
	if (isActive) if (activeBar === true) option = shape;
	else option = activeBar;
	else option = shape;
	var content = /* @__PURE__ */ React.createElement(BarRectangle, _extends$5({}, baseProps, { name: String(baseProps.name) }, entry, {
		isActive: isVisuallyActive,
		option,
		index,
		dataKey,
		onTransitionEnd: handleTransitionEnd
	}));
	if (shouldRenderInLayer) return /* @__PURE__ */ React.createElement(ZIndexLayer, { zIndex: DefaultZIndexes.activeBar }, /* @__PURE__ */ React.createElement(BarStackClipLayer, { index: entry.originalDataIndex }, content));
	return content;
}
function BarRectangleNeverActive(props) {
	var { shape, baseProps, entry, index, dataKey } = props;
	return /* @__PURE__ */ React.createElement(BarRectangle, _extends$5({}, baseProps, { name: String(baseProps.name) }, entry, {
		isActive: false,
		option: shape,
		index,
		dataKey
	}));
}
function BarRectangles(_ref3) {
	var _svgPropertiesNoEvent;
	var { data, props } = _ref3;
	var _ref4 = (_svgPropertiesNoEvent = svgPropertiesNoEvents(props)) !== null && _svgPropertiesNoEvent !== void 0 ? _svgPropertiesNoEvent : {}, { id } = _ref4, baseProps = _objectWithoutProperties$5(_ref4, _excluded3$2);
	var { shape, dataKey, activeBar } = props;
	var { onMouseEnter: onMouseEnterFromProps, onClick: onItemClickFromProps, onMouseLeave: onMouseLeaveFromProps } = props, restOfAllOtherProps = _objectWithoutProperties$5(props, _excluded4);
	var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, dataKey, id);
	var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
	var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, dataKey, id);
	if (!data) return null;
	return /* @__PURE__ */ React.createElement(React.Fragment, null, data.map((entry, i) => {
		return /* @__PURE__ */ React.createElement(BarStackClipLayer, _extends$5({
			index: entry.originalDataIndex,
			key: "rectangle-".concat(entry === null || entry === void 0 ? void 0 : entry.x, "-").concat(entry === null || entry === void 0 ? void 0 : entry.y, "-").concat(entry === null || entry === void 0 ? void 0 : entry.value, "-").concat(i),
			className: "recharts-bar-rectangle"
		}, adaptEventsOfChild(restOfAllOtherProps, entry, i), {
			onMouseEnter: onMouseEnterFromContext(entry, i),
			onMouseLeave: onMouseLeaveFromContext(entry, i),
			onClick: onClickFromContext(entry, i)
		}), activeBar ? /* @__PURE__ */ React.createElement(BarRectangleWithActiveState, {
			shape,
			activeBar,
			baseProps,
			entry,
			index: i,
			dataKey
		}) : /* @__PURE__ */ React.createElement(BarRectangleNeverActive, {
			shape,
			baseProps,
			entry,
			index: i,
			dataKey
		}));
	}));
}
function RectanglesWithAnimation(_ref5) {
	var { props, previousRectanglesRef } = _ref5;
	var { data, layout, isAnimationActive, animationBegin, animationDuration, animationEasing, onAnimationEnd, onAnimationStart } = props;
	var prevData = previousRectanglesRef.current;
	var animationId = useAnimationId(props, "recharts-bar-");
	var [isAnimating, setIsAnimating] = useState(false);
	var showLabels = !isAnimating;
	var handleAnimationEnd = useCallback(() => {
		if (typeof onAnimationEnd === "function") onAnimationEnd();
		setIsAnimating(false);
	}, [onAnimationEnd]);
	var handleAnimationStart = useCallback(() => {
		if (typeof onAnimationStart === "function") onAnimationStart();
		setIsAnimating(true);
	}, [onAnimationStart]);
	return /* @__PURE__ */ React.createElement(BarLabelListProvider, {
		showLabels,
		rects: data
	}, /* @__PURE__ */ React.createElement(JavascriptAnimate, {
		animationId,
		begin: animationBegin,
		duration: animationDuration,
		isActive: isAnimationActive,
		easing: animationEasing,
		onAnimationEnd: handleAnimationEnd,
		onAnimationStart: handleAnimationStart,
		key: animationId
	}, (t) => {
		var stepData = t === 1 ? data : data === null || data === void 0 ? void 0 : data.map((entry, index) => {
			var prev = prevData && prevData[index];
			if (prev) return _objectSpread$4(_objectSpread$4({}, entry), {}, {
				x: interpolate(prev.x, entry.x, t),
				y: interpolate(prev.y, entry.y, t),
				width: interpolate(prev.width, entry.width, t),
				height: interpolate(prev.height, entry.height, t)
			});
			if (layout === "horizontal") {
				var height = interpolate(0, entry.height, t);
				var y = interpolate(entry.stackedBarStart, entry.y, t);
				return _objectSpread$4(_objectSpread$4({}, entry), {}, {
					y,
					height
				});
			}
			var w = interpolate(0, entry.width, t);
			var x = interpolate(entry.stackedBarStart, entry.x, t);
			return _objectSpread$4(_objectSpread$4({}, entry), {}, {
				width: w,
				x
			});
		});
		if (t > 0) previousRectanglesRef.current = stepData !== null && stepData !== void 0 ? stepData : null;
		if (stepData == null) return null;
		return /* @__PURE__ */ React.createElement(Layer, null, /* @__PURE__ */ React.createElement(BarRectangles, {
			props,
			data: stepData
		}));
	}), /* @__PURE__ */ React.createElement(LabelListFromLabelProp, { label: props.label }), props.children);
}
function RenderRectangles(props) {
	var previousRectanglesRef = useRef(null);
	return /* @__PURE__ */ React.createElement(RectanglesWithAnimation, {
		previousRectanglesRef,
		props
	});
}
var defaultMinPointSize = 0;
var errorBarDataPointFormatter = (dataPoint, dataKey) => {
	/**
	* if the value coming from `selectBarRectangles` is an array then this is a stacked bar chart.
	* arr[1] represents end value of the bar since the data is in the form of [startValue, endValue].
	* */
	var value = Array.isArray(dataPoint.value) ? dataPoint.value[1] : dataPoint.value;
	return {
		x: dataPoint.x,
		y: dataPoint.y,
		value,
		errorVal: getValueByDataKey(dataPoint, dataKey)
	};
};
var BarWithState = class extends PureComponent {
	render() {
		var { hide, data, dataKey, className, xAxisId, yAxisId, needClip, background, id } = this.props;
		if (hide || data == null) return null;
		var layerClass = clsx("recharts-bar", className);
		var clipPathId = id;
		return /* @__PURE__ */ React.createElement(Layer, {
			className: layerClass,
			id
		}, needClip && /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement(GraphicalItemClipPath, {
			clipPathId,
			xAxisId,
			yAxisId
		})), /* @__PURE__ */ React.createElement(Layer, {
			className: "recharts-bar-rectangles",
			clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0
		}, /* @__PURE__ */ React.createElement(BarBackground, {
			data,
			dataKey,
			background,
			allOtherBarProps: this.props
		}), /* @__PURE__ */ React.createElement(RenderRectangles, this.props)));
	}
};
var defaultBarProps = {
	activeBar: false,
	animationBegin: 0,
	animationDuration: 400,
	animationEasing: "ease",
	background: false,
	hide: false,
	isAnimationActive: "auto",
	label: false,
	legendType: "rect",
	minPointSize: defaultMinPointSize,
	xAxisId: 0,
	yAxisId: 0,
	zIndex: DefaultZIndexes.bar
};
function BarImpl(props) {
	var { xAxisId, yAxisId, hide, legendType, minPointSize, activeBar, animationBegin, animationDuration, animationEasing, isAnimationActive } = props;
	var { needClip } = useNeedsClip(xAxisId, yAxisId);
	var layout = useChartLayout();
	var isPanorama = useIsPanorama();
	var cells = findAllByType(props.children, Cell);
	var rects = useAppSelector((state) => selectBarRectangles(state, props.id, isPanorama, cells));
	if (layout !== "vertical" && layout !== "horizontal") return null;
	var errorBarOffset;
	var firstDataPoint = rects === null || rects === void 0 ? void 0 : rects[0];
	if (firstDataPoint == null || firstDataPoint.height == null || firstDataPoint.width == null) errorBarOffset = 0;
	else errorBarOffset = layout === "vertical" ? firstDataPoint.height / 2 : firstDataPoint.width / 2;
	return /* @__PURE__ */ React.createElement(SetErrorBarContext, {
		xAxisId,
		yAxisId,
		data: rects,
		dataPointFormatter: errorBarDataPointFormatter,
		errorBarOffset
	}, /* @__PURE__ */ React.createElement(BarWithState, _extends$5({}, props, {
		layout,
		needClip,
		data: rects,
		xAxisId,
		yAxisId,
		hide,
		legendType,
		minPointSize,
		activeBar,
		animationBegin,
		animationDuration,
		animationEasing,
		isAnimationActive
	})));
}
function computeBarRectangles(_ref6) {
	var { layout, barSettings: { dataKey, minPointSize: minPointSizeProp, hasCustomShape }, pos, bandSize, xAxis, yAxis, xAxisTicks, yAxisTicks, stackedData, displayedData, offset, cells, parentViewBox, dataStartIndex } = _ref6;
	var numericAxis = layout === "horizontal" ? yAxis : xAxis;
	var stackedDomain = stackedData ? numericAxis.scale.domain() : null;
	var baseValue = getBaseValueOfBar({ numericAxis });
	var stackedBarStart = numericAxis.scale.map(baseValue);
	return displayedData.map((entry, index) => {
		var value, x, y, width, height, background;
		if (stackedData) {
			var untruncatedValue = stackedData[index + dataStartIndex];
			if (untruncatedValue == null) return null;
			value = truncateByDomain(untruncatedValue, stackedDomain);
		} else {
			value = getValueByDataKey(entry, dataKey);
			if (!Array.isArray(value)) value = [baseValue, value];
		}
		var minPointSize = minPointSizeCallback(minPointSizeProp, defaultMinPointSize)(value[1], index);
		if (layout === "horizontal") {
			var _ref7;
			var baseValueScale = yAxis.scale.map(value[0]);
			var currentValueScale = yAxis.scale.map(value[1]);
			if (baseValueScale == null || currentValueScale == null) return null;
			x = getCateCoordinateOfBar({
				axis: xAxis,
				ticks: xAxisTicks,
				bandSize,
				offset: pos.offset,
				entry,
				index
			});
			y = (_ref7 = currentValueScale !== null && currentValueScale !== void 0 ? currentValueScale : baseValueScale) !== null && _ref7 !== void 0 ? _ref7 : void 0;
			width = pos.size;
			var computedHeight = baseValueScale - currentValueScale;
			height = isNan(computedHeight) ? 0 : computedHeight;
			background = {
				x,
				y: offset.top,
				width,
				height: offset.height
			};
			if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
				var delta = mathSign(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height));
				y -= delta;
				height += delta;
			}
		} else {
			var _baseValueScale = xAxis.scale.map(value[0]);
			var _currentValueScale = xAxis.scale.map(value[1]);
			if (_baseValueScale == null || _currentValueScale == null) return null;
			x = _baseValueScale;
			y = getCateCoordinateOfBar({
				axis: yAxis,
				ticks: yAxisTicks,
				bandSize,
				offset: pos.offset,
				entry,
				index
			});
			width = _currentValueScale - _baseValueScale;
			height = pos.size;
			background = {
				x: offset.left,
				y,
				width: offset.width,
				height
			};
			if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
				var _delta = mathSign(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width));
				width += _delta;
			}
		}
		if (x == null || y == null || width == null || height == null || !hasCustomShape && (width === 0 || height === 0)) return null;
		return _objectSpread$4(_objectSpread$4({}, entry), {}, {
			stackedBarStart,
			x,
			y,
			width,
			height,
			value: stackedData ? value : value[1],
			payload: entry,
			background,
			tooltipPosition: {
				x: x + width / 2,
				y: y + height / 2
			},
			parentViewBox,
			originalDataIndex: index
		}, cells && cells[index] && cells[index].props);
	}).filter(Boolean);
}
function BarFn(outsideProps) {
	var props = resolveDefaultProps(outsideProps, defaultBarProps);
	var stackId = useStackId(props.stackId);
	var isPanorama = useIsPanorama();
	return /* @__PURE__ */ React.createElement(RegisterGraphicalItemId, {
		id: props.id,
		type: "bar"
	}, (id) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SetLegendPayload, { legendPayload: computeLegendPayloadFromBarData(props) }), /* @__PURE__ */ React.createElement(SetBarTooltipEntrySettings, {
		dataKey: props.dataKey,
		stroke: props.stroke,
		strokeWidth: props.strokeWidth,
		fill: props.fill,
		name: props.name,
		hide: props.hide,
		unit: props.unit,
		tooltipType: props.tooltipType,
		id
	}), /* @__PURE__ */ React.createElement(SetCartesianGraphicalItem, {
		type: "bar",
		id,
		data: void 0,
		xAxisId: props.xAxisId,
		yAxisId: props.yAxisId,
		zAxisId: 0,
		dataKey: props.dataKey,
		stackId,
		hide: props.hide,
		barSize: props.barSize,
		minPointSize: props.minPointSize,
		maxBarSize: props.maxBarSize,
		isPanorama,
		hasCustomShape: props.shape != null
	}), /* @__PURE__ */ React.createElement(ZIndexLayer, { zIndex: props.zIndex }, /* @__PURE__ */ React.createElement(BarImpl, _extends$5({}, props, { id })))));
}
/**
* @provides ErrorBarContext
* @provides LabelListContext
* @provides CellReader
* @consumes CartesianChartContext
* @consumes BarStackContext
*/
var Bar = /* @__PURE__ */ React.memo(BarFn, propsAreEqual);
Bar.displayName = "Bar";
//#endregion
//#region node_modules/recharts/es6/util/axisPropsAreEqual.js
var _excluded$4 = ["domain", "range"], _excluded2$2 = ["domain", "range"];
function _objectWithoutProperties$4(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$4(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$4(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function shortArraysAreEqual(arr1, arr2) {
	if (arr1 === arr2) return true;
	if (Array.isArray(arr1) && arr1.length === 2 && Array.isArray(arr2) && arr2.length === 2) return arr1[0] === arr2[0] && arr1[1] === arr2[1];
	return false;
}
/**
* Usually we would not compare array props deeply for performance consideration.
* However, for axis props, domain is sometimes defined as a two-elements array, and range is always
* a two-elements array. So we can do a shallow comparison for the rest props and a shallow
* comparison for these two array props.
* @param prevProps
* @param nextProps
*/
function axisPropsAreEqual(prevProps, nextProps) {
	if (prevProps === nextProps) return true;
	var { domain: prevDomain, range: prevRange } = prevProps, prevRest = _objectWithoutProperties$4(prevProps, _excluded$4);
	var { domain: nextDomain, range: nextRange } = nextProps, nextRest = _objectWithoutProperties$4(nextProps, _excluded2$2);
	if (!shortArraysAreEqual(prevDomain, nextDomain)) return false;
	if (!shortArraysAreEqual(prevRange, nextRange)) return false;
	return propsAreEqual(prevRest, nextRest);
}
//#endregion
//#region node_modules/recharts/es6/cartesian/XAxis.js
/**
* @fileOverview X Axis
*/
var _excluded$3 = ["type"], _excluded2$1 = [
	"dangerouslySetInnerHTML",
	"ticks",
	"scale"
], _excluded3$1 = ["id", "scale"];
function _extends$4() {
	return _extends$4 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$4.apply(null, arguments);
}
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$3(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r) {
			_defineProperty$3(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$3(e, r, t) {
	return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$3(t) {
	var i = _toPrimitive$3(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$3(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$3(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$3(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$3(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function SetXAxisSettings(props) {
	var dispatch = useAppDispatch();
	var prevSettingsRef = useRef(null);
	var layout = useCartesianChartLayout();
	var { type: typeFromProps } = props, restProps = _objectWithoutProperties$3(props, _excluded$3);
	var evaluatedType = getAxisTypeBasedOnLayout(layout, "xAxis", typeFromProps);
	var settings = useMemo(() => {
		if (evaluatedType == null) return;
		return _objectSpread$3(_objectSpread$3({}, restProps), {}, { type: evaluatedType });
	}, [restProps, evaluatedType]);
	useLayoutEffect(() => {
		if (settings == null) return;
		if (prevSettingsRef.current === null) dispatch(addXAxis(settings));
		else if (prevSettingsRef.current !== settings) dispatch(replaceXAxis({
			prev: prevSettingsRef.current,
			next: settings
		}));
		prevSettingsRef.current = settings;
	}, [settings, dispatch]);
	useLayoutEffect(() => {
		return () => {
			if (prevSettingsRef.current) {
				dispatch(removeXAxis(prevSettingsRef.current));
				prevSettingsRef.current = null;
			}
		};
	}, [dispatch]);
	return null;
}
var XAxisImpl = (props) => {
	var { xAxisId, className } = props;
	var viewBox = useAppSelector(selectAxisViewBox);
	var isPanorama = useIsPanorama();
	var axisType = "xAxis";
	var cartesianTickItems = useAppSelector((state) => selectTicksOfAxis(state, axisType, xAxisId, isPanorama));
	var axisSize = useAppSelector((state) => selectXAxisSize(state, xAxisId));
	var position = useAppSelector((state) => selectXAxisPosition(state, xAxisId));
	var synchronizedSettings = useAppSelector((state) => selectXAxisSettingsNoDefaults(state, xAxisId));
	if (axisSize == null || position == null || synchronizedSettings == null) return null;
	var { dangerouslySetInnerHTML, ticks, scale: del } = props, allOtherProps = _objectWithoutProperties$3(props, _excluded2$1);
	var { id, scale: del2 } = synchronizedSettings, restSynchronizedSettings = _objectWithoutProperties$3(synchronizedSettings, _excluded3$1);
	return /* @__PURE__ */ React.createElement(CartesianAxis, _extends$4({}, allOtherProps, restSynchronizedSettings, {
		x: position.x,
		y: position.y,
		width: axisSize.width,
		height: axisSize.height,
		className: clsx("recharts-".concat(axisType, " ").concat(axisType), className),
		viewBox,
		ticks: cartesianTickItems,
		axisType,
		axisId: xAxisId
	}));
};
var xAxisDefaultProps = {
	allowDataOverflow: implicitXAxis.allowDataOverflow,
	allowDecimals: implicitXAxis.allowDecimals,
	allowDuplicatedCategory: implicitXAxis.allowDuplicatedCategory,
	angle: implicitXAxis.angle,
	axisLine: defaultCartesianAxisProps.axisLine,
	height: implicitXAxis.height,
	hide: false,
	includeHidden: implicitXAxis.includeHidden,
	interval: implicitXAxis.interval,
	label: false,
	minTickGap: implicitXAxis.minTickGap,
	mirror: implicitXAxis.mirror,
	orientation: implicitXAxis.orientation,
	padding: implicitXAxis.padding,
	reversed: implicitXAxis.reversed,
	scale: implicitXAxis.scale,
	tick: implicitXAxis.tick,
	tickCount: implicitXAxis.tickCount,
	tickLine: defaultCartesianAxisProps.tickLine,
	tickSize: defaultCartesianAxisProps.tickSize,
	type: implicitXAxis.type,
	niceTicks: implicitXAxis.niceTicks,
	xAxisId: 0
};
var XAxisSettingsDispatcher = (outsideProps) => {
	var props = resolveDefaultProps(outsideProps, xAxisDefaultProps);
	return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SetXAxisSettings, {
		allowDataOverflow: props.allowDataOverflow,
		allowDecimals: props.allowDecimals,
		allowDuplicatedCategory: props.allowDuplicatedCategory,
		angle: props.angle,
		dataKey: props.dataKey,
		domain: props.domain,
		height: props.height,
		hide: props.hide,
		id: props.xAxisId,
		includeHidden: props.includeHidden,
		interval: props.interval,
		minTickGap: props.minTickGap,
		mirror: props.mirror,
		name: props.name,
		orientation: props.orientation,
		padding: props.padding,
		reversed: props.reversed,
		scale: props.scale,
		tick: props.tick,
		tickCount: props.tickCount,
		tickFormatter: props.tickFormatter,
		ticks: props.ticks,
		type: props.type,
		unit: props.unit,
		niceTicks: props.niceTicks
	}), /* @__PURE__ */ React.createElement(XAxisImpl, props));
};
/**
* @consumes CartesianViewBoxContext
* @provides CartesianLabelContext
*/
var XAxis = /* @__PURE__ */ React.memo(XAxisSettingsDispatcher, axisPropsAreEqual);
XAxis.displayName = "XAxis";
//#endregion
//#region node_modules/recharts/es6/cartesian/YAxis.js
var _excluded$2 = ["type"], _excluded2 = [
	"dangerouslySetInnerHTML",
	"ticks",
	"scale"
], _excluded3 = ["id", "scale"];
function _extends$3() {
	return _extends$3 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$3.apply(null, arguments);
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty$2(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$2(e, r, t) {
	return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
	var i = _toPrimitive$2(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$2(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$2(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$2(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$2(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function SetYAxisSettings(props) {
	var dispatch = useAppDispatch();
	var prevSettingsRef = useRef(null);
	var layout = useCartesianChartLayout();
	var { type: typeFromProps } = props, restProps = _objectWithoutProperties$2(props, _excluded$2);
	var evaluatedType = getAxisTypeBasedOnLayout(layout, "yAxis", typeFromProps);
	var settings = useMemo(() => {
		if (evaluatedType == null) return;
		return _objectSpread$2(_objectSpread$2({}, restProps), {}, { type: evaluatedType });
	}, [evaluatedType, restProps]);
	useLayoutEffect(() => {
		if (settings == null) return;
		if (prevSettingsRef.current === null) dispatch(addYAxis(settings));
		else if (prevSettingsRef.current !== settings) dispatch(replaceYAxis({
			prev: prevSettingsRef.current,
			next: settings
		}));
		prevSettingsRef.current = settings;
	}, [settings, dispatch]);
	useLayoutEffect(() => {
		return () => {
			if (prevSettingsRef.current) {
				dispatch(removeYAxis(prevSettingsRef.current));
				prevSettingsRef.current = null;
			}
		};
	}, [dispatch]);
	return null;
}
function YAxisImpl(props) {
	var { yAxisId, className, width, label } = props;
	var cartesianAxisRef = useRef(null);
	var labelRef = useRef(null);
	var viewBox = useAppSelector(selectAxisViewBox);
	var isPanorama = useIsPanorama();
	var dispatch = useAppDispatch();
	var axisType = "yAxis";
	var axisSize = useAppSelector((state) => selectYAxisSize(state, yAxisId));
	var position = useAppSelector((state) => selectYAxisPosition(state, yAxisId));
	var cartesianTickItems = useAppSelector((state) => selectTicksOfAxis(state, axisType, yAxisId, isPanorama));
	var synchronizedSettings = useAppSelector((state) => selectYAxisSettingsNoDefaults(state, yAxisId));
	useLayoutEffect(() => {
		if (width !== "auto" || !axisSize || isLabelContentAFunction(label) || /* @__PURE__ */ isValidElement(label) || synchronizedSettings == null) return;
		var axisComponent = cartesianAxisRef.current;
		if (!axisComponent) return;
		var updatedYAxisWidth = axisComponent.getCalculatedWidth();
		if (Math.round(axisSize.width) !== Math.round(updatedYAxisWidth)) dispatch(updateYAxisWidth({
			id: yAxisId,
			width: updatedYAxisWidth
		}));
	}, [
		cartesianTickItems,
		axisSize,
		dispatch,
		label,
		yAxisId,
		width,
		synchronizedSettings
	]);
	if (axisSize == null || position == null || synchronizedSettings == null) return null;
	var { dangerouslySetInnerHTML, ticks, scale: del } = props, allOtherProps = _objectWithoutProperties$2(props, _excluded2);
	var { id, scale: del2 } = synchronizedSettings, restSynchronizedSettings = _objectWithoutProperties$2(synchronizedSettings, _excluded3);
	return /* @__PURE__ */ React.createElement(CartesianAxis, _extends$3({}, allOtherProps, restSynchronizedSettings, {
		ref: cartesianAxisRef,
		labelRef,
		x: position.x,
		y: position.y,
		tickTextProps: width === "auto" ? { width: void 0 } : { width },
		width: axisSize.width,
		height: axisSize.height,
		className: clsx("recharts-".concat(axisType, " ").concat(axisType), className),
		viewBox,
		ticks: cartesianTickItems,
		axisType,
		axisId: yAxisId
	}));
}
var yAxisDefaultProps = {
	allowDataOverflow: implicitYAxis.allowDataOverflow,
	allowDecimals: implicitYAxis.allowDecimals,
	allowDuplicatedCategory: implicitYAxis.allowDuplicatedCategory,
	angle: implicitYAxis.angle,
	axisLine: defaultCartesianAxisProps.axisLine,
	hide: false,
	includeHidden: implicitYAxis.includeHidden,
	interval: implicitYAxis.interval,
	label: false,
	minTickGap: implicitYAxis.minTickGap,
	mirror: implicitYAxis.mirror,
	orientation: implicitYAxis.orientation,
	padding: implicitYAxis.padding,
	reversed: implicitYAxis.reversed,
	scale: implicitYAxis.scale,
	tick: implicitYAxis.tick,
	tickCount: implicitYAxis.tickCount,
	tickLine: defaultCartesianAxisProps.tickLine,
	tickSize: defaultCartesianAxisProps.tickSize,
	type: implicitYAxis.type,
	niceTicks: implicitYAxis.niceTicks,
	width: implicitYAxis.width,
	yAxisId: 0
};
var YAxisSettingsDispatcher = (outsideProps) => {
	var props = resolveDefaultProps(outsideProps, yAxisDefaultProps);
	return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SetYAxisSettings, {
		interval: props.interval,
		id: props.yAxisId,
		scale: props.scale,
		type: props.type,
		domain: props.domain,
		allowDataOverflow: props.allowDataOverflow,
		dataKey: props.dataKey,
		allowDuplicatedCategory: props.allowDuplicatedCategory,
		allowDecimals: props.allowDecimals,
		tickCount: props.tickCount,
		padding: props.padding,
		includeHidden: props.includeHidden,
		reversed: props.reversed,
		ticks: props.ticks,
		width: props.width,
		orientation: props.orientation,
		mirror: props.mirror,
		hide: props.hide,
		unit: props.unit,
		name: props.name,
		angle: props.angle,
		minTickGap: props.minTickGap,
		tick: props.tick,
		tickFormatter: props.tickFormatter,
		niceTicks: props.niceTicks
	}), /* @__PURE__ */ React.createElement(YAxisImpl, props));
};
/**
* @consumes CartesianViewBoxContext
* @provides CartesianLabelContext
*/
var YAxis = /* @__PURE__ */ React.memo(YAxisSettingsDispatcher, axisPropsAreEqual);
YAxis.displayName = "YAxis";
//#endregion
//#region node_modules/recharts/es6/state/selectors/selectActivePropsFromChartPointer.js
var pickChartPointer = (_state, chartPointer) => chartPointer;
var selectActivePropsFromChartPointer = createSelector([
	pickChartPointer,
	selectChartLayout,
	selectPolarViewBox,
	selectTooltipAxisType,
	selectTooltipAxisRangeWithReverse,
	selectTooltipAxisTicks,
	selectOrderedTooltipTicks,
	selectChartOffsetInternal
], combineActiveProps);
//#endregion
//#region node_modules/recharts/es6/util/getRelativeCoordinate.js
/**
* Type guard to check if the pointer event is from an SVG element.
*/
function isSvgPointer(pointer) {
	return "getBBox" in pointer.currentTarget && typeof pointer.currentTarget.getBBox === "function";
}
/**
* Computes relative element coordinates from mouse or touch event.
*
* The output coordinates are relative to the top-left corner of the active element (= currentTarget),
* where the top-left corner is (0, 0).
* Moving right, the x-coordinate increases, and moving down, the y-coordinate increases.
*
* The coordinates are rounded to the nearest integer and account for CSS transform scale.
* So element that's scaled will return the same coordinates as element that's not scaled.
*
* In other words: you zoom in or out, numbers stay the same.
*
* This function works with both HTML elements and SVG elements.
*
* It works with both Mouse and Touch events.
* For Touch events, it returns an array of coordinates, one for each touch point.
* For Mouse events, it returns a single coordinate object.
*
* @example
* ```tsx
* // In an HTML element event handler. Legend passes the native event as the 3rd argument.
* <Legend onMouseMove={(_data, _i, e) => {
*   // These coordinates are relative to the top-left corner of the Legend element
*   const { relativeX, relativeY } = getRelativeCoordinate(e);
*   console.log(`Mouse at Legend position: (${relativeX}, ${relativeY})`);
* }}>
* ```
*
* @example
* ```tsx
* // In an SVG element event handler. Area is an SVG element, and passes the event as second argument.
* <Area onMouseMove={(_, e) => {
*   const { relativeX, relativeY } = getRelativeCoordinate(e);
*   console.log(`Mouse at Area position: (${relativeX}, ${relativeY})`);
*   // Here you can call usePlotArea to convert to chart coordinates
* }}>
* ```
*
* @example
* ```tsx
* // In a chart root touch handler. Chart root passes the event as second argument.
* <LineChart onTouchMove={(_, e) => {
*   const touchPoints = getRelativeCoordinate(e);
*   touchPoints.forEach(({ relativeX, relativeY }, index) => {
*     console.log(`Touch point ${index} at LineChart position: (${relativeX}, ${relativeY})`);
*   });
* }}>
* ```
*
* @since 3.8
* @param event The mouse or touch event from React event handlers (works with both HTML and SVG elements)
* @returns Coordinates relative to the top-left corner of the element. Single object for Mouse events, array of objects for Touch events.
*/
function getRelativeCoordinate(event) {
	var rect = event.currentTarget.getBoundingClientRect();
	var scaleX, scaleY;
	if (isSvgPointer(event)) {
		var bbox = event.currentTarget.getBBox();
		scaleX = bbox.width > 0 ? rect.width / bbox.width : 1;
		scaleY = bbox.height > 0 ? rect.height / bbox.height : 1;
	} else {
		var element = event.currentTarget;
		scaleX = element.offsetWidth > 0 ? rect.width / element.offsetWidth : 1;
		scaleY = element.offsetHeight > 0 ? rect.height / element.offsetHeight : 1;
	}
	var getCoordinates = (clientX, clientY) => ({
		relativeX: Math.round((clientX - rect.left) / scaleX),
		relativeY: Math.round((clientY - rect.top) / scaleY)
	});
	if ("touches" in event) return Array.from(event.touches).map((touch) => getCoordinates(touch.clientX, touch.clientY));
	return getCoordinates(event.clientX, event.clientY);
}
//#endregion
//#region node_modules/recharts/es6/state/mouseEventsMiddleware.js
var mouseClickAction = createAction("mouseClick");
var mouseClickMiddleware = createListenerMiddleware();
mouseClickMiddleware.startListening({
	actionCreator: mouseClickAction,
	effect: (action, listenerApi) => {
		var mousePointer = action.payload;
		var activeProps = selectActivePropsFromChartPointer(listenerApi.getState(), getRelativeCoordinate(mousePointer));
		if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) listenerApi.dispatch(setMouseClickAxisIndex({
			activeIndex: activeProps.activeIndex,
			activeDataKey: void 0,
			activeCoordinate: activeProps.activeCoordinate
		}));
	}
});
var mouseMoveAction = createAction("mouseMove");
var mouseMoveMiddleware = createListenerMiddleware();
var rafId$2 = null;
var timeoutId$2 = null;
var latestChartPointer = null;
mouseMoveMiddleware.startListening({
	actionCreator: mouseMoveAction,
	effect: (action, listenerApi) => {
		var mousePointer = action.payload;
		var { throttleDelay, throttledEvents } = listenerApi.getState().eventSettings;
		var isThrottled = throttledEvents === "all" || (throttledEvents === null || throttledEvents === void 0 ? void 0 : throttledEvents.includes("mousemove"));
		if (rafId$2 !== null) {
			cancelAnimationFrame(rafId$2);
			rafId$2 = null;
		}
		if (timeoutId$2 !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
			clearTimeout(timeoutId$2);
			timeoutId$2 = null;
		}
		latestChartPointer = getRelativeCoordinate(mousePointer);
		var callback = () => {
			var currentState = listenerApi.getState();
			var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
			if (!latestChartPointer) {
				rafId$2 = null;
				timeoutId$2 = null;
				return;
			}
			if (tooltipEventType === "axis") {
				var activeProps = selectActivePropsFromChartPointer(currentState, latestChartPointer);
				if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) listenerApi.dispatch(setMouseOverAxisIndex({
					activeIndex: activeProps.activeIndex,
					activeDataKey: void 0,
					activeCoordinate: activeProps.activeCoordinate
				}));
				else listenerApi.dispatch(mouseLeaveChart());
			}
			rafId$2 = null;
			timeoutId$2 = null;
		};
		if (!isThrottled) {
			callback();
			return;
		}
		if (throttleDelay === "raf") rafId$2 = requestAnimationFrame(callback);
		else if (typeof throttleDelay === "number") {
			if (timeoutId$2 === null) timeoutId$2 = setTimeout(callback, throttleDelay);
		}
	}
});
//#endregion
//#region node_modules/recharts/es6/state/reduxDevtoolsJsonStringifyReplacer.js
function reduxDevtoolsJsonStringifyReplacer(key, value) {
	if (value instanceof HTMLElement) return "HTMLElement <".concat(value.tagName, " class=\"").concat(value.className, "\">");
	if (value === window) return "global.window";
	if (key === "children" && typeof value === "object" && value !== null) return "<<CHILDREN>>";
	return value;
}
//#endregion
//#region node_modules/recharts/es6/state/rootPropsSlice.js
/**
* These are chart options that users can choose - which means they can also
* choose to change them which should trigger a re-render.
*/
var initialState = {
	accessibilityLayer: true,
	barCategoryGap: "10%",
	barGap: 4,
	barSize: void 0,
	className: void 0,
	maxBarSize: void 0,
	stackOffset: "none",
	syncId: void 0,
	syncMethod: "index",
	baseValue: void 0,
	reverseStackOrder: false
};
var rootPropsSlice = createSlice({
	name: "rootProps",
	initialState,
	reducers: { updateOptions: (state, action) => {
		var _action$payload$barGa;
		state.accessibilityLayer = action.payload.accessibilityLayer;
		state.barCategoryGap = action.payload.barCategoryGap;
		state.barGap = (_action$payload$barGa = action.payload.barGap) !== null && _action$payload$barGa !== void 0 ? _action$payload$barGa : initialState.barGap;
		state.barSize = action.payload.barSize;
		state.maxBarSize = action.payload.maxBarSize;
		state.stackOffset = action.payload.stackOffset;
		state.syncId = action.payload.syncId;
		state.syncMethod = action.payload.syncMethod;
		state.className = action.payload.className;
		state.baseValue = action.payload.baseValue;
		state.reverseStackOrder = action.payload.reverseStackOrder;
	} }
});
var rootPropsReducer = rootPropsSlice.reducer;
var { updateOptions } = rootPropsSlice.actions;
//#endregion
//#region node_modules/recharts/es6/state/polarOptionsSlice.js
var polarOptionsSlice = createSlice({
	name: "polarOptions",
	initialState: null,
	reducers: { updatePolarOptions: (state, action) => {
		if (state === null) return action.payload;
		state.startAngle = action.payload.startAngle;
		state.endAngle = action.payload.endAngle;
		state.cx = action.payload.cx;
		state.cy = action.payload.cy;
		state.innerRadius = action.payload.innerRadius;
		state.outerRadius = action.payload.outerRadius;
		return state;
	} }
});
var { updatePolarOptions } = polarOptionsSlice.actions;
var polarOptionsReducer = polarOptionsSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/state/keyboardEventsMiddleware.js
var keyDownAction = createAction("keyDown");
var focusAction = createAction("focus");
var blurAction = createAction("blur");
var keyboardEventsMiddleware = createListenerMiddleware();
var rafId$1 = null;
var timeoutId$1 = null;
var latestKeyboardActionPayload = null;
keyboardEventsMiddleware.startListening({
	actionCreator: keyDownAction,
	effect: (action, listenerApi) => {
		latestKeyboardActionPayload = action.payload;
		if (rafId$1 !== null) {
			cancelAnimationFrame(rafId$1);
			rafId$1 = null;
		}
		var { throttleDelay, throttledEvents } = listenerApi.getState().eventSettings;
		var isThrottled = throttledEvents === "all" || throttledEvents.includes("keydown");
		if (timeoutId$1 !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
			clearTimeout(timeoutId$1);
			timeoutId$1 = null;
		}
		var callback = () => {
			try {
				var currentState = listenerApi.getState();
				if (!(currentState.rootProps.accessibilityLayer !== false)) return;
				var { keyboardInteraction } = currentState.tooltip;
				var key = latestKeyboardActionPayload;
				if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Enter") return;
				var resolvedIndex = combineActiveTooltipIndex(keyboardInteraction, selectTooltipDisplayedData(currentState), selectTooltipAxisDataKey(currentState), selectTooltipAxisDomain(currentState));
				var currentIndex = resolvedIndex == null ? -1 : Number(resolvedIndex);
				var isOutsideDomain = !Number.isFinite(currentIndex) || currentIndex < 0;
				var tooltipTicks = selectTooltipAxisTicks(currentState);
				var displayedData = selectTooltipDisplayedData(currentState);
				var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
				if (key === "Enter") {
					if (isOutsideDomain) return;
					var _coordinate = selectCoordinateForDefaultIndex(currentState, tooltipEventType, "hover", String(keyboardInteraction.index));
					listenerApi.dispatch(setKeyboardInteraction({
						active: !keyboardInteraction.active,
						activeIndex: keyboardInteraction.index,
						activeCoordinate: _coordinate
					}));
					return;
				}
				var directionMultiplier = selectChartDirection(currentState) === "left-to-right" ? 1 : -1;
				var movement = key === "ArrowRight" ? 1 : -1;
				var nextIndex;
				if (isOutsideDomain) {
					var axisDataKey = selectTooltipAxisDataKey(currentState);
					var domain = selectTooltipAxisDomain(currentState);
					var effectiveMovement = movement * directionMultiplier;
					var mkInteraction = (i) => ({
						active: false,
						index: String(i),
						dataKey: void 0,
						graphicalItemId: void 0,
						coordinate: void 0
					});
					nextIndex = -1;
					if (effectiveMovement > 0) {
						for (var i = 0; i < displayedData.length; i++) if (combineActiveTooltipIndex(mkInteraction(i), displayedData, axisDataKey, domain) != null) {
							nextIndex = i;
							break;
						}
					} else for (var _i = displayedData.length - 1; _i >= 0; _i--) if (combineActiveTooltipIndex(mkInteraction(_i), displayedData, axisDataKey, domain) != null) {
						nextIndex = _i;
						break;
					}
					if (nextIndex < 0) return;
				} else {
					nextIndex = currentIndex + movement * directionMultiplier;
					var dataLength = (tooltipTicks === null || tooltipTicks === void 0 ? void 0 : tooltipTicks.length) || displayedData.length;
					if (dataLength === 0 || nextIndex >= dataLength || nextIndex < 0) return;
				}
				var coordinate = selectCoordinateForDefaultIndex(currentState, tooltipEventType, "hover", String(nextIndex));
				listenerApi.dispatch(setKeyboardInteraction({
					active: true,
					activeIndex: nextIndex.toString(),
					activeCoordinate: coordinate
				}));
			} finally {
				rafId$1 = null;
				timeoutId$1 = null;
			}
		};
		if (!isThrottled) {
			callback();
			return;
		}
		if (throttleDelay === "raf") rafId$1 = requestAnimationFrame(callback);
		else if (typeof throttleDelay === "number") {
			if (timeoutId$1 === null) {
				callback();
				latestKeyboardActionPayload = null;
				timeoutId$1 = setTimeout(() => {
					if (latestKeyboardActionPayload) callback();
					else {
						timeoutId$1 = null;
						rafId$1 = null;
					}
				}, throttleDelay);
			}
		}
	}
});
keyboardEventsMiddleware.startListening({
	actionCreator: focusAction,
	effect: (_action, listenerApi) => {
		var state = listenerApi.getState();
		if (!(state.rootProps.accessibilityLayer !== false)) return;
		var { keyboardInteraction } = state.tooltip;
		if (keyboardInteraction.active) return;
		if (keyboardInteraction.index == null) {
			var nextIndex = "0";
			var coordinate = selectCoordinateForDefaultIndex(state, selectTooltipEventType$1(state, state.tooltip.settings.shared), "hover", String(nextIndex));
			listenerApi.dispatch(setKeyboardInteraction({
				active: true,
				activeIndex: nextIndex,
				activeCoordinate: coordinate
			}));
		}
	}
});
keyboardEventsMiddleware.startListening({
	actionCreator: blurAction,
	effect: (_action, listenerApi) => {
		var state = listenerApi.getState();
		if (!(state.rootProps.accessibilityLayer !== false)) return;
		var { keyboardInteraction } = state.tooltip;
		if (keyboardInteraction.active) listenerApi.dispatch(setKeyboardInteraction({
			active: false,
			activeIndex: keyboardInteraction.index,
			activeCoordinate: keyboardInteraction.coordinate
		}));
	}
});
//#endregion
//#region node_modules/recharts/es6/util/createEventProxy.js
function createEventProxy(reactEvent) {
	reactEvent.persist();
	var { currentTarget } = reactEvent;
	return new Proxy(reactEvent, { get: (target, prop) => {
		if (prop === "currentTarget") return currentTarget;
		var value = Reflect.get(target, prop);
		if (typeof value === "function") return value.bind(target);
		return value;
	} });
}
//#endregion
//#region node_modules/recharts/es6/state/externalEventsMiddleware.js
var externalEventAction = createAction("externalEvent");
var externalEventsMiddleware = createListenerMiddleware();
var rafIdMap = /* @__PURE__ */ new Map();
var timeoutIdMap = /* @__PURE__ */ new Map();
var latestEventMap = /* @__PURE__ */ new Map();
externalEventsMiddleware.startListening({
	actionCreator: externalEventAction,
	effect: (action, listenerApi) => {
		var { handler, reactEvent } = action.payload;
		if (handler == null) return;
		var eventType = reactEvent.type;
		var eventProxy = createEventProxy(reactEvent);
		latestEventMap.set(eventType, {
			handler,
			reactEvent: eventProxy
		});
		var existingRafId = rafIdMap.get(eventType);
		if (existingRafId !== void 0) {
			cancelAnimationFrame(existingRafId);
			rafIdMap.delete(eventType);
		}
		var { throttleDelay, throttledEvents } = listenerApi.getState().eventSettings;
		var eventListAsString = throttledEvents;
		var isThrottled = eventListAsString === "all" || (eventListAsString === null || eventListAsString === void 0 ? void 0 : eventListAsString.includes(eventType));
		var existingTimeoutId = timeoutIdMap.get(eventType);
		if (existingTimeoutId !== void 0 && (typeof throttleDelay !== "number" || !isThrottled)) {
			clearTimeout(existingTimeoutId);
			timeoutIdMap.delete(eventType);
		}
		var callback = () => {
			var latestAction = latestEventMap.get(eventType);
			try {
				if (!latestAction) return;
				var { handler: latestHandler, reactEvent: latestEvent } = latestAction;
				var currentState = listenerApi.getState();
				var nextState = {
					activeCoordinate: selectActiveTooltipCoordinate(currentState),
					activeDataKey: selectActiveTooltipDataKey(currentState),
					activeIndex: selectActiveTooltipIndex(currentState),
					activeLabel: selectActiveLabel$1(currentState),
					activeTooltipIndex: selectActiveTooltipIndex(currentState),
					isTooltipActive: selectIsTooltipActive$1(currentState)
				};
				if (latestHandler) latestHandler(nextState, latestEvent);
			} finally {
				rafIdMap.delete(eventType);
				timeoutIdMap.delete(eventType);
				latestEventMap.delete(eventType);
			}
		};
		if (!isThrottled) {
			callback();
			return;
		}
		if (throttleDelay === "raf") {
			var rafId = requestAnimationFrame(callback);
			rafIdMap.set(eventType, rafId);
		} else if (typeof throttleDelay === "number") {
			if (!timeoutIdMap.has(eventType)) {
				callback();
				var timeoutId = setTimeout(callback, throttleDelay);
				timeoutIdMap.set(eventType, timeoutId);
			}
		} else callback();
	}
});
var selectTooltipCoordinate = createSelector([
	createSelector([selectTooltipState], (tooltipState) => tooltipState.tooltipItemPayloads),
	(_state, tooltipIndex) => tooltipIndex,
	(_state, _tooltipIndex, graphicalItemId) => graphicalItemId
], (allTooltipConfigurations, tooltipIndex, graphicalItemId) => {
	if (tooltipIndex == null) return;
	var mostRelevantTooltipConfiguration = allTooltipConfigurations.find((tooltipConfiguration) => {
		return tooltipConfiguration.settings.graphicalItemId === graphicalItemId;
	});
	if (mostRelevantTooltipConfiguration == null) return;
	var { getPosition } = mostRelevantTooltipConfiguration;
	if (getPosition == null) return;
	return getPosition(tooltipIndex);
});
//#endregion
//#region node_modules/recharts/es6/state/touchEventsMiddleware.js
var touchEventAction = createAction("touchMove");
var touchEventMiddleware = createListenerMiddleware();
var rafId = null;
var timeoutId = null;
var latestChartPointers = null;
var latestTouchEvent = null;
touchEventMiddleware.startListening({
	actionCreator: touchEventAction,
	effect: (action, listenerApi) => {
		var touchEvent = action.payload;
		if (touchEvent.touches == null || touchEvent.touches.length === 0) return;
		latestTouchEvent = createEventProxy(touchEvent);
		var { throttleDelay, throttledEvents } = listenerApi.getState().eventSettings;
		var isThrottled = throttledEvents === "all" || throttledEvents.includes("touchmove");
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
		if (timeoutId !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
		latestChartPointers = Array.from(touchEvent.touches).map((touch) => getRelativeCoordinate({
			clientX: touch.clientX,
			clientY: touch.clientY,
			currentTarget: touchEvent.currentTarget
		}));
		var callback = () => {
			if (latestTouchEvent == null) return;
			var currentState = listenerApi.getState();
			var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
			if (tooltipEventType === "axis") {
				var _latestChartPointers;
				var latestTouchPointer = (_latestChartPointers = latestChartPointers) === null || _latestChartPointers === void 0 ? void 0 : _latestChartPointers[0];
				if (latestTouchPointer == null) {
					rafId = null;
					timeoutId = null;
					return;
				}
				var activeProps = selectActivePropsFromChartPointer(currentState, latestTouchPointer);
				if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) listenerApi.dispatch(setMouseOverAxisIndex({
					activeIndex: activeProps.activeIndex,
					activeDataKey: void 0,
					activeCoordinate: activeProps.activeCoordinate
				}));
			} else if (tooltipEventType === "item") {
				var _target$getAttribute;
				var touch = latestTouchEvent.touches[0];
				if (document.elementFromPoint == null || touch == null) return;
				var target = document.elementFromPoint(touch.clientX, touch.clientY);
				if (!target || !target.getAttribute) return;
				var itemIndex = target.getAttribute(DATA_ITEM_INDEX_ATTRIBUTE_NAME);
				var graphicalItemId = (_target$getAttribute = target.getAttribute("data-recharts-item-id")) !== null && _target$getAttribute !== void 0 ? _target$getAttribute : void 0;
				var settings = selectAllGraphicalItemsSettings(currentState).find((item) => item.id === graphicalItemId);
				if (itemIndex == null || settings == null || graphicalItemId == null) return;
				var { dataKey } = settings;
				var coordinate = selectTooltipCoordinate(currentState, itemIndex, graphicalItemId);
				listenerApi.dispatch(setActiveMouseOverItemIndex({
					activeDataKey: dataKey,
					activeIndex: itemIndex,
					activeCoordinate: coordinate,
					activeGraphicalItemId: graphicalItemId
				}));
			}
			rafId = null;
			timeoutId = null;
		};
		if (!isThrottled) {
			callback();
			return;
		}
		if (throttleDelay === "raf") rafId = requestAnimationFrame(callback);
		else if (typeof throttleDelay === "number") {
			if (timeoutId === null) {
				callback();
				latestTouchEvent = null;
				timeoutId = setTimeout(() => {
					if (latestTouchEvent) callback();
					else {
						timeoutId = null;
						rafId = null;
					}
				}, throttleDelay);
			}
		}
	}
});
//#endregion
//#region node_modules/recharts/es6/state/eventSettingsSlice.js
var initialEventSettingsState = {
	throttleDelay: "raf",
	throttledEvents: [
		"mousemove",
		"touchmove",
		"pointermove",
		"scroll",
		"wheel"
	]
};
var eventSettingsSlice = createSlice({
	name: "eventSettings",
	initialState: initialEventSettingsState,
	reducers: { setEventSettings: (state, action) => {
		if (action.payload.throttleDelay != null) state.throttleDelay = action.payload.throttleDelay;
		if (action.payload.throttledEvents != null) state.throttledEvents = castDraft(action.payload.throttledEvents);
	} }
});
var { setEventSettings } = eventSettingsSlice.actions;
var eventSettingsReducer = eventSettingsSlice.reducer;
//#endregion
//#region node_modules/recharts/es6/state/store.js
var rootReducer = combineReducers({
	brush: brushReducer,
	cartesianAxis: cartesianAxisReducer,
	chartData: chartDataReducer,
	errorBars: errorBarReducer,
	eventSettings: eventSettingsReducer,
	graphicalItems: graphicalItemsReducer,
	layout: chartLayoutReducer,
	legend: legendReducer,
	options: optionsReducer,
	polarAxis: polarAxisReducer,
	polarOptions: polarOptionsReducer,
	referenceElements: referenceElementsReducer,
	renderedTicks: renderedTicksReducer,
	rootProps: rootPropsReducer,
	tooltip: tooltipReducer,
	zIndex: zIndexReducer
});
var createRechartsStore = function createRechartsStore(preloadedState) {
	var chartName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) => {
			var _process$env$NODE_ENV;
			return getDefaultMiddleware({
				serializableCheck: false,
				immutableCheck: ![
					"commonjs",
					"es6",
					"production"
				].includes((_process$env$NODE_ENV = "es6") !== null && _process$env$NODE_ENV !== void 0 ? _process$env$NODE_ENV : "")
			}).concat([
				mouseClickMiddleware.middleware,
				mouseMoveMiddleware.middleware,
				keyboardEventsMiddleware.middleware,
				externalEventsMiddleware.middleware,
				touchEventMiddleware.middleware
			]);
		},
		enhancers: (getDefaultEnhancers) => {
			var enhancers = getDefaultEnhancers;
			if (typeof getDefaultEnhancers === "function") enhancers = getDefaultEnhancers();
			return enhancers.concat(autoBatchEnhancer({ type: "raf" }));
		},
		devTools: Global.devToolsEnabled && {
			serialize: { replacer: reduxDevtoolsJsonStringifyReplacer },
			name: "recharts-".concat(chartName)
		}
	});
};
//#endregion
//#region node_modules/recharts/es6/state/RechartsStoreProvider.js
function RechartsStoreProvider(_ref) {
	var { preloadedState, children, reduxStoreName } = _ref;
	var isPanorama = useIsPanorama();
	var storeRef = useRef(null);
	if (isPanorama) return children;
	if (storeRef.current == null) storeRef.current = createRechartsStore(preloadedState, reduxStoreName);
	var nonNullContext = RechartsReduxContext;
	return /* @__PURE__ */ React.createElement(Provider, {
		context: nonNullContext,
		store: storeRef.current
	}, children);
}
//#endregion
//#region node_modules/recharts/es6/state/ReportMainChartProps.js
/**
* "Main" props are props that are only accepted on the main chart,
* as opposed to the small panorama chart inside a Brush.
*/
function ReportMainChartPropsImpl(_ref) {
	var { layout, margin } = _ref;
	var dispatch = useAppDispatch();
	var isPanorama = useIsPanorama();
	useEffect(() => {
		if (!isPanorama) {
			dispatch(setLayout(layout));
			dispatch(setMargin(margin));
		}
	}, [
		dispatch,
		isPanorama,
		layout,
		margin
	]);
	return null;
}
var ReportMainChartProps = /* @__PURE__ */ memo(ReportMainChartPropsImpl, propsAreEqual);
//#endregion
//#region node_modules/recharts/es6/state/ReportChartProps.js
function ReportChartProps(props) {
	var dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(updateOptions(props));
	}, [dispatch, props]);
	return null;
}
//#endregion
//#region node_modules/recharts/es6/state/ReportEventSettings.js
var ReportEventSettingsImpl = (props) => {
	var dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(setEventSettings(props));
	}, [dispatch, props]);
	return null;
};
var ReportEventSettings = /* @__PURE__ */ memo(ReportEventSettingsImpl, propsAreEqual);
//#endregion
//#region node_modules/recharts/es6/zIndex/ZIndexPortal.js
function ZIndexSvgPortal(_ref) {
	var { zIndex, isPanorama } = _ref;
	var ref = useRef(null);
	var dispatch = useAppDispatch();
	useLayoutEffect(() => {
		if (ref.current) dispatch(registerZIndexPortalElement({
			zIndex,
			element: ref.current,
			isPanorama
		}));
		return () => {
			dispatch(unregisterZIndexPortalElement({
				zIndex,
				isPanorama
			}));
		};
	}, [
		dispatch,
		zIndex,
		isPanorama
	]);
	return /* @__PURE__ */ React.createElement("g", {
		tabIndex: -1,
		ref,
		className: "recharts-zIndex-layer_".concat(zIndex)
	});
}
function AllZIndexPortals(_ref2) {
	var { children, isPanorama } = _ref2;
	var allRegisteredZIndexes = useAppSelector(selectAllRegisteredZIndexes);
	if (!allRegisteredZIndexes || allRegisteredZIndexes.length === 0) return children;
	var allNegativeZIndexes = allRegisteredZIndexes.filter((zIndex) => zIndex < 0);
	var allPositiveZIndexes = allRegisteredZIndexes.filter((zIndex) => zIndex > 0);
	return /* @__PURE__ */ React.createElement(React.Fragment, null, allNegativeZIndexes.map((zIndex) => /* @__PURE__ */ React.createElement(ZIndexSvgPortal, {
		key: zIndex,
		zIndex,
		isPanorama
	})), children, allPositiveZIndexes.map((zIndex) => /* @__PURE__ */ React.createElement(ZIndexSvgPortal, {
		key: zIndex,
		zIndex,
		isPanorama
	})));
}
//#endregion
//#region node_modules/recharts/es6/container/RootSurface.js
var _excluded$1 = ["children"];
function _objectWithoutProperties$1(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$1(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose$1(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _extends$2() {
	return _extends$2 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$2.apply(null, arguments);
}
var FULL_WIDTH_AND_HEIGHT = {
	width: "100%",
	height: "100%",
	display: "block"
};
var MainChartSurface = /* @__PURE__ */ forwardRef((props, ref) => {
	var width = useChartWidth();
	var height = useChartHeight();
	var hasAccessibilityLayer = useAccessibilityLayer();
	if (!isPositiveNumber(width) || !isPositiveNumber(height)) return null;
	var { children, otherAttributes, title, desc } = props;
	var tabIndex, role;
	if (otherAttributes != null) {
		if (typeof otherAttributes.tabIndex === "number") tabIndex = otherAttributes.tabIndex;
		else tabIndex = hasAccessibilityLayer ? 0 : void 0;
		if (typeof otherAttributes.role === "string") role = otherAttributes.role;
		else role = hasAccessibilityLayer ? "application" : void 0;
	}
	return /* @__PURE__ */ React.createElement(Surface, _extends$2({}, otherAttributes, {
		title,
		desc,
		role,
		tabIndex,
		width,
		height,
		style: FULL_WIDTH_AND_HEIGHT,
		ref
	}), children);
});
var BrushPanoramaSurface = (_ref) => {
	var { children } = _ref;
	var brushDimensions = useAppSelector(selectBrushDimensions);
	if (!brushDimensions) return null;
	var { width, height, y, x } = brushDimensions;
	return /* @__PURE__ */ React.createElement(Surface, {
		width,
		height,
		x,
		y
	}, children);
};
var RootSurface = /* @__PURE__ */ forwardRef((_ref2, ref) => {
	var { children } = _ref2, rest = _objectWithoutProperties$1(_ref2, _excluded$1);
	if (useIsPanorama()) return /* @__PURE__ */ React.createElement(BrushPanoramaSurface, null, /* @__PURE__ */ React.createElement(AllZIndexPortals, { isPanorama: true }, children));
	return /* @__PURE__ */ React.createElement(MainChartSurface, _extends$2({ ref }, rest), /* @__PURE__ */ React.createElement(AllZIndexPortals, { isPanorama: false }, children));
});
//#endregion
//#region node_modules/recharts/es6/util/useReportScale.js
function useReportScale() {
	var dispatch = useAppDispatch();
	var [ref, setRef] = useState(null);
	var scale = useAppSelector(selectContainerScale);
	useEffect(() => {
		if (ref == null) return;
		var newScale = ref.getBoundingClientRect().width / ref.offsetWidth;
		if (isWellBehavedNumber(newScale) && newScale !== scale) dispatch(setScale(newScale));
	}, [
		ref,
		dispatch,
		scale
	]);
	return setRef;
}
//#endregion
//#region node_modules/recharts/es6/chart/RechartsWrapper.js
function ownKeys$1(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$1(Object(t), !0).forEach(function(r) {
			_defineProperty$1(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty$1(e, r, t) {
	return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
	var i = _toPrimitive$1(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$1(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _extends$1() {
	return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends$1.apply(null, arguments);
}
var EventSynchronizer = () => {
	useSynchronisedEventsFromOtherCharts();
	return null;
};
function getNumberOrZero(value) {
	if (typeof value === "number") return value;
	if (typeof value === "string") {
		var parsed = parseFloat(value);
		if (!Number.isNaN(parsed)) return parsed;
	}
	return 0;
}
var ResponsiveDiv = /* @__PURE__ */ forwardRef((props, ref) => {
	var _props$style, _props$style2;
	var observerRef = useRef(null);
	var [sizes, setSizes] = useState({
		containerWidth: getNumberOrZero((_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.width),
		containerHeight: getNumberOrZero((_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.height)
	});
	var setContainerSize = useCallback((newWidth, newHeight) => {
		setSizes((prevState) => {
			var roundedWidth = Math.round(newWidth);
			var roundedHeight = Math.round(newHeight);
			if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) return prevState;
			return {
				containerWidth: roundedWidth,
				containerHeight: roundedHeight
			};
		});
	}, []);
	var innerRef = useCallback((node) => {
		if (typeof ref === "function") ref(node);
		if (observerRef.current != null) {
			observerRef.current.disconnect();
			observerRef.current = null;
		}
		if (node != null && typeof ResizeObserver !== "undefined") {
			var { width: containerWidth, height: containerHeight } = node.getBoundingClientRect();
			setContainerSize(containerWidth, containerHeight);
			var callback = (entries) => {
				var entry = entries[0];
				if (entry == null) return;
				var { width, height } = entry.contentRect;
				setContainerSize(width, height);
			};
			var observer = new ResizeObserver(callback);
			observer.observe(node);
			observerRef.current = observer;
		}
	}, [ref, setContainerSize]);
	useEffect(() => {
		return () => {
			var observer = observerRef.current;
			if (observer != null) observer.disconnect();
		};
	}, [setContainerSize]);
	return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportChartSize, {
		width: sizes.containerWidth,
		height: sizes.containerHeight
	}), /* @__PURE__ */ React.createElement("div", _extends$1({ ref: innerRef }, props)));
});
var ReadSizeOnceDiv = /* @__PURE__ */ forwardRef((props, ref) => {
	var { width, height } = props;
	var [sizes, setSizes] = useState({
		containerWidth: getNumberOrZero(width),
		containerHeight: getNumberOrZero(height)
	});
	var setContainerSize = useCallback((newWidth, newHeight) => {
		setSizes((prevState) => {
			var roundedWidth = Math.round(newWidth);
			var roundedHeight = Math.round(newHeight);
			if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) return prevState;
			return {
				containerWidth: roundedWidth,
				containerHeight: roundedHeight
			};
		});
	}, []);
	var innerRef = useCallback((node) => {
		if (typeof ref === "function") ref(node);
		if (node != null) {
			var { width: containerWidth, height: containerHeight } = node.getBoundingClientRect();
			setContainerSize(containerWidth, containerHeight);
		}
	}, [ref, setContainerSize]);
	return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportChartSize, {
		width: sizes.containerWidth,
		height: sizes.containerHeight
	}), /* @__PURE__ */ React.createElement("div", _extends$1({ ref: innerRef }, props)));
});
var StaticDiv = /* @__PURE__ */ forwardRef((props, ref) => {
	var { width, height } = props;
	return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportChartSize, {
		width,
		height
	}), /* @__PURE__ */ React.createElement("div", _extends$1({ ref }, props)));
});
var NonResponsiveDiv = /* @__PURE__ */ forwardRef((props, ref) => {
	var { width, height } = props;
	if (typeof width === "string" || typeof height === "string") return /* @__PURE__ */ React.createElement(ReadSizeOnceDiv, _extends$1({}, props, { ref }));
	if (typeof width === "number" && typeof height === "number") return /* @__PURE__ */ React.createElement(StaticDiv, _extends$1({}, props, {
		width,
		height,
		ref
	}));
	return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportChartSize, {
		width,
		height
	}), /* @__PURE__ */ React.createElement("div", _extends$1({ ref }, props)));
});
function getWrapperDivComponent(responsive) {
	return responsive ? ResponsiveDiv : NonResponsiveDiv;
}
var RechartsWrapper = /* @__PURE__ */ forwardRef((props, ref) => {
	var { children, className, height: heightFromProps, onClick, onContextMenu, onDoubleClick, onMouseDown, onMouseEnter, onMouseLeave, onMouseMove, onMouseUp, onTouchEnd, onTouchMove, onTouchStart, style, width: widthFromProps, responsive, dispatchTouchEvents = true } = props;
	var containerRef = useRef(null);
	var dispatch = useAppDispatch();
	var [tooltipPortal, setTooltipPortal] = useState(null);
	var [legendPortal, setLegendPortal] = useState(null);
	var setScaleRef = useReportScale();
	var responsiveContainerCalculations = useResponsiveContainerContext();
	var width = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.width) > 0 ? responsiveContainerCalculations.width : widthFromProps;
	var height = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.height) > 0 ? responsiveContainerCalculations.height : heightFromProps;
	var innerRef = useCallback((node) => {
		setScaleRef(node);
		if (typeof ref === "function") ref(node);
		setTooltipPortal(node);
		setLegendPortal(node);
		if (node != null) containerRef.current = node;
	}, [
		setScaleRef,
		ref,
		setTooltipPortal,
		setLegendPortal
	]);
	var myOnClick = useCallback((e) => {
		dispatch(mouseClickAction(e));
		dispatch(externalEventAction({
			handler: onClick,
			reactEvent: e
		}));
	}, [dispatch, onClick]);
	var myOnMouseEnter = useCallback((e) => {
		dispatch(mouseMoveAction(e));
		dispatch(externalEventAction({
			handler: onMouseEnter,
			reactEvent: e
		}));
	}, [dispatch, onMouseEnter]);
	var myOnMouseLeave = useCallback((e) => {
		dispatch(mouseLeaveChart());
		dispatch(externalEventAction({
			handler: onMouseLeave,
			reactEvent: e
		}));
	}, [dispatch, onMouseLeave]);
	var myOnMouseMove = useCallback((e) => {
		dispatch(mouseMoveAction(e));
		dispatch(externalEventAction({
			handler: onMouseMove,
			reactEvent: e
		}));
	}, [dispatch, onMouseMove]);
	var onFocus = useCallback(() => {
		dispatch(focusAction());
	}, [dispatch]);
	var onBlur = useCallback(() => {
		dispatch(blurAction());
	}, [dispatch]);
	var onKeyDown = useCallback((e) => {
		dispatch(keyDownAction(e.key));
	}, [dispatch]);
	var myOnContextMenu = useCallback((e) => {
		dispatch(externalEventAction({
			handler: onContextMenu,
			reactEvent: e
		}));
	}, [dispatch, onContextMenu]);
	var myOnDoubleClick = useCallback((e) => {
		dispatch(externalEventAction({
			handler: onDoubleClick,
			reactEvent: e
		}));
	}, [dispatch, onDoubleClick]);
	var myOnMouseDown = useCallback((e) => {
		dispatch(externalEventAction({
			handler: onMouseDown,
			reactEvent: e
		}));
	}, [dispatch, onMouseDown]);
	var myOnMouseUp = useCallback((e) => {
		dispatch(externalEventAction({
			handler: onMouseUp,
			reactEvent: e
		}));
	}, [dispatch, onMouseUp]);
	var myOnTouchStart = useCallback((e) => {
		dispatch(externalEventAction({
			handler: onTouchStart,
			reactEvent: e
		}));
	}, [dispatch, onTouchStart]);
	var myOnTouchMove = useCallback((e) => {
		if (dispatchTouchEvents) dispatch(touchEventAction(e));
		dispatch(externalEventAction({
			handler: onTouchMove,
			reactEvent: e
		}));
	}, [
		dispatch,
		dispatchTouchEvents,
		onTouchMove
	]);
	var myOnTouchEnd = useCallback((e) => {
		dispatch(externalEventAction({
			handler: onTouchEnd,
			reactEvent: e
		}));
	}, [dispatch, onTouchEnd]);
	var WrapperDiv = getWrapperDivComponent(responsive);
	return /* @__PURE__ */ React.createElement(TooltipPortalContext.Provider, { value: tooltipPortal }, /* @__PURE__ */ React.createElement(LegendPortalContext.Provider, { value: legendPortal }, /* @__PURE__ */ React.createElement(WrapperDiv, {
		width: width !== null && width !== void 0 ? width : style === null || style === void 0 ? void 0 : style.width,
		height: height !== null && height !== void 0 ? height : style === null || style === void 0 ? void 0 : style.height,
		className: clsx("recharts-wrapper", className),
		style: _objectSpread$1({
			position: "relative",
			cursor: "default",
			width,
			height
		}, style),
		onClick: myOnClick,
		onContextMenu: myOnContextMenu,
		onDoubleClick: myOnDoubleClick,
		onFocus,
		onBlur,
		onKeyDown,
		onMouseDown: myOnMouseDown,
		onMouseEnter: myOnMouseEnter,
		onMouseLeave: myOnMouseLeave,
		onMouseMove: myOnMouseMove,
		onMouseUp: myOnMouseUp,
		onTouchEnd: myOnTouchEnd,
		onTouchMove: myOnTouchMove,
		onTouchStart: myOnTouchStart,
		ref: innerRef
	}, /* @__PURE__ */ React.createElement(EventSynchronizer, null), children)));
});
//#endregion
//#region node_modules/recharts/es6/chart/CategoricalChart.js
var _excluded = [
	"width",
	"height",
	"responsive",
	"children",
	"className",
	"style",
	"compact",
	"title",
	"desc"
];
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
var CategoricalChart = /* @__PURE__ */ forwardRef((props, ref) => {
	var { width, height, responsive, children, className, style, compact, title, desc } = props;
	var attrs = svgPropertiesNoEvents(_objectWithoutProperties(props, _excluded));
	if (compact) return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportChartSize, {
		width,
		height
	}), /* @__PURE__ */ React.createElement(RootSurface, {
		otherAttributes: attrs,
		title,
		desc
	}, children));
	return /* @__PURE__ */ React.createElement(RechartsWrapper, {
		className,
		style,
		width,
		height,
		responsive: responsive !== null && responsive !== void 0 ? responsive : false,
		onClick: props.onClick,
		onMouseLeave: props.onMouseLeave,
		onMouseEnter: props.onMouseEnter,
		onMouseMove: props.onMouseMove,
		onMouseDown: props.onMouseDown,
		onMouseUp: props.onMouseUp,
		onContextMenu: props.onContextMenu,
		onDoubleClick: props.onDoubleClick,
		onTouchStart: props.onTouchStart,
		onTouchMove: props.onTouchMove,
		onTouchEnd: props.onTouchEnd
	}, /* @__PURE__ */ React.createElement(RootSurface, {
		otherAttributes: attrs,
		title,
		desc,
		ref
	}, /* @__PURE__ */ React.createElement(ClipPathProvider, null, children)));
});
//#endregion
//#region node_modules/recharts/es6/chart/CartesianChart.js
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var defaultCartesianChartProps = _objectSpread({
	accessibilityLayer: true,
	barCategoryGap: "10%",
	barGap: 4,
	layout: "horizontal",
	margin: {
		top: 5,
		right: 5,
		bottom: 5,
		left: 5
	},
	responsive: false,
	reverseStackOrder: false,
	stackOffset: "none",
	syncMethod: "index"
}, initialEventSettingsState);
/**
* These are one-time, immutable options that decide the chart's behavior.
* Users who wish to call CartesianChart may decide to pass these options explicitly,
* but usually we would expect that they use one of the convenience components like BarChart, LineChart, etc.
*/
var CartesianChart = /* @__PURE__ */ forwardRef(function CartesianChart(props, ref) {
	var _categoricalChartProp;
	var rootChartProps = resolveDefaultProps(props.categoricalChartProps, defaultCartesianChartProps);
	var { chartName, defaultTooltipEventType, validateTooltipEventTypes, tooltipPayloadSearcher, categoricalChartProps } = props;
	var options = {
		chartName,
		defaultTooltipEventType,
		validateTooltipEventTypes,
		tooltipPayloadSearcher,
		eventEmitter: void 0
	};
	return /* @__PURE__ */ React.createElement(RechartsStoreProvider, {
		preloadedState: { options },
		reduxStoreName: (_categoricalChartProp = categoricalChartProps.id) !== null && _categoricalChartProp !== void 0 ? _categoricalChartProp : chartName
	}, /* @__PURE__ */ React.createElement(ChartDataContextProvider, { chartData: categoricalChartProps.data }), /* @__PURE__ */ React.createElement(ReportMainChartProps, {
		layout: rootChartProps.layout,
		margin: rootChartProps.margin
	}), /* @__PURE__ */ React.createElement(ReportEventSettings, {
		throttleDelay: rootChartProps.throttleDelay,
		throttledEvents: rootChartProps.throttledEvents
	}), /* @__PURE__ */ React.createElement(ReportChartProps, {
		baseValue: rootChartProps.baseValue,
		accessibilityLayer: rootChartProps.accessibilityLayer,
		barCategoryGap: rootChartProps.barCategoryGap,
		maxBarSize: rootChartProps.maxBarSize,
		stackOffset: rootChartProps.stackOffset,
		barGap: rootChartProps.barGap,
		barSize: rootChartProps.barSize,
		syncId: rootChartProps.syncId,
		syncMethod: rootChartProps.syncMethod,
		className: rootChartProps.className,
		reverseStackOrder: rootChartProps.reverseStackOrder
	}), /* @__PURE__ */ React.createElement(CategoricalChart, _extends({}, rootChartProps, { ref })));
});
//#endregion
//#region node_modules/recharts/es6/chart/BarChart.js
var allowedTooltipTypes = ["axis", "item"];
/**
* @consumes ResponsiveContainerContext
* @provides CartesianViewBoxContext
* @provides CartesianChartContext
*/
var BarChart = /* @__PURE__ */ forwardRef((props, ref) => {
	return /* @__PURE__ */ React.createElement(CartesianChart, {
		chartName: "BarChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: allowedTooltipTypes,
		tooltipPayloadSearcher: arrayTooltipSearcher,
		categoricalChartProps: props,
		ref
	});
});
//#endregion
//#region app/components/HarvestTrend.tsx
var plantTypeColors$1 = {
	herb: "#3a7a45",
	vegetable: "#4a9e4a",
	fruit: "#e05d2b",
	flower: "#d83b8c",
	shrub: "#6c9e50",
	tree: "#2d6036",
	vine: "#c08a00"
};
function HarvestTrend({ plant }) {
	const harvests = plant.harvests ?? [];
	if (harvests.length < 2) return /* @__PURE__ */ jsx("div", {
		className: "flex h-40 items-center justify-center text-sm text-text-faint",
		children: "Chart appears after 2+ harvests"
	});
	const color = plantTypeColors$1[plant.plant_type] ?? "#3a7a45";
	return /* @__PURE__ */ jsx("div", {
		className: "h-40",
		children: /* @__PURE__ */ jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ jsxs(BarChart, {
				data: [...harvests].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).map((h) => ({
					date: new Date(h.created_at).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric"
					}),
					value: h.amount
				})),
				children: [
					/* @__PURE__ */ jsx(CartesianGrid, {
						strokeDasharray: "3 3",
						opacity: .2
					}),
					/* @__PURE__ */ jsx(XAxis, {
						dataKey: "date",
						tick: {
							fontSize: 11,
							fill: "var(--color-text-muted)"
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ jsx(YAxis, {
						tick: {
							fontSize: 11,
							fill: "var(--color-text-muted)"
						},
						axisLine: false,
						tickLine: false,
						width: 30
					}),
					/* @__PURE__ */ jsx(Tooltip, {}),
					/* @__PURE__ */ jsx(Bar, {
						dataKey: "value",
						fill: color,
						radius: [
							4,
							4,
							0,
							0
						]
					})
				]
			})
		})
	});
}
//#endregion
//#region app/routes/_app.gardens.$gardenSlug._index.tsx
var _app_gardens_$gardenSlug__index_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary$1,
	action: () => action$3,
	default: () => _app_gardens_$gardenSlug__index_default,
	loader: () => loader$3
});
var now = Date.now();
var plantTypeColors = {
	herb: "#3a7a45",
	vegetable: "#4a9e4a",
	fruit: "#e05d2b",
	flower: "#d83b8c",
	shrub: "#6c9e50",
	tree: "#2d6036",
	vine: "#c08a00"
};
function growthDuration(dateStr) {
	const days = (now - new Date(dateStr).getTime()) / 864e5;
	if (days >= 365) return {
		value: (days / 365).toFixed(1),
		label: "Years Growing"
	};
	return {
		value: Math.round(days),
		label: "Days Growing"
	};
}
function plantedFormatted(dateStr) {
	return new Date(dateStr).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
async function loader$3({ request, params }) {
	return { notes: await listGardenNotes(await requireToken(request), params.gardenSlug) };
}
async function action$3({ request, params }) {
	const token = await requireToken(request);
	const form = await request.formData();
	const intent = form.get("intent");
	if (intent === "create_plant") {
		const plant_type = String(form.get("plant_type") ?? "");
		const species = String(form.get("species") ?? "");
		const variety = String(form.get("variety") ?? "") || void 0;
		const plot = String(form.get("plot") ?? "") || void 0;
		const planted_date = String(form.get("planted_date") ?? "") || void 0;
		if (!species || !plant_type) return { error: "Plant type and species are required." };
		try {
			return {
				ok: true,
				plantId: (await createPlant(token, params.gardenSlug, {
					plant_type,
					species,
					variety,
					plot,
					planted_date
				})).id
			};
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Something went wrong. Please try again." };
		}
	}
	if (intent === "update_plant") {
		const plantId = String(form.get("plant_id") ?? "");
		const variety = String(form.get("variety") ?? "") || void 0;
		const plot = String(form.get("plot") ?? "") || void 0;
		const planted_date = String(form.get("planted_date") ?? "") || void 0;
		try {
			await updatePlant(token, params.gardenSlug, plantId, {
				variety,
				plot,
				planted_date
			});
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Something went wrong. Please try again." };
		}
	}
	if (intent === "delete_plant") {
		const plantId = String(form.get("plant_id") ?? "");
		try {
			await deletePlant(token, params.gardenSlug, plantId);
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Failed to delete plant." };
		}
	}
	if (intent === "create_note") {
		const plantId = String(form.get("plant_id") ?? "");
		const label = String(form.get("label") ?? "note");
		const note = String(form.get("note") ?? "") || void 0;
		try {
			await createNote(token, params.gardenSlug, plantId, {
				label,
				note
			});
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Failed to create note." };
		}
	}
	if (intent === "update_note") {
		const plantId = String(form.get("plant_id") ?? "");
		const noteId = String(form.get("note_id") ?? "");
		const label = String(form.get("label") ?? "") || void 0;
		const note = String(form.get("note") ?? "") || void 0;
		try {
			await updateNote(token, params.gardenSlug, plantId, noteId, {
				label,
				note
			});
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Failed to update note." };
		}
	}
	if (intent === "delete_note") {
		const plantId = String(form.get("plant_id") ?? "");
		const noteId = String(form.get("note_id") ?? "");
		try {
			await deleteNote(token, params.gardenSlug, plantId, noteId);
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Failed to delete note." };
		}
	}
	if (intent === "create_garden_note") {
		const label = String(form.get("label") ?? "note");
		const note = String(form.get("note") ?? "") || void 0;
		try {
			await createGardenNote(token, params.gardenSlug, {
				label,
				note
			});
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Failed to create note." };
		}
	}
	if (intent === "update_garden_note") {
		const noteId = String(form.get("note_id") ?? "");
		const label = String(form.get("label") ?? "") || void 0;
		const note = String(form.get("note") ?? "") || void 0;
		const created_at = String(form.get("created_at") ?? "") || void 0;
		try {
			await updateGardenNote(token, params.gardenSlug, noteId, {
				label,
				note,
				created_at
			});
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Failed to update note." };
		}
	}
	if (intent === "delete_garden_note") {
		const noteId = String(form.get("note_id") ?? "");
		try {
			await deleteGardenNote(token, params.gardenSlug, noteId);
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Failed to delete note." };
		}
	}
	if (intent === "create_harvest") {
		const plantId = String(form.get("plant_id") ?? "");
		const amount = Number(form.get("amount"));
		const unit = String(form.get("unit") ?? "");
		if (!amount || !unit) return { error: "Amount and unit are required." };
		try {
			await createHarvest(token, params.gardenSlug, plantId, {
				amount,
				unit
			});
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Failed to record harvest." };
		}
	}
	if (intent === "update_harvest") {
		const plantId = String(form.get("plant_id") ?? "");
		const harvestId = String(form.get("harvest_id") ?? "");
		const amountRaw = form.get("amount");
		const amount = amountRaw ? Number(amountRaw) : void 0;
		try {
			await updateHarvest(token, params.gardenSlug, plantId, harvestId, { amount });
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Failed to update harvest." };
		}
	}
	if (intent === "delete_harvest") {
		const plantId = String(form.get("plant_id") ?? "");
		const harvestId = String(form.get("harvest_id") ?? "");
		try {
			await deleteHarvest(token, params.gardenSlug, plantId, harvestId);
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Failed to delete harvest." };
		}
	}
	if (intent === "generate_care_info") {
		const plantId = String(form.get("plant_id") ?? "");
		try {
			await getPlantCareInfo(token, params.gardenSlug, plantId);
			return { ok: true };
		} catch (err) {
			if (err instanceof ApiClientError) return { error: err.message };
			return { error: "Failed to generate care information." };
		}
	}
	return null;
}
function PlantDetail({ plant, onEditPlant }) {
	const isGeneratingCare = useNavigation().state === "submitting";
	const notes = plant.notes ?? [];
	const careInfo = plant.care_info;
	const color = plantTypeColors[plant.plant_type];
	const careTabs = careInfo ? [
		{
			key: "summary",
			label: "Summary",
			content: careInfo.summary
		},
		{
			key: "planting",
			label: "Planting",
			content: careInfo.planting
		},
		{
			key: "care",
			label: "Care",
			content: careInfo.care
		},
		{
			key: "harvesting",
			label: "Harvesting",
			content: careInfo.harvesting
		}
	].filter((t) => t.content) : [];
	const [activeTab, setActiveTab] = useState(() => careTabs[0]?.key ?? "summary");
	const [noteModal, setNoteModal] = useState(null);
	const [harvestModal, setHarvestModal] = useState(null);
	const harvests = plant.harvests ?? [];
	const sortedHarvests = [...harvests].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
	const totalHarvested = harvests.reduce((sum, h) => sum + h.amount, 0);
	const harvestTotal = totalHarvested % 1 === 0 ? totalHarvested : parseFloat(totalHarvested.toFixed(2));
	const daysSincePlanted = plant.planted_date ? Math.floor((now - new Date(plant.planted_date).getTime()) / 864e5) : 0;
	const ringPercent = Math.min(100, Math.round(daysSincePlanted / 365 * 100));
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("header", {
			className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("h1", {
				className: "font-display text-[clamp(1.8rem,2vw+1rem,2.9rem)] leading-none capitalize",
				children: [
					plant.variety,
					" ",
					plant.species
				]
			}), /* @__PURE__ */ jsxs("p", {
				className: "mt-2 text-sm text-text-muted sm:text-base",
				children: [
					plant.latin_name && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("em", { children: plant.latin_name }), " · "] }),
					plant.plot && /* @__PURE__ */ jsxs(Fragment, { children: [
						"Bed ",
						plant.plot,
						" · "
					] }),
					plant.planted_date ? /* @__PURE__ */ jsxs(Fragment, { children: ["Planted ", plantedFormatted(plant.planted_date)] }) : "No planting date"
				]
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(PlantStatusBadge, { type: plant.plant_type }), /* @__PURE__ */ jsx("button", {
					onClick: onEditPlant,
					className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main",
					children: "Edit"
				})]
			})]
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: [
				plant.planted_date && (() => {
					const { value, label } = growthDuration(plant.planted_date);
					return /* @__PURE__ */ jsx(PlantKPICard, {
						label,
						value,
						meta: "since planting",
						Icon: Calendar
					});
				})(),
				/* @__PURE__ */ jsx(PlantKPICard, {
					label: "Total Harvested",
					value: harvests.length > 0 ? harvestTotal : "—",
					meta: harvests.length === 0 ? "no harvests yet" : `${plant.harvest_unit} · ${harvests.length} ${harvests.length === 1 ? "harvest" : "harvests"}`,
					Icon: Wheat
				}),
				plant.planted_date && /* @__PURE__ */ jsx(SeasonProgressCard, { plantedDate: plant.planted_date })
			]
		}),
		plant.planted_date && /* @__PURE__ */ jsxs("section", {
			className: "mt-6 grid gap-6 xl:grid-cols-2",
			children: [/* @__PURE__ */ jsxs("article", {
				className: "rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-5 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
						children: "Harvest History"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setHarvestModal({
							mode: "create",
							plantId: plant.id,
							harvestUnit: plant.harvest_unit ?? void 0
						}),
						className: "inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary-strong",
						children: "+ Add Harvest"
					})]
				}), sortedHarvests.length === 0 ? /* @__PURE__ */ jsx("div", {
					className: "py-10 text-center text-sm text-text-faint",
					children: "No harvests recorded yet"
				}) : /* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: sortedHarvests.map((h) => /* @__PURE__ */ jsx("button", {
						onClick: () => setHarvestModal({
							mode: "view",
							harvest: h,
							plantId: plant.id
						}),
						className: "w-full rounded-2xl border border-black/[0.06] bg-bg px-4 py-3 text-left transition hover:bg-black/[0.03]",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "font-display text-2xl leading-none text-text-main",
								children: [h.amount != null ? h.amount : "—", h.unit && /* @__PURE__ */ jsx("span", {
									className: "ml-1 text-base text-text-muted",
									children: h.unit
								})]
							}), /* @__PURE__ */ jsx("span", {
								className: "text-xs text-text-faint",
								children: new Date(h.created_at).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric"
								})
							})]
						})
					}, h.id))
				})]
			}), /* @__PURE__ */ jsxs("article", {
				className: "rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
						children: [/* @__PURE__ */ jsx(TrendingUp, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ jsx("span", { children: "Season Progress" })]
					}),
					/* @__PURE__ */ jsx(ProgressRing, {
						percent: ringPercent,
						days: daysSincePlanted,
						color
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 border-t border-black/10 pt-5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
							children: [/* @__PURE__ */ jsx(ChartNoAxesCombined, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ jsx("span", { children: "Harvest Trend" })]
						}), /* @__PURE__ */ jsx(HarvestTrend, { plant })]
					})
				]
			})]
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mt-6",
			children: /* @__PURE__ */ jsxs("article", {
				className: "rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-5 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
						children: "Garden Log"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setNoteModal({
							mode: "create",
							plantId: plant.id
						}),
						className: "inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary-strong",
						children: "+ Add a Note"
					})]
				}), /* @__PURE__ */ jsx(PlantNoteTimeline, {
					notes,
					color,
					onNoteClick: (note) => setNoteModal({
						mode: "view",
						note,
						plantId: plant.id
					})
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "mt-6",
			children: [careInfo && careTabs.length > 0 ? /* @__PURE__ */ jsxs("article", {
				className: "rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
							children: ["Care Information", careInfo.latin_name && /* @__PURE__ */ jsx("em", {
								className: "ml-2 not-italic italic text-text-faint",
								children: careInfo.latin_name
							})]
						}), /* @__PURE__ */ jsxs(Form, {
							method: "post",
							children: [
								/* @__PURE__ */ jsx("input", {
									type: "hidden",
									name: "intent",
									value: "generate_care_info"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "hidden",
									name: "plant_id",
									value: plant.id
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "group relative",
									children: [/* @__PURE__ */ jsx("button", {
										type: "submit",
										disabled: isGeneratingCare,
										className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main disabled:pointer-events-none disabled:opacity-50",
										children: isGeneratingCare ? "Regenerating…" : "Regenerate"
									}), /* @__PURE__ */ jsx("span", {
										className: "pointer-events-none absolute bottom-full right-0 mb-1.5 w-max max-w-[180px] rounded-lg bg-gray-900 px-2.5 py-1.5 text-center text-[11px] leading-snug text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100",
										children: isGeneratingCare ? "Regenerating care info…" : "Regenerate AI-powered care info"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex gap-1 border-b border-black/10 pb-0",
						children: careTabs.map((tab) => /* @__PURE__ */ jsx("button", {
							onClick: () => setActiveTab(tab.key),
							className: ["px-3 py-2 text-xs font-semibold transition", activeTab === tab.key ? "border-b-2 border-primary text-primary" : "text-text-muted hover:text-text-main"].join(" "),
							children: tab.label
						}, tab.key))
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-sm leading-7 text-text-main whitespace-pre-line",
						children: careTabs.find((t) => t.key === activeTab)?.content
					})
				]
			}) : /* @__PURE__ */ jsxs("article", {
				className: "rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
					children: "Care Information"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center gap-4 py-8 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm text-text-faint",
						children: "No care information generated yet."
					}), /* @__PURE__ */ jsxs(Form, {
						method: "post",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "hidden",
								name: "intent",
								value: "generate_care_info"
							}),
							/* @__PURE__ */ jsx("input", {
								type: "hidden",
								name: "plant_id",
								value: plant.id
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "group relative",
								children: [/* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: isGeneratingCare,
									className: "inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-strong disabled:pointer-events-none disabled:opacity-50",
									children: isGeneratingCare ? "Generating…" : "Generate care info"
								}), /* @__PURE__ */ jsx("span", {
									className: "pointer-events-none absolute bottom-full left-1/2 mb-3 w-max max-w-[300px] -translate-x-1/2 rounded-lg border-green-200 bg-green-50 px-2.5 py-1.5 text-center text-[14px] leading-snug text-green-700 opacity-0 shadow-md transition-opacity group-hover:opacity-100",
									children: isGeneratingCare ? "Generating care info…" : "Generate AI-powered care information based on your plant species and variety, and your garden's location."
								})]
							})
						]
					})]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "rounded-md border border-divider bg-primary-soft mt-5 px-4 py-3",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs font-semibold text-text-main",
					children: "AI-Generated Content Disclaimer"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-xs",
					children: "This content was generated with the assistance of artificial intelligence. While AI tools can be helpful, they may produce inaccurate, incomplete, or outdated information. Please review and verify any important details before relying on this content."
				})]
			})]
		}),
		/* @__PURE__ */ jsx(NoteModal, {
			state: noteModal,
			onClose: () => setNoteModal(null),
			onEdit: (note, plantId) => setNoteModal({
				mode: "edit",
				note,
				plantId
			})
		}),
		/* @__PURE__ */ jsx(HarvestModal, {
			state: harvestModal,
			onClose: () => setHarvestModal(null),
			onEdit: (harvest, plantId) => setHarvestModal({
				mode: "edit",
				harvest,
				plantId
			})
		})
	] });
}
function GardenDashboardView({ garden, plants, notes, onAddPlant, activeTypeFilter, onToggleTypeFilter }) {
	const [gardenNoteModal, setGardenNoteModal] = useState(null);
	const ageYears = (now - new Date(garden.created_at).getTime()) / (365.25 * 864e5);
	const ageDisplay = ageYears >= 1 ? `${Math.floor(ageYears)} yr${Math.floor(ageYears) !== 1 ? "s" : ""}` : `${Math.max(1, Math.round(ageYears * 12))} mo`;
	const byType = plants.reduce((acc, p) => {
		acc[p.plant_type] = (acc[p.plant_type] ?? 0) + 1;
		return acc;
	}, {});
	const typeEntries = Object.entries(byType).sort((a, b) => b[1] - a[1]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		garden.description && /* @__PURE__ */ jsx("section", {
			className: "mb-6",
			children: /* @__PURE__ */ jsxs("article", {
				className: "rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
					children: "Description"
				}), /* @__PURE__ */ jsx("p", {
					className: "text-sm leading-7 text-text-main",
					children: garden.description
				})]
			})
		}),
		/* @__PURE__ */ jsxs("section", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ jsx(PlantKPICard, {
				label: "Garden Age",
				value: ageDisplay,
				meta: "since the garden was created",
				Icon: Calendar
			}), /* @__PURE__ */ jsx(PlantKPICard, {
				label: "Total Plants",
				value: plants.length,
				meta: typeEntries.length === 0 ? "no plants yet" : `across ${typeEntries.length} type${typeEntries.length !== 1 ? "s" : ""}`,
				Icon: Sprout
			})]
		}),
		typeEntries.length > 0 && /* @__PURE__ */ jsx("section", {
			className: "mt-6",
			children: /* @__PURE__ */ jsxs("article", {
				className: "rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("div", {
						className: "text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
						children: "Plants by Type"
					}), activeTypeFilter && /* @__PURE__ */ jsx("button", {
						onClick: () => onToggleTypeFilter(activeTypeFilter),
						className: "cursor-pointer text-xs font-medium text-primary hover:text-primary-strong",
						children: "Clear filter"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4",
					children: typeEntries.map(([type, count]) => /* @__PURE__ */ jsxs("button", {
						onClick: () => onToggleTypeFilter(type),
						className: ["flex cursor-pointer items-center gap-2.5 rounded-2xl border px-4 py-3 text-left transition", activeTypeFilter === type ? "border-primary/40 bg-primary-soft ring-1 ring-primary/40" : "border-black/[0.06] bg-bg hover:bg-black/[0.03]"].join(" "),
						children: [/* @__PURE__ */ jsx("span", {
							className: "h-2.5 w-2.5 shrink-0 rounded-full",
							style: { backgroundColor: plantTypeColors[type] }
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium capitalize text-text-main",
							children: type
						}), /* @__PURE__ */ jsxs("p", {
							className: "text-xs text-text-faint",
							children: [
								count,
								" plant",
								count !== 1 ? "s" : ""
							]
						})] })]
					}, type))
				})]
			})
		}),
		/* @__PURE__ */ jsx("section", {
			className: "mt-6",
			children: /* @__PURE__ */ jsxs("article", {
				className: "rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-5 flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
						children: "Garden Notes"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => setGardenNoteModal({ mode: "create" }),
						className: "inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white transition hover:bg-primary-strong",
						children: "+ Add a Note"
					})]
				}), /* @__PURE__ */ jsx(GardenNoteTimeline, {
					notes,
					color: "#3a7a45",
					onNoteClick: (note) => setGardenNoteModal({
						mode: "view",
						note
					})
				})]
			})
		}),
		/* @__PURE__ */ jsx("div", {
			className: "mt-8",
			children: /* @__PURE__ */ jsx("button", {
				onClick: onAddPlant,
				className: "inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-strong",
				children: "+ Add a plant"
			})
		}),
		/* @__PURE__ */ jsx(GardenNoteModal, {
			state: gardenNoteModal,
			onClose: () => setGardenNoteModal(null),
			onEdit: (note) => setGardenNoteModal({
				mode: "edit",
				note
			})
		})
	] });
}
function MobilePlantPicker({ plants, selectedId, onSelect, typeFilter, onClearTypeFilter }) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const selectedPlant = plants.find((p) => p.id === selectedId) ?? null;
	const label = selectedPlant ? [selectedPlant.species, selectedPlant.variety].filter(Boolean).join(" ") : "Dashboard";
	const needle = query.trim().toLowerCase();
	const filtered = needle ? plants.filter((p) => p.species.toLowerCase().includes(needle) || (p.variety ?? "").toLowerCase().includes(needle)) : plants;
	const close = () => {
		setOpen(false);
		setQuery("");
	};
	const handleSelect = (id) => {
		onSelect(id);
		close();
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "lg:hidden border-b border-black/10 px-4 py-3",
		children: [typeFilter && /* @__PURE__ */ jsx("div", {
			className: "mb-2 flex items-center gap-1.5",
			children: /* @__PURE__ */ jsxs("span", {
				className: "inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "h-2 w-2 shrink-0 rounded-full",
						style: { backgroundColor: plantTypeColors[typeFilter] }
					}),
					/* @__PURE__ */ jsx("span", {
						className: "capitalize",
						children: typeFilter
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: onClearTypeFilter,
						"aria-label": "Clear type filter",
						children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
					})
				]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative",
			children: [
				open && /* @__PURE__ */ jsx("div", {
					className: "fixed inset-0 z-20",
					onClick: close
				}),
				/* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setOpen((o) => !o),
					className: "flex w-full items-center justify-between rounded-xl border border-black/10 bg-surface px-4 py-2.5 text-sm text-text-main transition hover:bg-surface-offset",
					children: [/* @__PURE__ */ jsx("span", {
						className: "capitalize",
						children: label
					}), /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 shrink-0 text-text-faint transition-transform ${open ? "rotate-180" : ""}` })]
				}),
				open && /* @__PURE__ */ jsxs("div", {
					className: "absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-xl border border-black/10 bg-surface shadow-lg",
					children: [/* @__PURE__ */ jsx("div", {
						className: "p-2",
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-faint" }), /* @__PURE__ */ jsx("input", {
								type: "search",
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search plants…",
								autoFocus: true,
								className: "w-full rounded-lg border border-black/10 bg-bg py-2 pl-8 pr-3 text-sm text-text-main placeholder:text-text-faint focus:outline-none focus:ring-1 focus:ring-primary/40"
							})]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "max-h-64 overflow-y-auto pb-2",
						children: [!needle && /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => handleSelect(null),
							className: ["flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition", selectedId === null ? "bg-primary-soft font-medium text-primary" : "text-text-muted hover:bg-surface-offset hover:text-text-main"].join(" "),
							children: [/* @__PURE__ */ jsx(LayoutDashboard, { className: "h-3.5 w-3.5 shrink-0" }), "Dashboard"]
						}), filtered.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "px-4 py-3 text-sm text-text-faint",
							children: "No plants match."
						}) : filtered.map((plant) => /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => handleSelect(plant.id),
							className: ["flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition", selectedId === plant.id ? "bg-primary-soft font-medium text-primary" : "text-text-muted hover:bg-surface-offset hover:text-text-main"].join(" "),
							children: [/* @__PURE__ */ jsx("span", {
								className: "h-2 w-2 shrink-0 rounded-full",
								style: { backgroundColor: plantTypeColors[plant.plant_type] }
							}), /* @__PURE__ */ jsxs("span", {
								className: "capitalize",
								children: [plant.species, plant.variety && /* @__PURE__ */ jsx("em", {
									className: "ml-1 not-italic text-text-faint capitalize",
									children: plant.variety
								})]
							})]
						}, plant.id))]
					})]
				})
			]
		})]
	});
}
var _app_gardens_$gardenSlug__index_default = UNSAFE_withComponentProps(function GardenDashboard({ loaderData }) {
	const { notes } = loaderData;
	const { garden, plants } = useOutletContext();
	const [searchParams] = useSearchParams();
	const [selectedId, setSelectedId] = useState(() => {
		const paramId = searchParams.get("plant");
		if (paramId && plants.some((p) => p.id === paramId)) return paramId;
		return null;
	});
	const [plantModal, setPlantModal] = useState(null);
	const [typeFilter, setTypeFilter] = useState(null);
	const toggleTypeFilter = (type) => {
		setTypeFilter((current) => current === type ? null : type);
	};
	const effectiveSelectedId = selectedId !== null && plants.some((p) => p.id === selectedId) ? selectedId : null;
	const selectedPlant = plants.find((p) => p.id === effectiveSelectedId) ?? null;
	const sidebarPlants = typeFilter ? plants.filter((p) => p.plant_type === typeFilter) : plants;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex",
		children: [
			/* @__PURE__ */ jsx(PlantSidebar, {
				plants: sidebarPlants,
				gardenName: garden.name,
				selectedId: effectiveSelectedId,
				showDashboard: effectiveSelectedId === null,
				onSelect: setSelectedId,
				onAddPlant: () => setPlantModal({ mode: "create" }),
				onShowDashboard: () => setSelectedId(null),
				typeFilter,
				onClearTypeFilter: () => setTypeFilter(null)
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ jsx(MobilePlantPicker, {
					plants: sidebarPlants,
					selectedId: effectiveSelectedId,
					onSelect: setSelectedId,
					typeFilter,
					onClearTypeFilter: () => setTypeFilter(null)
				}), /* @__PURE__ */ jsxs("main", {
					className: "w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-8 flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 text-xs text-text-faint",
							children: [
								/* @__PURE__ */ jsx(Link, {
									to: "/gardens",
									className: "hover:text-text-muted transition-colors",
									children: "My Gardens"
								}),
								/* @__PURE__ */ jsx("span", { children: "/" }),
								/* @__PURE__ */ jsx("span", { children: garden.name })
							]
						}), garden.location && /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-sm text-text-muted",
							children: garden.location
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx(Link, {
								to: `/gardens/${garden.slug}/members`,
								className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main",
								children: "Members"
							}), /* @__PURE__ */ jsx(Link, {
								to: `/gardens/${garden.slug}/edit`,
								className: "inline-flex items-center rounded-full border border-black/10 bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition hover:bg-surface-offset hover:text-text-main",
								children: "Edit garden"
							})]
						})]
					}), selectedPlant ? /* @__PURE__ */ jsx(PlantDetail, {
						plant: selectedPlant,
						onEditPlant: () => setPlantModal({
							mode: "edit",
							plant: selectedPlant
						})
					}) : /* @__PURE__ */ jsx(GardenDashboardView, {
						garden,
						plants,
						notes,
						onAddPlant: () => setPlantModal({ mode: "create" }),
						activeTypeFilter: typeFilter,
						onToggleTypeFilter: toggleTypeFilter
					})]
				})]
			}),
			/* @__PURE__ */ jsx(PlantModal, {
				state: plantModal,
				onClose: () => setPlantModal(null),
				onCreated: (plantId) => setSelectedId(plantId)
			})
		]
	});
});
var ErrorBoundary$1 = UNSAFE_withErrorBoundaryProps(function ErrorBoundary() {
	const error = useRouteError();
	const is404 = isRouteErrorResponse(error) && error.status === 404;
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-4xl font-bold text-primary",
			children: is404 ? "404" : "Error"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-3 text-text-muted",
			children: is404 ? "Garden not found." : "Failed to load garden."
		})]
	});
});
//#endregion
//#region app/routes/_app.gardens.$gardenSlug.edit.tsx
var _app_gardens_$gardenSlug_edit_exports = /* @__PURE__ */ __exportAll({
	action: () => action$2,
	default: () => _app_gardens_$gardenSlug_edit_default,
	loader: () => loader$2,
	meta: () => meta$2
});
function meta$2({ data }) {
	return [{ title: `Edit ${data?.garden.name ?? "Garden"} — harvesting.food` }];
}
async function loader$2({ request, params }) {
	return { garden: await getGarden(await requireToken(request), params.gardenSlug) };
}
async function action$2({ request, params }) {
	const token = await requireToken(request);
	const form = await request.formData();
	if (form.get("intent") === "delete") try {
		const [me, members] = await Promise.all([getMe(token), listMembers(token, params.gardenSlug)]);
		if (!members.some((m) => m.user_id === me.id && m.role === "owner")) return { error: "Only garden owners can delete this garden." };
		await deleteGarden(token, params.gardenSlug);
		return redirect("/gardens");
	} catch (err) {
		if (err instanceof ApiClientError) return { error: err.message };
		return { error: "Failed to delete garden." };
	}
	const name = String(form.get("name") ?? "") || void 0;
	const location = String(form.get("location") ?? "") || void 0;
	const description = String(form.get("description") ?? "") || void 0;
	try {
		return redirect(`/gardens/${(await updateGarden(token, params.gardenSlug, {
			name,
			location,
			description
		})).slug}`);
	} catch (err) {
		if (err instanceof ApiClientError) return { error: err.message };
		return { error: "Something went wrong. Please try again." };
	}
}
var _app_gardens_$gardenSlug_edit_default = UNSAFE_withComponentProps(function EditGarden() {
	const { garden } = useLoaderData();
	const { isOwner } = useOutletContext();
	const actionData = useActionData();
	return /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-2xl font-bold text-gray-900 mb-6",
					children: "Edit Garden"
				}),
				/* @__PURE__ */ jsx(GardenForm, {
					defaultValues: garden,
					error: actionData?.error,
					submitLabel: "Save changes"
				}),
				isOwner && /* @__PURE__ */ jsxs("div", {
					className: "mt-8 border-t border-black/10 pt-6",
					children: [/* @__PURE__ */ jsx("p", {
						className: "mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-faint",
						children: "Danger Zone"
					}), /* @__PURE__ */ jsxs(Form, {
						method: "post",
						children: [/* @__PURE__ */ jsx("input", {
							type: "hidden",
							name: "intent",
							value: "delete"
						}), /* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "inline-flex items-center rounded-full border border-red-200/60 bg-surface px-3 py-1.5 text-xs font-medium text-orange transition hover:bg-orange-soft",
							onClick: (e) => {
								if (!confirm(`Delete "${garden.name}"? This cannot be undone.`)) e.preventDefault();
							},
							children: "Delete garden"
						})]
					})]
				})
			]
		})
	});
});
//#endregion
//#region app/routes/_app.gardens.$gardenSlug.members.tsx
var _app_gardens_$gardenSlug_members_exports = /* @__PURE__ */ __exportAll({
	action: () => action$1,
	default: () => _app_gardens_$gardenSlug_members_default,
	loader: () => loader$1,
	meta: () => meta$1
});
function meta$1({ data }) {
	return [{ title: `Members — ${data?.garden.name ?? "Garden"} — harvesting.food` }];
}
async function loader$1({ request, params }) {
	const token = await requireToken(request);
	const [garden, members, currentUser] = await Promise.all([
		getGarden(token, params.gardenSlug),
		listMembers(token, params.gardenSlug),
		getMe(token)
	]);
	return {
		garden,
		members,
		currentUserId: currentUser.id
	};
}
async function action$1({ request, params }) {
	const token = await requireToken(request);
	const form = await request.formData();
	const intent = String(form.get("intent") ?? "");
	if (intent === "invite") {
		const email = String(form.get("email") ?? "").trim();
		if (!email) return {
			error: "Email is required.",
			invitation: null
		};
		try {
			return {
				error: null,
				invitation: await inviteMember(token, params.gardenSlug, email)
			};
		} catch (err) {
			if (err instanceof ApiClientError) return {
				error: err.message,
				invitation: null
			};
			return {
				error: "Failed to send invitation.",
				invitation: null
			};
		}
	}
	if (intent === "remove") {
		const userId = String(form.get("user_id") ?? "");
		try {
			await removeMember(token, params.gardenSlug, userId);
			return {
				error: null,
				invitation: null
			};
		} catch (err) {
			if (err instanceof ApiClientError) return {
				error: err.message,
				invitation: null
			};
			return {
				error: "Failed to remove member.",
				invitation: null
			};
		}
	}
	return {
		error: "Unknown action.",
		invitation: null
	};
}
var ROLE_LABELS = {
	owner: "Owner",
	member: "Member"
};
var ROLE_CLASSES = {
	owner: "bg-primary-soft text-primary",
	member: "bg-surface-offset text-text-muted"
};
var _app_gardens_$gardenSlug_members_default = UNSAFE_withComponentProps(function GardenMembers() {
	const { garden, members, currentUserId } = useLoaderData();
	const actionData = useActionData();
	const isOwner = members.find((m) => m.user_id === currentUserId)?.role === "owner";
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "mb-6 flex items-center gap-2 text-xs text-text-faint",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: "/gardens",
						className: "hover:text-text-muted transition-colors",
						children: "My Gardens"
					}),
					/* @__PURE__ */ jsx("span", { children: "/" }),
					/* @__PURE__ */ jsx(Link, {
						to: `/gardens/${garden.slug}`,
						className: "hover:text-text-muted transition-colors",
						children: garden.name
					}),
					/* @__PURE__ */ jsx("span", { children: "/" }),
					/* @__PURE__ */ jsx("span", { children: "Members" })
				]
			}),
			/* @__PURE__ */ jsx("h1", {
				className: "font-display text-[clamp(1.6rem,2vw+1rem,2.4rem)] leading-none mb-8",
				children: "Garden Members"
			}),
			actionData?.error && /* @__PURE__ */ jsx("div", {
				className: "mb-6 rounded-2xl border border-red-200/60 bg-red-50 px-4 py-3 text-sm text-orange",
				children: actionData.error
			}),
			actionData?.invitation && /* @__PURE__ */ jsxs("div", {
				className: "mb-6 rounded-2xl border border-green-200/60 bg-green-50 px-4 py-3 text-sm text-green-800",
				children: [
					"An invitation email has been sent to",
					" ",
					/* @__PURE__ */ jsx("span", {
						className: "font-medium",
						children: actionData.invitation.invited_email
					}),
					"."
				]
			}),
			/* @__PURE__ */ jsxs("article", {
				className: "rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6 mb-6",
				children: [/* @__PURE__ */ jsxs("p", {
					className: "mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
					children: [
						members.length,
						" ",
						members.length === 1 ? "Member" : "Members"
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "space-y-3",
					children: members.map((member) => {
						const name = member.user.first_name ? `${member.user.first_name}${member.user.last_name ? ` ${member.user.last_name}` : ""}` : null;
						const isCurrentUser = member.user_id === currentUserId;
						const canRemove = isOwner && member.role !== "owner" && !isCurrentUser;
						return /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between gap-4 rounded-2xl border border-black/[0.06] bg-bg px-4 py-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [name && /* @__PURE__ */ jsxs("p", {
									className: "truncate text-sm font-medium text-text-main",
									children: [name, isCurrentUser && /* @__PURE__ */ jsx("span", {
										className: "ml-1.5 text-xs text-text-faint",
										children: "(you)"
									})]
								}), /* @__PURE__ */ jsxs("p", {
									className: `truncate text-sm ${name ? "text-text-faint" : "font-medium text-text-main"}`,
									children: [member.user.email, !name && isCurrentUser && /* @__PURE__ */ jsx("span", {
										className: "ml-1.5 text-xs text-text-faint",
										children: "(you)"
									})]
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2 shrink-0",
								children: [/* @__PURE__ */ jsx("span", {
									className: `inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${ROLE_CLASSES[member.role]}`,
									children: ROLE_LABELS[member.role]
								}), canRemove && /* @__PURE__ */ jsxs(Form, {
									method: "post",
									children: [
										/* @__PURE__ */ jsx("input", {
											type: "hidden",
											name: "intent",
											value: "remove"
										}),
										/* @__PURE__ */ jsx("input", {
											type: "hidden",
											name: "user_id",
											value: member.user_id
										}),
										/* @__PURE__ */ jsx("button", {
											type: "submit",
											onClick: (e) => {
												if (!confirm(`Remove ${name ?? member.user.email} from this garden?`)) e.preventDefault();
											},
											className: "inline-flex items-center rounded-full border border-red-200/60 px-2.5 py-0.5 text-xs font-medium text-orange transition hover:bg-orange-soft",
											children: "Remove"
										})
									]
								})]
							})]
						}, member.id);
					})
				})]
			}),
			isOwner && /* @__PURE__ */ jsxs("article", {
				className: "rounded-3xl border border-black/10 bg-surface p-5 shadow-soft sm:p-6",
				children: [/* @__PURE__ */ jsx("p", {
					className: "mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted",
					children: "Invite someone"
				}), /* @__PURE__ */ jsxs(Form, {
					method: "post",
					className: "flex items-end gap-3",
					children: [
						/* @__PURE__ */ jsx("input", {
							type: "hidden",
							name: "intent",
							value: "invite"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1 flex flex-col gap-1",
							children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "email",
								className: "text-sm font-medium text-text-muted",
								children: "Email address"
							}), /* @__PURE__ */ jsx("input", {
								id: "email",
								type: "email",
								name: "email",
								required: true,
								placeholder: "friend@example.com",
								className: "rounded-xl border border-black/10 bg-bg px-3 py-2 text-sm text-text-main placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-primary/30"
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							className: "inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-strong",
							children: "Send invite"
						})
					]
				})]
			})
		]
	});
});
//#endregion
//#region app/routes/_app.gardens.$gardenSlug.plants.$plantId.tsx
var _app_gardens_$gardenSlug_plants_$plantId_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	action: () => action,
	default: () => _app_gardens_$gardenSlug_plants_$plantId_default,
	loader: () => loader,
	meta: () => meta
});
function meta({ data }) {
	return [{ title: `${data?.plant.species ?? "Plant"} — harvesting.food` }];
}
async function loader({ request, params }) {
	return {
		plant: await getPlant(await requireToken(request), params.gardenSlug, params.plantId),
		gardenSlug: params.gardenSlug
	};
}
async function action({ request, params }) {
	const token = await requireToken(request);
	const { gardenSlug, plantId } = params;
	try {
		await getPlantCareInfo(token, gardenSlug, plantId);
		return redirect(`/gardens/${gardenSlug}/plants/${plantId}`);
	} catch (err) {
		if (err instanceof ApiClientError) return { error: err.message };
		return { error: "Failed to generate care information." };
	}
}
var _app_gardens_$gardenSlug_plants_$plantId_default = UNSAFE_withComponentProps(function PlantView() {
	const { plant, gardenSlug } = useLoaderData();
	const isGenerating = useNavigation().state === "submitting";
	const careInfo = plant.care_info;
	const careTabs = careInfo ? [
		{
			key: "summary",
			label: "Summary",
			content: careInfo.summary
		},
		{
			key: "planting",
			label: "Planting",
			content: careInfo.planting
		},
		{
			key: "care",
			label: "Care",
			content: careInfo.care
		},
		{
			key: "harvesting",
			label: "Harvesting",
			content: careInfo.harvesting
		}
	].filter((tab) => tab.content) : [];
	const [activeTab, setActiveTab] = useState(() => careTabs[0]?.key ?? "summary");
	const activeContent = careTabs.find((t) => t.key === activeTab)?.content;
	const [showCareTooltip, setShowCareTooltip] = useState(false);
	return /* @__PURE__ */ jsx("div", {
		className: "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-2xl flex flex-col gap-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 text-sm text-gray-500 mb-1",
						children: [
							/* @__PURE__ */ jsx(Link, {
								to: "/gardens",
								className: "hover:text-gray-900 transition-colors",
								children: "My Gardens"
							}),
							/* @__PURE__ */ jsx("span", { children: "/" }),
							/* @__PURE__ */ jsx(Link, {
								to: `/gardens/${gardenSlug}`,
								className: "hover:text-gray-900 transition-colors",
								children: "Garden"
							}),
							/* @__PURE__ */ jsx("span", { children: "/" }),
							/* @__PURE__ */ jsx("span", { children: plant.species })
						]
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "text-2xl font-bold text-gray-900",
						children: [plant.species, plant.variety && /* @__PURE__ */ jsx("span", {
							className: "ml-2 text-gray-400 font-normal",
							children: plant.variety
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 mt-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 capitalize border border-green-200",
							children: plant.plant_type
						}), plant.planted_date && /* @__PURE__ */ jsxs("span", {
							className: "text-sm text-gray-500",
							children: ["Planted ", new Date(plant.planted_date).toLocaleDateString()]
						})]
					})
				] }), /* @__PURE__ */ jsx(Link, {
					to: `/gardens/${gardenSlug}?plant=${plant.id}`,
					className: "shrink-0 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors",
					children: "Edit plant"
				})]
			}), careInfo ? /* @__PURE__ */ jsxs("section", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-lg font-semibold text-gray-900",
							children: "Care Information"
						}), careInfo.latin_name && /* @__PURE__ */ jsx("p", {
							className: "text-sm text-gray-400 italic",
							children: careInfo.latin_name
						})] }), /* @__PURE__ */ jsx(Form, {
							method: "post",
							children: /* @__PURE__ */ jsxs("div", {
								className: "relative inline-block",
								onMouseEnter: () => setShowCareTooltip(true),
								onMouseLeave: () => setShowCareTooltip(false),
								children: [/* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: isGenerating,
									className: "rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:pointer-events-none",
									children: isGenerating ? "Regenerating…" : "Regenerate"
								}), showCareTooltip && /* @__PURE__ */ jsxs("div", {
									className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-md bg-gray-800 px-3 py-2 text-xs text-white pointer-events-none z-10",
									children: ["When generating AI care instructions the plant species and variety and the garden location are sent to the AI in order to get more accurate information", /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" })]
								})]
							})
						})]
					}),
					careTabs.length > 0 ? /* @__PURE__ */ jsxs("div", {
						className: "rounded-lg border border-gray-200 bg-white overflow-hidden",
						children: [/* @__PURE__ */ jsx("div", {
							className: "flex border-b border-gray-200",
							children: careTabs.map((tab) => /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setActiveTab(tab.key),
								className: `px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === tab.key ? "text-green-700 border-b-2 border-green-700 -mb-px bg-white" : "text-gray-500 hover:text-gray-700"}`,
								children: tab.label
							}, tab.key))
						}), /* @__PURE__ */ jsx("div", {
							className: "px-4 py-4",
							children: /* @__PURE__ */ jsx("p", {
								className: "text-sm text-gray-700 whitespace-pre-line",
								children: activeContent
							})
						})]
					}) : /* @__PURE__ */ jsx("div", {
						className: "rounded-lg border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-400",
						children: "No care information available yet."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "rounded-md border border-divider bg-gold-soft px-4 py-3",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-xs font-semibold text-text-main",
							children: "AI-Generated Content Disclaimer"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-text-muted",
							children: "This content was generated with the assistance of artificial intelligence. While AI tools can be helpful, they may produce inaccurate, incomplete, or outdated information. Please review and verify any important details before relying on this content."
						})]
					})
				]
			}) : /* @__PURE__ */ jsxs("section", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-lg font-semibold text-gray-900",
					children: "Care Information"
				}), /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm text-gray-400 mb-4",
						children: "No care information available yet."
					}), /* @__PURE__ */ jsx(Form, {
						method: "post",
						children: /* @__PURE__ */ jsxs("div", {
							className: "relative inline-block",
							onMouseEnter: () => setShowCareTooltip(true),
							onMouseLeave: () => setShowCareTooltip(false),
							children: [/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: isGenerating,
								className: "inline-flex items-center rounded-md bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 transition-colors disabled:opacity-50 disabled:pointer-events-none",
								children: isGenerating ? "Generating…" : "Generate care information"
							}), showCareTooltip && /* @__PURE__ */ jsxs("div", {
								className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-md bg-gray-800 px-3 py-2 text-xs text-white pointer-events-none z-10",
								children: ["When generating AI care instructions the plant species and variety and the garden location are sent to the AI in order to get more accurate information", /* @__PURE__ */ jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" })]
							})]
						})
					})]
				})]
			})]
		})
	});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary() {
	const error = useRouteError();
	const is404 = isRouteErrorResponse(error) && error.status === 404;
	return /* @__PURE__ */ jsxs("div", {
		className: "text-center py-16",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-4xl font-bold text-green-700",
			children: is404 ? "404" : "Error"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-3 text-gray-600",
			children: is404 ? "Plant not found." : "Failed to load plant."
		})]
	});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-N0q0EoNm.js",
		"imports": [
			"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
			"/assets/react-dom-C8zVeJur.js",
			"/assets/jsx-runtime-LF-cI-GV.js"
		],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-CDTQGj2Z.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/react-dom-C8zVeJur.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": ["/assets/root-7rUIXm2B.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-bLBYuc24.js",
			"imports": ["/assets/chunk-QFMPRPBF-DbyKA6zk.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/register-redirect": {
			"id": "routes/register-redirect",
			"parentId": "root",
			"path": "register",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/register-redirect-BsQKxvWz.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/auth.login": {
			"id": "routes/auth.login",
			"parentId": "root",
			"path": "auth/login",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/auth.login-CZfOqhFb.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/AuthShell-HBnuFsOr.js",
				"/assets/Button-vpFtpPD6.js",
				"/assets/FormError-CY4sLYqO.js",
				"/assets/Input-Z3bp_4Wu.js",
				"/assets/jsx-runtime-LF-cI-GV.js",
				"/assets/logo-R7N_0liP.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/auth.register": {
			"id": "routes/auth.register",
			"parentId": "root",
			"path": "auth/register",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/auth.register-CSWpX8Y8.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/AuthShell-HBnuFsOr.js",
				"/assets/Button-vpFtpPD6.js",
				"/assets/FormError-CY4sLYqO.js",
				"/assets/Input-Z3bp_4Wu.js",
				"/assets/PasswordInput-n5zUppIl.js",
				"/assets/jsx-runtime-LF-cI-GV.js",
				"/assets/logo-R7N_0liP.js",
				"/assets/createLucideIcon-Br_h4fOO.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/auth.logout": {
			"id": "routes/auth.logout",
			"parentId": "root",
			"path": "auth/logout",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/auth.logout-DQfydCGh.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/auth.forgot-password": {
			"id": "routes/auth.forgot-password",
			"parentId": "root",
			"path": "auth/forgot-password",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/auth.forgot-password-CsKLDARd.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/AuthShell-HBnuFsOr.js",
				"/assets/Button-vpFtpPD6.js",
				"/assets/FormError-CY4sLYqO.js",
				"/assets/Input-Z3bp_4Wu.js",
				"/assets/jsx-runtime-LF-cI-GV.js",
				"/assets/logo-R7N_0liP.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/auth.reset-password": {
			"id": "routes/auth.reset-password",
			"parentId": "root",
			"path": "auth/reset-password",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/auth.reset-password-4eFoo6B6.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/AuthShell-HBnuFsOr.js",
				"/assets/Button-vpFtpPD6.js",
				"/assets/FormError-CY4sLYqO.js",
				"/assets/PasswordInput-n5zUppIl.js",
				"/assets/jsx-runtime-LF-cI-GV.js",
				"/assets/logo-R7N_0liP.js",
				"/assets/createLucideIcon-Br_h4fOO.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app": {
			"id": "routes/_app",
			"parentId": "root",
			"path": void 0,
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/_app-DZ3at7dE.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/logo-R7N_0liP.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.settings": {
			"id": "routes/_app.settings",
			"parentId": "routes/_app",
			"path": "settings",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.settings-DWjAI_CJ.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/Button-vpFtpPD6.js",
				"/assets/FormError-CY4sLYqO.js",
				"/assets/Input-Z3bp_4Wu.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.feedback": {
			"id": "routes/_app.feedback",
			"parentId": "routes/_app",
			"path": "feedback",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/_app.feedback-DxGdp_An.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.help": {
			"id": "routes/_app.help",
			"parentId": "routes/_app",
			"path": "help",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.help-UYQ24aeL.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/createLucideIcon-Br_h4fOO.js",
				"/assets/wheat-DAUvKDa6.js",
				"/assets/user-cog-CIGjPbKG.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.help._index": {
			"id": "routes/_app.help._index",
			"parentId": "routes/_app.help",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.help._index-UnsBRVDw.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/wheat-DAUvKDa6.js",
				"/assets/user-cog-CIGjPbKG.js",
				"/assets/jsx-runtime-LF-cI-GV.js",
				"/assets/createLucideIcon-Br_h4fOO.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.help.gardens": {
			"id": "routes/_app.help.gardens",
			"parentId": "routes/_app.help",
			"path": "gardens",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.help.gardens-CG8e2Tkq.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/HelpArticle-DCQWTSPo.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.help.plants": {
			"id": "routes/_app.help.plants",
			"parentId": "routes/_app.help",
			"path": "plants",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.help.plants-IMICwIMF.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/HelpArticle-DCQWTSPo.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.help.notes": {
			"id": "routes/_app.help.notes",
			"parentId": "routes/_app.help",
			"path": "notes",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.help.notes-D4q8j7VS.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/HelpArticle-DCQWTSPo.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.help.harvests": {
			"id": "routes/_app.help.harvests",
			"parentId": "routes/_app.help",
			"path": "harvests",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.help.harvests-CzPUaOG2.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/HelpArticle-DCQWTSPo.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.help.ai-tips": {
			"id": "routes/_app.help.ai-tips",
			"parentId": "routes/_app.help",
			"path": "ai-tips",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.help.ai-tips-rQYg9RKi.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/HelpArticle-DCQWTSPo.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.help.account": {
			"id": "routes/_app.help.account",
			"parentId": "routes/_app.help",
			"path": "account",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.help.account-Cud8-iVv.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/HelpArticle-DCQWTSPo.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.admin": {
			"id": "routes/_app.admin",
			"parentId": "routes/_app",
			"path": void 0,
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.admin-DbXhVezY.js",
			"imports": ["/assets/chunk-QFMPRPBF-DbyKA6zk.js", "/assets/jsx-runtime-LF-cI-GV.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.admin._index": {
			"id": "routes/_app.admin._index",
			"parentId": "routes/_app.admin",
			"path": "admin",
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": false,
			"hasErrorBoundary": false,
			"module": "/assets/_app.admin._index-DJlrsuWR.js",
			"imports": [],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.admin.users": {
			"id": "routes/_app.admin.users",
			"parentId": "routes/_app.admin",
			"path": "admin/users",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.admin.users-DT0z5RY3.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/Button-vpFtpPD6.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.admin.gardens": {
			"id": "routes/_app.admin.gardens",
			"parentId": "routes/_app.admin",
			"path": "admin/gardens",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.admin.gardens-BTLcOSL1.js",
			"imports": ["/assets/chunk-QFMPRPBF-DbyKA6zk.js", "/assets/jsx-runtime-LF-cI-GV.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.admin.invitations": {
			"id": "routes/_app.admin.invitations",
			"parentId": "routes/_app.admin",
			"path": "admin/invitations",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.admin.invitations-D9f2eKty.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/Button-vpFtpPD6.js",
				"/assets/FormError-CY4sLYqO.js",
				"/assets/Input-Z3bp_4Wu.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.invitations.$token": {
			"id": "routes/_app.invitations.$token",
			"parentId": "routes/_app",
			"path": "invitations/:token",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.invitations._token-BuS5c-dE.js",
			"imports": ["/assets/chunk-QFMPRPBF-DbyKA6zk.js", "/assets/jsx-runtime-LF-cI-GV.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.gardens": {
			"id": "routes/_app.gardens",
			"parentId": "routes/_app",
			"path": "gardens",
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.gardens-BDXSOsSC.js",
			"imports": ["/assets/chunk-QFMPRPBF-DbyKA6zk.js", "/assets/jsx-runtime-LF-cI-GV.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.gardens.new": {
			"id": "routes/_app.gardens.new",
			"parentId": "routes/_app",
			"path": "gardens/new",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.gardens.new-Bwyj134B.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/GardenForm-DuQGeqGM.js",
				"/assets/jsx-runtime-LF-cI-GV.js",
				"/assets/Button-vpFtpPD6.js",
				"/assets/FormError-CY4sLYqO.js",
				"/assets/Input-Z3bp_4Wu.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.gardens.$gardenSlug": {
			"id": "routes/_app.gardens.$gardenSlug",
			"parentId": "routes/_app",
			"path": "gardens/:gardenSlug",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/_app.gardens._gardenSlug-C6C81dLs.js",
			"imports": ["/assets/chunk-QFMPRPBF-DbyKA6zk.js", "/assets/jsx-runtime-LF-cI-GV.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.gardens.$gardenSlug._index": {
			"id": "routes/_app.gardens.$gardenSlug._index",
			"parentId": "routes/_app.gardens.$gardenSlug",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/_app.gardens._gardenSlug._index-CpZVUEG2.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/createLucideIcon-Br_h4fOO.js",
				"/assets/wheat-DAUvKDa6.js",
				"/assets/react-dom-C8zVeJur.js",
				"/assets/jsx-runtime-LF-cI-GV.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.gardens.$gardenSlug.edit": {
			"id": "routes/_app.gardens.$gardenSlug.edit",
			"parentId": "routes/_app.gardens.$gardenSlug",
			"path": "edit",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.gardens._gardenSlug.edit-DrGr_iTy.js",
			"imports": [
				"/assets/chunk-QFMPRPBF-DbyKA6zk.js",
				"/assets/GardenForm-DuQGeqGM.js",
				"/assets/jsx-runtime-LF-cI-GV.js",
				"/assets/Button-vpFtpPD6.js",
				"/assets/FormError-CY4sLYqO.js",
				"/assets/Input-Z3bp_4Wu.js"
			],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.gardens.$gardenSlug.members": {
			"id": "routes/_app.gardens.$gardenSlug.members",
			"parentId": "routes/_app.gardens.$gardenSlug",
			"path": "members",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/_app.gardens._gardenSlug.members-BqULiTE0.js",
			"imports": ["/assets/chunk-QFMPRPBF-DbyKA6zk.js", "/assets/jsx-runtime-LF-cI-GV.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/_app.gardens.$gardenSlug.plants.$plantId": {
			"id": "routes/_app.gardens.$gardenSlug.plants.$plantId",
			"parentId": "routes/_app.gardens.$gardenSlug",
			"path": "plants/:plantId",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": true,
			"hasLoader": true,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/_app.gardens._gardenSlug.plants._plantId-BZ_qXnZO.js",
			"imports": ["/assets/chunk-QFMPRPBF-DbyKA6zk.js", "/assets/jsx-runtime-LF-cI-GV.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-2f45435f.js",
	"version": "2f45435f",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"unstable_passThroughRequests": false,
	"unstable_subResourceIntegrity": false,
	"unstable_trailingSlashAwareDataRequests": false,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": false,
	"v8_splitRouteModules": false,
	"v8_viteEnvironmentApi": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/register-redirect": {
		id: "routes/register-redirect",
		parentId: "root",
		path: "register",
		index: void 0,
		caseSensitive: void 0,
		module: register_redirect_exports
	},
	"routes/auth.login": {
		id: "routes/auth.login",
		parentId: "root",
		path: "auth/login",
		index: void 0,
		caseSensitive: void 0,
		module: auth_login_exports
	},
	"routes/auth.register": {
		id: "routes/auth.register",
		parentId: "root",
		path: "auth/register",
		index: void 0,
		caseSensitive: void 0,
		module: auth_register_exports
	},
	"routes/auth.logout": {
		id: "routes/auth.logout",
		parentId: "root",
		path: "auth/logout",
		index: void 0,
		caseSensitive: void 0,
		module: auth_logout_exports
	},
	"routes/auth.forgot-password": {
		id: "routes/auth.forgot-password",
		parentId: "root",
		path: "auth/forgot-password",
		index: void 0,
		caseSensitive: void 0,
		module: auth_forgot_password_exports
	},
	"routes/auth.reset-password": {
		id: "routes/auth.reset-password",
		parentId: "root",
		path: "auth/reset-password",
		index: void 0,
		caseSensitive: void 0,
		module: auth_reset_password_exports
	},
	"routes/_app": {
		id: "routes/_app",
		parentId: "root",
		path: void 0,
		index: void 0,
		caseSensitive: void 0,
		module: _app_exports
	},
	"routes/_app.settings": {
		id: "routes/_app.settings",
		parentId: "routes/_app",
		path: "settings",
		index: void 0,
		caseSensitive: void 0,
		module: _app_settings_exports
	},
	"routes/_app.feedback": {
		id: "routes/_app.feedback",
		parentId: "routes/_app",
		path: "feedback",
		index: void 0,
		caseSensitive: void 0,
		module: _app_feedback_exports
	},
	"routes/_app.help": {
		id: "routes/_app.help",
		parentId: "routes/_app",
		path: "help",
		index: void 0,
		caseSensitive: void 0,
		module: _app_help_exports
	},
	"routes/_app.help._index": {
		id: "routes/_app.help._index",
		parentId: "routes/_app.help",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: _app_help__index_exports
	},
	"routes/_app.help.gardens": {
		id: "routes/_app.help.gardens",
		parentId: "routes/_app.help",
		path: "gardens",
		index: void 0,
		caseSensitive: void 0,
		module: _app_help_gardens_exports
	},
	"routes/_app.help.plants": {
		id: "routes/_app.help.plants",
		parentId: "routes/_app.help",
		path: "plants",
		index: void 0,
		caseSensitive: void 0,
		module: _app_help_plants_exports
	},
	"routes/_app.help.notes": {
		id: "routes/_app.help.notes",
		parentId: "routes/_app.help",
		path: "notes",
		index: void 0,
		caseSensitive: void 0,
		module: _app_help_notes_exports
	},
	"routes/_app.help.harvests": {
		id: "routes/_app.help.harvests",
		parentId: "routes/_app.help",
		path: "harvests",
		index: void 0,
		caseSensitive: void 0,
		module: _app_help_harvests_exports
	},
	"routes/_app.help.ai-tips": {
		id: "routes/_app.help.ai-tips",
		parentId: "routes/_app.help",
		path: "ai-tips",
		index: void 0,
		caseSensitive: void 0,
		module: _app_help_ai_tips_exports
	},
	"routes/_app.help.account": {
		id: "routes/_app.help.account",
		parentId: "routes/_app.help",
		path: "account",
		index: void 0,
		caseSensitive: void 0,
		module: _app_help_account_exports
	},
	"routes/_app.admin": {
		id: "routes/_app.admin",
		parentId: "routes/_app",
		path: void 0,
		index: void 0,
		caseSensitive: void 0,
		module: _app_admin_exports
	},
	"routes/_app.admin._index": {
		id: "routes/_app.admin._index",
		parentId: "routes/_app.admin",
		path: "admin",
		index: true,
		caseSensitive: void 0,
		module: _app_admin__index_exports
	},
	"routes/_app.admin.users": {
		id: "routes/_app.admin.users",
		parentId: "routes/_app.admin",
		path: "admin/users",
		index: void 0,
		caseSensitive: void 0,
		module: _app_admin_users_exports
	},
	"routes/_app.admin.gardens": {
		id: "routes/_app.admin.gardens",
		parentId: "routes/_app.admin",
		path: "admin/gardens",
		index: void 0,
		caseSensitive: void 0,
		module: _app_admin_gardens_exports
	},
	"routes/_app.admin.invitations": {
		id: "routes/_app.admin.invitations",
		parentId: "routes/_app.admin",
		path: "admin/invitations",
		index: void 0,
		caseSensitive: void 0,
		module: _app_admin_invitations_exports
	},
	"routes/_app.invitations.$token": {
		id: "routes/_app.invitations.$token",
		parentId: "routes/_app",
		path: "invitations/:token",
		index: void 0,
		caseSensitive: void 0,
		module: _app_invitations_$token_exports
	},
	"routes/_app.gardens": {
		id: "routes/_app.gardens",
		parentId: "routes/_app",
		path: "gardens",
		index: true,
		caseSensitive: void 0,
		module: _app_gardens_exports
	},
	"routes/_app.gardens.new": {
		id: "routes/_app.gardens.new",
		parentId: "routes/_app",
		path: "gardens/new",
		index: void 0,
		caseSensitive: void 0,
		module: _app_gardens_new_exports
	},
	"routes/_app.gardens.$gardenSlug": {
		id: "routes/_app.gardens.$gardenSlug",
		parentId: "routes/_app",
		path: "gardens/:gardenSlug",
		index: void 0,
		caseSensitive: void 0,
		module: _app_gardens_$gardenSlug_exports
	},
	"routes/_app.gardens.$gardenSlug._index": {
		id: "routes/_app.gardens.$gardenSlug._index",
		parentId: "routes/_app.gardens.$gardenSlug",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: _app_gardens_$gardenSlug__index_exports
	},
	"routes/_app.gardens.$gardenSlug.edit": {
		id: "routes/_app.gardens.$gardenSlug.edit",
		parentId: "routes/_app.gardens.$gardenSlug",
		path: "edit",
		index: void 0,
		caseSensitive: void 0,
		module: _app_gardens_$gardenSlug_edit_exports
	},
	"routes/_app.gardens.$gardenSlug.members": {
		id: "routes/_app.gardens.$gardenSlug.members",
		parentId: "routes/_app.gardens.$gardenSlug",
		path: "members",
		index: void 0,
		caseSensitive: void 0,
		module: _app_gardens_$gardenSlug_members_exports
	},
	"routes/_app.gardens.$gardenSlug.plants.$plantId": {
		id: "routes/_app.gardens.$gardenSlug.plants.$plantId",
		parentId: "routes/_app.gardens.$gardenSlug",
		path: "plants/:plantId",
		index: void 0,
		caseSensitive: void 0,
		module: _app_gardens_$gardenSlug_plants_$plantId_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
