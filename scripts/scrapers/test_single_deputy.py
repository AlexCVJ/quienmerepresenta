#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de prueba para validar extracción de un solo diputado
"""

import sys
import json

# Importar funciones del scraper principal
from scraper_diputados_json import extraer_datos_perfil

def main():
    # Probar con el diputado ID 65 (José Guillermo Anaya Llamas)
    id_prueba = 65

    print(f"🧪 Probando extracción de datos del diputado ID {id_prueba}...")
    print("=" * 60)

    datos = extraer_datos_perfil(id_prueba)

    if datos:
        print("\n✅ Extracción exitosa!\n")
        print(json.dumps(datos, ensure_ascii=False, indent=2))

        print("\n" + "=" * 60)
        print("📊 Validación de campos:")
        print("=" * 60)

        # Validar campos críticos
        validaciones = {
            "Nombre": datos.get("nombre"),
            "Foto URL": datos.get("foto_url"),
            "Email": datos.get("email"),
            "Extensión": datos.get("extension"),
            "Partido": datos.get("partido", {}).get("codigo"),
            "Entidad": datos.get("entidad"),
            "Distrito": datos.get("distrito"),
            "Circuito": datos.get("circuito"),
            "Fecha Nacimiento": datos.get("fecha_nacimiento"),
            "Tipo Elección": datos.get("tipo_eleccion"),
            "Suplente": datos.get("suplente"),
            "Comisiones": len(datos.get("comisiones", []))
        }

        for campo, valor in validaciones.items():
            if campo == "Comisiones":
                status = "✅" if valor > 0 else "❌"
                print(f"{status} {campo}: {valor} encontradas")
            else:
                status = "✅" if valor else "❌"
                print(f"{status} {campo}: {valor or 'NULL'}")

        # Mostrar comisiones
        if datos.get("comisiones"):
            print(f"\n📋 Comisiones encontradas ({len(datos['comisiones'])}):")
            for i, comision in enumerate(datos["comisiones"], 1):
                cargo = f" ({comision['cargo']})" if comision.get('cargo') else ""
                print(f"  {i}. {comision['nombre']}{cargo}")

        # Valores esperados
        print("\n" + "=" * 60)
        print("🎯 Valores esperados (para comparación):")
        print("=" * 60)
        esperados = {
            "Nombre": "José Guillermo Anaya Llamas",
            "Foto URL": "./fotos_lxviconfondo/221_foto_chica.jpg",
            "Fecha Nacimiento": "2-julio-1968",
            "Tipo Elección": "Mayoría Relativa",
            "Comisiones": "6 (3 ordinarias + 3 grupos de amistad)"
        }

        for campo, valor in esperados.items():
            print(f"  • {campo}: {valor}")

    else:
        print("❌ Error: No se pudieron extraer datos")
        sys.exit(1)

if __name__ == "__main__":
    main()
