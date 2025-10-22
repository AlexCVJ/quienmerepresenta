import requests
from bs4 import BeautifulSoup
import time
import csv
import os 

# URL base que no cambia
URL_BASE = "https://sitl.diputados.gob.mx/LXVI_leg/curricula.php?dipt="

# Lista para guardar todos los datos
directorio_completo = []

# --- Columnas para el CSV --- ¡TIENE TODAS LAS 7 COLUMNAS!
COLUMNAS_CSV = ['id_diputado', 'nombre', 'email', 'entidad', 'distrito', 'extension', 'partido']


print(f"--- Iniciando scraping de 500 perfiles (V7 - SCRIPT FINAL COMPLETO) ---")

# 1. Bucle principal: iterar de 1 a 500
for id_diputado in range(1, 501):
    
    # 2. Construir la URL completa
    url_perfil = URL_BASE + str(id_diputado)
    
    print(f"Procesando: {url_perfil} (Diputado {id_diputado}/500)")

    try:
        # 3. Hacer el request al PERFIL
        pagina_perfil = requests.get(url_perfil)
        pagina_perfil.raise_for_status()
        pagina_perfil.encoding = 'iso-8859-1' # Para acentos
        
        soup_perfil = BeautifulSoup(pagina_perfil.text, 'html.parser')

        # 4. Extraer los datos específicos
        
        # --- SELECTOR DE NOMBRE ---
        selector_nombre = soup_perfil.find('h1', class_='header-name')
        nombre = "Nombre no encontrado"
        if selector_nombre:
            nombre_completo = selector_nombre.get_text(strip=True)
            nombre = nombre_completo.replace("Dip.", "").strip()

        # --- SELECTOR DE EMAIL ---
        selector_email_p = soup_perfil.find('p', class_='correo')
        email = "Email no encontrado"
        if selector_email_p:
            selector_email_b = selector_email_p.find('b')
            if selector_email_b:
                email = selector_email_b.get_text(strip=True)

        # --- SELECTORES DE ENTIDAD Y DISTRITO (V5) ---
        entidad = "Entidad no encontrada"
        distrito = "Distrito no encontrado"
        todas_las_b = soup_perfil.find_all('b')
        
        for b_tag in todas_las_b:
            prev_sibling_text = b_tag.previous_sibling
            if prev_sibling_text:
                texto_limpio = str(prev_sibling_text).replace(u'\xa0', ' ').strip()
                
                if texto_limpio.endswith('Entidad:'):
                    entidad_raw = b_tag.get_text(strip=True)
                    entidad = "Estado de México" if entidad_raw == "México" else entidad_raw
                
                if texto_limpio.endswith('Distrito:'):
                    distrito = b_tag.get_text(strip=True)
        
        # --- SELECTOR DE EXTENSIÓN ---
        extension = "Extensión no encontrada"
        selector_icono_tel = soup_perfil.find('i', class_='fa-solid fa-phone-volume')
        if selector_icono_tel:
            selector_p_padre = selector_icono_tel.find_parent('p')
            if selector_p_padre:
                selector_ext_b = selector_p_padre.find('b')
                if selector_ext_b:
                    extension = selector_ext_b.get_text(strip=True)
        
        # --- SELECTOR DE PARTIDO (USA EL HTML QUE MOSTRASTE) ---
        partido = "Partido no encontrado"
        selector_partido_img = soup_perfil.find('img', class_='header-gp')
        if selector_partido_img:
            src_texto = selector_partido_img.get('src')
            if src_texto:
                nombre_archivo = os.path.basename(src_texto)
                partido = nombre_archivo.split('.')[0] # Extrae 'morena' de 'images/morena.webp'
        
        # 5. Guardar los datos en un diccionario
        datos_diputado = {
            "id_diputado": id_diputado,
            "nombre": nombre,
            "email": email,
            "entidad": entidad,
            "distrito": distrito,
            "extension": extension,
            "partido": partido # ¡AQUÍ ESTÁ!
        }
        
        directorio_completo.append(datos_diputado)

        # 6. ¡SER AMABLE! Pausa.
        time.sleep(0.5) 

    except Exception as e_gen:
        print(f"  Ocurrió un error inesperado en {url_perfil}: {e_gen}")

print("\n--- Proceso Terminado ---")

# 7. Guardar todo en un archivo CSV
if directorio_completo:
    print(f"Se extrajeron datos de {len(directorio_completo)} diputados.")
    
    try:
        # ¡ESTE ES EL NUEVO Y DEFINITIVO ARCHIVO CSV!
        nuevo_nombre = 'directorio_diputados_final.csv'
        with open(nuevo_nombre, 'w', newline='', encoding='utf-8') as f:
            escritor = csv.DictWriter(f, fieldnames=COLUMNAS_CSV)
            escritor.writeheader()
            escritor.writerows(directorio_completo)
            
        print(f"Datos guardados exitosamente en '{nuevo_nombre}'")
    except IOError as e:
        print(f"Error al escribir el archivo CSV: {e}")