pipeline {
    agent any

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
                    archiveArtifacts 'coverage/atividade-ci-cd/ut_report.xml'
            }
        }

        
        stage('Notification') {
            steps {
                echo 'Sending email....'
                sh '''
                    cd scripts/
                    chmod 775 *
                    ./script.sh
                   '''
                sh './script.sh' + 'uttoni.brandani@ges.inatel.br'
            }
        }
    }
}