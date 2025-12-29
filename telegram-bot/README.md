# CampusMitra Telegram Bot

A Telegram bot interface for the CampusMitra AI Assistant that provides intelligent campus information and document-based Q&A.

## Features

- 🤖 **Intelligent Chat**: Natural language conversation with AI assistant
- 📚 **Document Search**: Search across uploaded campus documents
- 💡 **Smart Suggestions**: Interactive buttons for follow-up questions
- ⚡ **Fast Responses**: Optimized for quick information retrieval
- 🔒 **Rate Limited**: Prevents spam and ensures fair usage
- 📱 **Group Support**: Works in both private chats and groups

## Architecture

The Telegram bot acts as a client interface to the existing CampusMitra backend:

```
Telegram User → Telegram Bot → Backend API → AI Pipeline → LangChain/OpenAI
                                     ↓
                               Database (Conversations, Documents)
```

## Prerequisites

1. **Telegram Bot Token**: Create a bot via [@BotFather](https://t.me/BotFather)
2. **Running Backend**: CampusMitra backend must be running
3. **Node.js**: Version 18+ required
4. **Environment Variables**: Configured as per `.env.example`

## Quick Start

### 1. Create Telegram Bot

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Use `/newbot` command
3. Choose a name and username for your bot
4. Save the bot token provided

### 2. Setup Environment

```bash
cd telegram-bot
cp .env.example .env
```

Edit `.env` file:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
BACKEND_API_URL=http://localhost:3001
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Bot

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Configuration

### Environment Variables

| Variable                  | Description              | Default                 | Required |
| ------------------------- | ------------------------ | ----------------------- | -------- |
| `TELEGRAM_BOT_TOKEN`      | Bot token from BotFather | -                       | ✅       |
| `BACKEND_API_URL`         | CampusMitra backend URL  | `http://localhost:3001` | ✅       |
| `BOT_NAME`                | Display name for the bot | `CampusMitra`           | ❌       |
| `MAX_REQUESTS_PER_MINUTE` | Rate limit per minute    | `10`                    | ❌       |
| `MAX_REQUESTS_PER_USER`   | Rate limit per user      | `5`                     | ❌       |
| `LOG_LEVEL`               | Logging level            | `info`                  | ❌       |

### Bot Commands

The bot supports these commands:

- `/start` - Initialize bot and show welcome message
- `/help` - Display help information and usage tips
- `/clear` - Clear conversation history
- `/about` - Information about CampusMitra

## Usage Examples

### Private Chat

```
User: What are the admission requirements?
Bot: Based on the admission handbook, here are the requirements...
     [Interactive buttons for follow-up questions]
```

### Group Chat

```
User: @campusmitra_bot Tell me about hostel facilities
Bot: Here's information about hostel facilities...
```

## Features in Detail

### 1. Smart Suggestions

When the bot responds, it provides up to 3 interactive buttons with related questions based on the source documents:

```
💡 Related topics you might want to explore:
[📄 Engineering Admission Requirements]
[💰 Fee Structure Details]
[🏠 Hostel Accommodation Info]
```

### 2. Source Citations

Responses include source information:

```
📚 Sources used:
📄 Student Handbook (Page 15)
📄 Admission Guide (Page 3)
```

### 3. Rate Limiting

- 10 requests per minute globally
- 5 requests per user per minute
- Automatic cleanup of rate limit data

### 4. Group Support

- Only responds when mentioned: `@campusmitra_bot`
- Supports both groups and supergroups
- Automatic welcome message when added to groups

## Deployment

### Environment-Specific Notes

#### Development

- Use webhook for local testing: `ngrok http 3001`
- Enable debug logging: `LOG_LEVEL=debug`

#### Production

- Use HTTPS for webhook endpoints
- Set up monitoring and alerting
- Use process managers (PM2, Docker, etc.)
- Implement log rotation

## Monitoring

### Health Checks

The bot exposes a health check endpoint:

```bash
curl http://localhost:3001/api/telegram/health
```

### Logs

Monitor bot logs for:

- Message processing errors
- API connectivity issues
- Rate limiting events
- User engagement metrics

### Metrics

Track these metrics in production:

- Messages processed per minute
- Response time to backend API
- Error rates
- Active users

## Troubleshooting

### Common Issues

1. **Bot Not Responding**

   - Check bot token is correct
   - Verify backend is running and accessible
   - Check network connectivity

2. **Rate Limiting Issues**

   - Adjust rate limits in environment variables
   - Monitor user behavior patterns

3. **API Errors**

   - Verify backend API endpoints are working
   - Check authentication and CORS settings

4. **Memory Issues**
   - Monitor conversation storage
   - Implement conversation cleanup

### Debug Mode

Enable detailed logging:

```env
LOG_LEVEL=debug
```

### Testing

Test bot functionality:

```bash
# Health check
curl http://localhost:3001/api/telegram/health

# Direct API test
curl -X POST http://localhost:3001/api/telegram/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"test","telegramUserId":123,"telegramChatId":123}'
```

## Security Considerations

1. **Token Security**: Never commit bot tokens to version control
2. **Rate Limiting**: Prevents abuse and spam
3. **Input Validation**: All user inputs are validated
4. **Error Handling**: Errors don't expose sensitive information
5. **Logging**: User data is logged minimally for privacy

