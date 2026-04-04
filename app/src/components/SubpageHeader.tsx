type SubpageHeaderProps = {
  title: string;
  description?: string;
};

export function SubpageHeader({ title, description }: SubpageHeaderProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-oak">{title}</h1>
      {description ? (
        <p className="mt-2 text-stone max-w-2xl text-base leading-relaxed">{description}</p>
      ) : null}
    </div>
  );
}
