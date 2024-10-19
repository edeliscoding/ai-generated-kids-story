import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ImageSelection({ imagevalue, imageonValueChange }) {
  return (
    <RadioGroup
      //   defaultValue="option-1"
      className="grid grid-cols-3 gap-4"
      value={imagevalue}
      onValueChange={imageonValueChange}
    >
      <div>
        <RadioGroupItem
          value="3d-cartoon"
          id="option-1"
          className="peer sr-only"
        />
        <Label
          htmlFor="option-1"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <img
            src="/imagestyle/3d-cartoon-selection.webp?height=100&width=100"
            alt="Option 1"
            className="mb-3 h-28 w-28 rounded-md object-cover"
          />
          <span className="text-sm font-medium text-muted-foreground">
            3D Cartoon
          </span>
        </Label>
      </div>
      <div>
        <RadioGroupItem
          value="paper-cut"
          id="option-2"
          className="peer sr-only"
        />
        <Label
          htmlFor="option-2"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <img
            src="/imagestyle/paper-cut-selection.webp?height=100&width=100"
            alt="Option 2"
            className="mb-3 h-28 w-28 rounded-md object-cover"
          />
          <span className="text-sm font-medium text-muted-foreground">
            Paper Cut
          </span>
        </Label>
      </div>
      <div>
        <RadioGroupItem
          value="water-color"
          id="option-3"
          className="peer sr-only"
        />
        <Label
          htmlFor="option-3"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <img
            src="/imagestyle/water-color-selection.webp?height=100&width=100"
            alt="Option 3"
            className="mb-3 h-28 w-28 rounded-md object-cover"
          />
          <span className="text-sm font-medium text-muted-foreground">
            Water Color
          </span>
        </Label>
      </div>
      <div>
        <RadioGroupItem
          value="pixel-style"
          id="option-4"
          className="peer sr-only"
        />
        <Label
          htmlFor="option-4"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <img
            src="/imagestyle/pixelated-selection.webp?height=100&width=100"
            alt="Option 4"
            className="mb-3 h-28 w-28 rounded-md object-cover"
          />
          <span className="text-sm font-medium text-muted-foreground">
            Pixel Style
          </span>
        </Label>
      </div>
    </RadioGroup>
  );
}
