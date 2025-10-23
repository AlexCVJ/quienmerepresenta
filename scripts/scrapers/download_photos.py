#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Descargador de fotos de diputados
Descarga todas las fotos desde el servidor de diputados.gob.mx a la carpeta local
"""

import requests
import json
import os
from time import sleep
import sys

def main():
    print("📸 Iniciando descarga de fotos de diputados...")
    print("=" * 60)

    # Rutas
    json_path = '../../public/data/diputados.json'
    output_dir = '../../public/fotos_diputados'
    base_url = 'https://sitl.diputados.gob.mx/LXVI_leg/'

    # Cargar JSON
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        print(f"✅ JSON cargado: {len(data['diputados'])} diputados")
    except Exception as e:
        print(f"❌ Error al cargar JSON: {e}")
        sys.exit(1)

    # Crear directorio para fotos
    os.makedirs(output_dir, exist_ok=True)
    print(f"✅ Directorio creado: {output_dir}\n")

    # Contadores
    total = 0
    descargadas = 0
    existentes = 0
    errores = 0

    # Descargar cada foto
    for i, dip in enumerate(data['diputados'], 1):
        foto_url = dip.get('foto_url')

        if not foto_url:
            continue

        total += 1

        # Convertir ./fotos_lxviconfondo/221_foto_chica.jpg → 221.jpg
        filename = os.path.basename(foto_url).replace('_foto_chica', '')
        full_url = base_url + foto_url
        output_path = os.path.join(output_dir, filename)

        # Saltar si ya existe
        if os.path.exists(output_path):
            print(f'[{i}/555] ⏭️  {filename} (ya existe)')
            existentes += 1
            continue

        try:
            response = requests.get(full_url, timeout=10)
            response.raise_for_status()

            with open(output_path, 'wb') as f:
                f.write(response.content)

            size_kb = len(response.content) / 1024
            print(f'[{i}/555] ✅ {filename} ({size_kb:.1f} KB)')
            descargadas += 1

            # Rate limiting
            sleep(0.3)

        except Exception as e:
            print(f'[{i}/555] ❌ {filename}: {e}')
            errores += 1

    # Resumen
    print("\n" + "=" * 60)
    print("📊 Resumen de descarga:")
    print("=" * 60)
    print(f"  Total de fotos encontradas: {total}")
    print(f"  ✅ Descargadas ahora: {descargadas}")
    print(f"  ⏭️  Ya existían: {existentes}")
    print(f"  ❌ Errores: {errores}")
    print("=" * 60)
    print("🎉 Descarga completada!")

    if errores > 0:
        print(f"\n⚠️  Hubo {errores} errores. Puedes volver a ejecutar el script para reintentar.")

if __name__ == "__main__":
    main()
