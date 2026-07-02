"use client";

import {
  Card,
  CardHeader,
  CardContent as CardBody,
} from "@heroui/react";

export default function StatsCard({
  title,
  value,
  icon,
}) {
  return (
    <Card className="bg-slate-900/50 border border-white/10">
      <CardBody>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">{title}</p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {value}
            </h2>
          </div>

          <div className="text-4xl text-pink-500">
            {icon}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}