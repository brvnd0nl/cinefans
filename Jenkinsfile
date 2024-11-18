pipeline {
    agent any
    stages {
        stage('Clonar Repositorio') {
            steps {
                checkout scm
            }
        }
        stage('Construcción Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }
        stage('Construcción Backend') {
            steps {
                dir('backend') {
                    bat 'python -m venv venv'
                    bat 'venv\\Scripts\\pip install -r requirements.txt'
                }
            }
        }
        stage('Pruebas') {
            steps {
                dir('backend') {
                    bat 'venv\\Scripts\\python -m unittest discover'
                }
            }
        }
        stage('Despliegue') {
            steps {
                bat 'docker-compose up -d --build'
            }
        }
    }
}
