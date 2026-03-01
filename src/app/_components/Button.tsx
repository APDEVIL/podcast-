"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ButtonCardProps {
  title: string;
  description: string;
  price?: number;
  status?: "PENDING" | "CONFIRMED" | "CANCELLED";
  buttonText: string;
  onButtonClick: () => void;
}

export const ButtonCard: React.FC<ButtonCardProps> = ({
  title,
  description,
  price,
  status,
  buttonText,
  onButtonClick,
}) => {
  return (
    <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition p-4">
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          {status && (
            <Badge
              variant={
                status === "CONFIRMED"
                  ? "default"
                  : status === "PENDING"
                  ? "secondary"
                  : "outline"
              }
            >
              {status}
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        {price !== undefined && (
          <p className="text-sm font-medium text-gray-800">${price}</p>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};
