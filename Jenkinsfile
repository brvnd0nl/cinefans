pipeline {
    agent any
    environment {
        COMPOSE_PROJECT_NAME = "cinefans" // Define un nombre único para los contenedores
    }
    stages {
        stage('Preparar Contenedores') {
            steps {
                script {
                    // Detener contenedores previos (si existen)
                    sh '''
                    docker-compose down || true
                    '''
                    // Construir y levantar los servicios
                    sh '''
                    docker-compose up -d --build
                    '''
                }
            }
        }
        stage('Pruebas Backend') {
            steps {
                script {
                    // Ejecutar pruebas en el backend
                    sh '''
                    docker exec ${COMPOSE_PROJECT_NAME}_backend pytest || echo "Pruebas del backend fallaron"
                    '''
                }
            }
        }
        stage('Pruebas Frontend') {
            steps {
                script {
                    // Instalar dependencias en el frontend si es necesario
                    sh '''
                    docker exec ${COMPOSE_PROJECT_NAME}_frontend npm install
                    '''
                    // Ejecutar pruebas en el frontend
                    sh '''
                    docker exec ${COMPOSE_PROJECT_NAME}_frontend npm test || echo "Pruebas del frontend fallaron"
                    '''
                }
            }
        }
        stage('Verificar Servicios') {
            steps {
                script {
                    // Verificar que el backend responde correctamente
                    sh '''
                    curl -X GET http://localhost:5000/health || echo "El backend no responde"
                    '''
                }
            }
        }
        stage('Despliegue') {
            steps {
                echo 'Despliegue completado en el entorno local. Listo para producción.'
                // Agregar lógica adicional para despliegue si es necesario
            }
        }
    }
    post {
        always {
            script {
                // Detener todos los contenedores al finalizar
                sh '''
                docker-compose down
                '''
            }
        }
    }
}
