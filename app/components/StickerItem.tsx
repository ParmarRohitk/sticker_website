import Image from "next/image";

type StickerProps = {
    name: string;
    image: string;
};

export default function StickerItem({ name, image }: StickerProps) {
    return (
        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Image src={image} alt={name} width={40} height={40} className="w-10 h-10" />
            <span className="text-sm font-medium">{name}</span>
        </div>
    );
}
