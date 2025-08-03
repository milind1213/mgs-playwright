pipeline {
    agent {
        docker {
            image 'node:18'
            args '-u root' // To avoid permission issues
        }
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/milind1213/mgs-playwright.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Playwright browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npm run test'
            }
        }
    }
}
