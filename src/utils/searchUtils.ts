
import { appsData } from "../data/appsData";

export interface SearchResult {
    id: string;
    title: string;
    description: string;
    category: string;
    plan: string;
    appCode: string;
    type: "product" | "functionalArea";
    path: string;
    url?: string;
}

function createWildcardPattern(query: string): RegExp {
    const escapedQuery = query
        .trim()
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*")
        .replace(/\?/g, ".");

    return new RegExp(escapedQuery, "i");
}

export function getSearchResults(query: string): SearchResult[] {
    if (!query.trim()) {
        return [];
    }

    let pattern: RegExp;

    try {
        pattern = createWildcardPattern(query);
    } catch {
        return [];
    }

    const results: Array<SearchResult & { score: number }> = [];

    appsData.forEach((section) => {
        section.apps.forEach((app) => {
            const productFields = [
                app.productCode,
                app.code,
                app.name,
                app.level,
                section.plan,
            ];

            const matchingProductFields = productFields.filter(
                (field) => pattern.test(field ?? "")
            );

            if (matchingProductFields.length > 0) {
                const exactTitleMatch =
                    app.productCode.trim().toLowerCase() ===
                    query.trim().toLowerCase();

                results.push({
                    id: `product-${app.code}`,
                    title: app.productCode.trim(),
                    description: app.name,
                    category: "Products",
                    plan: section.plan,
                    appCode: app.code,
                    type: "product",
                    path: `/apps/${app.code}`,
                    score: exactTitleMatch ? 100 : 60,
                });
            }

            app.functionalAreas.forEach((area) => {
                const areaFields = [
                    area.code,
                    area.name,
                    area.description,
                    app.productCode,
                    app.name,
                    section.plan,
                ];

                const matchingAreaFields = areaFields.filter(
                    (field) => pattern.test(field ?? "")
                );

                if (matchingAreaFields.length > 0) {
                    const exactAreaMatch =
                        area.name.toLowerCase() ===
                        query.trim().toLowerCase();

                    results.push({
                        id: `area-${app.code}-${area.code}`,
                        title: area.name,
                        description: `${app.productCode.trim()} · ${app.name}`,
                        category: "Functional Areas",
                        plan: section.plan,
                        appCode: app.code,
                        type: "functionalArea",
                        path: `/apps/${app.code}/${area.code}`,
                        url: area.url,
                        score: exactAreaMatch ? 100 : 50,
                    });
                }
            });
        });
    });

    return results
        .sort(
            (a, b) =>
                b.score - a.score ||
                a.title.localeCompare(b.title)
        )
        .map(({ score: _score, ...result }) => result);
}

export function splitSearchResults(results: SearchResult[]) {
    return {
        topSearches: results.slice(0, 4),
        relatedSearches: results.slice(4),
    };
}
