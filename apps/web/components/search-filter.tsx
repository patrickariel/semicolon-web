import { Button } from "@semicolon/ui/button";
import { Card, CardContent, CardHeader } from "@semicolon/ui/card";
import { Label } from "@semicolon/ui/label";
import { RadioGroup, RadioGroupItem } from "@semicolon/ui/radio-group";
import React from "react";

export function SimpleSearchFilter() {
  return (
    <div className="flex flex-col gap-3">
      <Card className="rounded-2xl">
        <CardHeader className="p-2 px-5 text-lg font-black">
          Search filters
        </CardHeader>
      </Card>
      <Card className="rounded-2xl">
        <CardContent className="flex flex-col gap-7 p-4 pt-3">
          <article className="flex flex-col gap-3">
            <h3 className="font-black">People</h3>
            <RadioGroup defaultValue="anyone">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="r1">From anyone</Label>
                <RadioGroupItem value="anyone" id="r1" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="r2">People you follow</Label>
                <RadioGroupItem value="following" id="r2" />
              </div>
            </RadioGroup>
          </article>
          <Button variant="link" className="size-fit p-0 text-sky-400">
            Advanced search
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
