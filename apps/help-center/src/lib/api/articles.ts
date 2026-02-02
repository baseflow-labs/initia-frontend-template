import { fetchAPI as _fetchAPI } from "./client";

import { Article } from "@/types/documentation";

// Mock data for development
const MOCK_ARTICLES: Record<string, Article[]> = {
  "1-1": [
    // Quick Start
    {
      id: "article-1",
      slug: "welcome",
      subsectionId: "1-1",
      title: "Welcome to the Platform",
      summary: "A brief introduction to get you started",
      content: `
# Welcome to the Platform

Welcome! This guide will help you get started with our platform in just a few minutes.

## What You'll Learn

- How to create your first project
- Basic navigation and features
- Best practices for getting started

## Getting Started

1. **Create an Account**: Sign up for a free account to get started
2. **Set Up Your Profile**: Customize your profile settings
3. **Create Your First Project**: Follow our quick start guide
4. **Explore Features**: Discover what our platform can do

## Next Steps

Once you've completed the basics, check out our [Advanced Features](/features) guide to learn more.

## Need Help?

If you get stuck, our [support team](/contact) is here to help!
      `,
      author: {
        name: "Support Team",
      },
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      viewCount: 1250,
      helpful: 98,
      notHelpful: 2,
      tags: ["getting-started", "basics"],
    },
    {
      id: "article-2",
      slug: "first-project",
      subsectionId: "1-1",
      title: "Creating Your First Project",
      summary: "Step-by-step guide to creating your first project",
      content: `
# Creating Your First Project

Let's walk through creating your first project step by step.

## Prerequisites

Before you begin, make sure you have:
- A verified account
- Completed your profile setup

## Step 1: Navigate to Projects

Click on the "Projects" menu in the sidebar, then click the "New Project" button.

## Step 2: Choose a Template

Select a template that matches your needs:
- **Blank Project**: Start from scratch
- **Quick Start Template**: Pre-configured setup
- **Advanced Template**: Full-featured starting point

## Step 3: Configure Settings

Fill in the project details:
- Project name
- Description
- Privacy settings
- Team members (optional)

## Step 4: Launch

Click "Create Project" and you're ready to go!

## Troubleshooting

Having issues? Check our [troubleshooting guide](/troubleshooting) for common solutions.
      `,
      author: {
        name: "Support Team",
      },
      createdAt: "2024-01-16T10:00:00Z",
      updatedAt: "2024-01-16T10:00:00Z",
      viewCount: 980,
      helpful: 85,
      notHelpful: 5,
      tags: ["projects", "tutorial"],
    },
  ],
  "1-2": [
    // Installation
    {
      id: "article-3",
      slug: "system-requirements",
      subsectionId: "1-2",
      title: "System Requirements",
      summary: "Minimum and recommended system requirements",
      content: `
# System Requirements

Ensure your system meets these requirements for optimal performance.

## Minimum Requirements

- **OS**: Windows 10, macOS 10.15, or Linux
- **RAM**: 4GB
- **Storage**: 2GB free space
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+

## Recommended Requirements

- **OS**: Latest version of Windows 11, macOS, or Linux
- **RAM**: 8GB or more
- **Storage**: 10GB free space
- **Browser**: Latest version of Chrome, Firefox, or Safari
- **Internet**: Broadband connection

## Mobile Requirements

- **iOS**: 14.0 or later
- **Android**: 10.0 or later
      `,
      author: {
        name: "Technical Team",
      },
      createdAt: "2024-01-17T10:00:00Z",
      updatedAt: "2024-01-17T10:00:00Z",
      viewCount: 750,
      helpful: 65,
      notHelpful: 3,
      tags: ["installation", "requirements"],
    },
  ],
};

export async function getArticlesBySubsection(subsectionId: string): Promise<Article[]> {
  try {
    // In production, uncomment this line to fetch from API
    // return await fetchAPI<Article[]>(`/help/subsections/${subsectionId}/articles`)

    // For now, return mock data
    return Promise.resolve(MOCK_ARTICLES[subsectionId] || []);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticle(subsectionId: string, slug: string): Promise<Article | null> {
  try {
    // In production, uncomment this line to fetch from API
    // return await fetchAPI<Article>(`/help/subsections/${subsectionId}/articles/${slug}`)

    // For now, return mock data
    const articles = MOCK_ARTICLES[subsectionId] || [];
    const article = articles.find((a) => a.slug === slug);
    return Promise.resolve(article || null);
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function searchArticles(query: string): Promise<Article[]> {
  try {
    // In production, uncomment this line to fetch from API
    // return await fetchAPI<Article[]>(`/help/articles/search?q=${encodeURIComponent(query)}`)

    // For now, return mock filtered data
    const allArticles = Object.values(MOCK_ARTICLES).flat();
    const filtered = allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.content.toLowerCase().includes(query.toLowerCase())
    );
    return Promise.resolve(filtered);
  } catch (error) {
    console.error("Error searching articles:", error);
    return [];
  }
}
