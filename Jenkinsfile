pipeline {
    agent any
    
    parameters {
        string(
            name: 'SSH_KEY_PATH',
            defaultValue: '/var/lib/jenkins/.ssh/id_ed25519',
            description: 'Path to SSH private key for server access (default: /var/lib/jenkins/.ssh/id_ed25519)'
        )
        string(
            name: 'CMS_SERVER',
            defaultValue: 'cms.df3.club',
            description: 'CMS server IP address or hostname'
        )
        string(
            name: 'CMS_USER',
            defaultValue: 'jenkins',
            description: 'SSH username for CMS server'
        )
        string(
            name: 'SSH_PORT',
            defaultValue: '20238',
            description: 'SSH port for server access (default: 20238)'
        )
    }
    
    environment {
        CMS_SERVER = "${params.CMS_SERVER}"
        CMS_USER = "${params.CMS_USER}"
        CMS_PATH = '/var/www/Gos2'
        SSH_KEY = "${params.SSH_KEY_PATH ?: '/var/lib/jenkins/.ssh/id_ed25519'}"
        SSH_PORT = "${params.SSH_PORT ?: '20238'}"
        ENV_FILE = '/var/lib/jenkins/.env/gos2.env'
        PM2_APP_NAME = 'gos2'
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                script {
                    def selectedBranch = 'main'.replaceFirst('^origin/', '')
                    echo "Deploying branch: ${selectedBranch}"
                    
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "*/${selectedBranch}"]],
                        userRemoteConfigs: [[
                            url: 'git@github.com:puniasahab/newGos2.git',
                            credentialsId: 'github-gameofstones'
                        ]]
                    ])
                    
                    sh """
                        git checkout ${selectedBranch}
                        git reset --hard origin/${selectedBranch}
                        git clean -fd
                    """
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci || npm install'
            }
        }
        
        stage('Build Application') {
            steps {
                sh """
                    export NODE_ENV=production
                    export CI=false
                    npm run build
                """
            }
        }
        
        stage('Deploy to Server') {
            steps {
                sh """
                    # Ensure directory exists on remote server
                    ssh -i ${SSH_KEY} -p ${SSH_PORT} -o StrictHostKeyChecking=no -o BatchMode=yes ${CMS_USER}@${CMS_SERVER} "mkdir -p ${CMS_PATH}" || true
                    
                    # Deploy files to server
                    rsync -avz --delete --exclude='node_modules' --exclude='.git' --exclude='.env' -e "ssh -p ${SSH_PORT} -i ${SSH_KEY} -o StrictHostKeyChecking=no -o BatchMode=yes" ./ ${CMS_USER}@${CMS_SERVER}:${CMS_PATH}/
                """
            }
        }
        
        stage('Upload Environment File') {
            steps {
                sh """
                    scp -P ${SSH_PORT} -i ${SSH_KEY} -o StrictHostKeyChecking=no -o BatchMode=yes ${ENV_FILE} ${CMS_USER}@${CMS_SERVER}:${CMS_PATH}/.env || {
                        echo "⚠️  Warning: .env file not found or upload failed"
                        echo "⚠️  Continuing deployment - .env may need manual setup"
                    }
                """
            }
        }
        
        stage('Install Dependencies on Server') {
            steps {
                sh """
                    ssh -i ${SSH_KEY} -p ${SSH_PORT} -o StrictHostKeyChecking=no -o BatchMode=yes ${CMS_USER}@${CMS_SERVER} '
                        cd ${CMS_PATH}
                        npm ci --production || npm install --production
                    '
                """
            }
        }
        
        stage('Reload Application') {
            steps {
                sh """
                    ssh -i ${SSH_KEY} -p ${SSH_PORT} -o StrictHostKeyChecking=no -o BatchMode=yes ${CMS_USER}@${CMS_SERVER} '
                        cd ${CMS_PATH}
                        if pm2 list | grep -q "${PM2_APP_NAME}"; then
                            pm2 reload ${PM2_APP_NAME}
                        else
                            pm2 start npm --name "${PM2_APP_NAME}" -- start
                            pm2 save
                        fi
                    '
                """
            }
        }
    }
    
    post {
        success {
            echo "Deployment completed successfully!"
            echo "Server: ${CMS_USER}@${CMS_SERVER}:${SSH_PORT}"
            echo "Path: ${CMS_PATH}"
            echo "PM2 App: ${PM2_APP_NAME}"
        }
        failure {
            echo "Deployment failed! Please check the logs."
        }
    }
}
