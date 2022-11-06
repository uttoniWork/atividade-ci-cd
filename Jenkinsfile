pipeline {
    agent any

    environment {
        EMAIL = "uttoni.brandani@ges.inatel.br"
    }

    stages {

        stage('Build') {
            steps {
                echo 'Building..'
                sh '''
                    cd seminario-C214
                    npm install
                   '''
            }
        }
        
        stage('Test') {
            steps {
                echo 'Testing..'
                sh '''
                    cd seminario-C214
                    npm test
                   '''
                    archiveArtifacts 'seminario-C214/coverage/atividade-ci-cd/ut_report.xml'
            }
        }

        
        stage('Notification') {
            steps {
                echo 'Sending email....'
                sh '''
                    cd scripts/
                    chmod 775 *
                   '''
                sh 'echo inside jenkinsfile before calling script'
                sh './script.sh ${EMAIL}'
            }
        }
    }
}