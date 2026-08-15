import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, Globe } from "lucide-react";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import ApiSettings from "@/components/ApiSettings";
import AdGeneratorForm, { type FormData } from "@/components/AdGeneratorForm";
import AdPreview from "@/components/AdPreview";
import Templates from "@/components/Templates";
import { Separator } from "@/components/ui/separator";

// Placeholder: Transcribe audio to text
function transcribeAudio(audio: Blob, language: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockTranscripts: Record<string, string> = {
        Hausa: "Ina son tallan kayan sawa na zamani. Muna da sabbin kayayyaki masu kyau.",
        English: "I want to advertise my new fashion line with modern designs.",
        Yoruba: "Mo fe polowo awon aso tuntun ti mo se.",
        Igbo: "Achoro m ikpota uwe ocha ndi m huru n'anya.",
        Swahili: "Nataka kutangaza nguo zangu mpya za mtindo.",
      };
      resolve(mockTranscripts[language] || mockTranscripts["English"]);
    }, 1500);
  });
}

// Placeholder: Generate ad script from transcription
function generateAdScript(
  transcription: string,
  businessName: string,
  language: string,
  region: string
): Promise<{
  hook: string;
  body: string;
  cta: string;
  fullScript: string;
  duration: string;
  scenes: { time: string; description: string }[];
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hooks: Record<string, string> = {
        Hausa: `KA MATA! ${businessName} na da sabon abu!`,
        English: `WAIT! ${businessName} has something new!`,
        Yoruba: `DURO! ${businessName} ni nkan tuntun!`,
        Igbo: `Chere! ${businessName} nwere ihe ohuru!`,
        Swahili: `SUBU! ${businessName} ina kitu kipya!`,
      };
      const bodyText = `Mun kawo muku sabbin kayayyaki masu inganci a ${region}. ${transcription.slice(0, 60)}. Kada ku bata wannan damar!`;
      const ctaTexts: Record<string, string> = {
        Hausa: "Kira yanzu ko ziyarci shagonmu!",
        English: "Call now or visit our store!",
        Yoruba: "Pe wa tabi e wo ile itaja wa!",
        Igbo: "Kpokuo anyi ugbua ma obu bia n'ulo ahia anyi!",
        Swahili: "Piga simu sasa au tembelea duka letu!",
      };

      const hook = hooks[language] || hooks["English"];
      const cta = ctaTexts[language] || ctaTexts["English"];
      const fullScript = `${hook}

${bodyText}

${cta}`;

      resolve({
        hook,
        body: bodyText,
        cta,
        fullScript,
        duration: "15-30 seconds",
        scenes: [
          { time: "0:00 - 0:03", description: "Hook: Attention grabber with brand name" },
          { time: "0:03 - 0:08", description: "Showcase: Product/service highlights" },
          { time: "0:08 - 0:12", description: "Benefits: Why customers need this" },
          { time: "0:12 - 0:15", description: "CTA: Call to action with contact info" },
        ],
      });
    }, 2000);
  });
}

function App() {
  const [apiKeys, setApiKeys] = useState({ whisper: "", gemini: "", elevenlabs: "" });
  const [generating, setGenerating] = useState(false);
  const [adScript, setAdScript] = useState<Awaited<ReturnType<typeof generateAdScript>> | null>(null);
  const [formData, setFormData] = useState<FormData>({
    region: "",
    language: "",
    businessName: "",
    audioBlob: null,
    textPrompt: "",
  });

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    setAdScript(null);
    try {
      const transcription = formData.audioBlob
        ? await transcribeAudio(formData.audioBlob, formData.language)
        : formData.textPrompt || "Tallan kayan kasuwa na yau da kullum.";

      const script = await generateAdScript(
        transcription,
        formData.businessName,
        formData.language,
        formData.region
      );
      setAdScript(script);
    } catch (err) {
      console.error("Generation failed:", err);
    } finally {
      setGenerating(false);
    }
  }, [formData]);

  const handleSelectTemplate = useCallback((template: { businessName: string; region: string; language: string; textPrompt: string }) => {
    setFormData((prev) => ({
      ...prev,
      businessName: template.businessName,
      region: template.region,
      language: template.language,
      textPrompt: template.textPrompt,
    }));
    setAdScript(null);
    document.getElementById("generator-form")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white text-emerald-950">
      <Toaster position="top-center" richColors />

      <Header />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* API Settings */}
        <ApiSettings apiKeys={apiKeys} onApiKeysChange={setApiKeys} />

        {/* Generator Form */}
        <AdGeneratorForm
          formData={formData}
          onFormDataChange={setFormData}
          onGenerate={handleGenerate}
          generating={generating}
        />

        {/* Ad Preview */}
        <div className="mt-6">
          <AdPreview script={adScript} generating={generating} />
        </div>

        <Separator className="my-12 bg-emerald-100" />

        {/* Templates */}
        <Templates onSelectTemplate={handleSelectTemplate} />
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-emerald-50/50">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-800" style={{ fontFamily: "Outfit, sans-serif" }}>
              AdGen<span className="text-amber-600">AI</span>
            </span>
          </div>
          <p className="text-xs text-emerald-600/60">
            Kirkira tallan TikTok/Reels cikin sauki da AI. Create ads in any language with AI.
          </p>
          <p className="mt-2 text-xs text-emerald-500/40">
            &copy; {new Date().getFullYear()} AdGenAI. Duk hakkin mallaka an kiyaye.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;