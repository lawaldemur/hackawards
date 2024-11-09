const vscode = require('vscode');
const axios = require('axios');
const { exec } = require('child_process');

function activate(context) {
    let disposable = vscode.commands.registerCommand('hackathonTracker.selectHackathon', async () => {
        // Step 1: Select Hackathon
        const hackathons = await getHackathonsFromServer();
        const selectedHackathon = await vscode.window.showQuickPick(hackathons.map(h => ({ label: h.name, description: h.id })), {
            placeHolder: 'Select a Hackathon'
        });

        if (!selectedHackathon) {
            vscode.window.showErrorMessage('No hackathon selected.');
            return;
        }

        // Step 2: Get Participants
        const participants = await getParticipants(selectedHackathon.description);
        if (participants.length === 0) {
            vscode.window.showInformationMessage('No participants found for this hackathon.');
            return;
        }

        // Step 3: Count Lines of Code
        const contributions = await countLinesOfCode(participants);

        if (contributions.length === 0) {
            vscode.window.showInformationMessage('No contributions found.');
            return;
        }

        // Step 4: Determine Top Contributor
        const topContributor = contributions.reduce((prev, current) => {
            return (prev.lines > current.lines) ? prev : current;
        });

        // Step 5: Fetch Top Contributor Info
        const topContributorInfo = await getUserInfo(topContributor.userId);

        // Step 6: Display Information
        vscode.window.showInformationMessage(`Top Contributor: ${topContributorInfo.name} with ${topContributor.lines} lines of code.`);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};

// Helper Functions

// Function to get list of hackathons from the server
async function getHackathonsFromServer() {
    try {
        const response = await axios.get('https://your-server.com/api/hackathons');
        return response.data.hackathons;
    } catch (error) {
        vscode.window.showErrorMessage('Failed to fetch hackathons.');
        return [];
    }
}

// Function to get participants for a selected hackathon
async function getParticipants(hackathonId) {
    try {
        const response = await axios.get(`https://your-server.com/api/hackathons/${hackathonId}/participants`);
        return response.data.participants;
    } catch (error) {
        vscode.window.showErrorMessage('Failed to fetch participants.');
        return [];
    }
}

// Function to count lines of code per participant
async function countLinesOfCode(participants) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folders found.');
        return [];
    }

    const contributions = [];

    for (const participant of participants) {
        // Find the workspace folder matching the participant's repository
        const repoFolder = workspaceFolders.find(folder => folder.name === participant.username);
        if (!repoFolder) {
            vscode.window.showWarningMessage(`Repository for ${participant.username} not found in workspace.`);
            continue;
        }

        // Count lines using git (assuming Git is initialized)
        try {
            const { stdout } = await executeCommand('git', ['ls-files | xargs wc -l'], repoFolder.uri.fsPath);
            const lines = parseLinesFromGitOutput(stdout);
            contributions.push({ userId: participant.userId, lines });
        } catch (error) {
            vscode.window.showWarningMessage(`Failed to count lines for ${participant.username}.`);
        }
    }

    return contributions;
}

// Helper function to execute shell commands
function executeCommand(command, args, cwd) {
    return new Promise((resolve, reject) => {
        // Combine command and args into a single string
        const cmd = `${command} ${args.join(' ')}`;
        exec(cmd, { cwd }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve({ stdout, stderr });
            }
        });
    });
}

// Helper function to parse lines from git command output
function parseLinesFromGitOutput(output) {
    // Example output: total 1234
    const match = output.match(/total\s+(\d+)/);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return 0;
}

// Function to get user information from the server
async function getUserInfo(userId) {
    try {
        const response = await axios.get(`https://your-server.com/api/users/${userId}`);
        return response.data.user;
    } catch (error) {
        vscode.window.showErrorMessage('Failed to fetch top contributor information.');
        return { name: 'Unknown', profileUrl: '' };
    }
}
