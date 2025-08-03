pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.44.1-jammy'
        }
    }
    environment {
        PLAYWRIGHT_BROWSERS_PATH = './ms-playwright'
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Install Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
