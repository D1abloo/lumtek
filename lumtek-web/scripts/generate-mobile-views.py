#!/usr/bin/env python3
"""Genera capturas estáticas de Lumtek Control para cada vista del móvil."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "app"
CAMERAS = ROOT / "public" / "images" / "cameras"

W, H = 780, 1688
BG = (9, 13, 19)
BLUE = (0, 168, 255)
GREEN = (52, 211, 153)
SLATE = (148, 163, 184)
WHITE = (248, 250, 252)
PANEL = (17, 24, 39)
BORDER = (30, 41, 59)
AMBER = (251, 191, 36)
RED = (220, 38, 38)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    paths = [
        f"/usr/share/fonts/truetype/dejavu/DejaVuSans{'-Bold' if bold else ''}.ttf",
        f"/usr/share/fonts/dejavu/DejaVuSans{'-Bold' if bold else ''}.ttf",
    ]
    for p in paths:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def cover(img: Image.Image, tw: int, th: int) -> Image.Image:
    sw, sh = img.size
    s = max(tw / sw, th / sh)
    nw, nh = int(sw * s), int(sh * s)
    r = img.resize((nw, nh), Image.Resampling.LANCZOS)
    return r.crop(((nw - tw) // 2, (nh - th) // 2, (nw + tw) // 2, (nh + th) // 2))


def mask_r(size: tuple[int, int], radius: int) -> Image.Image:
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=255)
    return m


def paste_r(base: Image.Image, img: Image.Image, xy: tuple[int, int], radius: int) -> None:
    base.paste(img, xy, mask_r(img.size, radius))


def header(draw: ImageDraw.ImageDraw, badge: str | None = None, badge_color: tuple[int, int, int] = RED) -> None:
    draw.text((40, 54), "Lumtek Control", fill=WHITE, font=font(54, True))
    draw.ellipse((40, 122, 54, 136), fill=GREEN)
    draw.text((66, 108), "Online", fill=SLATE, font=font(32))
    if badge:
        tw = draw.textlength(badge, font=font(28))
        x0 = int(W - tw - 80)
        draw.rounded_rectangle((x0, 46, W - 40, 88), radius=12, fill=badge_color)
        if badge == "EN VIVO":
            draw.ellipse((x0 + 16, 62, x0 + 28, 74), fill=WHITE)
            draw.text((x0 + 36, 56), badge, fill=WHITE, font=font(28))
        else:
            draw.text((x0 + 20, 56), badge, fill=WHITE, font=font(26))


def card(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, h: int, title: str, sub: str, accent: tuple[int, int, int] = BLUE) -> None:
    draw.rounded_rectangle((x, y, x + w, y + h), radius=18, fill=PANEL, outline=BORDER, width=2)
    draw.text((x + 22, y + 18), title, fill=WHITE, font=font(30, True))
    draw.text((x + 22, y + 54), sub, fill=accent, font=font(24))


def slider(draw: ImageDraw.ImageDraw, x: int, y: int, w: int, label: str, pct: int) -> None:
    draw.text((x, y), label, fill=WHITE, font=font(28, True))
    draw.text((x + w - 60, y), f"{pct}%", fill=BLUE, font=font(26))
    bar_y = y + 44
    draw.rounded_rectangle((x, bar_y, x + w, bar_y + 12), radius=6, fill=BORDER)
    fill_w = int(w * pct / 100)
    draw.rounded_rectangle((x, bar_y, x + fill_w, bar_y + 12), radius=6, fill=BLUE)


def gen_camaras() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    header(draw, "EN VIVO")
    fx, fy, fw, fh = 28, 120, 724, 460
    paste_r(img, cover(Image.open(CAMERAS / "entrada.webp").convert("RGB"), fw, fh), (fx, fy), 26)
    draw.text((52, 520), "Entrada principal", fill=WHITE, font=font(38, True))
    draw.text((52, 562), "Conectada", fill=GREEN, font=font(28))
    thumbs = [(28, 620, "garaje.webp", "Garaje"), (276, 620, "oficina.webp", "Salón"), (524, 620, "acceso.webp", "Acceso pr.")]
    for x, y, f, lbl in thumbs:
        paste_r(img, cover(Image.open(CAMERAS / f).convert("RGB"), 228, 120), (x, y), 14)
        draw.text((x + 10, y + 132), lbl, fill=SLATE, font=font(24))
    for i, t in enumerate(["Sistema armado", "4 cámaras", "Acceso seguro", "HD activo"]):
        cx = 28 if i % 2 == 0 else 396
        cy = 800 + (i // 2) * 88
        card(draw, cx, cy, 356, 72, t, "Activo", GREEN if i != 3 else BLUE)
    return img


def gen_iluminacion() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    header(draw, "Escena activa", BLUE)
    slider(draw, 40, 140, 700, "Luces salón", 82)
    slider(draw, 40, 240, 700, "Luces pasillo", 45)
    slider(draw, 40, 340, 700, "Exterior", 30)
    card(draw, 28, 460, 724, 120, "Escena noche", "Activa · 22:00 – 07:00", AMBER)
    card(draw, 28, 600, 724, 100, "Programación", "Luces exteriores a las 20:30", BLUE)
    for i, (t, s) in enumerate([("Salón", "Encendido"), ("Cocina", "Apagado"), ("Terraza", "50%")]):
        card(draw, 28 + (i % 2) * 384, 730 + (i // 2) * 100, 356, 88, t, s, GREEN if s != "Apagado" else SLATE)
    return img


def gen_accesos() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    header(draw, "Acceso seguro", GREEN)
    entries = [
        ("Puerta principal", "Cerrada", GREEN),
        ("Garaje", "Abierto", AMBER),
        ("Videoportero", "En espera", BLUE),
        ("Acceso lateral", "Cerrada", GREEN),
    ]
    for i, (t, s, c) in enumerate(entries):
        card(draw, 28, 130 + i * 130, 724, 110, t, s, c)
    draw.rounded_rectangle((28, 680, 724, 780), radius=20, fill=BLUE)
    draw.text((240, 720), "Apertura remota", fill=WHITE, font=font(36, True))
    draw.text((200, 762), "Mantén pulsado para confirmar", fill=(200, 210, 220), font=font(22))
    return img


def gen_sensores() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    header(draw, "Alertas activas", AMBER)
    sensors = [
        ("Movimiento", "Detectado · Entrada", RED),
        ("Temperatura", "22,5 °C · Normal", GREEN),
        ("Apertura", "Puerta cerrada", GREEN),
        ("Presencia", "Salón ocupado", BLUE),
    ]
    for i, (t, s, c) in enumerate(sensors):
        card(draw, 28 + (i % 2) * 384, 140 + (i // 2) * 160, 356, 140, t, s, c)
    card(draw, 28, 480, 724, 100, "Última alerta", "Movimiento en entrada · 14:28", AMBER)
    card(draw, 28, 600, 724, 100, "Histórico", "12 eventos hoy", SLATE)
    return img


def gen_climatizacion() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    header(draw, "Modo automático", BLUE)
    draw.text((300, 200), "22°", fill=WHITE, font=font(120, True))
    draw.text((280, 340), "Temperatura actual", fill=SLATE, font=font(28))
    card(draw, 28, 420, 724, 100, "Modo automático", "Mantiene confort y ahorro", BLUE)
    card(draw, 28, 540, 356, 100, "Horario", "08:00 – 23:00", SLATE)
    card(draw, 396, 540, 356, 100, "Ahorro", "Eficiencia alta", GREEN)
    slider(draw, 40, 680, 700, "Calefacción", 65)
    slider(draw, 40, 780, 700, "Ventilación", 40)
    return img


def gen_escenas() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    header(draw, "Rutina preparada", BLUE)
    scenes = [
        ("Modo noche", "Luces off · Alarmas on", BLUE),
        ("Fuera de casa", "Todo cerrado", GREEN),
        ("Llegada a casa", "Luces y clima activos", AMBER),
        ("Cierre seguro", "Verificación completa", GREEN),
    ]
    for i, (t, s, c) in enumerate(scenes):
        card(draw, 28, 130 + i * 150, 724, 130, t, s, c)
    draw.rounded_rectangle((28, 760, 724, 860), radius=20, fill=PANEL, outline=BLUE, width=2)
    draw.text((260, 800), "Activar escena", fill=WHITE, font=font(34, True))
    return img


GENERATORS = {
    "camaras": gen_camaras,
    "iluminacion": gen_iluminacion,
    "accesos": gen_accesos,
    "sensores": gen_sensores,
    "climatizacion": gen_climatizacion,
    "escenas": gen_escenas,
}


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for name, fn in GENERATORS.items():
        path = OUT_DIR / f"{name}.webp"
        fn().save(path, "WEBP", quality=86, method=6)
        print(f"Wrote {path} ({path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
