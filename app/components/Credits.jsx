"use client";
import React, { useContext } from "react";
import { useAuth } from "../context/authContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Credits() {
  const { user, loading, error, updateUser } = useAuth();
  console.log("user from Credits", user);
  return (
    <>
      <div className="flex gap-3 items-center">
        <span>
          <Image src={"/coin.png"} alt="credit coin" width="48" height="48" />
        </span>
        <span className="font-bold text-gray-700">
          {user?.credit} credits left
        </span>
        <Link href="/buy-credits">
          <Button className="bg-yellow text-gray-800 secondary hover:text-white hover:bg-yellow-400">
            Buy more credits
          </Button>
        </Link>
      </div>
    </>
  );
}

export default Credits;
