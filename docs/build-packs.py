#!/usr/bin/env python3
"""Genera los dos packs de contexto para ChatGPT y GoHighLevel a partir de los documentos fuente.

Uso: python3 docs/build-packs.py
Los packs son archivos derivados: se editan los documentos fuente y se vuelve a ejecutar.
"""
from datetime import date
from pathlib import Path

DOCS = Path(__file__).parent

PACKS = {
    "pack-agentes.md": (
        "Secret Key · pack general para agentes",
        [
            "instruccion-agentes.md",
            "secret-key-canon.md",
            "narrativa-secret-key-super-revisada.md",
            "guia-humanizar.md",
            "mensajes-captacion.md",
            "serie-cuatro-correos.md",
            "serie-cuatro-correos-en.md",
            "captacion-flujos.md",
        ],
    ),
    "pack-eventos.md": (
        "Secret Key · pack de eventos (Miami y Event Planner)",
        [
            "miami-evento.md",
            "miami-costes.md",
            "miami-sponsors.md",
            "agente-event-planner.md",
        ],
    ),
}

HEADER = """# {title}

Generado el {today} a partir de los documentos de `docs/`. Si algo choca con el canon
(`secret-key-canon.md`), manda el canon. No se edita a mano: se cambian los documentos fuente y
se vuelve a generar con `python3 docs/build-packs.py`.

Contenido:
{index}
"""

for name, (title, files) in PACKS.items():
    index = "\n".join(f"- {f}" for f in files)
    parts = [HEADER.format(title=title, today=date.today().isoformat(), index=index)]
    for f in files:
        body = (DOCS / f).read_text(encoding="utf-8").strip()
        parts.append(f"\n\n---\n\n<!-- Fuente: {f} -->\n\n{body}\n")
    (DOCS / name).write_text("".join(parts), encoding="utf-8")
    print(name, (DOCS / name).stat().st_size // 1024, "KB")
