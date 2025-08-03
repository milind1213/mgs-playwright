pipeline {
  agent any

  environment {
    PLAYWRIGHT_IMAGE = 'mcr.microsoft.com/playwright:v1.44.1-jammy'
    PLAYWRIGHT_BROWSERS_PATH = './custom-browsers'
  }

  stages {
    stage('Install & Test') {
      steps {
        script {
          docker.image(env.PLAYWRIGHT_IMAGE).inside('-u root') {
            sh 'npm install'
            sh 'node install-browsers.js'
            sh 'npm run test'
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
