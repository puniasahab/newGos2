pipeline {
    agent any

    environment {
        PROD_USER = "jenkins"
        PROD_HOST = "195.154.184.2"
        PROD_PORT = "20238"
        DEPLOY_DIR = "/var/www/bhakti-bhav"
        SSH_KEY = "/var/lib/jenkins/.ssh/id_ed25519"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Pulling code from GitHub..."
                git branch: 'main', url: "${GIT_URL_SSH}"
            }
        }

        stage('Copy to Server') {
            steps {
                echo "Copying files to server..."
                sh """
                    rsync -avz -e "ssh -p ${PROD_PORT} -i ${SSH_KEY}" --exclude='node_modules' ./ ${PROD_USER}@${PROD_HOST}:${DEPLOY_DIR}
                """
            }
        }

        stage('Install Dependencies & Build') {
            steps {
                echo "Installing NPM dependencies and building project..."
                sh """
                    ssh -i ${SSH_KEY} -p ${PROD_PORT} ${PROD_USER}@${PROD_HOST} '
                        cd ${DEPLOY_DIR} &&
                        npm install &&
                        npm run build
                    '
                """
            }
        }

        stage('Set Permissions') {
            steps {
                echo "Setting permissions..."
                sh """
                    ssh -i ${SSH_KEY} -p ${PROD_PORT} ${PROD_USER}@${PROD_HOST} '
                        sudo chown -R jenkins:www-data ${DEPLOY_DIR}
                        sudo find ${DEPLOY_DIR} -type d -exec chmod 755 {} \;
                        sudo find ${DEPLOY_DIR} -type f -exec chmod 644 {} \;
                    '
                """
            }
        }

    }

    post {
        success {
            echo "Deployment completed successfully!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
