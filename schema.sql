CREATE DATABASE recipes_manager;

USE recipes_manager;

CREATE TABLE
    recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        caloriesPerServing INT NOT NULL,
        servings INT NOT NULL
    )
CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL createdAt DATETIME,
        updatedAt DATETIME
    )
CREATE TABLE
    accounts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        isActive BOOLEAN,
        createdAt DATETIME,
        updatedAt DATETIME
    );

CREATE TABLE
    shops (
        id INT AUTO_INCREMENT PRIMARY KEY,
        accountId INT,
        name VARCHAR(255),
        businessName VARCHAR(255),
        email VARCHAR(255),
        businessAddress VARCHAR(255),
        internalAddress VARCHAR(255),
        taxInformation VARCHAR(255),
        isActive BOOLEAN,
        createdAt DATETIME,
        updatedAt DATETIME,
        FOREIGN KEY (accountId) REFERENCES account (id)
    );