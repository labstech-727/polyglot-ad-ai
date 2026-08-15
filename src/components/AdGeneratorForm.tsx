import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Globe, Languages, Store, Mic, CircleStop, Sparkles, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const REGIONS = [
  "Nigeria", "Kenya", "Ghana", "South Africa", "UAE", "USA", "Other"
];

const LANGUAGES = [
  "Hausa", "English", "Yoruba", "Igbo", "Swahili", "French", "Arabic", "Spanish", "Portuguese"
];

export interface FormData {
  region: string;
  language: string;
  businessName: string;
  audioBlob: Blob | null;
  textPrompt: string;
}

interface AdGeneratorFormProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onGenerate: () => void;
  generating: boolean;
}

export default function AdGeneratorForm({ formData, onFormDataChange, onGenerate, generating }: AdGeneratorFormProps) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const updateField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    onFormDataChange({ ...formData, [key]: value });
  }, [formData, onFormDataChange]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        updateField("audioBlob", blob);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch {
      // Fallback: let user know mic access failed
      alert("Ba a sami damar yin amfani da makirufo ba. Don Allah a bada izini. / Microphone access denied. Please allow microphone access.");
    }
  }, [updateField]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }, [recording]);

  const isValid = formData.region && formData.language && formData.businessName.trim();

  return (
    <section id="generator-form" className="scroll-mt-8">
      <Card className="border-emerald-100 shadow-lg">
        <CardHeader className="border-b border-emerald-50 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-emerald-900" style={{ fontFamily: "Outfit, sans-serif" }}>
                Kirkira Tallan Ka / Generate Your Ad
              </CardTitle>
              <CardDescription className="text-xs">
                Cika fom din don kirkira tallan TikTok/Reels. Fill the form to create your ad.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-5">
          {/* Region & Language Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
                <Globe className="h-3.5 w-3.5" />
                Zabi Yanki / Region
              </Label>
              <Select value={formData.region} onValueChange={(v) => updateField("region", v)}>
                <SelectTrigger className="w-full border-emerald-200">
                  <SelectValue placeholder="Zabi yanki..." />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
                <Languages className="h-3.5 w-3.5" />
                Zabi Harshe / Language
              </Label>
              <Select value={formData.language} onValueChange={(v) => updateField("language", v)}>
                <SelectTrigger className="w-full border-emerald-200">
                  <SelectValue placeholder="Zabi harshe..." />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Business Name */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
              <Store className="h-3.5 w-3.5" />
              Sunan Kasuwa / Business Name
            </Label>
            <Input
              placeholder="Misali: Alheri Fashion, Kanti Mai Girki..."
              value={formData.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
              className="border-emerald-200"
            />
          </div>

          {/* Voice Recording */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
              <Mic className="h-3.5 w-3.5" />
              Rikodin Murya ko Rubutu / Voice Recording or Text Prompt
            </Label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                {!recording ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    onClick={startRecording}
                  >
                    <Mic className="h-4 w-4" />
                    Fara Rikodi / Record
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="bg-red-500 hover:bg-red-600"
                    onClick={stopRecording}
                  >
                    <CircleStop className="h-4 w-4" />
                    Dakatar / Stop
                  </Button>
                )}
              </div>
              <span className="text-xs text-emerald-600/60">
                {formData.audioBlob
                  ? "An yi rikodin murya / Voice recorded"
                  : recording
                    ? "Ana rikodin murya... / Recording..."
                    : "Ko rubuta ra'ayinka a kasa / Or type below"}
              </span>
            </div>
            <Input
              placeholder="Kwatanta abin da kake so a tallan... / Describe what you want in your ad..."
              value={formData.textPrompt}
              onChange={(e) => updateField("textPrompt", e.target.value)}
              className="border-emerald-200 mt-1"
            />
          </div>

          {/* Generate Button */}
          <motion.div
            className="pt-2"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button
              className="w-full h-12 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white font-semibold text-base rounded-xl shadow-md hover:from-emerald-800 hover:to-emerald-700 disabled:opacity-60"
              disabled={!isValid || generating}
              onClick={onGenerate}
            >
              {generating ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Ana Kirkira... / Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Kirkira Tallan / Generate Ad
                </>
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </section>
  );
}