"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filters } from "@/components/shared/filters";

export function MobileFiltersToggle() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="md:hidden">
      <Button onClick={() => setShowFilters((prev) => !prev)} className="w-full">
        {showFilters ? "Скрыть фильтрацию" : "Показать фильтрацию"}
      </Button>
      {showFilters && (
        <div className="mt-4">
          <Filters />
        </div>
      )}
    </div>
  );
}
