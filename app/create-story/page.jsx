"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StoryCreator() {
  const [subject, setSubject] = useState("");
  const [storyType, setStoryType] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [imageStyle, setImageStyle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ subject, storyType, ageGroup, imageStyle });
    // Here you would typically send this data to your backend or process it further
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Children's Story Creator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject of the story</Label>
            <Textarea
              id="subject"
              placeholder="Enter the subject of your story here..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="story-type">Story Type</Label>
            <Select value={storyType} onValueChange={setStoryType}>
              <SelectTrigger id="story-type">
                <SelectValue placeholder="Select story type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="story-book">Story Book</SelectItem>
                <SelectItem value="bed-story">Bed Story</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age-group">Age Group</Label>
            <Select value={ageGroup} onValueChange={setAgeGroup}>
              <SelectTrigger id="age-group">
                <SelectValue placeholder="Select age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5-8">5-8 years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Image Style</Label>
            <RadioGroup
              value={imageStyle}
              onValueChange={setImageStyle}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3d-cartoon" id="3d-cartoon" />
                <Label htmlFor="3d-cartoon">3D Cartoon</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paper-cut" id="paper-cut" />
                <Label htmlFor="paper-cut">Paper Cut</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="water-color" id="water-color" />
                <Label htmlFor="water-color">Water Color</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pixel-style" id="pixel-style" />
                <Label htmlFor="pixel-style">Pixel Style</Label>
              </div>
            </RadioGroup>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Create Story
        </Button>
      </CardFooter>
    </Card>
  );
}
