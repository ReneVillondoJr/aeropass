'use client';

import { useMemo, useState } from 'react';

import { popularArticles } from '../data/help';

import type { HelpCategory } from '../types/help';

export function useHelpSearch() {
  const [query, setQuery] = useState('');

  const [category, setCategory] = useState<HelpCategory | 'ALL'>('ALL');

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return popularArticles.filter((article) => {
      const matchesCategory =
        category === 'ALL' || article.category === category;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return (
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.description.toLowerCase().includes(normalizedQuery) ||
        article.content.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [category, query]);

  return {
    query,
    setQuery,
    category,
    setCategory,
    filteredArticles,
  };
}
