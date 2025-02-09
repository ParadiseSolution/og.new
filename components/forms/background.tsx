"use client"

import { useTemplateStore } from "@/providers/template-store-provider"
import {
  ArrowBottomLeftIcon,
  ArrowBottomRightIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowTopLeftIcon,
  ArrowTopRightIcon,
  ArrowUpIcon,
  BorderAllIcon,
  DotsHorizontalIcon,
  GridIcon,
  LockClosedIcon,
  ValueNoneIcon,
} from "@radix-ui/react-icons"

import { patterns } from "@/lib/patterns"
import {
  GradientDirection,
  GridOverlayParams,
  toBackgroundShorthand,
} from "@/lib/templates/elements/background"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ResponsivePopover } from "../responsive-popover"
import { linearGradients, solidColors } from "@/data/colors"

const DEFAULT_LINEAR_GRADIENT_DIRECTION: GradientDirection = "to top right"

const gridOverlayColors = ["#030712", "#6b7280", "#f9fafb"]
const gridOverlayDefault: Omit<GridOverlayParams, "pattern"> = {
  color: gridOverlayColors[0],
  opacity: 0.5,
  blurRadius: 20,
}

export function BackgroundForm() {
  const template = useTemplateStore((state) => state)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Background</CardTitle>
        <CardDescription>
          Set a custom background for your image.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Tabs defaultValue="linear-gradient" className="w-full">
            <TabsList>
              <TabsTrigger value="linear-gradient">Gradient</TabsTrigger>
              <TabsTrigger value="color">Solid Color</TabsTrigger>
            </TabsList>

            <TabsContent value="linear-gradient" className="space-y-4">
              <Card className="p-2">
                <RadioGroup
                  value={
                    template.background.type === "linear-gradient"
                      ? JSON.stringify(template.background.colorStops)
                      : undefined
                  }
                  onValueChange={(v) => {
                    template.setBackground({
                      type: "linear-gradient",
                      colorStops: JSON.parse(v),
                      direction:
                        // if the current background is a linear gradient, use its direction
                        // otherwise, use the default direction
                        template.background.type === "linear-gradient"
                          ? template.background.direction
                          : DEFAULT_LINEAR_GRADIENT_DIRECTION,
                      noise: template.background.noise,
                      gridOverlay: template.background.gridOverlay,
                    })
                  }}
                >
                  <div className="flex flex-wrap gap-1">
                    {linearGradients.map(({ colorStops }) => (
                      <div
                        key={JSON.stringify(colorStops)}
                        className="size-9 min-h-9 min-w-9"
                      >
                        <RadioGroupItem
                          value={JSON.stringify(colorStops)}
                          id={JSON.stringify(colorStops)}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={JSON.stringify(colorStops)}
                          className="block aspect-square cursor-pointer rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          style={{
                            background: toBackgroundShorthand({
                              type: "linear-gradient",
                              direction:
                                // if the current background is a linear gradient, use its direction
                                // otherwise, use the default direction
                                template.background.type === "linear-gradient"
                                  ? template.background.direction
                                  : DEFAULT_LINEAR_GRADIENT_DIRECTION,
                              colorStops,
                            }),
                          }}
                        ></Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </Card>

              <div className="space-y-2">
                <div className="text-sm font-medium">Gradient Direction</div>
                <Card className="p-2">
                  <RadioGroup
                    defaultValue="to top right"
                    onValueChange={(v) => {
                      if (template.background.type === "linear-gradient") {
                        template.setBackground({
                          ...template.background,
                          direction: v as GradientDirection,
                        })
                      }
                    }}
                  >
                    <div className="grid grid-cols-8 gap-2">
                      <div>
                        <RadioGroupItem
                          value="to top"
                          id="to-top"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-top"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowUpIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to top right"
                          id="to-top-right"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-top-right"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowTopRightIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to right"
                          id="to-right"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-right"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowRightIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to bottom right"
                          id="to-bottom-right"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-bottom-right"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowBottomRightIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to bottom"
                          id="to-bottom"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-bottom"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowDownIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to bottom left"
                          id="to-bottom-left"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-bottom-left"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowBottomLeftIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to left"
                          id="to-left"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-left"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowLeftIcon className="h-4 w-4" />
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="to top left"
                          id="to-top-left"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="to-top-left"
                          className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ArrowTopLeftIcon className="h-4 w-4" />
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="color">
              <Card className="p-2">
                <RadioGroup
                  value={
                    template.background.type === "color"
                      ? template.background.color
                      : undefined
                  }
                  onValueChange={(v) => {
                    template.setBackground({
                      type: "color",
                      color: v,
                      noise: template.background.noise,
                    })
                  }}
                >
                  <div className="flex flex-wrap gap-1">
                    {solidColors.map((color) => (
                      <div key={color} className="h-9 min-h-9 w-9 min-w-9">
                        <RadioGroupItem
                          value={color}
                          id={color}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={color}
                          className="block aspect-square cursor-pointer rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          style={{
                            background: color,
                          }}
                        ></Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid gap-2 pt-2">
            <div className="flex justify-between">
              <div className="text-sm font-medium">Grid Overlay</div>
              <Badge>New</Badge>
            </div>
            <ResponsivePopover
              title="Grid Overlay"
              description="Apply a grid overlay to the background."
              trigger={
                <Button variant="outline" className="justify-start">
                  {(template.background.gridOverlay?.pattern &&
                    patterns[template.background.gridOverlay?.pattern].label) ||
                    "Select a pattern"}
                </Button>
              }
            >
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Pattern</Label>
                  <RadioGroup
                    defaultValue="none"
                    value={
                      template.background.gridOverlay
                        ? template.background.gridOverlay.pattern
                        : "none"
                    }
                    onValueChange={(v) => {
                      if (v === "none") {
                        template.setBackground({
                          ...template.background,
                          gridOverlay: undefined,
                        })
                      } else {
                        template.setBackground({
                          ...template.background,
                          gridOverlay: {
                            pattern: v as GridOverlayParams["pattern"],
                            color:
                              template.background.gridOverlay?.color ||
                              gridOverlayDefault.color,
                            opacity:
                              template.background.gridOverlay?.opacity ||
                              gridOverlayDefault.opacity,
                            blurRadius:
                              template.background.gridOverlay?.blurRadius ||
                              gridOverlayDefault.blurRadius,
                          },
                        })
                      }
                    }}
                  >
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <RadioGroupItem
                          value="none"
                          id="none"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="none"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <ValueNoneIcon className="h-5 w-5" />
                          <span className="mt-1 text-xs">None</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="grid"
                          id="grid"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="grid"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <GridIcon className="h-5 w-5" />
                          <span className="mt-1 text-xs">Grid</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="graph-paper"
                          id="graph-paper"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="graph-paper"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <BorderAllIcon className="h-5 w-5" />
                          <span className="mt-1 text-xs">Graph</span>
                        </Label>
                      </div>

                      <div>
                        <RadioGroupItem
                          value="dots"
                          id="dots"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="dots"
                          className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <DotsHorizontalIcon className="h-5 w-5" />
                          <span className="mt-1 text-xs">Dots</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text-color">Color</Label>
                  <RadioGroup
                    id="text-color"
                    disabled={!template.background.gridOverlay}
                    value={
                      template.background.gridOverlay
                        ? template.background.gridOverlay.color
                        : undefined
                    }
                    onValueChange={(v) => {
                      template.setBackground({
                        ...template.background,
                        gridOverlay: {
                          ...template.background.gridOverlay,
                          color: v,
                        } as GridOverlayParams,
                      })
                    }}
                  >
                    <div className="flex flex-wrap gap-1">
                      {gridOverlayColors.map((color) => (
                        <div key={color} className="h-9 min-h-9 w-9 min-w-9">
                          <RadioGroupItem
                            value={color}
                            id={color}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={color}
                            className="block aspect-square cursor-pointer rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            style={{
                              background: color,
                            }}
                          ></Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="opacity">Opacity</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                      {template.background.gridOverlay?.opacity || 0}
                    </span>
                  </div>
                  <Slider
                    id="opacity"
                    max={1}
                    defaultValue={[template.background.noise]}
                    step={0.05}
                    disabled={!template.background.gridOverlay}
                    value={
                      template.background.gridOverlay
                        ? [template.background.gridOverlay.opacity]
                        : [0]
                    }
                    onValueChange={(v) => {
                      template.setBackground({
                        ...template.background,
                        gridOverlay: {
                          ...template.background.gridOverlay,
                          opacity: v[0],
                        } as GridOverlayParams,
                      })
                    }}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Opacity"
                  />
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="blur-radius">Blur Radius</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                      {template.background.gridOverlay?.blurRadius || 0}%
                    </span>
                  </div>
                  <Slider
                    id="blur-radius"
                    max={100}
                    defaultValue={[template.background.noise]}
                    step={5}
                    disabled={!template.background.gridOverlay}
                    value={
                      template.background.gridOverlay
                        ? [template.background.gridOverlay.blurRadius]
                        : [0]
                    }
                    onValueChange={(v) => {
                      template.setBackground({
                        ...template.background,
                        gridOverlay: {
                          ...template.background.gridOverlay,
                          blurRadius: v[0],
                        } as GridOverlayParams,
                      })
                    }}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Blur"
                  />
                </div>
              </div>
            </ResponsivePopover>
          </div>

          <div className="grid gap-2">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="noise">Noise</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                      {template.background.noise}
                    </span>
                  </div>
                  <Slider
                    id="noise"
                    max={1}
                    defaultValue={[template.background.noise]}
                    step={0.05}
                    value={[template.background.noise]}
                    onValueChange={(v) =>
                      template.setBackground({
                        ...template.background,
                        noise: v[0],
                      })
                    }
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label="Noise"
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent
                align="start"
                className="w-[260px] text-sm"
                side="top"
              >
                Control the level background noise to add texture. A value
                between 0.1 to 0.25 is recommended.
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
