export interface SiteConfig {
  siteName: string;
  description: string;
  currentlyAt: string;
  socialLinks: {
    twitter: string;
    youtube: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: 'Explorer',
  description: 'A minimal lovely travel blog to share experiences',
  currentlyAt: 'Budapest',
  socialLinks: {
    twitter: 'https://twitter.com/bbc',
    youtube: 'https://youtube.com/bbc',
    github: 'https://github.com/me',
    linkedin: 'https://linkedin.com/me',
    instagram: 'https://instagram.com/bbc'
  }
};

export default siteConfig;
