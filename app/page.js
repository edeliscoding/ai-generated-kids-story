import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Email from "./components/Email";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <section className="mb-16">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-[300px] bg-[#e6e0d4]">
              <Image
                src="/kidsstoryimagined.webp?height=300&width=600"
                alt="Robot reading a book"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-6">
                <h1 className="text-4xl font-bold mb-4 text-center">
                  Create and explore stories with Kids Story Generator
                </h1>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Email />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">
          What you can do with Kids Story Generator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Create stories with the story generator",
            "Explore stories created by the community",
            "Create and read stories that require credits",
            "Use credits to create stories",
          ].map((feature, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="aspect-square relative mb-4">
                  <Image
                    src={`/3dcartoon${
                      index + 1
                    }.png?height=200&width=200&text=Feature
                    `}
                    alt={feature}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="text-sm">{feature}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <Image
                src="/3dcartoon.png?height=300&width=300&text=Robot Writing"
                alt="Robot writing a story"
                width={300}
                height={300}
              />
            </div>
            <div className="md:w-1/2 md:pl-6">
              <h2 className="text-2xl font-bold mb-4">
                Create and explore stories with Kids Story Generator
              </h2>
              <div className="flex items-center space-x-2">
                <Email />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
