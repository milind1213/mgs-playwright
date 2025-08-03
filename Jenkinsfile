pipeline {
  agent any

  environment {
    PLAYWRIGHT_IMAGE = 'mcr.microsoft.com/playwright:v1.44.1-jammy'
    PLAYWRIGHT_BROWSERS_PATH = './custom-browsers' // or whatever you use
  }

  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/milind1213/mgs-playwright.git'
      }
    }

    stage('Install & Test') {
      steps {
        script {
          docker.image(env.PLAYWRIGHT_IMAGE).inside('-u root') {
            sh 'npm install'

            // Your custom browser install step
            sh 'node install-browsers.js'

            // Run the tests
            sh 'npm run test'
          }
        }
      }
    }
  }
}
