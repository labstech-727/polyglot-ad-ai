import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Key, ChevronDown, ExternalLink, Bot, Speech } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ApiKeys {
  whisper: string;
  gemini: string;
  elevenlabs: string;
}

interface ApiSettingsProps {
  apiKeys: ApiKeys;
  onApiKeysChange: (keys: ApiKeys) => void;
}

export default function ApiSettings({ apiKeys, onApiKeysChange }: ApiSettingsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-between border-emerald-200 text-emerald-700 hover:bg-emerald-50"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Saitunan API / API Settings
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <Card className="mt-3 border-emerald-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-emerald-900">
                  Kuna Bukatar API Keys / You Need API Keys
                </CardTitle>
                <CardDescription className="text-xs">
                  Sanya API keys don Allah don aiki da AI. Set your API keys below to enable AI features.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
                    <Speech className="h-3.5 w-3.5" />
                    Whisper API Key (Audio Transcription)
                  </Label>
                  <Input
                    type="password"
                    placeholder="sk-..."
                    value={apiKeys.whisper}
                    onChange={(e) => onApiKeysChange({ ...apiKeys, whisper: e.target.value })}
                    className="border-emerald-200 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
                    <Bot className="h-3.5 w-3.5" />
                    Gemini / OpenAI API Key (Ad Script Generation)
                  </Label>
                  <Input
                    type="password"
                    placeholder="AI-..."
                    value={apiKeys.gemini}
                    onChange={(e) => onApiKeysChange({ ...apiKeys, gemini: e.target.value })}
                    className="border-emerald-200 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-1.5 text-xs font-medium text-emerald-800">
                    <Key className="h-3.5 w-3.5" />
                    ElevenLabs API Key (Voiceover)
                  </Label>
                  <Input
                    type="password"
                    placeholder="..."
                    value={apiKeys.elevenlabs}
                    onChange={(e) => onApiKeysChange({ ...apiKeys, elevenlabs: e.target.value })}
                    className="border-emerald-200 text-sm"
                  />
                </div>

                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                  <p className="font-medium mb-1">Yadda ake samun API Keys / How to get API Keys:</p>
                  <ul className="space-y-1 list-disc list-inside opacity-80">
                    <li>
                      Whisper:{" "}
                      <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-amber-900 inline-flex items-center gap-0.5">
                        OpenAI Platform <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </li>
                    <li>
                      Gemini:{" "}
                      <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-amber-900 inline-flex items-center gap-0.5">
                        Google AI Studio <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </li>
                    <li>
                      ElevenLabs:{" "}
                      <a href="https://elevenlabs.io/app/settings/api-keys" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-amber-900 inline-flex items-center gap-0.5">
                        ElevenLabs Settings <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}