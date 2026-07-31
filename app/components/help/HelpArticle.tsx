interface HelpArticleProps {
  title: string;
  intro?: string;
  children: React.ReactNode;
}

export function HelpArticle({ title, intro, children }: HelpArticleProps) {
  return (
    <div>
      <h1 className="font-display text-2xl leading-none mb-3">{title}</h1>
      {intro && <p className="mb-6 text-sm leading-7 text-text-muted">{intro}</p>}
      <div
        className="
          [&_h2]:font-display [&_h2]:text-lg [&_h2]:leading-none [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:first:mt-0
          [&_p]:text-sm [&_p]:leading-7 [&_p]:text-text-muted [&_p]:mb-4
          [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:text-sm [&_ul]:leading-7 [&_ul]:text-text-muted
          [&_strong]:font-medium [&_strong]:text-text-main
          [&_code]:rounded-md [&_code]:bg-black/[0.05] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px]
        "
      >
        {children}
      </div>
    </div>
  );
}
