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
                    ng build
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
                    echo inside jenkinsfile before calling script
                    ./script.sh ${EMAIL}
                   '''
            }
        }
    }
}