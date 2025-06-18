# Dynamic Learning Content System

This learning site now supports **dynamic content generation**! You only need to add JSON files to the `data/` directory to create new learning sections.

## How It Works

### 1. Adding New Content

To add new learning content, simply create a JSON file in the `data/` directory following this structure:

```json
{
  "title": "Your Learning Topic Title",
  "description": "Brief description of what this content covers",
  "sections": [
    {
      "id": "section-1-id",
      "title": "Section 1 Title",
      "content": [
        {
          "type": "heading",
          "text": "Main Heading"
        },
        {
          "type": "paragraph",
          "text": "Your paragraph content here"
        },
        {
          "type": "code",
          "language": "javascript",
          "text": "// Your code example\nconsole.log('Hello World');"
        },
        {
          "type": "list",
          "items": ["List item 1", "List item 2", "List item 3"]
        }
      ]
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "question": "Your question here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 1,
      "explanation": "Explanation of why this is the correct answer"
    }
  ]
}
```

### 2. Content Types Supported

The system supports these content types in the `sections.content` array:

- **heading**: Creates an H3 title
- **paragraph**: Regular text content
- **code**: Code blocks with syntax highlighting
- **list**: Bulleted lists

### 3. File Naming

- Use kebab-case for JSON filenames (e.g., `advanced-react-patterns.json`)
- The filename (without .json) becomes the URL slug
- Example: `data/advanced-react-patterns.json` → `/learn/advanced-react-patterns`

### 4. Automatic Routes

Once you add a JSON file, it's automatically accessible at:

- **General route**: `/learn/{filename}`
- **Senior path route**: `/to-be-senior/{filename}`

Both routes use the same content but with different navigation context.

### 5. Content Discovery

New content automatically appears on:

- **Home page**: In the "Available Learning Content" section
- **To Be Senior page**: In the dynamic content list

## Example: Adding New Content

1. Create `data/node-js-fundamentals.json`:

```json
{
  "title": "Node.js Fundamentals",
  "description": "Learn the basics of Node.js server-side development",
  "sections": [
    {
      "id": "introduction",
      "title": "What is Node.js?",
      "content": [
        {
          "type": "heading",
          "text": "Understanding Node.js"
        },
        {
          "type": "paragraph",
          "text": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine."
        }
      ]
    }
  ],
  "testQuestions": []
}
```

2. **That's it!** Your content is now available at:
   - `/learn/node-js-fundamentals`
   - `/to-be-senior/node-js-fundamentals`

## Benefits

- ✅ **No more manual route creation**
- ✅ **Consistent UI across all content**
- ✅ **Automatic content discovery**
- ✅ **Easy content management**
- ✅ **SEO-friendly with proper metadata**

## File Structure

```
data/
├── react-ecosystem.json
├── advanced-javascript-typescript.json
└── your-new-content.json

app/
├── learn/[slug]/page.tsx          # General learning route
├── to-be-senior/[slug]/page.tsx   # Senior path route
└── api/content-list/route.ts      # API for content discovery

lib/
└── content-loader.ts              # Content loading utilities

components/
└── LearningPage.tsx              # Reusable learning page component
```

This system makes your learning site truly dynamic and content-focused!
