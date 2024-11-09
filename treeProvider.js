const vscode = require('vscode');

class HackathonTreeProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.hackathons = [];
        this.participants = {};
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    async getChildren(element) {
        if (!element) {
            // Root elements: Hackathons
            if (this.hackathons.length === 0) {
                this.hackathons = await getHackathonsFromServer();
            }
            return this.hackathons.map(hackathon => new TreeItem(hackathon.name, vscode.TreeItemCollapsibleState.Collapsed, hackathon));
        } else if (element.type === 'hackathon') {
            // Child elements: Participants
            if (!this.participants[element.id]) {
                this.participants[element.id] = await getParticipants(element.id);
            }
            return this.participants[element.id].map(participant => new TreeItem(participant.username, vscode.TreeItemCollapsibleState.None, participant));
        }
        return [];
    }
}

class TreeItem extends vscode.TreeItem {
    constructor(label, collapsibleState, data) {
        super(label, collapsibleState);
        this.data = data;

        if (data.type === 'hackathon') {
            this.tooltip = `Hackathon: ${data.name}`;
            this.description = data.id;
        } else if (data.type === 'participant') {
            this.tooltip = `Participant: ${data.username}`;
            this.command = {
                command: 'hackathonTracker.showContributorInfo',
                title: 'Show Contributor Info',
                arguments: [data]
            };
        }
    }
}

module.exports = {
    HackathonTreeProvider,
    TreeItem
};
