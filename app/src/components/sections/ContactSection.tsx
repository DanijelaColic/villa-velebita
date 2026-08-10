import { getLocale } from 'next-intl/server';
import { getValidLocale } from '@/i18n/messages';
import {
  getDefaultSiteText,
  getSiteTextOverrides,
  resolveSiteText,
} from '@/modules/cms/lib/get-site-texts';
import { Contact } from './Contact';

/** Server wrapper — učitava CMS overridee za kontakt tekstove. */
export async function ContactSection() {
  const locale = getValidLocale(await getLocale());
  const overrides = await getSiteTextOverrides(locale);

  return (
    <Contact
      cmsTitle={resolveSiteText(
        overrides,
        'contact.heading.title',
        getDefaultSiteText(locale, 'contact.heading.title'),
      )}
      cmsSubtitle={resolveSiteText(
        overrides,
        'contact.heading.subtitle',
        getDefaultSiteText(locale, 'contact.heading.subtitle'),
      )}
      cmsIntro={resolveSiteText(
        overrides,
        'contact.intro',
        getDefaultSiteText(locale, 'contact.intro'),
      )}
    />
  );
}
