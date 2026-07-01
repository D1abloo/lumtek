#!/usr/bin/env python3
"""Regenera mountains.webp desde scripts/sources/mountains.svg."""
from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "scripts" / "sources" / "mountains.svg"
OUT = ROOT / "public" / "images" / "hero" / "mountains.webp"


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Falta el origen: {SRC}")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "magick",
            "-background",
            "none",
            "-density",
            "240",
            str(SRC),
            "-resize",
            "1000x500",
            "-define",
            "webp:alpha-quality=100",
            "-quality",
            "88",
            str(OUT),
        ],
        check=True,
    )
    print(f"OK {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
