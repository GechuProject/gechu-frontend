"use client";

import { motion } from "motion/react";
import { Clock } from "lucide-react";
import styles from "./RecentSearches.module.scss";

interface Search {
  id: number;
  query: string;
  timestamp: string;
}

interface RecentSearchesProps {
  searches: Search[];
}

export function RecentSearches({ searches }: RecentSearchesProps) {
  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>최근 검색 내역</h2>
      <div className={styles.list}>
        {searches.map((search, index) => (
          <motion.div
            key={search.id}
            className={styles.item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className={styles.row}>
              <div className={styles.left}>
                <Clock
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                    color: "rgba(255,255,255,0.3)",
                  }}
                />
                <span className={styles.query}>{search.query}</span>
              </div>
              <span className={styles.timestamp}>{search.timestamp}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
