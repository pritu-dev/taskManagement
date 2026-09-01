CREATE DATABASE IF NOT EXISTS taskflow_db;

USE taskflow_db;


-- =========================
-- USERS TABLE
-- =========================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================
-- PROJECTS TABLE
-- =========================

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (created_by)
    REFERENCES users(id)
);


-- =========================
-- TASKS TABLE
-- =========================

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,

    status ENUM(
        'TODO',
        'IN-PROGRESS',
        'COMPLETED'
    ) NOT NULL DEFAULT 'TODO',

    priority ENUM(
        'LOW',
        'MEDIUM',
        'HIGH'
    ) NOT NULL DEFAULT 'MEDIUM',
    due_date DATE,
    assigned_to INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id)
    REFERENCES projects(id)
    ON DELETE CASCADE,
    
    FOREIGN KEY (assigned_to)
    REFERENCES users(id)
    ON DELETE SET NULL
);

