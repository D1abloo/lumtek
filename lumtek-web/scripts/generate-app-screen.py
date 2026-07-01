#!/usr/bin/env python3
"""Genera la captura estática de Lumtek Control (sustituible por diseño final)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "app" / "lumtek-app-screen.webp"
CAMERAS = ROOT / "public" / "images" / "cameras"

W, H = 780, 1688
BG = (9, 13, 19)
BLUE = (0, 168, 255)
GREEN = (52, 211, 153)
SLATE = (148, 163, 184)
WHITE = (248, 250, 252)
PANEL = (17, 24, 39)
BORDER = (30, 41, 59)


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def cover_crop(img: Image.Image, tw: int, th: int) -> Image.Image:
    sw, sh = img.size
    scale = max(tw / sw, th / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    return resized.crop((left, top, left + tw, top + th))


def rounded_rect_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=255)
    return mask


def paste_rounded(base: Image.Image, img: Image.Image, xy: tuple[int, int], radius: int) -> None:
    mask = rounded_rect_mask(img.size, radius)
    base.paste(img, xy, mask)


def feed_scrim(img: Image.Image, x: int, y: int, w: int, h: int, radius: int) -> None:
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)
    for i in range(h // 3):
        alpha = int(150 * (1 - i / (h // 3)))
        odraw.line([(0, h - i - 1), (w, h - i - 1)], fill=(0, 0, 0, alpha))
    mask = rounded_rect_mask((w, h), radius)
    overlay.putalpha(Image.composite(overlay.split()[3], Image.new("L", (w, h), 0), mask))
    img.paste(overlay, (x, y), overlay)


def draw_chip(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, text: str, accent: tuple[int, int, int]) -> None:
    draw.rounded_rectangle((x, y, x + w, y + h), radius=18, fill=PANEL, outline=(*accent, 90), width=2)
    draw.text((x + 22, y + 20), text, fill=accent, font=load_font(24, bold=True))


def draw_wifi(draw: ImageDraw.ImageDraw, cx: int, cy: int) -> None:
    for r, w in ((22, 3), (14, 3), (6, 3)):
        draw.arc((cx - r, cy - r, cx + r, cy + r), 200, 340, fill=WHITE, width=w)
    draw.ellipse((cx - 4, cy + 2, cx + 4, cy + 10), fill=WHITE)


def draw_lock(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    draw.rounded_rectangle((x, y + 10, x + 22, y + 34), radius=4, fill=GREEN)
    draw.arc((x + 2, y - 2, x + 20, y + 18), 180, 0, fill=GREEN, width=3)


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    title = load_font(54, bold=True)
    label = load_font(32)
    caption = load_font(28)
    mono = load_font(26)

    # Cabecera
    draw.text((40, 54), "Lumtek Control", fill=WHITE, font=title)
    draw.ellipse((40, 122, 54, 136), fill=GREEN)
    draw.text((66, 108), "Online", fill=SLATE, font=label)
    draw.rounded_rectangle((588, 46, 740, 88), radius=12, fill=(220, 38, 38))
    draw.ellipse((604, 62, 616, 74), fill=WHITE)
    draw.text((624, 56), "EN VIVO", fill=WHITE, font=label)

    # Vista principal
    fx, fy, fw, fh = 28, 120, 724, 480
    entrada = cover_crop(Image.open(CAMERAS / "entrada.webp").convert("RGB"), fw, fh)
    paste_rounded(img, entrada, (fx, fy), 26)
    feed_scrim(img, fx, fy, fw, fh, 26)

    draw_wifi(draw, 72, 168)
    draw_lock(draw, 108, 152)
    draw.rounded_rectangle((148, 152, 196, 184), radius=8, fill=(0, 0, 0))
    draw.text((158, 156), "HD", fill=WHITE, font=label)
    draw.text((580, 156), "14:32:08", fill=WHITE, font=mono)

    draw.text((52, 532), "Entrada principal", fill=WHITE, font=load_font(38, bold=True))
    draw.ellipse((52, 572, 64, 584), fill=GREEN)
    draw.text((72, 558), "Conectada", fill=GREEN, font=label)

    # Miniaturas
    thumbs = [
        (28, 640, "garaje.webp", "Cámara Garaje", True),
        (276, 640, "oficina.webp", "Salón", False),
        (524, 640, "acceso.webp", "Acceso principal", False),
    ]
    tw, th = 228, 128
    for x, y, file, name, active in thumbs:
        cam = cover_crop(Image.open(CAMERAS / file).convert("RGB"), tw, th)
        paste_rounded(img, cam, (x, y), 14)
        outline = BLUE if active else BORDER
        width = 3 if active else 2
        draw.rounded_rectangle((x, y, x + tw, y + th), radius=14, outline=outline, width=width)
        draw.text((x + 10, y + th + 14), name, fill=SLATE, font=caption)

    # Estados rápidos
    draw_chip(draw, 28, 820, 356, 76, "Sistema armado", GREEN)
    draw_chip(draw, 396, 820, 356, 76, "4 cámaras conectadas", BLUE)
    draw_chip(draw, 28, 912, 356, 76, "Acceso seguro", GREEN)
    draw_chip(draw, 396, 912, 356, 76, "Luces activas", (251, 191, 36))

    # Controles domóticos
    controls = [(28, "Luces"), (208, "Accesos"), (388, "Sensores"), (568, "Escenas")]
    cy, ch = 1016, 92
    for x, name in controls:
        draw.rounded_rectangle((x, cy, x + 168, cy + ch), radius=18, fill=PANEL, outline=BORDER, width=2)
        draw.ellipse((x + 58, cy + 16, x + 110, cy + 68), outline=BLUE, width=3)
        draw.text((x + 36, cy + 58), name, fill=SLATE, font=caption)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "WEBP", quality=86, method=6)
    print(f"Wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
