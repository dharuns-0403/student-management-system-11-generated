# Student Management System 11

Complete full-stack application generated automatically.

## Project Structure

```
Student Management System 11/
├── frontend/        - React application
├── microservice/    - Python FastAPI backend
└── ddl/            - PostgreSQL database schemas
```

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd microservice
pip install -r requirements.txt
python main.py
```

### Database
```bash
psql -U postgres -f ddl/init.sql
```

## Requirements

- Node.js >= 16
- Python >= 3.8
- PostgreSQL >= 12

## Development

Generated on: 2026-06-02 14:20:09
