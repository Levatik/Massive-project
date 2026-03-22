"""
Advanced Hello World
====================
Multiple ways to say "Hello, World!" in Python.
Run directly or import individual functions.
"""

import sys
import time
import random
import textwrap
from datetime import datetime


# ─────────────────────────────────────────────
# 1. Classic
# ─────────────────────────────────────────────
def hello_classic():
    """The original."""
    print("Hello, World!")


# ─────────────────────────────────────────────
# 2. Personalised
# ─────────────────────────────────────────────
def hello_personal(name: str = "World"):
    """Greet a specific person (or the whole world by default)."""
    print(f"Hello, {name}!")


# ─────────────────────────────────────────────
# 3. Time-aware
# ─────────────────────────────────────────────
def hello_time():
    """Good morning / afternoon / evening greeting."""
    hour = datetime.now().hour
    if hour < 12:
        period = "Morning"
    elif hour < 18:
        period = "Afternoon"
    else:
        period = "Evening"
    print(f"Good {period}, World! 🌍  [{datetime.now().strftime('%H:%M:%S')}]")


# ─────────────────────────────────────────────
# 4. Multilingual
# ─────────────────────────────────────────────
TRANSLATIONS = {
    "English":    "Hello, World!",
    "Spanish":    "¡Hola, Mundo!",
    "French":     "Bonjour, le Monde !",
    "German":     "Hallo, Welt!",
    "Japanese":   "こんにちは、世界！",
    "Arabic":     "مرحبا بالعالم!",
    "Swahili":    "Habari, Dunia!",
    "Portuguese": "Olá, Mundo!",
}

def hello_multilingual():
    """Print Hello World in every supported language."""
    for lang, greeting in TRANSLATIONS.items():
        print(f"  {lang:<12} → {greeting}")


# ─────────────────────────────────────────────
# 5. Random language
# ─────────────────────────────────────────────
def hello_random():
    """Pick a surprise language."""
    lang, greeting = random.choice(list(TRANSLATIONS.items()))
    print(f"[{lang}] {greeting}")


# ─────────────────────────────────────────────
# 6. Typewriter effect
# ─────────────────────────────────────────────
def hello_typewriter(message: str = "Hello, World!", delay: float = 0.07):
    """Print one character at a time."""
    for char in message:
        print(char, end="", flush=True)
        time.sleep(delay)
    print()


# ─────────────────────────────────────────────
# 7. ASCII art banner
# ─────────────────────────────────────────────
def hello_banner():
    """Big block-letter banner."""
    banner = textwrap.dedent(r"""
     _   _      _ _        __        __         _     _   _
    | | | | ___| | | ___   \ \      / /__  _ __| | __| | | |
    | |_| |/ _ \ | |/ _ \   \ \ /\ / / _ \| '__| |/ _` | | |
    |  _  |  __/ | | (_) |   \ V  V / (_) | |  | | (_| | |_|
    |_| |_|\___|_|_|\___/     \_/\_/ \___/|_|  |_|\__,_| (_)
    """)
    print(banner)


# ─────────────────────────────────────────────
# 8. Countdown then greet
# ─────────────────────────────────────────────
def hello_countdown(start: int = 3):
    """Countdown, then say hello."""
    for i in range(start, 0, -1):
        print(f"  {i}…", flush=True)
        time.sleep(0.6)
    print("Hello, World! 🎉")


# ─────────────────────────────────────────────
# 9. Return instead of print (useful for APIs / tests)
# ─────────────────────────────────────────────
def hello_return(name: str = "World") -> str:
    """Return the greeting as a string instead of printing it."""
    return f"Hello, {name}!"


# ─────────────────────────────────────────────
# 10. Command-line interface
# ─────────────────────────────────────────────
MODES = {
    "classic":      hello_classic,
    "time":         hello_time,
    "multilingual": hello_multilingual,
    "random":       hello_random,
    "typewriter":   hello_typewriter,
    "banner":       hello_banner,
    "countdown":    hello_countdown,
}

def main():
    """
    Usage:
        python hello_world_advanced.py                  # runs all modes
        python hello_world_advanced.py classic          # one mode
        python hello_world_advanced.py personal Alice   # personalised
    """
    args = sys.argv[1:]

    if not args:
        # Run every mode with a header
        for name, fn in MODES.items():
            print(f"\n── {name.upper()} ──")
            fn()
        print(f"\n── PERSONAL ──")
        hello_personal("GitHub")
        return

    mode = args[0].lower()

    if mode == "personal":
        name = args[1] if len(args) > 1 else "World"
        hello_personal(name)
    elif mode in MODES:
        MODES[mode]()
    else:
        print(f"Unknown mode '{mode}'. Available: {', '.join(MODES)} personal")
        sys.exit(1)


if __name__ == "__main__":
    main()
