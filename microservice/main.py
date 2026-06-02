from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn
from database import engine, SessionLocal, get_db
from models import Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Student Management System 11",
    version="1.0.0",
    description="Auto-generated API for Student Management System 11"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ HEALTH CHECKS ============

@app.get("/")
def read_root():
    return {"message": "Welcome to Student Management System 11 API"}

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Student Management System 11"}

# ============ AUTO-GENERATED ENDPOINTS ============

@app.get("/students/", response_model=list[Student])
async def get_students(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    """
    List all students with pagination.

    Args:
    - db: Database session.
    - skip: Number of students to skip.
    - limit: Number of students to return.

    Returns:
    - List of students.
    """
    try:
        students = db.query(Student).offset(skip).limit(limit).all()
        return students
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    return []

@app.post("/students/", response_model=Student)
async def create_student(db: Session = Depends(get_db), student: StudentCreate = Body(...)):
    """
    Create new students.

    Args:
    - db: Database session.
    - student: Student details.

    Returns:
    - Created student.
    """
    try:
        new_student = Student(name=student.name, email=student.email)
        db.add(new_student)
        db.commit()
        db.refresh(new_student)
        return new_student
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal Server Error")
    return []

@app.get("/students/{student_id}", response_model=Student)
async def get_student(db: Session = Depends(get_db), student_id: int = Path(..., title="Student ID", gt=0)):
    """
    Get student by ID.

    Args:
    - db: Database session.
    - student_id: Student ID.

    Returns:
    - Student details.
    """
    try:
        student = db.query(Student).filter(Student.id == student_id).first()
        if student is None:
            raise HTTPException(status_code=404, detail="Student not found")
        return student
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    return []

@app.put("/students/{student_id}", response_model=Student)
async def update_student(db: Session = Depends(get_db), student_id: int = Path(..., title="Student ID", gt=0), student: StudentUpdate = Body(...)):
    """
    Update student details.

    Args:
    - db: Database session.
    - student_id: Student ID.
    - student: Updated student details.

    Returns:
    - Updated student.
    """
    try:
        student_to_update = db.query(Student).filter(Student.id == student_id).first()
        if student_to_update is None:
            raise HTTPException(status_code=404, detail="Student not found")
        student_to_update.name = student.name
        student_to_update.email = student.email
        db.commit()
        db.refresh(student_to_update)
        return student_to_update
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Email already exists")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal Server Error")
    return []

@app.delete("/students/{student_id}")
async def delete_student(db: Session = Depends(get_db), student_id: int = Path(..., title="Student ID", gt=0)):
    """
    Delete student.

    Args:
    - db: Database session.
    - student_id: Student ID.

    Returns:
    - None
    """
    try:
        student_to_delete = db.query(Student).filter(Student.id == student_id).first()
        if student_to_delete is None:
            raise HTTPException(status_code=404, detail="Student not found")
        db.delete(student_to_delete)
        db.commit()
        return {"message": "Student deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal Server Error")
    return []
```

```python
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)

class StudentCreate(BaseModel):
    name: str
    email: str

class StudentUpdate(BaseModel):
    name: Optional[str]
    email: Optional[str]

class Student(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True
@app.get("/non-functionals", response_model=List[NonFunctional])
async def read_non_functionals(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    """
    List all non-functionals with pagination.

    Args:
    - db (Session): Database session.
    - skip (int): Number of items to skip.
    - limit (int): Number of items to return.

    Returns:
    - List[NonFunctional]: List of non-functionals.
    """
    try:
        return db.query(NonFunctional).offset(skip).limit(limit).all()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/non-functionals", response_model=NonFunctional)
async def create_non_functional(db: Session = Depends(get_db), non_functional: NonFunctionalCreate = Body(...)):
    """
    Create new non-functional.

    Args:
    - db (Session): Database session.
    - non_functional (NonFunctionalCreate): New non-functional data.

    Returns:
    - NonFunctional: Created non-functional.
    """
    try:
        db_non_functional = NonFunctional(**non_functional.dict())
        db.add(db_non_functional)
        db.commit()
        db.refresh(db_non_functional)
        return db_non_functional
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid input")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.get("/non-functionals/{id}", response_model=NonFunctional)
async def read_non_functional(db: Session = Depends(get_db), id: int = Path(..., title="ID", description="Non-functional ID", gt=0)):
    """
    Get non-functional by ID.

    Args:
    - db (Session): Database session.
    - id (int): Non-functional ID.

    Returns:
    - NonFunctional: Non-functional.
    """
    try:
        return db.query(NonFunctional).filter(NonFunctional.id == id).first()
    except Exception as e:
        raise HTTPException(status_code=404, detail="Non-functional not found")

@app.put("/non-functionals/{id}", response_model=NonFunctional)
async def update_non_functional(db: Session = Depends(get_db), id: int = Path(..., title="ID", description="Non-functional ID", gt=0), non_functional: NonFunctionalUpdate = Body(...)):
    """
    Update non-functional.

    Args:
    - db (Session): Database session.
    - id (int): Non-functional ID.
    - non_functional (NonFunctionalUpdate): Updated non-functional data.

    Returns:
    - NonFunctional: Updated non-functional.
    """
    try:
        db_non_functional = db.query(NonFunctional).filter(NonFunctional.id == id).first()
        if db_non_functional:
            for key, value in non_functional.dict().items():
                setattr(db_non_functional, key, value)
            db.commit()
            db.refresh(db_non_functional)
            return db_non_functional
        else:
            raise HTTPException(status_code=404, detail="Non-functional not found")
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid input")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.delete("/non-functionals/{id}")
async def delete_non_functional(db: Session = Depends(get_db), id: int = Path(..., title="ID", description="Non-functional ID", gt=0)):
    """
    Delete non-functional.

    Args:
    - db (Session): Database session.
    - id (int): Non-functional ID.

    Returns:
    - None
    """
    try:
        db_non_functional = db.query(NonFunctional).filter(NonFunctional.id == id).first()
        if db_non_functional:
            db.delete(db_non_functional)
            db.commit()
        else:
            raise HTTPException(status_code=404, detail="Non-functional not found")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal Server Error")
```

```python
class NonFunctional(Base):
    __tablename__ = "non_functionals"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)

class NonFunctionalCreate(BaseModel):
    name: str
    description: str

    class Config:
        orm_mode = True

class NonFunctionalUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]

    class Config:
        orm_mode = True
from pydantic import BaseModel
from typing import List

# Pydantic models for request/response
class Benefit(BaseModel):
    name: str
    description: str

class BenefitCreate(BaseModel):
    name: str
    description: str

class BenefitUpdate(BaseModel):
    name: str | None
    description: str | None

class BenefitGet(BaseModel):
    id: int
    name: str
    description: str

# Endpoint functions
@app.get("/benefits,s/", response_model=List[BenefitGet])
async def get_benefits(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    """
    List all benefits,s with pagination.
    
    - **200 OK**: List of benefits,s.
    - **400 Bad Request**: Invalid query parameters.
    - **500 Internal Server Error**: Database error.
    """
    try:
        benefits = db.query(Benefit).offset(skip).limit(limit).all()
        return benefits
    except Exception as e:
        return {"error": str(e)}

@app.post("/benefits,s/", response_model=BenefitGet)
async def create_benefit(
    benefit: BenefitCreate, 
    db: Session = Depends(get_db)
):
    """
    Create new benefits,s.
    
    - **201 Created**: New benefits,s.
    - **400 Bad Request**: Invalid request data.
    - **500 Internal Server Error**: Database error.
    """
    try:
        new_benefit = Benefit(name=benefit.name, description=benefit.description)
        db.add(new_benefit)
        db.commit()
        db.refresh(new_benefit)
        return new_benefit
    except Exception as e:
        db.rollback()
        return {"error": str(e)}

@app.get("/benefits,s/{id}", response_model=BenefitGet)
async def get_benefit_by_id(
    id: int, 
    db: Session = Depends(get_db)
):
    """
    Get by ID.
    
    - **200 OK**: Benefits,s by ID.
    - **404 Not Found**: Benefits,s not found.
    - **500 Internal Server Error**: Database error.
    """
    try:
        benefit = db.query(Benefit).filter(Benefit.id == id).first()
        if benefit:
            return benefit
        else:
            raise HTTPException(status_code=404, detail="Benefits,s not found")
    except Exception as e:
        return {"error": str(e)}

@app.put("/benefits,s/{id}", response_model=BenefitGet)
async def update_benefit(
    id: int, 
    benefit: BenefitUpdate, 
    db: Session = Depends(get_db)
):
    """
    Update.
    
    - **200 OK**: Updated benefits,s.
    - **400 Bad Request**: Invalid request data.
    - **404 Not Found**: Benefits,s not found.
    - **500 Internal Server Error**: Database error.
    """
    try:
        existing_benefit = db.query(Benefit).filter(Benefit.id == id).first()
        if existing_benefit:
            if benefit.name:
                existing_benefit.name = benefit.name
            if benefit.description:
                existing_benefit.description = benefit.description
            db.commit()
            db.refresh(existing_benefit)
            return existing_benefit
        else:
            raise HTTPException(status_code=404, detail="Benefits,s not found")
    except Exception as e:
        db.rollback()
        return {"error": str(e)}

@app.delete("/benefits,s/{id}")
async def delete_benefit(
    id: int, 
    db: Session = Depends(get_db)
):
    """
    Delete.
    
    - **200 OK**: Deleted benefits,s.
    - **404 Not Found**: Benefits,s not found.
    - **500 Internal Server Error**: Database error.
    """
    try:
        benefit = db.query(Benefit).filter(Benefit.id == id).first()
        if benefit:
            db.delete(benefit)
            db.commit()
            return {"message": "Benefits,s deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Benefits,s not found")
    except Exception as e:
        db.rollback()
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
