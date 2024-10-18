"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term, newFilters) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // Set filters in the URL
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]) {
        params.set(key, newFilters[key]);
      } else {
        params.delete(key);
      }
    });

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const [query, setQuery] = useState("");

  const [filters, setFilters] = useState({
    storyType: "",
    ageGroup: "",
    imageStyle: "",
    author: "",
    startDate: null,
    endDate: null,
  });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  // };

  // const handleDateChange = (dates) => {
  //   const [startDate, endDate] = dates;
  //   setFilters((prevFilters) => ({ ...prevFilters, startDate, endDate }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSearch(query, filters);
  // };

  // Function to handle the submission of filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    handleSearch(query, {
      ...filters,
      [name]: value,
    });
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto grid-span-2">
      {/* <form onSubmit={handleSubmit} className="space-y-4"> */}
      <form className="space-y-4">
        <div>
          {/* <Input
            type="text"
            placeholder="Search stories by title or subject..."
            // value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full mb-4"
            name="query"
            defaultValue={searchParams.get("query")?.toString}
          /> */}
          <Input
            type="text"
            placeholder="Search stories by title or subject..."
            // value={query}
            onChange={(e) => handleSearch(e.target.value, filters)}
            className="w-full mb-4"
            name="query"
            // onBlur={(e) => handleSearch(query, filters)}
            // defaultValue={searchParams.get("query")?.toString}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="story-type">Story Type</Label>
            {/* <Select
              value={filters.storyType}
              onChange={handleFilterChange}
              name="storyType"
            >
              <SelectTrigger id="story-type">
                <SelectValue placeholder="story type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="story-book">Story Book</SelectItem>
                <SelectItem value="bed-story">Bed Story</SelectItem>
                <SelectItem value="educational">Educational</SelectItem>
              </SelectContent>
            </Select> */}
            <select
              name="storyType"
              onChange={handleFilterChange}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">story type</option>
              <option value="story-book">Story Book</option>
              <option value="bed-story">Bed Story</option>
              <option value="educational">Educational</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="age-group">Age Group</Label>
            {/* <Select onChange={handleFilterChange} name="ageGroup">
              <SelectTrigger id="age-group">
                <SelectValue placeholder="age group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2">0 - 2 years</SelectItem>
                <SelectItem value="3-5">3 - 5 years</SelectItem>
                <SelectItem value="5-8">5 - 8 years</SelectItem>
              </SelectContent>
            </Select> */}
            <select
              name="ageGroup"
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">age group</option>
              <option value="0-2">0 - 2 yrs old</option>
              <option value="3-5">3 - 5 yrs old</option>
              <option value="5-8">5 - 8 yrs old</option>
              {/* Add other options as necessary */}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="image-style">Image Style</Label>
            {/* <Select
              name="imageStyle"
              value={filters.imageStyle}
              onChange={handleFilterChange}
            >
              <SelectTrigger id="image-style">
                <SelectValue placeholder="image style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3d-cartoon">3d cartoon</SelectItem>
                <SelectItem value="paper-cut">paper cut</SelectItem>
                <SelectItem value="water-color">water color</SelectItem>
                <SelectItem value="pixel-style">pixel style</SelectItem>
              </SelectContent>
            </Select> */}
            <select
              name="imageStyle"
              onChange={handleFilterChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">image style</option>
              <option value="3d-cartoon">3d-cartoon</option>
              <option value="paper-cut">paper cut</option>
              <option value="water-color">water color</option>
              <option value="pixel-style">pixel style</option>
              {/* Add other options as necessary */}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="author"
              type="text"
              name="author"
              placeholder="author"
              onChange={handleFilterChange}
            />
          </div>
        </div>

        {/* <DatePicker
          selectsRange
          startDate={filters.startDate}
          endDate={filters.endDate}
          onChange={handleDateChange}
          placeholderText="Select date range"
          className="w-full"
        /> */}

        {/* <Button type="submit" className="w-full mt-8 inline-block">
          Search Stories
        </Button> */}
      </form>
    </Card>
  );
}
