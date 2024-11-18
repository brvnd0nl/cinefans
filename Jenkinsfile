pipeline {
    agent any
    environment {
        COMPOSE_PROJECT_NAME = "pipeline" // Nombre del proyecto Docker Compose
    }
    stages {
        stage('Preparar Contenedores') {
            steps {
                echo 'Preparando contenedores con Docker Compose...'
                dir('./') {
                    sh 'docker-compose down || true'
                    sh 'docker-compose up -d --build'
                }
            }
        }
        stage('Pruebas Backend') {
            steps {
                echo 'Saltando pruebas en el backend...'
            }
        }
        stage('Pruebas Frontend') {
            steps {
                echo 'Saltando pruebas en el frontend...'
            }
        }
        stage('Verificar Servicios') {
            steps {
                echo 'Verificando servicios...'
                sh 'curl -X GET http://localhost:5000/health || echo "El backend no responde"'
            }
        }
        stage('Despliegue') {
            steps {
                echo 'Desplegando en entorno local...'
            }
        }
    }
    post {
        always {
            echo 'Limpiando contenedores...'
            sh 'docker-compose down || true'
            echo 'El pipeline finalizó.'
        }
        failure {
            echo 'El pipeline falló. Por favor, revisa los errores.'
        }
    }
}
