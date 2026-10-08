"""Gera recortes PNG com transparência a partir de fotos de fundo preto ou branco.

Além do alfa, remove a contaminação da cor de fundo nas bordas (halo branco nos grãos,
contorno escuro no respingo), recompondo a cor original: C = (P - (1 - a) * F) / a.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src, out = Path(sys.argv[1]), Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)


def suave(x, a, b):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def borda(alpha, frac):
    """Esfuma as bordas do recorte para não aparecer corte reto."""
    h, w = alpha.shape
    fy = np.minimum(np.arange(h), np.arange(h)[::-1]) / max(1, frac * h)
    fx = np.minimum(np.arange(w), np.arange(w)[::-1]) / max(1, frac * w)
    return alpha * np.clip(fy, 0, 1)[:, None] * np.clip(fx, 0, 1)[None, :]


def fundo_branco_conectado(p):
    """Fundo = pixels claros e sem cor ligados à borda da foto (reflexos dentro do grão ficam)."""
    mx, mn = p.max(axis=2), p.min(axis=2)
    cand = ((mx - mn) < 40) & (mn > 125)
    img = Image.fromarray(np.where(cand, 255, 0).astype(np.uint8)).copy()  # cópia: floodfill não escreve em imagem ligada ao array
    h, w = cand.shape
    pontos = [(x, 0) for x in range(0, w, 8)] + [(x, h - 1) for x in range(0, w, 8)]
    pontos += [(0, y) for y in range(0, h, 8)] + [(w - 1, y) for y in range(0, h, 8)]
    for xy in pontos:
        if img.getpixel(xy) == 255:
            ImageDraw.floodfill(img, xy, 128)
    # Vãos de fundo presos entre grãos: áreas claras grandes que não tocam a borda
    arr = np.asarray(img)
    area_min = 0.0008 * h * w
    for y, x in np.argwhere(arr[::6, ::6] == 255) * 6:
        if img.getpixel((int(x), int(y))) != 255:
            continue
        ImageDraw.floodfill(img, (int(x), int(y)), 64)
        regiao = np.asarray(img) == 64
        neutro = (mx[regiao] - mn[regiao]).mean() < 14 and mn[regiao].mean() > 185
        valor = 128 if regiao.sum() > area_min or neutro else 200
        img.paste(valor, mask=Image.fromarray((regiao * 255).astype(np.uint8)))
    fundo = np.asarray(img) == 128
    # Suaviza a borda do recorte em ~1,5 px
    a = Image.fromarray(np.where(fundo, 0, 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
    return np.asarray(a).astype(np.float32) / 255


def recorte(nome, arquivo, fundo, lo, hi, caixa=None, largura=1200, esfumar=0.0, encolher=0):
    im = Image.open(src / arquivo).convert("RGB")
    if caixa:
        w, h = im.size
        im = im.crop((int(caixa[0] * w), int(caixa[1] * h), int(caixa[2] * w), int(caixa[3] * h)))
    p = np.asarray(im).astype(np.float32)

    if fundo == "preto":
        alpha = suave(p.max(axis=2), lo, hi)
        cor_fundo = 0.0
    else:
        alpha = fundo_branco_conectado(p)
        cor_fundo = 255.0
    # Suaviza levemente o alfa e remove a cor do fundo misturada nas bordas
    a_img = Image.fromarray((alpha * 255).astype(np.uint8))
    if encolher:  # tira o anel de sombra em volta de cada grão
        a_img = a_img.filter(ImageFilter.MinFilter(encolher))
    a_img = a_img.filter(ImageFilter.GaussianBlur(0.7))
    a = np.asarray(a_img).astype(np.float32) / 255
    a_seguro = np.maximum(a, 0.06)[..., None]
    limpa = (p - (1 - a_seguro) * cor_fundo) / a_seguro
    limpa = np.clip(limpa, 0, 255)
    # Só depois da limpeza esfuma o corte reto (não mexe na cor)
    if esfumar:
        a = borda(a, esfumar)

    rgba = np.dstack([limpa, a * 255]).astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")
    bbox = img.getchannel("A").point(lambda v: 255 if v > 10 else 0).getbbox()
    img = img.crop(bbox)
    img.thumbnail((largura, largura), Image.LANCZOS)
    destino = out / f"{nome}.png"
    img.save(destino, optimize=True)
    print(nome, img.size, destino.stat().st_size // 1024, "KB")


recorte("xicara-respingo", "1678019940462-490ab4f9579a.jpg", "preto", 16, 52, caixa=(0.0, 0.0, 1.0, 0.92), largura=1100)
recorte("graos-monte", "1692299116305-762729f2e9d5.jpg", "branco", 60, 105, encolher=3, caixa=(0.0, 0.55, 1.0, 1.0), largura=1000, esfumar=0.08)
recorte("graos-espalhados", "1692299116590-614935779663.jpg", "branco", 60, 105, encolher=3, caixa=(0.55, 0.0, 1.0, 0.75), largura=700, esfumar=0.18)
