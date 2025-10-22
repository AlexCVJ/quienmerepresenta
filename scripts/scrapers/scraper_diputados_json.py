#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Scraper de Diputados LXVI Legislatura - Versión JSON
Extrae datos completos de todos los diputados y genera un archivo JSON unificado.
"""

import requests
from bs4 import BeautifulSoup
import json
import time
from datetime import datetime
import re

# Configuración
URL_LISTADO = "https://sitl.diputados.gob.mx/LXVI_leg/listado_diputados_buscador.php"
URL_BASE_PERFIL = "https://sitl.diputados.gob.mx/LXVI_leg/curricula.php?dipt="
DELAY_ENTRE_REQUESTS = 0.5  # segundos
ENCODING_PERFIL = 'iso-8859-1'

# Estructura de datos global
directorio = {
    "diputados": [],
    "metadata": {
        "fecha_actualizacion": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "legislatura": "LXVI",
        "total_diputados": 0
    }
}

def extraer_ids_del_listado():
    """
    Fase 1: Extrae todos los IDs de diputados desde la página de listado.
    Retorna una lista de diccionarios con datos básicos.
    """
    print("📋 Fase 1: Extrayendo IDs del listado...")

    try:
        response = requests.get(URL_LISTADO)
        response.raise_for_status()
        response.encoding = 'utf-8'

        soup = BeautifulSoup(response.text, 'html.parser')

        # Buscar todos los enlaces a perfiles de diputados
        enlaces = soup.find_all('a', href=re.compile(r'curricula\.php\?dipt=\d+'))

        diputados_basicos = []
        ids_vistos = set()  # Para evitar duplicados

        for enlace in enlaces:
            # Extraer ID del href
            match = re.search(r'dipt=(\d+)', enlace.get('href', ''))
            if not match:
                continue

            id_diputado = int(match.group(1))

            # Evitar duplicados
            if id_diputado in ids_vistos:
                continue
            ids_vistos.add(id_diputado)

            # Extraer texto del enlace (puede contener nombre y datos básicos)
            texto_completo = enlace.get_text(strip=True)

            diputados_basicos.append({
                'id': id_diputado,
                'texto_listado': texto_completo
            })

        print(f"✅ Encontrados {len(diputados_basicos)} diputados en el listado")
        return sorted(diputados_basicos, key=lambda x: x['id'])

    except Exception as e:
        print(f"❌ Error al extraer IDs del listado: {e}")
        return []

def limpiar_texto(texto):
    """Limpia y normaliza texto eliminando espacios extras y caracteres no deseados."""
    if not texto:
        return ""
    return ' '.join(texto.strip().split())

def extraer_comisiones(soup):
    """
    Extrae TODAS las comisiones del diputado (ordinarias y grupos de amistad).
    Busca todos los enlaces que apuntan a 'integrantes_de_comisionlxvi.php'.
    """
    comisiones = []

    # Estrategia: Buscar todos los enlaces a comisiones
    # Formato: <a href="./integrantes_de_comisionlxvi.php?comt=XX">Nombre Comisión (Cargo opcional)</a>
    enlaces_comisiones = soup.find_all('a', href=re.compile(r'integrantes_de_comisionlxvi\.php'))

    for enlace in enlaces_comisiones:
        texto_completo = limpiar_texto(enlace.get_text())

        if not texto_completo:
            continue

        # Separar nombre y cargo (ej: "Justicia (Secretaría)")
        nombre_comision = texto_completo
        cargo = None

        if '(' in texto_completo and ')' in texto_completo:
            match = re.match(r'(.+?)\s*\((.+?)\)', texto_completo)
            if match:
                nombre_comision = limpiar_texto(match.group(1))
                cargo = limpiar_texto(match.group(2))

        comision = {
            "nombre": nombre_comision,
            "url": enlace.get('href', '')
        }

        if cargo:
            comision["cargo"] = cargo

        comisiones.append(comision)

    return comisiones

def extraer_datos_perfil(id_diputado):
    """
    Fase 2: Extrae datos completos del perfil individual de un diputado.
    Retorna un diccionario con toda la información.
    """
    url = URL_BASE_PERFIL + str(id_diputado)

    try:
        response = requests.get(url)
        response.raise_for_status()
        response.encoding = ENCODING_PERFIL

        soup = BeautifulSoup(response.text, 'html.parser')

        # Inicializar estructura de datos
        datos = {
            "id": id_diputado,
            "tipo": "diputado",
            "nombre": None,
            "foto_url": None,
            "email": None,
            "extension": None,
            "partido": {
                "codigo": None,
                "logo_url": None
            },
            "entidad": None,
            "distrito": None,
            "circuito": None,
            "fecha_nacimiento": None,
            "tipo_eleccion": None,
            "suplente": None,
            "comisiones": []
        }

        # --- NOMBRE ---
        selector_nombre = soup.find('h1', class_='header-name')
        if selector_nombre:
            nombre_completo = selector_nombre.get_text(strip=True)
            datos["nombre"] = limpiar_texto(nombre_completo.replace("Dip.", "").replace("Diputado", "").replace("Diputada", ""))

        # --- FOTO URL ---
        # Buscar cualquier imagen con src que contenga 'fotos_lxvi'
        imgs = soup.find_all('img')
        for img in imgs:
            src = img.get('src', '')
            if 'fotos_lxvi' in src.lower():
                datos["foto_url"] = src
                break

        # --- EMAIL ---
        selector_email_p = soup.find('p', class_='correo')
        if selector_email_p:
            selector_email_b = selector_email_p.find('b')
            if selector_email_b:
                datos["email"] = limpiar_texto(selector_email_b.get_text())

        # --- EXTENSIÓN TELEFÓNICA ---
        selector_icono_tel = soup.find('i', class_='fa-solid fa-phone-volume')
        if selector_icono_tel:
            selector_p_padre = selector_icono_tel.find_parent('p')
            if selector_p_padre:
                selector_ext_b = selector_p_padre.find('b')
                if selector_ext_b:
                    datos["extension"] = limpiar_texto(selector_ext_b.get_text())

        # --- PARTIDO ---
        selector_partido_img = soup.find('img', class_='header-gp')
        if selector_partido_img:
            logo_src = selector_partido_img.get('src')
            if logo_src:
                import os
                nombre_archivo = os.path.basename(logo_src)
                datos["partido"]["codigo"] = nombre_archivo.split('.')[0].upper()
                datos["partido"]["logo_url"] = logo_src

        # --- ENTIDAD Y DISTRITO (buscar en todos los <b>) ---
        todas_las_b = soup.find_all('b')
        for b_tag in todas_las_b:
            prev_sibling_text = b_tag.previous_sibling
            if prev_sibling_text:
                texto_limpio = str(prev_sibling_text).replace('\xa0', ' ').strip()

                if 'Entidad:' in texto_limpio:
                    entidad_raw = limpiar_texto(b_tag.get_text())
                    # Normalizar "México" a "Estado de México"
                    datos["entidad"] = "Estado de México" if entidad_raw == "México" else entidad_raw

                if 'Distrito:' in texto_limpio:
                    datos["distrito"] = limpiar_texto(b_tag.get_text())

                if 'Circuito:' in texto_limpio or 'Curul:' in texto_limpio:
                    datos["circuito"] = limpiar_texto(b_tag.get_text())

                if 'Suplente:' in texto_limpio:
                    datos["suplente"] = limpiar_texto(b_tag.get_text())

        # --- FECHA DE NACIMIENTO (buscar patrón dd-mes-yyyy en <b> tags) ---
        for b_tag in todas_las_b:
            texto_b = b_tag.get_text(strip=True)
            # Patrón flexible: "2-julio-1968" o "2-julio - 1968" (con/sin espacios)
            # Normalizar: quitar espacios alrededor de guiones
            texto_normalizado = re.sub(r'\s*-\s*', '-', texto_b)
            if re.match(r'\d{1,2}-[a-zA-Z]+-\d{4}', texto_normalizado):
                datos["fecha_nacimiento"] = texto_normalizado
                break

        # --- TIPO DE ELECCIÓN (buscar en el texto de la página) ---
        page_text = soup.get_text()
        if 'Mayoría Relativa' in page_text:
            datos["tipo_eleccion"] = "Mayoría Relativa"
        elif 'Representación Proporcional' in page_text:
            datos["tipo_eleccion"] = "Representación Proporcional"

        # --- COMISIONES ---
        datos["comisiones"] = extraer_comisiones(soup)

        return datos

    except Exception as e:
        print(f"  ❌ Error en perfil {id_diputado}: {e}")
        return None

def main():
    """Función principal del scraper."""
    print("🚀 Iniciando scraper de diputados (versión JSON)")
    print("=" * 60)

    # Fase 1: Obtener IDs del listado
    diputados_basicos = extraer_ids_del_listado()

    if not diputados_basicos:
        print("❌ No se encontraron diputados. Abortando.")
        return

    print(f"\n📊 Total de diputados a procesar: {len(diputados_basicos)}")
    print("=" * 60)

    # Fase 2: Extraer datos completos de cada perfil
    print("\n⚙️  Fase 2: Extrayendo datos completos de perfiles...")

    for i, diputado_basico in enumerate(diputados_basicos, 1):
        id_dip = diputado_basico['id']
        print(f"[{i}/{len(diputados_basicos)}] Procesando diputado ID {id_dip}...", end=" ")

        datos_completos = extraer_datos_perfil(id_dip)

        if datos_completos:
            directorio["diputados"].append(datos_completos)
            print("✅")
        else:
            print("❌")

        # Rate limiting
        time.sleep(DELAY_ENTRE_REQUESTS)

    # Actualizar metadata
    directorio["metadata"]["total_diputados"] = len(directorio["diputados"])

    # Guardar JSON
    print("\n" + "=" * 60)
    print("💾 Guardando archivo JSON...")

    try:
        # Guardar en la carpeta del script
        nombre_archivo = 'diputados.json'
        with open(nombre_archivo, 'w', encoding='utf-8') as f:
            json.dump(directorio, f, ensure_ascii=False, indent=2)

        print(f"✅ Archivo guardado exitosamente: {nombre_archivo}")
        print(f"📊 Total de diputados procesados: {directorio['metadata']['total_diputados']}")
        print(f"📅 Fecha de actualización: {directorio['metadata']['fecha_actualizacion']}")
        print("\n📝 Siguiente paso: Copiar el archivo a public/data/")
        print(f"   cp {nombre_archivo} ../../../public/data/")

    except Exception as e:
        print(f"❌ Error al guardar el archivo: {e}")

    print("=" * 60)
    print("🎉 Scraping completado!")

if __name__ == "__main__":
    main()
