const snoowrap = require('snoowrap');
const inquirer = require('inquirer');
const fs = require('fs').promises;
require('dotenv').config();

const CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/callback';
const USER_AGENT = 'script:token-generator:v1.0';

// Validate environment variables
if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('\nError: Missing Reddit credentials in .env file');
    console.log('Please ensure your .env file contains:');
    console.log('REDDIT_CLIENT_ID=your_client_id');
    console.log('REDDIT_CLIENT_SECRET=your_client_secret\n');
    process.exit(1);
}

const authUrl = snoowrap.getAuthUrl({
    clientId: CLIENT_ID,
    scope: ['read', 'history'],
    redirectUri: REDIRECT_URI,
    permanent: true,
    state: 'fe211bebc52eb3da9bef8db6e63104d3'
});

async function updateEnvFile(refreshToken) {
    try {
        let envContent = await fs.readFile('.env', 'utf-8');
        
        if (envContent.includes('REDDIT_REFRESH_TOKEN=')) {
            // Update existing token
            envContent = envContent.replace(
                /REDDIT_REFRESH_TOKEN=.*/,
                `REDDIT_REFRESH_TOKEN=${refreshToken}`
            );
        } else {
            // Add new token
            envContent += `\nREDDIT_REFRESH_TOKEN=${refreshToken}`;
        }
        
        await fs.writeFile('.env', envContent);
        console.log('\nSuccessfully updated .env file with new refresh token!');
    } catch (error) {
        console.error('\nError updating .env file:', error.message);
        console.log('Please manually add this refresh token to your .env file:');
        console.log(`REDDIT_REFRESH_TOKEN=${refreshToken}\n`);
    }
}

async function getRefreshToken() {
    console.log('\n=== Reddit API Token Generator ===\n');
    console.log('1. Visit this URL in your browser:', authUrl);
    console.log('2. Allow the application access');
    console.log('3. Copy the code from the redirect URL\n');

    const { code } = await inquirer.prompt([
        {
            type: 'input',
            name: 'code',
            message: 'Enter the code from the redirect URL:',
            validate: input => input.length > 0 || 'Please enter the code'
        }
    ]);

    // Clean the code by removing any hash fragments
    const cleanCode = code.split('#')[0];

    try {
        const credentials = await snoowrap.fromAuthCode({
            code: cleanCode,  // Use the cleaned code
            userAgent: USER_AGENT,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            redirectUri: REDIRECT_URI
        });

        console.log('\nSuccess! Received refresh token:', credentials.refreshToken);
        await updateEnvFile(credentials.refreshToken);
    } catch (error) {
        console.error('\nError getting refresh token:', error.message);
        console.error('Full error details:', error);
        console.error('Credentials used (excluding secret):', {
            clientId: CLIENT_ID,
            redirectUri: REDIRECT_URI,
            userAgent: USER_AGENT
        });
    }
}

getRefreshToken(); 