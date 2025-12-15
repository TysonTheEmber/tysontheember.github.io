import siteConfig from '@generated/docusaurus.config';

const resolveCurseForgeApiKey = (): string | undefined => {
  const fromConfig = (siteConfig as any)?.customFields?.curseForgeApiKey as string | undefined;
  const fromGlobal =
    typeof globalThis !== 'undefined'
      ? ((globalThis as any).__CF_API_KEY ?? (globalThis as any).CF_API_KEY)
      : undefined;
  return fromConfig || fromGlobal;
};

const resolveCurseForgeAuthorId = (): number | undefined => {
  const fromConfig = (siteConfig as any)?.customFields?.curseForgeAuthorId as number | undefined;
  const fromGlobal =
    typeof globalThis !== 'undefined'
      ? (Number((globalThis as any).__CF_AUTHOR_ID ?? (globalThis as any).CF_AUTHOR_ID) || undefined)
      : undefined;
  return fromConfig || fromGlobal;
};

type ProjectDownloads = {
  modrinth?: number;
  curseforge?: number;
  total?: number;
};

export type DownloadsData = {
  modrinth?: number;
  curseforge?: number;
  total?: number;
  lastUpdated?: string;
  projects?: Record<string, ProjectDownloads>;
};

type CurseForgeConfig = {
  apiKey?: string;
  authorId?: number;
};

const curseForgeConfig: CurseForgeConfig = {
  apiKey: resolveCurseForgeApiKey(),
  authorId: resolveCurseForgeAuthorId(),
};

const fetchStaticDownloads = async (): Promise<DownloadsData | null> => {
  try {
    const response = await fetch('/data/downloads.json', {cache: 'no-store'});
    if (!response.ok) {
      throw new Error(`Static downloads fetch failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching static downloads.json', error);
    return null;
  }
};

const fetchCurseForgeDownloads = async (): Promise<Record<string, number>> => {
  if (!curseForgeConfig.apiKey || !curseForgeConfig.authorId) {
    return {};
  }

  const headers = {'X-Api-Key': curseForgeConfig.apiKey};
  const baseUrl = 'https://api.curseforge.com/v1/mods/search';

  const perPage = 50;
  let index = 0;
  const results: Record<string, number> = {};

  // Fetch all mods for the author; stop when the page is empty.
  /* eslint-disable no-constant-condition */
  while (true) {
    try {
      const url = `${baseUrl}?gameId=432&authorId=${curseForgeConfig.authorId}&pageSize=${perPage}&index=${index}`;
      const response = await fetch(url, {headers, cache: 'no-store'});
      if (!response.ok) {
        throw new Error(`CurseForge search failed (${response.status}) at index ${index}`);
      }
      const payload = await response.json();
      const mods = payload?.data;
      if (!Array.isArray(mods) || mods.length === 0) {
        break;
      }
      mods.forEach((mod: any) => {
        const slug = mod?.slug;
        const count = mod?.downloadCount;
        if (typeof slug === 'string' && typeof count === 'number') {
          results[slug] = count;
        }
      });
      index += perPage;
    } catch (error) {
      console.error('Error fetching CurseForge mods', error);
      break;
    }
  }

  return results;
};

const mergeDownloads = (
  base: DownloadsData | null,
  curseForgeCounts: Record<string, number>,
): DownloadsData | null => {
  if (!base && Object.keys(curseForgeCounts).length === 0) {
    return null;
  }

  const merged: DownloadsData = {
    ...(base ?? {}),
    projects: {...(base?.projects ?? {})},
  };

  const hasLiveCurseForge = Object.keys(curseForgeCounts).length > 0;

  if (hasLiveCurseForge) {
    Object.entries(curseForgeCounts).forEach(([slug, count]) => {
      const current = merged.projects?.[slug] ?? {};
      merged.projects![slug] = {
        ...current,
        curseforge: count,
        total: (current.modrinth ?? 0) + count,
      };
    });
  }

  // Recompute totals across all known projects so we include ones without live overrides.
  const allProjects = merged.projects ?? {};
  const curseForgeTotal = Object.values(allProjects).reduce(
    (sum, proj) => sum + (proj.curseforge ?? 0),
    0,
  );
  const modrinthTotal =
    merged.modrinth ??
    Object.values(allProjects).reduce((sum, proj) => sum + (proj.modrinth ?? 0), 0);

  merged.curseforge = curseForgeTotal;
  merged.total = curseForgeTotal + (modrinthTotal ?? 0);
  // Only mark as freshly updated when live CurseForge data was merged; otherwise preserve snapshot timestamp.
  merged.lastUpdated = hasLiveCurseForge ? new Date().toISOString() : base?.lastUpdated;

  return merged;
};

let downloadsPromise: Promise<DownloadsData | null> | null = null;

const fetchDownloadsInternal = async (): Promise<DownloadsData | null> => {
  const [staticData, curseForgeCounts] = await Promise.all([
    fetchStaticDownloads(),
    fetchCurseForgeDownloads(),
  ]);

  return mergeDownloads(staticData, curseForgeCounts);
};

export const fetchDownloads = async (
  options?: {forceRefresh?: boolean},
): Promise<DownloadsData | null> => {
  if (options?.forceRefresh) {
    downloadsPromise = null;
  }

  if (!downloadsPromise) {
    downloadsPromise = fetchDownloadsInternal();
  }
  return downloadsPromise;
};
