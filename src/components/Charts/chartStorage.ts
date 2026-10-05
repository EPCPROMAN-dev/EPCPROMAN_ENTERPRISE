type SavedChartSelection = {
    id: string;
    type: string;
};

const DATABASE_NAME = "chart";
const STORE_NAME = "chartSelection";
const DATABASE_VERSION = 1;

function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

        request.onupgradeneeded = () => {
            const database = request.result;

            if (!database.objectStoreNames.contains(STORE_NAME)) {
                database.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                });
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function getSavedChartType(
    graphId: string
): Promise<string | null> {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(graphId);

        request.onsuccess = () => {
            const result = request.result as SavedChartSelection | undefined;
            resolve(result ? result.type : null);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function saveChartType(
    graphId: string,
    type: string
): Promise<void> {
    const database = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = database.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);

        store.put({
            id: graphId,
            type: type,
        });

        transaction.oncomplete = () => {
            resolve();
        };

        transaction.onerror = () => {
            reject(transaction.error);
        };
    });
}
