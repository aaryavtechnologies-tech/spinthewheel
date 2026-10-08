import { writeFileSync } from "node:fs";

const endpoint = process.argv[2] ?? "http://127.0.0.1:9225";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const targets = await (await fetch(`${endpoint}/json/list`)).json();
const page = targets.find((target) => target.type === "page" && target.url.includes("127.0.0.1:3000"));
if (!page) throw new Error("Preview page target was not found");

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
let sequence = 0;
const pending = new Map();
const consoleErrors = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) { const { resolve, reject } = pending.get(message.id); pending.delete(message.id); if (message.error) reject(new Error(message.error.message)); else resolve(message.result); }
  if (message.method === "Runtime.exceptionThrown") consoleErrors.push(`${message.params.exceptionDetails.text}: ${message.params.exceptionDetails.exception?.description ?? ""}`);
  if (message.method === "Log.entryAdded" && message.params.entry.level === "error") consoleErrors.push(`${message.params.entry.text} ${message.params.entry.url ?? ""}`.trim());
});
const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++sequence; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); });
const evaluate = async (expression) => { const response = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }); if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description ?? response.exceptionDetails.text); return response.result.value; };

await send("Runtime.enable"); await send("Log.enable"); await send("Page.enable"); await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }); await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] }); await send("Page.reload"); await sleep(6500);
const initial = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, spinButton: !!document.getElementById('wheel-spin'), menuButton: !!document.querySelector('.menu-button') })`);
if (!initial.spinButton) throw new Error("Spin button is missing");
if (initial.scrollWidth > initial.width) throw new Error(`Horizontal overflow: ${initial.scrollWidth}px > ${initial.width}px`);
const capture = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
writeFileSync("mobile-revamp-qa.png", Buffer.from(capture.data, "base64"));

const spins = [];
let mutedPreference = null;
let copiedToast = false;
for (let index = 0; index < 6; index += 1) {
  await evaluate(`document.getElementById('wheel-spin').click()`); await sleep(2700);
  const result = await evaluate(`(() => { const stage=document.querySelector('.wheel-stage'); const prize=localStorage.getItem('lastPrize'); const prizeIndex=${JSON.stringify(["ten","five-hundred","free-gift","bogo","cashback","surprise","twenty","jackpot"])}.indexOf(prize); const rotation=Number(stage.dataset.finalRotation); const normalized=((rotation%360)+360)%360; const expected=((-prizeIndex*45)%360+360)%360; return { modal:!!document.querySelector('.winner-modal'), prize, spinning:document.getElementById('wheel-spin').disabled, landed:stage.dataset.landedPrize, normalized, expected, aligned:Math.abs(normalized-expected)<1 }; })()`);
  if (!result.modal || !result.prize || result.spinning || result.landed !== result.prize || !result.aligned) throw new Error(`Spin ${index + 1} failed: ${JSON.stringify(result)}`);
  spins.push(result);
  if (index === 0) { await evaluate(`document.querySelector('.sound-toggle').click()`); mutedPreference = await evaluate(`localStorage.getItem('festivalKartMuted')`); await evaluate(`Array.from(document.querySelectorAll('.winner-modal button')).find(b => b.textContent.includes('Copy code')).click()`); await sleep(250); copiedToast = await evaluate(`document.body.textContent.includes('Coupon copied successfully!')`); }
  await evaluate(`document.querySelector('.modal-close').click()`); await sleep(180);
}
socket.close();
console.log(JSON.stringify({ initial, spins, uniquePrizes: new Set(spins.map((spin) => spin.prize)).size, mutedPreference, copiedToast, consoleErrors }, null, 2));
if (consoleErrors.length) process.exitCode = 2;
