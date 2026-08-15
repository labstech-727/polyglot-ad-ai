import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Play, Check, Video, Headphones, Timer, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AdScript {
  hook: string;
  body: string;
  cta: string;
  fullScript: string;
  duration: string;
  scenes: { time: string; description: string }[];
}

interface AdPreviewProps {
  script: AdScript | null;
  generating: boolean;
}

export default function AdPreview({ script, generating }: AdPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const copyToClipboard = async () => {
    if (!script) return;
    await navigator.clipboard.writeText(script.fullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {(script || generating) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card className="border-emerald-100 shadow-lg overflow-hidden">
            <CardHeader className="border-b border-emerald-50 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-emerald-900" style={{ fontFamily: "Outfit, sans-serif" }}>
                      Sakamakon Tallar / Ad Result
                    </CardTitle>
                    <CardDescription className="text-xs">
                      An kirkira tallan ka / Your ad has been generated
                    </CardDescription>
                  </div>
                </div>
                {script && (
                  <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
                    <Timer className="h-3 w-3 mr-1" />
                    {script.duration}
                  </Badge>
                )}
              </div>
            </CardHeader>

            {script && (
              <CardContent className="space-y-4 pt-5">
                {/* Full Script */}
                <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-4">
                  <p className="text-sm leading-relaxed text-emerald-900 whitespace-pre-line">
                    {script.fullScript}
                  </p>
                </div>

                {/* Scene Breakdown */}
                <div>
                  <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                    Rabe-Raben Scene / Scene Breakdown
                  </h4>
                  <div className="space-y-2">
                    {script.scenes.map((scene, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-lg bg-emerald-50/50 p-3">
                        <Badge variant="outline" className="shrink-0 border-emerald-200 text-emerald-700 bg-white text-xs">
                          {scene.time}
                        </Badge>
                        <span className="text-sm text-emerald-800">{scene.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-emerald-100" />

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <><Check className="h-4 w-4" /> An Kwafi / Copied</>
                    ) : (
                      <><Copy className="h-4 w-4" /> Kwafi Rubutu / Copy Text</>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    className="bg-emerald-700 text-white hover:bg-emerald-800"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Play className="h-4 w-4" />
                    Duba Tallan / Preview Ad
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-600"
                  >
                    <Headphones className="h-4 w-4" />
                    Sautin Murya / Voiceover
                  </Button>
                </div>

                {/* Video Preview Mock */}
                <AnimatePresence>
                  {showPreview && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden rounded-xl"
                    >
                      <div className="relative aspect-[9/16] max-w-[320px] mx-auto bg-gradient-to-b from-emerald-900 via-emerald-800 to-amber-900 rounded-xl overflow-hidden border border-emerald-700 shadow-2xl">
                        {/* Mock TikTok/Reels Preview */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-white/20 text-white border-0 text-xs">Preview</Badge>
                          </div>
                          <Video className="h-12 w-12 text-white/40 mb-4" />
                          <p className="text-white/80 text-sm font-medium leading-relaxed max-w-[200px]">
                            {script.fullScript.split(" ").slice(0, 15).join(" ")}...
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-white/40 text-xs">
                            <Headphones className="h-3 w-3" />
                            Audio Preview
                          </div>
                          <div className="mt-6 flex gap-1.5">
                            {[1, 2, 3].map((bar) => (
                              <motion.div
                                key={bar}
                                className="w-1.5 bg-amber-400/60 rounded-full"
                                animate={{ height: [12, 24, 12] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.15, ease: "easeInOut" }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}