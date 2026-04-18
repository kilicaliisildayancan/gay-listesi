interface ListItemProps {
  text: string;
  index: number;
}

export const ListItem = ({ text, index }: ListItemProps) => {
  return (
    <div className="win95-inset bg-white p-3 mb-2">
      <div className="flex items-start gap-2">
        <span className="text-primary font-bold">{index}.</span>
        <span className="text-xs leading-relaxed text-wrap">{text}</span>
      </div>
    </div>
  );
};
