/**
 * Advanced Hello World — TypeScript Edition
 * ==========================================
 * Multiple ways to say "Hello, World!"
 * Run: npx ts-node hello_world_advanced.ts [mode] [name]
 * Or compile: tsc hello_world_advanced.ts && node hello_world_advanced.js
 */

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Language = keyof typeof TRANSLATIONS;

interface GreetingResult {
  language: string;
  message: string;
  timestamp: string;
}

// ─────────────────────────────────────────────
// 1. Classic
// ─────────────────────────────────────────────
function helloClassic(): void {
  console.log("Hello, World!");
}

// ─────────────────────────────────────────────
// 2. Personalised
// ─────────────────────────────────────────────
function helloPersonal(name: string = "World"): void {
  console.log(`Hello, ${name}!`);
}

// ─────────────────────────────────────────────
// 3. Time-aware
// ─────────────────────────────────────────────
function helloTime(): void {
  const hour = new Date().getHours();
  const period =
    hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";
  const time = new Date().toLocaleTimeString();
  console.log(`Good ${period}, World! 🌍  [${time}]`);
}

// ─────────────────────────────────────────────
// 4. Multilingual
// ─────────────────────────────────────────────
const TRANSLATIONS = {
  English:    "Hello, World!",
  Spanish:    "¡Hola, Mundo!",
  French:     "Bonjour, le Monde !",
  German:     "Hallo, Welt!",
  Japanese:   "こんにちは、世界！",
  Arabic:     "مرحبا بالعالم!",
  Swahili:    "Habari, Dunia!",
  Portuguese: "Olá, Mundo!",
} as const;

function helloMultilingual(): void {
  for (const [lang, greeting] of Object.entries(TRANSLATIONS)) {
    console.log(`  ${lang.padEnd(12)} → ${greeting}`);
  }
}

// ─────────────────────────────────────────────
// 5. Random language
// ─────────────────────────────────────────────
function helloRandom(): void {
  const entries = Object.entries(TRANSLATIONS);
  const [lang, greeting] = entries[Math.floor(Math.random() * entries.length)];
  console.log(`[${lang}] ${greeting}`);
}

// ─────────────────────────────────────────────
// 6. Typewriter effect
// ─────────────────────────────────────────────
async function helloTypewriter(
  message: string = "Hello, World!",
  delay: number = 70
): Promise<void> {
  for (const char of message) {
    process.stdout.write(char);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  console.log();
}

// ─────────────────────────────────────────────
// 7. ASCII art banner
// ─────────────────────────────────────────────
function helloBanner(): void {
  const banner = `
 _   _      _ _        __        __         _     _   _
| | | | ___| | | ___   \\ \\      / /__  _ __| | __| | | |
| |_| |/ _ \\ | |/ _ \\   \\ \\ /\\ / / _ \\| '__| |/ _\` | | |
|  _  |  __/ | | (_) |   \\ V  V / (_) | |  | | (_| | |_|
|_| |_|\\___|_|_|\\___/     \\_/\\_/ \\___/|_|  |_|\\__,_| (_)
`;
  console.log(banner);
}

// ─────────────────────────────────────────────
// 8. Countdown then greet
// ─────────────────────────────────────────────
async function helloCountdown(start: number = 3): Promise<void> {
  for (let i = start; i > 0; i--) {
    console.log(`  ${i}…`);
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
  console.log("Hello, World! 🎉");
}

// ─────────────────────────────────────────────
// 9. Return instead of print (useful for APIs / tests)
// ─────────────────────────────────────────────
function helloReturn(name: string = "World"): string {
  return `Hello, ${name}!`;
}

// ─────────────────────────────────────────────
// 10. Structured object (useful for APIs)
// ─────────────────────────────────────────────
function helloObject(language: Language = "English"): GreetingResult {
  return {
    language,
    message: TRANSLATIONS[language],
    timestamp: new Date().toISOString(),
  };
}

// ─────────────────────────────────────────────
// CLI
// ─────────────────────────────────────────────
const MODES: Record<string, () => void | Promise<void>> = {
  classic:      helloClassic,
  time:         helloTime,
  multilingual: helloMultilingual,
  random:       helloRandom,
  typewriter:   helloTypewriter,
  banner:       helloBanner,
  countdown:    helloCountdown,
  object:       () => console.log(JSON.stringify(helloObject(), null, 2)),
};

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Run all modes
    for (const [name, fn] of Object.entries(MODES)) {
      console.log(`\n── ${name.toUpperCase()} ──`);
      await fn();
    }
    console.log("\n── PERSONAL ──");
    helloPersonal("GitHub");

    console.log("\n── RETURN (no print) ──");
    const msg = helloReturn("TypeScript");
    console.log(`Returned: "${msg}"`);
    return;
  }

  const mode = args[0].toLowerCase();

  if (mode === "personal") {
    helloPersonal(args[1] ?? "World");
  } else if (mode in MODES) {
    await MODES[mode]();
  } else {
    console.error(
      `Unknown mode '${mode}'. Available: ${Object.keys(MODES).join(", ")}, personal`
    );
    process.exit(1);
  }
}

main();

// ─────────────────────────────────────────────
// Exports (for use as a module)
// ─────────────────────────────────────────────
export {
  helloClassic,
  helloPersonal,
  helloTime,
  helloMultilingual,
  helloRandom,
  helloTypewriter,
  helloBanner,
  helloCountdown,
  helloReturn,
  helloObject,
  TRANSLATIONS,
};
export type { GreetingResult, Language };
