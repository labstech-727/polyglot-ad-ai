import { motion } from "framer-motion";
import { ShoppingBag, Sparkles, Store, UtensilsCrossed } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TemplateCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  onSelect: () => void;
}

function TemplateCard({ icon, title, subtitle, description, gradient, onSelect }: TemplateCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card className="group cursor-pointer border-emerald-100 overflow-hidden transition-shadow hover:shadow-lg hover:border-emerald-200" onClick={onSelect}>
        <div className={`h-32 ${gradient} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
          <div className="relative z-10 text-white/90">
            {icon}
          </div>
          <Badge className="absolute top-3 right-3 bg-white/20 text-white border-0 text-xs backdrop-blur-sm">
            Quick Load
          </Badge>
        </div>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm font-bold text-emerald-900" style={{ fontFamily: "Outfit, sans-serif" }}>
            {title}
          </CardTitle>
          <CardDescription className="text-xs text-emerald-600">
            {subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <p className="text-xs text-emerald-700/60 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface TemplatesProps {
  onSelectTemplate: (template: { businessName: string; region: string; language: string; textPrompt: string }) => void;
}

const TEMPLATES = [
  {
    icon: <Store className="h-10 w-10" />,
    title: "Kanti / Retail Shop",
    subtitle: "Siyayya & Retail",
    description: "Tallan kanti na gida da kayan sawa. Perfect for local retail shops and clothing stores.",
    gradient: "bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400",
    template: {
      businessName: "Alheri Superstore",
      region: "Nigeria",
      language: "Hausa",
      textPrompt: "Tallan kanti na gida mai sayar da kayan abinci da kayan gida. Muna da rahusa ta musamman a wannan mako."
    }
  },
  {
    icon: <ShoppingBag className="h-10 w-10" />,
    title: "Kwalliya & Tufafi / Fashion",
    subtitle: "Fashion & Beauty",
    description: "Tallan kayan kwalliya da salon tufafi. Fashion and beauty product promotions.",
    gradient: "bg-gradient-to-br from-amber-500 via-amber-400 to-amber-300",
    template: {
      businessName: "Zahra Fashion House",
      region: "Nigeria",
      language: "Hausa",
      textPrompt: "Sabon salon tufafin mata da kayan kwalliya. Muna da sabbin kayayyaki daga Istanbul."
    }
  },
  {
    icon: <UtensilsCrossed className="h-10 w-10" />,
    title: "Abinci & Gidan Abinci / Food",
    subtitle: "Food & Restaurant",
    description: "Tallan gidan abinci da abinci. Restaurant and food delivery promotions.",
    gradient: "bg-gradient-to-br from-emerald-700 via-emerald-600 to-amber-600",
    template: {
      businessName: "Dan Buhari Kitchen",
      region: "Nigeria",
      language: "Hausa",
      textPrompt: "Gidan abinci na musamman da abincin gargajiya. Muna da miya da tuwo da shinkafa."
    }
  }
];

export default function Templates({ onSelectTemplate }: TemplatesProps) {
  return (
    <section id="templates" className="scroll-mt-8">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          Samfuran Misalai / Sample Templates
        </div>
        <h2 className="text-2xl font-bold text-emerald-900" style={{ fontFamily: "Outfit, sans-serif" }}>
          Gwada da Samfuran Mu / Try Our Templates
        </h2>
        <p className="mt-1 text-sm text-emerald-700/60">
          Danna katin domin cika fom da sauri. Click a card to quickly fill the form.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t, i) => (
          <TemplateCard
            key={i}
            icon={t.icon}
            title={t.title}
            subtitle={t.subtitle}
            description={t.description}
            gradient={t.gradient}
            onSelect={() => onSelectTemplate(t.template)}
          />
        ))}
      </div>
    </section>
  );
}