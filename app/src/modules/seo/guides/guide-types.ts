import type { AppLocale } from '@/i18n/routing';

export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type GuideArticle = {
  slug: string;
  locale: AppLocale;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: string;
  keywords: string[];
  relatedLandingPages: string[];
  sections: GuideSection[];
};

export type GuideListItem = Pick<
  GuideArticle,
  'slug' | 'title' | 'description' | 'publishedAt' | 'readingTime'
>;

export type GuideCoverImage = {
  src: string;
  alt: string;
};

export type GuideActivityCard = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type GuideFaqItem = {
  question: string;
  answer: string;
};

export type GuideEnrichedFields = {
  eyebrow: string;
  coverImage: GuideCoverImage;
  activitiesSectionTitle: string;
  activities: GuideActivityCard[];
  midCtaTitle: string;
  midCtaBody: string;
  midCtaBookingLabel: string;
  midCtaGalleryLabel: string;
  faqSectionTitle: string;
  faqs: GuideFaqItem[];
  relatedLandingsTitle: string;
  relatedLandingsIntro: string;
};

export type GuideArticleMerged = GuideArticle & GuideEnrichedFields;
