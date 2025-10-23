import xml.etree.ElementTree as ET
import json
import requests
import os

# Opciones de configuración
USAR_XML_LOCAL = True  # Cambiar a False para descargar desde URL
URL_XML = "https://www.senado.gob.mx/66/xml/directorioSenadores.php"
RUTA_XML_LOCAL = "../../../public/data/directorioSenadores.xml"
RUTA_JSON_SALIDA = "../../../public/data/directorioSenadores.json"

def obtener_texto_seguro(elemento, tag, default="Sin Información"):
    """Extrae el texto de un elemento XML de forma segura"""
    child = elemento.find(tag)
    if child is not None and child.text:
        return child.text.strip()
    return default

def leer_xml():
    """Lee el XML desde archivo local o URL"""
    print("--- Iniciando conversión XML a JSON ---")

    if USAR_XML_LOCAL:
        print(f"Leyendo XML desde archivo local: {RUTA_XML_LOCAL}")
        try:
            tree = ET.parse(RUTA_XML_LOCAL)
            return tree.getroot()
        except FileNotFoundError:
            print(f"Error: No se encontró el archivo {RUTA_XML_LOCAL}")
            return None
        except ET.ParseError as e:
            print(f"Error al parsear XML: {e}")
            return None
    else:
        print(f"Descargando XML desde: {URL_XML}")
        try:
            response = requests.get(URL_XML, timeout=10)
            response.raise_for_status()
            response.encoding = 'utf-8'
            root = ET.fromstring(response.content)
            return root
        except requests.exceptions.RequestException as e:
            print(f"Error al descargar XML: {e}")
            return None
        except ET.ParseError as e:
            print(f"Error al parsear XML: {e}")
            return None

def convertir_xml_a_json(root):
    """Convierte el XML parseado a estructura JSON"""
    senadores = []

    # Iterar sobre cada elemento <datos>
    for datos in root.findall('datos'):
        # Combinar nombre y apellidos
        nombre = obtener_texto_seguro(datos, 'nombre')
        apellidos = obtener_texto_seguro(datos, 'apellidos')
        nombre_completo = f"{nombre} {apellidos}".strip()

        # Extraer todos los campos
        senador = {
            "numero": int(obtener_texto_seguro(datos, 'numero', '0')),
            "nombre": nombre_completo,
            "partido": obtener_texto_seguro(datos, 'fraccion'),
            "telefono": obtener_texto_seguro(datos, 'telefono'),
            "extension": obtener_texto_seguro(datos, 'extencion'),  # Nota: tiene typo en XML
            "correo": obtener_texto_seguro(datos, 'correo'),
            "estado": obtener_texto_seguro(datos, 'estado')
        }

        senadores.append(senador)

    return senadores

def guardar_json(senadores):
    """Guarda los datos en archivo JSON"""
    try:
        # Crear directorios si no existen
        os.makedirs(os.path.dirname(RUTA_JSON_SALIDA), exist_ok=True)

        with open(RUTA_JSON_SALIDA, 'w', encoding='utf-8') as f:
            json.dump(senadores, f, ensure_ascii=False, indent=2)

        print(f"\n✓ Datos guardados exitosamente en '{RUTA_JSON_SALIDA}'")
        print(f"✓ Total de senadores procesados: {len(senadores)}")
        return True
    except IOError as e:
        print(f"✗ Error al escribir archivo JSON: {e}")
        return False

def main():
    """Función principal"""
    # 1. Leer XML
    root = leer_xml()
    if root is None:
        print("✗ No se pudo leer el XML. Abortando.")
        return

    # 2. Convertir a JSON
    print("\nProcesando datos...")
    senadores = convertir_xml_a_json(root)

    if not senadores:
        print("✗ No se encontraron datos de senadores en el XML.")
        return

    # 3. Guardar JSON
    guardar_json(senadores)

    # 4. Mostrar muestra de datos
    print("\n--- Muestra de los primeros 3 senadores ---")
    for senador in senadores[:3]:
        print(f"\n{senador['numero']}. {senador['nombre']}")
        print(f"   Partido: {senador['partido']}")
        print(f"   Estado: {senador['estado']}")
        print(f"   Correo: {senador['correo']}")
        print(f"   Extensión: {senador['extension']}")

if __name__ == "__main__":
    main()
