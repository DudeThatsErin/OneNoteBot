# Erin's Helper Discord Bot

A comprehensive Discord bot designed to help users in Erin's Discord Server with coding questions, server management, and entertainment. The bot provides helpful resources, moderation tools, and fun interactive commands.

## 🚀 Features

- **Help & Support Commands** - Assistance with coding questions and best practices
- **Fun & Entertainment** - Games, jokes, memes, and interactive content
- **Project Information** - Details about Erin's various projects and tools
- **Social Features** - Thanks system and suggestion management
- **Admin Tools** - Server management and moderation commands
- **Utility Commands** - General purpose tools and information

## 📋 Commands

### 🛠️ Admin Commands
*Owner/Moderator only commands for server management*

| Command | Description | Usage |
|---------|-------------|-------|
| `/access` | Shows how to get access to the server | `/access` |
| `/access-two` | Alternative access information | `/access-two` |
| `/boosters` | Information about server booster benefits | `/boosters` |
| `/clearsuggs` | Empties the suggestion database | `/clearsuggs` |
| `/server-rules` | Displays server Code of Conduct | `/server-rules` |
| `/welcome` | Displays server information | `/welcome` |

### 🎮 Fun Commands
*Entertainment and interactive commands*

| Command | Description | Usage |
|---------|-------------|-------|
| `/8ball` | Ask the magic 8-ball a question | `/8ball [question]` |
| `/choose` | Let the bot choose from your options | `/choose [options separated by commas]` |
| `/compliment` | Give someone a nice compliment | `/compliment [user]` |
| `/coinflip` | Flip a coin | `/coinflip` |
| `/dice` | Roll dice | `/dice [sides]` |
| `/fact` | Get a random fun or interesting fact | `/fact` |
| `/joke` | Get a random joke with images | `/joke` |
| `/meme` | Get a random programming meme | `/meme` |
| `/quote` | Get a random inspirational quote | `/quote` |
| `/riddle` | Get a riddle to solve | `/riddle` |
| `/roast` | Get a playful roast | `/roast` |
| `/rps` | Play rock, paper, scissors | `/rps` |
| `/spongebob` | Get SpongeBob quotes and images | `/spongebob` |
| `/trivia` | Test your knowledge with trivia | `/trivia` |

### 💡 Help & Support Commands
*Coding help and best practices*

| Command | Description | Usage |
|---------|-------------|-------|
| `/bin` | Places to share long code snippets | `/bin` |
| `/career` | IT career information and guidance | `/career` |
| `/djs` | Discord.js server invite link | `/djs` |
| `/ddev` | Discord Developers server invite | `/ddev` |
| `/djslangfirst` | Discord.js language-first approach info | `/djslangfirst` |
| `/dom-listening` | DOM event listening best practices | `/dom-listening` |
| `/dpy` | Discord.py server invite link | `/dpy` |
| `/editors` | Information about IDEs and text editors | `/editors` |
| `/elaborate` | Ask for more details on questions | `/elaborate` |
| `/error` | Help with error troubleshooting | `/error` |
| `/faq` | Direct users to FAQ channel | `/faq [user]` |
| `/format` | Code formatting guidelines | `/format [user]` |
| `/freelance` | Self-employment and freelancing info | `/freelance` |
| `/gettinganswers` | How to ask better questions | `/gettinganswers` |
| `/hire` | Information about hiring developers | `/hire` |
| `/justask` | Encourage users to ask their questions | `/justask` |
| `/largehosting` | Hosting provider information | `/largehosting` |
| `/lines` | Avoid flooding chat with short messages | `/lines` |
| `/nojquery` | Why to avoid jQuery | `/nojquery` |
| `/noscreens` | Request code instead of screenshots | `/noscreens` |
| `/patience` | Remind users to be patient | `/patience` |
| `/poorly-phrased` | Ask for better question phrasing | `/poorly-phrased` |
| `/react` | Reactiflux server invite link | `/react` |
| `/rules` | Server rules and guidelines | `/rules` |
| `/share-code` | Proper code sharing guidelines | `/share-code [user]` |
| `/smallhosting` | Quick hosting information | `/smallhosting` |
| `/tryit` | Encourage testing code before asking | `/tryit` |
| `/vla` | Variable Length Array information | `/vla` |
| `/w3c` | Why to avoid W3Schools | `/w3c` |
| `/webassembly` | WebAssembly server invite | `/webassembly` |
| `/wrong-channel` | Redirect to appropriate channel | `/wrong-channel [user]` |

### 📁 Project Commands
*Information about Erin's projects*

| Command | Description | Usage |
|---------|-------------|-------|
| `/all-projects` | Display all of Erin's projects | `/all-projects` |
| `/appseeker` | Information about AppSeeker project | `/appseeker` |
| `/attachment-organizer` | Attachment Organizer Obsidian plugin info | `/attachment-organizer` |
| `/filecreator` | FileCreator Obsidian plugin info | `/filecreator` |
| `/notehost` | Information about NoteHost project | `/notehost` |
| `/quartznotes` | Information about QuartzNotes project | `/quartznotes` |
| `/sasha-ai` | Information about Sasha AI project | `/sasha-ai` |
| `/techbyerin` | Tech By Erin blog information | `/techbyerin` |

### 👥 Social Commands
*Community interaction features*

| Command | Description | Usage |
|---------|-------------|-------|
| `/thanks` | Thank another user | `/thanks [user]` |
| `/unthanks` | Remove thanks from a user | `/unthanks [user]` |
| `/thanks-leaderboard` | View top 10 users by thanks | `/thanks-leaderboard` |

### 💭 Suggestion Commands
*Server suggestion system*

| Command | Description | Usage |
|---------|-------------|-------|
| `/suggestions` | Create a new suggestion | `/suggestions [message]` |
| `/statussugg` | Check suggestion status | `/statussugg [messageID]` |
| `/editsugg` | Edit an existing suggestion | `/editsugg [messageID] [new message]` |
| `/completedsugg` | Mark suggestion as completed | `/completedsugg [messageID] [reason]` |
| `/denied-sugg` | Mark suggestion as denied | `/denied-sugg [messageID] [reason]` |
| `/suggestionprogress` | Check suggestion progress | `/suggestionprogress [messageID]` |

### 🔧 Utility Commands
*General purpose tools*

| Command | Description | Usage |
|---------|-------------|-------|
| `/about` | Information about the bot | `/about` |
| `/avatar` | Get user's avatar | `/avatar [user]` |
| `/help` | Get help with bot commands | `/help [command]` |
| `/invite` | Get server invite link | `/invite` |
| `/learn` | Learning resources and tips | `/learn` |
| `/ping` | Check bot responsiveness | `/ping` |

## 🎯 Special Features

### Image Integration
Many fun commands (joke, meme, fact, quote, spongebob) include dynamic image search using Google Custom Search API for enhanced visual content.

### Thanks System
Users can thank each other for helpful contributions, with a leaderboard tracking the most helpful community members.

### Suggestion System
Complete suggestion management system allowing users to submit ideas and moderators to track and respond to them.

### Smart Moderation
Commands designed to help moderators guide users toward better practices and appropriate channels.

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ 
- Discord Bot Token
- Discord Server with appropriate permissions

### Environment Variables
Create a `.env` file with:
```env
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_bot_client_id
CLIENT_SECRET=your_bot_client_secret
PREFIX=++
DB_PATH=path_to_database
GOOGLE_API_KEY=your_google_api_key (optional)
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id (optional)
```

### Installation
```bash
# Clone the repository
git clone https://github.com/DudeThatsErin/ErinsHelperDiscordBot.git

# Install dependencies
npm install

# Start the bot
npm start
```

### Bot Permissions
The bot requires the following Discord permissions:
- Send Messages
- Use Slash Commands
- Embed Links
- Attach Files
- Read Message History
- Add Reactions
- Manage Messages (for moderation features)

## 📝 Usage Notes

- Commands marked with 🔒 are admin/moderator only
- Commands marked with 🎮 work best in bot-spam channels
- Use `/help [command]` for detailed information about specific commands
- The bot includes cooldowns on certain commands to prevent spam

## 🤝 Contributing

This bot is open source and contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created by **Erin Skidds** for Erin's Discord Server community.

- GitHub: [@DudeThatsErin](https://github.com/DudeThatsErin)
- Discord Server: [Join Here](https://discord.gg/zgkMsNcBPT)

---

*This bot is designed to foster a helpful and welcoming community for developers of all skill levels. Join our Discord server to experience it in action!*
