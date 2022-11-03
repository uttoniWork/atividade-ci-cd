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
                   archiveArtifacts 'seminario-C214/target/site/'
            }
        }

        
        stage('Notification') {
            steps {
                echo 'Sending email....'
                sh '''
                    cd scripts/
                    chmod 775 *
                   '''
                sh './script-email.sh'
            }
        }
    }
}