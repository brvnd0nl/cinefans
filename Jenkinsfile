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
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Construcción Backend') {
            steps {
                dir('backend') {
                    sh 'python3 -m venv venv'
                    sh './venv/bin/pip install -r requirements.txt'
                }
            }
        }
        stage('Pruebas') {
            steps {
                dir('backend') {
                    sh './venv/bin/python -m unittest discover'
                }
            }
        }
        stage('Despliegue') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }
}
