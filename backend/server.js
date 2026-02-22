const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// Store generated sites (in production use a database)
const sites = new Map();

// Generate website endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, userId } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating site for prompt:', prompt);

    // Create site ID
    const siteId = uuidv4();
    const siteSlug = `site-${Date.now()}`;

    // Generate HTML with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert web developer. Generate a complete, modern HTML website based on the user's description.
          
Rules:
1. Create a SINGLE HTML file with embedded CSS and JavaScript
2. Use modern, clean design with Tailwind CSS (via CDN)
3. Include responsive design
4. Use placeholder images from unsplash or placeholders
5. Make it visually stunning with animations
6. Include Framer Motion-style smooth animations using CSS/JS
7. Return ONLY the complete HTML code, no explanations
8. The HTML should be production-ready and professional

Structure:
- Modern navbar
- Hero section
- Features/Services section  
- About section
- Contact section
- Footer
- Smooth scroll animations
- Hover effects
- Mobile responsive`
        },
        {
          role: "user",
          content: `Create a website for: ${prompt}. Make it beautiful, modern, and professional. Include animations and responsive design.`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const generatedHTML = completion.choices[0].message.content;
    
    // Extract HTML from markdown code block if present
    const htmlMatch = generatedHTML.match(/```html\n?([\s\S]*?)\n?```/) || 
                      generatedHTML.match(/```\n?([\s\S]*?)\n?```/) ||
                      [null, generatedHTML];
    const cleanHTML = htmlMatch[1] || generatedHTML;

    // Store site info
    const siteData = {
      id: siteId,
      slug: siteSlug,
      prompt,
      userId: userId || 'anonymous',
      html: cleanHTML,
      createdAt: new Date().toISOString(),
      url: `https://deyemproject-cloud.github.io/sitecraft-ai/sites/${siteSlug}.html`
    };

    sites.set(siteId, siteData);

    // Save to file (in production use cloud storage)
    const sitesDir = path.join(__dirname, '..', 'sites');
    await fs.ensureDir(sitesDir);
    await fs.writeFile(path.join(sitesDir, `${siteSlug}.html`), cleanHTML);

    console.log('Site generated:', siteSlug);

    res.json({
      success: true,
      site: {
        id: siteId,
        slug: siteSlug,
        url: siteData.url,
        preview: cleanHTML.substring(0, 500) + '...'
      }
    });

  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate site',
      message: error.message 
    });
  }
});

// Get site endpoint
app.get('/api/sites/:id', (req, res) => {
  const site = sites.get(req.params.id);
  if (!site) {
    return res.status(404).json({ error: 'Site not found' });
  }
  res.json(site);
});

// List user's sites
app.get('/api/sites', (req, res) => {
  const userId = req.query.userId || 'anonymous';
  const userSites = Array.from(sites.values())
    .filter(s => s.userId === userId)
    .map(s => ({
      id: s.id,
      slug: s.slug,
      prompt: s.prompt.substring(0, 100) + '...',
      url: s.url,
      createdAt: s.createdAt
    }));
  res.json(userSites);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 SiteCraft AI Backend running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
});
