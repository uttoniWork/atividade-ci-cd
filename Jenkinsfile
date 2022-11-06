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
                    node_modules/.bin/ng build
                   '''
            }
        }
        
        stage('Test') {
            steps {
                echo 'Testing..'
                sh '''
                    cd seminario-C214
                    node_modules/.bin/ng test
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
                    ./script.sh ${EMAIL}
                   '''
            }
        }
    }
}