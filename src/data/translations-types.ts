export type UILanguage = 'en' | 'ha' | 'yo' | 'ig' | 'sw' | 'fr' | 'ar' | 'pt' | 'es';

export const UI_LANGUAGE_NAMES: Record<UILanguage, string> = {
  en: 'English',
  ha: 'Hausa',
  yo: 'Yoruba',
  ig: 'Igbo',
  sw: 'Swahili',
  fr: 'French',
  ar: 'Arabic',
  pt: 'Portuguese',
  es: 'Spanish',
};

export type TranslationKey =
  | 'app.title' | 'app.tagline' | 'app.description' | 'app.subtitle' | 'app.footer'
  | 'hero.badge' | 'hero.headline' | 'hero.subtext' | 'hero.cta' | 'hero.cta2'
  | 'nav.language'
  | 'form.title' | 'form.description' | 'form.region' | 'form.regionPlaceholder'
  | 'form.language' | 'form.languagePlaceholder' | 'form.businessName'
  | 'form.businessPlaceholder' | 'form.voice' | 'form.record' | 'form.stop'
  | 'form.recorded' | 'form.recording' | 'form.orType' | 'form.textPlaceholder'
  | 'form.generate' | 'form.generating' | 'form.regionOption' | 'form.languageOption'
  | 'preview.title' | 'preview.description' | 'preview.duration' | 'preview.copy'
  | 'preview.copied' | 'preview.preview' | 'preview.play' | 'preview.voiceover'
  | 'preview.sceneBreakdown' | 'preview.sceneHook' | 'preview.sceneShowcase'
  | 'preview.sceneBenefits' | 'preview.sceneCTA'
  | 'templates.badge' | 'templates.title' | 'templates.description' | 'templates.quickLoad'
  | 'templates.retailName' | 'templates.retailSubtitle' | 'templates.retailDesc'
  | 'templates.fashionName' | 'templates.fashionSubtitle' | 'templates.fashionDesc'
  | 'templates.foodName' | 'templates.foodSubtitle' | 'templates.foodDesc'
  | 'api.title' | 'api.description' | 'api.whisper' | 'api.gemini' | 'api.elevenlabs' | 'api.howTo'
  | 'footer.tagline' | 'footer.copyright'
  | 'error.micDenied'
  | 'regions.Nigeria' | 'regions.Kenya' | 'regions.Ghana' | 'regions.South Africa'
  | 'regions.UAE' | 'regions.USA' | 'regions.UK' | 'regions.Canada' | 'regions.India'
  | 'regions.Brazil' | 'regions.Other';

export type TranslationDict = Record<TranslationKey, string>;

export const DEFAULT_LANG: UILanguage = 'en';