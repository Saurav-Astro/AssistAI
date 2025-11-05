"use client";

import { useTheme } from "@/components/theme-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            Accessibility Settings
          </CardTitle>
          <CardDescription>
            Customize the app to your preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast-mode" className="text-base">
                High Contrast Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Increases text visibility with a dark background.
              </p>
            </div>
            <Switch
              id="high-contrast-mode"
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              aria-label="Toggle high contrast mode"
            />
          </div>

          <div className="space-y-2 rounded-lg border p-4">
            <Label htmlFor="font-size" className="text-base">
              Font Size
            </Label>
            <p className="text-sm text-muted-foreground">
              Adjust the text size for better readability.
            </p>
            <Select
              value={fontSize}
              onValueChange={(value) => setFontSize(value as any)}
            >
              <SelectTrigger id="font-size" className="w-full">
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="md">Medium (Default)</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
                <SelectItem value="xl">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
