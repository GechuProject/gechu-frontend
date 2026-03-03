"use client";

import { motion } from "motion/react";
import { Clock } from "lucide-react";

interface Search {
  id: number;
  query: string;
  timestamp: string;
}

interface RecentSearchesProps {
  searches: Search[];
}

/** 최근 검색 내역 목록 */
export function RecentSearches({ searches }: RecentSearchesProps) {
  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold text-white">최근 검색 내역</h2>
      <div className="space-y-3">
        {searches.map((search, index) => (
          <motion.div
            key={search.id}
            className="group rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-white/30" />
                <span className="font-medium text-white transition-colors group-hover:text-[#E4FF30]">
                  {search.query}
                </span>
              </div>
              <span className="text-sm text-white/50">{search.timestamp}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
