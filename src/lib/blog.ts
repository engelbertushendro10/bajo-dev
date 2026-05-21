import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface TutorialPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  difficulty: 'pemula' | 'menengah' | 'mahir';
  readTime: string;
  content: string;
}

const tutorialsDirectory = path.join(process.cwd(), 'src/content/tutorials');

export function getAllTutorials(): TutorialPost[] {
  const fileNames = fs.readdirSync(tutorialsDirectory);
  
  const allTutorials = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(tutorialsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        author: data.author || 'Bajo Dev Team',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        difficulty: data.difficulty || 'pemula',
        readTime: data.readTime || `${Math.ceil(content.split(' ').length / 200)} menit baca`,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allTutorials;
}

export function getTutorialBySlug(slug: string): TutorialPost | null {
  try {
    const fullPath = path.join(tutorialsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author || 'Bajo Dev Team',
      excerpt: data.excerpt,
      tags: data.tags || [],
      difficulty: data.difficulty || 'pemula',
      readTime: data.readTime || `${Math.ceil(content.split(' ').length / 200)} menit baca`,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllTags(): string[] {
  const posts = getAllTutorials();
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}