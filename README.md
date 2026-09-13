# Django & React Full-Stack User & Admin Management App

A full-stack user authentication and administration platform featuring a decoupled **Django REST Framework** API backend and a responsive **React** single-page application frontend. The system provides complete user lifecycle management, JWT-based security, profile customization with avatar upload support, and a comprehensive administrator dashboard.

---

## Tech Stack

### Backend
- **Framework:** [Django 5.1](https://www.djangoproject.com/) & [Django REST Framework 3.15.2](https://www.django-rest-framework.org/)
- **Authentication:** [SimpleJWT 5.3.1](https://django-rest-framework-simplejwt.readthedocs.io/) (JSON Web Tokens with token blacklisting)
- **Database:** PostgreSQL (via `psycopg2-binary 2.9.9`)
- **Environment Management:** `environs 11.0.0`
- **Image Processing:** `Pillow 10.4.0`
- **CORS Handling:** `django-cors-headers 4.4.0`

### Frontend
- **Framework:** [React 18.3.1](https://react.dev/) (bootstrapped with Create React App)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **State Management:** [Redux Toolkit 2.2.7](https://redux-toolkit.js.org/) & [Redux Persist 6.0.0](https://github.com/rt2zz/redux-persist)
- **HTTP Client:** [Axios 1.7.7](https://axios-http.com/)
- **UI & Components:** Bootstrap 5.3.3, React Bootstrap 2.10.4, React Icons 5.3.0
- **Token Decoding:** `jwt-decode 4.0.0`

---

## ⚡ Quick-Start Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm
- PostgreSQL database instance

---

### 1. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a Python virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   Create a `.env` file inside the `backend/` directory:
   ```env
   SECRET_KEY=your_django_secret_key
   DEBUG=True
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

5. **Apply database migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser / admin account:**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server:**
   ```bash
   python manage.py runserver
   ```
   The backend API will run at `http://localhost:8000/`.

---

### 2. Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Run the React development server:**
   ```bash
   npm start
   ```
   The frontend app will launch at `http://localhost:3000/`.

---

## Repository Overview

```
django_react_crud/
├── backend/
│   ├── api/             # Django app containing models, views, serializers, urls, & signals
│   ├── backend/         # Django project settings and root routing
│   ├── media/           # User profile uploaded media files
│   ├── manage.py        # Django management script
│   └── requirements.txt # Python package dependencies
├── frontend/
│   ├── src/
│   │   ├── app/         # Redux store & persistence configuration
│   │   ├── axios/       # Axios instance setup
│   │   ├── components/  # User and Admin React UI components
│   │   └── features/    # Redux slices (auth state)
│   └── package.json     # Node.js package dependencies & scripts
└── AI_MANIFEST.md       # Machine-readable technical architecture manifest
```
