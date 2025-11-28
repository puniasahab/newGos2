pipeline {
    agent any

    environment {
        PROD_USER = "jenkins"
        PROD_HOST = "195.154.184.2"
        PROD_PORT = "20238"
        DEPLOY_DIR = "/var/www/bhakti-bhav"
        SSH_KEY = "/var/lib/jenkins/.ssh/id_ed25519"
        GIT_URL_SSH = "git@github.com:puniasahab/newGos2.git"
        NODE_VERSION = "20.19.0"
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

        stage('Install NVM & Node') {
            steps {
                echo "Installing NVM and Node.js on server..."
                sh """
                    ssh -i ${SSH_KEY} -p ${PROD_PORT} ${PROD_USER}@${PROD_HOST} '
                        export NVM_DIR="\$HOME/.nvm"
                        [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                        nvm install ${NODE_VERSION}
                        nvm use ${NODE_VERSION}
                        nvm alias default ${NODE_VERSION}
                        node -v
                        npm -v
                    '
                """
            }
        }

        stage('Install Dependencies & Build') {
            steps {
                echo "Installing NPM dependencies and building project..."
                sh """
                    ssh -i ${SSH_KEY} -p ${PROD_PORT} ${PROD_USER}@${PROD_HOST} '
                        export NVM_DIR="\$HOME/.nvm"
                        [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}
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
                    ssh -i ${SSH_KEY} -p ${PROD_PORT} ${PROD_USER}@${PROD_HOST} "
                        sudo chown -R jenkins:www-data ${DEPLOY_DIR} &&
                        sudo chmod -R 755 ${DEPLOY_DIR} &&
                        sudo find ${DEPLOY_DIR} -type f -exec chmod 644 {} ';'
                    "
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
