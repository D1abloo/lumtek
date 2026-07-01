#!/usr/bin/env python3
"""Regenera montaña.webp desde scripts/sources/montana.png (o montaña.*)."""
from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "scripts" / "sources"
OUT = ROOT / "public" / "images" / "hero" / "montana.webp"

CANDIDATES = (
    SRC_DIR / "montana.png",
    SRC_DIR / "montana.jpg",
    SRC_DIR / "montana.jpeg",
    SRC_DIR / "montaña.png",
    SRC_DIR / "montaña.jpg",
    SRC_DIR / "montaña.jpeg",
    SRC_DIR / "montaña.svg",
)


def find_source() -> Path:
    for path in CANDIDATES:
        if path.exists():
            return path
    raise SystemExit(
        "Falta montana.png. Colócalo en scripts/sources/ (p. ej. desde Descargas)."
    )


def main() -> None:
    src = find_source()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    suffix = src.suffix.lower()
    if suffix == ".svg":
        cmd = [
            "magick",
            "-background",
            "none",
            "-density",
            "240",
            str(src),
            "-resize",
            "1200x500",
        ]
    else:
        # ponytail: ~9:12 strip matches phone bottom 64% (9/18.8 ÷ 0.64)
        cmd = [
            "magick",
            str(src),
            "-resize",
            "720x",
            "-gravity",
            "Center",
            "-crop",
            "720x960+0+0",
            "+repage",
        ]
    cmd += [
        "-define",
        "webp:alpha-quality=100",
        "-quality",
        "85",
        str(OUT),
    ]
    subprocess.run(cmd, check=True)
    print(f"OK {OUT} ({OUT.stat().st_size // 1024} KB) <- {src.name}")


if __name__ == "__main__":
    main()
