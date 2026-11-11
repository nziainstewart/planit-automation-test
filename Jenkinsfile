// Example Jenkins pipeline. Not run against a Jenkins server.
// The Docker image tag should match the installed Playwright version
// (check with: npx playwright --version).
pipeline {
  agent {
    docker { image 'mcr.microsoft.com/playwright:v1.65.0-noble' }
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run all tests') {
      steps {
        sh 'npm test'
      }
    }

    stage('Contact form x5') {
      steps {
        sh 'npm run test:contact-repeat'
      }
    }
  }

  post {
    always {
      junit 'results/junit.xml'
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
