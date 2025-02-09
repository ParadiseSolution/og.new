import {
  FontFamily,
  FontWeight,
  fontWeights,
  supportedFonts,
} from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { textColors } from "@/data/colors"

interface TextSettingsProps {
  fontFamily: FontFamily
  onChangeFontFamily: (fontFamily: FontFamily) => void
  fontWeight: FontWeight
  onChangeFontWeight: (fontWeight: FontWeight) => void
  fontSize: number
  onChangeFontSize: (fontSize: number) => void
  color: string
  onChangeColor: (color: string) => void
  className?: string
}

export function TextSettings({
  fontFamily,
  onChangeFontFamily,
  fontWeight,
  onChangeFontWeight,
  fontSize,
  onChangeFontSize,
  color,
  onChangeColor,
  className,
}: TextSettingsProps) {
  return (
    <div className={cn("grid gap-4", className)}>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="font-family">Font family</Label>
          <Select
            value={fontFamily}
            onValueChange={(v) => onChangeFontFamily(v as FontFamily)}
          >
            <SelectTrigger id="font-family" className="col-span-2 h-8">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {supportedFonts.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="font-weight">Font weight</Label>
          <Select
            value={fontWeight.toString()}
            onValueChange={(v) =>
              onChangeFontWeight(parseInt(v as string) as FontWeight)
            }
          >
            <SelectTrigger id="font-weight" className="col-span-2 h-8">
              <SelectValue placeholder="Select a weight" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {supportedFonts
                  .find((f) => f.value === fontFamily)
                  ?.weights.map((weight) => (
                    <SelectItem key={weight} value={weight.toString()}>
                      {fontWeights[weight]}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="font-size">Font size</Label>
          <Input
            id="font-size"
            type="number"
            className="col-span-2 h-8"
            value={fontSize.toString()}
            onChange={(e) => onChangeFontSize(parseInt(e.currentTarget.value))}
          />
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="text-color">Text Color</Label>
          <div className="col-span-2">
            <RadioGroup
              id="text-color"
              className="mb-2"
              value={color}
              onValueChange={onChangeColor}
            >
              <div className="grid grid-cols-4 gap-2 w-full">
                {textColors.map((color) => (
                  <div key={color} className="aspect-square">
                    <RadioGroupItem
                      value={color}
                      id={color}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={color}
                      className="block h-full w-full cursor-pointer rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      style={{
                        background: color,
                      }}
                    ></Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full h-8"
                  style={{
                    backgroundColor: color
                  }}
                >
                  Custom Color
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <HexColorPicker color={color} onChange={onChangeColor} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
