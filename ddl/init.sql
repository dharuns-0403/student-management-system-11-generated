-- PostgreSQL DDL for Student Management System 11
-- Generated: 2026-06-02 14:20:09
-- This file sets up the database schema

-- Create database (uncomment and run manually if database doesn't exist)
-- CREATE DATABASE student_management_system_11;

-- Create schema
CREATE SCHEMA IF NOT EXISTS public;

-- Set default schema
SET search_path TO public;

-- ============ AUTO-GENERATED TABLES ============

-- Create table for students entity
CREATE TABLE students (
    -- Unique identifier for each student
    id SERIAL PRIMARY KEY,
    
    -- First name of the student
    first_name VARCHAR(50) NOT NULL,
    
    -- Last name of the student
    last_name VARCHAR(50) NOT NULL,
    
    -- Date of birth of the student
    date_of_birth DATE NOT NULL,
    
    -- Email address of the student
    email VARCHAR(100) UNIQUE NOT NULL,
    
    -- Phone number of the student
    phone_number VARCHAR(20) NOT NULL,
    
    -- Address of the student
    address TEXT NOT NULL,
    
    -- Status of the student (active, inactive, archived)
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'inactive', 'archived')) DEFAULT 'active',
    
    -- Timestamp when the record was created
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Timestamp when the record was last updated
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Additional information about the student
    details JSON NOT NULL DEFAULT '[]'
);

-- Create index on commonly queried fields
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_students_date_of_birth ON students(date_of_birth);
-- Create table for non-functionals entity
CREATE TABLE non_functionals (
    -- Unique identifier for non-functional requirement
    id SERIAL PRIMARY KEY,
    
    -- Entity type (e.g. performance, security, usability)
    entity_type VARCHAR(50) NOT NULL,
    
    -- Description of the non-functional requirement
    description TEXT NOT NULL,
    
    -- Status of the non-functional requirement (active, inactive, archived)
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    
    -- Timestamp when the non-functional requirement was created
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Timestamp when the non-functional requirement was last updated
    updated_at TIMESTAMP,
    
    -- Unique identifier for the epic
    epic_id INTEGER,
    
    -- Unique identifier for the story
    story_id INTEGER,
    
    -- JSON object to store additional metadata
    metadata JSON,
    
    -- Index on entity type for efficient querying
    -- Create index on entity type for efficient querying
    CREATE INDEX idx_entity_type ON non_functionals (entity_type);
    
    -- Index on status for efficient querying
    -- Create index on status for efficient querying
    CREATE INDEX idx_status ON non_functionals (status);
    
    -- Index on epic_id for efficient querying
    -- Create index on epic_id for efficient querying
    CREATE INDEX idx_epic_id ON non_functionals (epic_id);
    
    -- Index on story_id for efficient querying
    -- Create index on story_id for efficient querying
    CREATE INDEX idx_story_id ON non_functionals (story_id);
);

-- Unique constraint on entity type and epic_id
-- Create unique constraint on entity type and epic_id
ALTER TABLE non_functionals
ADD CONSTRAINT uc_entity_type_epic_id UNIQUE (entity_type, epic_id);

-- Unique constraint on entity type and story_id
-- Create unique constraint on entity type and story_id
ALTER TABLE non_functionals
ADD CONSTRAINT uc_entity_type_story_id UNIQUE (entity_type, story_id);
CREATE TABLE benefits_s (
    id SERIAL PRIMARY KEY,
    -- Unique identifier for the benefit
    name VARCHAR(255) NOT NULL,
    -- Name of the benefit
    description TEXT NOT NULL,
    -- Description of the benefit
    status VARCHAR(20) NOT NULL CHECK(status IN ('active', 'inactive', 'archived')),
    -- State of the benefit (active, inactive, archived)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    -- Timestamp when the benefit was created
    updated_at TIMESTAMP NOT NULL,
    -- Timestamp when the benefit was last updated
    created_by INTEGER,
    -- ID of the user who created the benefit
    updated_by INTEGER,
    -- ID of the user who last updated the benefit
    benefits_type VARCHAR(50) NOT NULL CHECK(benefits_type IN ('health', 'financial', 'education')),
    -- Type of benefit (health, financial, education)
    benefits_details JSON,
    -- Additional details about the benefit
    UNIQUE (name),
    -- Unique constraint on benefit name
    INDEX idx_status (status),
    -- Index on status field for efficient querying
    INDEX idx_benefits_type (benefits_type),
    -- Index on benefits type field for efficient querying
    CONSTRAINT chk_benefits_details CHECK (benefits_details @> '{}')
    -- CHECK constraint to ensure benefits_details is a valid JSON object
);

CREATE INDEX idx_name ON benefits_s (name);
-- Index on name field for efficient querying

CREATE INDEX idx_created_at ON benefits_s (created_at);
-- Index on created_at field for efficient querying

CREATE INDEX idx_updated_at ON benefits_s (updated_at);
-- Index on updated_at field for efficient querying

-- ============ INDEXES ============
-- Add indexes for frequently queried columns

-- ============ CONSTRAINTS ============
-- Add foreign key constraints and unique constraints

-- ============ DATA ============
-- Add initial data if needed
