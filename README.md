# Node.js CI/CD Pipeline with GitHub Actions

This project demonstrates a **CI/CD pipeline** using **GitHub Actions** for a Node.js application. The pipeline includes building and testing the application, utilizing **environment variables**, and implementing a **build matrix** to test across multiple Node.js versions.

##  Table of Contents
- [Node.js CI/CD Pipeline with GitHub Actions](#nodejs-cicd-pipeline-with-github-actions)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [🛠 Setup the GitHub Repository](#-setup-the-github-repository)
  - [📜 Create the GitHub Actions Workflow File](#-create-the-github-actions-workflow-file)
  - [Using Environment Variables](#using-environment-variables)
  - [Implementing Build Matrix](#implementing-build-matrix)
  - [Final Adjustments and Success](#final-adjustments-and-success)
  - [📷 Dummy Images](#-dummy-images)
    - [1️⃣ Initial Push and Workflow Triggered](#1️⃣-initial-push-and-workflow-triggered)
    - [2️⃣ Failed Build for Node.js 16](#2️⃣-failed-build-for-nodejs-16)
    - [3️⃣ Successful Build for Node.js 18 and 20](#3️⃣-successful-build-for-nodejs-18-and-20)
    - [4️⃣ Final Successful CI/CD Workflow](#4️⃣-final-successful-cicd-workflow)
- [Project Deployment](#project-deployment)
  - [Prerequisites](#prerequisites)
  - [Steps to Deploy the React Application](#steps-to-deploy-the-react-application)
    - [1. **SSH into the EC2 Instance**](#1-ssh-into-the-ec2-instance)
    - [2. **Clone the Repository**](#2-clone-the-repository)
    - [3. **Install Apache and move build files to Apache Directory**](#3-install-apache-and-move-build-files-to-apache-directory)
    - [4. **Install dependencies and build the React Project**](#4-install-dependencies-and-build-the-react-project)
    - [5. **Move Build Files to Apache Directory**](#5-move-build-files-to-apache-directory)
    - [6. **Update Apache Configuration**](#6-update-apache-configuration)
    - [7. **Enable mod\_rewrite**](#7-enable-mod_rewrite)
    - [8. **Create .htaccess for React Routing**](#8-create-htaccess-for-react-routing)
    - [9. **Restart Apache**](#9-restart-apache)
  - [Conclusion](#conclusion)

---

##  Project Overview
This project follows a **continuous integration and continuous deployment (CI/CD)** approach using **GitHub Actions** to automatically build and test the Node.js application when changes are pushed to the repository.

---

## 🛠 Setup the GitHub Repository
1. **Create a new repository** on GitHub.
2. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
3. **Initialize a Node.js project**:
   ```bash
   npm init -y
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Create a `.gitignore` file** and add:
   ```bash
   node_modules/
   .env
   ```

---

## 📜 Create the GitHub Actions Workflow File
1. Navigate to `.github/workflows/` and create a file named `main.yml`.
2. Add the following workflow script:

```yaml
name: Node.js CI/CD pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18, 20]

    steps:
      - name: Check out the repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Create .env file
        run: |
          echo "VITE_API_URL=${{ secrets.VITE_API_URL }}" >> .env
          echo "VITE_APP_NAME=${{ secrets.VITE_APP_NAME }}" >> .env

      - name: Install dependencies
        run: npm install

      - name: Build the project
        run: npm run build

      - name: Install testing dependencies
        run: npm install --save-dev jsdom

      - name: Run tests
        run: npx vitest
```

---

##  Using Environment Variables
1. **Navigate to your GitHub repository** → `Settings` → `Secrets and variables` → `Actions`.
2. **Add the following secrets**:
   - `VITE_API_URL`: `<your-api-url>`
   - `VITE_APP_NAME`: `<your-app-name>`

---

##  Implementing Build Matrix
A **build matrix** allows testing across multiple Node.js versions.
- Initially, versions **16, 18, and 20** were tested.
- Version **16 failed**, so it was removed.
- The final matrix includes **Node.js 18 and 20**.

---

##  Final Adjustments and Success
- After removing **Node.js 16**, the workflow successfully built and tested the application.
- The GitHub Actions page showed successful execution for **Node.js 18 and 20**.

---

## 📷 Dummy Images
### 1️⃣ Initial Push and Workflow Triggered
![Step 1](./images/step1.png)

### 2️⃣ Failed Build for Node.js 16
![Step 2](./images/step2.png)

### 3️⃣ Successful Build for Node.js 18 and 20
![Step 3](./images/step3.png)

### 4️⃣ Final Successful CI/CD Workflow
![Step 4](./images/step4.png)


# Project Deployment

This guide outlines the steps to manually deploy a React application built with Vite on an EC2 instance running Apache.

## Prerequisites

- EC2 instance with Ubuntu installed
- Apache web server (httpd) installed on the EC2 instance
- SSH access to the EC2 instance
- React project built with Vite
- `npm` installed on the EC2 instance

---

## Steps to Deploy the React Application

### 1. **SSH into the EC2 Instance**

First, SSH into your EC2 instance using the following command:

```bash
ssh -i /path/to/your-key.pem ubuntu@your-ec2-ip
```

### 2. **Clone the Repository**
Clone your project from GitHub into the EC2 instance:

```bash
git clone https://github.com/yourusername/your-repo.git prac-github-actions
cd prac-github-actions
```


### 3. **Install Apache and move build files to Apache Directory**

```bash
 sudo apt update
sudo apt install -y apache2
sudo systemctl start apache2
sudo systemctl enable apache2
sudo systemctl status apache2
```

### 4. **Install dependencies and build the React Project**
Build the project using Vite. This will create the production build in the dist directory:

```bash
npm install
npm run build
ls dist
```
### 5. **Move Build Files to Apache Directory**

```bash
sudo rm -rf /var/www/html/*
sudo mv dist/* /var/www/html/
```

### 6. **Update Apache Configuration**
Ensure that Apache is set up to serve your React app. Edit the default configuration file:

```bash
sudo vim /etc/apache2/sites-available/000-default.conf
```

in the vim configuration file, ensure this is included

```bash
<VirtualHost *:80>
    DocumentRoot /var/www/html
    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

```
### 7. **Enable mod_rewrite**
```bash
sudo a2enmod rewrite
```

### 8. **Create .htaccess for React Routing**
Create or edit the .htaccess file in the /var/www/html directory to ensure correct routing for your React app:

```bash
sudo nano /var/www/html/.htaccess

```
Add the following to the content of your .htaccess file

```bash
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]

```

### 9. **Restart Apache**
Finally, restart Apache to apply the changes:

```bash
sudo systemctl restart apache2
```
---

##  Conclusion
This project successfully demonstrates a **CI/CD pipeline** for a Node.js application using **GitHub Actions**. The implementation of:
- **Environment variables** ensures secure API key handling.
- **Build matrix** allows testing across multiple Node.js versions.
- **Automated build and test** ensures code quality before deployment.



