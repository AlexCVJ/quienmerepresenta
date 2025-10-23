#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Actualizador de rutas de fotos en JSON
Convierte las rutas externas a rutas locales después de descargar las fotos
"""

import json
import os

def main():
    print("🔄 Actualizando rutas de fotos en JSON...")
    print("=" * 60)

    json_path = '../../public/data/diputados.json'

    # Cargar JSON
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        print(f"✅ JSON cargado: {len(data['diputados'])} diputados")
    except Exception as e:
        print(f"❌ Error al cargar JSON: {e}")
        return

    # Contar actualizaciones
    actualizados = 0

    # Actualizar rutas
    for dip in data['diputados']:
        if dip.get('foto_url'):
            # Convertir ./fotos_lxviconfondo/221_foto_chica.jpg → /fotos_diputados/221.jpg
            filename = os.path.basename(dip['foto_url']).replace('_foto_chica', '')
            nueva_ruta = f'/fotos_diputados/{filename}'

            # Solo actualizar si es diferente
            if dip['foto_url'] != nueva_ruta:
                dip['foto_url'] = nueva_ruta
                actualizados += 1

    # Guardar JSON actualizado
    try:
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ JSON guardado con {actualizados} rutas actualizadas")
    except Exception as e:
        print(f"❌ Error al guardar JSON: {e}")
        return

    print("=" * 60)
    print("🎉 Actualización completada!")

if __name__ == "__main__":
    main()
