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
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result.value;

await send("Runtime.enable"); await send("Log.enable"); await sleep(3500);
const initial = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, spinButton: !!document.getElementById('wheel-spin'), menuButton: !!document.querySelector('.menu-button') })`);
if (!initial.spinButton) throw new Error("Spin button is missing");
if (initial.scrollWidth > initial.width) throw new Error(`Horizontal overflow: ${initial.scrollWidth}px > ${initial.width}px`);

await evaluate(`document.getElementById('wheel-spin').click()`); await sleep(6500);
const first = await evaluate(`({ modal: !!document.querySelector('.winner-modal'), prize: localStorage.getItem('lastPrize'), spinning: document.getElementById('wheel-spin').disabled })`);
if (!first.modal || !first.prize || first.spinning) throw new Error(`First spin failed: ${JSON.stringify(first)}`);
await evaluate(`document.querySelector('.sound-toggle').click()`);
const mutedPreference = await evaluate(`localStorage.getItem('festivalKartMuted')`);
await evaluate(`Array.from(document.querySelectorAll('.winner-modal button')).find(b => b.textContent.includes('Copy code')).click()`); await sleep(250);
const copiedToast = await evaluate(`document.body.textContent.includes('Coupon copied successfully!')`);
await evaluate(`document.querySelector('.modal-close').click()`); await sleep(300);
await evaluate(`document.getElementById('wheel-spin').click()`); await sleep(6500);
const second = await evaluate(`({ modal: !!document.querySelector('.winner-modal'), prize: localStorage.getItem('lastPrize') })`);
if (!second.modal || !second.prize) throw new Error(`Second spin failed: ${JSON.stringify(second)}`);

socket.close();
console.log(JSON.stringify({ initial, first, second, mutedPreference, copiedToast, consoleErrors }, null, 2));
if (consoleErrors.length) process.exitCode = 2;
