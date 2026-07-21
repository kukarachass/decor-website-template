"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { useT } from "@/lib/i18n";

export function ContactForm() {
  const t = useT();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", message: "" });

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[26px] border border-line bg-white/50 px-8 py-16 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e4efe2]">
          <Check className="h-6 w-6 text-[#4d6b48]" />
        </span>
        <p className="mt-6 font-display text-2xl">{t.pages.formSentTitle}</p>
        <p className="mt-3 max-w-xs text-sm text-ink-2">
          {t.pages.formSentText}
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ name: "", contact: "", message: "" });
          }}
          className="mt-6 cursor-pointer text-sm text-ink-3 underline underline-offset-4 hover:text-ink"
        >
          {t.pages.formAgain}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-[26px] border border-line bg-white/50 p-6 sm:p-8"
    >
      <p className="font-display text-2xl">{t.pages.formTitle}</p>
      <p className="mt-2 text-sm text-ink-2">
        {t.pages.formText}
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <Label htmlFor="cname">{t.pages.formName}</Label>
          <Input
            id="cname"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Olena"
          />
        </div>
        <div>
          <Label htmlFor="ccontact">{t.pages.formContact}</Label>
          <Input
            id="ccontact"
            required
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <Label htmlFor="cmessage">{t.pages.formMessage}</Label>
          <Textarea
            id="cmessage"
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={t.pages.formPlaceholder}
          />
        </div>
      </div>

      <Button type="submit" size="lg" full className="mt-7">
        <Send className="h-4 w-4" />
        {t.pages.formSubmit}
      </Button>
    </form>
  );
}
