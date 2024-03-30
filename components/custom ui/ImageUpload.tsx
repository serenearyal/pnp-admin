import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          // eslint-disable-next-line react/jsx-key
          <div className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-500 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="ltlzcigu" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button onClick={() => open()}>
              <Plus className="mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
