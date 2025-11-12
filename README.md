# Utopia Creature Collection

Utopia Creature Collection es una herramienta diseñada para almacenar y acceder con facilidad a criaturas personalizadas del juego de mesa Utopia.

## Dependencias
* Python 3.13.9
* NPM 10.9.3

## Instalación

1) Clonar el repositorio

    ```bash
    git clone git@github.com:etec-programacion-3/programacion-3-2025-gonzalezc-FishyBusinessYT.git ./ucc
    ```
2) Ingresar a la carpeta `frontend` y ejecutar `npm install`:
    ```bash
    cd ./ucc/frontend
    npm install
    ```
3) Ingresar a la carpeta `backend`, crear un venv e instalar librerías:
    ```bash
    cd ../backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

## Uso
### Levantar el backend
Ingresar a la carpeta `backend` y ejecutar:
```bash
cd ./ucc/backend
source venv/bin/activate
python app.py
```
### Levantar el frontend
Ingresar a la carpeta `frontend` y ejecutar:
```bash
cd ./ucc/frontend
npm run dev
```
### Conectarse
Una vez estén corriendo ambos servidores, el frontend de la aplicación estará disponible en la dirección [http://localhost:(http://localhost:5173)
